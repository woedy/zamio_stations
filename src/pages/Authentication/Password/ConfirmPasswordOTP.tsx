import React, { useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { baseUrl } from '../../../constants';
import ButtonLoader from '../../../common/button_loader';

const ConfirmPasswordOTP = () => {
  const [otp, setOtp] = useState(['', '', '', '']);
  const [inputError, setInputError] = useState('');
  const [loading, setLoading] = useState(false);

  const location = useLocation();
  const email = location.state?.email;

  const navigate = useNavigate();

  const handleChange = (value, index) => {
    if (value.length > 1) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 3) {
      document.getElementById(`otp-${index + 1}`).focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const code = otp.join('');

    if (code.length !== 4 || otp.includes('')) {
      setInputError('Please enter a valid 4-digit code.');
      return;
    }

    setInputError('');
    setLoading(true);

    try {
      const response = await fetch(
        baseUrl + 'api/accounts/confirm-password-otp/',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email: email,
            otp_code: code,
          }),
        },
      );

      const data = await response.json();

      if (!response.ok) {
        // Display the first error message from the errors object
        if (data.errors) {
          const errorMessages = Object.values(data.errors).flat();
          setInputError(errorMessages.join('\n'));
        } else {
          setInputError(data.message || 'Failed to Verify');
        }
        return; // Prevent further code execution
      }

      // Success

      navigate('/new-password-reset', { state: { email } });

    } catch (err) {
      setInputError('Verification error. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  const handleResend = async (e) => {
    e.preventDefault();

    setInputError('');
    setLoading(true);

    try {
      const response = await fetch(
        baseUrl + 'api/accounts/resend-password-otp/',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email: email,
          }),
        },
      );

      const data = await response.json();

      if (!response.ok) {
        // Display the first error message from the errors object
        if (data.errors) {
          const errorMessages = Object.values(data.errors).flat();
          setInputError(errorMessages.join('\n'));
        } else {
          setInputError(data.message || 'Failed to Resend OTP');
        }
        return; // Prevent further code execution
      }

      // Success
      navigate('/confirm-password-otp', { state: { email } });
    } catch (err) {
      setInputError('Verification error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen bg-gradient-to-br from-[#1a2a6c] via-[#b21f1f] to-[#fdbb2d] flex items-center justify-center">
      <div className="w-full max-w-md px-6">
        <h2 className="text-5xl font-bold text-white text-center mb-8">
          Password OTP
        </h2>

        {inputError && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            <strong className="font-bold">Error!</strong>
            <span className="block sm:inline"> {inputError}</span>
          </div>
        )}

        <div className="bg-white/10 p-8 rounded-2xl backdrop-blur-md w-full border border-white/20 shadow-xl">
          <p className="text-white text-center mb-6">
            Please enter the 4-digit code sent to your email.
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex justify-between gap-3">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  id={`otp-${index}`}
                  type="text"
                  inputMode="numeric"
                  maxLength="1"
                  value={digit}
                  onChange={(e) => handleChange(e.target.value, index)}
                  className="w-16 h-16 text-center text-2xl text-white bg-white/20 border border-white/30 rounded-lg backdrop-blur-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              ))}
            </div>

            {loading ? (
              <ButtonLoader />
            ) : (
              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 rounded-lg transition"
              >
                Verify
              </button>
            )}
          </form>

          <p className="text-white mt-6 text-center">
            Didn't receive a code?{' '}
            {loading ? (
              <ButtonLoader />
            ) : (
              <button
                onClick={handleResend}
                className="underline text-blue-400 hover:text-blue-200"
              >
                Resend
              </button>
            )}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ConfirmPasswordOTP;
