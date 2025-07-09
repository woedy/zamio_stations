import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Input from './Input';

const SignIn = () => {
  const [form, setForm] = useState({ email: '', password: '' });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Login form submitted', form);
    // Call your login API here
  };

  return (
    <div className="h-screen bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] flex items-center justify-center">
            <div>
            
              <h2 className="text-4xl font-bold text-white text-center mb-6">ZamIO</h2>

      <div className="bg-white/10 p-8 rounded-2xl backdrop-blur-md w-full max-w-md border border-white/20 shadow-xl">
        <h2 className="text-3xl font-bold text-white text-center mb-6">🎧 Artist Login</h2>
        <form className="space-y-4">
          <Input
            type="email"
            name="email"
            placeholder="Email address"
            value={form.email}
            onChange={handleChange}
          />
          <Input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
          />

          <Link to={'/dashboard'}>
          <button
            type="submit"
            
            className="w-full bg-blue-600 hover:bg-blue-700 transition text-white font-semibold py-2 rounded-lg mt-3"
          >
            Login
          </button>
          </Link>
        </form>
        <p className="text-sm text-white mt-4 text-center">
          Don’t have an account?{' '}
          <Link to="/sign-up" className="underline text-blue-400 hover:text-blue-200">
            Register here
          </Link>
        </p>
      </div>
      </div>

    </div>
  );
};

export default SignIn;
