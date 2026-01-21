import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Mail, Lock, ArrowRight, AlertCircle } from 'lucide-react';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const { login } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    // Redirect to where they came from or home
    const from = location.state?.from?.pathname || "/";

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            await login(email, password);
            navigate(from, { replace: true });
        } catch {
            setError('Failed to log in. Please check your credentials.');
        }
        setLoading(false);
    };

    return (
        <div className="min-h-screen pt-20 pb-12 flex flex-col justify-center bg-stone-50 sm:px-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <h2 className="text-center text-3xl font-serif font-bold text-brand-charcoal">
                    Welcome Back
                </h2>
                <p className="mt-2 text-center text-sm text-stone-600">
                    Sign in to access your account
                </p>
            </div>

            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <div className="bg-white py-8 px-4 shadow-sm sm:rounded-lg sm:px-10 border border-stone-100">
                    {error && (
                        <div className="mb-4 bg-red-50 border-l-4 border-red-400 p-4">
                            <div className="flex">
                                <AlertCircle className="h-5 w-5 text-red-400" />
                                <div className="ml-3">
                                    <p className="text-sm text-red-700">{error}</p>
                                </div>
                            </div>
                        </div>
                    )}

                    <form className="space-y-6" onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-stone-700">
                                Email address
                            </label>
                            <div className="mt-1 relative rounded-md shadow-sm">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Mail className="h-5 w-5 text-stone-400" />
                                </div>
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="block w-full pl-10 h-10 border-stone-300 focus:ring-brand-maroon focus:border-brand-maroon sm:text-sm border rounded-md"
                                    placeholder="you@example.com"
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-stone-700">
                                Password
                            </label>
                            <div className="mt-1 relative rounded-md shadow-sm">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Lock className="h-5 w-5 text-stone-400" />
                                </div>
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    autoComplete="current-password"
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="block w-full pl-10 h-10 border-stone-300 focus:ring-brand-maroon focus:border-brand-maroon sm:text-sm border rounded-md"
                                    placeholder="••••••••"
                                />
                            </div>
                        </div>

                        <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                <input
                                    id="remember-me"
                                    name="remember-me"
                                    type="checkbox"
                                    className="h-4 w-4 text-brand-maroon focus:ring-brand-maroon border-stone-300 rounded"
                                />
                                <label htmlFor="remember-me" className="ml-2 block text-sm text-stone-900">
                                    Remember me
                                </label>
                            </div>

                            <div className="text-sm">
                                <a href="#" className="font-medium text-brand-maroon hover:text-brand-charcoal">
                                    Forgot your password?
                                </a>
                            </div>
                        </div>

                        <div>
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-brand-charcoal hover:bg-stone-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-maroon transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
                            >
                                {loading ? 'Signing in...' : 'Sign in'}
                            </button>
                        </div>
                    </form>

                    <div className="mt-6">
                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-stone-200" />
                            </div>
                            <div className="relative flex justify-center text-sm">
                                <span className="px-2 bg-white text-stone-500">
                                    New to Home Fashion?
                                </span>
                            </div>
                        </div>

                        <div className="mt-6">
                            <Link
                                to="/signup"
                                className="w-full flex justify-center items-center py-3 px-4 border border-stone-300 rounded-md shadow-sm bg-white text-sm font-medium text-stone-700 hover:bg-stone-50 transition-colors"
                            >
                                Create an account <ArrowRight className="ml-2 h-4 w-4" />
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
