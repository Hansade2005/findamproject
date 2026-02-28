import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { seedIfEmpty } from './services/db';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import MobileBottomNav from './components/MobileBottomNav';
import Home from './pages/Home';
import Browse from './pages/Browse';
import ProjectDetail from './pages/ProjectDetail';
import PostProject from './pages/PostProject';
import Profile from './pages/Profile';
import Login from './pages/Login';
import Signup from './pages/Signup';
import About from './pages/About';
import Contact from './pages/Contact';
import Messages from './pages/Messages';
import Blog from './pages/Blog';
import Pricing from './pages/Pricing';
import Terms from './pages/Terms';
import Privacy from './pages/Privacy';
import Feedback from './pages/Feedback';
import SafetyPolicy from './pages/SafetyPolicy';

function AppContent() {
  useEffect(() => {
    seedIfEmpty();
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-gray-950">
      <Navbar />
      <main className="flex-1 pb-16 md:pb-0">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/browse" element={<Browse />} />
          <Route path="/project/:id" element={<ProjectDetail />} />
          <Route path="/post" element={<PostProject />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/messages" element={<Messages />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/feedback" element={<Feedback />} />
          <Route path="/safety" element={<SafetyPolicy />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      <Footer />
      <MobileBottomNav />
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </BrowserRouter>
  );
}
