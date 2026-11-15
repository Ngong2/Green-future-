// frontend/src/pages/admin/CreatePost.js
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { postService } from '../../services/api';
import { PhotoIcon, XMarkIcon } from '@heroicons/react/24/outline';
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';
import toast from 'react-hot-toast';

const CreatePost = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    excerpt: '',
    content: '',
    category: 'News',
    images: [],
    published: false,
    tags: []
  });
  const [tagInput, setTagInput] = useState('');
  const [imagePreviews, setImagePreviews] = useState([]);
  const imagePreviewsRef = useRef(imagePreviews);
  imagePreviewsRef.current = imagePreviews;

  useEffect(() => () => {
    imagePreviewsRef.current.forEach(({ url }) => URL.revokeObjectURL(url));
  }, []);

  const categories = [
    'News',
    'Events',
    'Announcements',
    'Stories',
    'Emergency Updates',
    'Resources'
  ];

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleImageChange = (e) => {
    const selectedFiles = Array.from(e.target.files || []);
    e.target.value = '';
    if (selectedFiles.length === 0) return;

    const remainingSlots = 5 - formData.images.length;
    if (selectedFiles.length > remainingSlots) {
      toast.error(`You can upload up to 5 images. ${remainingSlots} slot(s) remaining.`);
    }

    const filesToAdd = selectedFiles.slice(0, remainingSlots);
    setFormData((prev) => ({
      ...prev,
      images: [...prev.images, ...filesToAdd]
    }));
    setImagePreviews((prev) => [
      ...prev,
      ...filesToAdd.map((file) => ({ file, url: URL.createObjectURL(file) }))
    ]);
  };

  const handleRemoveImage = (indexToRemove) => {
    setImagePreviews((prev) => {
      const removedImage = prev[indexToRemove];
      if (removedImage) URL.revokeObjectURL(removedImage.url);
      return prev.filter((_, index) => index !== indexToRemove);
    });
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_, index) => index !== indexToRemove)
    }));
  };

  // ✅ Updated handleAddTag
  const handleAddTag = (e) => {
    if (e.key === 'Enter' && tagInput.trim()) {
      e.preventDefault();

      const newTag = tagInput.trim().toLowerCase();

      setFormData(prev => {
        if (!prev.tags.includes(newTag)) {
          return { ...prev, tags: [...prev.tags, newTag] };
        }
        return prev;
      });

      setTagInput('');
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  const handleSubmit = async (e, publishStatus) => {
    e.preventDefault();

    const contentText = new DOMParser().parseFromString(formData.content, 'text/html').body.textContent?.trim();
    if (!contentText) {
      toast.error('Please enter post content');
      return;
    }

    if (formData.images.length === 0) {
      toast.error('Please upload at least one image');
      return;
    }

    setLoading(true);

    const postData = {
      ...formData,
      published: publishStatus
    };

    try {
      await postService.createPost(postData);
      toast.success(publishStatus ? 'Post published successfully!' : 'Post saved as draft');
      navigate('/admin/posts');
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to create post';
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 py-8 sm:py-12">
      <div className="container-custom mx-auto max-w-5xl px-4">
        <div className="mb-8 rounded-2xl bg-linear-to-r from-green-900 to-emerald-700 px-6 py-8 text-white shadow-lg sm:px-8">
          <p className="mb-2 text-sm font-semibold uppercase tracking-[0.18em] text-green-200">Content management</p>
          <h1 className="text-3xl font-bold sm:text-4xl">Create New Post</h1>
          <p className="mt-2 max-w-2xl text-sm text-green-100 sm:text-base">
            Share an update, story, or announcement with your community.
          </p>
        </div>
        <form className="space-y-5">
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

          {/* Post Images */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
            <label htmlFor="postImages" className="mb-2 block text-sm font-semibold text-slate-800">
              Post Images * <span className="font-normal text-gray-500">(up to 5; the first image is featured)</span>
            </label>
            <div className="mt-3 rounded-2xl border-2 border-dashed border-green-200 bg-green-50/50 px-6 py-8">
              <div className="space-y-2 text-center">
                  <PhotoIcon className="mx-auto h-12 w-12 text-gray-400" />
                  <label
                    htmlFor="postImages"
                    className={`inline-block cursor-pointer rounded-md font-medium text-blue-600 hover:text-blue-500 ${
                      imagePreviews.length === 5 ? 'pointer-events-none opacity-50' : ''
                    }`}
                  >
                    {imagePreviews.length ? 'Add more images' : 'Choose images'}
                  </label>
                  <input
                    id="postImages"
                    name="postImages"
                    type="file"
                    className="sr-only"
                    onChange={handleImageChange}
                    accept="image/jpeg,image/png,image/gif,image/webp"
                    multiple
                    disabled={imagePreviews.length === 5}
                  />
                  <p className="text-xs text-gray-500">{imagePreviews.length}/5 selected · PNG, JPG, GIF, or WebP up to 5MB each</p>
              </div>
              {imagePreviews.length > 0 && (
                <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-5">
                  {imagePreviews.map(({ url }, index) => (
                    <div key={url} className="relative">
                      <img src={url} alt={`Post image ${index + 1} preview`} className="h-32 w-full rounded-lg object-cover" />
                      {index === 0 && (
                        <span className="absolute bottom-2 left-2 rounded bg-green-700 px-2 py-1 text-xs font-medium text-white">
                          Featured
                        </span>
                      )}
                      <button
                        type="button"
                        onClick={() => handleRemoveImage(index)}
                        aria-label={`Remove image ${index + 1}`}
                        className="absolute right-2 top-2 rounded-full bg-red-600 p-1 text-white hover:bg-red-700"
                      >
                        <XMarkIcon className="h-5 w-5" />
                      </button>
                    </div>
                  ))}
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
            <p className="mt-1 text-sm text-gray-500">{formData.excerpt.length}/500 characters</p>
          </div>

          {/* Content */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
            <label htmlFor="content" className="mb-2 block text-sm font-semibold text-slate-800">Content *</label>
            <ReactQuill
              theme="snow"
              value={formData.content}
              onChange={(content) => setFormData((prev) => ({ ...prev, content }))}
              className="post-content-editor"
              aria-label="Post content"
            />
          </div>

          {/* Tags */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
            <label htmlFor="tags" className="mb-2 block text-sm font-semibold text-slate-800">Tags</label>
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
              type="button"
              onClick={(e) => handleSubmit(e, false)}
              disabled={loading}
              className="rounded-xl bg-slate-700 px-6 py-3 font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading ? 'Saving...' : 'Save as Draft'}
            </button>
            <button
              type="button"
              onClick={(e) => handleSubmit(e, true)}
              disabled={loading}
              className="rounded-xl bg-green-700 px-6 py-3 font-semibold text-white shadow-sm transition hover:bg-green-800 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading ? 'Publishing...' : 'Publish Now'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreatePost;