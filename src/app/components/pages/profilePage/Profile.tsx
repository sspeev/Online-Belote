import { User, Mail, Trophy, Swords, Medal, Edit2 } from 'lucide-react';
import { useState, useEffect } from 'react';

const Profile = () => {
  const [username, setUsername] = useState('Player');

  useEffect(() => {
    // Attempt to load username from storage if available
    const storedName = sessionStorage.getItem('playerName') || localStorage.getItem('playerName');
    if (storedName) {
      setUsername(storedName);
    }
  }, []);

  return (
    <div className="min-h-screen pt-24 pb-12 px-4 sm:px-6 flex flex-col items-center bg-background-light dark:bg-background-dark">
      <div className="w-full max-w-4xl space-y-8">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row items-center md:items-start gap-8 bg-brand-offwhite/90 dark:bg-brand-charcoal/90 backdrop-blur-md rounded-3xl p-8 shadow-2xl border border-brand-softgray dark:border-white/10">
          <div className="relative group">
            <div className="w-32 h-32 rounded-full bg-gradient-to-tr from-brand-burnt to-brand-gold flex items-center justify-center text-white text-4xl font-bold shadow-lg">
              {username.charAt(0).toUpperCase()}
            </div>
            <button className="absolute bottom-0 right-0 p-2 bg-brand-charcoal dark:bg-white text-white dark:text-brand-charcoal rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity transform hover:scale-105">
              <Edit2 className="w-4 h-4" />
            </button>
          </div>
          
          <div className="flex-1 text-center md:text-left space-y-2">
            <h1 className="text-4xl font-bold text-brand-charcoal dark:text-white tracking-tight">{username}</h1>
            <div className="flex items-center justify-center md:justify-start text-brand-charcoal/60 dark:text-brand-softgray/80 space-x-2">
              <Mail className="w-4 h-4" />
              <span>{username.toLowerCase()}@example.com</span>
            </div>
            <div className="inline-block mt-4 px-4 py-1.5 bg-brand-burnt/10 dark:bg-brand-gold/10 text-brand-burnt dark:text-brand-gold rounded-full text-sm font-semibold border border-brand-burnt/20 dark:border-brand-gold/20">
              Pro Player
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-brand-offwhite/80 dark:bg-brand-charcoal/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-brand-softgray/50 dark:border-white/5 flex flex-col items-center justify-center text-center group hover:-translate-y-1 transition-transform duration-300">
            <div className="w-12 h-12 bg-blue-500/10 text-blue-600 dark:text-blue-400 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Swords className="w-6 h-6" />
            </div>
            <p className="text-3xl font-bold text-brand-charcoal dark:text-white mb-1">1,248</p>
            <p className="text-sm font-medium text-brand-charcoal/60 dark:text-brand-softgray/60 uppercase tracking-wider">Games Played</p>
          </div>
          
          <div className="bg-brand-offwhite/80 dark:bg-brand-charcoal/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-brand-softgray/50 dark:border-white/5 flex flex-col items-center justify-center text-center group hover:-translate-y-1 transition-transform duration-300">
            <div className="w-12 h-12 bg-green-500/10 text-green-600 dark:text-green-400 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Trophy className="w-6 h-6" />
            </div>
            <p className="text-3xl font-bold text-brand-charcoal dark:text-white mb-1">68%</p>
            <p className="text-sm font-medium text-brand-charcoal/60 dark:text-brand-softgray/60 uppercase tracking-wider">Win Rate</p>
          </div>
          
          <div className="bg-brand-offwhite/80 dark:bg-brand-charcoal/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-brand-softgray/50 dark:border-white/5 flex flex-col items-center justify-center text-center group hover:-translate-y-1 transition-transform duration-300">
            <div className="w-12 h-12 bg-purple-500/10 text-purple-600 dark:text-purple-400 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Medal className="w-6 h-6" />
            </div>
            <p className="text-3xl font-bold text-brand-charcoal dark:text-white mb-1">Diamond</p>
            <p className="text-sm font-medium text-brand-charcoal/60 dark:text-brand-softgray/60 uppercase tracking-wider">Current Rank</p>
          </div>
        </div>

        {/* Account Details */}
        <div className="bg-brand-offwhite/90 dark:bg-brand-charcoal/90 backdrop-blur-md rounded-3xl p-8 shadow-2xl border border-brand-softgray dark:border-white/10">
          <h2 className="text-2xl font-bold text-brand-charcoal dark:text-white mb-6">Account Details</h2>
          <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between p-4 bg-white/50 dark:bg-black/20 rounded-xl border border-brand-softgray/50 dark:border-white/5">
              <div className="flex items-center space-x-4 mb-4 md:mb-0">
                <div className="w-10 h-10 rounded-full bg-brand-charcoal/5 dark:bg-white/10 flex items-center justify-center text-brand-charcoal dark:text-white">
                  <User className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm font-medium text-brand-charcoal/60 dark:text-brand-softgray/60">Display Name</p>
                  <p className="text-lg font-semibold text-brand-charcoal dark:text-white">{username}</p>
                </div>
              </div>
              <button className="px-4 py-2 text-sm font-semibold text-brand-burnt dark:text-brand-gold border border-brand-burnt/20 dark:border-brand-gold/20 rounded-lg hover:bg-brand-burnt/5 dark:hover:bg-brand-gold/5 transition-colors">
                Change
              </button>
            </div>
            
            <div className="flex flex-col md:flex-row md:items-center justify-between p-4 bg-white/50 dark:bg-black/20 rounded-xl border border-brand-softgray/50 dark:border-white/5">
              <div className="flex items-center space-x-4 mb-4 md:mb-0">
                <div className="w-10 h-10 rounded-full bg-brand-charcoal/5 dark:bg-white/10 flex items-center justify-center text-brand-charcoal dark:text-white">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm font-medium text-brand-charcoal/60 dark:text-brand-softgray/60">Email Address</p>
                  <p className="text-lg font-semibold text-brand-charcoal dark:text-white">{username.toLowerCase()}@example.com</p>
                </div>
              </div>
              <button className="px-4 py-2 text-sm font-semibold text-brand-burnt dark:text-brand-gold border border-brand-burnt/20 dark:border-brand-gold/20 rounded-lg hover:bg-brand-burnt/5 dark:hover:bg-brand-gold/5 transition-colors">
                Update
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Profile;
