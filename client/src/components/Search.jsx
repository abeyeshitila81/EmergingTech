import React from 'react';
import { GraduationCap } from 'lucide-react';
import { generateResultPDF } from '../utils/pdfGenerator';
const Search = ({
  loading,
  error,
  name,
  setName,
  studentId,
  setStudentId,
  pin,
  setPin,
  getResult,
  result,
  onBack
}) => {
  return (
    <div className="space-y-8 max-w-xl mx-auto">
      {/* Search Card - Hidden when result is shown for cleaner focus */}
      {!result && (
        <div className="backdrop-blur-2xl bg-white/5 p-10 rounded-[2.5rem] border border-white/10 shadow-3xl relative overflow-hidden group">
          <div className="absolute -top-24 -left-24 w-48 h-48 bg-cyan-500/10 rounded-full blur-3xl group-hover:bg-cyan-500/20 transition-all duration-700"></div>

          <form onSubmit={getResult} className="relative z-10 space-y-6">
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 ml-1">Full Name</label>
                <input
                  type="text"
                  placeholder="Ex. John"
                  className="w-full bg-slate-900/50 border border-slate-800 rounded-2xl px-5 py-4 text-white placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-cyan-500/30 transition-all font-medium"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 ml-1">Student ID</label>
                <input
                  type="text"
                  placeholder="Ex. 101"
                  className="w-full bg-slate-900/50 border border-slate-800 rounded-2xl px-5 py-4 text-white placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-cyan-500/30 transition-all font-medium"
                  value={studentId}
                  onChange={(e) => setStudentId(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 ml-1 flex justify-between">
                  <span>4-Digit PIN</span>
                  <span className="text-cyan-500/80 text-[9px]">Optional on first login</span>
                </label>
                <input
                  type="password"
                  placeholder="••••"
                  maxLength={4}
                  className="w-full bg-slate-900/50 border border-slate-800 rounded-2xl px-5 py-4 text-white placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-cyan-500/30 transition-all font-medium tracking-widest font-mono"
                  value={pin}
                  onChange={(e) => setPin(e.target.value)}
                />
              </div>
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:scale-[1.02] active:scale-[0.98] text-white font-black py-4.5 rounded-2xl shadow-xl shadow-cyan-900/20 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {loading ? 'Processing...' : (
                <>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  <span>View Result</span>
                </>
              )}
            </button>
          </form>
          {error && (
            <div className="mt-8 p-4 bg-red-500/5 border border-red-500/20 rounded-2xl text-red-400 text-sm font-medium text-center">
              {error}
            </div>
          )}
        </div>
      )}

      {/* Result Display */}
      {result && (
        <div className="animate-in fade-in slide-in-from-bottom-8 duration-700 space-y-6">
          {result.isFirstLogin && (
            <div className="backdrop-blur-xl bg-cyan-500/10 p-6 md:p-8 rounded-[2.5rem] border-2 border-cyan-500/30 shadow-3xl relative overflow-hidden text-center scale-100 animate-in zoom-in-95 duration-500">
              <div className="absolute -top-10 -right-10 w-32 h-32 bg-cyan-500/20 rounded-full blur-3xl mix-blend-screen"></div>
              <div className="w-16 h-16 bg-cyan-500/20 rounded-full flex items-center justify-center mx-auto mb-4 border border-cyan-500/40 shadow-xl shadow-cyan-500/20 relative z-10">
                <svg className="w-8 h-8 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 00-2 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h2 className="text-2xl md:text-3xl font-black text-white mb-2 relative z-10">Account Secured</h2>
              <p className="text-slate-300 relative z-10 mb-6 max-w-sm mx-auto">This is your first time logging in. We have generated a unique secret PIN for your account.</p>

              <div className="bg-slate-950/50 border border-cyan-500/30 rounded-2xl p-6 mb-6 mx-auto max-w-[200px] relative z-10">
                <p className="text-[10px] font-black text-cyan-500 uppercase tracking-widest mb-2">Your Secret PIN</p>
                <p className="text-4xl font-black text-white tracking-[0.2em] font-mono">{result.generatedPin}</p>
              </div>

              <p className="text-rose-400 font-bold text-sm relative z-10 bg-rose-500/10 py-3 px-4 rounded-xl inline-block border border-rose-500/20">
                ⚠️ Please write this down. You will need it to view your results next time.
              </p>
            </div>
          )}

          <div className="backdrop-blur-2xl bg-emerald-500/5 p-6 md:p-10 rounded-[2.5rem] border border-emerald-500/20 shadow-3xl overflow-hidden relative group">
            {/* Top Back Button - High Visibility */}
            <div className="mb-6">
              <button
                onClick={onBack}
                className="inline-flex items-center gap-2 px-6 py-2.5 bg-white/10 hover:bg-white/20 text-white text-sm font-bold rounded-xl border border-white/20 transition-all active:scale-95 group/back"
              >
                <svg className="w-5 h-5 group-hover/back:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                <span>Back</span>
              </button>
            </div>

            {/* Header Actions - Responsive for Mobile */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-8 border-b border-white/10">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 md:w-16 md:h-16 rounded-2xl bg-indigo-500/20 flex items-center justify-center border border-indigo-500/30 shrink-0">
                  <GraduationCap className="w-6 h-6 md:w-8 md:h-8 text-indigo-400" />
                </div>
                <div className="min-w-0">
                  <h3 className="text-xl md:text-2xl font-bold text-white leading-tight truncate">{result.name}</h3>
                  <div className="flex flex-wrap items-center gap-2 mt-1">
                    <span className="text-slate-400 text-xs font-mono">ID: {result.student_id}</span>
                    <span className={`px-2 py-0.5 rounded-md text-[9px] font-bold uppercase tracking-wider ${result.department === 'pharmacy' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-blue-500/10 text-blue-400 border border-blue-500/20'}`}>
                      {result.department || 'Pharmacy'}
                    </span>
                    <span className="px-2 py-0.5 rounded-md text-[9px] font-bold uppercase bg-slate-800 text-slate-400 border border-white/5">
                      Batch: {result.batch || '2016'}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-2">

                <div className="bg-emerald-500/20 text-emerald-400 text-[9px] font-black px-3 py-1.5 rounded-full border border-emerald-500/30 uppercase tracking-widest whitespace-nowrap">
                  Verified
                </div>
              </div>
            </div>

            <div className="space-y-6">

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
                <div className="bg-slate-950/50 p-5 md:p-6 rounded-3xl border border-white/5">
                  <p className="text-slate-500 text-[10px] uppercase font-black tracking-widest mb-2">Academic Course</p>
                  <p className="text-white text-base md:text-lg font-bold">{result.course}</p>
                </div>
                <div className="bg-slate-950/50 p-5 md:p-6 rounded-3xl border border-white/5 flex flex-col items-center justify-center">
                  <p className="text-slate-500 text-[10px] uppercase font-black tracking-widest mb-1 text-center">Final Grade</p>
                  <p className={`text-4xl md:text-5xl font-black ${result.grade === 'Pending' ? 'text-slate-600 animate-pulse' : 'text-emerald-400'}`}>
                    {result.grade === 'Pending' ? '...' : result.grade}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 md:gap-4">
                <div className="bg-slate-900/40 p-4 rounded-2xl border border-white/5 flex flex-col items-center text-center">
                  <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-1">Mid Exam</span>
                  <span className="text-lg md:text-xl font-bold text-white">{result.mid_exam ?? '---'}<span className="text-[10px] text-slate-500 ml-0.5 font-bold">/20</span></span>
                </div>
                <div className="bg-slate-900/40 p-4 rounded-2xl border border-white/5 flex flex-col items-center text-center">
                  <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-1">Quiz/Attendance</span>
                  <span className="text-lg md:text-xl font-bold text-white">{result.quiz ?? '---'}</span>
                </div>
                <div className="bg-slate-900/40 p-4 rounded-2xl border border-white/5 flex flex-col items-center text-center col-span-2 sm:col-span-1">
                  <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-1">Assignment</span>
                  <span className="text-lg md:text-xl font-bold text-white">{result.assignment ?? '---'}</span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
                <div className="bg-slate-900/40 p-4 rounded-2xl border border-white/5 flex flex-col items-center text-center">
                  <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-1">Final Exam</span>
                  <span className="text-lg md:text-xl font-bold text-white">{(result.final_exam !== undefined && result.final_exam !== null) ? result.final_exam : '---'}<span className="text-[10px] text-slate-500 ml-0.5 font-bold">/40</span></span>
                </div>
                <div className="bg-gradient-to-br from-cyan-500/20 to-blue-600/20 p-4 rounded-2xl border border-cyan-500/20 flex flex-col items-center text-center">
                  <span className="text-[9px] font-black text-cyan-500 uppercase tracking-widest mb-1">Total Score</span>
                  <span className={`text-lg md:text-xl font-black ${result.grade === 'Pending' ? 'text-slate-500' : 'text-white'}`}>
                    {result.grade === 'Pending' ? '---' : result.marks}/100
                  </span>
                </div>
              </div>

              {result.comments && (
                <div className="bg-slate-950/30 p-5 md:p-6 rounded-3xl border border-white/5 mt-4">
                  <p className="text-slate-500 text-[10px] uppercase font-black tracking-widest mb-2 flex items-center">
                    <span className="w-2 h-2 bg-emerald-500 rounded-full mr-2"></span>
                    Notes
                  </p>
                  <p className="text-slate-300 text-xs md:text-sm leading-relaxed italic">"{result.comments}"</p>
                </div>
              )}

              {/* Bottom Back Button - For convenient exit after reading all content */}
              <div className="pt-6 border-t border-white/5 mt-8">
                <button
                  onClick={onBack}
                  className="w-full bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 font-bold py-4 rounded-2xl border border-emerald-500/20 transition-all flex items-center justify-center gap-3 group/back-bottom"
                >
                  <svg className="w-5 h-5 group-hover/back-bottom:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                  </svg>
                  <span>Back</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default Search;
