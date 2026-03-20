import React, { useState } from 'react';

const StudentList = ({ resultsList, loading, error, fetchResults, onDelete, onEdit }) => {
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
            <p className="text-slate-400 text-sm">Managing {filteredResults.length} registered students</p>
          </div>
          <button
            onClick={fetchResults}
            className="bg-slate-800/50 hover:bg-slate-700/50 text-slate-300 p-2 rounded-xl border border-slate-700 transition-all self-end md:self-auto"
            title="Refresh List"
          >
            <svg className={`w-5 h-5 ${loading ? 'animate-spin' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex bg-slate-800/50 p-1 rounded-xl border border-slate-700/50 w-fit">
            <button 
              onClick={() => setDeptFilter('all')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${deptFilter === 'all' ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/20' : 'text-slate-400 hover:text-white'}`}
            >
              All Depts
            </button>
            <button 
              onClick={() => setDeptFilter('pharmacy')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${deptFilter === 'pharmacy' ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/20' : 'text-slate-400 hover:text-white'}`}
            >
              Pharmacy
            </button>
            <button 
              onClick={() => setDeptFilter('nursing')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${deptFilter === 'nursing' ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/20' : 'text-slate-400 hover:text-white'}`}
            >
              Nursing
            </button>
          </div>

          <div className="flex bg-slate-800/50 p-1 rounded-xl border border-slate-700/50 w-fit">
            <button 
              onClick={() => setBatchFilter('all')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${batchFilter === 'all' ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/20' : 'text-slate-400 hover:text-white'}`}
            >
              All Batches
            </button>
            <button 
              onClick={() => setBatchFilter('2016')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${batchFilter === '2016' ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/20' : 'text-slate-400 hover:text-white'}`}
            >
              2016
            </button>
            <button 
              onClick={() => setBatchFilter('2018')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${batchFilter === '2018' ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/20' : 'text-slate-400 hover:text-white'}`}
            >
              2018
            </button>
            <button 
              onClick={() => setBatchFilter('2020')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${batchFilter === '2020' ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/20' : 'text-slate-400 hover:text-white'}`}
            >
              2020
            </button>
          </div>
        </div>
      </div>

      {error && (
        <div className="bg-rose-500/10 border border-rose-500/20 rounded-2xl p-4 text-rose-400 text-sm font-medium text-center animate-in fade-in duration-300">
          ⚠️ {error}
        </div>
      )}

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
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">Student ID</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">Name</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">Dept/Batch</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">Course</th>
                <th className="px-6 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">Date Added</th>
                <th className="px-6 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">Mid</th>
                <th className="px-6 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">Quiz</th>
                <th className="px-6 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">Assig</th>
                <th className="px-6 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">Final</th>
                <th className="px-6 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Total</th>
                <th className="px-6 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">Grade</th>
                <th className="px-6 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filteredResults.map((student, index) => (
                <tr key={student._id} className="hover:bg-white/5 transition-colors group">
                  <td className="px-6 py-4 text-center">
                    <span className="text-[10px] font-black text-slate-600 bg-slate-900/30 w-6 h-6 flex items-center justify-center rounded-full mx-auto border border-white/5">
                      {index + 1}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-slate-500 text-xs font-black tracking-widest uppercase">{student.student_id || '---'}</p>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-white font-bold">{student.name || '---'}</p>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex flex-col gap-1">
                      <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider w-fit ${student.department === 'pharmacy' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-blue-500/10 text-blue-400 border border-blue-500/20'}`}>
                        {student.department || 'Pharmacy'}
                      </span>
                      <span className="text-[10px] text-slate-500 font-bold ml-1">Batch: {student.batch || '2016'}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-slate-400 text-sm font-medium">{student.course || '---'}</p>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <p className="text-slate-500 text-[10px] font-bold">
                      {student.createdAt ? new Date(student.createdAt).toLocaleDateString() : '---'}
                    </p>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className="text-xs font-black text-slate-500 bg-slate-900/50 px-2 py-1 rounded-md border border-white/5">
                      {student.mid_exam ?? '---'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className="text-xs font-black text-slate-500 bg-slate-900/50 px-2 py-1 rounded-md border border-white/5">
                      {student.quiz ?? '---'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className="text-xs font-black text-slate-500 bg-slate-900/50 px-2 py-1 rounded-md border border-white/5">
                      {student.assignment ?? '---'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className="text-xs font-black text-slate-500 bg-slate-900/50 px-2 py-1 rounded-md border border-white/5">
                      {(student.final_exam !== undefined && student.final_exam !== null) ? student.final_exam : '---'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <span className={`font-black text-lg ${student.grade === 'Pending' ? 'text-slate-500' : 'text-white'}`}>
                      {student.grade === 'Pending' ? '---' : student.marks}
                      <span className="text-[10px] text-slate-500 ml-0.5 font-bold">/100</span>
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <div className={`w-10 h-10 ${student.grade === 'Pending' ? 'bg-slate-900/30 text-slate-600' : 'bg-slate-800 text-emerald-400'} rounded-lg flex items-center justify-center border border-white/5 font-black group-hover:scale-110 transition-transform mx-auto relative group/info`}>
                      {student.grade === 'Pending' ? '...' : student.grade}
                      {student.comments && (
                        <div className="absolute bottom-full mb-2 hidden group-hover/info:block w-48 bg-slate-900 border border-white/10 p-3 rounded-xl text-[10px] text-slate-300 shadow-2xl z-50 pointer-events-none leading-relaxed">
                          <p className="font-black text-emerald-400 uppercase tracking-widest mb-1 border-b border-white/5 pb-1">Notes</p>
                          {student.comments}
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <div className="flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={() => onEdit(student)}
                        className="p-2 bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 rounded-lg border border-blue-500/20 transition-all"
                        title="Edit Record"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                      </button>
                      <button
                        onClick={() => onDelete(student.student_id)}
                        className="p-2 bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 rounded-lg border border-rose-500/20 transition-all"
                        title="Delete Record"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-4v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
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
