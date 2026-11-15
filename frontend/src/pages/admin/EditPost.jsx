// frontend/src/pages/admin/EditPost.js
import { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { postService } from '../../services/api';
import { PhotoIcon, XMarkIcon } from '@heroicons/react/24/outline';
import toast from 'react-hot-toast';
const EditPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    excerpt: '',
    content: '',
    category: 'News',
    featuredImage: null,
    published: false,
    tags: []
  });
  const [tagInput, setTagInput] = useState('');
  const [imagePreview, setImagePreview] = useState(null);
  const [existingImage, setExistingImage] = useState(null);

  const categories = [
    'News',
    'Events',
    'Announcements',
    'Stories',
    'Emergency Updates',
    'Resources'
  ];

  useEffect(() => {
    if (location.state?.post) {
      const p = location.state.post;
      setFormData({
        title: p.title || '',
        excerpt: p.excerpt || '',
        content: p.content || '',
        category: p.category || 'News',
        published: p.published || false,
        tags: p.tags || []
      });
      setExistingImage(p.image || p.featuredImage || null);
      setLoading(false);
    } else {
      fetchPost();
    }
  }, [id]);

  const fetchPost = async () => {
    try {
      let post;

      // Prefer a dedicated API endpoint if available
      try {
        const response = await postService.getPostById(id);
        post = response.data;
      } catch (err) {
        console.warn('Could not load post directly; falling back to the admin post list.', err);
        // Fallback: fetch all posts and find the one with matching id
        const listResp = await postService.getAllPosts();
        const posts = Array.isArray(listResp.data)
          ? listResp.data
          : listResp.data?.data || listResp.data?.posts || [];
        post = posts.find(p => (p._id || p.id) === id);
      }

      if (post) {
        setFormData({
          title: post.title || '',
          excerpt: post.excerpt || '',
          content: post.content || '',
          category: post.category || 'News',
          published: post.published || false,
          tags: post.tags || []
        });
        setExistingImage(post.image || post.featuredImage || null);
      }
    } catch (error) {
      console.error('Failed to load post:', error);
      toast.error(error.response?.data?.message || 'Failed to load post');
      navigate('/admin/posts');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({
        ...formData,
        featuredImage: file
      });
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleAddTag = (e) => {
    if (e.key === 'Enter' && tagInput.trim()) {
      e.preventDefault();
      if (!formData.tags.includes(tagInput.trim())) {
        setFormData({
          ...formData,
          tags: [...formData.tags, tagInput.trim()]
        });
      }
      setTagInput('');
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    setFormData({
      ...formData,
      tags: formData.tags.filter(tag => tag !== tagToRemove)
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);

    try {
      const postData = {
        ...formData,
        tags: JSON.stringify(formData.tags)
      };
      
      await postService.updatePost(id, postData);
      toast.success('Post updated successfully!');
      navigate('/admin/posts');
    } catch (error) {
      const message = error.response?.data?.error || 'Failed to update post';
      toast.error(message);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 py-8 sm:py-12">
      <div className="container-custom mx-auto max-w-5xl px-4">
        <div className="mb-8 rounded-2xl bg-linear-to-r from-green-900 to-emerald-700 px-6 py-8 text-white shadow-lg sm:px-8">
          <p className="mb-2 text-sm font-semibold uppercase tracking-[0.18em] text-green-200">Content management</p>
          <h1 className="text-3xl font-bold sm:text-4xl">Edit Post</h1>
          <p className="mt-2 max-w-2xl text-sm text-green-100 sm:text-base">
            Update the post details, featured image, and tags.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Title */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
            <label htmlFor="title" className="mb-2 block text-sm font-semibold text-slate-800">
              Title *
            </label>
            <input
              type="text"
              id="title"
              name="title"
              required
              value={formData.title}
              onChange={handleChange}
              className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-green-600 focus:ring-4 focus:ring-green-100"
              placeholder="Enter post title"
            />
          </div>

          {/* Category */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
            <label htmlFor="category" className="mb-2 block text-sm font-semibold text-slate-800">
              Category *
            </label>
            <select
              id="category"
              name="category"
              required
              value={formData.category}
              onChange={handleChange}
              className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-green-600 focus:ring-4 focus:ring-green-100"
            >
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>

          {/* Featured Image */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
            <label className="mb-2 block text-sm font-semibold text-slate-800">
              Featured Image
            </label>
            <div className="mt-3 flex justify-center rounded-2xl border-2 border-dashed border-green-200 bg-green-50/50 px-6 py-8">
              {imagePreview || existingImage ? (
                <div className="relative">
                  <img
                    src={imagePreview || `http://localhost:5000${existingImage}`}
                    alt="Preview"
                    className="max-h-64 rounded-lg"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      setFormData({ ...formData, featuredImage: null });
                      setImagePreview(null);
                      setExistingImage(null);
                    }}
                    className="absolute top-2 right-2 p-1 bg-red-600 text-white rounded-full hover:bg-red-700"
                  >
                    <XMarkIcon className="h-5 w-5" />
                  </button>
                </div>
              ) : (
                <div className="space-y-1 text-center">
                  <PhotoIcon className="mx-auto h-12 w-12 text-gray-400" />
                  <div className="flex text-sm text-gray-600">
                    <label
                      htmlFor="featuredImage"
                      className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500"
                    >
                      <span>Upload a file</span>
                      <input
                        id="featuredImage"
                        name="featuredImage"
                        type="file"
                        className="sr-only"
                        onChange={handleImageChange}
                        accept="image/*"
                      />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs text-gray-500">
                    PNG, JPG, GIF up to 5MB
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Excerpt */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
            <label htmlFor="excerpt" className="mb-2 block text-sm font-semibold text-slate-800">
              Excerpt *
            </label>
            <textarea
              id="excerpt"
              name="excerpt"
              required
              rows="3"
              value={formData.excerpt}
              onChange={handleChange}
              className="w-full resize-y rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-green-600 focus:ring-4 focus:ring-green-100"
              placeholder="Brief summary of the post (max 500 characters)"
              maxLength="500"
            />
            <p className="mt-1 text-sm text-gray-500">
              {formData.excerpt.length}/500 characters
            </p>
          </div>

          {/* Content */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
            <label htmlFor="content" className="mb-2 block text-sm font-semibold text-slate-800">
              Content *
            </label>
            <textarea
              id="content"
              name="content"
              required
              value={formData.content}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              className="h-72 w-full resize-y rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-green-600 focus:ring-4 focus:ring-green-100"
              placeholder="Write your post content here..."
            />
          </div>

          {/* Tags */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
            <label htmlFor="tags" className="mb-2 block text-sm font-semibold text-slate-800">
              Tags
            </label>
            <input
              type="text"
              id="tags"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyDown={handleAddTag}
              className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-green-600 focus:ring-4 focus:ring-green-100"
              placeholder="Type a tag and press Enter"
            />
            
            {formData.tags.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-2">
                {formData.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-gray-100 text-gray-700"
                  >
                    #{tag}
                    <button
                      type="button"
                      onClick={() => handleRemoveTag(tag)}
                      className="ml-2 text-gray-500 hover:text-gray-700"
                    >
                      <XMarkIcon className="h-4 w-4" />
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="flex flex-col-reverse gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:flex-row sm:justify-end sm:p-5">
            <button
              type="button"
              onClick={() => navigate('/admin/posts')}
              className="rounded-xl border border-slate-300 px-6 py-3 font-semibold text-slate-700 transition hover:bg-slate-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className="rounded-xl bg-green-700 px-6 py-3 font-semibold text-white shadow-sm transition hover:bg-green-800 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {saving ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditPost;