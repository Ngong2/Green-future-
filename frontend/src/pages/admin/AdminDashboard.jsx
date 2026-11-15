// frontend/src/pages/admin/AdminDashboard.jsx
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { postService } from '../../services/api';
import { 
  DocumentTextIcon, 
  PencilSquareIcon, 
  EyeIcon,
  ChartBarIcon,
  UsersIcon,
  ClockIcon
} from '@heroicons/react/24/outline';
import { format } from 'date-fns';
// Use the single shared Navbar component instead of AdminNavbar

const AdminDashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    totalPosts: 0,
    publishedPosts: 0,
    draftPosts: 0,
    totalViews: 0
  });
  const [recentPosts, setRecentPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const response = await postService.getAllPosts();
      const posts = Array.isArray(response.data)
        ? response.data
        : response.data?.data || response.data?.posts || [];
      
      const published = posts.filter(p => p.published).length;
      const totalViews = posts.reduce((sum, p) => sum + (p.views || 0), 0);
      
      setStats({
        totalPosts: posts.length,
        publishedPosts: published,
        draftPosts: posts.length - published,
        totalViews
      });
      
      setRecentPosts(posts.slice(0, 5));
    } catch (error) {
      console.error('Failed to fetch dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const StatCard = ({ icon: Icon, title, value, color }) => (
    <div className="card p-6">
      <div className="flex items-center">
        <div className={`p-3 rounded-full ${color} bg-opacity-10`}>
          <Icon className={`h-6 w-6 ${color}`} />
        </div>
        <div className="ml-4">
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-semibold text-gray-900">{value}</p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container-custom py-6 sm:py-8">
        {/* Welcome Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
            Welcome back, {user?.name}!
          </h1>
          <p className="mt-1 text-sm text-gray-600 sm:text-base">
            Here's what's happening with your posts today.
          </p>
        </div>

        {/* Quick Actions */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h2>
          <div className="flex flex-wrap gap-4">
            <Link
              to="/admin/posts/create"
              className="inline-flex items-center justify-center rounded-lg bg-blue-600 px-4 py-3 text-center text-sm font-medium text-white transition hover:bg-blue-700 sm:py-2 sm:text-base"
            >
              <PencilSquareIcon className="h-5 w-5 mr-2" />
              Create New Post
            </Link>
            <Link
              to="/admin/posts"
              className="inline-flex items-center justify-center rounded-lg bg-gray-600 px-4 py-3 text-center text-sm font-medium text-white transition hover:bg-gray-700 sm:py-2 sm:text-base"
            >
              <DocumentTextIcon className="h-5 w-5 mr-2" />
              Manage Posts
            </Link>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 sm:gap-6">
          <StatCard
            icon={DocumentTextIcon}
            title="Total Posts"
            value={stats.totalPosts}
            color="text-blue-600"
          />
          <StatCard
            icon={EyeIcon}
            title="Published"
            value={stats.publishedPosts}
            color="text-green-600"
          />
          <StatCard
            icon={ClockIcon}
            title="Drafts"
            value={stats.draftPosts}
            color="text-yellow-600"
          />
          <StatCard
            icon={ChartBarIcon}
            title="Total Views"
            value={stats.totalViews}
            color="text-purple-600"
          />
        </div>

        {/* Recent Posts */}
        <div className="card p-4 sm:p-6">
          <h2 className="mb-4 text-lg font-semibold text-gray-900 sm:text-xl">Recent Posts</h2>
          
          {loading ? (
            <div className="flex justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            </div>
          ) : recentPosts.length === 0 ? (
            <p className="text-center text-gray-500 py-8">No posts yet. Create your first post!</p>
          ) : (
            <div className="overflow-x-auto overscroll-x-contain">
              <table className="min-w-[42rem] divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Title
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Category
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Views
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {recentPosts.map((post) => (
                    <tr key={post._id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {post.title}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          post.category === 'Emergency Updates' ? 'bg-red-100 text-red-800' :
                          post.category === 'News' ? 'bg-blue-100 text-blue-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {post.category}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          post.published ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {post.published ? 'Published' : 'Draft'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {format(new Date(post.createdAt), 'MMM dd, yyyy')}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {post.views || 0}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;