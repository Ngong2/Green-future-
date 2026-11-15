import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
  Menu, 
  X, 
  Leaf, 
  User, 
  LogOut, 
  ChevronDown,
  Sprout,
  Heart,
  Globe,
  Newspaper,
  Phone 
} from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const { user, isAuthenticated, logout } = useAuth();
  const location = useLocation();

  const isAbout = location.pathname === '/about';
  const isContact = location.pathname === '/contact';

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
    setShowDropdown(false);
  }, [location]);

  // Agricultural color palette
  const colors = {
    soil: '#5C4E3D',      // Rich soil brown
    leaf: '#4A7A59',       // Fresh leaf green
    harvest: '#D9A066',    // Wheat/grain color
    sky: '#87AFC7',        // Soft sky blue
    cream: '#F5F0E6',      // Cream background
    sage: '#8A9A7E',       // Sage green
    terracotta: '#C66B4A', // Terracotta accent
  };

  const navLinks = [
    { to: '/', label: 'Home', },
    { to: '/about', label: 'About Us',  },
    { to: '/posts', label: 'News & Updates',},
    { to: '/donation', label: 'Donate'},
    { to: '/contact', label: 'Contact' },
  ];

  // Determine if current route is active
  const isActiveRoute = (path) => {
    if (path === '/') {
      return location.pathname === path;
    }
    return location.pathname.startsWith(path);
  };

  return (
    <nav 
      className={`
        fixed w-full z-50 transition-all duration-500
        ${scrolled 
          ? 'bg-[#F5F0E6]/95 backdrop-blur-md shadow-lg py-3' 
          : isAbout ? 'bg-linear-to-br from-green-900 to-green-700 py-5' : isContact ? 'bg-linear-to-r from-emerald-900/90 via-green-800/85 to-emerald-700/90 py-5' : 'bg-transparent py-5'
        }
      `}
      style={ scrolled ? { backgroundColor: `${colors.cream}e6` } : {} }
    >
      <div className="container-custom mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo - Agricultural Theme */}
          <Link 
            to="/" 
            className="flex items-center group relative"
          >
            <img
              src="/images/logo.png"
              alt="Green Future and Sustainability Project"
              className="h-12 w-auto object-contain bg-transparent sm:h-14 lg:h-16"
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`
                  relative px-4 py-2 rounded-lg font-medium 
                  transition-all duration-300 group
                  ${scrolled 
                    ? 'text-[#5C4E3D] hover:text-[#4A7A59]' 
                    : 'text-white hover:text-[#F5F0E6]'
                  }
                  ${isActiveRoute(link.to) 
                    ? scrolled 
                      ? 'text-[#4A7A59] font-semibold' 
                      : 'text-[#D9A066] font-semibold'
                    : ''
                  }
                `}
              >
                <span className="flex items-center space-x-2">
                  <span className={`
                    transition-transform duration-300 group-hover:scale-110
                    ${isActiveRoute(link.to) ? 'scale-110' : ''}
                  `}>
                    {link.icon}
                  </span>
                  <span>{link.label}</span>
                </span>
                
                {/* Active Indicator */}
                {isActiveRoute(link.to) && (
                  <span className={`
                    absolute bottom-0 left-1/2 transform -translate-x-1/2
                    w-1.5 h-1.5 rounded-full
                    ${scrolled ? 'bg-[#4A7A59]' : 'bg-[#D9A066]'}
                  `}></span>
                )}
                
                {/* Hover Underline Effect */}
                <span className={`
                  absolute bottom-0 left-1/2 transform -translate-x-1/2
                  w-0 h-0.5 
                  ${scrolled ? 'bg-[#4A7A59]' : 'bg-[#F5F0E6]'}
                  transition-all duration-300 group-hover:w-8
                `}></span>
              </Link>
            ))}

            {/* Auth Section */}
            {isAuthenticated ? (
              <div className="relative ml-4">
                <button
                  onClick={() => setShowDropdown(!showDropdown)}
                  className={`
                    flex items-center space-x-2 px-4 py-2 rounded-lg 
                    transition-all duration-300 border
                    ${scrolled
                      ? 'bg-[#4A7A59]/10 text-[#4A7A59] hover:bg-[#4A7A59]/20 border-[#4A7A59]/20'
                      : 'bg-white/10 text-white hover:bg-white/20 border-white/20 backdrop-blur-sm'
                    }
                  `}
                  style={scrolled ? { backgroundColor: `${colors.leaf}1a` } : {}}
                >
                  <User className="w-4 h-4" />
                  <span className="max-w-25 truncate">{user?.name || 'Admin'}</span>
                  <ChevronDown className={`
                    w-4 h-4 transition-transform duration-300
                    ${showDropdown ? 'rotate-180' : ''}
                  `} />
                </button>

                {/* Dropdown Menu */}
                {showDropdown && (
                  <div className="absolute right-0 mt-2 w-56 rounded-xl shadow-xl py-2 z-50 animate-fade-in border border-[#E5D5C0] overflow-hidden"
                       style={{ backgroundColor: colors.cream }}>
                    {/* Farm-inspired decorative top bar */}
                    <div className="h-1 bg-linear-to-r from-[#4A7A59] via-[#D9A066] to-[#C66B4A]"></div>
                    
                    <div className="p-2">
                      <div className="px-4 py-3 mb-2 bg-[#4A7A59]/5 rounded-lg">
                        <p className="text-xs text-[#5C4E3D] font-medium">Signed in as</p>
                        <p className="text-sm font-semibold text-[#4A7A59] truncate">{user?.name}</p>
                      </div>

                      <Link
                        to="/admin"
                        className="flex items-center space-x-3 px-4 py-2.5 text-[#5C4E3D] hover:text-[#4A7A59] hover:bg-[#4A7A59]/10 rounded-lg transition-colors group"
                      >
                        <Sprout className="w-4 h-4 group-hover:scale-110 transition-transform" />
                        <span>Dashboard</span>
                      </Link>
                      
                      <Link
                        to="/admin/posts/create"
                        className="flex items-center space-x-3 px-4 py-2.5 text-[#5C4E3D] hover:text-[#4A7A59] hover:bg-[#4A7A59]/10 rounded-lg transition-colors group"
                      >
                        <Leaf className="w-4 h-4 group-hover:scale-110 transition-transform" />
                        <span>Create Post</span>
                      </Link>
                      
                      <Link
                        to="/admin/posts"
                        className="flex items-center space-x-3 px-4 py-2.5 text-[#5C4E3D] hover:text-[#4A7A59] hover:bg-[#4A7A59]/10 rounded-lg transition-colors group"
                      >
                        <Newspaper className="w-4 h-4 group-hover:scale-110 transition-transform" />
                        <span>Manage Posts</span>
                      </Link>
                    

                      <div className="my-2 border-t border-[#E5D5C0]"></div>

                      <button
                        onClick={logout}
                        className="w-full flex items-center space-x-3 px-4 py-2.5 text-[#C66B4A] hover:text-[#B55A3A] hover:bg-[#C66B4A]/10 rounded-lg transition-colors group"
                      >
                        <LogOut className="w-4 h-4 group-hover:scale-110 transition-transform" />
                        <span>Logout</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : null}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`
              lg:hidden p-2.5 rounded-lg transition-all duration-300
              ${scrolled 
                ? 'text-[#5C4E3D] hover:bg-[#4A7A59]/10' 
                : 'text-white hover:bg-white/10'
              }
            `}
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="lg:hidden absolute left-0 right-0 top-full mt-2 mx-4 rounded-2xl shadow-2xl overflow-hidden animate-slide-down"
               style={{ backgroundColor: colors.cream }}>
            {/* Decorative top bar */}
            <div className="h-1.5 bg-linear-to-r from-[#4A7A59] via-[#D9A066] to-[#C66B4A]"></div>
            
            <div className="p-4">
              <div className="flex flex-col space-y-2">
                {navLinks.map((link) => (
                  <Link
                    key={link.to}
                    to={link.to}
                    className={`
                      flex items-center space-x-3 px-4 py-3.5 rounded-xl
                      transition-all duration-300
                      ${isActiveRoute(link.to)
                        ? 'bg-[#4A7A59]/10 text-[#4A7A59] font-semibold'
                        : 'text-[#5C4E3D] hover:bg-[#4A7A59]/5'
                      }
                    `}
                  >
                    <span className={`
                      transition-transform duration-300
                      ${isActiveRoute(link.to) ? 'scale-110 text-[#4A7A59]' : ''}
                    `}>
                      {link.icon}
                    </span>
                    <span className="flex-1">{link.label}</span>
                    
                    {/* Active Indicator */}
                    {isActiveRoute(link.to) && (
                      <span className="w-1.5 h-1.5 bg-[#4A7A59] rounded-full"></span>
                    )}
                  </Link>
                ))}

                {/* Mobile Auth Section */}
                <div className="mt-4 pt-4 border-t border-[#E5D5C0]">
                  {isAuthenticated ? (
                    <>
                      <div className="px-4 py-3 mb-2 bg-[#4A7A59]/5 rounded-xl">
                        <p className="text-xs text-[#5C4E3D]">Logged in as</p>
                        <p className="text-sm font-semibold text-[#4A7A59]">{user?.name}</p>
                      </div>

                      <Link
                        to="/admin"
                        className="flex items-center space-x-3 px-4 py-3.5 text-[#5C4E3D] hover:bg-[#4A7A59]/5 rounded-xl transition-colors"
                      >
                        <Sprout className="w-4 h-4" />
                        <span>Dashboard</span>
                      </Link>
                      
                      <Link
                        to="/admin/posts/create"
                        className="flex items-center space-x-3 px-4 py-3.5 text-[#5C4E3D] hover:bg-[#4A7A59]/5 rounded-xl transition-colors"
                      >
                        <Leaf className="w-4 h-4" />
                        <span>Create Post</span>
                      </Link>
                      
                      <Link
                        to="/admin/posts"
                        className="flex items-center space-x-3 px-4 py-3.5 text-[#5C4E3D] hover:bg-[#4A7A59]/5 rounded-xl transition-colors"
                      >
                        <Newspaper className="w-4 h-4" />
                        <span>Manage Posts</span>
                      </Link>

                      <button
                        onClick={logout}
                        className="w-full flex items-center space-x-3 px-4 py-3.5 text-[#C66B4A] hover:bg-[#C66B4A]/5 rounded-xl transition-colors mt-2"
                      >
                        <LogOut className="w-4 h-4" />
                        <span>Logout</span>
                      </button>
                    </>
                  ) : null}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Custom Styles for TailwindCSS 4.1 */}
        <style>{`
          @keyframes fade-in {
            from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }
        
        @keyframes slide-down {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-slide-down {
          animation: slide-down 0.3s ease-out;
        }
      `}</style>
    </nav>
  );
};

export default Navbar;
