import { useEffect, useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';

import Loader from './common/Loader';
import PageTitle from './components/PageTitle';

import DefaultLayout from './layout/DefaultLayout';

import ZamIOLandingPage from './pages/Landing/LandingPage';
import SignIn from './pages/Authentication/SignIn';
import SignUp from './pages/Authentication/SignUp';
import VerifyEmail from './pages/Authentication/VerifyEmail';
import RadioStreamMonitor from './pages/PlayGround/RadioStreamMonitor';
import AudioFileMatcher from './pages/PlayGround/AudioFileMatcher';
import StationDashboard from './pages/PlayGround/StationDashboard';
import ArtistDashboard from './pages/PlayGround/ArtistDashboard';
import TrackDetailsPage from './pages/PlayGround/TrackDetails';
import Dashboard from './pages/Dashboard/Dashboard';
import ArtistProfilePage from './pages/PlayGround/ArtistProfile';
import MatchLogViewer from './pages/MatchLogViewer/FullDetectionTable';
import AllDisputeMatches from './pages/MatchDisputeManagement/AllDisputeMatch';
import StationProfilePage from './pages/StationManagement/StationProfile';
import NotificationCenter from './pages/NotificationCenter/NotificationCenter';
import EducationSupport from './pages/Education&Support/HelpSupport';

const hiddenOnRoutes = [
  '/',
  '/sign-up',
  '/sign-in',
  '/verify-email',
  '/audio-match',
];

function App() {
  const [loading, setLoading] = useState<boolean>(true);
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  // Determine if the current route should skip the layout
  const shouldUseDefaultLayout = !hiddenOnRoutes.includes(location.pathname);

  return loading ? (
    <Loader />
  ) : shouldUseDefaultLayout ? (
    <DefaultLayout hiddenOnRoutes={hiddenOnRoutes}>
      <Routes>
        <Route
          path="/dashboard"
          element={
            <>
              <PageTitle title="Artist Dasboard | ZamIO Stations" />
              <Dashboard />
            </>
          }
        />
        <Route
          path="/match-logs"
          element={
            <>
              <PageTitle title="Artist Dasboard | ZamIO Stations" />
              <MatchLogViewer />
            </>
          }
        />
        <Route
          path="/match-disputes"
          element={
            <>
              <PageTitle title="All Match Disputes | ZamIO Stations" />
              <AllDisputeMatches />
            </>
          }
        />
        <Route
          path="/profile"
          element={
            <>
              <PageTitle title="Station Profile | ZamIO Stations" />
              <StationProfilePage />
            </>
          }
        />
        <Route
          path="/notifications"
          element={
            <>
              <PageTitle title="Notification Center | ZamIO Stations" />
              <NotificationCenter />
            </>
          }
        />
        <Route
          path="/help"
          element={
            <>
              <PageTitle title="Education & Support | ZamIO Stations" />
              <EducationSupport />
            </>
          }
        />
        <Route
          path="/radio-stream"
          element={
            <>
              <PageTitle title="Radio Stream | ZamIO Stations" />
              <RadioStreamMonitor />
            </>
          }
        />
        <Route
          path="/audio-stream"
          element={
            <>
              <PageTitle title="Audio Stream | ZamIO Stations" />
              <AudioFileMatcher />
            </>
          }
        />
        <Route
          path="/station-dashboard"
          element={
            <>
              <PageTitle title="Station Dashboard | ZamIO Stations" />
              <StationDashboard />
            </>
          }
        />
        <Route
          path="/artist-dashboard"
          element={
            <>
              <PageTitle title="Artist Dashboard | ZamIO Stations" />
              <ArtistDashboard />
            </>
          }
        />
        <Route
          path="/track-dashboard"
          element={
            <>
              <PageTitle title="Artist Dashboard | ZamIO Stations" />
              <TrackDetailsPage />
            </>
          }
        />
        <Route
          path="/artist-profile"
          element={
            <>
              <PageTitle title="Artist Dashboard | ZamIO Stations" />
              <ArtistProfilePage />
            </>
          }
        />
      </Routes>
    </DefaultLayout>
  ) : (
    <>
      <Routes>
        <Route
          index
          element={
            <>
              <PageTitle title="Home | ZamIO Stations" />
              <ZamIOLandingPage />
            </>
          }
        />

        <Route
          path="/sign-in"
          element={
            <>
              <PageTitle title="Sign In | ZamIO Stations" />
              <SignIn />
            </>
          }
        />
        <Route
          path="/sign-up"
          element={
            <>
              <PageTitle title="Sign Up | ZamIO Stations" />
              <SignUp />
            </>
          }
        />
        <Route
          path="/verify-email"
          element={
            <>
              <PageTitle title="Verify Email | ZamIO-station" />
              <VerifyEmail />
            </>
          }
        />
      </Routes>
    </>
  );
}

export default App;
