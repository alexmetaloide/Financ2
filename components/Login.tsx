import React from 'react';
import { LogIn } from 'lucide-react';

interface LoginProps {
    onLogin: () => void;
}

export const Login: React.FC<LoginProps> = ({ onLogin }) => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
            <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-lg text-center">
                <div>
                    <div className="mx-auto h-12 w-12 bg-primary text-white rounded-lg flex items-center justify-center mb-4">
                        <LogIn size={24} />
                    </div>
                    <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
                        Bem-vindo ao FinControl<span className="text-primary">Pro</span>
                    </h2>
                    <p className="mt-2 text-sm text-gray-600">
                        Faça login para gerenciar suas finanças
                    </p>
                </div>
                <div className="mt-8">
                    <button
                        onClick={onLogin}
                        className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-primary hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors duration-200"
                    >
                        <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                            <LogIn className="h-5 w-5 text-blue-300 group-hover:text-blue-200" aria-hidden="true" />
                        </span>
                        Entrar com Google
                    </button>
                </div>
            </div>
        </div>
    );
};
