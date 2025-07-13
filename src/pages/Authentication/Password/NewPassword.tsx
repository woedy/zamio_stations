import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { baseUrl } from '../../../constants';
import ButtonLoader from '../../../common/button_loader';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';

const NewPassword = () => {
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');

  const [inputError, setInputError] = useState('');
  const [loading, setLoading] = useState(false);

  
  const location = useLocation();
  const [showPassword, setShowPassword] = useState(false);
  const email = location.state?.email;


  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Clear any previous error
    setInputError('');

    if (password === '') {
      setInputError('Passwords required.');
      return;
    }

    if (password2 === '') {
      setInputError('Password2 required.');
      return;
    }

    if (password !== password2) {
      setInputError('Passwords do not match');
      return;
    }

    if (!validatePassword(password)) {
      setInputError(
        'Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one digit, and one special character',
      );
      return;
    }

    // Create FormData object
    const formData = new FormData();
    formData.append('email', email);
    formData.append('new_password', password);
    formData.append('new_password2', password2);

    // Make a POST request to the server
    const url = baseUrl + 'api/accounts/new-password-reset/';

    try {
      setLoading(true);
      const response = await fetch(url, {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        // Display the first error message from the errors object
        if (data.errors) {
          const errorMessages = Object.values(data.errors).flat();
          setInputError(errorMessages.join('\n'));
        } else {
          setInputError(data.message || 'Failed to reset password');
        }
        return; // Prevent further code execution
      }

      // Registration successful
      console.log('Password reset successfully');

      navigate('/sign-in', {
        state: {
          successMessage: 'Password reset successfully! You can now log in.',
        },
      });
    } catch (error) {
      console.error('Error registering user:', error.message);
      setInputError('Failed to reset password');
    } finally {
      setLoading(false);
    }
  };

  const validatePassword = (password) => {
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[-!@#\$%^&*_()-+=/.,<>?"~`£{}|:;])[A-Za-z\d-!@#\$%^&*_()-+=/.,<>?"~`£{}|:;]{8,}$/;
    return passwordRegex.test(password);
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
          <h2 className="text-4xl font-bold text-white text-center mb-8">
            New Password
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="">
              <div className="relative w-full">
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  placeholder="New Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-6 py-4 pr-12 mb-3 bg-white/20 backdrop-blur-md border border-white/30 rounded-lg text-white placeholder-white  focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-6 top-1/2 transform -translate-y-1/2 text-white"
                  tabIndex={-1}
                >
                  {showPassword ? (
                    <EyeSlashIcon className="w-6 h-6" />
                  ) : (
                    <EyeIcon className="w-6 h-6" />
                  )}
                </button>
              </div>

              <div className="relative w-full">
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password2"
                  placeholder="Confirm Password"
                  value={password2}
                  onChange={(e) => setPassword2(e.target.value)}
                  className="w-full px-6 py-4 pr-12 bg-white/20 backdrop-blur-md border border-white/30 rounded-lg text-white placeholder-white  focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-6 top-1/2 transform -translate-y-1/2 text-white"
                  tabIndex={-1}
                >
                  {showPassword ? (
                    <EyeSlashIcon className="w-6 h-6" />
                  ) : (
                    <EyeIcon className="w-6 h-6" />
                  )}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            {loading ? (
              <ButtonLoader />
            ) : (
              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 transition text-white font-semibold py-4 rounded-lg mt-6 "
              >
                Reset Password
              </button>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default NewPassword;
