import React from 'react';

const StudentList = ({ 
  loading, 
  error, 
  resultsList, 
  fetchResults 
}) => {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-8 duration-500">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-2xl font-black text-white ml-2 tracking-tight">Student Directory</h3>
        <button 
          onClick={fetchResults}
          className="bg-slate-800/50 hover:bg-slate-700/50 text-slate-300 p-2 rounded-xl border border-slate-700 transition-all"
          title="Refresh List"
        >
          <svg className={`w-5 h-5 ${loading ? 'animate-spin' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
        </button>
      </div>

      {loading && resultsList.length === 0 ? (
        <div className="text-center py-20 bg-white/5 rounded-[2.5rem] border border-white/10 border-dashed">
          <div className="inline-block w-8 h-8 border-4 border-emerald-500/30 border-t-emerald-500 rounded-full animate-spin mb-4"></div>
          <p className="text-slate-500 font-bold uppercase tracking-widest text-xs">Synchronizing Records...</p>
        </div>
      ) : resultsList.length === 0 ? (
        <div className="text-center py-20 bg-white/5 rounded-[2.5rem] border border-white/10 border-dashed">
          <p className="text-slate-500 font-bold uppercase tracking-widest text-xs">No records found in database</p>
        </div>
      ) : (
        <div className="overflow-x-auto backdrop-blur-xl bg-white/5 rounded-3xl border border-white/10 shadow-3xl">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/10 bg-white/5">
                <th className="px-6 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest w-12 text-center">#</th>
                <th className="px-6 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-left">Student</th>
                <th className="px-6 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-left">ID</th>
                <th className="px-6 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-left">Course</th>
                <th className="px-6 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">Date Added</th>
                <th className="px-6 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">Mid / 30</th>
                <th className="px-6 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">Final / 40</th>
                <th className="px-6 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">Quiz</th>
                <th className="px-6 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">Asgn</th>
                <th className="px-6 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Total</th>
                <th className="px-6 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">Grade</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {resultsList.map((item, index) => (
                <tr key={item._id} className="hover:bg-white/5 transition-colors group">
                  <td className="px-6 py-4 text-center">
                    <span className="text-[10px] font-black text-slate-600 bg-slate-900/30 w-6 h-6 flex items-center justify-center rounded-full mx-auto border border-white/5">
                      {index + 1}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-white font-bold">{item.name || '---'}</p>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-slate-500 text-xs font-black tracking-widest uppercase">{item.student_id || '---'}</p>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-slate-400 text-sm font-medium">{item.course || '---'}</p>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <p className="text-slate-500 text-[10px] font-bold">
                      {item.createdAt ? new Date(item.createdAt).toLocaleDateString() : '---'}
                    </p>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className="text-xs font-black text-fuchsia-400 bg-fuchsia-500/5 px-2 py-1 rounded-md border border-fuchsia-500/10">
                      {item.mid_exam ?? '---'}
                      <span className="text-[8px] opacity-40 ml-0.5">/30</span>
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className="text-xs font-black text-emerald-400 bg-emerald-500/5 px-2 py-1 rounded-md border border-emerald-500/10">
                      {(item.final_exam !== undefined && item.final_exam !== null) ? item.final_exam : '---'}
                      <span className="text-[8px] opacity-40 ml-0.5">/40</span>
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className="text-xs font-black text-fuchsia-400 bg-fuchsia-500/5 px-2 py-1 rounded-md border border-fuchsia-500/10">
                      {item.quiz ?? '---'}
                      <span className="text-[8px] opacity-40 ml-0.5">/10</span>
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className="text-xs font-black text-cyan-400 bg-cyan-500/5 px-2 py-1 rounded-md border border-cyan-500/10">
                      {item.assignment ?? '---'}
                      <span className="text-[8px] opacity-40 ml-0.5">/20</span>
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <span className={`font-black text-lg ${item.grade === 'Pending' ? 'text-slate-500' : 'text-white'}`}>
                      {item.grade === 'Pending' ? '---' : item.marks}
                      <span className="text-[10px] text-slate-500 ml-0.5 font-bold">/100</span>
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <div className={`w-10 h-10 ${item.grade === 'Pending' ? 'bg-slate-900/30 text-slate-600' : 'bg-slate-800 text-emerald-400'} rounded-lg flex items-center justify-center border border-white/5 font-black group-hover:scale-110 transition-transform mx-auto relative group/info`}>
                      {item.grade === 'Pending' ? '...' : item.grade}
                      {item.comments && (
                        <div className="absolute bottom-full mb-2 hidden group-hover/info:block w-48 bg-slate-900 border border-white/10 p-3 rounded-xl text-[10px] text-slate-300 shadow-2xl z-50 pointer-events-none leading-relaxed">
                          <p className="font-black text-emerald-400 uppercase tracking-widest mb-1 border-b border-white/5 pb-1">Notes</p>
                          {item.comments}
                        </div>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default StudentList;
