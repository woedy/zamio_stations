import { useState } from 'react';
import { Activity, Search, Eye, Logs } from 'lucide-react';

const MatchLogViewer = () => {
  const [activeTab, setActiveTab] = useState('playlogs');
  const [selectedPeriod, setSelectedPeriod] = useState('monthly');

  const playLogs = [
    {
      id: 1,
      song: 'Midnight Vibes',
      station: 'Peace FM',
      date: '2024-01-15 14:30',
      duration: '3:45',
      confidence: 98,
      earnings: 0.6,
      status: 'Verified',
    },
    {
      id: 2,
      song: 'Ghana My Home',
      station: 'Hitz FM',
      date: '2024-01-15 12:15',
      duration: '4:12',
      confidence: 96,
      earnings: 0.6,
      status: 'Verified',
    },
    {
      id: 3,
      song: 'Love Letter',
      station: 'Joy FM',
      date: '2024-01-15 10:45',
      duration: '3:28',
      confidence: 94,
      earnings: 0.6,
      status: 'Flagged',
    },
    {
      id: 4,
      song: 'Midnight Vibes',
      station: 'Adom FM',
      date: '2024-01-15 09:20',
      duration: '3:45',
      confidence: 92,
      earnings: 0.6,
      status: 'Pending',
    },
    {
      id: 5,
      song: 'Ghana My Home',
      station: 'Okay FM',
      date: '2024-01-15 08:10',
      duration: '4:12',
      confidence: 89,
      earnings: 0.6,
      status: 'Dispute',
    },
  ];

  const TabButton = ({ id, label, icon: Icon, isActive, onClick }) => (
    <button
      onClick={() => onClick(id)}
      className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all ${
        isActive
          ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg'
          : 'text-gray-300 hover:text-white hover:bg-white/10'
      }`}
    >
      <Icon className="w-4 h-4" />
      <span className="font-medium">{label}</span>
    </button>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br ">
      {/* Header */}
      <header className="bg-black/20 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-3 rounded-xl">
                <Logs className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">
                  Full Detection view
                </h1>
                <p className="text-gray-300 text-sm">
                  All Matched songs detected and accumulated royalties
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search..."
                  className="bg-white/10 backdrop-blur-md text-white pl-10 pr-4 py-2 rounded-lg border border-white/20 focus:outline-none focus:ring-2 focus:ring-purple-400"
                />
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-8xl mx-auto px-6 py-8">
        {/* Navigation Tabs */}
        <div className="flex justify-between">
          {/* Period Selector */}

          <div className="flex space-x-2 mb-8 bg-white/10 backdrop-blur-md p-1 rounded-lg border border-white/20 w-fit">
            <TabButton
              id="playlogs"
              label="Play Logs"
              icon={Activity}
              isActive={activeTab === 'playlogs'}
              onClick={setActiveTab}
            />

            <TabButton
              id="matchlogs"
              label="Match Logs"
              icon={Eye}
              isActive={activeTab === 'matchlogs'}
              onClick={setActiveTab}
            />
          </div>

          <div className="mb-8">
            <div className="flex space-x-2 bg-white/10 backdrop-blur-md p-1 rounded-lg border border-white/20 w-fit">
              {['daily', 'weekly', 'monthly', 'all-time'].map((period) => (
                <button
                  key={period}
                  onClick={() => setSelectedPeriod(period)}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                    selectedPeriod === period
                      ? 'bg-gradient-to-r from-yellow-400 to-orange-500 text-white shadow-lg'
                      : 'text-gray-300 hover:text-white hover:bg-white/10'
                  }`}
                >
                  {period.charAt(0).toUpperCase() + period.slice(1)}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Tab Content */}
        <div className="space-y-8">
          {/* Play Logs Tab */}
          {activeTab === 'playlogs' && (
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
              <h2 className="text-xl font-bold text-white mb-6 flex items-center">
                <Activity className="w-5 h-5 mr-2 text-blue-400" />
                Detailed Play Logs
              </h2>
              <div className="overflow-auto rounded-xl">
                <table className="min-w-full text-sm text-left text-gray-300">
                  <thead className="text-xs uppercase bg-white/5 text-gray-400">
                    <tr>
                      <th className="px-4 py-3">Song</th>
                      <th className="px-4 py-3">Artist</th>
                      <th className="px-4 py-3">Start Date & Time</th>
                      <th className="px-4 py-3">End Date & Time</th>
                      <th className="px-4 py-3">Duration</th>
                      <th className="px-4 py-3">Avg. Confidence</th>
                      <th className="px-4 py-3">Earnings</th>
                      <th className="px-4 py-3">Status</th>
                      <th className="px-4 py-3">Dispute Match</th>
                      <th className="px-4 py-3">Dispute Comments</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white/5 divide-y divide-white/10">
                    {playLogs.map((log) => (
                      <tr key={log.id}>
                        <td className="px-4 py-2 text-white">{log.song}</td>
                        <td className="px-4 py-2">{log.station}</td>
                        <td className="px-4 py-2">{log.date}</td>
                        <td className="px-4 py-2">{log.date}</td>
                        <td className="px-4 py-2">{log.duration}</td>
                        <td className="px-4 py-2">{log.confidence}%</td>
                        <td className="px-4 py-2 text-green-400 font-medium">
                          ₵{log.earnings.toFixed(2)}
                        </td>
                        <td className="px-4 py-2">{log.status}</td>
                        <td className="px-4 py-2">
                          {' '}
                          <button className="w-full text-xs bg-red-600 text-white py-2 rounded-sm font-semibold hover:shadow-lg transition-shadow">
                            Flag
                          </button>
                        </td>

                        <td className="px-4 py-2">Dispute comments here....</td>

                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'matchlogs' && (
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
              <h2 className="text-xl font-bold text-white mb-6 flex items-center">
                <Activity className="w-5 h-5 mr-2 text-blue-400" />
                Detailed Match Logs
              </h2>
              <div className="overflow-auto rounded-xl">
                <table className="min-w-full text-sm text-left text-gray-300">
                  <thead className="text-xs uppercase bg-white/5 text-gray-400">
                    <tr>
                      <th className="px-4 py-3">Song</th>
                      <th className="px-4 py-3">Artist</th>
                      <th className="px-4 py-3">Start Date & Time</th>
                      <th className="px-4 py-3">Confidence</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white/5 divide-y divide-white/10">
                    {playLogs.map((log) => (
                      <tr key={log.id}>
                        <td className="px-4 py-2 text-white">{log.song}</td>
                        <td className="px-4 py-2">{log.station}</td>
                        <td className="px-4 py-2">{log.date}</td>
                        <td className="px-4 py-2">{log.confidence}%</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
        <h2 className="text-xl font-bold text-white mb-4">
          Reports & Compliance Exports
        </h2>
        <div className=" flex space-x-3">
          <button className="w-full bg-gradient-to-r text-sm from-green to-orange-500 text-white py-2 rounded-xl font-semibold hover:shadow-lg transition-shadow">
            Generate Report
          </button>
          <button className="w-full bg-white/10 text-sm text-white py-2 rounded-xl font-semibold border border-white/20 hover:bg-white/20 transition-colors">
            Export Data
          </button>
          <button className="w-full bg-white/10 text-sm text-white py-2 rounded-xl font-semibold border border-white/20 hover:bg-white/20 transition-colors">
            Schedule Analysis
          </button>
          <button className="w-full bg-white/10 text-sm text-white py-2 rounded-xl font-semibold border border-white/20 hover:bg-white/20 transition-colors">
            Proof of Compliance
          </button>
        </div>
      </div>
    </div>
  );
};

export default MatchLogViewer;
