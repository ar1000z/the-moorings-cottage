import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { useEffect } from 'react';
import { usePageTracking } from './hooks/useAnalytics';
import Header from './components/Header';
import Footer from './components/Footer';
import WhatsAppWidget from './components/WhatsAppWidget';
import Home from './pages/Home';
import Cottage from './pages/Cottage';
import Gallery from './pages/Gallery';
import Booking from './pages/Booking';
import Review from './pages/Review';
import Area from './pages/Area';
import Terms from './pages/Terms';
import Contact from './pages/Contact';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';
import './App.css';
import { PostHogProvider } from './providers/PostHogProvider';
import Banner from './components/Banner';

// Analytics wrapper component
const AnalyticsWrapper = ({ children }) => {
  usePageTracking();
  return children;
};

// Scroll to top on route change
const ScrollToTop = () => {
  const { pathname } = useLocation();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  
  return null;
};

function App() {
  return (
    <HelmetProvider>
      <Router>
        <PostHogProvider>
          <AnalyticsWrapper>
            <ScrollToTop />
            <div className="App">
              <Header />
              <main>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/cottage" element={<Cottage />} />
                  <Route path="/gallery" element={<Gallery />} />
                  <Route path="/booking" element={<Booking />} />
                  <Route path="/review" element={<Review />} />
                  <Route path="/area" element={<Area />} />
                  <Route path="/terms" element={<Terms />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/blog" element={<Blog />} />
                  <Route path="/blog/:slug" element={<BlogPost />} />
                </Routes>
              </main>
              <Banner />
              <Footer />
              {/* WhatsApp contact widget — visible on every page */}
              <WhatsAppWidget />
            </div>
          </AnalyticsWrapper>
        </PostHogProvider>
      </Router>
    </HelmetProvider>
  );
}

export default App;
