import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { motion } from 'framer-motion';
import { Leaf } from 'lucide-react';

const AdminLogin = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const result = await login(formData.email, formData.password);

    if (result.success) {
      navigate('/admin');
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-green-900 to-green-700 py-12 px-4">
      {/* Background Glow */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-yellow-400 rounded-full blur-3xl opacity-20"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-green-400 rounded-full blur-3xl opacity-20"></div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 w-full max-w-md space-y-6 rounded-2xl bg-white/10 p-6 shadow-2xl backdrop-blur-lg sm:space-y-8 sm:p-10"
      >
        {/* Header */}
        <div className="text-center">
          <div className="flex justify-center">
            <Leaf className="h-16 w-16 text-green-400" />
          </div>
          <h2 className="mt-6 text-3xl font-bold text-white">
            Admin Login
          </h2>
          <p className="text-gray-300 text-sm">
            Sign in to manage your posts
          </p>
        </div>

        {/* Form */}
        <form className="space-y-5" onSubmit={handleSubmit}>
          <div>
            <input
              type="email"
              name="email"
              required
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg bg-white/10 text-white placeholder-gray-300 border border-gray-300/20 focus:ring-2 focus:ring-green-500 outline-none"
            />
          </div>

          <div>
            <input
              type="password"
              name="password"
              required
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg bg-white/10 text-white placeholder-gray-300 border border-gray-300/20 focus:ring-2 focus:ring-green-500 outline-none"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-lg bg-linear-to-r from-green-600 to-green-700 text-white font-semibold hover:scale-105 transition disabled:opacity-50"
          >
            {loading ? 'Signing in...' : 'Admin Login'}
          </button>

          <p className="text-center text-gray-300 text-sm">
            Don't have an account?{' '}
            <Link to="/admin/register" className="text-green-400 hover:underline">
              Register here
            </Link>
          </p>
        </form>
      </motion.div>
    </div>
  );
};

export default AdminLogin;