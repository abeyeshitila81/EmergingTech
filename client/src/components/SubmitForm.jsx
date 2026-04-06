import React from 'react';

const SubmitForm = ({ 
  loading, 
  error, 
  submitSuccess, 
  newStudent, 
  setNewStudent, 
  handleAddResult 
}) => {
  return (
    <div className="max-w-xl mx-auto">
      {/* Submission Form */}
      <div className="backdrop-blur-2xl bg-white/5 p-10 rounded-[2.5rem] border border-white/10 shadow-3xl relative overflow-hidden group animate-in fade-in zoom-in-95 duration-500">
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-fuchsia-500/10 rounded-full blur-3xl"></div>
        
        <h3 className="text-2xl font-black text-white mb-8 relative z-10 flex items-center">
          <span className="w-8 h-8 bg-fuchsia-500 rounded-lg mr-3 flex items-center justify-center text-sm shadow-lg shadow-fuchsia-500/40 text-white">✓</span>
          New Achievement Registry
        </h3>

        <form onSubmit={handleAddResult} className="relative z-10 space-y-5">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 ml-1">Student Name</label>
              <input
                type="text"
                className="w-full bg-slate-900/50 border border-slate-800 rounded-2xl px-5 py-4 text-white focus:outline-none focus:ring-2 focus:ring-fuchsia-500/30 transition-all font-medium"
                value={newStudent.name}
                onChange={(e) => setNewStudent({...newStudent, name: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 ml-1">Student ID</label>
              <input
                type="text"
                className="w-full bg-slate-900/50 border border-slate-800 rounded-2xl px-5 py-4 text-white focus:outline-none focus:ring-2 focus:ring-fuchsia-500/30 transition-all font-medium"
                value={newStudent.student_id}
                onChange={(e) => setNewStudent({...newStudent, student_id: e.target.value})}
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 ml-1">Course Title</label>
            <input
              type="text"
              className="w-full bg-slate-900/50 border border-slate-800 rounded-2xl px-5 py-4 text-white focus:outline-none focus:ring-2 focus:ring-fuchsia-500/30 transition-all font-medium"
              value={newStudent.course}
              onChange={(e) => setNewStudent({...newStudent, course: e.target.value})}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 ml-1">Department</label>
              <input
                type="text"
                className="w-full bg-slate-900/50 border border-slate-800 rounded-2xl px-5 py-4 text-white focus:outline-none focus:ring-2 focus:ring-fuchsia-500/30 transition-all font-medium"
                value={newStudent.department}
                onChange={(e) => setNewStudent({...newStudent, department: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 ml-1">Batch (Year)</label>
              <input
                type="text"
                className="w-full bg-slate-900/50 border border-slate-800 rounded-2xl px-5 py-4 text-white focus:outline-none focus:ring-2 focus:ring-fuchsia-500/30 transition-all font-medium"
                value={newStudent.batch}
                onChange={(e) => setNewStudent({...newStudent, batch: e.target.value})}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-[10px] font-black text-fuchsia-400 uppercase tracking-widest mb-2 ml-1">Mid / 30</label>
              <input
                type="number"
                max="30"
                min="0"
                className="w-full bg-slate-900/50 border border-fuchsia-500/20 rounded-2xl px-4 py-4 text-white focus:outline-none focus:ring-2 focus:ring-fuchsia-500/30 transition-all font-medium"
                value={newStudent.mid_exam}
                onChange={(e) => setNewStudent({...newStudent, mid_exam: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-[10px] font-black text-emerald-400 uppercase tracking-widest mb-2 ml-1">Final / 40</label>
              <input
                type="number"
                max="40"
                min="0"
                className="w-full bg-slate-900/50 border border-emerald-500/20 rounded-2xl px-5 py-4 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/30 transition-all font-medium"
                value={newStudent.final_exam}
                onChange={(e) => setNewStudent({...newStudent, final_exam: e.target.value})}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-[10px] font-black text-fuchsia-400 uppercase tracking-widest mb-2 ml-1">Quiz / 10</label>
              <input
                type="number"
                max="10"
                min="0"
                className="w-full bg-slate-900/50 border border-fuchsia-500/20 rounded-2xl px-4 py-4 text-white focus:outline-none focus:ring-2 focus:ring-fuchsia-500/30 transition-all font-medium"
                value={newStudent.quiz}
                onChange={(e) => setNewStudent({...newStudent, quiz: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-[10px] font-black text-cyan-400 uppercase tracking-widest mb-2 ml-1">Asgn / 20</label>
              <input
                type="number"
                max="20"
                min="0"
                className="w-full bg-slate-900/50 border border-cyan-500/20 rounded-2xl px-4 py-4 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500/30 transition-all font-medium"
                value={newStudent.assignment}
                onChange={(e) => setNewStudent({...newStudent, assignment: e.target.value})}
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 ml-1">Additional Comments</label>
            <textarea
              className="w-full bg-slate-900/50 border border-slate-800 rounded-2xl px-5 py-4 text-white focus:outline-none focus:ring-2 focus:ring-fuchsia-500/30 transition-all font-medium h-24 resize-none"
              placeholder="Ex. Improvement needed in final exam..."
              value={newStudent.comments}
              onChange={(e) => setNewStudent({...newStudent, comments: e.target.value})}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-fuchsia-600 to-purple-600 hover:scale-[1.02] active:scale-[0.98] text-white font-black py-4.5 rounded-2xl shadow-xl shadow-fuchsia-900/20 transition-all mt-4"
          >
            {loading ? 'Submitting...' : 'REGISTER ACHIEVEMENT'}
          </button>
        </form>

        {submitSuccess && (
          <div className="mt-8 p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl text-emerald-400 text-sm font-bold text-center animate-bounce">
            {submitSuccess}
          </div>
        )}
        {error && (
          <div className="mt-8 p-4 bg-red-500/5 border border-red-500/20 rounded-2xl text-red-400 text-sm font-medium text-center">
            {error}
          </div>
        )}
      </div>
    </div>
  );
};

export default SubmitForm;
