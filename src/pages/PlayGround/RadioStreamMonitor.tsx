import React, { useState, useEffect } from 'react';
import { Play, Square, Radio, AlertCircle, CheckCircle } from 'lucide-react';
import { baseUrl, userToken } from '../../constants';

const RadioStreamMonitor = () => {
  const [streamUrl, setStreamUrl] = useState('');
  const [isMonitoring, setIsMonitoring] = useState(false);
  const [matches, setMatches] = useState([]);
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState('');
  const [sessionId, setSessionId] = useState(null);

  // Poll for matches while monitoring
  useEffect(() => {
    let interval;
    if (isMonitoring && sessionId) {
      interval = setInterval(async () => {
        try {
          const response = await fetch(`${baseUrl}api/music-monitor/stream/matches/${sessionId}/`, {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Token ${userToken}`,
    
            },
          });
          const data = await response.json();
          if (data.matches) {
            setMatches(data.matches);
          }
        } catch (err) {
          console.error('Error fetching matches:', err);
        }
      }, 2000);
    }
    return () => clearInterval(interval);
  }, [isMonitoring, sessionId]);

  const startMonitoring = async () => {
    if (!streamUrl.trim()) {
      setError('Please enter a valid stream URL');
      return;
    }

    try {
      setStatus('starting');
      setError('');
      
      const response = await fetch(`${baseUrl}api/music-monitor/stream/start/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Token ${userToken}`,

        },
        body: JSON.stringify({
          stream_url: streamUrl,
          station_id: "ST-EOK77PP-ON", // You might want to make this dynamic
        }),
      });

      const data = await response.json();
      
      if (response.ok) {
        setIsMonitoring(true);
        setSessionId(data.session_id);
        setStatus('monitoring');
      } else {
        setError(data.error || 'Failed to start monitoring');
        setStatus('idle');
      }
    } catch (err) {
      setError('Network error: ' + err.message);
      setStatus('idle');
    }
  };

  const stopMonitoring = async () => {
    if (!sessionId) return;

    try {
      await fetch(`${baseUrl}api/music-monitor/stream/stop/${sessionId}/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Token ${userToken}`,

        },
      });
      
      setIsMonitoring(false);
      setSessionId(null);
      setStatus('idle');
    } catch (err) {
      setError('Error stopping monitor: ' + err.message);
    }
  };

  const formatTime = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString();
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white dark:bg-boxdark rounded-lg shadow-lg">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
          <Radio className="w-6 h-6" />
          Radio Stream Monitor
        </h2>
        
        <div className="flex gap-4 mb-4">
          <input
            type="url"
            value={streamUrl}
            onChange={(e) => setStreamUrl(e.target.value)}
            placeholder="Enter radio stream URL (e.g., http://stream.example.com:8000/radio)"
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={isMonitoring}
          />
          
          {!isMonitoring ? (
            <button
              onClick={startMonitoring}
              disabled={status === 'starting'}
              className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 flex items-center gap-2"
            >
              <Play className="w-4 h-4" />
              {status === 'starting' ? 'Starting...' : 'Start Monitor'}
            </button>
          ) : (
            <button
              onClick={stopMonitoring}
              className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 flex items-center gap-2"
            >
              <Square className="w-4 h-4" />
              Stop Monitor
            </button>
          )}
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg flex items-center gap-2">
            <AlertCircle className="w-4 h-4" />
            {error}
          </div>
        )}

        <div className="flex items-center gap-2 mb-4">
          <div className={`w-3 h-3 rounded-full ${
            status === 'monitoring' ? 'bg-green-500 animate-pulse' : 
            status === 'starting' ? 'bg-yellow-500 animate-pulse' : 
            'bg-gray-400'
          }`}></div>
          <span className="text-sm font-medium text-gray-600">
            Status: {status === 'monitoring' ? 'Monitoring Live' : 
                    status === 'starting' ? 'Starting...' : 
                    'Idle'}
          </span>
        </div>
      </div>

      <div className="border-t pt-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">
          Live Matches ({matches.length})
        </h3>
        
        {matches.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            {isMonitoring ? 'Listening for music matches...' : 'No matches yet'}
          </div>
        ) : (
          <div className="space-y-3 max-h-96 overflow-y-auto">
            {matches.map((match, index) => (
              <div key={index} className="bg-green-50 border border-green-200 rounded-lg p-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                      <h4 className="font-semibold text-gray-800">{match.track_title}</h4>
                    </div>
                    <p className="text-sm text-gray-600 mb-1">
                      Artist: {match.artist_name}
                    </p>
                    <p className="text-sm text-gray-600 mb-1">
                      Album: {match.album_title || 'Unknown'}
                    </p>
                    <p className="text-sm text-gray-500">
                      Matched at: {formatTime(match.matched_at)}
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium text-green-600">
                      {match.confidence}% match
                    </div>
                    <div className="text-xs text-gray-500">
                      {match.hashes_matched} hashes
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default RadioStreamMonitor;