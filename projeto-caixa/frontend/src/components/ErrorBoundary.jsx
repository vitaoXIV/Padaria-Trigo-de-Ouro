import { Component } from 'react';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Erro capturado:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-white dark:bg-[#111111] flex items-center justify-center">
          <div className="text-center p-8">
            <h1 className="text-4xl font-bold text-red-600 mb-4">Erro!</h1>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              {this.state.error?.message || 'Ocorreu um erro na aplicação'}
            </p>
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-2 bg-[#D4AF37] hover:bg-[#B8942D] text-white font-semibold rounded-lg"
            >
              Recarregar página
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
