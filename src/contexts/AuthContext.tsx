import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  isAdmin: boolean;
  isEditor: boolean;
  signIn: (email: string, password: string) => Promise<{ error: Error | null }>;
  signUp: (email: string, password: string, fullName: string) => Promise<{ error: Error | null }>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);

  // authLoading: session retrieval / auth change in progress
  // rolesLoading: role lookup in progress (prevents redirect loop)
  const [authLoading, setAuthLoading] = useState(true);
  const [rolesLoading, setRolesLoading] = useState(true);

  const [isAdmin, setIsAdmin] = useState(false);
  const [isEditor, setIsEditor] = useState(false);

  const checkUserRoles = async (userId: string) => {
    setRolesLoading(true);
    try {
      const { data: roles, error } = await supabase
        .from('user_roles')
        .select('role')
        .eq('user_id', userId);

      if (error) {
        console.error('Error fetching roles:', error);
        setIsAdmin(false);
        setIsEditor(false);
        return;
      }

      const roleList = roles?.map((r) => r.role) || [];
      setIsAdmin(roleList.includes('admin'));
      setIsEditor(roleList.includes('editor') || roleList.includes('admin'));
    } catch (error) {
      console.error('Error checking roles:', error);
      setIsAdmin(false);
      setIsEditor(false);
    } finally {
      setRolesLoading(false);
    }
  };

  useEffect(() => {
    // Set up auth state listener BEFORE checking session
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (_event, session) => {
      setAuthLoading(true);

      setSession(session);
      setUser(session?.user ?? null);

      if (session?.user) {
        // Ensure we don't redirect while roles are still loading
        await checkUserRoles(session.user.id);
      } else {
        setIsAdmin(false);
        setIsEditor(false);
        setRolesLoading(false);
      }

      setAuthLoading(false);
    });

    // Check initial session
    supabase.auth
      .getSession()
      .then(async ({ data: { session } }) => {
        setSession(session);
        setUser(session?.user ?? null);

        if (session?.user) {
          await checkUserRoles(session.user.id);
        } else {
          setRolesLoading(false);
        }

        setAuthLoading(false);
      })
      .catch((error) => {
        console.error('Error getting session:', error);
        setIsAdmin(false);
        setIsEditor(false);
        setRolesLoading(false);
        setAuthLoading(false);
      });

    return () => subscription.unsubscribe();
  }, []);

  const signIn = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    return { error };
  };

  const signUp = async (email: string, password: string, fullName: string) => {
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { full_name: fullName },
        emailRedirectTo: window.location.origin,
      },
    });
    return { error };
  };

  const signOut = async () => {
    setAuthLoading(true);
    await supabase.auth.signOut();
    setUser(null);
    setSession(null);
    setIsAdmin(false);
    setIsEditor(false);
    setRolesLoading(false);
    setAuthLoading(false);
  };

  const loading = authLoading || rolesLoading;

  return (
    <AuthContext.Provider
      value={{
        user,
        session,
        loading,
        isAdmin,
        isEditor,
        signIn,
        signUp,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
