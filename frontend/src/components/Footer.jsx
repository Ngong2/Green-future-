import { Link } from 'react-router-dom';
import { 
  TreePine, 
  Mail, 
  Phone, 
  MapPin, 
  Leaf
} from 'lucide-react';
import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube } from 'react-icons/fa';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { to: '/about', label: 'About Us' },
    { to: '/posts', label: 'News & Updates' },
    { to: '/contact', label: 'Contact' },
    { to: '/privacy', label: 'Privacy Policy' },
    { to: '/terms', label: 'Terms of Service' },
  ];

  const programs = [
    { to: '/programs/tree-planting', label: 'Tree Planting' },
    { to: '/programs/education', label: 'Environmental Education' },
    { to: '/programs/gardens', label: 'Community Gardens' },
    { to: '/programs/nursery', label: 'Tree Nursery' },
    { to: '/programs/training', label: 'Vocational Training' },
  ];

  const socialLinks = [
    { icon: <FaFacebookF className="w-5 h-5" />, url: 'https://facebook.com', label: 'Facebook' },
    { icon: <FaTwitter className="w-5 h-5" />, url: 'https://twitter.com', label: 'Twitter' },
    { icon: <FaInstagram className="w-5 h-5" />, url: 'https://instagram.com', label: 'Instagram' },
    { icon: <FaYoutube className="w-5 h-5" />, url: 'https://youtube.com', label: 'YouTube' },
  ];

  return (
    <footer className="bg-gray-900 text-white pt-16 pb-8">
      <div className="container-custom">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* About Section */}
          <div>
            <h3 className="text-2xl font-bold text-white mb-4">Green Future</h3>
            <p className="text-gray-400 mb-6 leading-relaxed">
              Sustainability Project
            </p>
            <p className="text-gray-400 mb-6 leading-relaxed">
              Tree planting, climate-smart agriculture, and environmental awareness in Kakuma.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-gray-800 hover:bg-green-600 p-2 rounded-lg transition-colors duration-300"
                  aria-label={social.label}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-6 relative inline-block">
              Quick Links
              <span className="absolute -bottom-2 left-0 w-12 h-1 bg-green-500 rounded-full"></span>
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <Link
                    to={link.to}
                    className="text-gray-400 hover:text-green-400 transition-colors duration-300 flex items-center group"
                  >
                    <span className="w-0 group-hover:w-2 h-0.5 bg-green-400 mr-0 group-hover:mr-2 transition-all"></span>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Programs */}
          <div>
            <h3 className="text-lg font-semibold mb-6 relative inline-block">
              Our Programs
              <span className="absolute -bottom-2 left-0 w-12 h-1 bg-green-500 rounded-full"></span>
            </h3>
            <ul className="space-y-3">
              {programs.map((program, index) => (
                <li key={index}>
                  <Link
                    to={program.to}
                    className="text-gray-400 hover:text-green-400 transition-colors duration-300 flex items-center group"
                  >
                    <span className="w-0 group-hover:w-2 h-0.5 bg-green-400 mr-0 group-hover:mr-2 transition-all"></span>
                    {program.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-6 relative inline-block">
              Get in Touch
              <span className="absolute -bottom-2 left-0 w-12 h-1 bg-green-500 rounded-full"></span>
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                <span className="text-gray-400">
                  Kakuma Refugee Camp,<br />
                  Turkana County, Kenya
                </span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-green-400 flex-shrink-0" />
                <a href="tel:+254700000000" className="text-gray-400 hover:text-green-400 transition-colors">
                  +254 700 000 000
                </a>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-green-400 flex-shrink-0" />
                <a href="mailto:greenfutureinitiative@gmail.com" className="break-all text-gray-400 transition-colors hover:text-green-400">
                  greenfutureinitiative@gmail.com
                </a>
              </li>
            </ul>

            {/* Newsletter Signup */}
            <div className="mt-6">
              <p className="text-gray-300 mb-3">Subscribe to our newsletter</p>
              <form className="flex">
                <input
                  type="email"
                  placeholder="Your email"
                  className="flex-1 px-4 py-2 bg-gray-800 text-white rounded-l-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                />
                <button
                  type="submit"
                  className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded-r-lg transition-colors"
                >
                  <Mail className="w-5 h-5" />
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 pt-8 mt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm text-center md:text-left">
              © {currentYear} Green Future and Sustainability Project. All rights reserved.
            </p>
            <p className="text-gray-400 text-sm flex items-center mt-4 md:mt-0">
              Kakuma, Turkana County, Kenya
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;