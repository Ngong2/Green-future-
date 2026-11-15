import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Mail,
  Phone,
  MapPin,
  Send,
  Clock,
  Facebook,
  Twitter,
  Instagram,
  Youtube
} from 'lucide-react';
import toast from 'react-hot-toast';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    await new Promise(resolve => setTimeout(resolve, 1500));

    toast.success('Your message has been sent successfully.');
    setFormData({ name: '', email: '', subject: '', message: '' });
    setSubmitting(false);
  };

  const contactInfo = [
    {
      icon: MapPin,
      title: 'Office Location',
      details: ['Kakuma Refugee Camp', 'Turkana County', 'Kenya']
    },
    {
      icon: Phone,
      title: 'Call Us',
      details: ['+254 700 000 000', '+254 711 111 111']
    },
    {
      icon: Mail,
      title: 'Email Address',
      details: ['greenfutureinitiative@gmail.com']
    },
    {
      icon: Clock,
      title: 'Working Hours',
      details: [
        'Monday - Friday: 8:00am - 5:00pm',
        'Saturday: 9:00am - 1:00pm',
        'Sunday: Closed'
      ]
    }
  ];

  return (
    <div className="min-h-screen pt-20 bg-white">

      {/* ================= HERO SECTION ================= */}
      <section className="relative flex min-h-[28rem] items-center justify-center overflow-hidden text-white sm:min-h-[34rem] md:h-[75vh]">

        {/* Background Image */}
        <img
          src="/images/contact-background.png"
          alt="People planting trees"
          className="absolute inset-0 h-full w-full object-cover opacity-40"
        />

        {/* Transparent Green Overlay */}
        <div className="absolute inset-0 bg-linear-to-r from-slate-950/75 via-slate-900/55 to-slate-950/30"></div>

        {/* Decorative Transparent Shape */}
        <div className="absolute -top-40 -right-40 w-125 h-125 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-100 h-100 bg-slate-300/10 rounded-full blur-3xl"></div>

        {/* Hero Content */}
        <div className="relative z-10 container-custom max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9 }}
          >
            <h1 className="mb-5 text-4xl font-bold leading-tight sm:text-5xl md:mb-6 md:text-7xl">
              Get in Touch
            </h1>
            <p className="text-lg md:text-xl text-gray-100 leading-relaxed max-w-2xl mx-auto">
              Join our mission to restore nature in Kakuma. We welcome
              volunteers, partners, and supporters who believe in building
              a greener and more sustainable future.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ================= CONTACT INFO ================= */}
      <section className="relative py-12 sm:py-16">
        <div className="container-custom">
          <div className="relative z-10 -mt-12 grid gap-4 sm:grid-cols-2 sm:gap-6 md:-mt-24 lg:grid-cols-4">
            {contactInfo.map((info, index) => {
              const Icon = info.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="rounded-2xl border border-green-100 bg-white p-5 shadow-md transition hover:shadow-xl sm:p-8"
                >
                  <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-emerald-600 text-white mb-5">
                    <Icon className="w-6 h-6" />
                  </div>

                  <h3 className="text-lg font-semibold text-gray-900 mb-3">
                    {info.title}
                  </h3>

                  {info.details.map((detail, i) => (
                    <p key={i} className="text-gray-600 text-sm">
                      {detail}
                    </p>
                  ))}
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ================= FORM + MAP ================= */}
      <section className="bg-white py-14 sm:py-20">
        <div className="container-custom">
          <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">

            {/* CONTACT FORM */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Send Us a Message
              </h2>

              <p className="text-gray-600 mb-8">
                Complete the form and our team will respond shortly.
              </p>

              <form onSubmit={handleSubmit} className="space-y-6">

                <div className="grid md:grid-cols-2 gap-6">
                  <input
                    type="text"
                    name="name"
                    required
                    placeholder="Full Name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-600 outline-none"
                  />
                  <input
                    type="email"
                    name="email"
                    required
                    placeholder="Email Address"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-600 outline-none"
                  />
                </div>

                <input
                  type="text"
                  name="subject"
                  required
                  placeholder="Subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-600 outline-none"
                />

                <textarea
                  name="message"
                  rows="6"
                  required
                  placeholder="Write your message..."
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-600 outline-none"
                ></textarea>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full bg-linear-to-r from-emerald-600 to-green-700 hover:from-emerald-700 hover:to-green-800 text-white font-semibold py-4 rounded-xl transition-all flex items-center justify-center disabled:opacity-60"
                >
                  {submitting ? (
                    <>
                      <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full mr-2"></div>
                      Sending...
                    </>
                  ) : (
                    <>
                      Send Message
                      <Send className="ml-2 w-5 h-5" />
                    </>
                  )}
                </button>
              </form>
            </motion.div>

            {/* MAP + SOCIAL */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="rounded-2xl overflow-hidden shadow-md mb-8 border border-green-100">
                <iframe
                  src="https://www.google.com/maps?q=Kakuma,Kenya&output=embed"
                  height="320"
                  width="100%"
                  loading="lazy"
                  title="Kakuma Location"
                  className="w-full"
                ></iframe>
              </div>

              <div className="rounded-2xl bg-linear-to-r from-emerald-700 to-green-800 p-6 text-white shadow-lg sm:p-8">
                <h3 className="text-2xl font-semibold mb-4">
                  Connect With Us
                </h3>

                <p className="text-green-200 mb-6">
                  Follow our environmental journey and impact updates.
                </p>

                <div className="mb-8 flex flex-wrap gap-3 sm:gap-4">
                  {[Facebook, Twitter, Instagram, Youtube].map((Icon, i) => (
                    <div
                      key={i}
                      className="bg-white/10 hover:bg-white/20 transition p-3 rounded-lg cursor-pointer"
                    >
                      <Icon className="w-5 h-5" />
                    </div>
                  ))}
                </div>

                <div className="border-t border-white/20 pt-6">
                  <p className="text-sm text-green-200">Emergency Hotline</p>
                  <p className="text-xl font-bold">
                    +254 700 000 000
                  </p>
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

    </div>
  );
};

export default Contact;