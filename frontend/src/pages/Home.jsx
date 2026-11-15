import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  TreePine, 
  Users, 
  Globe, 
  Heart, 
  Leaf, 
  Droplets, 
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Sprout,
  Award,
  Sun,
  BookOpen
} from 'lucide-react';
import PostCard from '../components/PostCard';
import { postService } from '../services/api';
import toast from 'react-hot-toast';

const Home = () => {
  const [featuredPosts, setFeaturedPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentHeroIndex, setCurrentHeroIndex] = useState(0);
  const [stats, setStats] = useState({
    trees: 15000,
    volunteers: 500,
    acres: 25,
    families: 2000
  });

  // Hero Images
  const heroImages = [
    {
      url: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
      title: "Greening the Desert",
      subtitle: "One Tree at a Time",
      description: "Transforming Kakuma Refugee Camp through reforestation and hope"
    },
    {
      url: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
      title: "Growing Hope",
      subtitle: "Building a Sustainable Future",
      description: "Empowering communities through environmental action"
    },
    {
      url: "https://images.unsplash.com/photo-1476231682828-37e571bc172f?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
      title: "Community-Led Change",
      subtitle: "Together We Thrive",
      description: "Refugees and host communities working hand in hand"
    },
    {
      url: "https://images.unsplash.com/photo-1426604966848-d7adac402bff?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
      title: "Climate Action",
      subtitle: "Local Solutions, Global Impact",
      description: "Combating climate change from the ground up"
    }
  ];

  // Impact Cards Data
  const impactCards = [
    {
      icon: <TreePine className="w-12 h-12" />,
      number: "15,000+",
      label: "Trees Planted",
      color: "from-green-500 to-green-700",
      description: "Native species restoring biodiversity"
    },
    {
      icon: <Users className="w-12 h-12" />,
      number: "500+",
      label: "Active Volunteers",
      color: "from-blue-500 to-blue-700",
      description: "Community members leading change"
    },
    {
      icon: <Globe className="w-12 h-12" />,
      number: "25",
      label: "Acres Restored",
      color: "from-amber-600 to-amber-800",
      description: "Land transformed into green spaces"
    },
    {
      icon: <Heart className="w-12 h-12" />,
      number: "2,000+",
      label: "Families Impacted",
      color: "from-red-500 to-red-700",
      description: "Direct beneficiaries of our programs"
    }
  ];

  // Flip Cards Data - Updated with English text from user
  const flipCards = [
    {
      frontImage: "https://images.unsplash.com/photo-1523349312806-f5dde0a01c32?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      frontTitle: "Tree Planting",
      backTitle: "Reforestation Initiative",
      backDescription: "We plant drought-resistant native trees that provide shade, improve soil quality, and create sustainable ecosystems in the camp.",
      backIcon: <Sprout className="w-16 h-16" />,
      stats: "10,000+ Trees",
      buttonText: "Learn More"
    },
    {
      frontImage: "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      frontTitle: "Environmental Education",
      backTitle: "Learning for Sustainability",
      backDescription: "Teaching children and adults about environmental conservation, sustainable practices, and the importance of trees.",
      backIcon: <BookOpen className="w-16 h-16" />,
      stats: "1,500+ Students",
      buttonText: "Learn More"
    },
    {
      frontImage: "https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      frontTitle: "Community Gardens",
      backTitle: "Food Security",
      backDescription: "Establishing community gardens that provide fresh produce, nutrition, and income for refugee families.",
      backIcon: <Sun className="w-16 h-16" />,
      stats: "50+ Gardens",
      buttonText: "Learn More"
    },
    {
      frontImage: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      frontTitle: "Nursery Development",
      backTitle: "Growing Future Forests",
      backDescription: "Operating tree nurseries that grow thousands of seedlings annually for ongoing reforestation efforts.",
      backIcon: <Droplets className="w-16 h-16" />,
      stats: "5 Nurseries",
      buttonText: "Learn More"
    }
  ];

  useEffect(() => {
    fetchFeaturedPosts();
    // Simulate growing stats animation
    const interval = setInterval(() => {
      setStats(prev => ({
        trees: prev.trees + Math.floor(Math.random() * 10),
        volunteers: prev.volunteers + Math.floor(Math.random() * 2),
        acres: prev.acres + 0.1,
        families: prev.families + Math.floor(Math.random() * 5)
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentHeroIndex((prev) => (prev + 1) % heroImages.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  const fetchFeaturedPosts = async () => {
    try {
      setLoading(true);
      const response = await postService.getPublishedPosts({ limit: 3 });
      const posts = response.data?.posts || response.data?.data || response.data || [];
      setFeaturedPosts(posts);
    } catch (err) {
      toast.error('Failed to load posts');
    } finally {
      setLoading(false);
    }
  };

  const nextSlide = () => {
    setCurrentHeroIndex((prev) => (prev + 1) % heroImages.length);
  };

  const prevSlide = () => {
    setCurrentHeroIndex((prev) => (prev === 0 ? heroImages.length - 1 : prev - 1));
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-[42rem] h-[100svh] max-h-[56rem] overflow-hidden sm:min-h-[48rem]">
        {/* Background Images */}
        {heroImages && heroImages.length > 0 && heroImages.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentHeroIndex ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <img
              src={image.url}
              alt={image.title}
              className="w-full h-full object-cover"
            />
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-linear-to-r from-green-900/95 via-green-800/80 to-transparent"></div>
          </div>
        ))}

        {/* Hero Content */}
        <div className="absolute inset-0 flex items-center">
          <div className="container-custom mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              key={currentHeroIndex}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="max-w-4xl"
            >
              {/* Animated Badge */}
              {/* Main Title */}
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="mb-5 break-words text-4xl font-bold leading-tight text-white sm:text-5xl md:mb-6 md:text-6xl lg:text-7xl"
              >
                <span className="bg-linear-to-r from-green-400 to-yellow-400 bg-clip-text text-transparent">
                  Green Future
                </span>
                <br />
                <span className="text-white/95">Sustainability Initiative</span>
              </motion.h1>

              {/* Subtitle */}
              <motion.h2
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="mb-4 text-2xl font-light text-white sm:text-3xl md:text-4xl"
              >
                {heroImages[currentHeroIndex].title}
              </motion.h2>

              {/* Description */}
              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="mb-7 max-w-2xl text-base text-gray-200 sm:mb-10 sm:text-xl"
              >
                {heroImages[currentHeroIndex].description}
              </motion.p>

              {/* CTA Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.0 }}
                className="flex flex-wrap gap-4"
              >
                <Link
                  to="/about"
                  className="group bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-lg font-semibold transition-all transform hover:scale-105 shadow-2xl hover:shadow-green-500/30 flex items-center"
                >
                  Get Involved
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-2 transition-transform" />
                </Link>
                <Link
                  to="/donation"
                  className="group bg-white/10 backdrop-blur-md hover:bg-white/20 border-2 border-white text-white px-8 py-4 rounded-lg font-semibold transition-all transform hover:scale-105 flex items-center"
                >
                  Donate Now
                  <Heart className="ml-2 w-5 h-5 group-hover:scale-110 transition-transform" />
                </Link>
              </motion.div>

              {/* Live Stats Strip */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2 }}
                className="mt-8 grid max-w-3xl grid-cols-2 gap-2 sm:mt-12 sm:gap-4 md:grid-cols-4"
              >
                <div className="rounded-lg border border-white/20 bg-white/10 p-2 text-center backdrop-blur-md sm:p-4">
                  <div className="text-xl font-bold text-green-400 sm:text-3xl">{stats.trees.toLocaleString()}</div>
                  <div className="text-xs text-gray-200 sm:text-sm">Trees Planted</div>
                </div>
                <div className="rounded-lg border border-white/20 bg-white/10 p-2 text-center backdrop-blur-md sm:p-4">
                  <div className="text-xl font-bold text-green-400 sm:text-3xl">{stats.volunteers}+</div>
                  <div className="text-xs text-gray-200 sm:text-sm">Volunteers</div>
                </div>
                <div className="rounded-lg border border-white/20 bg-white/10 p-2 text-center backdrop-blur-md sm:p-4">
                  <div className="text-xl font-bold text-green-400 sm:text-3xl">{stats.acres.toFixed(1)}</div>
                  <div className="text-xs text-gray-200 sm:text-sm">Acres Restored</div>
                </div>
                <div className="rounded-lg border border-white/20 bg-white/10 p-2 text-center backdrop-blur-md sm:p-4">
                  <div className="text-xl font-bold text-green-400 sm:text-3xl">{stats.families.toLocaleString()}</div>
                  <div className="text-xs text-gray-200 sm:text-sm">Families Impacted</div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={prevSlide}
          className="absolute left-2 top-1/2 z-20 hidden -translate-y-1/2 rounded-full border border-white/20 bg-black/30 p-2 text-white backdrop-blur-sm transition-all hover:bg-black/50 sm:left-6 sm:block sm:p-3"
          aria-label="Previous slide"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-2 top-1/2 z-20 hidden -translate-y-1/2 rounded-full border border-white/20 bg-black/30 p-2 text-white backdrop-blur-sm transition-all hover:bg-black/50 sm:right-6 sm:block sm:p-3"
          aria-label="Next slide"
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        {/* Slide Indicators */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex space-x-3">
          {heroImages && heroImages.length > 0 && heroImages.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentHeroIndex(index)}
              className={`h-2 rounded-full transition-all ${
                index === currentHeroIndex ? 'w-10 bg-green-400' : 'w-2 bg-white/50 hover:bg-white/80'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        {/* Floating Leaves Animation */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[...Array(5)].map((_, i) => (
            <Leaf
              key={i}
              className="absolute text-white/10 w-12 h-12 animate-float"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${i * 0.5}s`,
                animationDuration: `${6 + i}s`,
              }}
            />
          ))}
        </div>
      </section>

      {/* Impact Stats Section */}
      <section className="py-20 bg-linear-to-b from-gray-50 to-white">
        <div className="container-custom mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-green-600 font-semibold tracking-wider uppercase"
            >
              Our Impact
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-4xl md:text-5xl font-bold text-gray-900 mt-4 mb-6"
            >
              Making a Difference, <span className="bg-linear-to-r from-green-600 to-amber-600 bg-clip-text text-transparent">Together</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-xl text-gray-600 max-w-3xl mx-auto"
            >
              Through collective action and community engagement, we're transforming 
              Kakuma Refugee Camp into a greener, more sustainable home for thousands.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {impactCards && impactCards.length > 0 ? (
              impactCards.map((card, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ y: -10 }}
                  className="bg-white rounded-2xl shadow-xl p-8 text-center hover:shadow-2xl transition-all duration-300 border border-gray-100"
                >
                  <div className={`inline-flex p-4 rounded-2xl bg-linear-to-br ${card.color} text-white mb-6`}>
                    {card.icon}
                  </div>
                  <h3 className="text-4xl font-bold text-gray-900 mb-2">{card.number}</h3>
                  <p className="text-xl font-semibold text-gray-700 mb-2">{card.label}</p>
                  <p className="text-gray-500">{card.description}</p>
                </motion.div>
              ))
            ) : (
              <div className="col-span-full text-center py-12 text-gray-500">
                <p>Loading impact stats...</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Flip Cards Section - Updated with English Text */}
      <section className="py-20 bg-white">
        <div className="container-custom mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-green-600 font-semibold tracking-wider uppercase"
            >
              Our Initiatives
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-4xl md:text-5xl font-bold text-gray-900 mt-4 mb-6"
            >
              Our Impact <span className="bg-linear-to-r from-green-600 to-amber-600 bg-clip-text text-transparent">Initiatives</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-xl text-gray-600 max-w-3xl mx-auto"
            >
              Discover how we're creating sustainable change through these key programs
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {flipCards && flipCards.length > 0 ? (
              flipCards.map((card, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="flip-card h-80 w-full cursor-pointer group perspective"
                >
                  <div className="flip-card-inner relative w-full h-full transition-all duration-700 preserve-3d group-hover:rotate-y-180">
                    {/* Front */}
                    <div className="flip-card-front absolute w-full h-full rounded-2xl shadow-2xl overflow-hidden backface-hidden">
                      <img
                        src={card.frontImage}
                        alt={card.frontTitle}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/50 to-transparent">
                        <div className="absolute bottom-0 left-0 right-0 p-6">
                          <span className="text-sm text-green-400 font-semibold mb-2 block">
                            {card.stats}
                          </span>
                          <h3 className="text-2xl font-bold text-white">
                            {card.frontTitle}
                          </h3>
                          <div className="w-12 h-1 bg-green-400 mt-4 group-hover:w-24 transition-all"></div>
                        </div>
                      </div>
                    </div>

                    {/* Back */}
                    <div className="flip-card-back absolute w-full h-full bg-linear-to-br from-green-600 to-green-800 rounded-2xl shadow-2xl p-6 text-white flex flex-col rotate-y-180 backface-hidden">
                      <div className="flex-1 flex flex-col items-center justify-center text-center">
                        <div className="mb-6 text-green-300 transform group-hover:scale-110 transition-transform">
                          {card.backIcon}
                        </div>
                        <h3 className="text-2xl font-bold mb-4">{card.backTitle}</h3>
                        <p className="text-gray-100 mb-6 text-sm leading-relaxed">
                          {card.backDescription}
                        </p>
                        <Link
                          to="/about"
                          className="inline-flex items-center px-6 py-3 bg-white text-green-600 rounded-xl font-semibold hover:bg-gray-100 transition-all transform hover:scale-105 shadow-lg"
                        >
                          {card.buttonText}
                          <ArrowRight className="w-4 h-4 ml-2" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))
            ) : (
              <div className="col-span-full text-center py-12 text-gray-500">
                <p>Loading initiatives...</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Featured Posts */}
      <section className="py-20 bg-gray-50">
        <div className="container-custom mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-green-600 font-semibold tracking-wider uppercase"
            >
              Latest Updates
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-4xl md:text-5xl font-bold text-gray-900 mt-4 mb-6"
            >
              News & <span className="bg-linear-to-r from-green-600 to-amber-600 bg-clip-text text-transparent">Stories</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-xl text-gray-600 max-w-3xl mx-auto"
            >
              Stay connected with our latest activities, success stories, and updates from Kakuma camp
            </motion.p>
          </div>

          {loading ? (
            <div className="flex justify-center">
              <div className="relative w-20 h-20">
                <div className="absolute inset-0 border-4 border-green-200 rounded-full"></div>
                <div className="absolute inset-0 border-4 border-green-600 rounded-full border-t-transparent animate-spin"></div>
                <Leaf className="absolute inset-4 w-12 h-12 text-green-600 animate-pulse" />
              </div>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {featuredPosts && featuredPosts.length > 0 ? (
                  featuredPosts.map((post, index) => (
                    <motion.div
                      key={post._id}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                      <PostCard post={post} />
                    </motion.div>
                  ))
                ) : (
                  <div className="col-span-full text-center py-12 text-gray-500">
                    <p>No featured posts available at the moment</p>
                  </div>
                )}
              </div>
              
              <div className="text-center mt-12">
                <Link
                  to="/posts"
                  className="inline-flex items-center bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-xl font-semibold transition-all transform hover:scale-105 shadow-lg group"
                >
                  View All Posts
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-2 transition-transform" />
                </Link>
              </div>
            </>
          )}
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
            alt="Background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-linear-to-r from-green-900/95 to-green-800/95"></div>
        </div>

        <div className="relative container-custom mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="max-w-3xl mx-auto"
          >
            <Leaf className="w-20 h-20 text-green-400 mx-auto mb-8 animate-bounce" />
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Join Us in Greening Kakuma
            </h2>
            <p className="text-xl text-gray-200 mb-10">
              Your support can help us plant more trees, educate more children, 
              and create a sustainable future for thousands of refugees.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link
                to="/donation"
                className="bg-green-500 hover:bg-green-600 text-white px-8 py-4 rounded-xl font-semibold transition-all transform hover:scale-105 shadow-2xl flex items-center"
              >
                <Heart className="mr-2 w-5 h-5" />
                Donate Now
              </Link>
              <Link
                to="/contact"
                className="bg-white hover:bg-gray-100 text-green-700 px-8 py-4 rounded-xl font-semibold transition-all transform hover:scale-105 shadow-2xl flex items-center"
              >
                <Users className="mr-2 w-5 h-5" />
                Become a Volunteer
              </Link>
            </div>

            {/* Trust Badges */}
            <div className="mt-16 flex flex-wrap justify-center gap-8">
              <div className="flex items-center text-gray-300">
                <Award className="w-6 h-6 mr-2 text-yellow-400" />
                <span>UN Partner</span>
              </div>
              <div className="flex items-center text-gray-300">
                <Award className="w-6 h-6 mr-2 text-yellow-400" />
                <span>501(c)(3) Nonprofit</span>
              </div>
              <div className="flex items-center text-gray-300">
                <Award className="w-6 h-6 mr-2 text-yellow-400" />
                <span>95% to Programs</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Flip Card Styles */}
      <style>{`
        .perspective {
          perspective: 2000px;
        }
        
        .preserve-3d {
          transform-style: preserve-3d;
        }
        
        .backface-hidden {
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
        }
        
        .rotate-y-180 {
          transform: rotateY(180deg);
        }
        
        .group:hover .group-hover\\:rotate-y-180 {
          transform: rotateY(180deg);
        }
        
        @keyframes float {
          0%, 100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-20px) rotate(5deg);
          }
        }
        
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default Home;