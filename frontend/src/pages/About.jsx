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
  const milestones = [
    { year: '2018', title: 'Project Founded', description: 'Started with 100 trees planted by 20 volunteers' },
    { year: '2019', title: 'First Nursery', description: 'Established first tree nursery producing 5,000 seedlings' },
    { year: '2020', title: 'Education Program', description: 'Launched environmental education in 5 schools' },
    { year: '2021', title: '10,000 Trees', description: 'Reached 10,000 trees planted milestone' },
    { year: '2022', title: 'UN Partnership', description: 'Became UN Environment Programme partner' },
    { year: '2023', title: 'Community Gardens', description: 'Established 50 community gardens' },
  ];

  const team = [
    {
      name: 'Aman Garang',
      role: 'Chairman',
      image: '/images/Aman Garang.jpg',
      bio: 'Provides strategic leadership, oversees organizational activities, and guides the initiative toward achieving its mission and vision.',
    },
    {
      name: 'Agot Gut',
      role: 'Vice Chairperson',
      image: '/images/Agot Agut.png',
      bio: 'Supports the Chairman, coordinates leadership activities, and assists in overseeing organizational programs.',
    },
    {
      name: 'Habiad Ayubi',
      role: 'Secretary',
      image: '/images/Habiab ayubi.png',
      bio: 'Manages official records, meeting minutes, organizational communication, and administrative documentation.',
    },
    {
      name: 'Magai Ariik',
      role: 'Treasurer',
      image: '/images/Magai Ariik (1).png',
      bio: 'Oversees financial records, budgeting, financial accountability, and responsible management of organizational resources.',
    },
    {
      name: 'Ngong Kuot',
      role: 'ICT and Communications Officer',
      image: '/images/Ngong Kuot.png',
      bio: 'Leads digital communications, website management, technology development, online visibility, and digital awareness initiatives.',
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
              Our Story of{' '}
              <span className="bg-linear-to-r from-yellow-400 to-yellow-200 bg-clip-text text-transparent">
                Hope & Growth
              </span>
            </h1>
            <p className="text-lg leading-relaxed text-gray-200 sm:text-xl">
              Since 2018, we've been on a mission to transform Kakuma Refugee Camp through 
              reforestation, environmental education, and community empowerment. What started 
              as a small initiative has grown into a movement that's changing lives and landscapes.
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
                To restore degraded land in Kakuma Refugee Camp through sustainable reforestation, 
                while empowering refugees with environmental knowledge and skills for a greener future.
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
                A green and sustainable Kakuma where refugees and host communities thrive together 
                in harmony with nature, leading the way in environmental stewardship.
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

      {/* Timeline */}
      <section className="py-20 bg-white">
        <div className="container-custom">
          <div className="text-center mb-16">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-green-600 font-semibold tracking-wider uppercase"
            >
              Our Journey
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-4xl md:text-5xl font-bold text-gray-900 mt-4"
            >
              Key Milestones
            </motion.h2>
          </div>

          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-green-200 hidden lg:block"></div>

            <div className="space-y-12">
              {milestones.map((milestone, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6 }}
                  className={`flex flex-col lg:flex-row items-center ${
                    index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
                  }`}
                >
                  <div className={`lg:w-1/2 ${index % 2 === 0 ? 'lg:text-right lg:pr-12' : 'lg:pl-12'}`}>
                    <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all">
                      <span className="text-3xl font-bold text-green-600 mb-2 block">{milestone.year}</span>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">{milestone.title}</h3>
                      <p className="text-gray-600">{milestone.description}</p>
                    </div>
                  </div>
                  
                  {/* Center Dot */}
                  <div className="hidden lg:flex lg:w-12 lg:h-12 bg-green-600 rounded-full items-center justify-center text-white font-bold relative z-10">
                    {index + 1}
                  </div>
                  
                  <div className="lg:w-1/2"></div>
                </motion.div>
              ))}
            </div>
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
              Green Future and Sustainability Initiative
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
              Our team is made up of dedicated leaders committed to environmental protection,
              climate action, community development, and a sustainable future. Together, we
              work to empower communities and inspire positive environmental change.
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
          <p className="mt-12 text-center text-2xl font-bold text-green-800">
            Together, We Grow a Greener Future!
          </p>
          <p className="mx-auto mt-3 max-w-3xl text-center leading-relaxed text-gray-600">
            We believe that strong leadership, teamwork, and community participation are essential
            to building a sustainable environment for future generations.
          </p>
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
              Be Part of Our Story
            </h2>
            <p className="text-xl text-gray-200 mb-10">
              Join us in writing the next chapter of hope and transformation in Kakuma.
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