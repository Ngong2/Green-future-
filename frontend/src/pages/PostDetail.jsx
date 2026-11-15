import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { postService } from '../services/api';
import { format } from 'date-fns';
import { 
  CalendarIcon, 
  UserIcon, 
  EyeIcon, 
  ArrowLeftIcon,
  ShareIcon 
} from '@heroicons/react/24/outline';
import toast from 'react-hot-toast';
import { API_ORIGIN } from '../services/api';

const PostDetail = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchPost();
  }, [id]);

  const fetchPost = async () => {
    try {
      setLoading(true);
      const response = await postService.getPostById(id);
      setPost(response.data);
    } catch (err) {
      setError('Post not found');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success('Link copied to clipboard!');
  };

  const getCategoryColor = (category) => {
    const colors = {
      'News': 'bg-green-100 text-green-800',
      'Events': 'bg-lime-100 text-lime-800',
      'Announcements': 'bg-yellow-100 text-yellow-800',
      'Stories': 'bg-purple-100 text-purple-800',
      'Emergency Updates': 'bg-red-100 text-red-800',
      'Resources': 'bg-indigo-100 text-indigo-800',
    };
    return colors[category] || 'bg-green-100 text-green-800';
  };

  const postImages = post
    ? [...new Set([...(post.images || []), post.image].filter(Boolean))]
    : [];
  const featuredImage = postImages[0];

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="container-custom py-16 text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Post Not Found</h1>
        <p className="text-gray-600 mb-8">
          The post you're looking for doesn't exist or has been removed.
        </p>
        <Link to="/posts" className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700">
          Back to Posts
        </Link>
      </div>
    );
  }

  return (
    <article className="min-h-screen">
      {/* HERO IMAGE */}
      <div className="relative min-h-72 overflow-hidden md:min-h-80">
        <img
          src={featuredImage ? `${API_ORIGIN}${featuredImage}` : 'https://via.placeholder.com/1200x600?text=No+Image'}
          alt={post.title}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50"></div>
        <img
          src="/images/logo.png"
          alt=""
          aria-hidden="true"
          className="pointer-events-none absolute right-4 top-1/2 h-36 w-auto -translate-y-1/2 object-contain opacity-20 sm:right-10 sm:h-48 md:right-16 md:h-56"
        />

        {/* TITLE OVERLAY */}
        <div className="relative z-10 container-custom pt-20 pb-6 text-white sm:pt-24 sm:pb-8">
          <div className="max-w-4xl">
            <span className={`mb-4 inline-block rounded-full px-3 py-1 text-sm font-semibold ${getCategoryColor(post.category)}`}>
              {post.category}
            </span>

            <h1 className="mb-4 break-words text-2xl font-bold sm:text-3xl md:text-4xl lg:text-5xl">
              {post.title}
            </h1>

            <div className="flex flex-wrap items-center gap-3 text-sm sm:gap-4">
              <div className="flex items-center">
                <CalendarIcon className="mr-2 h-5 w-5 shrink-0" />
                <span>{format(new Date(post.publishedAt || post.createdAt), 'MMMM dd, yyyy')}</span>
              </div>

              <div className="flex items-center">
                <UserIcon className="mr-2 h-5 w-5 shrink-0" />
                <span>{post.author?.name || 'Admin'}</span>
              </div>

              <div className="flex items-center">
                <EyeIcon className="mr-2 h-5 w-5 shrink-0" />
                <span>{post.views} views</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CONTENT */}
      <div className="container-custom py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* MAIN CONTENT */}
          <div className="lg:col-span-3">
            {/* Excerpt */}
            {post.excerpt && (
              <div className="bg-green-50 p-6 rounded-lg mb-8">
                <p className="text-xl text-gray-700 italic leading-relaxed">
                  {post.excerpt}
                </p>
              </div>
            )}

            {/* Post Body */}
            <div className="prose prose-lg max-w-none">
              <div dangerouslySetInnerHTML={{ __html: post.content }} />
            </div>

            {postImages.length > 1 && (
              <div className="mt-10">
                <h2 className="mb-4 text-2xl font-bold text-gray-900">More Images</h2>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  {postImages.slice(1).map((image, index) => (
                    <img
                      key={image}
                      src={`${API_ORIGIN}${image}`}
                      alt={`${post.title} image ${index + 2}`}
                      className="h-64 w-full rounded-lg object-cover"
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Tags */}
            {post.tags?.length > 0 && (
              <div className="mt-8 pt-8 border-t">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Tags:</h3>
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* SIDEBAR */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              {/* Share */}
              <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Share this post
                </h3>
                <button
                  onClick={handleShare}
                  className="w-full flex items-center justify-center space-x-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition"
                >
                  <ShareIcon className="h-5 w-5" />
                  <span>Copy Link</span>
                </button>
              </div>

              {/* Back */}
              <div className="bg-white p-6 rounded-lg shadow">
                <Link
                  to="/posts"
                  className="flex items-center justify-center space-x-2 text-gray-600 hover:text-green-600 transition"
                >
                  <ArrowLeftIcon className="h-5 w-5" />
                  <span>Back to Posts</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
};

export default PostDetail;