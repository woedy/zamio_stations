import React, { useState } from 'react';
import { Play, Music, TrendingUp, MapPin, Activity, Users, Calendar, Settings, Bell, Search, Filter, BarChart3, PieChart, Globe, Zap, Radio, Volume2, Eye, Star, Clock, Target, DollarSign, Download, Share2, Headphones, Heart, Mic, Award, Smartphone, Plus, Edit, Trash2, Upload, Save, X, Check, User, Mail, Phone, Instagram, Facebook, Twitter, ExternalLink, ChevronDown, ChevronUp, Copy, PlayCircle, PauseCircle, MoreHorizontal, FileText, CreditCard, History, UserPlus, Shield, AlertCircle, Verified, Home, LogOut, Menu } from 'lucide-react';

const ArtistProfilePage = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [isEditing, setIsEditing] = useState(false);
  const [selectedSong, setSelectedSong] = useState(null);
  const [showAddSong, setShowAddSong] = useState(false);
  const [expandedSong, setExpandedSong] = useState(null);
  const [showAddContributor, setShowAddContributor] = useState(false);
  const [selectedContributor, setSelectedContributor] = useState(null);

  // Sample artist data
  const artistData = {
    name: "Kofi Mensah",
    stageName: "K-Mensah",
    bio: "Award-winning Ghanaian artist blending traditional highlife with modern Afrobeats. Known for hits like 'Midnight Vibes' and 'Ghana My Home'.",
    avatar: "/api/placeholder/150/150",
    coverImage: "/api/placeholder/800/300",
    verified: true,
    followers: 45782,
    totalPlays: 2847592,
    totalEarnings: 15847.50,
    joinDate: "2020-03-15",
    location: "Accra, Ghana",
    genres: ["Afrobeats", "Highlife", "Hip-Hop"],
    contact: {
      email: "kofi@example.com",
      phone: "+233 24 123 4567",
      instagram: "@kmensahofficial",
      twitter: "@kmensah_music",
      facebook: "KofiMensahMusic"
    }
  };

  const songs = [
    {
      id: 1,
      title: "Midnight Vibes",
      duration: "3:45",
      releaseDate: "2023-08-15",
      totalPlays: 8745,
      totalEarnings: 524.70,
      status: "Active",
      album: "Midnight Sessions",
      genre: "Afrobeats",
      contributors: [
        { name: "Kofi Mensah", role: "Lead Vocalist", percentage: 60 },
        { name: "Kwame Asante", role: "Producer", percentage: 25 },
        { name: "Ama Serwaa", role: "Songwriter", percentage: 15 }
      ],
      recentPlays: [
        { station: "Peace FM", date: "2024-01-15", plays: 12, earnings: 7.20 },
        { station: "Hitz FM", date: "2024-01-15", plays: 8, earnings: 4.80 },
        { station: "Joy FM", date: "2024-01-14", plays: 15, earnings: 9.00 }
      ]
    },
    {
      id: 2,
      title: "Ghana My Home",
      duration: "4:12",
      releaseDate: "2023-12-01",
      totalPlays: 7234,
      totalEarnings: 434.04,
      status: "Active",
      album: "Heritage",
      genre: "Highlife",
      contributors: [
        { name: "Kofi Mensah", role: "Lead Vocalist", percentage: 70 },
        { name: "Nana Yaw", role: "Producer", percentage: 20 },
        { name: "Efya", role: "Featured Artist", percentage: 10 }
      ],
      recentPlays: [
        { station: "Adom FM", date: "2024-01-15", plays: 10, earnings: 6.00 },
        { station: "Okay FM", date: "2024-01-14", plays: 6, earnings: 3.60 }
      ]
    },
    {
      id: 3,
      title: "Love Letter",
      duration: "3:28",
      releaseDate: "2023-06-20",
      totalPlays: 6543,
      totalEarnings: 392.58,
      status: "Active",
      album: "Emotions",
      genre: "R&B",
      contributors: [
        { name: "Kofi Mensah", role: "Lead Vocalist", percentage: 80 },
        { name: "Richie Mensah", role: "Producer", percentage: 20 }
      ],
      recentPlays: [
        { station: "Y FM", date: "2024-01-15", plays: 5, earnings: 3.00 },
        { station: "Live FM", date: "2024-01-14", plays: 7, earnings: 4.20 }
      ]
    }
  ];

  const royaltyHistory = [
    { date: "2024-01-15", amount: 145.30, source: "Radio Airplay", status: "Paid" },
    { date: "2024-01-14", amount: 98.75, source: "Streaming", status: "Paid" },
    { date: "2024-01-13", amount: 234.50, source: "Radio Airplay", status: "Paid" },
    { date: "2024-01-12", amount: 67.20, source: "Radio Airplay", status: "Pending" },
    { date: "2024-01-11", amount: 189.40, source: "Radio Airplay", status: "Paid" }
  ];

  const playLogs = [
    { id: 1, song: "Midnight Vibes", station: "Peace FM", date: "2024-01-15 14:30", duration: "3:45", confidence: 98, earnings: 0.60 },
    { id: 2, song: "Ghana My Home", station: "Hitz FM", date: "2024-01-15 12:15", duration: "4:12", confidence: 96, earnings: 0.60 },
    { id: 3, song: "Love Letter", station: "Joy FM", date: "2024-01-15 10:45", duration: "3:28", confidence: 94, earnings: 0.60 },
    { id: 4, song: "Midnight Vibes", station: "Adom FM", date: "2024-01-15 09:20", duration: "3:45", confidence: 92, earnings: 0.60 },
    { id: 5, song: "Ghana My Home", station: "Okay FM", date: "2024-01-15 08:10", duration: "4:12", confidence: 89, earnings: 0.60 }
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

  const SongCard = ({ song, isExpanded, onToggle }) => (
    <div className="bg-white/5 backdrop-blur-md rounded-xl p-6 border border-white/10 hover:bg-white/10 transition-all">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-4">
          <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-3 rounded-xl">
            <Music className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white">{song.title}</h3>
            <p className="text-sm text-gray-300">{song.duration} • {song.album} • {song.genre}</p>
            <p className="text-xs text-gray-400">Released {song.releaseDate}</p>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <div className="text-right">
            <div className="text-white font-semibold">{song.totalPlays.toLocaleString()} plays</div>
            <div className="text-green-400 text-sm">₵{song.totalEarnings.toFixed(2)}</div>
          </div>
          <div className="flex items-center space-x-2">
            <button className="bg-green-500/20 text-green-400 p-2 rounded-lg hover:bg-green-500/30 transition-colors">
              <Play className="w-4 h-4" />
            </button>
            <button
              onClick={() => onToggle(song.id)}
              className="bg-white/10 p-2 rounded-lg hover:bg-white/20 transition-colors"
            >
              {isExpanded ? <ChevronUp className="w-4 h-4 text-gray-300" /> : <ChevronDown className="w-4 h-4 text-gray-300" />}
            </button>
          </div>
        </div>
      </div>

      {isExpanded && (
        <div className="space-y-4 border-t border-white/10 pt-4">
          {/* Contributors */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-sm font-semibold text-white">Contributors & Splits</h4>
              <button 
                onClick={() => setShowAddContributor(true)}
                className="bg-purple-500/20 text-purple-400 px-3 py-1 rounded-lg text-sm hover:bg-purple-500/30 transition-colors flex items-center"
              >
                <Plus className="w-3 h-3 mr-1" />
                Add
              </button>
            </div>
            <div className="space-y-2">
              {song.contributors.map((contributor, idx) => (
                <div key={idx} className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                  <div>
                    <div className="text-white font-medium">{contributor.name}</div>
                    <div className="text-sm text-gray-300">{contributor.role}</div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="text-purple-400 font-semibold">{contributor.percentage}%</div>
                    <button className="text-gray-400 hover:text-white">
                      <Edit className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Plays */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-3">Recent Plays</h4>
            <div className="space-y-2">
              {song.recentPlays.map((play, idx) => (
                <div key={idx} className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="bg-blue-500/20 p-2 rounded-lg">
                      <Radio className="w-4 h-4 text-blue-400" />
                    </div>
                    <div>
                      <div className="text-white font-medium">{play.station}</div>
                      <div className="text-sm text-gray-300">{play.date}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-white">{play.plays} plays</div>
                    <div className="text-green-400 text-sm">₵{play.earnings.toFixed(2)}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="flex space-x-2 pt-2">
            <button className="bg-purple-500/20 text-purple-400 px-3 py-2 rounded-lg text-sm hover:bg-purple-500/30 transition-colors flex items-center">
              <Edit className="w-4 h-4 mr-1" />
              Edit
            </button>
            <button className="bg-blue-500/20 text-blue-400 px-3 py-2 rounded-lg text-sm hover:bg-blue-500/30 transition-colors flex items-center">
              <BarChart3 className="w-4 h-4 mr-1" />
              Analytics
            </button>
            <button className="bg-green-500/20 text-green-400 px-3 py-2 rounded-lg text-sm hover:bg-green-500/30 transition-colors flex items-center">
              <DollarSign className="w-4 h-4 mr-1" />
              Royalties
            </button>
            <button className="bg-red-500/20 text-red-400 px-3 py-2 rounded-lg text-sm hover:bg-red-500/30 transition-colors flex items-center">
              <Trash2 className="w-4 h-4 mr-1" />
              Delete
            </button>
          </div>
        </div>
      )}
    </div>
  );

  const AddSongModal = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    return (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
        <div className="bg-slate-900 rounded-2xl p-6 w-full max-w-md border border-white/20">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-white">Add New Song</h2>
            <button onClick={onClose} className="text-gray-400 hover:text-white">
              <X className="w-5 h-5" />
            </button>
          </div>
          
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Song Title</label>
              <input 
                type="text" 
                className="w-full bg-white/10 text-white px-4 py-2 rounded-lg border border-white/20 focus:outline-none focus:ring-2 focus:ring-purple-400"
                placeholder="Enter song title"
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Duration</label>
                <input 
                  type="text" 
                  className="w-full bg-white/10 text-white px-4 py-2 rounded-lg border border-white/20 focus:outline-none focus:ring-2 focus:ring-purple-400"
                  placeholder="3:45"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Genre</label>
                <select className="w-full bg-white/10 text-white px-4 py-2 rounded-lg border border-white/20 focus:outline-none focus:ring-2 focus:ring-purple-400">
                  <option>Afrobeats</option>
                  <option>Highlife</option>
                  <option>Hip-Hop</option>
                  <option>R&B</option>
                </select>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Album</label>
              <input 
                type="text" 
                className="w-full bg-white/10 text-white px-4 py-2 rounded-lg border border-white/20 focus:outline-none focus:ring-2 focus:ring-purple-400"
                placeholder="Album name"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Audio File</label>
              <div className="border-2 border-dashed border-white/20 rounded-lg p-4 text-center">
                <Upload className="w-6 h-6 text-gray-400 mx-auto mb-2" />
                <p className="text-sm text-gray-400">Click to upload or drag and drop</p>
              </div>
            </div>
            
            <div className="flex space-x-4 pt-4">
              <button 
                type="button"
                onClick={onClose}
                className="flex-1 bg-white/10 text-white py-2 rounded-lg hover:bg-white/20 transition-colors"
              >
                Cancel
              </button>
              <button 
                type="submit"
                className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white py-2 rounded-lg hover:shadow-lg transition-shadow"
              >
                Add Song
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-900 to-slate-900">
      {/* Header */}
      <header className="bg-black/20 backdrop-blur-md border-b border-white/10 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-3 rounded-xl">
                <Music className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">RoyaltyGH</h1>
                <p className="text-gray-300 text-sm">Artist Dashboard</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button 
                onClick={() => setShowAddSong(true)}
                className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-lg font-semibold hover:shadow-lg transition-shadow flex items-center"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Song
              </button>
              <button className="bg-white/10 backdrop-blur-md p-2 rounded-lg border border-white/20 hover:bg-white/20 transition-colors">
                <Bell className="w-5 h-5 text-gray-300" />
              </button>
              <button className="bg-white/10 backdrop-blur-md p-2 rounded-lg border border-white/20 hover:bg-white/20 transition-colors">
                <Settings className="w-5 h-5 text-gray-300" />
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Artist Header */}
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 mb-8">
          <div className="flex items-start justify-between mb-6">
            <div className="flex items-center space-x-6">
              <div className="relative">
                <img 
                  src={artistData.avatar} 
                  alt={artistData.name}
                  className="w-24 h-24 rounded-2xl object-cover border-4 border-white/20"
                />
                {artistData.verified && (
                  <div className="absolute -top-2 -right-2 bg-blue-500 p-1 rounded-full">
                    <Verified className="w-4 h-4 text-white" />
                  </div>
                )}
              </div>
              <div>
                <div className="flex items-center space-x-3 mb-2">
                  <h1 className="text-3xl font-bold text-white">{artistData.name}</h1>
                  <span className="text-lg text-gray-300">({artistData.stageName})</span>
                </div>
                <p className="text-gray-300 mb-3 max-w-2xl">{artistData.bio}</p>
                <div className="flex items-center space-x-4 text-sm text-gray-400">
                  <div className="flex items-center space-x-1">
                    <MapPin className="w-4 h-4" />
                    <span>{artistData.location}</span>
                  </div>
                  <span>•</span>
                  <span>Joined {artistData.joinDate}</span>
                  <span>•</span>
                  <span>{artistData.followers.toLocaleString()} followers</span>
                </div>
                <div className="flex items-center space-x-2 mt-3">
                  {artistData.genres.map((genre, idx) => (
                    <span key={idx} className="bg-purple-500/20 text-purple-400 px-2 py-1 rounded-full text-xs">
                      {genre}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <button className="bg-white/10 text-white px-4 py-2 rounded-lg font-semibold border border-white/20 hover:bg-white/20 transition-colors flex items-center">
                <Share2 className="w-4 h-4 mr-2" />
                Share
              </button>
              <button
                onClick={() => setIsEditing(!isEditing)}
                className="bg-white/10 text-white px-4 py-2 rounded-lg font-semibold border border-white/20 hover:bg-white/20 transition-colors flex items-center"
              >
                <Edit className="w-4 h-4 mr-2" />
                Edit Profile
              </button>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center p-4 bg-white/5 rounded-xl">
              <div className="text-2xl font-bold text-white">{artistData.totalPlays.toLocaleString()}</div>
              <div className="text-sm text-gray-300">Total Plays</div>
            </div>
            <div className="text-center p-4 bg-white/5 rounded-xl">
              <div className="text-2xl font-bold text-green-400">₵{artistData.totalEarnings.toLocaleString()}</div>
              <div className="text-sm text-gray-300">Total Earnings</div>
            </div>
            <div className="text-center p-4 bg-white/5 rounded-xl">
              <div className="text-2xl font-bold text-purple-400">{songs.length}</div>
              <div className="text-sm text-gray-300">Songs Registered</div>
            </div>
            <div className="text-center p-4 bg-white/5 rounded-xl">
              <div className="text-2xl font-bold text-blue-400">12</div>
              <div className="text-sm text-gray-300">Radio Stations</div>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex space-x-2 mb-8 bg-white/10 backdrop-blur-md p-1 rounded-lg border border-white/20 w-fit">
          <TabButton id="overview" label="Overview" icon={Eye} isActive={activeTab === 'overview'} onClick={setActiveTab} />
          <TabButton id="songs" label="Songs" icon={Music} isActive={activeTab === 'songs'} onClick={setActiveTab} />
          <TabButton id="playlogs" label="Play Logs" icon={Activity} isActive={activeTab === 'playlogs'} onClick={setActiveTab} />
          <TabButton id="royalties" label="Royalties" icon={DollarSign} isActive={activeTab === 'royalties'} onClick={setActiveTab} />
          <TabButton id="analytics" label="Analytics" icon={BarChart3} isActive={activeTab === 'analytics'} onClick={setActiveTab} />
        </div>

        {/* Tab Content */}
        <div className="space-y-8">
          {activeTab === 'overview' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Recent Activity */}
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
                <h2 className="text-xl font-bold text-white mb-4 flex items-center">
                  <Activity className="w-5 h-5 mr-2 text-blue-400" />
                  Recent Activity
                </h2>
                <div className="space-y-3">
                  {playLogs.slice(0, 5).map((log) => (
                    <div key={log.id} className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="bg-blue-500/20 p-2 rounded-lg">
                          <Radio className="w-4 h-4 text-blue-400" />
                        </div>
                        <div>
                          <div className="text-white font-medium">{log.song}</div>
                          <div className="text-sm text-gray-300">{log.station} • {log.date}</div>
                        </div>
                      </div>
                      <div className="text-green-400 font-semibold">₵{log.earnings.toFixed(2)}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Top Performing Songs */}
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
                <h2 className="text-xl font-bold text-white mb-4 flex items-center">
                  <TrendingUp className="w-5 h-5 mr-2 text-purple-400" />
                  Top Performing Songs
                </h2>
                <div className="space-y-3">
                  {songs.slice(0, 3).map((song, idx) => (
                    <div key={song.id} className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold">
                          {idx + 1}
                        </div>
                        <div>
                          <div className="text-white font-medium">{song.title}</div>
                          <div className="text-sm text-gray-300">{song.totalPlays.toLocaleString()} plays</div>
                        </div>
                      </div>
                      <div className="text-green-400 font-semibold">₵{song.totalEarnings.toFixed(2)}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick Stats */}
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
                <h2 className="text-xl font-bold text-white mb-4 flex items-center">
                  <Target className="w-5 h-5 mr-2 text-green-400" />
                  This Month's Performance
                </h2>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Total Plays</span>
                    <span className="text-white font-semibold">1,247</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Total Earnings</span>
                    <span className="text-green-400 font-semibold">₵748.20</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">New Followers</span>
                    <span className="text-purple-400 font-semibold">+234</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Radio Coverage</span>
                    <span className="text-blue-400 font-semibold">12 stations</span>
                  </div>
                </div>
              </div>

              {/* Pending Royalties */}
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
                <h2 className="text-xl font-bold text-white mb-4 flex items-center">
                  <Clock className="w-5 h-5 mr-2 text-yellow-400" />
                  Pending Royalties
                </h2>
                <div className="space-y-3">
                {royaltyHistory.filter(r => r.status === 'Pending').map((transaction, idx) => (
                    <div key={idx} className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                      <div>
                        <div className="text-white font-medium">{transaction.source}</div>
                        <div className="text-sm text-gray-300">{transaction.date}</div>
                      </div>
                      <div className="text-yellow-400 font-semibold">₵{transaction.amount.toFixed(2)}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Songs Tab */}
          {activeTab === 'songs' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {songs.map(song => (
                <SongCard 
                  key={song.id}
                  song={song}
                  isExpanded={expandedSong === song.id}
                  onToggle={(id) => setExpandedSong(expandedSong === id ? null : id)}
                />
              ))}
            </div>
          )}

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
                      <th className="px-4 py-3">Station</th>
                      <th className="px-4 py-3">Date & Time</th>
                      <th className="px-4 py-3">Duration</th>
                      <th className="px-4 py-3">Confidence</th>
                      <th className="px-4 py-3">Earnings</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white/5 divide-y divide-white/10">
                    {playLogs.map(log => (
                      <tr key={log.id}>
                        <td className="px-4 py-2 text-white">{log.song}</td>
                        <td className="px-4 py-2">{log.station}</td>
                        <td className="px-4 py-2">{log.date}</td>
                        <td className="px-4 py-2">{log.duration}</td>
                        <td className="px-4 py-2">{log.confidence}%</td>
                        <td className="px-4 py-2 text-green-400 font-medium">₵{log.earnings.toFixed(2)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Royalties Tab */}
          {activeTab === 'royalties' && (
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
              <h2 className="text-xl font-bold text-white mb-6 flex items-center">
                <DollarSign className="w-5 h-5 mr-2 text-green-400" />
                Royalty History
              </h2>
              <div className="overflow-auto rounded-xl">
                <table className="min-w-full text-sm text-left text-gray-300">
                  <thead className="text-xs uppercase bg-white/5 text-gray-400">
                    <tr>
                      <th className="px-4 py-3">Date</th>
                      <th className="px-4 py-3">Source</th>
                      <th className="px-4 py-3">Amount</th>
                      <th className="px-4 py-3">Status</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white/5 divide-y divide-white/10">
                    {royaltyHistory.map((royalty, idx) => (
                      <tr key={idx}>
                        <td className="px-4 py-2 text-white">{royalty.date}</td>
                        <td className="px-4 py-2">{royalty.source}</td>
                        <td className="px-4 py-2 text-green-400">₵{royalty.amount.toFixed(2)}</td>
                        <td className="px-4 py-2">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            royalty.status === 'Paid' 
                              ? 'bg-green-500/20 text-green-300' 
                              : 'bg-yellow-500/20 text-yellow-300'
                          }`}>
                            {royalty.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Analytics Tab */}
          {activeTab === 'analytics' && (
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
              <h2 className="text-xl font-bold text-white mb-6 flex items-center">
                <BarChart3 className="w-5 h-5 mr-2 text-cyan-400" />
                Analytics Overview
              </h2>
              <p className="text-sm text-gray-400 mb-4">[Future: Add D3.js / Chart.js / Recharts visualizations here]</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-4 bg-white/5 rounded-xl text-white">
                  <h3 className="font-semibold mb-2">Most Played Song</h3>
                  <p>{songs.sort((a, b) => b.totalPlays - a.totalPlays)[0]?.title}</p>
                </div>
                <div className="p-4 bg-white/5 rounded-xl text-white">
                  <h3 className="font-semibold mb-2">Top Earning Song</h3>
                  <p>{songs.sort((a, b) => b.totalEarnings - a.totalEarnings)[0]?.title}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Modals */}
      <AddSongModal isOpen={showAddSong} onClose={() => setShowAddSong(false)} />
    </div>
  );
};

export default ArtistProfilePage;
