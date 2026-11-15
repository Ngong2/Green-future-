import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import Navbar from './components/Navbar';
import AdminNavbar from './components/AdminNavbar';
import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute';

// Public Pages
import Home from './pages/Home';
import About from './pages/About';
import Posts from './pages/Posts';
import PostDetail from './pages/PostDetail';
import Contact from './pages/Contact';
import Donation from './pages/Donation';

// Admin Pages
import AdminLogin from './pages/admin/AdminLogin';
import AdminRegister from './pages/admin/AdminRegister';
import AdminDashboard from './pages/admin/AdminDashboard';
import CreatePost from './pages/admin/CreatePost';
import ManagePosts from './pages/admin/ManagePosts';
import EditPost from './pages/admin/EditPost';


function App() {
  const { loading, isAuthenticated } = useAuth();
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-primary-50 to-earth-50">
        <div className="text-center">
          <div className="relative w-24 h-24 mx-auto mb-4">
            <div className="absolute inset-0 border-4 border-primary-200 rounded-full"></div>
            <div className="absolute inset-0 border-4 border-primary-600 rounded-full border-t-transparent animate-spin"></div>
            <div className="absolute inset-2 bg-primary-100 rounded-full flex items-center justify-center">
              <span className="text-2xl">🌱</span>
            </div>
          </div>
          <p className="text-gray-600 animate-pulse">Loading Green Future and Sustainability Project...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      {isAdminRoute
        ? isAuthenticated && <AdminNavbar />
        : <Navbar />}
      <main className="grow">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/posts" element={<Posts />} />
          <Route path="/posts/:id" element={<PostDetail />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/donation" element={<Donation />} />
          
          {/* Admin Routes */}
          <Route path="/admin/login" element={<Navigate to="/admin" replace />} />
          <Route path="/admin/register" element={<AdminRegister />} />
          <Route path="/admin" element={
            isAuthenticated ? <AdminDashboard /> : <AdminLogin />
          } />
          <Route path="/admin/posts/create" element={
            <ProtectedRoute>
              <CreatePost />
            </ProtectedRoute>
          } />
          <Route path="/admin/posts" element={
            <ProtectedRoute>
              <ManagePosts />
            </ProtectedRoute>
          } />
          {/* Legacy admin routes - keep redirects for compatibility */}
          <Route path="/admin/create" element={<Navigate to="/admin/posts/create" replace />} />
          <Route path="/admin/manage" element={<Navigate to="/admin/posts" replace />} />
          <Route path="/admin/posts/:id/edit" element={
            <ProtectedRoute>
              <EditPost />
            </ProtectedRoute>
          } />
          
          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      {!isAdminRoute && <Footer />}
    </div>
  );
}

export default App;