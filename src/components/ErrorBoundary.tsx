import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

/**
 * Composant ErrorBoundary pour capturer les erreurs React
 */
export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  private handleReset = () => {
    this.setState({ hasError: false, error: null });
    window.location.reload();
  };

  public render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="min-h-screen flex items-center justify-center bg-background p-4">
          <div className="max-w-md w-full bg-card rounded-xl p-8 shadow-elegant border border-border text-center">
            <div className="w-16 h-16 bg-destructive/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <AlertCircle className="w-8 h-8 text-destructive" />
            </div>
            
            <h2 className="font-display text-2xl font-bold text-foreground mb-3">
              Une erreur est survenue
            </h2>
            
            <p className="text-muted-foreground mb-6">
              Désolé, quelque chose s'est mal passé. Veuillez réessayer ou rafraîchir la page.
            </p>

            {this.state.error && (
              <details className="text-left mb-6 text-sm">
                <summary className="cursor-pointer text-muted-foreground hover:text-foreground mb-2">
                  Détails de l'erreur
                </summary>
                <pre className="bg-muted p-3 rounded-lg overflow-auto text-xs">
                  {this.state.error.toString()}
                </pre>
              </details>
            )}

            <div className="flex gap-3 justify-center">
              <Button variant="burgundy" onClick={this.handleReset}>
                Rafraîchir la page
              </Button>
              <Button variant="outline" onClick={() => window.history.back()}>
                Retour
              </Button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
