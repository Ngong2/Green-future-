import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Heart,
  DollarSign,
  CreditCard,
  Smartphone,
  Globe,
  Users,
  TreePine,
  Award,
  CheckCircle,
  ArrowRight,
  Leaf
} from 'lucide-react';
import toast from 'react-hot-toast';

const Donation = () => {
  const [donationAmount, setDonationAmount] = useState('');
  const [customAmount, setCustomAmount] = useState('');
  const [selectedMethod, setSelectedMethod] = useState('');
  const [isRecurring, setIsRecurring] = useState(false);
  const [donorInfo, setDonorInfo] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const presetAmounts = [25, 50, 100, 250, 500, 1000];

  const donationMethods = [
    {
      id: 'card',
      name: 'Credit/Debit Card',
      icon: <CreditCard className="w-6 h-6" />,
      description: 'Secure online payment'
    },
    {
      id: 'paypal',
      name: 'PayPal',
      icon: <Globe className="w-6 h-6" />,
      description: 'PayPal account required'
    },
    {
      id: 'mobile',
      name: 'Mobile Money',
      icon: <Smartphone className="w-6 h-6" />,
      description: 'M-Pesa, Airtel Money'
    }
  ];

  const impactStats = [
    {
      icon: <TreePine className="w-8 h-8" />,
      number: "15,000+",
      label: "Trees from $25 donation",
      description: "Plant drought-resistant trees"
    },
    {
      icon: <Users className="w-8 h-8" />,
      number: "500+",
      label: "Families fed monthly",
      description: "Support community gardens"
    },
    {
      icon: <Award className="w-8 h-8" />,
      number: "1,500+",
      label: "Children educated",
      description: "Environmental education programs"
    }
  ];

  const handleAmountSelect = (amount) => {
    setDonationAmount(amount);
    setCustomAmount('');
  };

  const handleCustomAmount = (value) => {
    setDonationAmount('custom');
    setCustomAmount(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const amount = donationAmount === 'custom' ? customAmount : donationAmount;

    if (!amount || !selectedMethod) {
      toast.error('Please select an amount and payment method');
      return;
    }

    // Here you would integrate with your payment processor
    toast.success('Thank you for your generous donation! Processing...');

    // Simulate payment processing
    setTimeout(() => {
      toast.success('Donation processed successfully! Receipt sent to your email.');
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-linear-to-b from-green-50 to-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-linear-to-r from-green-600 to-green-800 py-16 text-white sm:py-24">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
            alt="Background"
            className="w-full h-full object-cover opacity-20"
          />
        </div>
        <div className="relative container-custom text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl mx-auto"
          >
            <Heart className="w-16 h-16 text-yellow-400 mx-auto mb-6 animate-pulse" />
            <h1 className="mb-6 text-4xl font-bold leading-tight sm:text-5xl md:text-6xl">
              Make a <span className="text-yellow-400">Difference</span> Today
            </h1>
            <p className="mb-8 text-lg text-green-100 sm:text-xl">
              Your donation helps us plant trees, educate children, and create sustainable
              communities in Kakuma Refugee Camp. Every contribution counts.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-sm text-green-200 sm:text-base">
              <span className="inline-flex items-center gap-2"><CheckCircle className="h-5 w-5 shrink-0" />100% of donations go to programs</span>
              <span className="inline-flex items-center gap-2"><CheckCircle className="h-5 w-5 shrink-0" />Tax-deductible</span>
              <span className="inline-flex items-center gap-2"><CheckCircle className="h-5 w-5 shrink-0" />UN Partner Organization</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Impact Stats */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Your Impact in Numbers
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              See how your donation transforms lives and restores the environment
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {impactStats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                className="rounded-2xl border border-green-200 bg-linear-to-br from-green-50 to-green-100 p-5 text-center sm:p-8"
              >
                <div className="text-green-600 mb-4 flex justify-center">
                  {stat.icon}
                </div>
                <h3 className="text-3xl font-bold text-green-800 mb-2">{stat.number}</h3>
                <p className="text-green-700 font-semibold mb-2">{stat.label}</p>
                <p className="text-green-600 text-sm">{stat.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Donation Form */}
      <section className="py-16 bg-gray-50">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Choose Your Donation Amount
              </h2>
              <p className="text-gray-600">
                Select a preset amount or enter a custom donation
              </p>
            </div>

            <div className="rounded-2xl bg-white p-4 shadow-xl sm:p-8">
              <form onSubmit={handleSubmit}>
                {/* Amount Selection */}
                <div className="mb-8">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Select Amount</h3>
                  <div className="mb-4 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-6 sm:gap-4">
                    {presetAmounts.map((amount) => (
                      <button
                        key={amount}
                        type="button"
                        onClick={() => handleAmountSelect(amount)}
                        className={`rounded-lg border-2 p-3 transition-all sm:p-4 ${
                          donationAmount === amount
                            ? 'border-green-500 bg-green-50 text-green-700'
                            : 'border-gray-200 hover:border-green-300'
                        }`}
                      >
                        <DollarSign className="w-4 h-4 mx-auto mb-1" />
                        ${amount}
                      </button>
                    ))}
                  </div>

                  <div className="flex items-center gap-3 sm:gap-4">
                    <input
                      type="number"
                      placeholder="Custom amount"
                      value={customAmount}
                      onChange={(e) => handleCustomAmount(e.target.value)}
                      className="min-w-0 flex-1 rounded-lg border border-gray-200 p-3 focus:border-transparent focus:ring-2 focus:ring-green-500 sm:p-4"
                    />
                    <span className="text-gray-500">USD</span>
                  </div>
                </div>

                {/* Recurring Donation */}
                <div className="mb-8">
                  <label className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      checked={isRecurring}
                      onChange={(e) => setIsRecurring(e.target.checked)}
                      className="w-5 h-5 text-green-600 rounded focus:ring-green-500"
                    />
                    <span className="text-gray-700">Make this a monthly recurring donation</span>
                  </label>
                </div>

                {/* Payment Method */}
                <div className="mb-8">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Payment Method</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {donationMethods.map((method) => (
                      <button
                        key={method.id}
                        type="button"
                        onClick={() => setSelectedMethod(method.id)}
                        className={`p-6 rounded-lg border-2 transition-all text-left ${
                          selectedMethod === method.id
                            ? 'border-green-500 bg-green-50'
                            : 'border-gray-200 hover:border-green-300'
                        }`}
                      >
                        <div className="flex items-center space-x-3 mb-2">
                          <div className="text-green-600">{method.icon}</div>
                          <h4 className="font-semibold text-gray-900">{method.name}</h4>
                        </div>
                        <p className="text-gray-600 text-sm">{method.description}</p>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Donor Information */}
                <div className="mb-8">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Your Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                      <input
                        type="text"
                        required
                        value={donorInfo.name}
                        onChange={(e) => setDonorInfo({...donorInfo, name: e.target.value})}
                        className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                      <input
                        type="email"
                        required
                        value={donorInfo.email}
                        onChange={(e) => setDonorInfo({...donorInfo, email: e.target.value})}
                        className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Phone (Optional)</label>
                      <input
                        type="tel"
                        value={donorInfo.phone}
                        onChange={(e) => setDonorInfo({...donorInfo, phone: e.target.value})}
                        className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">Message (Optional)</label>
                      <textarea
                        rows={3}
                        value={donorInfo.message}
                        onChange={(e) => setDonorInfo({...donorInfo, message: e.target.value})}
                        placeholder="Share why you're donating or any special instructions..."
                        className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                </div>

                {/* Submit Button */}
                <div className="text-center">
                  <button
                    type="submit"
                    className="mx-auto flex w-full max-w-md items-center justify-center rounded-xl bg-green-600 px-4 py-4 text-base font-semibold text-white shadow-lg transition-all hover:scale-105 hover:bg-green-700 hover:shadow-green-500/30 sm:px-12 sm:text-lg"
                  >
                    <Heart className="w-6 h-6 mr-3" />
                    Donate ${(donationAmount === 'custom' ? customAmount : donationAmount) || '0'}
                    <ArrowRight className="w-6 h-6 ml-3" />
                  </button>
                  <p className="text-gray-500 text-sm mt-4">
                    Your donation is secure and tax-deductible. You'll receive a receipt via email.
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Trusted by Thousands
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Join our community of donors who are making a real difference
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <Award className="w-12 h-12 text-yellow-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">UN Partnership</h3>
              <p className="text-gray-600">Official partner of UN Environment Programme</p>
            </div>
            <div className="text-center">
              <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">95% to Programs</h3>
              <p className="text-gray-600">Only 5% goes to administration and fundraising</p>
            </div>
            <div className="text-center">
              <Users className="w-12 h-12 text-blue-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Community Impact</h3>
              <p className="text-gray-600">Direct support to refugee and host communities</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Donation;