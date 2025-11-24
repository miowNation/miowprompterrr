import React from 'react';

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null, errorInfo: null };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
        console.error('Error caught by boundary:', error, errorInfo);
        this.setState({
            error,
            errorInfo
        });
    }

    render() {
        if (this.state.hasError) {
            return (
                <div className="min-h-screen bg-gray-950 text-gray-100 flex items-center justify-center p-6">
                    <div className="max-w-2xl w-full bg-gray-900 rounded-lg border border-gray-800 p-8">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="p-3 bg-red-900/20 rounded-lg">
                                <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                                </svg>
                            </div>
                            <div>
                                <h1 className="text-2xl font-bold">Something went wrong</h1>
                                <p className="text-gray-400 text-sm">The application encountered an unexpected error</p>
                            </div>
                        </div>

                        <div className="bg-gray-950 rounded-lg p-4 mb-4 border border-gray-800">
                            <p className="text-sm font-mono text-red-400 mb-2">
                                {this.state.error && this.state.error.toString()}
                            </p>
                            {this.state.errorInfo && (
                                <details className="text-xs text-gray-500">
                                    <summary className="cursor-pointer hover:text-gray-400">Stack trace</summary>
                                    <pre className="mt-2 overflow-auto max-h-64">
                                        {this.state.errorInfo.componentStack}
                                    </pre>
                                </details>
                            )}
                        </div>

                        <div className="flex gap-3">
                            <button
                                onClick={() => window.location.reload()}
                                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                            >
                                Reload Application
                            </button>
                            <button
                                onClick={() => this.setState({ hasError: false, error: null, errorInfo: null })}
                                className="flex-1 bg-gray-800 hover:bg-gray-700 text-gray-100 px-4 py-2 rounded-lg font-medium transition-colors"
                            >
                                Try Again
                            </button>
                        </div>

                        <div className="mt-4 p-3 bg-blue-900/20 border border-blue-800 rounded-lg">
                            <p className="text-xs text-blue-300">
                                <strong>Tip:</strong> If this error persists, try clearing your browser's localStorage or opening the app in an incognito window.
                            </p>
                        </div>
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
