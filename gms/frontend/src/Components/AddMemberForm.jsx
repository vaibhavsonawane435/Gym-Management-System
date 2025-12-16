import React, { useState } from 'react';
import axios from 'axios';

const AddMemberForm = () => {
  const [form, setForm] = useState({ name: '', contact: '', package: '', joinDate: '' });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await axios.post('http://localhost:5000/api/members', form);
      setSuccess(true);
      setForm({ name: '', contact: '', package: '', joinDate: '' });
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      alert('Error adding member');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <div className="mb-8 text-center">
          <h2 className="text-4xl font-black bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent mb-2">➕ Add New Member</h2>
          <p className="text-purple-300 font-medium">Welcome to the Elite Fitness Club</p>
        </div>

        {success && (
          <div className="mb-6 p-4 bg-green-500/20 border-2 border-green-400 rounded-lg text-green-300 font-bold text-center animate-pulse">
            ✅ Member Added Successfully!
          </div>
        )}

        <form onSubmit={handleSubmit} className="bg-gradient-to-br from-slate-800 to-purple-900 rounded-2xl shadow-2xl p-8 border-2 border-green-500 space-y-6">
          <div>
            <label className="block text-green-400 font-bold mb-2">👤 Full Name</label>
            <input
              type="text"
              placeholder="Enter member name"
              value={form.name}
              onChange={e => setForm({...form, name: e.target.value})}
              required
              className="w-full px-4 py-3 bg-slate-700 border-2 border-green-400 rounded-lg text-white placeholder-green-400/50 focus:outline-none focus:border-green-300 focus:shadow-lg focus:shadow-green-500/20 transition-all duration-300 font-medium"
            />
          </div>

          <div>
            <label className="block text-green-400 font-bold mb-2">📱 Contact Number</label>
            <input
              type="tel"
              placeholder="Enter phone number"
              value={form.contact}
              onChange={e => setForm({...form, contact: e.target.value})}
              required
              className="w-full px-4 py-3 bg-slate-700 border-2 border-green-400 rounded-lg text-white placeholder-green-400/50 focus:outline-none focus:border-green-300 focus:shadow-lg focus:shadow-green-500/20 transition-all duration-300 font-medium"
            />
          </div>

          <div>
            <label className="block text-green-400 font-bold mb-2">💳 Membership Package</label>
            <select
              value={form.package}
              onChange={e => setForm({...form, package: e.target.value})}
              required
              className="w-full px-4 py-3 bg-slate-700 border-2 border-green-400 rounded-lg text-white focus:outline-none focus:border-green-300 focus:shadow-lg focus:shadow-green-500/20 transition-all duration-300 font-medium cursor-pointer"
            >
              <option value="">-- Select Package --</option>
              <option value="Monthly">📅 Monthly (₹999)</option>
              <option value="Quarterly">📅 Quarterly (₹2499)</option>
              <option value="Yearly">📅 Yearly (₹9999)</option>
            </select>
          </div>

          <div>
            <label className="block text-green-400 font-bold mb-2">📆 Join Date</label>
            <input
              type="date"
              value={form.joinDate}
              onChange={e => setForm({...form, joinDate: e.target.value})}
              required
              className="w-full px-4 py-3 bg-slate-700 border-2 border-green-400 rounded-lg text-white focus:outline-none focus:border-green-300 focus:shadow-lg focus:shadow-green-500/20 transition-all duration-300 font-medium cursor-pointer"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-8 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 text-white font-bold py-4 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed text-lg"
          >
            {loading ? (
              <span className="flex items-center justify-center">
                <span className="animate-spin mr-2">⏳</span> Processing...
              </span>
            ) : (
              '✨ Add Member'
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddMemberForm;