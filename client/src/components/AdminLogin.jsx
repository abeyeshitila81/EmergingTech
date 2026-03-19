import React, { useState } from 'react';

const AdminLogin = ({ onLogin, onClose }) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === 'admin123') {
      onLogin();
      onClose();
    } else {
      setError('Invalid admin password');
      setPassword('');
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
      <div 
        className="w-full max-w-md bg-white/5 border border-white/10 rounded-3xl p-8 shadow-2xl animate-in fade-in zoom-in duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-emerald-500/20 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-emerald-500/30">
            <svg className="w-8 h-8 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 00-2 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <h2 className="text-2xl font-black text-white">Admin Access</h2>
          <p className="text-slate-400 text-sm mt-1">Enter password to unlock management features</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full bg-slate-900/50 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50 transition-all"
              autoFocus
            />
            {error && <p className="text-rose-400 text-xs font-bold mt-2 ml-1">{error}</p>}
          </div>

          <div className="flex gap-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-6 py-3 rounded-xl bg-white/5 text-slate-300 font-bold hover:bg-white/10 transition-colors border border-white/5"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-[2] px-6 py-3 rounded-xl bg-emerald-500 text-slate-900 font-black hover:bg-emerald-400 transition-colors shadow-lg shadow-emerald-500/20"
            >
              Authenticate
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
