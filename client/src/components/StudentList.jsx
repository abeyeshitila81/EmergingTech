import React, { useState } from 'react';
import { RefreshCcw, Edit2, Trash2, CheckCircle, Info } from 'lucide-react';

const StudentList = ({
  isAdmin,
  resultsList,
  loading,
  error,
  fetchResults,
  onDelete,
  onEdit
}) => {
  const [deptFilter, setDeptFilter] = useState('all');
  const [batchFilter, setBatchFilter] = useState('all');

  const filteredResults = resultsList.filter(student => {
    const matchesDept = deptFilter === 'all' ? true : student.department === deptFilter;
    const matchesBatch = batchFilter === 'all' ? true : student.batch === batchFilter;
    return matchesDept && matchesBatch;
  });

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-8 duration-500">
      <div className="flex flex-col gap-6 mb-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-white mb-1">Student Directory</h2>
            <p className="text-slate-400 text-sm italic">Showing {filteredResults.length} registered students</p>
          </div>
          <button
            onClick={fetchResults}
            className="bg-slate-800/50 hover:bg-slate-700/50 text-slate-300 p-2.5 rounded-xl border border-slate-700 transition-all self-end md:self-auto group"
            title="Refresh List"
          >
            <RefreshCcw className={`w-5 h-5 ${loading ? 'animate-spin' : 'group-hover:rotate-180'} transition-all duration-500`} />
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex bg-slate-900/80 p-1 rounded-xl border border-slate-700/50 w-fit backdrop-blur-md">
            <button 
              onClick={() => setDeptFilter('all')}
              className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all ${deptFilter === 'all' ? 'bg-indigo-600 text-white shadow-lg' : 'text-slate-500 hover:text-slate-300'}`}
            >
              All Depts
            </button>
            <button 
              onClick={() => setDeptFilter('pharmacy')}
              className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all ${deptFilter === 'pharmacy' ? 'bg-indigo-600 text-white shadow-lg' : 'text-slate-500 hover:text-slate-300'}`}
            >
              Pharmacy
            </button>
            <button 
              onClick={() => setDeptFilter('nursing')}
              className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all ${deptFilter === 'nursing' ? 'bg-indigo-600 text-white shadow-lg' : 'text-slate-500 hover:text-slate-300'}`}
            >
              Nursing
            </button>
          </div>

          <div className="flex bg-slate-900/80 p-1 rounded-xl border border-slate-700/50 w-fit backdrop-blur-md">
            <button 
              onClick={() => setBatchFilter('all')}
              className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all ${batchFilter === 'all' ? 'bg-indigo-600 text-white shadow-lg' : 'text-slate-500 hover:text-slate-300'}`}
            >
              All Batches
            </button>
            <button 
              onClick={() => setBatchFilter('2016')}
              className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all ${batchFilter === '2016' ? 'bg-indigo-600 text-white shadow-lg' : 'text-slate-500 hover:text-slate-300'}`}
            >
              2016
            </button>
            <button 
              onClick={() => setBatchFilter('2017')}
              className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all ${batchFilter === '2017' ? 'bg-indigo-600 text-white shadow-lg' : 'text-slate-500 hover:text-slate-300'}`}
            >
              2017
            </button>
            <button 
              onClick={() => setBatchFilter('2018')}
              className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all ${batchFilter === '2018' ? 'bg-indigo-600 text-white shadow-lg' : 'text-slate-500 hover:text-slate-300'}`}
            >
              2018
            </button>
            <button 
              onClick={() => setBatchFilter('2020')}
              className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all ${batchFilter === '2020' ? 'bg-indigo-600 text-white shadow-lg' : 'text-slate-500 hover:text-slate-300'}`}
            >
              2020
            </button>
          </div>
        </div>
      </div>

      {error && (
        <div className="bg-rose-500/10 border border-rose-500/20 rounded-2xl p-4 text-rose-400 text-sm font-medium text-center animate-in fade-in">
          ⚠️ {error}
        </div>
      )}

      {loading && resultsList.length === 0 ? (
        <div className="text-center py-20 bg-white/5 rounded-[2.5rem] border border-white/10 border-dashed">
          <div className="inline-block w-8 h-8 border-4 border-indigo-500/30 border-t-indigo-500 rounded-full animate-spin mb-4"></div>
          <p className="text-slate-500 font-bold uppercase tracking-widest text-[10px]">Retrieving Records...</p>
        </div>
      ) : resultsList.length === 0 ? (
        <div className="text-center py-20 bg-white/5 rounded-[2.5rem] border border-white/10 border-dashed">
          <p className="text-slate-500 font-bold uppercase tracking-widest text-[10px]">No records match your filters</p>
        </div>
      ) : (
        <div className="overflow-x-auto backdrop-blur-xl bg-white/5 rounded-3xl border border-white/10 shadow-3xl">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/10 bg-white/5">
                <th className="px-6 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest w-12 text-center">#</th>
                <th className="px-6 py-4 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest">ID</th>
                <th className="px-6 py-4 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest">PIN</th>
                <th className="px-6 py-4 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest">Student</th>
                <th className="px-6 py-4 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest">Dept/Batch</th>
                <th className="px-6 py-4 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest">Course</th>
                <th className="px-6 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">Mid</th>
                <th className="px-6 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">Quiz</th>
                <th className="px-6 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">Final</th>
                <th className="px-6 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Total</th>
                <th className="px-6 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">Grade</th>
                {isAdmin && <th className="px-6 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center whitespace-nowrap">Actions</th>}
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filteredResults.map((student, index) => (
                <tr key={student._id} className="hover:bg-white/5 transition-colors group border-b border-white/5 last:border-0">
                  <td className="px-6 py-5 text-center">
                    <span className="text-[10px] font-black text-slate-600 bg-slate-900/30 w-6 h-6 flex items-center justify-center rounded-full mx-auto border border-white/5">
                      {index + 1}
                    </span>
                  </td>
                  <td className="px-6 py-5">
                    <p className="text-indigo-400 text-xs font-mono font-bold tracking-tighter">{student.student_id}</p>
                  </td>
                  <td className="px-6 py-5">
                    <span className="text-fuchsia-400 text-[10px] font-mono font-black tracking-widest bg-fuchsia-500/10 px-2 py-1 rounded-md border border-fuchsia-500/20">{student.pin || '----'}</span>
                  </td>
                  <td className="px-6 py-5">
                    <p className="text-white font-bold leading-tight">{student.name}</p>
                    <p className="text-slate-500 text-[9px] uppercase tracking-tighter mt-0.5">{student.createdAt ? new Date(student.createdAt).toLocaleDateString() : 'New'}</p>
                  </td>
                  <td className="px-6 py-5 whitespace-nowrap">
                    <div className="flex flex-col gap-1">
                      <span className={`px-2 py-0.5 rounded-md text-[9px] font-black uppercase tracking-widest w-fit border ${student.department === 'pharmacy' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 'bg-blue-500/10 text-blue-400 border-blue-500/20'}`}>
                        {student.department || 'Pharmacy'}
                      </span>
                      <span className="text-[9px] text-slate-500 font-bold ml-1 uppercase">Batch {student.batch || '2016'}</span>
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <p className="text-slate-300 text-xs font-medium truncate max-w-[120px]">{student.course}</p>
                  </td>
                  <td className="px-6 py-5 text-center">
                    <span className="text-xs font-bold text-slate-400 bg-slate-900/50 px-2 py-1 rounded-lg border border-white/5">{student.mid_exam ?? '-'}</span>
                  </td>
                  <td className="px-6 py-5 text-center">
                    <span className="text-xs font-bold text-slate-400 bg-slate-900/50 px-2 py-1 rounded-lg border border-white/5">{student.quiz ?? '-'}</span>
                  </td>
                  <td className="px-6 py-5 text-center">
                    <span className="text-xs font-bold text-slate-400 bg-slate-900/50 px-2 py-1 rounded-lg border border-white/5">{student.final_exam ?? '-'}</span>
                  </td>
                  <td className="px-6 py-5 text-right font-mono">
                    <span className={`text-base font-black ${student.grade === 'Pending' ? 'text-slate-600' : 'text-white'}`}>
                      {student.grade === 'Pending' ? '--' : student.marks}
                      <span className="text-[8px] text-slate-600 ml-0.5 font-bold">/100</span>
                    </span>
                  </td>
                  <td className="px-6 py-5 text-center">
                    <div className={`w-9 h-9 ${student.grade === 'Pending' ? 'bg-slate-900/30 text-slate-600' : 'bg-slate-800 text-emerald-400'} rounded-xl flex items-center justify-center border border-white/10 font-black relative group/info cursor-default transition-all hover:scale-110`}>
                      {student.grade === 'Pending' ? '...' : student.grade}
                      {student.comments && (
                        <div className="absolute bottom-full mb-3 hidden group-hover/info:block w-56 bg-slate-900 border border-white/10 p-4 rounded-2xl text-[10px] text-slate-400 shadow-3xl z-50 pointer-events-none leading-relaxed backdrop-blur-xl">
                          <p className="font-black text-emerald-400 uppercase tracking-widest mb-2 border-b border-white/5 pb-1 flex items-center gap-1.5"><Info className="w-3 h-3" /> Teacher Notes</p>
                          {student.comments}
                        </div>
                      )}
                    </div>
                  </td>
                  {isAdmin && (
                    <td className="px-6 py-5">
                      <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300">
                        <button
                          onClick={() => onEdit(student)}
                          className="p-2 bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-400 rounded-xl border border-indigo-500/20 transition-all hover:shadow-lg hover:shadow-indigo-500/10"
                          title="Edit Student"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => onDelete(student.student_id)}
                          className="p-2 bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 rounded-xl border border-rose-500/20 transition-all hover:shadow-lg hover:shadow-rose-500/10"
                          title="Remove Record"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  )}
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
