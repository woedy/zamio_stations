import React, { useState } from 'react';
import Input from './Input';
import { Link } from 'react-router-dom';

const SignUp = () => {
  const [form, setForm] = useState({ name: '', email: '', password: '' });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Register form submitted', form);
    // Call your register API here
  };

  return (
    <div className="h-screen bg-gradient-to-br from-[#1a2a6c] via-[#b21f1f] to-[#fdbb2d] flex items-center justify-center">
      <div className="bg-white/10 p-8 rounded-2xl backdrop-blur-md w-full max-w-md border border-white/20 shadow-xl">
        <h2 className="text-3xl font-bold text-white text-center mb-6">🚀 Join as an Artist</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            type="text"
            name="name"
            placeholder="Full Name"
            value={form.name}
            onChange={handleChange}
          />
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
            placeholder="Create a password"
            value={form.password}
            onChange={handleChange}
          />
          <button
            type="submit"
            className="w-full bg-yellow-500 hover:bg-yellow-600 transition text-white font-semibold py-2 rounded-lg"
          >
            Register
          </button>
        </form>
        <p className="text-sm text-white mt-4 text-center">
          Already have an account?{' '}
          <Link to="/sign-in" className="underline text-yellow-200 hover:text-white">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
