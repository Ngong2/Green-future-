import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import { CalendarIcon, UserIcon, EyeIcon } from '@heroicons/react/24/outline';
import { API_ORIGIN } from '../services/api';

const PostCard = ({ post }) => {
  const getCategoryColor = (category) => {
    const colors = {
      'News': 'bg-blue-100 text-blue-800',
      'Events': 'bg-green-100 text-green-800',
      'Announcements': 'bg-purple-100 text-purple-800',
      'Stories': 'bg-yellow-100 text-yellow-800',
      'Emergency Updates': 'bg-red-100 text-red-800',
      'Resources': 'bg-indigo-100 text-indigo-800',
    };
    return colors[category] || 'bg-gray-100 text-gray-800';
  };

  return (
    <article className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition">
      <Link to={`/posts/${post._id}`}>
        <img
          src={post.image ? `${API_ORIGIN}${post.image}` : 'https://via.placeholder.com/600x400?text=No+Image'}
          alt={post.title}
          className="w-full h-48 object-cover"
        />
        
        <div className="p-6">
          <div className="flex items-center justify-between mb-3">
            <span className={`px-3 py-1 text-xs font-semibold rounded-full ${getCategoryColor(post.category)}`}>
              {post.category}
            </span>
            <span className="text-xs text-gray-500">
              {post.published ? 'Published' : 'Draft'}
            </span>
          </div>

          <h2 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2">
            {post.title}
          </h2>

          <p className="text-gray-600 mb-4 line-clamp-3">
            {post.excerpt}
          </p>

          <div className="flex items-center justify-between text-sm text-gray-500">
            <div className="flex items-center space-x-4">
              <span className="flex items-center">
                <CalendarIcon className="h-4 w-4 mr-1" />
                {format(new Date(post.createdAt), 'MMM dd, yyyy')}
              </span>
              <span className="flex items-center">
                <UserIcon className="h-4 w-4 mr-1" />
                {post.author?.name || 'Admin'}
              </span>
            </div>
            <span className="flex items-center">
              <EyeIcon className="h-4 w-4 mr-1" />
              {post.views || 0}
            </span>
          </div>
        </div>
      </Link>
    </article>
  );
};

export default PostCard;