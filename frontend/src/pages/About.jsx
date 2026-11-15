import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  Leaf, 
  Target, 
  Heart, 
  Users, 
  Globe, 
  Award,
  ArrowRight,
  TreePine,
  Sprout
} from 'lucide-react';

const About = () => {
  const projectFacts = [
    { value: 'December 2024', title: 'Project Founded', description: 'Green Future and Sustainability Project was founded.' },
    { value: '4,700', title: 'Trees Planted', description: 'Trees planted through project activities in Kakuma.' },
    { value: '293', title: 'Women Trained', description: 'Women trained in climate-smart agriculture.' },
    { value: '22 sessions', title: 'Environmental Awareness', description: 'Sessions on environmental protection and conservation reached 5,600 community members.' },
  ];

  const team = [
    {
      name: 'Aman Garang',
      role: 'Chairman',
      image: '/images/Aman Garang.jpg',
      bio: 'Leads the organization and oversees its activities.',
    },
    {
      name: 'Agot Gut',
      role: 'Vice Chairperson',
      image: '/images/Agot Agut.png',
      bio: 'Supports the chairperson and helps coordinate project activities.',
    },
    {
      name: 'Habiad Ayubi',
      role: 'Secretary',
      image: '/images/Habiab ayubi.png',
      bio: 'Maintains meeting minutes, official records, and organizational correspondence.',
    },
    {
      name: 'Magai Ariik',
      role: 'Treasurer',
      image: '/images/Magai Ariik (1).png',
      bio: 'Maintains financial records and oversees budgeting.',
    },
    {
      name: 'Ngong Kuot',
      role: 'ICT and Communications Officer',
      image: '/images/Ngong Kuot.png',
      bio: 'Manages the website, digital communications, and online awareness.',
    },
  ];

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="relative py-24 bg-linear-to-br from-green-900 to-green-700 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-yellow-400 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-green-400 rounded-full blur-3xl"></div>
        </div>
        
        <div className="container-custom relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
            <h1 className="mb-6 text-4xl font-bold sm:text-5xl md:text-6xl">
              About Green Future and Sustainability Project
            </h1>
            <p className="text-lg leading-relaxed text-gray-200 sm:text-xl">
              Founded in December 2024, Green Future and Sustainability Project works in Kakuma
              on tree planting, climate-smart agriculture, and environmental protection.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-linear-to-br from-green-50 to-green-100 p-8 rounded-2xl"
            >
              <Target className="w-16 h-16 text-green-600 mb-6" />
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Mission</h2>
              <p className="text-lg text-gray-700 leading-relaxed">
                We plant trees, train women in climate-smart agriculture, and share information
                about environmental protection and conservation with communities in Kakuma.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-linear-to-br from-blue-50 to-blue-100 p-8 rounded-2xl"
            >
              <Globe className="w-16 h-16 text-blue-600 mb-6" />
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Vision</h2>
              <p className="text-lg text-gray-700 leading-relaxed">
                Communities in Kakuma have the knowledge and resources to care for their environment.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-16">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-green-600 font-semibold tracking-wider uppercase"
            >
              What We Believe
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-4xl md:text-5xl font-bold text-gray-900 mt-4"
            >
              Our Core Values
            </motion.h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: <Heart className="w-8 h-8" />, title: 'Compassion', desc: 'Putting people and planet first' },
              { icon: <Leaf className="w-8 h-8" />, title: 'Sustainability', desc: 'Long-term environmental solutions' },
              { icon: <Users className="w-8 h-8" />, title: 'Community', desc: 'Working together for change' },
              { icon: <Award className="w-8 h-8" />, title: 'Excellence', desc: 'High-quality programs and impact' },
            ].map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all text-center group"
              >
                <div className="inline-flex p-4 bg-green-100 text-green-600 rounded-2xl mb-4 group-hover:scale-110 transition-transform">
                  {value.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{value.title}</h3>
                <p className="text-gray-600">{value.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Project facts */}
      <section className="py-20 bg-white">
        <div className="container-custom">
          <div className="text-center mb-16">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-green-600 font-semibold tracking-wider uppercase"
            >
              Project Facts
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-4xl md:text-5xl font-bold text-gray-900 mt-4"
            >
              Our Work So Far
            </motion.h2>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {projectFacts.map((fact, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="rounded-2xl border border-green-100 bg-green-50 p-6 text-center shadow-sm"
              >
                <span className="mb-2 block text-3xl font-bold text-green-700">{fact.value}</span>
                <h3 className="mb-2 text-xl font-bold text-gray-900">{fact.title}</h3>
                <p className="text-gray-600">{fact.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-16">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-green-600 font-semibold tracking-wider uppercase"
            >
              Green Future and Sustainability Project
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-4xl md:text-5xl font-bold text-gray-900 mt-4"
            >
              Our Team
            </motion.h2>
            <p className="mx-auto mt-5 max-w-3xl text-lg leading-relaxed text-gray-600">
              The project is led by a team responsible for leadership, administration, finances,
              communications, and coordinating project activities.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {team.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group overflow-hidden rounded-2xl bg-white shadow-lg transition-shadow hover:shadow-xl"
              >
                <div className="relative overflow-hidden">
                  <img
                    src={member.image}
                    alt={`${member.name}, ${member.role}`}
                    className="h-80 w-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900">{member.name}</h3>
                  <p className="mb-3 font-semibold text-green-700">{member.role}</p>
                  <p className="text-sm leading-relaxed text-gray-600">{member.bio}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-linear-to-r from-green-600 to-green-800 text-white">
        <div className="container-custom text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="max-w-3xl mx-auto"
          >
            <Sprout className="w-20 h-20 mx-auto mb-8 text-green-300" />
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Support Project Activities
            </h2>
            <p className="text-xl text-gray-200 mb-10">
              Contact us to ask about volunteering, partnerships, or supporting the project in Kakuma.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link
                to="/contact"
                className="bg-white text-green-700 hover:bg-gray-100 px-8 py-4 rounded-xl font-semibold transition-all transform hover:scale-105 shadow-2xl flex items-center"
              >
                Get Involved
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
              <Link
                to="/posts"
                className="border-2 border-white hover:bg-white hover:text-green-700 px-8 py-4 rounded-xl font-semibold transition-all transform hover:scale-105 flex items-center"
              >
                Read Our Stories
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default About;