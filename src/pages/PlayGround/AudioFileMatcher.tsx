import React, { useState } from 'react';
import { Upload, CheckCircle, AlertCircle, Music } from 'lucide-react';
import { baseUrl, userToken } from '../../constants';

const AudioFileMatcher = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [matchResult, setMatchResult] = useState(null);
  const [status, setStatus] = useState('idle'); // idle | uploading | matched | no_match | error
  const [error, setError] = useState('');

  const [stationId, setStationId] = useState("ST-4354435-ON"); // default or select input


  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
    setMatchResult(null);
    setError('');
    setStatus('idle');
  };

  const handleUpload = async (e) => {
    e.preventDefault();

    if (!selectedFile) {
      setError('Please select an MP3 file to upload');
      return;
    }

    setStatus('uploading');
    setError('');
    setMatchResult(null);

    const formData = new FormData();
    formData.append('file', selectedFile);
    formData.append('station_id', stationId);


    try {
      const response = await fetch(`${baseUrl}api/music-monitor/stream/upload/`, {
        method: 'POST',
        body: formData,
        headers: {
          Authorization: `Token ${userToken}`,
        },
      });

      const data = await response.json();

      if (response.ok) {
        if (data.match) {
          setMatchResult(data);
          setStatus('matched');
        } else {
          setStatus('no_match');
        }
      } else {
        setStatus('error');
        setError(data.error || 'Server error');
      }
    } catch (err) {
      setStatus('error');
      setError('Network error: ' + err.message);
    }
  };
  

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white dark:bg-boxdark rounded-lg shadow-lg mt-10">
      <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
        <Music className="w-6 h-6" />
        MP3 File Matcher
      </h2>

      <form onSubmit={handleUpload} className="flex flex-col sm:flex-row gap-4 items-center mb-6">
        <input
          type="file"
          accept=".mp3,audio/mpeg"
          onChange={handleFileChange}
          className="flex-1 border border-gray-300 rounded-lg px-4 py-2"
        />
        <button
          type="submit"
          disabled={status === 'uploading'}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 flex items-center gap-2"
        >
          <Upload className="w-4 h-4" />
          {status === 'uploading' ? 'Uploading...' : 'Upload & Match'}
        </button>
      </form>

      {error && (
        <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg flex items-center gap-2">
          <AlertCircle className="w-4 h-4" />
          {error}
        </div>
      )}

      {status === 'matched' && matchResult && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <h4 className="font-semibold text-gray-800">{matchResult.track_title}</h4>
              </div>
              <p className="text-sm text-gray-600 mb-1">
                Artist: {matchResult.artist_name}
              </p>
              <p className="text-sm text-gray-600 mb-1">
                Album: {matchResult.album_title || 'Unknown'}
              </p>
            </div>
            <div className="text-right">
              <div className="text-sm font-medium text-green-600">
                {matchResult.confidence?.toFixed(1)}% match
              </div>
              <div className="text-xs text-gray-500">
                {matchResult.hashes_matched} hashes matched
              </div>
            </div>
          </div>
        </div>
      )}

      {status === 'no_match' && (
        <div className="p-4 bg-yellow-50 border border-yellow-200 text-yellow-700 rounded-lg">
          No match was found for the uploaded file.
        </div>
      )}
    </div>
  );
};

export default AudioFileMatcher;
