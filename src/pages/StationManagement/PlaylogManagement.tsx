import React, { useEffect, useState } from 'react';
import { 
  Upload, 
  FileText, 
  CheckCircle, 
  AlertCircle, 
  Eye, 
  Search, 
  Filter, 
  Download,
  Calendar,
  BarChart3,
  Loader2,
  X,
  RefreshCw,
  AlertTriangle,
  Check,
  XCircle
} from 'lucide-react';
import api from '../../lib/api';

interface PlaylogEntry {
  playlog: {
    id: number;
    track_title: string;
    artist_name: string;
    start_time: string;
    stop_time: string;
    duration: string;
    avg_confidence_score: number;
    royalty_amount: string;
    status: string;
  };
  matching_detections: number;
  detection_confidence: number;
  discrepancy: boolean;
  multiple_matches: boolean;
}

interface Detection {
  id: number;
  detection_id: string;
  track_title: string;
  artist_name: string;
  album?: string;
  detection_source: string;
  confidence_score: number;
  processing_status: string;
  detected_at: string;
  audio_timestamp: string;
  duration_seconds?: number;
  isrc?: string;
  pro_affiliation?: string;
  fingerprint_version: string;
  retry_count: number;
  processing_time_ms?: number;
  has_track_match: boolean;
  error_message?: string;
}

interface UploadResult {
  processed_count: number;
  skipped_count: number;
  total_entries: number;
  error_entries: Array<{
    entry: any;
    error: string;
  }>;
}

