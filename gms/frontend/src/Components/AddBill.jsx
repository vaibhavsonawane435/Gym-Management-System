import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AddBill = () => {
  const [members, setMembers] = useState([]);
  const [selectedMember, setSelectedMember] = useState('');
  const [amount, setAmount] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    axios.get('http://localhost:5000/api/members').then(res => setMembers(res.data));
  }, []);

  const handleCreateBill = async () => {
    if (!selectedMember || !amount) {
      alert('Please fill all fields');
      return;
    }
    try {
      setLoading(true);
      const member = members.find(m => m._id === selectedMember);
      await axios.post('http://localhost:5000/api/bills', {
        memberId: member._id,
        memberName: member.name,
        amount: amount,
        status: 'Paid'
      });
      setSuccess(true);
      setSelectedMember('');
      setAmount('');
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      alert('Error creating bill');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <div className="mb-8 text-center">
          <h2 className="text-4xl font-black bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent mb-2">📄 Create Bill</h2>
          <p className="text-purple-300 font-medium">Generate payment receipts for members</p>
        </div>

        {success && (
          <div className="mb-6 p-4 bg-green-500/20 border-2 border-green-400 rounded-lg text-green-300 font-bold text-center animate-pulse">
            ✅ Bill Created Successfully!
          </div>
        )}

        <div className="bg-gradient-to-br from-slate-800 to-purple-900 rounded-2xl shadow-2xl p-8 border-2 border-orange-500 space-y-6">
          <div>
            <label className="block text-orange-400 font-bold mb-2 text-lg">👤 Select Member</label>
            <select
              value={selectedMember}
              onChange={e => setSelectedMember(e.target.value)}
              className="w-full px-4 py-3 bg-slate-700 border-2 border-orange-400 rounded-lg text-white focus:outline-none focus:border-orange-300 focus:shadow-lg focus:shadow-orange-500/20 transition-all duration-300 font-medium cursor-pointer"
            >
              <option value="">-- Select a Member --</option>
              {members.map(m => (
                <option key={m._id} value={m._id}>
                  {m.name} ({m.package})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-orange-400 font-bold mb-2 text-lg">💰 Amount (₹)</label>
            <input
              type="number"
              placeholder="Enter bill amount"
              value={amount}
              onChange={e => setAmount(e.target.value)}
              min="0"
              step="100"
              className="w-full px-4 py-3 bg-slate-700 border-2 border-orange-400 rounded-lg text-white placeholder-orange-400/50 focus:outline-none focus:border-orange-300 focus:shadow-lg focus:shadow-orange-500/20 transition-all duration-300 font-bold text-lg"
            />
          </div>

          {selectedMember && (
            <div className="bg-slate-700/50 border-2 border-orange-400 rounded-lg p-4">
              <p className="text-orange-300 font-semibold">
                💳 Member: <span className="text-orange-100 font-bold">{
                  members.find(m => m._id === selectedMember)?.name
                }</span>
              </p>
              <p className="text-orange-300 font-semibold mt-1">
                📅 Date: <span className="text-orange-100 font-bold">{new Date().toLocaleDateString()}</span>
              </p>
            </div>
          )}

          {amount && (
            <div className="bg-gradient-to-r from-orange-500/20 to-red-500/20 border-2 border-orange-400 rounded-lg p-4 text-center">
              <p className="text-orange-300 font-bold mb-1">Total Amount</p>
              <p className="text-4xl font-black text-orange-300">₹{parseFloat(amount).toLocaleString()}</p>
            </div>
          )}

          <button
            onClick={handleCreateBill}
            disabled={loading || !selectedMember || !amount}
            className="w-full mt-8 bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-500 hover:to-red-500 text-white font-bold py-4 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed text-lg"
          >
            {loading ? (
              <span className="flex items-center justify-center">
                <span className="animate-spin mr-2">⏳</span> Processing...
              </span>
            ) : (
              '🧾 Generate Receipt'
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddBill;