import { useState } from 'react';
import { LogIn, User, Lock, UserCircle2 } from 'lucide-react';
import { login } from '@/api/auth/endpoints/index';

import { useNavigate } from '@tanstack/react-router';

const LoginForm = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMsg, setErrorMsg] = useState('');

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setErrorMsg('');
        try {
            const res = await login({ email, password });
            if (res.data.token) {
                localStorage.setItem('authToken', res.data.token);
                window.dispatchEvent(new Event('authChange'));
                navigate({ to: '/' });
            }
        } catch (error: any) {
            console.error('Login failed:', error);
            if (error.response?.status === 401) {
                setErrorMsg('Invalid email or password.');
            } else if (error.response?.status === 400) {
                setErrorMsg('Bad request. Make sure your server is restarted after code changes.');
            } else {
                setErrorMsg('An unexpected error occurred. Please try again.');
            }
        }
    };

    const handleGuestLogin = () => {
        console.log('Continuing as guest...');
    };

    return (
        <div className="min-h-screen flex items-center justify-center pt-20 p-4 bg-background-light dark:bg-background-dark">
            <div className="w-full max-w-md p-8 space-y-8 bg-brand-offwhite/90 dark:bg-brand-charcoal/90 backdrop-blur-md rounded-3xl shadow-2xl border border-brand-softgray dark:border-white/10">
                <div className="text-center">
                    <h2 className="text-3xl font-bold text-brand-charcoal dark:text-brand-offwhite mb-2 tracking-tight">Welcome Back</h2>
                    <p className="text-sm text-brand-charcoal/70 dark:text-brand-softgray/80">Sign in to play Belote</p>
                </div>

                {errorMsg && (
                    <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-600 dark:text-red-400 text-sm font-medium text-center animate-in fade-in slide-in-from-top-2">
                        {errorMsg}
                    </div>
                )}

                <form onSubmit={handleLogin} className="space-y-6">
                    <div className="space-y-4">
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <User className="h-5 w-5 text-brand-charcoal/40 dark:text-brand-softgray/50" />
                            </div>
                            <input
                                type="text"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="block w-full pl-11 pr-3 py-3 border border-brand-softgray/80 dark:border-white/10 rounded-xl bg-white dark:bg-black/20 text-brand-charcoal dark:text-brand-offwhite focus:ring-2 focus:ring-brand-gold focus:border-brand-gold transition-all duration-200 outline-none"
                                placeholder="Email"
                                required
                            />
                        </div>

                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Lock className="h-5 w-5 text-brand-charcoal/40 dark:text-brand-softgray/50" />
                            </div>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="block w-full pl-11 pr-3 py-3 border border-brand-softgray/80 dark:border-white/10 rounded-xl bg-white dark:bg-black/20 text-brand-charcoal dark:text-brand-offwhite focus:ring-2 focus:ring-brand-gold focus:border-brand-gold transition-all duration-200 outline-none"
                                placeholder="Password"
                                required
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="w-full flex justify-center items-center py-3.5 px-4 rounded-xl shadow-lg shadow-brand-burnt/20 text-sm font-semibold text-brand-offwhite bg-brand-burnt hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-burnt transition-all duration-200 transform hover:-translate-y-0.5"
                    >
                        <LogIn className="w-5 h-5 mr-2" />
                        Sign In
                    </button>
                </form>

                <div className="mt-6">
                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-brand-softgray dark:border-white/10" />
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="px-3 bg-brand-offwhite dark:bg-brand-charcoal text-brand-charcoal/50 dark:text-brand-softgray/60 font-medium rounded-full">
                                Or continue without an account
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginForm;