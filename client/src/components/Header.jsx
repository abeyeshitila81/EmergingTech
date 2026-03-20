import React from 'react';

const Header = ({ view, setView, isAdmin, publicAccess, onTogglePublicAccess, onLoginClick, onLogout }) => {
  return (
    <div className="text-center mb-12">
      <div className="flex justify-between items-center mb-8">
        <div className="w-24">
          {isAdmin && (
            <button
              onClick={onTogglePublicAccess}
              className={`px-3 py-1.5 rounded-lg text-[10px] font-black border transition-all uppercase tracking-widest flex items-center gap-2 ${
                publicAccess 
                  ? 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20' 
                  : 'bg-slate-500/10 text-slate-400 border-slate-500/20'
              }`}
              title={publicAccess ? "Public access is ON" : "Public access is OFF"}
            >
              <div className={`w-2 h-2 rounded-full ${publicAccess ? 'bg-cyan-400 animate-pulse' : 'bg-slate-500'}`}></div>
              {publicAccess ? 'Public' : 'Private'}
            </button>
          )}
        </div>
        <div>
          <h1 className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-fuchsia-500 mb-2 tracking-tighter">
            EmergingTech
          </h1>
          <p className="text-slate-400 text-lg font-medium opacity-80 uppercase tracking-[0.2em] text-[10px]">Student Data Management</p>
        </div>
        <div className="w-24 flex justify-end">
          {isAdmin ? (
            <button
              onClick={onLogout}
              className="px-4 py-2 rounded-xl text-xs font-black bg-rose-500/10 text-rose-400 border border-rose-500/20 hover:bg-rose-500/20 transition-all uppercase tracking-widest"
            >
              Logout
            </button>
          ) : (
            <button
              onClick={onLoginClick}
              className="px-4 py-2 rounded-xl text-xs font-black bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 hover:bg-emerald-500/20 transition-all uppercase tracking-widest"
            >
              Admin
            </button>
          )}
        </div>
      </div>
      {/* View Toggle */}
      <div className="flex justify-center mt-8">
        <div className="bg-slate-900/50 p-1.5 rounded-2xl border border-white/5 backdrop-blur-md shadow-2xl flex gap-1">
          <button
            onClick={() => setView('search')}
            className={`px-6 py-2.5 rounded-xl text-sm font-black transition-all ${view === 'search' ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-lg shadow-blue-500/25' : 'text-slate-500 hover:text-slate-300'}`}
          >
            SEARCH
          </button>
          
          {(isAdmin || publicAccess) && (
            <button
              onClick={() => setView('list')}
              className={`px-6 py-2.5 rounded-xl text-sm font-black transition-all ${view === 'list' ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-lg shadow-emerald-500/25' : 'text-slate-500 hover:text-slate-300'}`}
            >
              DIRECTORY
            </button>
          )}

          {isAdmin && (
            <button
              onClick={() => setView('submit')}
              className={`px-6 py-2.5 rounded-xl text-sm font-black transition-all ${view === 'submit' ? 'bg-gradient-to-r from-fuchsia-500 to-purple-500 text-white shadow-lg shadow-fuchsia-500/25' : 'text-slate-500 hover:text-slate-300'}`}
            >
              SUBMIT
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
