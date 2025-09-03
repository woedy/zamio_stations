import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { baseUrl, stationID } from '../../../constants';
import { getStationId } from '../../../lib/auth';
import api from '../../../lib/api';
import ButtonLoader from '../../../common/button_loader';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';

const AddStaff = () => {

  const [staff, setStaff] = useState<Array<{ name: string; email: string; role: string }>>([
    { name: '', email: '', role: '' },
  ]);



  const [inputError, setInputError] = useState('');
  const [loading, setLoading] = useState(false);



  const navigate = useNavigate();

    const handleSubmit = async (e) => {
      e.preventDefault();
    
      // Clear any previous error
      setInputError('');
    
      // Frontend validations
      const cleaned = staff
        .map((s) => ({ name: s.name.trim(), email: (s.email || '').trim(), role: s.role.trim() }))
        .filter((s) => s.name && s.role);
      if (cleaned.length === 0) {
        setInputError('Please add at least one staff with a role.');
        return;
      }

    
      const url = 'api/accounts/complete-add-staff/';
    
      try {
        setLoading(true);
        const resp = await api.post(url, { station_id: getStationId(), staff: cleaned });
        let nextStep = resp.data?.data?.next_step as string | undefined;
        if (!nextStep || nextStep === 'staff') {
          nextStep = 'report';
        }
    
        switch (nextStep) {
          case 'profile':
            navigate('/onboarding/profile');
            break;
          case 'staff':
            navigate('/onboarding/staff');
            break;
          case 'report':
            navigate('/onboarding/payment');
            break;
          case 'payment':
            navigate('/onboarding/payment');
            break;
          case 'done':
            navigate('/dashboard');
            window.location.reload();
            break;
          default:
            navigate('/dashboard'); // fallback
            window.location.reload();
        }
    
      } catch (error) {
        console.error('Error updating profile:', error.message);
        setInputError('An unexpected error occurred.');
      } finally {
        setLoading(false);
      }
    };





  return (
    <div className="h-screen bg-gradient-to-br from-[#1a2a6c] via-[#b21f1f] to-[#fdbb2d] flex items-center justify-center">



      <div className="w-full max-w-2xl px-6">
        <h2 className="text-5xl font-bold text-white text-center mb-8">
          ZamIO
        </h2>


        {inputError && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-3">
            <strong className="font-bold">Error!</strong>
            <span className="block sm:inline"> {inputError}</span>
          </div>
        )}

        <div className="bg-white/10 p-10 rounded-2xl backdrop-blur-md w-full border border-white/20 shadow-xl">
          <h2 className="text-4xl font-bold text-white text-center mb-4">
            🎧 Add Staff
          </h2>
          <p className=" text-white text-center mb-8">
          Add staff members (optional): Invite DJs, managers</p>


          <form onSubmit={handleSubmit} className="space-y-6">
         
            {staff.map((row, idx) => (
              <div key={idx} className="grid grid-cols-3 gap-2">
                <input
                  type="text"
                  placeholder="Full Name"
                  value={row.name}
                  onChange={(e) => {
                    const c = [...staff];
                    c[idx].name = e.target.value;
                    setStaff(c);
                  }}
                  className="w-full px-4 py-3 bg-white/20 backdrop-blur-md border mb-2 border-white/30 rounded-lg text-white placeholder-white focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                <input
                  type="email"
                  placeholder="Email (optional)"
                  value={row.email}
                  onChange={(e) => {
                    const c = [...staff];
                    c[idx].email = e.target.value;
                    setStaff(c);
                  }}
                  className="w-full px-4 py-3 bg-white/20 backdrop-blur-md border mb-2 border-white/30 rounded-lg text-white placeholder-white focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                <select
                  value={row.role}
                  onChange={(e) => {
                    const c = [...staff];
                    c[idx].role = e.target.value;
                    setStaff(c);
                  }}
                  className="w-full px-4 py-3 bg-white/20 backdrop-blur-md border mb-2 border-white/30 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
                >
                  <option value="" className="bg-[#1a2a6c]">Select Role</option>
                  <option value="Producer" className="bg-[#1a2a6c]">Producer</option>
                  <option value="Presenter" className="bg-[#1a2a6c]">Presenter</option>
                  <option value="Dj" className="bg-[#1a2a6c]">Dj</option>
                </select>
              </div>
            ))}
            <div>
              <button
                type="button"
                onClick={() => setStaff((s) => [...s, { name: '', email: '', role: '' }])}
                className="px-4 py-2 bg-white/20 text-white rounded-lg border border-white/30 hover:bg-white/25"
              >
                + Add another
              </button>
            </div>
     

            {/* Submit Button */}
            {loading ? (
              <ButtonLoader />
            ) : (
              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 transition text-white font-semibold py-4 rounded-lg mt-6 "
              >
                Update staff
              </button>
            )}
          </form>

          {/* Link to Register */}
          <p className=" text-white mt-6 text-center">
            <button
              className="underline text-white hover:text-blue-200"
              onClick={async (e) => {
                e.preventDefault();
                try {
                  await api.post('api/accounts/skip-station-onboarding/', {
                    station_id: getStationId(),
                    step: 'payment',
                  });
                } catch {}
                navigate('/onboarding/payment');
              }}
            >
              Skip
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AddStaff;
