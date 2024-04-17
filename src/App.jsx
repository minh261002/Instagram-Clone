import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import HomePage from "./pages/HomePage/HomePage";
import AuthPage from './pages/AuthPage/AuthPage';
import PageLayout from './Layouts/PageLayout/PageLayout';
import ProfilePage from './pages/ProfilePage/ProfilePage';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from './firebase/firebase';

function App() {
  const [authUser] = useAuthState(auth);

  return (

    <Router>
      <PageLayout>
        <Routes>
          <Route path="/" element={authUser ? <HomePage /> : <Navigate to='/auth' />} />
          <Route path="/auth" element={!authUser ? <AuthPage /> : <Navigate to='/' />} />
          <Route path="/:username" element={<ProfilePage />} />
          <Route path="*" element={<div>404 Not Found</div>} />
        </Routes>
      </PageLayout>
    </Router>
  );
}

export default App;
