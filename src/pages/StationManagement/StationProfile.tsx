import React, { useState } from 'react';
import { Edit, Link as LinkIcon, Bell, Mail, X, Settings } from 'lucide-react';

// ✅ Demo Payload
const demoStation = {
  name: 'Accra Sound Station',
  region: 'Greater Accra, Ghana',
  frequency: 'FM 101.7',
  genre: 'Urban / Afrobeat',
  contact: 'Nana Yaa (Station Manager)',
  streamUrls: ['https://stream.example.com/accra101'],
  notifications: {
    top10Updated: true,
    weeklyDigest: false,
  },
};

const StationProfilePage = () => {
  const [station, setStation] = useState(demoStation);
  const [editing, setEditing] = useState(false);
  const [editingStream, setEditingStream] = useState(false);
  const [prefs, setPrefs] = useState(station.notifications);

  // Handlers
  const handleStationSave = () => setEditing(false);
  const handleStreamSave = () => setEditingStream(false);

  return (
    <div className="min-h-screen bg-gradient-to-br p-6">
      <div className="max-w-3xl mx-auto bg-white/10 backdrop-blur-md rounded-2xl p-8 space-y-8 border border-white/20">
        {/* 🛰 Station Info */}
        <div className="flex justify-between items-start">

            <div className='flex space-x-3'>
          <img
            src=""
            alt="station logo"
            className="w-30 h-30 rounded-2xl object-cover border-4 border-white/20"
          />
          <div>
            <h1 className="text-3xl font-bold text-white">{station.name}</h1>
            <p className="text-gray-300 mt-1">
              {station.region} • {station.frequency}
            </p>
            <p className="text-gray-300 mt-1">Genre: {station.genre}</p>
            <p className="text-gray-300 mt-1">Contact: {station.contact}</p>
          </div>

          </div>
          <button
            onClick={() => setEditing(true)}
            className="bg-white/10 text-white px-4 py-2 rounded-lg flex items-center hover:bg-white/20 transition"
          >
            <Edit className="w-5 h-5 mr-2" /> Edit Info
          </button>
        </div>

        {/* ✏️ Edit Station Modal */}
        {editing && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-slate-900 p-6 rounded-2xl max-w-md w-full border border-white/20">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-white">
                  Edit Station Info
                </h2>
                <button onClick={() => setEditing(false)}>
                  <X className="w-6 h-6 text-gray-400" />
                </button>
              </div>
              <div className="space-y-4 text-gray-300">
                {['name', 'region', 'frequency', 'genre', 'contact'].map(
                  (field) => (
                    <div key={field}>
                      <label className="block text-sm mb-1">
                        {field.charAt(0).toUpperCase() + field.slice(1)}
                      </label>
                      <input
                        type="text"
                        className="w-full px-3 py-2 bg-white/10 rounded-lg focus:outline-none border border-white/20"
                        value={station[field]}
                        onChange={(e) =>
                          setStation({ ...station, [field]: e.target.value })
                        }
                      />
                    </div>
                  ),
                )}
              </div>
              <div className="mt-6 flex justify-end space-x-3">
                <button
                  onClick={() => setEditing(false)}
                  className="px-4 py-2 bg-gray-700 text-gray-300 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  onClick={handleStationSave}
                  className="px-4 py-2 bg-purple-500 text-white rounded-lg"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        )}

        {/* 🔗 Stream Links */}
        <div className="bg-white/5 p-6 rounded-xl border border-white/20">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-white flex items-center">
              <LinkIcon className="w-5 h-5 mr-2 text-blue-400" /> Audio Stream
              Links
            </h2>
            <button
              onClick={() => setEditingStream(true)}
              className="text-blue-300 hover:text-white"
            >
              Manage
            </button>
          </div>
          <ul className="space-y-2 text-gray-300">
            {station.streamUrls.map((url, i) => (
              <li
                key={i}
                className="px-3 py-2 bg-white/10 rounded-lg break-all"
              >
                {url}
              </li>
            ))}
            {station.streamUrls.length === 0 && (
              <li className="text-gray-500">No stream links added.</li>
            )}
          </ul>
        </div>

        {/* ✏️ Edit Streams Modal */}
        {editingStream && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-slate-900 p-6 rounded-2xl max-w-md w-full border border-white/20">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-white">
                  Manage Stream Links
                </h2>
                <button onClick={() => setEditingStream(false)}>
                  <X className="w-6 h-6 text-gray-400" />
                </button>
              </div>
              <div className="space-y-4 text-gray-300">
                {station.streamUrls.map((url, i) => (
                  <div key={i} className="flex items-center space-x-2">
                    <input
                      type="text"
                      className="flex-1 bg-white/10 px-3 py-2 rounded-lg border border-white/20 focus:outline-none"
                      value={url}
                      onChange={(e) => {
                        const arr = [...station.streamUrls];
                        arr[i] = e.target.value;
                        setStation({ ...station, streamUrls: arr });
                      }}
                    />
                    <button
                      onClick={() => {
                        setStation({
                          ...station,
                          streamUrls: station.streamUrls.filter(
                            (_, idx) => idx !== i,
                          ),
                        });
                      }}
                    >
                      <X className="w-5 h-5 text-red-400" />
                    </button>
                  </div>
                ))}
                <button
                  onClick={() =>
                    setStation({
                      ...station,
                      streamUrls: [...station.streamUrls, ''],
                    })
                  }
                  className="text-blue-400"
                >
                  + Add another
                </button>
              </div>
              <div className="mt-6 flex justify-end space-x-3">
                <button
                  onClick={() => setEditingStream(false)}
                  className="px-4 py-2 bg-gray-700 text-gray-300 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  onClick={handleStreamSave}
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        )}

        {/* 🔐 Account & Notifications */}
        <div className="bg-white/5 p-6 rounded-xl border border-white/20 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-white flex items-center">
              <Settings className="w-5 h-5 mr-2 text-gray-300" /> Account
              Settings
            </h2>
            <button className="text-gray-300 hover:text-white">
              Change Password
            </button>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Bell className="w-5 h-5 text-yellow-300" />
              <span className="text-white">Top 10 Played Songs Updated</span>
            </div>
            <input
              type="checkbox"
              className="w-5 h-5 text-yellow-300"
              checked={prefs.top10Updated}
              onChange={() =>
                setPrefs({ ...prefs, top10Updated: !prefs.top10Updated })
              }
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Mail className="w-5 h-5 text-green-300" />
              <span className="text-white">Weekly Digest</span>
            </div>
            <input
              type="checkbox"
              className="w-5 h-5 text-green-300"
              checked={prefs.weeklyDigest}
              onChange={() =>
                setPrefs({ ...prefs, weeklyDigest: !prefs.weeklyDigest })
              }
            />
          </div>
        </div>

        {/* 💾 Save Preferences */}
        <div className="flex justify-end">
          <button className="px-6 py-3 bg-purple-500 text-white font-semibold rounded-lg hover:shadow-lg transition">
            Save All Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default StationProfilePage;
