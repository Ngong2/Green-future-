import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { motion } from 'framer-motion';
import { Leaf, Mail, Lock, User, Key } from 'lucide-react';

const AdminRegister = () => {
  const navigate = useNavigate();
  const { register } = useAuth();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const result = await register(formData);

    if (result.success) {
      navigate('/admin');
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-green-900 to-green-700 px-4">
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md rounded-2xl bg-white/10 p-6 shadow-2xl backdrop-blur-xl sm:p-8"
      >
        <div className="text-center mb-6">
          <Leaf className="mx-auto text-green-400 w-12 h-12" />
          <h2 className="text-2xl font-bold text-white mt-3">
            Create Account
          </h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input icon={User} name="name" placeholder="Full Name" onChange={handleChange} />
          <Input icon={Mail} name="email" type="email" placeholder="Email" onChange={handleChange} />
          <Input icon={Lock} name="password" type="password" placeholder="Password" onChange={handleChange} />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-semibold transition disabled:opacity-50"
          >
            {loading ? 'Creating...' : 'Register'}
          </button>
        </form>

        <p className="text-center text-gray-300 text-sm mt-5">
          Already have an account?{' '}
          <Link to="/admin" className="text-green-400 hover:underline">
            Admin Login
          </Link>
        </p>
      </motion.div>
    </div>
  );
};

const Input = ({ icon: Icon, ...props }) => (
  <div className="relative">
    <Icon className="absolute left-3 top-3.5 text-gray-400 w-5 h-5" />
    <input
      {...props}
      required
      className="w-full pl-10 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-green-500 outline-none"
    />
  </div>
);

export default AdminRegister;