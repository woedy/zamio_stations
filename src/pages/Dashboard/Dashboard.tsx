import { useState } from "react";
import { Search, Bell, Settings, User, HelpCircle, MessageSquare, Upload, Clock, CreditCard, MapPin } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts";

export default function MusicRoyaltiesDashboard() {
  const [activeTab, setActiveTab] = useState("Dashboard");
  
  // Sample data for the chart
  const chartData = [
    { name: "Jan", plays: 20 },
    { name: "Jan", plays: 40 },
    { name: "Jan", plays: 80 },
    { name: "Jan", plays: 120 },
    { name: "Jan", plays: 150 },
    { name: "Jan", plays: 180 },
    { name: "Jan", plays: 230 },
    { name: "Jan", plays: 250 },
  ];

  // Sample data for recent airplays
  const recentAirplays = [
    { station: "Hitz FM", location: "Accra", date: "(Apr. 20) 02:25 pm", song: "Raggae Flow", duration: "2 min" },
    { station: "Hitz FM", location: "Accra", date: "(Apr. 20) 02:25 pm", song: "Raggae Flow", duration: "2 min" },
    { station: "Hitz FM", location: "Accra", date: "(Apr. 20) 02:25 pm", song: "Raggae Flow", duration: "2 min" },
    { station: "Hitz FM", location: "Accra", date: "(Apr. 20) 02:25 pm", song: "Raggae Flow", duration: "2 min" },
  ];


  return (
    <div className="flex min-h-screen bg-primary text-white">
 

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Bar */}
        <header className="flex items-center justify-between p-6 border-b border-indigo-900">
          <h2 className="text-2xl font-semibold">Dashboard</h2>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search"
                className="bg-indigo-900/50 pl-10 pr-4 py-2 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-600"
              />
            </div>
            <button className="p-2 rounded-full hover:bg-indigo-900">
              <Bell className="h-6 w-6" />
            </button>
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-full bg-white overflow-hidden mr-2">
                <img
                  src="/api/placeholder/40/40"
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <p className="text-sm font-medium">Cynthia Doe</p>
                <p className="text-xs text-gray-400">Artist</p>
              </div>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <div className="flex flex-1 p-6">
          {/* Main Dashboard Area */}
          <div className="flex-1 mr-6">
            {/* Stats and Graph Section */}
            <div className="grid grid-cols-7 gap-6 mb-8">
              {/* Total Airplays */}
              <div className="col-span-2 flex flex-col items-center">
                <p className="text-gray-400 mb-2">Total Airplays</p>
                <div className="w-40 h-40 rounded-full border-8 border-red-500 flex items-center justify-center mb-2">
                  <div className="text-center">
                    <p className="text-4xl font-bold">250</p>
                    <p className="text-sm text-gray-400">Plays</p>
                  </div>
                </div>
              </div>

              {/* Chart */}
              <div className="col-span-3 bg-indigo-900/30 rounded-lg p-4">
                <ResponsiveContainer width="100%" height={200}>
                  <LineChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#333" opacity={0.3} />
                    <XAxis dataKey="name" stroke="#888" />
                    <YAxis stroke="#888" />
                    <Line
                      type="monotone"
                      dataKey="plays"
                      stroke="#fff"
                      strokeWidth={2}
                      dot={false}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              {/* Total Revenue */}
              <div className="col-span-2 flex flex-col items-center">
                <p className="text-gray-400 mb-2">Total TV</p>
                <div className="w-40 h-40 rounded-full border-8 border-green-500 flex items-center justify-center mb-2">
                  <div className="text-center">
                    <p className="text-4xl font-bold">3,050</p>
                    <p className="text-sm text-gray-400">GHC</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Total Radio Section */}
            <div className="flex justify-between mb-8">
              <div className="text-center">
                <p className="text-gray-400 mb-2">Total Radio</p>
                <p className="text-4xl font-bold">11</p>
              </div>
              
              <div className="text-center">
                <p className="text-gray-400 mb-2">Total TV</p>
                <p className="text-4xl font-bold">11</p>
              </div>
            </div>

            {/* Recent Notification */}
            <div className="mb-8 p-4 bg-indigo-900/30 rounded-lg">
              <p>Your song <span className="font-bold">'Highlife Groove'</span> was played on <span className="font-bold">Hitz FM</span> at <span className="font-bold">10:15 AM</span> on <span className="font-bold">April 20, 2025</span>.</p>
            </div>

            {/* Recent Airplays Table */}
            <div>
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-semibold">Recent Airplays</h3>
                <button className="px-4 py-2 bg-indigo-600 rounded-lg hover:bg-indigo-700 transition">
                  View All
                </button>
              </div>
              <div className="bg-indigo-900/30 rounded-lg overflow-hidden">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-indigo-800">
                      <th className="text-left py-3 px-4">Station</th>
                      <th className="text-left py-3 px-4">Location</th>
                      <th className="text-left py-3 px-4">Date/time</th>
                      <th className="text-left py-3 px-4">Song Title</th>
                      <th className="text-left py-3 px-4">Duration</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentAirplays.map((play, index) => (
                      <tr key={index} className="border-b border-indigo-800 hover:bg-indigo-800/50">
                        <td className="py-3 px-4">
                          <div className="flex items-center">
                            <div className="w-8 h-8 bg-white rounded mr-2">
                              <img src="/api/placeholder/32/32" alt="Station logo" className="w-full h-full object-cover" />
                            </div>
                            {play.station}
                          </div>
                        </td>
                        <td className="py-3 px-4">{play.location}</td>
                        <td className="py-3 px-4">{play.date}</td>
                        <td className="py-3 px-4">
                          <div className="flex items-center">
                            <div className="w-8 h-8 bg-white rounded mr-2">
                              <img src="/api/placeholder/32/32" alt="Album art" className="w-full h-full object-cover" />
                            </div>
                            {play.song}
                          </div>
                        </td>
                        <td className="py-3 px-4">{play.duration}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Map Section */}
          <div className="w-80 bg-indigo-900/30 rounded-lg overflow-hidden">
            <div className="bg-indigo-800 py-3 px-4">
              <h3 className="font-semibold flex items-center">
                <MapPin className="w-4 h-4 mr-2" />
                Airplays Locations
              </h3>
            </div>
            <div className="h-full">
              <img src="/api/placeholder/320/600" alt="Map" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}