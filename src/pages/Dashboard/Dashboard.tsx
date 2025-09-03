import { useEffect, useState } from 'react';
import { Music, TrendingUp, MapPin, Activity, Settings, Bell, Search, Globe, Zap, Radio, Volume2, Eye, Target } from 'lucide-react';
import { baseUrl, stationID, userToken } from '../../constants';

const Dashboard = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('monthly');
  const [activeTab, setActiveTab] = useState('overview');

  const [selectedCategory, setSelectedCategory] = useState('all');

  const [totalSongs, setTotalSongs] = useState('');
  const [totalPlays, setTotalPlays] = useState('');
  const [confidenceScore, setConfidenceScore] = useState('');
  const [activeRegions, setActiveRegions] = useState('');
  const [stationName, setStationName] = useState('');
  const [topSongs, setTopSongs] = useState([]);
  const [airplayData, setAirplayData] = useState([]);
  const [regionalData, setRegionalData] = useState([]);

  const [loading, setLoading] = useState(false);

  // Sample data
  const totalSongs22 = 2847;
  const monthlyPlays22 = 15429;
  const confidenceScore22 = 87.9;
  const activeRegions77 = 8;
  const topSongs222 = [
    { title: "Sika Aba Fie", artist: "Sarkodie", plays: 1245, confidence: 98 },
    { title: "Thunder Fire You", artist: "Shatta Wale", plays: 1121, confidence: 96 },
    { title: "Enjoyment", artist: "Kuami Eugene", plays: 987, confidence: 94 },
    { title: "Kpoo Keke", artist: "Camidoh", plays: 845, confidence: 92 },
    { title: "Party", artist: "Dancegod Lloyd", plays: 723, confidence: 89 }
  ];

  const airplayData222 = [
    { day: 'Mon', plays: 2134 },
    { day: 'Tue', plays: 2856 },
    { day: 'Wed', plays: 3124 },
    { day: 'Thu', plays: 2734 },
    { day: 'Fri', plays: 3456 },
    { day: 'Sat', plays: 4123 },
    { day: 'Sun', plays: 3876 }
  ];

  const regionalData222 = [
    { region: 'Greater Accra', plays: 8234, growth: 12.5 },
    { region: 'Ashanti', plays: 6543, growth: 8.3 },
    { region: 'Northern', plays: 3456, growth: 15.2 },
    { region: 'Western', plays: 2876, growth: 6.7 },
    { region: 'Central', plays: 2234, growth: 9.1 }
  ];

  const maxPlays = Math.max(...airplayData.map(d => d.plays));
  const maxRegionalPlays = Math.max(...regionalData.map(d => d.plays));



  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          baseUrl + `api/stations/dashboard/?station_id=${stationID}&period=${selectedPeriod}`,          
          {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Token ${userToken}`,
          },
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        setTotalSongs(data.data.totalSongs);
        setTotalPlays(data.data.totalPlays);
        setConfidenceScore(data.data.confidenceScore);
        setActiveRegions(data.data.activeRegions);
        setTopSongs(data.data.topSongs);
        setAirplayData(data.data.airplayData);
        setRegionalData(data.data.regionalData);
        setStationName(data.data.stationName);
    
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [selectedPeriod]);





  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="bg-black/20 border-b border-white/10 dark:backdrop-blur-md dark:bg-black/20">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="bg-gradient-to-r from-yellow-400 to-orange-500 p-3 rounded-xl">
                <Radio className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">{stationName}</h1>
                <p className="text-gray-300 text-sm">Station Dashboard</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                <input 
                  type="text" 
                  placeholder="Search songs, artists..."
                  className="bg-white/10 backdrop-blur-md text-white pl-10 pr-4 py-2 rounded-lg border border-white/20 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                />
              </div>
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
        {/* Period Selector */}
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

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-gradient-to-br from-blue-500/20 to-purple-600/20 backdrop-blur-md rounded-2xl p-6 border border-white/10">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-blue-500/20 p-3 rounded-xl">
                <Music className="w-6 h-6 text-blue-400" />
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-white">{totalSongs.toLocaleString()}</div>
                <div className="text-sm text-gray-300">Total Songs</div>
              </div>
            </div>
            <div className="text-xs text-gray-400">Detected this period</div>
          </div>

          <div className="bg-gradient-to-br from-green-500/20 to-emerald-600/20 backdrop-blur-md rounded-2xl p-6 border border-white/10">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-green-500/20 p-3 rounded-xl">
                <Volume2 className="w-6 h-6 text-green-400" />
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-white">{totalPlays.toLocaleString()}</div>
                <div className="text-sm text-gray-300">Monthly Plays</div>
              </div>
            </div>
            <div className="text-xs text-green-400">↑ 12.5% from last month</div>
          </div>

          <div className="bg-gradient-to-br from-orange-500/20 to-red-600/20 backdrop-blur-md rounded-2xl p-6 border border-white/10">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-orange-500/20 p-3 rounded-xl">
                <Target className="w-6 h-6 text-orange-400" />
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-white">{confidenceScore}%</div>
                <div className="text-sm text-gray-300">Avg Confidence</div>
              </div>
            </div>
            <div className="text-xs text-orange-400">Detection accuracy</div>
          </div>

          <div className="bg-gradient-to-br from-purple-500/20 to-pink-600/20 backdrop-blur-md rounded-2xl p-6 border border-white/10">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-purple-500/20 p-3 rounded-xl">
                <Globe className="w-6 h-6 text-purple-400" />
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-white">{activeRegions}</div>
                <div className="text-sm text-gray-300">Active Regions</div>
              </div>
            </div>
            <div className="text-xs text-purple-400">Broadcasting coverage</div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-8">
            {/* Top Played Songs */}
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-white flex items-center">
                  <TrendingUp className="w-5 h-5 mr-2 text-yellow-400" />
                  Top Played Songs
                </h2>
                <button className="text-sm text-gray-300 hover:text-white flex items-center">
                  View All <Eye className="w-4 h-4 ml-1" />
                </button>
              </div>
              <div className="space-y-4">
                {topSongs.map((song, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/10 hover:bg-white/10 transition-colors">
                    <div className="flex items-center space-x-4">
                      <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold">
                        {index + 1}
                      </div>
                      <div>
                        <div className="font-semibold text-white">{song.title}</div>
                        <div className="text-sm text-gray-300">{song.artist}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-white font-semibold">{song.plays.toLocaleString()}</div>
                      <div className="text-xs text-gray-400 flex items-center">
                        <Zap className="w-3 h-3 mr-1" />
                        {song.confidence}% confidence
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Airplay Activity Timeline */}
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-white flex items-center">
                  <Activity className="w-5 h-5 mr-2 text-blue-400" />
                  Airplay Activity Timeline
                </h2>
                <div className="flex space-x-2">
                  <button className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded-lg text-sm">7D</button>
                  <button className="px-3 py-1 bg-white/10 text-gray-300 rounded-lg text-sm">30D</button>
                </div>
              </div>
              <div className="space-y-4">
                {airplayData.map((day, index) => (
                  <div key={index} className="flex items-center space-x-4">
                    <div className="w-12 text-sm text-gray-300">{day.day}</div>
                    <div className="flex-1 bg-white/10 rounded-full h-6 overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full transition-all duration-500"
                        style={{ width: `${(day.plays / maxPlays) * 100}%` }}
                      />
                    </div>
                    <div className="text-white font-semibold w-16 text-right">{day.plays.toLocaleString()}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-8">
            {/* Regional Insights */}
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-white flex items-center">
                  <MapPin className="w-5 h-5 mr-2 text-green-400" />
                  Regional Insights
                </h2>
              </div>
              <div className="space-y-4">
                {regionalData.map((region, index) => (
                  <div key={index} className="p-4 bg-white/5 rounded-xl border border-white/10">
                    <div className="flex items-center justify-between mb-2">
                      <div className="font-semibold text-white">{region.region}</div>
                      <div className="text-sm text-green-400">+{region.growth}%</div>
                    </div>
                    <div className="text-sm text-gray-300 mb-2">{region.plays.toLocaleString()} plays</div>
                    <div className="w-full bg-white/10 rounded-full h-2">
                      <div 
                        className="h-full bg-gradient-to-r from-green-500 to-emerald-500 rounded-full"
                        style={{ width: `${(region.plays / maxRegionalPlays) * 100}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Detection Confidence Rating */}
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-white flex items-center">
                  <Target className="w-5 h-5 mr-2 text-orange-400" />
                  Detection Confidence
                </h2>
              </div>
              <div className="space-y-4">
                <div className="text-center">
                  <div className="text-4xl font-bold text-white mb-2">{confidenceScore}%</div>
                  <div className="text-sm text-gray-300">Average Match Certainty</div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-300">Excellent (90-100%)</span>
                    <span className="text-green-400 font-semibold">78%</span>
                  </div>
                  <div className="w-full bg-white/10 rounded-full h-2">
                    <div className="w-4/5 h-full bg-gradient-to-r from-green-500 to-emerald-500 rounded-full" />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-300">Good (70-89%)</span>
                    <span className="text-yellow-400 font-semibold">18%</span>
                  </div>
                  <div className="w-full bg-white/10 rounded-full h-2">
                    <div className="w-1/5 h-full bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full" />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-300">Needs Review (&lt;70%)</span>
                    <span className="text-red-400 font-semibold">4%</span>
                  </div>
                  <div className="w-full bg-white/10 rounded-full h-2">
                    <div className="w-1/20 h-full bg-gradient-to-r from-red-500 to-pink-500 rounded-full" />
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
              <h2 className="text-xl font-bold text-white mb-4">Quick Actions</h2>
              <div className="space-y-3">
                <button className="w-full bg-gradient-to-r from-yellow-400 to-orange-500 text-white py-3 rounded-xl font-semibold hover:shadow-lg transition-shadow">
                  Generate Report
                </button>
                <button className="w-full bg-white/10 text-white py-3 rounded-xl font-semibold border border-white/20 hover:bg-white/20 transition-colors">
                  Export Data
                </button>
                <button className="w-full bg-white/10 text-white py-3 rounded-xl font-semibold border border-white/20 hover:bg-white/20 transition-colors">
                  Schedule Analysis
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
