import { useState } from 'react';
import {
  Music,
  Radio,
  Tv,
  PieChart,
  Award,
  BarChart3,
  Globe,
  Play,
} from 'lucide-react';


import cover from '../../images/cover/cover.png';

export default function ZamIOLandingPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary to-indigo-900 text-white">
      {/* Navigation */}
      <nav className="container mx-auto px-4 py-6">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <Music className="h-8 w-8 text-indigo-400" />
            <span className="ml-2 text-2xl font-bold">ZamIO</span>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-white focus:outline-none"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8">
            <a href="#features" className="hover:text-indigo-300 transition">
              Features
            </a>
            <a
              href="#how-it-works"
              className="hover:text-indigo-300 transition"
            >
              How It Works
            </a>
            <a
              href="#testimonials"
              className="hover:text-indigo-300 transition"
            >
              Testimonials
            </a>
            <a href="#pricing" className="hover:text-indigo-300 transition">
              Pricing
            </a>
          </div>

          <div className="hidden md:block">
            <a
              href="/sign-in"
              className="px-4 py-2 mr-2 border border-indigo-400 rounded-lg hover:bg-indigo-900 transition"
            >
              Login
            </a>
            <a
              href="/sign-up"
              className="px-4 py-2 bg-indigo-500 rounded-lg hover:bg-indigo-600 transition"
            >
              Sign Up
            </a>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 flex flex-col space-y-4 bg-indigo-900 p-4 rounded-lg">
            <a href="#features" className="hover:text-indigo-300 transition">
              Features
            </a>
            <a
              href="#how-it-works"
              className="hover:text-indigo-300 transition"
            >
              How It Works
            </a>
            <a
              href="#testimonials"
              className="hover:text-indigo-300 transition"
            >
              Testimonials
            </a>
            <a href="#pricing" className="hover:text-indigo-300 transition">
              Pricing
            </a>
            <div className="flex flex-col space-y-2 pt-2 border-t border-indigo-800">
              <a
                href="/login"
                className="px-4 py-2 text-center border border-indigo-400 rounded-lg hover:bg-indigo-900 transition"
              >
                Login
              </a>
              <a
                href="/signup"
                className="px-4 py-2 text-center bg-indigo-500 rounded-lg hover:bg-indigo-600 transition"
              >
                Sign Up
              </a>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 md:py-24">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-8 md:mb-0">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Collect Your Music Royalties{' '}
              <span className="text-indigo-400">Effortlessly</span>
            </h1>
            <p className="text-lg md:text-xl mb-8 text-gray">
              Ghana's first comprehensive platform that monitors radio and TV
              stations nationwide to ensure you get paid for every play of your
              music.
            </p>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <a
                href="/signup"
                className="px-6 py-3 bg-indigo-500 text-center rounded-lg hover:bg-indigo-600 transition text-lg"
              >
                Start Tracking Now
              </a>
              <a
                href="#how-it-works"
                className="px-6 py-3 border border-indigo-400 text-center rounded-lg hover:bg-indigo-900 transition text-lg"
              >
                Learn More
              </a>
            </div>
          </div>
          <div className="md:w-1/2 flex justify-center">
            <div className="relative w-full max-w-md">
              <div className="absolute inset-0 bg-indigo-500 rounded-full filter blur-3xl opacity-20"></div>
              <img
                src={cover}
                alt="Dashboard Preview"
                className="relative rounded-lg shadow-2xl border border-indigo-800"
              />
              <div className="absolute -bottom-4 -right-4 bg-indigo-500 rounded-full p-4 shadow-lg">
                <Play className="h-8 w-8" />
              </div>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="bg-indigo-900/50 p-6 rounded-lg text-center border border-indigo-800/50">
            <p className="text-4xl font-bold mb-2">100+</p>
            <p className="text-gray-300">Radio Stations</p>
          </div>
          <div className="bg-indigo-900/50 p-6 rounded-lg text-center border border-indigo-800/50">
            <p className="text-4xl font-bold mb-2">50+</p>
            <p className="text-gray-300">TV Channels</p>
          </div>
          <div className="bg-indigo-900/50 p-6 rounded-lg text-center border border-indigo-800/50">
            <p className="text-4xl font-bold mb-2">1500+</p>
            <p className="text-gray-300">Artists</p>
          </div>
          <div className="bg-indigo-900/50 p-6 rounded-lg text-center border border-indigo-800/50">
            <p className="text-4xl font-bold mb-2">₵5M+</p>
            <p className="text-gray-300">Royalties Paid</p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="bg-indigo-900/30 py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Powerful Features for Ghanaian Artists
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              ZamIO provides everything you need to track, collect, and manage
              your music royalties across Ghana.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-indigo-950/50 p-8 rounded-lg border border-indigo-800/50 hover:border-indigo-500 transition">
              <div className="bg-indigo-500/20 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-6">
                <Radio className="h-7 w-7 text-indigo-400" />
              </div>
              <h3 className="text-xl font-bold mb-3">24/7 Radio Monitoring</h3>
              <p className="text-gray-300">
                Our system continuously monitors all major radio stations across
                Ghana to detect when your music is played.
              </p>
            </div>

            <div className="bg-indigo-950/50 p-8 rounded-lg border border-indigo-800/50 hover:border-indigo-500 transition">
              <div className="bg-indigo-500/20 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-6">
                <Tv className="h-7 w-7 text-indigo-400" />
              </div>
              <h3 className="text-xl font-bold mb-3">TV Airplay Tracking</h3>
              <p className="text-gray-300">
                Track your music videos, performances and features across all
                major TV stations in Ghana.
              </p>
            </div>

            <div className="bg-indigo-950/50 p-8 rounded-lg border border-indigo-800/50 hover:border-indigo-500 transition">
              <div className="bg-indigo-500/20 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-6">
                <PieChart className="h-7 w-7 text-indigo-400" />
              </div>
              <h3 className="text-xl font-bold mb-3">Real-time Analytics</h3>
              <p className="text-gray-300">
                Get detailed insights about when and where your music is getting
                airplay with our intuitive dashboard.
              </p>
            </div>

            <div className="bg-indigo-950/50 p-8 rounded-lg border border-indigo-800/50 hover:border-indigo-500 transition">
              <div className="bg-indigo-500/20 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-6">
                <Award className="h-7 w-7 text-indigo-400" />
              </div>
              <h3 className="text-xl font-bold mb-3">Royalty Collection</h3>
              <p className="text-gray-300">
                We handle the entire royalty collection process, ensuring you
                get paid for every play of your music.
              </p>
            </div>

            <div className="bg-indigo-950/50 p-8 rounded-lg border border-indigo-800/50 hover:border-indigo-500 transition">
              <div className="bg-indigo-500/20 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-6">
                <BarChart3 className="h-7 w-7 text-indigo-400" />
              </div>
              <h3 className="text-xl font-bold mb-3">Trend Reports</h3>
              <p className="text-gray-300">
                Understand how your music is performing over time and across
                different regions of Ghana.
              </p>
            </div>

            <div className="bg-indigo-950/50 p-8 rounded-lg border border-indigo-800/50 hover:border-indigo-500 transition">
              <div className="bg-indigo-500/20 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-6">
                <Globe className="h-7 w-7 text-indigo-400" />
              </div>
              <h3 className="text-xl font-bold mb-3">Nationwide Coverage</h3>
              <p className="text-gray-300">
                Our extensive network covers all 16 regions of Ghana, from Accra
                to Tamale and beyond.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section
        id="how-it-works"
        className="container mx-auto px-4 py-16 md:py-24"
      >
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            How ZamIO Works
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Getting started with ZamIO is simple. Follow these easy steps to
            start collecting your radio and TV royalties.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <div className="text-center">
            <div className="w-16 h-16 rounded-full bg-indigo-500 flex items-center justify-center mx-auto mb-6 text-2xl font-bold">
              1
            </div>
            <h3 className="text-xl font-bold mb-3">Register Your Music</h3>
            <p className="text-gray-300">
              Create an account and upload your music catalog with all the
              necessary metadata for accurate tracking.
            </p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 rounded-full bg-indigo-500 flex items-center justify-center mx-auto mb-6 text-2xl font-bold">
              2
            </div>
            <h3 className="text-xl font-bold mb-3">We Track Your Plays</h3>
            <p className="text-gray-300">
              Our system automatically monitors radio and TV stations across
              Ghana to detect when your music is played.
            </p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 rounded-full bg-indigo-500 flex items-center justify-center mx-auto mb-6 text-2xl font-bold">
              3
            </div>
            <h3 className="text-xl font-bold mb-3">Get Paid</h3>
            <p className="text-gray-300">
              Receive monthly payments directly to your mobile money or bank
              account based on your airplay data.
            </p>
          </div>
        </div>

        <div className="mt-16 flex justify-center">
          <a
            href="/signup"
            className="px-8 py-4 bg-indigo-500 rounded-lg hover:bg-indigo-600 transition text-lg font-medium"
          >
            Start Collecting Your Royalties
          </a>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="bg-indigo-900/30 py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              What Artists Say About ZamIO
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Join hundreds of Ghanaian artists who are already collecting their
              royalties with ZamIO.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-indigo-950/50 p-8 rounded-lg border border-indigo-800/50">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 rounded-full bg-indigo-700 mr-4"></div>
                <div>
                  <h4 className="font-bold">Kwame Johnson</h4>
                  <p className="text-indigo-400">Highlife Artist</p>
                </div>
              </div>
              <p className="text-gray-300">
                "Since joining ZamIO, I've seen a 300% increase in my royalty
                income. I finally know exactly when and where my music is being
                played."
              </p>
            </div>

            <div className="bg-indigo-950/50 p-8 rounded-lg border border-indigo-800/50">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 rounded-full bg-indigo-700 mr-4"></div>
                <div>
                  <h4 className="font-bold">Ama Serwaa</h4>
                  <p className="text-indigo-400">Gospel Singer</p>
                </div>
              </div>
              <p className="text-gray-300">
                "ZamIO has transformed how I collect royalties. The dashboard
                makes it easy to see which stations are playing my music the
                most."
              </p>
            </div>

            <div className="bg-indigo-950/50 p-8 rounded-lg border border-indigo-800/50">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 rounded-full bg-indigo-700 mr-4"></div>
                <div>
                  <h4 className="font-bold">Kofi Beats</h4>
                  <p className="text-indigo-400">Producer & Artist</p>
                </div>
              </div>
              <p className="text-gray-300">
                "As both a producer and artist, ZamIO has been invaluable in
                tracking my work across multiple stations and ensuring I get
                paid."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing
      <section id="pricing" className="container mx-auto px-4 py-16 md:py-24">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Simple, Transparent Pricing
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Choose the plan that works best for you and your music career.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <div className="bg-indigo-950/50 p-8 rounded-lg border border-indigo-800/50 hover:border-indigo-500 transition">
            <h3 className="text-xl font-bold mb-2">Starter</h3>
            <p className="text-gray-400 mb-6">For emerging artists</p>
            <p className="text-4xl font-bold mb-6">
              ₵99<span className="text-xl text-gray-400">/month</span>
            </p>
            <ul className="space-y-3 mb-8">
              <li className="flex items-center">
                <svg
                  className="h-5 w-5 text-green-500 mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                Track up to 5 songs
              </li>
              <li className="flex items-center">
                <svg
                  className="h-5 w-5 text-green-500 mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                Radio monitoring
              </li>
              <li className="flex items-center">
                <svg
                  className="h-5 w-5 text-green-500 mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                Basic analytics
              </li>
              <li className="flex items-center">
                <svg
                  className="h-5 w-5 text-green-500 mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                Monthly payments
              </li>
            </ul>
            <a
              href="/signup"
              className="block text-center px-6 py-3 border border-indigo-500 rounded-lg hover:bg-indigo-900 transition"
            >
              Get Started
            </a>
          </div>

          <div className="bg-indigo-900 p-8 rounded-lg border-2 border-indigo-500 shadow-lg transform md:-translate-y-4">
            <div className="bg-indigo-500 text-white text-sm font-bold py-1 px-3 rounded-full inline-block mb-2">
              MOST POPULAR
            </div>
            <h3 className="text-xl font-bold mb-2">Professional</h3>
            <p className="text-gray-400 mb-6">For established artists</p>
            <p className="text-4xl font-bold mb-6">
              ₵249<span className="text-xl text-gray-400">/month</span>
            </p>
            <ul className="space-y-3 mb-8">
              <li className="flex items-center">
                <svg
                  className="h-5 w-5 text-green-500 mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                Track up to 20 songs
              </li>
              <li className="flex items-center">
                <svg
                  className="h-5 w-5 text-green-500 mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                Radio & TV monitoring
              </li>
              <li className="flex items-center">
                <svg
                  className="h-5 w-5 text-green-500 mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                Advanced analytics
              </li>
              <li className="flex items-center">
                <svg
                  className="h-5 w-5 text-green-500 mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                Bi-weekly payments
              </li>
              <li className="flex items-center">
                <svg
                  className="h-5 w-5 text-green-500 mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                Regional play reports
              </li>
            </ul>
            <a
              href="/signup"
              className="block text-center px-6 py-3 bg-indigo-500 rounded-lg hover:bg-indigo-600 transition"
            >
              Get Started
            </a>
          </div>

          <div className="bg-indigo-950/50 p-8 rounded-lg border border-indigo-800/50 hover:border-indigo-500 transition">
            <h3 className="text-xl font-bold mb-2">Label</h3>
            <p className="text-gray-400 mb-6">For music labels</p>
            <p className="text-4xl font-bold mb-6">
              ₵999<span className="text-xl text-gray-400">/month</span>
            </p>
            <ul className="space-y-3 mb-8">
              <li className="flex items-center">
                <svg
                  className="h-5 w-5 text-green-500 mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                Track unlimited songs
              </li>
              <li className="flex items-center">
                <svg
                  className="h-5 w-5 text-green-500 mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                Full media monitoring
              </li>
              <li className="flex items-center">
                <svg
                  className="h-5 w-5 text-green-500 mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                Enterprise analytics
              </li>
              <li className="flex items-center">
                <svg
                  className="h-5 w-5 text-green-500 mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                Weekly payments
              </li>
              <li className="flex items-center">
                <svg
                  className="h-5 w-5 text-green-500 mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                API access
              </li>
            </ul>
            <a
              href="/signup"
              className="block text-center px-6 py-3 border border-indigo-500 rounded-lg hover:bg-indigo-900 transition"
            >
              Contact Sales
            </a>
          </div>
        </div>
      </section>
 */}
 
      {/* CTA */}
      <section className="container mx-auto px-4 py-16">
        <div className="bg-gradient-to-r from-indigo-800 to-indigo-600 rounded-xl p-8 md:p-12 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Get Your Fair Share?
          </h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Join Ghana's leading music royalty collection platform and never
            miss out on your earnings again.
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <a
              href="/signup"
              className="px-8 py-4 bg-white text-indigo-900 font-medium rounded-lg hover:bg-gray-100 transition text-lg"
            >
              Sign Up Now
            </a>
            <a
              href="/contact"
              className="px-8 py-4 border border-white rounded-lg hover:bg-indigo-700 transition text-lg"
            >
              Contact Us
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-indigo-950 py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center mb-4">
                <Music className="h-6 w-6 text-indigo-400" />
                <span className="ml-2 text-xl font-bold">ZamIO</span>
              </div>
              <p className="text-gray-400 mb-4">
                Ghana's premier music royalty collection platform for radio and
                TV airplay.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-white">
                  <svg
                    className="h-6 w-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
