import { useState, useEffect, useCallback } from 'react';
import { Activity, Eye, Logs, Search } from 'lucide-react';
import { stationID, baseUrl, userToken } from '../../constants';
import Alert2 from '../../components/Alert2';
import FlagConfirmationModal from './FlagDisputeCommentModal';

const MatchLogViewer = () => {
  const [activeTab, setActiveTab] = useState('playlogs');
  const [selectedPeriod, setSelectedPeriod] = useState('monthly');

  const [search, setSearch] = useState('');

  // Playlogs state
  const [playLogs, setPlayLogs] = useState([]);
  const [playPage, setPlayPage] = useState(1);
  const [playTotalPages, setPlayTotalPages] = useState(1);

  // Matchlogs state
  const [matchLogs, setMatchLogs] = useState([]);
  const [matchPage, setMatchPage] = useState(1);
  const [matchTotalPages, setMatchTotalPages] = useState(1);

  const [comment, setComment] = useState("");

    // State for flag confirmation modal
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [itemToFlag, setItemToFlag] = useState(null);
  

  const [loading, setLoading] = useState(false);

  
  // State for alerts
  const [alert, setAlert] = useState({ message: '', type: '' });
  const [inputError, setInputError] = useState('');


  const fetchLogs = useCallback(async () => {
    setLoading(true);
    const currentPage = activeTab === 'playlogs' ? playPage : matchPage;
    const logPageState = activeTab === 'playlogs' ? 'playlog' : 'matchlog';

    try {
      const response = await fetch(
        `${baseUrl}api/stations/playlogs/?search=${encodeURIComponent(
          search,
        )}&station_id=${stationID}&page=${currentPage}&log_page_state=${logPageState}`,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Token ${userToken}`,
          },
        },
      );

      const result = await response.json();

      if (!response.ok) {
        console.error('API Error:', result);
        return;
      }

      const data = result?.data || {};

      if (activeTab === 'playlogs') {
        setPlayLogs(Array.isArray(data.playLogs?.results) ? data.playLogs.results : []);
        setPlayTotalPages(data.playLogs?.pagination?.total_pages || 1);
      } else {
        setMatchLogs(Array.isArray(data.matchLogs?.results) ? data.matchLogs.results : []);
        setMatchTotalPages(data.matchLogs?.pagination?.total_pages || 1);
      }
      
    } catch (error) {
      console.error('Error fetching logs:', error);
    } finally {
      setLoading(false);
    }
  }, [search, playPage, matchPage, activeTab]);

  useEffect(() => {
    fetchLogs();
  }, [fetchLogs]);

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

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    // Optionally reset pagination per tab
    if (tab === 'playlogs') setPlayPage(1);
    else setMatchPage(1);
  };

  const currentLogs = activeTab === 'playlogs' ? playLogs : matchLogs;
  const currentPage = activeTab === 'playlogs' ? playPage : matchPage;
  const totalPages =
    activeTab === 'playlogs' ? playTotalPages : matchTotalPages;
  const setPage = activeTab === 'playlogs' ? setPlayPage : setMatchPage;



  const handleFlag = async (itemId) => {
    if (comment === '') {
      setInputError('Your comment is  required.');
      return;
    }


    const data = { 
      playlog_id: itemId, 
      comment: comment, 
    };

    try {
      const response = await fetch(`${baseUrl}api/music-monitor/flag-playlog/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Token ${userToken}`,
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Failed to flag the item');
      }

      // Refresh the data after deletion
      await fetchLogs();
      setAlert({ message: 'Item flagd successfully', type: 'success' });
    } catch (error) {
      console.error('Error deleting item:', error);
      setAlert({
        message: 'An error occurred while deleting the item',
        type: 'error',
      });
    } finally {
      setIsModalOpen(false);
      setItemToFlag(null);
    }
  };
  
  const openFlagModal = (itemId) => {
    setItemToFlag(itemId);
    setIsModalOpen(true);
  };

  const closeFlagModal = () => {
    setIsModalOpen(false);
    setItemToFlag(null);
  };

  const closeAlert = () => {
    setAlert({ message: '', type: '' });
  };





  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-950 text-white">
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
            <div className="relative">
              <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search..."
                className="bg-white/10 text-white pl-10 pr-4 py-2 rounded-lg border border-white/20"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-8xl mx-auto px-6 py-8">
        {/* Tabs */}
        <div className="flex justify-between">
          <div className="flex space-x-2 mb-8 bg-white/10 p-1 rounded-lg border border-white/20 w-fit">
            <TabButton
              id="playlogs"
              label="Play Logs"
              icon={Activity}
              isActive={activeTab === 'playlogs'}
              onClick={handleTabChange}
            />
            <TabButton
              id="matchlogs"
              label="Match Logs"
              icon={Eye}
              isActive={activeTab === 'matchlogs'}
              onClick={handleTabChange}
            />
          </div>
        </div>

        {/* Tab Content */}
        <div className="bg-white/10 rounded-2xl p-6 border border-white/20">
          <h2 className="text-xl font-bold text-white mb-6 flex items-center">
            <Activity className="w-5 h-5 mr-2 text-blue-400" />
            {activeTab === 'playlogs'
              ? 'Detailed Play Logs'
              : 'Detailed Match Logs'}
          </h2>

          <div className="overflow-auto rounded-xl">
            <table className="min-w-full text-sm text-left text-gray-300">
              <thead className="text-xs uppercase bg-white/5 text-gray-400">
                <tr>
                  <th className="px-4 py-3">Song</th>
                  <th className="px-4 py-3">Station</th>
                  <th className="px-4 py-3">Matched at</th>
                  {activeTab === 'playlogs' ? (
                    <>
                      <th className="px-4 py-3">End Date & Time</th>
                      <th className="px-4 py-3">Duration</th>
                      <th className="px-4 py-3">Avg. Confidence</th>
                      <th className="px-4 py-3">Earnings</th>
                      <th className="px-4 py-3">Status</th>
                      <th className="px-4 py-3">Action</th>
                    </>
                  ) : (
                    <th className="px-4 py-3">Confidence</th>
                  )}
                </tr>
              </thead>
              <tbody className="bg-white/5 divide-y divide-white/10">
                {Array.isArray(currentLogs) && currentLogs.length > 0 ? (
                  currentLogs.map((log) => (
                    <tr key={log.id}>
                      <td className="px-4 py-2 text-white">
                        {log.track_title || log.song}
                      </td>
                      <td className="px-4 py-2">
                        {log.artist_name || log.station}
                      </td>
                      <td className="px-4 py-2">
                      {log.matched_at
                              ? `${log.matched_at}`
                              : `${log.start_time}`}
                      </td>
                      {activeTab === 'playlogs' ? (
                        <>
                          <td className="px-4 py-2">{log.stop_time || '-'}</td>
                          <td className="px-4 py-2">{log.duration || '-'}</td>
                          <td className="px-4 py-2">
                            {log.avg_confidence_score ? `${log.avg_confidence_score}%` : '-'}
                          </td>
                          <td className="px-4 py-2 text-green-400 font-medium">
                            {log.royalty_amount
                              ? `₵${log.royalty_amount}`
                              : '₵0.00'}
                          </td>
                          <td className="px-4 py-2">
                            <span
                              className={`px-2 py-1 rounded text-xs font-semibold ${
                                log.status === 'Resolved'
                                  ? 'bg-green-800 text-green-100'
                                  : log.status === 'Flagged'
                                  ? 'bg-red-800 text-red-100'
                                  : 'bg-gray-700 text-gray-200'
                              }`}
                            >
                              {log.status || '—'}
                            </span>
                          </td>
                          <td className="px-4 py-2">

                            <button className='px-3 py-1 bg-red-800 rounded'
                           onClick={() => openFlagModal(log.id)} 
                            >Flag</button>
                          
                          </td>
                        </>
                      ) : (
                        <td className="px-4 py-2">
                          {log.avg_confidence_score ? `${log.avg_confidence_score}%` : '-'}
                        </td>
                      )}
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={activeTab === 'playlogs' ? 8 : 4}
                      className="text-center text-white py-6"
                    >
                      No logs found for this view.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex justify-end mt-4 space-x-2">
            <button
              disabled={currentPage <= 1}
              onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
              className="bg-white/10 text-white px-4 py-2 rounded disabled:opacity-40"
            >
              Prev
            </button>
            <span className="text-white px-2">{`Page ${currentPage} of ${totalPages}`}</span>
            <button
              disabled={currentPage >= totalPages}
              onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
              className="bg-white/10 text-white px-4 py-2 rounded disabled:opacity-40"
            >
              Next
            </button>
          </div>
        </div>
      </div>


     {/* Render the alert */}
     <Alert2 message={alert.message} type={alert.type} onClose={closeAlert} />
   
   
     <FlagConfirmationModal
        isOpen={isModalOpen}
        itemId={itemToFlag}
        onConfirm={handleFlag}
        onCancel={closeFlagModal}
        comment={comment}
        inputError={inputError}
        setComment={setComment}
      />
    </div>
  );
};

export default MatchLogViewer;
