import React from 'react';

const SubmitForm = ({ 
  loading, 
  error, 
  submitSuccess, 
  newStudent, 
  setNewStudent, 
  handleAddResult,
  isEditing,
  onCancel 
}) => {
  return (
    <div className="max-w-3xl mx-auto">
      {/* Submission Form */}
      <div className="backdrop-blur-2xl bg-white/5 p-10 rounded-[2.5rem] border border-white/10 shadow-3xl relative overflow-hidden group animate-in fade-in zoom-in-95 duration-500">
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-fuchsia-500/10 rounded-full blur-3xl"></div>
        
        <h3 className="text-2xl font-black text-white mb-8 relative z-10 flex items-center justify-between">
          <div className="flex items-center">
            <span className={`w-8 h-8 ${isEditing ? 'bg-blue-500 shadow-blue-500/40' : 'bg-fuchsia-500 shadow-fuchsia-500/40'} rounded-lg mr-3 flex items-center justify-center text-sm text-white transition-colors`}>
              {isEditing ? '✎' : '✓'}
            </span>
            {isEditing ? 'Update achievement' : 'New Achievement Registry'}
          </div>
          {isEditing && (
            <button 
              onClick={onCancel}
              className="text-slate-500 hover:text-white transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
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
              <select
                value={newStudent.department}
                onChange={(e) => setNewStudent({ ...newStudent, department: e.target.value })}
                className="w-full bg-slate-900/50 border border-slate-800 rounded-2xl px-5 py-4 text-white focus:outline-none focus:ring-2 focus:ring-fuchsia-500/30 transition-all font-medium appearance-none"
              >
                <option value="pharmacy">Pharmacy</option>
                <option value="nursing">Nursing</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 ml-1">Batch (Year)</label>
              <select
                value={newStudent.batch}
                onChange={(e) => setNewStudent({ ...newStudent, batch: e.target.value })}
                className="w-full bg-slate-900/50 border border-slate-800 rounded-2xl px-5 py-4 text-white focus:outline-none focus:ring-2 focus:ring-fuchsia-500/30 transition-all font-medium appearance-none"
              >
                <option value="2016">2016</option>
                <option value="2017">2017</option>
                <option value="2018">2018</option>
                <option value="2020">2020</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 ml-1 flex justify-between">
                <span>Mid Exam</span>
                <span className="text-slate-600 text-[9px]">out of 20</span>
              </label>
              <input
                type="number"
                min={0}
                max={20}
                className="w-full bg-slate-900/50 border border-slate-800 rounded-2xl px-5 py-4 text-white focus:outline-none focus:ring-2 focus:ring-fuchsia-500/30 transition-all font-medium"
                value={newStudent.mid_exam}
                onChange={(e) => setNewStudent({...newStudent, mid_exam: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 ml-1 flex justify-between">
                <span>Quiz / Attendance</span>
                <span className="text-slate-600 text-[9px]">out of 5</span>
              </label>
              <input
                type="number"
                min={0}
                max={5}
                className="w-full bg-slate-900/50 border border-slate-800 rounded-2xl px-5 py-4 text-white focus:outline-none focus:ring-2 focus:ring-fuchsia-500/30 transition-all font-medium"
                value={newStudent.quiz}
                onChange={(e) => setNewStudent({...newStudent, quiz: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 ml-1 flex justify-between">
                <span>Assignment</span>
                <span className="text-slate-600 text-[9px]">out of 15</span>
              </label>
              <input
                type="number"
                min={0}
                max={15}
                className="w-full bg-slate-900/50 border border-slate-800 rounded-2xl px-5 py-4 text-white focus:outline-none focus:ring-2 focus:ring-fuchsia-500/30 transition-all font-medium"
                value={newStudent.assignment}
                onChange={(e) => setNewStudent({...newStudent, assignment: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 ml-1 flex justify-between">
                <span>Other</span>
                <span className="text-slate-600 text-[9px]">out of 20</span>
              </label>
              <input
                type="number"
                min={0}
                max={20}
                className="w-full bg-slate-900/50 border border-slate-800 rounded-2xl px-5 py-4 text-white focus:outline-none focus:ring-2 focus:ring-fuchsia-500/30 transition-all font-medium"
                value={newStudent.other}
                onChange={(e) => setNewStudent({...newStudent, other: e.target.value})}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 ml-1 flex justify-between">
                <span>Final Exam</span>
                <span className="text-slate-600 text-[9px]">out of 40</span>
              </label>
              <input
                type="number"
                min={0}
                max={40}
                className="w-full bg-slate-900/50 border border-slate-800 rounded-2xl px-5 py-4 text-white focus:outline-none focus:ring-2 focus:ring-fuchsia-500/30 transition-all font-medium"
                value={newStudent.final_exam}
                onChange={(e) => setNewStudent({...newStudent, final_exam: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 ml-1">Grade</label>
              <input
                type="text"
                className="w-full bg-slate-900/50 border border-slate-800 rounded-2xl px-5 py-4 text-white focus:outline-none focus:ring-2 focus:ring-fuchsia-500/30 transition-all font-medium"
                value={newStudent.grade}
                onChange={(e) => setNewStudent({...newStudent, grade: e.target.value})}
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

          <div className="flex gap-4 mt-4">
            {isEditing && (
              <button
                type="button"
                onClick={onCancel}
                className="flex-1 bg-slate-800 hover:bg-slate-700 text-white font-bold py-4.5 rounded-2xl transition-all"
              >
                CANCEL
              </button>
            )}
            <button
              type="submit"
              disabled={loading}
              className={`flex-[2] bg-gradient-to-r ${isEditing ? 'from-blue-600 to-cyan-600 shadow-blue-900/20' : 'from-fuchsia-600 to-purple-600 shadow-fuchsia-900/20'} hover:scale-[1.02] active:scale-[0.98] text-white font-black py-4.5 rounded-2xl shadow-xl transition-all`}
            >
              {loading ? 'Processing...' : isEditing ? 'UPDATE RECORD' : 'REGISTER ACHIEVEMENT'}
            </button>
          </div>
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
