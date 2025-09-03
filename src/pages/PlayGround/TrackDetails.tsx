import React, { useState } from 'react';
import {
  Music, Radio, BarChart3, Globe, Edit, Trash2,
  ChevronUp, ChevronDown, Play, DollarSign
} from 'lucide-react';

// 🔹 Demo Payloads
const demoTrack = {
  title: "Midnight Dreams",
  duration: "3:42",
  album: "Echoes in the Dark",
  genre: "Synthwave",
  releaseDate: "2024-05-01",
  totalPlays: 82391,
  totalEarnings: 15234.87
};

const demoContributors = [
  { name: "Ava Ray", role: "Lead Vocalist", percentage: 40 },
  { name: "Liam Stone", role: "Producer", percentage: 30 },
  { name: "Nova Beats", role: "Composer", percentage: 30 }
];

const demoPlayLogs = [
  {
    id: 1,
    station: "Lagos 99.1 FM",
    date: "2025-07-11 16:23",
    duration: "00:03:41",
    confidence: 98,
    earnings: 1.12
  },
  {
    id: 2,
    station: "Accra Hits",
    date: "2025-07-10 11:15",
    duration: "00:03:42",
    confidence: 95,
    earnings: 0.97
  },
  {
    id: 3,
    station: "Cool FM Nairobi",
    date: "2025-07-09 19:45",
    duration: "00:03:40",
    confidence: 92,
    earnings: 1.04
  },
  {
    id: 4,
    station: "Kumasi Vibes 102",
    date: "2025-07-08 08:55",
    duration: "00:03:43",
    confidence: 89,
    earnings: 0.88
  }
];

// 🧩 Reusable Subcomponents
const ContributorRow = ({ c }) => (
  <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
    <div>
      <div className="text-white font-medium">{c.name}</div>
      <div className="text-gray-300 text-sm">{c.role}</div>
    </div>
    <div className="text-purple-400 font-semibold">{c.percentage}%</div>
  </div>
);

const PlayLogRow = ({ log }) => (
  <tr>
    <td className="px-4 py-2 text-white">{log.station}</td>
    <td className="px-4 py-2">{log.date}</td>
    <td className="px-4 py-2">{log.duration}</td>
    <td className="px-4 py-2">{log.confidence}%</td>
    <td className="px-4 py-2 text-green-400 font-medium">₵{log.earnings.toFixed(2)}</td>
  </tr>
);

// 🔧 Main Page Component
const TrackDetailsPage = () => {
  const [mapExpanded, setMapExpanded] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-950 text-white p-6">
      <div className="max-w-5xl mx-auto bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 space-y-8">

        {/* 🎵 Header & Actions */}
        <div className="flex justify-between items-start">
          <div className="flex items-center space-x-4">
            <Music className="w-8 h-8 text-purple-400" />
            <div>
              <h1 className="text-3xl font-bold text-white">{demoTrack.title}</h1>
              <p className="text-gray-300 text-sm">
                {demoTrack.duration} • {demoTrack.album} • {demoTrack.genre}
              </p>
              <p className="text-gray-400 text-xs mt-1">Released {demoTrack.releaseDate}</p>
            </div>
          </div>
          <div className="flex space-x-3">
            <button className="bg-white/10 text-white px-4 py-2 rounded-lg hover:bg-white/20 transition flex items-center">
              <Edit className="w-4 h-4 mr-2" /> Edit
            </button>
            <button className="bg-red-500/20 text-red-400 px-4 py-2 rounded-lg hover:bg-red-500/30 transition flex items-center">
              <Trash2 className="w-4 h-4 mr-2" /> Delete
            </button>
          </div>
        </div>

        {/* 📊 Stats Summary */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white/5 p-4 rounded-xl text-white">
            <div className="text-sm text-gray-300">Total Plays</div>
            <div className="text-2xl font-bold">{demoTrack.totalPlays.toLocaleString()}</div>
          </div>
          <div className="bg-white/5 p-4 rounded-xl text-green-400">
            <div className="text-sm text-gray-300">Total Earnings</div>
            <div className="text-2xl font-bold">₵{demoTrack.totalEarnings.toFixed(2)}</div>
          </div>
        </div>

        {/* 👥 Contributors */}
        <div className="bg-white/5 p-4 rounded-xl border border-white/20">
          <h2 className="text-lg font-semibold text-white mb-3">Contributors & Splits</h2>
          <div className="space-y-2">
            {demoContributors.map((c, idx) => (
              <ContributorRow key={idx} c={c} />
            ))}
          </div>
        </div>

        {/* 📈 Chart Placeholder */}
        <div className="bg-white/5 p-4 rounded-xl border border-white/20">
          <div className="flex items-center mb-3">
            <BarChart3 className="w-5 h-5 mr-2 text-cyan-400" />
            <h2 className="text-lg font-semibold text-white">Playback Chart</h2>
          </div>
          <div className="bg-white/10 h-48 rounded-lg flex items-center justify-center text-gray-400">
            [Chart.js or Recharts goes here]
          </div>
        </div>

        {/* 🌍 Reach Map */}
        <div className="bg-white/5 p-4 rounded-xl border border-white/20">
          <div className="flex justify-between items-center mb-3">
            <div className="flex items-center">
              <Globe className="w-5 h-5 mr-2 text-blue-400" />
              <h2 className="text-lg font-semibold text-white">Radio Reach Map</h2>
            </div>
            <button onClick={() => setMapExpanded(!mapExpanded)} className="text-white/80 hover:text-white">
              {mapExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
            </button>
          </div>
          {mapExpanded && (
            <div className="h-64 bg-white/10 rounded-lg flex items-center justify-center text-gray-400">
              [Leaflet / Mapbox reach visualization]
            </div>
          )}
        </div>

        {/* 📻 Play Logs */}
        <div className="bg-white/5 p-4 rounded-xl border border-white/20">
          <div className="flex items-center mb-3">
            <Radio className="w-5 h-5 mr-2 text-blue-400" />
            <h2 className="text-lg font-semibold text-white">Detailed Play Logs</h2>
          </div>
          <div className="overflow-auto rounded-lg">
            <table className="min-w-full text-sm text-left text-gray-300">
              <thead className="text-xs uppercase bg-white/5 text-gray-400">
                <tr>
                  <th className="px-4 py-3">Station</th>
                  <th className="px-4 py-3">Date & Time</th>
                  <th className="px-4 py-3">Duration</th>
                  <th className="px-4 py-3">Confidence</th>
                  <th className="px-4 py-3">Earnings</th>
                </tr>
              </thead>
              <tbody className="bg-white/5 divide-y divide-white/10">
                {demoPlayLogs.map(log => (
                  <PlayLogRow key={log.id} log={log} />
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* 🎧 Action Buttons */}
        <div className="flex items-center space-x-4">
          <button className="flex-1 bg-green-500/20 text-green-400 px-4 py-2 rounded-lg hover:bg-green-500/30 transition flex items-center justify-center">
            <DollarSign className="w-5 h-5 mr-2" /> Download Statement
          </button>
          <button className="flex-1 bg-blue-500/20 text-blue-400 px-4 py-2 rounded-lg hover:bg-blue-500/30 transition flex items-center justify-center">
            <Play className="w-5 h-5 mr-2" /> Pay Contributors
          </button>
        </div>

      </div>
    </div>
  );
};

export default TrackDetailsPage;
