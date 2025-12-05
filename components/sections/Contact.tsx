"use client";

import { useState } from 'react';
import { Microscope, Briefcase, Shield, CheckCircle2, Phone, Mail, MapPin, Sparkles, ArrowRight } from 'lucide-react';

const services = [
  {
    icon: <Microscope className="w-10 h-10" />,
    title: "Research & Discovery",
    description: "We dive deep into your business needs, analyzing market trends and user behaviors to craft data-driven solutions that give you a competitive edge."
  },
  {
    icon: <Briefcase className="w-10 h-10" />,
    title: "Industry Expertise",
    description: "Our seasoned team brings years of experience across fintech, healthcare, e-commerce, and enterprise sectors to deliver solutions that work."
  },
  {
    icon: <Shield className="w-10 h-10" />,
    title: "Quality Assurance",
    description: "Rigorous testing and quality control ensure your software is secure, scalable, and performs flawlessly under real-world conditions."
  }
];

const features = [
  { text: "Agile Development", color: "text-emerald-600" },
  { text: "Scalable Architecture", color: "text-emerald-600" },
  { text: "Modern Tech Stack", color: "text-emerald-600" },
  { text: "24/7 Support", color: "text-emerald-600" }
];

export default function Contact() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    companyOrganization: '',
    email: '',
    phone: '',
    message: ''
  });

  const handleSubmit = () => {
    console.log('Form submitted:', formData);
  };

  const handleChange = (field: string, value: string) => {
    setFormData({
      ...formData,
      [field]: value
    });
  };

  return (
    <section className="relative py-24 bg-gradient-to-b from-gray-50 to-white overflow-hidden">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, rgb(0 0 0 / 0.15) 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }}></div>
      </div>

      <div className="container mx-auto px-4 relative z-10 max-w-7xl">
        {/* What We Do Section with animated background text */}
        <div className="relative text-center mb-20">
          {/* Large background "Services" text - animated */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none w-full overflow-hidden">
            <h3 className="text-[4rem] md:text-[14rem] lg:text-[14rem] font-black text-gray-200/40 tracking-tighter select-none whitespace-nowrap text-center leading-none animate-pulse">
              What we Do
            </h3>
          </div>
          
          <div className="relative">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Sparkles className="w-5 h-5 text-emerald-500 animate-pulse" />
              <span className="text-emerald-600 font-semibold uppercase text-sm tracking-wider">What We Offer</span>
              <Sparkles className="w-5 h-5 text-emerald-500 animate-pulse" />
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              What We Do
            </h2>
          </div>
        </div>

        {/* Service Cards with stagger animation */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
          {services.map((service, index) => (
            <div 
              key={index} 
              className="group text-center hover:scale-105 transition-all duration-500 ease-out"
              style={{
                animation: `fadeInUp 0.6s ease-out ${index * 0.2}s both`
              }}
            >
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-emerald-500 text-white mb-6 group-hover:bg-emerald-600 group-hover:shadow-xl group-hover:shadow-emerald-500/30 transition-all duration-300">
                {service.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-emerald-600 transition-colors duration-300">
                {service.title}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                {service.description}
              </p>
            </div>
          ))}
        </div>

        {/* Creative Business Section with slide-in animation */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-24 items-center">
          {/* Image */}
          <div className="relative group" style={{ animation: 'slideInLeft 0.8s ease-out' }}>
            <div className="absolute inset-0 bg-emerald-500/20 rounded-lg blur-xl group-hover:blur-2xl transition-all duration-500"></div>
            <img 
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&h=400&fit=crop"
              alt="Softrinx team collaboration"
              className="relative rounded-lg shadow-2xl w-full h-[400px] object-cover group-hover:scale-[1.02] transition-transform duration-500"
            />
          </div>

          {/* Content */}
          <div style={{ animation: 'slideInRight 0.8s ease-out' }}>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Transform Your Vision Into Powerful Software Solutions
            </h2>
            <p className="text-gray-600 mb-8 leading-relaxed">
              At Softrinx, we combine cutting-edge technology with deep industry expertise to build software that drives real business results. From enterprise applications to mobile experiences, we deliver solutions that scale with your ambitions.
            </p>

            {/* Features Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {features.map((feature, index) => (
                <div 
                  key={index} 
                  className="flex items-center gap-3 group hover:translate-x-2 transition-transform duration-300"
                  style={{ animation: `fadeIn 0.5s ease-out ${0.9 + index * 0.1}s both` }}
                >
                  <div className="flex-shrink-0 w-5 h-5 rounded-full bg-emerald-500 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <CheckCircle2 className="w-3 h-3 text-white" />
                  </div>
                  <span className={`font-semibold ${feature.color}`}>
                    {feature.text}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Contact Section with background text effect */}
        <div className="relative">
          {/* Large background "Contact" text - animated */}
          <div className="absolute left-1/2 top-0 -translate-x-1/2 pointer-events-none w-full overflow-hidden">
            <h3 className="text-[8rem] md:text-[12rem] lg:text-[16rem] font-black text-gray-200/30 tracking-tighter select-none whitespace-nowrap text-center leading-none animate-pulse">
              Contact
            </h3>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 relative">
            {/* Left Side - Contact Info */}
            <div style={{ animation: 'fadeInUp 0.8s ease-out' }}>
              <div className="flex items-center gap-2 mb-4">
                <Sparkles className="w-5 h-5 text-emerald-500 animate-pulse" />
                <span className="text-emerald-600 font-semibold uppercase text-sm tracking-wider">Get In Touch</span>
              </div>
              
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Let's Build Something Great Together
              </h2>
              <p className="text-gray-600 mb-8 leading-relaxed">
                Have a project in mind? Whether you're looking to build a new application, modernize your systems, or need expert technical guidance, our team is ready to help you succeed.
              </p>

              {/* Call Us Box */}
              <div className="border-2 border-emerald-500 rounded-lg p-6 mb-8 inline-block hover:shadow-lg hover:shadow-emerald-500/20 transition-all duration-300 group">
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-emerald-500 group-hover:rotate-12 transition-transform duration-300" />
                  <span className="text-emerald-600 font-semibold">Call Us Now:</span>
                  <span className="text-gray-900 font-bold text-lg">+880 123 456 6789</span>
                </div>
              </div>

              {/* Office Locations */}
              <div className="space-y-6">
                <div className="group hover:translate-x-2 transition-transform duration-300">
                  <button className="flex items-center gap-2 text-gray-900 font-bold mb-3 hover:text-emerald-600 transition-colors">
                    <MapPin className="w-5 h-5 text-emerald-500" />
                    <span>Headquarters</span>
                  </button>
                  <p className="text-gray-600 text-sm ml-7">
                    Softrinx Ltd, Innovation Tower, 123 Tech Boulevard, Dhaka 1212, Bangladesh. 
                    Our main hub where we ideate, innovate, and deliver world-class software solutions.
                  </p>
                </div>

                <div className="group hover:translate-x-2 transition-transform duration-300">
                  <button className="flex items-center gap-2 text-gray-900 font-bold mb-3 hover:text-emerald-600 transition-colors">
                    <MapPin className="w-5 h-5 text-emerald-500" />
                    <span>Development Center</span>
                  </button>
                  <p className="text-gray-600 text-sm ml-7">
                    456 Silicon Street, Chittagong 4000, Bangladesh. Our dedicated R&D facility 
                    focused on emerging technologies and cutting-edge software development.
                  </p>
                </div>

                <div className="group hover:translate-x-2 transition-transform duration-300">
                  <button className="flex items-center gap-2 text-gray-900 font-bold mb-3 hover:text-emerald-600 transition-colors">
                    <Mail className="w-5 h-5 text-emerald-500" />
                    <span>Email Support</span>
                  </button>
                  <p className="text-gray-600 text-sm ml-7">
                    Reach us at hello@softrinx.com for general inquiries, or support@softrinx.com 
                    for technical assistance. We typically respond within 24 hours.
                  </p>
                </div>
              </div>
            </div>

            {/* Right Side - Contact Form (White themed) */}
            <div 
              className="bg-white rounded-lg p-8 shadow-xl border border-gray-200 hover:shadow-2xl transition-shadow duration-500"
              style={{ animation: 'fadeInUp 1s ease-out' }}
            >
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                Get a Free Consultation
              </h3>
              <p className="text-gray-600 text-sm mb-8">Fill out the form and our team will get back to you within 24 hours.</p>

              <div className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-700 text-sm font-medium mb-2">
                      First Name *
                    </label>
                    <input
                      type="text"
                      value={formData.firstName}
                      onChange={(e) => handleChange('firstName', e.target.value)}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-300"
                      placeholder="John"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 text-sm font-medium mb-2">
                      Last Name *
                    </label>
                    <input
                      type="text"
                      value={formData.lastName}
                      onChange={(e) => handleChange('lastName', e.target.value)}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-300"
                      placeholder="Doe"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-gray-700 text-sm font-medium mb-2">
                    Company/Organization *
                  </label>
                  <input
                    type="text"
                    value={formData.companyOrganization}
                    onChange={(e) => handleChange('companyOrganization', e.target.value)}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-300"
                    placeholder="Your Company Name"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 text-sm font-medium mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleChange('email', e.target.value)}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-300"
                    placeholder="john@company.com"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 text-sm font-medium mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleChange('phone', e.target.value)}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-300"
                    placeholder="+880 123 456 789"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 text-sm font-medium mb-2">
                    Project Details *
                  </label>
                  <textarea
                    value={formData.message}
                    onChange={(e) => handleChange('message', e.target.value)}
                    rows={5}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-300 resize-none"
                    placeholder="Tell us about your project, timeline, and requirements..."
                  />
                </div>

                <button
                  onClick={handleSubmit}
                  className="group w-full py-4 bg-emerald-500 hover:bg-emerald-600 text-white font-bold rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-emerald-500/50 flex items-center justify-center gap-2"
                >
                  Send Message
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CSS Animations */}
      <style jsx global>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
      `}</style>
    </section>
  );
}