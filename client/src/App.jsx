import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Search from './components/Search';
import SubmitForm from './components/SubmitForm';
import StudentList from './components/StudentList';
import AdminLogin from './components/AdminLogin';

function App() {
  const [view, setView] = useState('search'); // 'search', 'submit', or 'list'
  const [isAdmin, setIsAdmin] = useState(() => localStorage.getItem('isAdmin') === 'true');
  const [adminPassword, setAdminPassword] = useState(() => localStorage.getItem('adminPassword') || '');
  const [showLogin, setShowLogin] = useState(false);
  const [name, setName] = useState('');
  const [studentId, setStudentId] = useState('');
  const [result, setResult] = useState(null);
  const [resultsList, setResultsList] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [publicAccess, setPublicAccess] = useState(false);

  const [newStudent, setNewStudent] = useState({
    student_id: '',
    name: '',
    course: '',
    mid_exam: '',
    final_exam: '',
    quiz: '',
    assignment: '',
    department: 'pharmacy',
    batch: '2016',
    grade: '',
    comments: ''
  });
  const [submitSuccess, setSubmitSuccess] = useState('');

  // Fetch public access status on load
  useEffect(() => {
    fetchPublicAccess();
  }, []);

  const fetchPublicAccess = async () => {
    try {
      const isLocal = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
      const apiBase = import.meta.env.VITE_API_BASE_URL || (isLocal ? `http://${window.location.hostname}:5001` : '');
      const response = await fetch(`${apiBase}/public-access`);
      const data = await response.json();
      setPublicAccess(data.publicAccess);
    } catch (err) {
      console.error("Failed to fetch public access status", err);
    }
  };

  const handleTogglePublicAccess = async () => {
    setLoading(true);
    try {
      const isLocal = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
      const apiBase = import.meta.env.VITE_API_BASE_URL || (isLocal ? `http://${window.location.hostname}:5001` : '');
      const response = await fetch(`${apiBase}/toggle-public-access`, {
        method: 'POST',
        headers: { 'x-admin-password': adminPassword }
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to toggle public access');
      }
      const data = await response.json();
      setPublicAccess(data.publicAccess);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Persist session to localStorage
  useEffect(() => {
    localStorage.setItem('isAdmin', isAdmin);
    localStorage.setItem('adminPassword', adminPassword);
  }, [isAdmin, adminPassword]);

  // Redirect if view becomes restricted
  useEffect(() => {
    if (view === 'list' && !isAdmin) {
      setView('search');
    }
  }, [view, isAdmin]);

  // Fetch all results when view changes to 'list'
  useEffect(() => {
    setError(''); // Clear any previous errors when switching views
    if (view === 'list') {
      fetchResults();
    }
  }, [view]);

  const fetchResults = async () => {
    setLoading(true);
    setError('');
    try {
      const isLocal = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
      const apiBase = import.meta.env.VITE_API_BASE_URL || (isLocal ? `http://${window.location.hostname}:5001` : '');
      const response = await fetch(`${apiBase}/results`, {
        headers: { 'x-admin-password': adminPassword }
      });
      if (!response.ok) throw new Error('Failed to fetch results');
      const data = await response.json();
      setResultsList(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setNewStudent({ 
      student_id: '', name: '', course: '', 
      department: 'pharmacy', batch: '2016', 
      mid_exam: '', final_exam: '', quiz: '', 
      assignment: '', grade: '', comments: '' 
    });
    setError('');
    setSubmitSuccess('');
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!name || !studentId) {
      setError('Please enter both Name and Student ID');
      return;
    }

    setLoading(true);
    setError('');
    setResult(null);

    try {
      const isLocal = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
      const apiBase = import.meta.env.VITE_API_BASE_URL || (isLocal ? `http://${window.location.hostname}:5001` : '');
      const response = await fetch(`${apiBase}/result?name=${name}&id=${studentId}`);
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Result not found');
      }
      const data = await response.json();
      setResult(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSubmitSuccess('');

    try {
      const isLocal = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
      const apiBase = import.meta.env.VITE_API_BASE_URL || (isLocal ? `http://${window.location.hostname}:5001` : '');
      const response = await fetch(`${apiBase}/add`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'x-admin-password': adminPassword
        },
        body: JSON.stringify(newStudent),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to add result');
      }

      setSubmitSuccess(isEditing ? 'Student result updated successfully!' : 'Student result added successfully!');
      resetForm();
      if (isEditing) {
        setIsEditing(false);
        setView('list');
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (sid) => {
    if (!window.confirm('Are you sure you want to delete this record?')) return;
    setLoading(true);
    try {
      const isLocal = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
      const apiBase = import.meta.env.VITE_API_BASE_URL || (isLocal ? `http://${window.location.hostname}:5001` : '');
      const response = await fetch(`${apiBase}/delete/${sid}`, { 
        method: 'DELETE',
        headers: { 'x-admin-password': adminPassword }
      });
      if (!response.ok) throw new Error('Failed to delete student');
      fetchResults();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (student) => {
    setNewStudent({
      ...student,
      mid_exam: student.mid_exam || '',
      final_exam: student.final_exam || '',
      quiz: student.quiz || '',
      assignment: student.assignment || '',
      department: student.department || 'pharmacy',
      batch: student.batch || '2016',
      comments: student.comments || ''
    });
    setIsEditing(true);
    setView('submit');
  };

  return (
    <div className="min-h-screen p-6 bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 font-sans flex flex-col justify-start">
      <div className={`w-full mx-auto py-6 md:py-12 transition-all duration-700 ${view === 'list' ? 'max-w-[100%] px-2 md:px-6' : 'max-w-4xl px-4'}`}>
        <Header 
          view={view} 
          setView={setView} 
          isAdmin={isAdmin}
          publicAccess={publicAccess}
          onTogglePublicAccess={handleTogglePublicAccess}
          onLoginClick={() => setShowLogin(true)}
          onLogout={() => {
            setIsAdmin(false);
            setAdminPassword('');
            localStorage.removeItem('isAdmin');
            localStorage.removeItem('adminPassword');
            setView('search');
          }}
        />

        {showLogin && (
          <AdminLogin 
            onLogin={(pass) => {
              setIsAdmin(true);
              setAdminPassword(pass);
              localStorage.setItem('isAdmin', 'true');
              localStorage.setItem('adminPassword', pass);
            }} 
            onClose={() => setShowLogin(false)} 
          />
        )}

        <div className={`w-full mx-auto transition-all duration-700 ${view === 'list' ? 'max-w-full' : 'max-w-3xl'}`}>
          {view === 'search' && (isAdmin || publicAccess) && (
            <Search 
              loading={loading}
              error={error}
              name={name}
              setName={setName}
              studentId={studentId}
              setStudentId={setStudentId}
              getResult={handleSearch}
              result={result}
            />
          )}

          {view === 'search' && !isAdmin && !publicAccess && (
            <div className="text-center py-20 bg-white/5 rounded-[2.5rem] border border-white/10 border-dashed animate-in fade-in duration-500">
              <div className="w-16 h-16 bg-rose-500/10 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-rose-500/20">
                <span className="text-2xl">🔒</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Search Restricted</h3>
              <p className="text-slate-400 max-w-xs mx-auto">Individual result lookup is currently private. Please check back later or contact the administrator.</p>
            </div>
          )}

          {view === 'submit' && isAdmin && (
            <SubmitForm 
              loading={loading}
              error={error}
              submitSuccess={submitSuccess}
              newStudent={newStudent}
              setNewStudent={setNewStudent}
              handleAddResult={handleSubmit}
              isEditing={isEditing}
              onCancel={() => {
                setIsEditing(false);
                resetForm();
                setView('list');
              }}
            />
          )}

          {view === 'list' && isAdmin && (
            <StudentList 
              isAdmin={isAdmin}
              loading={loading}
              error={error}
              resultsList={resultsList}
              fetchResults={fetchResults}
              onDelete={handleDelete}
              onEdit={handleEdit}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
