import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from "./pages/HomePage/HomePage";
import AuthPage from './pages/AuthPage/AuthPage';
import PageLayout from './Layouts/PageLayout/PageLayout';

function App() {

  return (
    <Router>
      <PageLayout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/auth" element={<AuthPage />} />
        </Routes>
      </PageLayout>
    </Router>
  );
}

export default App;
