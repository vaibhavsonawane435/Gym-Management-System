import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = ({ setRole }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/login', { username, password });
      if (res.data.success) {
        setRole(res.data.role);
        navigate(res.data.role === 'admin' ? '/members' : '/bills');
      } else {
        alert('Invalid Credentials');
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[80vh]">
      <div className="bg-white p-10 rounded-2xl shadow-2xl w-full max-w-md border border-slate-200">
        <div className="text-center mb-8">
            <h2 className="text-3xl font-extrabold text-slate-800">Welcome Back</h2>
            <p className="text-slate-500 mt-2">Manage your gym with ease</p>
        </div>
        
        <form className="space-y-6">
            <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Username</label>
                <input 
                    className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                    placeholder="admin / user" 
                    onChange={(e) => setUsername(e.target.value)} 
                />
            </div>
            <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Password</label>
                <input 
                    type="password"
                    className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                    placeholder="••••••••" 
                    onChange={(e) => setPassword(e.target.value)} 
                />
            </div>
            <button 
                onClick={handleLogin}
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            >
                Sign In
            </button>
        </form>
        <div className="mt-6 text-center text-xs text-slate-400">
            <p>Demo Admin: admin / admin123</p>
            <p>Demo User: user / user123</p>
        </div>
      </div>
    </div>
  );
};

export default Login;