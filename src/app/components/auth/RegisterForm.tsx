import { useState } from 'react';
import { UserPlus, User, Lock, Mail, ArrowRight } from 'lucide-react';
import { Link } from '@tanstack/react-router';
import { register } from '@/api/auth/endpoints/index';

const RegisterForm = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            console.error('Passwords do not match');
            return;
        }

        try {
            const res = await register({username, email, password})
            console.log(res)
        } catch (error) {
            console.log("Failed to register", error)
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center pt-20 p-4 bg-background-light dark:bg-background-dark">
            <div className="w-full max-w-md p-8 space-y-8 bg-brand-offwhite/90 dark:bg-brand-charcoal/90 backdrop-blur-md rounded-3xl shadow-2xl border border-brand-softgray dark:border-white/10">
                <div className="text-center">
                    <h2 className="text-3xl font-bold text-brand-charcoal dark:text-brand-offwhite mb-2 tracking-tight">Create Account</h2>
                    <p className="text-sm text-brand-charcoal/70 dark:text-brand-softgray/80">Join us to play Belote</p>
                </div>

                <form onSubmit={handleRegister} className="space-y-5">
                    <div className="space-y-4">
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <User className="h-5 w-5 text-brand-charcoal/40 dark:text-brand-softgray/50" />
                            </div>
                            <input
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className="block w-full pl-11 pr-3 py-3 border border-brand-softgray/80 dark:border-white/10 rounded-xl bg-white dark:bg-black/20 text-brand-charcoal dark:text-brand-offwhite focus:ring-2 focus:ring-brand-gold focus:border-brand-gold transition-all duration-200 outline-none"
                                placeholder="Username"
                                required
                            />
                        </div>

                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Mail className="h-5 w-5 text-brand-charcoal/40 dark:text-brand-softgray/50" />
                            </div>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="block w-full pl-11 pr-3 py-3 border border-brand-softgray/80 dark:border-white/10 rounded-xl bg-white dark:bg-black/20 text-brand-charcoal dark:text-brand-offwhite focus:ring-2 focus:ring-brand-gold focus:border-brand-gold transition-all duration-200 outline-none"
                                placeholder="Email Address"
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

                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Lock className="h-5 w-5 text-brand-charcoal/40 dark:text-brand-softgray/50" />
                            </div>
                            <input
                                type="password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                className="block w-full pl-11 pr-3 py-3 border border-brand-softgray/80 dark:border-white/10 rounded-xl bg-white dark:bg-black/20 text-brand-charcoal dark:text-brand-offwhite focus:ring-2 focus:ring-brand-gold focus:border-brand-gold transition-all duration-200 outline-none"
                                placeholder="Confirm Password"
                                required
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="w-full flex justify-center items-center py-3.5 px-4 rounded-xl shadow-lg shadow-brand-burnt/20 text-sm font-semibold text-brand-offwhite bg-brand-burnt hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-burnt transition-all duration-200 transform hover:-translate-y-0.5"
                    >
                        <UserPlus className="w-5 h-5 mr-2" />
                        Create Account
                    </button>
                </form>

                <div className="mt-6 text-center">
                    <p className="text-sm text-brand-charcoal/70 dark:text-brand-softgray/80">
                        Already have an account?{' '}
                        <Link to="/auth/login" className="font-semibold text-brand-burnt dark:text-brand-gold hover:underline transition-all inline-flex items-center group">
                            Sign in
                            <ArrowRight className="w-4 h-4 ml-1 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-1 transition-all duration-200" />
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default RegisterForm;
