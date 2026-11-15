import { useState, useEffect } from 'react';
import { motion as Motion } from 'framer-motion';
import { postService } from '../services/api';
import PostCard from '../components/PostCard';
import {
  MagnifyingGlassIcon,
  NewspaperIcon,
  CalendarIcon,
  MegaphoneIcon,
  SparklesIcon,
  ExclamationTriangleIcon,
  BookOpenIcon
} from '@heroicons/react/24/outline';
import toast from 'react-hot-toast';

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1
  });
  const [currentPage, setCurrentPage] = useState(1);

  const categories = [
    {
      id: 'all',
      name: 'All Posts',
      icon: NewspaperIcon,
      styles: 'bg-emerald-100 text-emerald-700 border-emerald-200'
    },
    {
      id: 'News',
      name: 'News',
      icon: SparklesIcon,
      styles: 'bg-green-100 text-green-700 border-green-200'
    },
    {
      id: 'Events',
      name: 'Events',
      icon: CalendarIcon,
      styles: 'bg-lime-100 text-lime-700 border-lime-200'
    },
    {
      id: 'Announcements',
      name: 'Announcements',
      icon: MegaphoneIcon,
      styles: 'bg-yellow-100 text-yellow-700 border-yellow-200'
    },
    {
      id: 'Stories',
      name: 'Stories',
      icon: BookOpenIcon,
      styles: 'bg-teal-100 text-teal-700 border-teal-200'
    },
    {
      id: 'Emergency Updates',
      name: 'Emergency Updates',
      icon: ExclamationTriangleIcon,
      styles: 'bg-red-100 text-red-700 border-red-200'
    }
  ];

  useEffect(() => {
    fetchPosts();
  }, [currentPage, selectedCategory]);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      setError(null);

      const params = {
        page: currentPage,
        limit: 9
      };

      if (selectedCategory !== 'all') {
        params.category = selectedCategory;
      }

      if (searchTerm) {
        params.search = searchTerm;
      }

      const response = await postService.getPublishedPosts(params);
      
      setPosts(response.data.posts || []);
      setPagination({
        currentPage: response.data.currentPage,
        totalPages: response.data.totalPages
      });

      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err) {
      console.error('Failed to fetch News & Updates:', err);
      setError('Failed to load posts');
      toast.error('Unable to load posts.');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setCurrentPage(1);
    fetchPosts();
  };

  const handleCategoryChange = (categoryId) => {
    setSelectedCategory(categoryId);
    setCurrentPage(1);
  };

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedCategory('all');
    setCurrentPage(1);
    setTimeout(() => fetchPosts(), 0);
  };

  return (
    <div className="min-h-screen bg-linear-to-b from-green-50 to-white">

      {/* HERO */}
      <section className="relative overflow-hidden py-14 text-white md:py-16">
        <div className="absolute inset-0 bg-linear-to-r from-emerald-900/90 via-green-800/85 to-emerald-700/90"></div>
        <img
          src="/images/logo.png"
          alt=""
          aria-hidden="true"
          className="pointer-events-none absolute -right-10 top-1/2 hidden h-64 w-auto -translate-y-1/2 object-contain opacity-20 md:block lg:right-12 lg:h-72"
        />

        <div className="container-custom relative z-10 px-4 text-center">
          <h1 className="mb-4 text-4xl font-bold md:text-5xl">
            News &amp; Updates
          </h1>
          <p className="mx-auto max-w-3xl text-lg text-green-100 md:text-xl">
            Discover our latest updates, stories, and announcements
          </p>
        </div>
      </section>

      {/* SEARCH + FILTER */}
      <section className="relative z-10 overflow-hidden border-b border-gray-100 bg-white py-8 shadow-sm">
        <img
          src="/images/logo.png"
          alt=""
          aria-hidden="true"
          className="pointer-events-none absolute -right-8 top-1/2 hidden h-48 w-auto -translate-y-1/2 object-contain opacity-[0.06] md:block"
        />
        <div className="container-custom px-4">
          <div className="flex flex-col lg:flex-row gap-4 justify-between">
            {/* Search */}
            <form onSubmit={handleSearch} className="relative z-10 w-full lg:w-96">
              <MagnifyingGlassIcon className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search posts..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-emerald-600 outline-none"
              />
              <button type="submit" className="hidden">Search</button>
            </form>

            {searchTerm && (
              <button
                onClick={clearFilters}
                className="px-4 py-2 text-emerald-600 hover:text-emerald-700"
              >
                Clear Filters
              </button>
            )}
          </div>

          {/* Categories */}
          <div className="relative z-10 mt-6 flex flex-wrap gap-3">
            {categories.map(category => {
              const Icon = category.icon;
              const active = selectedCategory === category.id;

              return (
                <button
                  key={category.id}
                  onClick={() => handleCategoryChange(category.id)}
                  className={`flex items-center px-4 py-2 rounded-full border transition 
                    ${active ? category.styles + ' shadow-md' : 'bg-white text-gray-700 border-gray-200 hover:bg-green-50'}
                  `}
                >
                  <Icon className="h-4 w-4 mr-2" />
                  {category.name}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* POSTS GRID */}
      <section className="py-16">
        <div className="container-custom px-4">
          {loading ? (
            <div className="text-center py-20">
              <div className="animate-spin h-14 w-14 border-4 border-emerald-200 border-t-emerald-600 rounded-full mx-auto"></div>
              <p className="mt-6 text-gray-600">Loading posts...</p>
            </div>
          ) : error ? (
            <div className="text-center text-red-600 py-20">
              {error}
            </div>
          ) : posts.length === 0 ? (
            <div className="text-center py-20">
              <h3 className="text-2xl font-bold text-gray-800">No posts found</h3>
              <button
                onClick={clearFilters}
                className="mt-6 bg-emerald-600 text-white px-6 py-3 rounded-xl"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {posts.map(post => (
                  <Motion.div
                    key={post._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <PostCard post={post} />
                  </Motion.div>
                ))}
              </div>

              {/* Pagination */}
              {pagination.totalPages > 1 && (
                <div className="flex justify-center mt-12 gap-3">
                  <button
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage(prev => prev - 1)}
                    className="px-4 py-2 border rounded-lg disabled:opacity-40 hover:bg-gray-100"
                  >
                    Previous
                  </button>

                  <span className="px-4 py-2 text-gray-700">
                    Page {currentPage} of {pagination.totalPages}
                  </span>

                  <button
                    disabled={currentPage === pagination.totalPages}
                    onClick={() => setCurrentPage(prev => prev + 1)}
                    className="px-4 py-2 border rounded-lg disabled:opacity-40 hover:bg-gray-100"
                  >
                    Next
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </div>
  );
};

export default Posts;