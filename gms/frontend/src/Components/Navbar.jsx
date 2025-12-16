import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = ({ role, onLogout }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    onLogout();
    navigate('/');
  };

  return (
    <nav className="bg-gradient-to-r from-slate-900 via-purple-800 to-slate-900 shadow-2xl border-b-4 border-purple-500">
      <div className="max-w-7xl mx-auto px-6 py-4 sm:px-8 lg:px-10">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="text-3xl font-black bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent hover:from-pink-400 hover:to-purple-400 transition-all duration-300">
              💪 GYM Elite
            </div>
            <span className="text-xs font-bold text-purple-300 uppercase tracking-widest">Management System</span>
          </div>
          
          <div className="flex items-center gap-1 sm:gap-2 md:gap-4">
            {role && (
              <Link 
                to="/" 
                className="px-3 sm:px-4 py-2 text-white font-semibold rounded-lg bg-purple-600 hover:bg-purple-500 transition-all duration-300 text-xs sm:text-sm hover:shadow-lg hover:shadow-purple-500/50 transform hover:scale-105"
              >
                🏠 Home
              </Link>
            )}
            {role === 'admin' && (
              <>
                <Link 
                  to="/members" 
                  className="px-3 sm:px-4 py-2 text-white font-semibold rounded-lg bg-blue-600 hover:bg-blue-500 transition-all duration-300 text-xs sm:text-sm hover:shadow-lg hover:shadow-blue-500/50 transform hover:scale-105"
                >
                  👥 Members
                </Link>
                <Link 
                  to="/add-member" 
                  className="px-3 sm:px-4 py-2 text-white font-semibold rounded-lg bg-green-600 hover:bg-green-500 transition-all duration-300 text-xs sm:text-sm hover:shadow-lg hover:shadow-green-500/50 transform hover:scale-105"
                >
                  ➕ Add
                </Link>
                <Link 
                  to="/bills" 
                  className="px-3 sm:px-4 py-2 text-white font-semibold rounded-lg bg-orange-600 hover:bg-orange-500 transition-all duration-300 text-xs sm:text-sm hover:shadow-lg hover:shadow-orange-500/50 transform hover:scale-105"
                >
                  💳 Bills
                </Link>
                <Link 
                  to="/add-bill" 
                  className="px-3 sm:px-4 py-2 text-white font-semibold rounded-lg bg-red-600 hover:bg-red-500 transition-all duration-300 text-xs sm:text-sm hover:shadow-lg hover:shadow-red-500/50 transform hover:scale-105"
                >
                  📄 Create
                </Link>
              </>
            )}
            {role === 'member' && (
              <Link 
                to="/bills" 
                className="px-3 sm:px-4 py-2 text-white font-semibold rounded-lg bg-indigo-600 hover:bg-indigo-500 transition-all duration-300 text-xs sm:text-sm hover:shadow-lg hover:shadow-indigo-500/50 transform hover:scale-105"
              >
                📋 Receipts
              </Link>
            )}
            {role && (
              <button
                onClick={handleLogout}
                className="px-3 sm:px-4 py-2 text-white font-semibold rounded-lg bg-red-700 hover:bg-red-600 transition-all duration-300 text-xs sm:text-sm hover:shadow-lg hover:shadow-red-500/50 transform hover:scale-105"
              >
                🚪 Logout
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;