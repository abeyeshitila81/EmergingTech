import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Search from './components/Search';
import SubmitForm from './components/SubmitForm';
import StudentList from './components/StudentList';
import AdminLogin from './components/AdminLogin';

function App() {
  const [view, setView] = useState('search'); // 'search', 'submit', or 'list'
  const [isAdmin, setIsAdmin] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [name, setName] = useState('');
  const [studentId, setStudentId] = useState('');
  const [result, setResult] = useState(null);
  const [resultsList, setResultsList] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const [publicAccess, setPublicAccess] = useState(false);
  const [newStudent, setNewStudent] = useState({
    student_id: '',
    name: '',
    course: '',
    department: 'pharmacy',
    batch: '2016',
    mid_exam: '',
    final_exam: '',
    quiz: '',
    assignment: '',
    grade: 'Pending',
    comments: '',
    visibility: 'public'
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
        headers: { 'x-admin-password': localStorage.getItem('adminPassword') }
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

  // Redirect if view becomes restricted
  useEffect(() => {
    if (view === 'list' && !isAdmin && !publicAccess) {
      setView('search');
    }
  }, [view, isAdmin, publicAccess]);

  // Fetch all results when view changes to 'list'
  useEffect(() => {
    if (view === 'list') {
      fetchResults();
    }
  }, [view]);

  const fetchResults = async () => {
    setLoading(true);
    setError('');
    try {
      const apiBase = import.meta.env.VITE_API_BASE_URL || `http://${window.location.hostname}:5001`;
      const response = await fetch(`${apiBase}/results`);
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
      assignment: '', grade: 'Pending', comments: '', visibility: 'public' 
    });
    setError('');
    setSubmitSuccess('');
  };

  const handleClearSearch = () => {
    setResult(null);
    setName('');
    setStudentId('');
    setError('');
  };

  const getResult = async (e) => {

    e.preventDefault();
    if (!name || !studentId) {
      setError('Please enter both Name and Student ID');
      return;
    }

    setLoading(true);
    setError('');
    setResult(null);

    try {
      const apiBase = import.meta.env.VITE_API_BASE_URL || `http://${window.location.hostname}:5001`;
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

  const handleAddResult = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSubmitSuccess('');

    try {
      const apiBase = import.meta.env.VITE_API_BASE_URL || `http://${window.location.hostname}:5001`;
      const response = await fetch(`${apiBase}/add`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newStudent),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to add result');
      }

      setSubmitSuccess('Student result added successfully!');
      setNewStudent({ 
        student_id: '', 
        name: '', 
        course: '', 
        department: '',
        batch: '',
        mid_exam: '', 
        final_exam: '', 
        quiz: '', 
        assignment: '', 
        grade: 'Pending', 
        comments: '' 
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteResult = async (id) => {
    if (!window.confirm("Are you sure you want to delete this record?")) return;
    
    setLoading(true);
    setError('');
    
    try {
      const apiBase = import.meta.env.VITE_API_BASE_URL || `http://${window.location.hostname}:5001`;
      const response = await fetch(`${apiBase}/delete/${id}`, { method: 'DELETE' });
      
      if (!response.ok) {
        throw new Error('Failed to delete result');
      }
      
      fetchResults();
    } catch (err) {
      setError(err.message);
      setLoading(false); // Only set to false on error, fetchResults sets to false on success/try
    }
  };

  const handleEditResult = (student) => {
    setNewStudent({
      ...student,
      mid_exam: student.mid_exam || '',
      final_exam: student.final_exam || '',
      quiz: student.quiz || '',
      assignment: student.assignment || '',
      department: student.department || 'pharmacy',
      batch: student.batch || '2016',
      comments: student.comments || '',
      grade: student.grade || 'Pending',
      visibility: student.visibility || 'public'
    });

    });
    setSubmitSuccess('');
    setError('');
    setView('submit');
  };

  return (
    <div className="min-h-screen p-6 bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 font-sans flex flex-col justify-start">
      <div className={`w-full mx-auto py-6 md:py-12 transition-all duration-700 ${view === 'list' ? 'max-w-[98%] md:max-w-[95%] px-1 md:px-4' : 'max-w-4xl px-4'}`}>

        <Header 
          view={view} 
          setView={setView} 
          isAdmin={isAdmin}
          onLoginClick={() => setShowLogin(true)}
          onLogout={() => {
            setIsAdmin(false);
            setView('search');
          }}
        />

        {showLogin && (
          <AdminLogin 
            onLogin={() => setIsAdmin(true)} 
            onClose={() => setShowLogin(false)} 
          />
        )}

        <div className={`w-full mx-auto transition-all duration-700 ${view === 'list' ? 'max-w-full' : 'max-w-3xl'}`}>

          {view === 'search' && (
            <Search 
              loading={loading}
              error={error}
              name={name}
              setName={setName}
              studentId={studentId}
              setStudentId={setStudentId}
              getResult={getResult}
              result={result}
            />
          )}

          {view === 'submit' && isAdmin && (
            <SubmitForm 
              loading={loading}
              error={error}
              submitSuccess={submitSuccess}
              newStudent={newStudent}
              setNewStudent={setNewStudent}
              handleAddResult={handleAddResult}
            />
          )}

          {view === 'list' && (isAdmin || publicAccess) && (
            <StudentList 
              loading={loading}
              error={error}
              resultsList={resultsList}
              fetchResults={fetchResults}
              onEdit={handleEditResult}
              onDelete={handleDeleteResult}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