const PlaylogManagement: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'upload' | 'comparison' | 'matches'>('upload');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Upload state
  const [uploadFile, setUploadFile] = useState<File | null>(null);
  const [uploadFormat, setUploadFormat] = useState<'csv' | 'xml' | 'json'>('csv');
  const [uploadResult, setUploadResult] = useState<UploadResult | null>(null);
  
  // Comparison state
  const [comparisonData, setComparisonData] = useState<PlaylogEntry[]>([]);
  const [comparisonStats, setComparisonStats] = useState<any>(null);
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');
  
  // Match log state
  const [detections, setDetections] = useState<Detection[]>([]);
  const [detectionStats, setDetectionStats] = useState<any>(null);
  const [detectionSource, setDetectionSource] = useState<'all' | 'local' | 'acrcloud'>('all');
  const [confidenceThreshold, setConfidenceThreshold] = useState(0.0);
  const [selectedDetection, setSelectedDetection] = useState<Detection | null>(null);
  const [showVerificationModal, setShowVerificationModal] = useState(false);
  
  // Pagination
  const [pagination, setPagination] = useState({
    page_number: 1,
    total_pages: 1,
    total_count: 0,
    next: null,
    previous: null
  });

  const stationId = localStorage.getItem('station_id') || '';

  const handleFileUpload = async () => {
    if (!uploadFile || !stationId) {
      setError('Please select a file and ensure station ID is available');
      return;
    }

    setLoading(true);
    setError(null);
    setUploadResult(null);

    try {
      const formData = new FormData();
      formData.append('playlog_file', uploadFile);
      formData.append('station_id', stationId);
      formData.append('format', uploadFormat);

      const response = await api.post('/api/stations/upload-playlog/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.data.message === 'Playlog upload completed') {
        setUploadResult(response.data.data);
      } else {
        setError('Upload failed');
      }
    } catch (err: any) {
      setError(err.response?.data?.errors ? 
        Object.values(err.response.data.errors).flat().join(', ') : 
        'Upload failed'
      );
    } finally {
      setLoading(false);
    }
  };

  const loadComparisonData = async (page = 1) => {
    if (!stationId) return;

    setLoading(true);
    setError(null);

    try {
      const params: any = {
        station_id: stationId,
        page: page.toString(),
        page_size: '20'
      };

      if (dateFrom) params.date_from = dateFrom;
      if (dateTo) params.date_to = dateTo;

      const response = await api.get('/api/stations/get-playlog-comparison/', { params });

      if (response.data.message === 'Playlog comparison completed') {
        setComparisonData(response.data.data.comparison_data);
        setComparisonStats(response.data.data.summary);
        setPagination(response.data.data.pagination);
      } else {
        setError('Failed to load comparison data');
      }
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to load comparison data');
    } finally {
      setLoading(false);
    }
  };

  const loadMatchLogData = async (page = 1) => {
    if (!stationId) return;

    setLoading(true);
    setError(null);

    try {
      const params = {
        station_id: stationId,
        page: page.toString(),
        page_size: '20',
        source: detectionSource,
        confidence_threshold: confidenceThreshold.toString()
      };

      const response = await api.get('/api/stations/get-match-log-details/', { params });

      if (response.data.message === 'Match log details retrieved successfully') {
        setDetections(response.data.data.detections);
        setDetectionStats(response.data.data.statistics);
        setPagination(response.data.data.pagination);
      } else {
        setError('Failed to load match log data');
      }
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to load match log data');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyDetection = async (action: 'confirm' | 'correct' | 'reject', trackId?: string, notes?: string) => {
    if (!selectedDetection) return;

    setLoading(true);
    setError(null);

    try {
      const payload: any = {
        detection_id: selectedDetection.detection_id,
        action,
        notes: notes || ''
      };

      if (trackId) {
        payload.track_id = trackId;
      }

      const response = await api.post('/api/stations/verify-detection-match/', payload);

      if (response.data.message.includes('successfully')) {
        setShowVerificationModal(false);
        setSelectedDetection(null);
        await loadMatchLogData(pagination.page_number);
      } else {
        setError('Verification failed');
      }
    } catch (err: any) {
      setError(err.response?.data?.errors ? 
        Object.values(err.response.data.errors).flat().join(', ') : 
        'Verification failed'
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (activeTab === 'comparison') {
      loadComparisonData();
    } else if (activeTab === 'matches') {
      loadMatchLogData();
    }
  }, [activeTab, stationId, dateFrom, dateTo, detectionSource, confidenceThreshold]);

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 0.8) return 'text-green-400';
    if (confidence >= 0.6) return 'text-yellow-400';
    return 'text-red-400';
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'failed':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-950 text-white p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white flex items-center">
              <FileText className="w-8 h-8 mr-3 text-blue-400" />
              Playlog Management
            </h1>
            <p className="text-gray-300 mt-2">Upload playlogs and compare with detection results</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex space-x-1 mb-6 bg-white/10 p-1 rounded-lg">
          <button
            onClick={() => setActiveTab('upload')}
            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
              activeTab === 'upload'
                ? 'bg-blue-500 text-white'
                : 'text-gray-300 hover:text-white hover:bg-white/10'
            }`}
          >
            <Upload className="w-4 h-4 inline mr-2" />
            Upload Playlog
          </button>
          <button
            onClick={() => setActiveTab('comparison')}
            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
              activeTab === 'comparison'
                ? 'bg-blue-500 text-white'
                : 'text-gray-300 hover:text-white hover:bg-white/10'
            }`}
          >
            <BarChart3 className="w-4 h-4 inline mr-2" />
            Comparison
          </button>
          <button
            onClick={() => setActiveTab('matches')}
            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
              activeTab === 'matches'
                ? 'bg-blue-500 text-white'
                : 'text-gray-300 hover:text-white hover:bg-white/10'
            }`}
          >
            <Eye className="w-4 h-4 inline mr-2" />
            Match Logs
          </button>
        </div>

        {/* Error Display */}
        {error && (
          <div className="bg-red-500/10 border border-red-400/30 text-red-200 p-4 rounded-lg mb-6">
            {error}
          </div>
        )}

        {/* Upload Tab */}
        {activeTab === 'upload' && (
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
            <h2 className="text-xl font-semibold text-white mb-6">Upload Station Playlog</h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    File Format
                  </label>
                  <select
                    value={uploadFormat}
                    onChange={(e) => setUploadFormat(e.target.value as 'csv' | 'xml' | 'json')}
                    className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="csv" className="bg-slate-800">CSV</option>
                    <option value="xml" className="bg-slate-800">XML</option>
                    <option value="json" className="bg-slate-800">JSON</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Select Playlog File
                  </label>
                  <input
                    type="file"
                    accept=".csv,.xml,.json"
                    onChange={(e) => setUploadFile(e.target.files?.[0] || null)}
                    className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                  />
                </div>

                <button
                  onClick={handleFileUpload}
                  disabled={!uploadFile || loading}
                  className="w-full bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                >
                  {loading ? (
                    <Loader2 className="w-5 h-5 animate-spin mr-2" />
                  ) : (
                    <Upload className="w-5 h-5 mr-2" />
                  )}
                  Upload Playlog
                </button>
              </div>

              <div className="bg-white/5 p-4 rounded-lg">
                <h3 className="text-lg font-medium text-white mb-3">File Format Requirements</h3>
                <div className="space-y-2 text-sm text-gray-300">
                  <p><strong>CSV:</strong> title, artist, album, played_at, start_time, stop_time, duration</p>
                  <p><strong>XML:</strong> &lt;item&gt; elements with child elements for each field</p>
                  <p><strong>JSON:</strong> Array of objects or object with 'entries' array</p>
                  <p className="mt-3 text-yellow-300">
                    <AlertTriangle className="w-4 h-4 inline mr-1" />
                    Required fields: title, artist, played_at
                  </p>
                </div>
              </div>
            </div>

            {/* Upload Results */}
            {uploadResult && (
              <div className="mt-6 p-4 bg-white/5 rounded-lg">
                <h3 className="text-lg font-medium text-white mb-4">Upload Results</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-400">{uploadResult.processed_count}</div>
                    <div className="text-sm text-gray-300">Processed</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-yellow-400">{uploadResult.skipped_count}</div>
                    <div className="text-sm text-gray-300">Skipped</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-400">{uploadResult.total_entries}</div>
                    <div className="text-sm text-gray-300">Total</div>
                  </div>
                </div>

                {uploadResult.error_entries.length > 0 && (
                  <div>
                    <h4 className="text-md font-medium text-white mb-2">Errors (showing first 10):</h4>
                    <div className="space-y-2 max-h-40 overflow-y-auto">
                      {uploadResult.error_entries.map((errorEntry, index) => (
                        <div key={index} className="text-sm bg-red-500/10 border border-red-400/30 p-2 rounded">
                          <div className="text-red-200">{errorEntry.error}</div>
                          <div className="text-gray-400 text-xs mt-1">
                            {errorEntry.entry.title} by {errorEntry.entry.artist}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* Comparison Tab */}
        {activeTab === 'comparison' && (
          <div className="space-y-6">
            {/* Filters */}
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">From Date</label>
                  <input
                    type="date"
                    value={dateFrom}
                    onChange={(e) => setDateFrom(e.target.value)}
                    className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">To Date</label>
                  <input
                    type="date"
                    value={dateTo}
                    onChange={(e) => setDateTo(e.target.value)}
                    className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="flex items-end">
                  <button
                    onClick={() => loadComparisonData(1)}
                    className="w-full bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center justify-center"
                  >
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Refresh
                  </button>
                </div>
              </div>
            </div>

            {/* Statistics */}
            {comparisonStats && (
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20 text-center">
                  <div className="text-2xl font-bold text-blue-400">{comparisonStats.total_playlogs}</div>
                  <div className="text-sm text-gray-300">Total Playlogs</div>
                </div>
                <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20 text-center">
                  <div className="text-2xl font-bold text-green-400">{comparisonStats.total_detections}</div>
                  <div className="text-sm text-gray-300">Total Detections</div>
                </div>
                <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20 text-center">
                  <div className="text-2xl font-bold text-yellow-400">{comparisonStats.matched_entries}</div>
                  <div className="text-sm text-gray-300">Matched Entries</div>
                </div>
                <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20 text-center">
                  <div className="text-2xl font-bold text-red-400">{comparisonStats.discrepancy_rate}%</div>
                  <div className="text-sm text-gray-300">Discrepancy Rate</div>
                </div>
              </div>
            )}

            {/* Comparison Table */}
            <div className="bg-white/10 backdrop-blur-md rounded-xl border border-white/20 overflow-hidden">
              {loading ? (
                <div className="flex items-center justify-center py-12">
                  <Loader2 className="w-6 h-6 animate-spin mr-2" />
                  Loading comparison data...
                </div>
              ) : comparisonData.length === 0 ? (
                <div className="text-center py-12 text-gray-300">
                  <FileText className="w-12 h-12 mx-auto mb-4 text-gray-500" />
                  <p>No comparison data found</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-white/5">
                      <tr>
                        <th className="px-6 py-4 text-left text-sm font-medium text-gray-300">Track</th>
                        <th className="px-6 py-4 text-left text-sm font-medium text-gray-300">Played At</th>
                        <th className="px-6 py-4 text-left text-sm font-medium text-gray-300">Matches</th>
                        <th className="px-6 py-4 text-left text-sm font-medium text-gray-300">Confidence</th>
                        <th className="px-6 py-4 text-left text-sm font-medium text-gray-300">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/10">
                      {comparisonData.map((entry, index) => (
                        <tr key={index} className="hover:bg-white/5">
                          <td className="px-6 py-4">
                            <div>
                              <div className="font-medium text-white">{entry.playlog.track_title}</div>
                              <div className="text-sm text-gray-400">{entry.playlog.artist_name}</div>
                            </div>
                          </td>
                          <td className="px-6 py-4 text-gray-300">
                            {new Date(entry.playlog.start_time).toLocaleString()}
                          </td>
                          <td className="px-6 py-4">
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              entry.matching_detections > 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                            }`}>
                              {entry.matching_detections} matches
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <span className={`font-medium ${getConfidenceColor(entry.detection_confidence)}`}>
                              {(entry.detection_confidence * 100).toFixed(1)}%
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            {entry.discrepancy ? (
                              <AlertCircle className="w-5 h-5 text-red-400" title="Discrepancy found" />
                            ) : entry.multiple_matches ? (
                              <AlertTriangle className="w-5 h-5 text-yellow-400" title="Multiple matches" />
                            ) : (
                              <CheckCircle className="w-5 h-5 text-green-400" title="Match found" />
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {/* Pagination */}
              {pagination.total_pages > 1 && (
                <div className="px-6 py-4 border-t border-white/10 flex items-center justify-between">
                  <div className="text-sm text-gray-400">
                    Showing page {pagination.page_number} of {pagination.total_pages}
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => loadComparisonData(pagination.page_number - 1)}
                      disabled={!pagination.previous}
                      className="px-3 py-1 bg-white/10 text-white rounded disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Previous
                    </button>
                    <button
                      onClick={() => loadComparisonData(pagination.page_number + 1)}
                      disabled={!pagination.next}
                      className="px-3 py-1 bg-white/10 text-white rounded disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Next
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Match Logs Tab */}
        {activeTab === 'matches' && (
          <div className="space-y-6">
            {/* Filters */}
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Detection Source</label>
                  <select
                    value={detectionSource}
                    onChange={(e) => setDetectionSource(e.target.value as 'all' | 'local' | 'acrcloud')}
                    className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="all" className="bg-slate-800">All Sources</option>
                    <option value="local" className="bg-slate-800">Local Fingerprinting</option>
                    <option value="acrcloud" className="bg-slate-800">ACRCloud</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Min Confidence</label>
                  <input
                    type="number"
                    min="0"
                    max="1"
                    step="0.1"
                    value={confidenceThreshold}
                    onChange={(e) => setConfidenceThreshold(parseFloat(e.target.value))}
                    className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="md:col-span-2 flex items-end">
                  <button
                    onClick={() => loadMatchLogData(1)}
                    className="w-full bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center justify-center"
                  >
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Refresh
                  </button>
                </div>
              </div>
            </div>

            {/* Statistics */}
            {detectionStats && (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20 text-center">
                  <div className="text-2xl font-bold text-blue-400">{detectionStats.total_detections}</div>
                  <div className="text-sm text-gray-300">Total Detections</div>
                </div>
                <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20 text-center">
                  <div className="text-2xl font-bold text-green-400">{detectionStats.average_confidence.toFixed(3)}</div>
                  <div className="text-sm text-gray-300">Avg Confidence</div>
                </div>
                <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20 text-center">
                  <div className="text-2xl font-bold text-purple-400">{detectionStats.matched_tracks}</div>
                  <div className="text-sm text-gray-300">Matched Tracks</div>
                </div>
                <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20 text-center">
                  <div className="text-2xl font-bold text-yellow-400">{detectionStats.match_rate}%</div>
                  <div className="text-sm text-gray-300">Match Rate</div>
                </div>
              </div>
            )}

            {/* Detections Table */}
            <div className="bg-white/10 backdrop-blur-md rounded-xl border border-white/20 overflow-hidden">
              {loading ? (
                <div className="flex items-center justify-center py-12">
                  <Loader2 className="w-6 h-6 animate-spin mr-2" />
                  Loading detections...
                </div>
              ) : detections.length === 0 ? (
                <div className="text-center py-12 text-gray-300">
                  <Eye className="w-12 h-12 mx-auto mb-4 text-gray-500" />
                  <p>No detections found</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-white/5">
                      <tr>
                        <th className="px-6 py-4 text-left text-sm font-medium text-gray-300">Track</th>
                        <th className="px-6 py-4 text-left text-sm font-medium text-gray-300">Source</th>
                        <th className="px-6 py-4 text-left text-sm font-medium text-gray-300">Confidence</th>
                        <th className="px-6 py-4 text-left text-sm font-medium text-gray-300">Detected At</th>
                        <th className="px-6 py-4 text-left text-sm font-medium text-gray-300">Status</th>
                        <th className="px-6 py-4 text-left text-sm font-medium text-gray-300">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/10">
                      {detections.map((detection) => (
                        <tr key={detection.id} className="hover:bg-white/5">
                          <td className="px-6 py-4">
                            <div>
                              <div className="font-medium text-white">{detection.track_title}</div>
                              <div className="text-sm text-gray-400">{detection.artist_name}</div>
                              {detection.isrc && (
                                <div className="text-xs text-gray-500">ISRC: {detection.isrc}</div>
                              )}
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              detection.detection_source === 'local' 
                                ? 'bg-blue-100 text-blue-800' 
                                : 'bg-purple-100 text-purple-800'
                            }`}>
                              {detection.detection_source}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <span className={`font-medium ${getConfidenceColor(detection.confidence_score)}`}>
                              {(detection.confidence_score * 100).toFixed(1)}%
                            </span>
                          </td>
                          <td className="px-6 py-4 text-gray-300">
                            {new Date(detection.detected_at).toLocaleString()}
                          </td>
                          <td className="px-6 py-4">
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(detection.processing_status)}`}>
                              {detection.processing_status}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            {detection.confidence_score < 0.8 && detection.processing_status === 'completed' && (
                              <button
                                onClick={() => {
                                  setSelectedDetection(detection);
                                  setShowVerificationModal(true);
                                }}
                                className="text-blue-400 hover:text-blue-300 text-sm"
                              >
                                Verify
                              </button>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {/* Pagination */}
              {pagination.total_pages > 1 && (
                <div className="px-6 py-4 border-t border-white/10 flex items-center justify-between">
                  <div className="text-sm text-gray-400">
                    Showing page {pagination.page_number} of {pagination.total_pages}
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => loadMatchLogData(pagination.page_number - 1)}
                      disabled={!pagination.previous}
                      className="px-3 py-1 bg-white/10 text-white rounded disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Previous
                    </button>
                    <button
                      onClick={() => loadMatchLogData(pagination.page_number + 1)}
                      disabled={!pagination.next}
                      className="px-3 py-1 bg-white/10 text-white rounded disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Next
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Verification Modal */}
        {showVerificationModal && selectedDetection && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-slate-900 rounded-xl max-w-md w-full border border-white/20">
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-semibold text-white">Verify Detection</h2>
                  <button
                    onClick={() => setShowVerificationModal(false)}
                    className="text-gray-400 hover:text-white"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                <div className="space-y-4 mb-6">
                  <div>
                    <h3 className="text-white font-medium">{selectedDetection.track_title}</h3>
                    <p className="text-gray-400">{selectedDetection.artist_name}</p>
                    <p className="text-sm text-gray-500">
                      Confidence: {(selectedDetection.confidence_score * 100).toFixed(1)}%
                    </p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => handleVerifyDetection('confirm')}
                    className="flex-1 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg flex items-center justify-center"
                  >
                    <Check className="w-4 h-4 mr-2" />
                    Confirm
                  </button>
                  <button
                    onClick={() => handleVerifyDetection('reject')}
                    className="flex-1 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg flex items-center justify-center"
                  >
                    <XCircle className="w-4 h-4 mr-2" />
                    Reject
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PlaylogManagement;