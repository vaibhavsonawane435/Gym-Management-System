import React, { useEffect, useState } from 'react';
import axios from 'axios';

const BillList = () => {
  const [bills, setBills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState('all');

  useEffect(() => {
    axios.get('http://localhost:5000/api/bills')
      .then(res => {
        setBills(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const filteredBills = filterStatus === 'all' 
    ? bills 
    : bills.filter(b => b.status === filterStatus);

  const totalAmount = filteredBills.reduce((sum, b) => sum + parseFloat(b.amount || 0), 0);

  return (
    <div className="min-h-screen px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h2 className="text-4xl font-black bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent mb-2">💳 Payment Receipts</h2>
          <div className="flex flex-wrap gap-4 mt-4">
            <div className="bg-gradient-to-r from-blue-600 to-cyan-600 rounded-lg p-4 flex-1 min-w-48">
              <p className="text-blue-200 text-sm font-bold">Total Receipts</p>
              <p className="text-3xl font-black text-white">{bills.length}</p>
            </div>
            <div className="bg-gradient-to-r from-green-600 to-emerald-600 rounded-lg p-4 flex-1 min-w-48">
              <p className="text-green-200 text-sm font-bold">Total Amount</p>
              <p className="text-3xl font-black text-white">₹{totalAmount.toLocaleString()}</p>
            </div>
          </div>
        </div>

        <div className="mb-6 flex gap-3 flex-wrap">
          <button
            onClick={() => setFilterStatus('all')}
            className={`px-6 py-2 font-bold rounded-lg transition-all duration-300 ${
              filterStatus === 'all'
                ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg'
                : 'bg-slate-700 text-indigo-300 hover:bg-slate-600'
            }`}
          >
            All Receipts
          </button>
          <button
            onClick={() => setFilterStatus('Paid')}
            className={`px-6 py-2 font-bold rounded-lg transition-all duration-300 ${
              filterStatus === 'Paid'
                ? 'bg-gradient-to-r from-green-600 to-emerald-600 text-white shadow-lg'
                : 'bg-slate-700 text-green-300 hover:bg-slate-600'
            }`}
          >
            ✅ Paid
          </button>
          <button
            onClick={() => setFilterStatus('Pending')}
            className={`px-6 py-2 font-bold rounded-lg transition-all duration-300 ${
              filterStatus === 'Pending'
                ? 'bg-gradient-to-r from-yellow-600 to-orange-600 text-white shadow-lg'
                : 'bg-slate-700 text-yellow-300 hover:bg-slate-600'
            }`}
          >
            ⏳ Pending
          </button>
        </div>

        {loading && (
          <div className="text-center py-12">
            <div className="inline-block">
              <div className="animate-spin text-4xl mb-4">⏳</div>
              <p className="text-purple-300 font-bold">Loading receipts...</p>
            </div>
          </div>
        )}

        {!loading && filteredBills.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredBills.map((bill, idx) => (
              <div
                key={bill._id}
                className="bg-gradient-to-br from-slate-800 to-slate-700 rounded-xl shadow-lg border-2 border-indigo-500 p-6 hover:shadow-2xl hover:shadow-indigo-500/20 transition-all duration-300 transform hover:scale-105"
              >
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-black text-indigo-300">{bill.memberName}</h3>
                  <span className={`px-3 py-1 rounded-full font-bold text-xs ${
                    bill.status === 'Paid'
                      ? 'bg-green-500/20 text-green-300 border border-green-400'
                      : 'bg-yellow-500/20 text-yellow-300 border border-yellow-400'
                  }`}>
                    {bill.status}
                  </span>
                </div>

                <div className="mb-4 p-4 bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-lg border-2 border-purple-500">
                  <p className="text-purple-300 text-sm font-bold">Amount</p>
                  <p className="text-3xl font-black text-purple-200">₹{parseFloat(bill.amount).toLocaleString()}</p>
                </div>

                <div className="mb-4 text-indigo-300">
                  <p className="text-sm font-bold">📅 Date</p>
                  <p className="font-semibold">{new Date(bill.date).toLocaleDateString()}</p>
                </div>

                <div className="p-3 bg-slate-700/50 rounded-lg border border-slate-600">
                  <p className="text-xs text-slate-400">Receipt ID</p>
                  <p className="font-mono text-xs text-slate-300">{bill._id.substring(0, 12)}...</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {!loading && filteredBills.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🗂️</div>
            <p className="text-purple-300 font-bold text-lg">No receipts found</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BillList;