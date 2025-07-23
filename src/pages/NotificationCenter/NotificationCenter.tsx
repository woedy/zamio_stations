import React, { useCallback, useEffect, useState } from 'react';
import {
  AlertCircle,
  CheckCircle,
  Info,
  Sparkles,
  Radio,
  Clock,
  ChevronRight,
} from 'lucide-react';
import { baseUrl, stationID, userToken } from '../../constants';

const notifications22 = [
  {
    id: 1,
    type: 'summary',
    title: 'Weekly Summary Report',
    message: '45 songs detected this week on XYZ FM',
    timestamp: '2 days ago',
    icon: <Radio className="text-blue-400" />,
  },
  {
    id: 2,
    type: 'compliance',
    title: 'Compliance Reminder',
    message: 'Your June report is pending export. Deadline in 3 days.',
    timestamp: '1 day ago',
    icon: <AlertCircle className="text-yellow-400" />,
  },
  {
    id: 3,
    type: 'update',
    title: 'New Feature: Station Insights',
    message: 'View listener reachmaps and regional breakdowns.',
    timestamp: 'Just now',
    icon: <Sparkles className="text-purple-400" />,
  },
];

const NotificationCenter = () => {
  const [search, setSearch] = useState('');
  const [orderNotifications, setOrderNotifications] = useState('');
  const [page, setPage] = useState(1);
  const [itemCount, setItemCount] = useState(0);
  const [totalPages, setTotalPages] = useState(1); // Default to 1 to avoid issues
  const [loading, setLoading] = useState(false);

  const [notifications, setNotifications] = useState([]);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `${baseUrl}api/notifications/get-all-station-notifications/?search=${encodeURIComponent(
          search,
        )}&station_id=${encodeURIComponent(
          stationID,
        )}&order_by=${encodeURIComponent(orderNotifications)}&page=${page}`,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Token ${userToken}`,
          },
        },
      );

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      setNotifications(data.data.notifications);
      setTotalPages(data.data.pagination.total_pages);
      setItemCount(data.data.pagination.count);
      console.log('Total Pages:', data.data.pagination.total_pages);
      console.log('ppp:', data.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  }, [baseUrl, search, page, userToken, orderNotifications]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-950 text-white p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">📬 Notification Center</h1>
        <div className="bg-white/5 backdrop-blur-xl p-6 rounded-2xl border border-white/10 space-y-4">
          {notifications.map((n) => (
            <div
              key={n.id}
              className="flex items-start justify-between p-4 rounded-xl bg-white/10 border border-white/10 hover:bg-white/20 transition"
            >
              <div className="flex items-start space-x-4">
                <div className="mt-1">{n.icon}</div>
                <div>
                  <h2 className="font-semibold text-lg">{n.title}</h2>
                  <p className="text-gray-300 text-sm">{n.message}</p>
                  <p className="text-xs text-gray-500 mt-1 flex items-center">
                    <Clock className="w-4 h-4 mr-1" />
                    {n.timestamp}
                  </p>
                </div>
              </div>
              {n.type === 'update' && (
                <button className="flex items-center text-sm text-indigo-400 hover:text-white">
                  Learn More <ChevronRight className="w-4 h-4 ml-1" />
                </button>
              )}
              {n.type === 'compliance' && (
                <button className="text-xs text-yellow-300 hover:text-white ml-4">
                  Dismiss
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NotificationCenter;
