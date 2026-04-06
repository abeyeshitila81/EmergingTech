import React from 'react';
const Search = ({
  loading,
  error,
  name,
  setName,
  studentId,
  setStudentId,
  getResult,
  result
}) => {
  return (
    <div className="space-y-8 max-w-xl mx-auto">
      {/* Search Card */}
      <div className="backdrop-blur-2xl bg-white/5 p-10 rounded-[2.5rem] border border-white/10 shadow-3xl relative overflow-hidden group">
        <div className="absolute -top-24 -left-24 w-48 h-48 bg-cyan-500/10 rounded-full blur-3xl group-hover:bg-cyan-500/20 transition-all duration-700"></div>

        <form onSubmit={getResult} className="relative z-10 space-y-6">
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 ml-1">Full Name</label>
              <input
                type="text"
                placeholder="Ex. Abebe"
                className="w-full bg-slate-900/50 border border-slate-800 rounded-2xl px-5 py-4 text-white placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-cyan-500/30 transition-all"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 ml-1">Student ID</label>
              <input
                type="text"
                placeholder="Ex. 101"
                className="w-full bg-slate-900/50 border border-slate-800 rounded-2xl px-5 py-4 text-white placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-cyan-500/30 transition-all"
                value={studentId}
                onChange={(e) => setStudentId(e.target.value)}
              />
            </div>
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:scale-[1.02] active:scale-[0.98] text-white font-black py-4.5 rounded-2xl shadow-xl shadow-cyan-900/20 transition-all disabled:opacity-50"
          >
            {loading ? 'Processing...' : 'QUERY DATABASE'}
          </button>
        </form>
        {error && (
          <div className="mt-8 p-4 bg-red-500/5 border border-red-500/20 rounded-2xl text-red-400 text-sm font-medium text-center">
            {error}
          </div>
        )}
      </div>
      {/* Result Display */}
      {result && (
        <div className="animate-in fade-in slide-in-from-bottom-8 duration-700">
          <div className="backdrop-blur-2xl bg-emerald-500/5 p-10 rounded-[2.5rem] border border-emerald-500/20 shadow-3xl overflow-hidden relative group">
            <div className="absolute top-8 right-8">
              <div className="bg-emerald-500/20 text-emerald-400 text-[10px] font-black px-4 py-1.5 rounded-full border border-emerald-500/30 uppercase tracking-[0.2em]">
                Verified Result
              </div>
            </div>
            <div className="space-y-8">
              <div>
                <h2 className="text-4xl font-black text-white tracking-tight">{result.name}</h2>
                <p className="text-emerald-400 font-bold tracking-widest mt-1">SID: {result.student_id}</p>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="bg-slate-950/50 p-6 rounded-3xl border border-white/5">
                  <p className="text-slate-500 text-[10px] uppercase font-black tracking-widest mb-1">Academic Course</p>
                  <p className="text-white text-lg font-bold">{result.course}</p>
                  <div className="flex gap-4 mt-2 border-t border-white/5 pt-2">
                    <div>
                      <p className="text-slate-600 text-[8px] uppercase font-black tracking-widest">Dept</p>
                      <p className="text-slate-300 text-xs font-bold">{result.department || '---'}</p>
                    </div>
                    <div>
                      <p className="text-slate-600 text-[8px] uppercase font-black tracking-widest">Batch</p>
                      <p className="text-slate-300 text-xs font-bold">{result.batch || '---'}</p>
                    </div>
                  </div>
                </div>
                <div className="bg-slate-950/50 p-6 rounded-3xl border border-white/5 flex flex-col items-center justify-center">
                  <p className="text-slate-500 text-[10px] uppercase font-black tracking-widest mb-1">Final Grade</p>
                  <p className={`text-5xl font-black ${result.grade === 'Pending' ? 'text-slate-600 animate-pulse' : 'text-emerald-400'}`}>
                    {result.grade === 'Pending' ? '...' : result.grade}
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-5 gap-2">
                <div className="bg-slate-900/40 p-3 rounded-2xl border border-white/5 flex flex-col items-center">
                  <span className="text-[8px] font-black text-fuchsia-500 uppercase tracking-widest mb-1 text-center">Mid / 20</span>
                  <span className="text-lg font-bold text-white">{result.mid_exam ?? '---'}</span>
                </div>
                <div className="bg-slate-900/40 p-3 rounded-2xl border border-white/5 flex flex-col items-center">
                  <span className="text-[8px] font-black text-emerald-500 uppercase tracking-widest mb-1 text-center">Final / 40</span>
                  <span className="text-lg font-bold text-white">{result.final_exam !== null ? result.final_exam : '---'}</span>
                </div>
                <div className="bg-slate-900/40 p-3 rounded-2xl border border-white/5 flex flex-col items-center">
                  <span className="text-[8px] font-black text-fuchsia-500 uppercase tracking-widest mb-1 text-center">Quiz / 10</span>
                  <span className="text-lg font-bold text-white">{result.quiz ?? '---'}</span>
                </div>
                <div className="bg-slate-900/40 p-3 rounded-2xl border border-white/5 flex flex-col items-center">
                  <span className="text-[8px] font-black text-cyan-500 uppercase tracking-widest mb-1 text-center">Asgn / 20</span>
                  <span className="text-lg font-bold text-white">{result.assignment ?? '---'}</span>
                </div>
                <div className="bg-slate-900/40 p-3 rounded-2xl border border-white/5 flex flex-col items-center">
                  <span className="text-[8px] font-black text-cyan-500 uppercase tracking-widest mb-1 text-center">Other / 10</span>
                  <span className="text-lg font-bold text-white">{result.other_scores ?? '---'}</span>
                </div>
              </div>
              <div className="bg-gradient-to-r from-cyan-500/10 to-blue-600/10 p-5 rounded-3xl border border-cyan-500/20 flex justify-between items-center mt-4">
                <span className="text-xs font-black text-cyan-500 uppercase tracking-widest">Total Weighted Score</span>
                <span className={`text-3xl font-black ${result.grade === 'Pending' ? 'text-slate-500' : 'text-white'}`}>
                  {result.grade === 'Pending' ? '---' : result.marks}
                  <span className="text-sm font-bold text-slate-500 ml-1">/ 100</span>
                </span>
              </div>
              {result.comments && (
                <div className="bg-slate-950/30 p-6 rounded-3xl border border-white/5 mt-4">
                  <p className="text-slate-500 text-[10px] uppercase font-black tracking-widest mb-2 flex items-center">
                    <span className="w-2 h-2 bg-emerald-500 rounded-full mr-2"></span>
                    Administrative Notes
                  </p>
                  <p className="text-slate-300 text-sm leading-relaxed italic">"{result.comments}"</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default Search;
