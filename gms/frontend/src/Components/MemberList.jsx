import React, { useEffect, useState } from 'react';
import axios from 'axios';

const MemberList = () => {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    axios.get('http://localhost:5000/api/members')
      .then(res => {
        setMembers(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const filteredMembers = members.filter(m =>
    m.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    m.contact.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h2 className="text-4xl font-black bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent mb-2">👥 Member Directory</h2>
          <p className="text-purple-300 font-medium">Total Members: <span className="text-2xl font-bold text-blue-400">{members.length}</span></p>
        </div>

        <div className="mb-6">
          <input
            type="text"
            placeholder="🔍 Search by name or contact..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-6 py-3 bg-slate-800 border-2 border-blue-400 rounded-lg text-white placeholder-blue-400/50 focus:outline-none focus:border-cyan-400 focus:shadow-lg focus:shadow-blue-500/20 transition-all duration-300 font-medium"
          />
        </div>

        {loading && (
          <div className="text-center py-12">
            <div className="inline-block">
              <div className="animate-spin text-4xl mb-4">⏳</div>
              <p className="text-purple-300 font-bold">Loading members...</p>
            </div>
          </div>
        )}

        {!loading && filteredMembers.length > 0 && (
          <div className="overflow-x-auto rounded-2xl shadow-2xl border-2 border-blue-500">
            <table className="w-full text-white">
              <thead>
                <tr className="bg-gradient-to-r from-blue-600 to-cyan-600 border-b-2 border-blue-400">
                  <th className="px-6 py-4 text-left font-bold text-lg">👤 Name</th>
                  <th className="px-6 py-4 text-left font-bold text-lg">📱 Contact</th>
                  <th className="px-6 py-4 text-left font-bold text-lg">💳 Package</th>
                  <th className="px-6 py-4 text-left font-bold text-lg">📅 Join Date</th>
                </tr>
              </thead>
              <tbody>
                {filteredMembers.map((m, idx) => (
                  <tr
                    key={m._id}
                    className={`border-b border-slate-700 hover:bg-slate-700/50 transition-all duration-300 transform hover:scale-[1.02] ${
                      idx % 2 === 0 ? 'bg-slate-800' : 'bg-slate-800/60'
                    }`}
                  >
                    <td className="px-6 py-4 font-semibold text-blue-300">{m.name}</td>
                    <td className="px-6 py-4 text-cyan-300 font-medium">{m.contact}</td>
                    <td className="px-6 py-4">
                      <span className="inline-block px-3 py-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full font-bold text-sm">
                        {m.package}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-green-300">{new Date(m.joinDate).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {!loading && filteredMembers.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🔍</div>
            <p className="text-purple-300 font-bold text-lg">
              {members.length === 0 ? 'No members found' : 'No matching members'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MemberList;