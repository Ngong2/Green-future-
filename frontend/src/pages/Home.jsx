import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  TreePine, 
  Users, 
  Globe, 
  Heart, 
  Leaf, 
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Sprout,
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
  const heroImages = [
    {
      url: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
      title: "Tree Planting in Kakuma",
      subtitle: "4,700 trees planted",
      description: "The project has planted 4,700 trees in Kakuma."
    },
    {
      url: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
      title: "Climate-Smart Agriculture",
      subtitle: "293 women trained",
      description: "Women have been trained in climate-smart agriculture."
    },
    {
      url: "https://images.unsplash.com/photo-1476231682828-37e571bc172f?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
      title: "Environmental Awareness",
      subtitle: "22 community sessions",
      description: "Sessions on environmental protection and conservation reached 5,600 community members."
    },
    {
      url: "https://images.unsplash.com/photo-1426604966848-d7adac402bff?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
      title: "Community Volunteers",
      subtitle: "17 volunteers",
      description: "Volunteers support the project's environmental activities in Kakuma."
    }
  ];

  // Impact Cards Data
  const impactCards = [
    {
      image: "/images/Trees Planted young.jpg",
      imageAlt: "A Kakuma community member watering a newly planted tree",
      number: "4,700",
      label: "Trees Planted",
      color: "from-green-500 to-green-700",
      description: "Trees planted through project activities"
    },
    {
      image: "/images/vounteer.jpg",
      imageAlt: "Volunteers working together in a tree nursery",
      number: "17",
      label: "Volunteers",
      color: "from-blue-500 to-blue-700",
      description: "People volunteering with the project"
    },
    {
      image: "/images/wowan.jpg",
      imageAlt: "A woman watering crops in a community garden",
      number: "293",
      label: "Women Trained",
      color: "from-amber-600 to-amber-800",
      description: "Trained in climate-smart agriculture"
    },
    {
      image: "/images/community member.jpg",
      imageAlt: "Community members tending crops in a garden",
      number: "5,600",
      label: "Community Members Reached",
      color: "from-red-500 to-red-700",
      description: "Reached through 22 environmental protection and conservation sessions"
    }
  ];

  const flipCards = [
    {
      frontImage: "https://images.unsplash.com/photo-1523349312806-f5dde0a01c32?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      frontTitle: "Tree Planting",
      backTitle: "Reforestation Initiative",
      backDescription: "The project has planted 4,700 trees in Kakuma.",
      backIcon: <Sprout className="w-16 h-16" />,
      stats: "4,700 trees planted",
      buttonText: "Learn More"
    },
    {
      frontImage: "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      frontTitle: "Climate-Smart Agriculture",
      backTitle: "Women's Training",
      backDescription: "293 women have been trained in climate-smart agriculture.",
      backIcon: <BookOpen className="w-16 h-16" />,
      stats: "293 women trained",
      buttonText: "Learn More"
    },
    {
      frontImage: "https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      frontTitle: "Environmental Awareness",
      backTitle: "Community Sessions",
      backDescription: "22 sessions on environmental protection and conservation reached 5,600 community members.",
      backIcon: <Sun className="w-16 h-16" />,
      stats: "22 sessions · 5,600 reached",
      buttonText: "Learn More"
    },
    {
      frontImage: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      frontTitle: "Community Volunteers",
      backTitle: "Volunteer Team",
      backDescription: "17 volunteers support the project's environmental activities in Kakuma.",
      backIcon: <Users className="w-16 h-16" />,
      stats: "17 volunteers",
      buttonText: "Learn More"
    }
  ];

  useEffect(() => {
    fetchFeaturedPosts();
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
              {/* Main Title */}
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="mb-5 break-words text-4xl font-bold leading-tight text-white sm:text-5xl md:text-6xl lg:text-7xl"
              >
                <span className="bg-linear-to-r from-green-300 via-lime-200 to-yellow-200 bg-clip-text text-transparent">
                  Green Future and Sustainability Project
                </span>
              </motion.h1>

              {/* Featured project activity */}
              <motion.h2
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="mb-2 text-2xl font-semibold text-white sm:text-3xl md:text-4xl"
              >
                {heroImages[currentHeroIndex].title}
              </motion.h2>

              {/* Description */}
              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.55 }}
                className="mb-7 max-w-2xl text-base text-gray-200 sm:mb-10 sm:text-xl"
              >
                <span className="mb-1 block font-semibold text-green-200">
                  {heroImages[currentHeroIndex].subtitle}
                </span>
                {heroImages[currentHeroIndex].description}
              </motion.p>

              {/* CTA Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
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

              {/* Project results */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9 }}
                className="mt-8 grid max-w-3xl grid-cols-2 gap-2 sm:mt-12 sm:gap-4 md:grid-cols-4"
              >
                {impactCards.map((card) => (
                  <div key={card.label} className="rounded-lg border border-white/20 bg-white/10 p-2 text-center backdrop-blur-md sm:p-4">
                    <div className="text-xl font-bold text-green-400 sm:text-3xl">{card.number}</div>
                    <div className="text-xs text-gray-200 sm:text-sm">{card.label}</div>
                  </div>
                ))}
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
              Project Results
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-4xl md:text-5xl font-bold text-gray-900 mt-4 mb-6"
            >
              Our Results in Kakuma
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-xl text-gray-600 max-w-3xl mx-auto"
            >
              Our work in Kakuma includes tree planting, climate-smart agriculture training,
              and community awareness on environmental protection.
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
                  className="overflow-hidden rounded-2xl border border-gray-100 bg-white text-center shadow-xl transition-all duration-300 hover:shadow-2xl"
                >
                  <img
                    src={card.image}
                    alt={card.imageAlt}
                    loading="lazy"
                    className="h-52 w-full object-cover"
                  />
                  <div className="p-6 sm:p-8">
                    <h3 className="mb-2 text-4xl font-bold text-gray-900">{card.number}</h3>
                    <p className="mb-2 text-xl font-semibold text-gray-700">{card.label}</p>
                    <p className="text-gray-500">{card.description}</p>
                  </div>
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
              What We Do
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-4xl md:text-5xl font-bold text-gray-900 mt-4 mb-6"
            >
              Project Activities
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-xl text-gray-600 max-w-3xl mx-auto"
            >
              Tree planting, climate-smart agriculture training, and environmental awareness in Kakuma
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
              Support Our Work
            </h2>
            <p className="text-xl text-gray-200 mb-10">
              Your support helps us continue tree planting, climate-smart agriculture training,
              and community awareness on environmental protection in Kakuma.
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