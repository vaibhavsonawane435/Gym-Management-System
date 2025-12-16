import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './Components/Navbar';
import Login from './Components/Login';
import MemberList from './Components/MemberList';
import AddMemberForm from './Components/AddMemberForm';
import BillList from './Components/BillList';
import AddBill from './Components/AddBill';

function App() {
  const [role, setRole] = useState(null); // 'admin' or 'member'

  const handleLogout = () => {
    setRole(null);
  };

  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        <Navbar role={role} onLogout={handleLogout} />
        <div className="pt-4">
          <Routes>
            <Route path="/" element={<Login setRole={setRole} />} />
            <Route path="/members" element={<MemberList />} />
            <Route path="/add-member" element={<AddMemberForm />} />
            <Route path="/bills" element={<BillList />} />
            <Route path="/add-bill" element={<AddBill />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;