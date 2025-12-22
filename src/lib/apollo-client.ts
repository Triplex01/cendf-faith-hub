import { ApolloClient, InMemoryCache, createHttpLink, from, ApolloLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { onError } from '@apollo/client/link/error';
import { getToken, isTokenValid, clearAuth } from './auth';

// Créer le lien HTTP vers l'endpoint GraphQL
const httpLink = createHttpLink({
  uri: import.meta.env.VITE_GRAPHQL_ENDPOINT || 'http://localhost/wordpress/graphql',
});

// Créer le lien d'authentification pour ajouter le token JWT aux headers
const authLink = setContext((_, { headers }) => {
  const token = getToken();
  
  // Ne pas ajouter le token s'il est invalide ou expiré
  if (token && !isTokenValid(token)) {
    clearAuth();
    return { headers };
  }

  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    }
  };
});

// Créer le lien de gestion d'erreurs
const errorLink = onError(({ graphQLErrors, networkError, operation, forward }) => {
  if (graphQLErrors) {
    graphQLErrors.forEach(({ message, locations, path, extensions }) => {
      console.error(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
      );

      // Gérer les erreurs d'authentification (401)
      if (extensions?.code === 'UNAUTHENTICATED' || extensions?.code === 'INVALID_TOKEN') {
        console.warn('Token invalide ou expiré. Redirection vers login...');
        clearAuth();
        // Rediriger vers la page de connexion si nécessaire
        // window.location.href = '/login';
      }
    });
  }

  if (networkError) {
    console.error(`[Network error]: ${networkError}`);
  }
});

// Configuration du cache Apollo
const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        posts: {
          keyArgs: ['where'],
          merge(existing, incoming, { args }) {
            if (!existing) return incoming;
            
            // Gérer la pagination avec cursor
            if (!args?.after) {
              return incoming;
            }

            return {
              ...incoming,
              nodes: [...(existing.nodes || []), ...(incoming.nodes || [])],
            };
          },
        },
        teachings: {
          keyArgs: ['where'],
          merge(existing, incoming, { args }) {
            if (!existing) return incoming;
            
            if (!args?.after) {
              return incoming;
            }

            return {
              ...incoming,
              nodes: [...(existing.nodes || []), ...(incoming.nodes || [])],
            };
          },
        },
      },
    },
  },
});

// Créer et exporter le client Apollo
export const client = new ApolloClient({
  link: from([errorLink, authLink, httpLink]),
  cache,
  defaultOptions: {
    watchQuery: {
      fetchPolicy: 'cache-and-network',
      errorPolicy: 'all',
    },
    query: {
      fetchPolicy: 'cache-first',
      errorPolicy: 'all',
    },
    mutate: {
      errorPolicy: 'all',
    },
  },
});

export default client;
