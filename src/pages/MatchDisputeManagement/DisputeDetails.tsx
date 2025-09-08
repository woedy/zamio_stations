import { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { baseUrl, baseUrlMedia, userToken } from '../../constants';
import { Clock, BarChart3, Calendar, Plus, MapPin } from 'lucide-react';
import Alert2 from '../../components/Alert2';
import ReviewFlagConfirmationModal from './ReviewFlagDisputeCommentModal';

export default function ReviewDetails() {
  const [loading, setLoading] = useState(false);
  const [dispute, setTrack] = useState({});

  const location = useLocation();
  const { dispute_id } = location.state || {};

  // Audio Player
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [audioUrl, setAudioUrl] = useState(null);


      // State for flag confirmation modal
      const [isModalOpen, setIsModalOpen] = useState(false);
      const [itemToReview, setItemToReview] = useState(null);

      
  const [comment, setComment] = useState("");

    
  // State for alerts
  const [alert, setAlert] = useState({ message: '', type: '' });
  const [inputError, setInputError] = useState('');
    

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const setAudioData = () => {
      setDuration(audio.duration);
    };

    const updateTime = () => {
      setCurrentTime(audio.currentTime);
    };

    audio.addEventListener('loadedmetadata', setAudioData);
    audio.addEventListener('timeupdate', updateTime);

    return () => {
      audio.removeEventListener('loadedmetadata', setAudioData);
      audio.removeEventListener('timeupdate', updateTime);
    };
  }, [audioUrl]);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
      log_play_session();
    }
    setIsPlaying(!isPlaying);
  };

  const handleRangeChange = (e) => {
    const time = e.target.value;
    audioRef.current.currentTime = time;
    setCurrentTime(time);
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60)
      .toString()
      .padStart(2, '0');
    const seconds = Math.floor(time % 60)
      .toString()
      .padStart(2, '0');
    return `${minutes}:${seconds}`;
  };



  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          baseUrl + `api/music-monitor/match-dispute-details/?dispute_id=${dispute_id}`,
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
        setTrack(data.data);

        // OPTION 1: If the file is public
        const fullAudioUrl = `${baseUrlMedia}${data.data.audio_file_mp3}`;
        setAudioUrl(fullAudioUrl);

        // OR — OPTION 2: If the file is protected and needs a token
        /*
          const audioResponse = await fetch(fullAudioUrl, {
            headers: {
              Authorization: `Token ${userToken}`,
            },
          });
    
          const audioBlob = await audioResponse.blob();
          const blobUrl = URL.createObjectURL(audioBlob);
          setAudioUrl(blobUrl);
          */
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);


  const handleReview = async (itemId) => {
    if (comment === '') {
      setInputError('Your comment is  required.');
      return;
    }


    const data = { 
      dispute_id: itemId, 
      comment: comment, 
    };

    try {
      const response = await fetch(`${baseUrl}api/music-monitor/review-match-for-dispute/`, {
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

      // Refresh the dispute details to reflect new status
      await fetchData();
      setAlert({ message: 'Dispute marked as resolved', type: 'success' });
    } catch (error) {
      console.error('Error resolving dispute:', error);
      setAlert({
        message: 'An error occurred while resolving the dispute',
        type: 'error',
      });
    } finally {
      setIsModalOpen(false);
      setItemToReview(null);
    }
  };
  
  const openReviewModal = (itemId) => {
    setItemToReview(itemId);
    setIsModalOpen(true);
  };

  const closeReviewModal = () => {
    setIsModalOpen(false);
    setItemToReview(null);
  };

  const closeAlert = () => {
    setAlert({ message: '', type: '' });
  };


  return (
    <div className="min-h-screen bg-slate-950 text-white px-6 py-10">
      <div className="max-w-6xl mx-auto space-y-10">
        {/* Header */}

        <div className="flex">
          <div className="flex items-start gap-6">
            <img
              src={`${baseUrlMedia}${dispute?.cover_art}`}
              alt={dispute.title}
              className="w-40 h-40 object-cover rounded-lg shadow-lg"
            />
            <div>
              <h1 className="text-3xl font-bold">{dispute.title}</h1>
              <p className="text-sm text-white/70">{dispute.artist_name}</p>
              <div className="mt-3 flex gap-4 text-sm text-white/80">
                <div className="flex items-center gap-1">
                  <Clock size={16} /> {dispute.duration}
                </div>
                <div className="flex items-center gap-1">
                  <Calendar size={16} /> {dispute.release_date}
                </div>
                <div className="flex items-center gap-1">
                  <BarChart3 size={16} /> {dispute.plays} plays
                </div>
              </div>

  
              {dispute?.dispute_status === 'Resolved' ? (
                <span className="mt-4 inline-block px-5 py-3 text-xs bg-green-800 text-white rounded">Resolved</span>
              ) : (
                <button className="mt-4" onClick={() => openReviewModal(dispute.id)}>
                  <span className="px-5 py-3 text-xs bg-red rounded">Review</span>
                </button>
              )}
        
            </div>
          </div>

          <div className="w-full max-w-xl mx-auto bg-gradient-to-br from-gray-800 to-gray-900 text-white rounded-xl shadow-lg p-6 flex flex-col items-center space-y-4">
            {audioUrl ? (
              <>
                <audio ref={audioRef} src={audioUrl} preload="metadata" />

                {/* Song Title (Optional) */}
                <h3 className="text-lg font-semibold text-center">
                  Now Playing
                </h3>

                {/* Play/Pause Button */}
                <button
                  onClick={togglePlay}
                  className="w-14 h-14 rounded-full bg-blue-500 hover:bg-blue-600 shadow-lg flex items-center justify-center text-white text-xl transition"
                >
                  {isPlaying ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M10 9v6m4-6v6"
                      />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  )}
                </button>

                {/* Time and Slider */}
                <div className="w-full flex flex-col space-y-2">
                  <input
                    type="range"
                    min="0"
                    max={duration}
                    value={currentTime}
                    onChange={handleRangeChange}
                    className="w-full h-1 bg-gray-600 rounded-lg appearance-none cursor-pointer accent-blue-500"
                  />
                  <div className="flex justify-between text-sm text-gray-300 font-mono">
                    <span>{formatTime(currentTime)}</span>
                    <span>{formatTime(duration)}</span>
                  </div>
                </div>
              </>
            ) : (
              <p className="text-gray-400">Loading audio...</p>
            )}
          </div>
        </div>

        {/* clip waveform */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
          <div className="bg-slate-800 p-4 rounded-lg">
            <h2 className="text-lg font-semibold mb-3">
              Clip Waveform
            </h2>
            <div className="text-sm text-white/70 h-40 flex items-center justify-center bg-slate-700 rounded"></div>
          </div>

          {/* Plays Chart */}
          <div className="bg-slate-800 p-4 rounded-lg">
            <h2 className="text-lg font-semibold mb-3">Spectrum with detected peaks</h2>
            <div className="h-40 bg-slate-700 rounded flex items-center justify-center text-sm text-white/70"></div>
          </div>
        </div>

        {/* Clip Comparism */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
          <div className="bg-slate-800 p-4 rounded-lg">
            <h2 className="text-lg font-semibold mb-3">
             Original Song Clip Spectrum
            </h2>
            <div className="text-sm text-white/70 h-40 flex items-center justify-center bg-slate-700 rounded"></div>
          </div>

          {/* Plays Chart */}
          <div className="bg-slate-800 p-4 rounded-lg">
            <h2 className="text-lg font-semibold mb-3">Spectrum with detected peaks</h2>
            <div className="h-40 bg-slate-700 rounded flex items-center justify-center text-sm text-white/70"></div>
          </div>
        </div>



        {/* Play Logs */}
        <div className="bg-slate-800 p-4 rounded-lg">
          <h2 className="text-lg font-semibold mb-3">📜 Play Logs</h2>
          <div className="divide-y divide-white/10 text-sm">
            {dispute?.playLogs?.map((log, i) => (
              <div key={i} className="py-2 flex justify-between">
                <div>
                  {new Date(log.time).toLocaleString()} –{' '}
                  <span className="font-medium">{log.station}</span>
                </div>
                <div className="text-white/60 flex items-center gap-1">
                  <MapPin size={14} /> {log.region}
                </div>
              </div>
            ))}
          </div>
        </div>


        
     {/* Render the alert */}
     <Alert2 message={alert.message} type={alert.type} onClose={closeAlert} />
   

     <ReviewFlagConfirmationModal
        isOpen={isModalOpen}
        itemId={itemToReview}
        onConfirm={handleReview}
        onCancel={closeReviewModal}
        comment={comment}
        inputError={inputError}
        setComment={setComment}
      />
      </div>
    </div>
  );
}
