"use client";

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Target, Zap, Rocket, Award, Building2, Users, Shield, Globe } from 'lucide-react';

const HERO_IMAGES = [
  'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1920&q=80&fit=crop&crop=center',
  'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1920&q=80&fit=crop&crop=center',
  'https://images.unsplash.com/photo-1552664730-d307ca884978?w=1920&q=80&fit=crop&crop=center',
];

const Hero = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const contentRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % HERO_IMAGES.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (contentRef.current) {
      observer.observe(contentRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-gray-900 via-black to-gray-900">
      {/* Background images with overlay */}
      <div className="absolute inset-0">
        {HERO_IMAGES.map((img, idx) => (
          <div
            key={idx}
            className={`absolute inset-0 transition-all duration-1000 ${
              idx === currentImageIndex
                ? 'opacity-100 scale-100'
                : 'opacity-0 scale-105'
            }`}
          >
            <Image
              src={img}
              alt="Professional software development"
              fill
              className="object-cover"
              priority={idx === 0}
              quality={100}
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/70" />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
          </div>
        ))}
      </div>

      {/* Main content container */}
      <div className="container mx-auto px-4 lg:px-8 py-20 lg:py-32 relative z-20">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          
          {/* Left column - Text content */}
          <div 
            ref={contentRef}
            className={`transition-all duration-700 ${
              isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
            }`}
          >
            {/* Professional badge */}
            <div className="inline-flex items-center gap-3 px-5 py-3 mb-10 bg-gradient-to-r from-emerald-500/10 to-blue-500/10 backdrop-blur-sm rounded-xl border border-emerald-500/20">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-sm font-semibold text-emerald-300">
                  Enterprise-Grade Development
                </span>
              </div>
              <div className="h-4 w-px bg-emerald-500/30 mx-2" />
              <span className="text-xs text-gray-400">Since 2008</span>
            </div>

            {/* Main headline */}
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-8 leading-tight">
              <span className="block text-white mb-4">
                Build Software That
              </span>
              <span className="block bg-gradient-to-r from-emerald-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent">
                Transforms Business
              </span>
            </h1>

            {/* Subheadline */}
            <p className="text-xl md:text-2xl text-gray-300 mb-10 leading-relaxed max-w-2xl">
              We architect and deploy high-performance applications that drive 
              measurable results. From startups to Fortune 500, we deliver 
              enterprise-grade solutions with precision.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-5 mb-16">
              <Link
                href="/contact"
                className="group relative px-10 py-5 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white font-semibold rounded-xl overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-emerald-500/25 hover:-translate-y-1"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-600 to-emerald-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <span className="relative z-10 flex items-center justify-center gap-3 text-lg">
                  Schedule Consultation
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                </span>
              </Link>

              <Link
                href="/portfolio"
                className="group px-10 py-5 bg-white/5 backdrop-blur-sm text-white font-semibold rounded-xl border border-white/20 hover:border-emerald-400/50 hover:bg-white/10 transition-all duration-300 hover:-translate-y-1"
              >
                <span className="flex items-center justify-center gap-3 text-lg">
                  View Case Studies
                  <span className="text-emerald-400 opacity-0 group-hover:opacity-100 transition-opacity">
                    →
                  </span>
                </span>
              </Link>
            </div>

            {/* Client logos section - Using lucide icons instead of emojis */}
            <div className="mb-12">
              <p className="text-sm text-gray-400 uppercase tracking-wider mb-6">
                Trusted By Industry Leaders
              </p>
              <div className="flex items-center gap-8">
                <div className="p-4 bg-white/5 rounded-xl border border-white/10">
                  <Building2 className="w-6 h-6 text-gray-300" />
                </div>
                <div className="p-4 bg-white/5 rounded-xl border border-white/10">
                  <Globe className="w-6 h-6 text-gray-300" />
                </div>
                <div className="p-4 bg-white/5 rounded-xl border border-white/10">
                  <Users className="w-6 h-6 text-gray-300" />
                </div>
                <div className="p-4 bg-white/5 rounded-xl border border-white/10">
                  <Shield className="w-6 h-6 text-gray-300" />
                </div>
                <span className="text-sm text-gray-500 ml-2">+ More Enterprise Clients</span>
              </div>
            </div>
          </div>

          {/* Right column - Floating person image with stats */}
          <div className="relative">
            {/* Floating person image - Replace with your PNG */}
            <div className="relative h-[500px] rounded-2xl overflow-hidden border-2 border-emerald-500/20 shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-blue-500/10 flex items-center justify-center">
                {/* Placeholder for person PNG - Replace this div with your Image component */}
                <div className="relative w-80 h-80">
                  {/* This would be your PNG image - using placeholder for now */}
                  <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/20 to-blue-500/20 rounded-full flex items-center justify-center">
                    <div className="text-center">
                      <Users className="w-32 h-32 text-emerald-400/30 mx-auto mb-4" />
                      <div className="text-lg font-semibold text-emerald-300">
                        Your PNG Here
                      </div>
                      <div className="text-sm text-gray-400 mt-2">
                        Professional pointing to left
                      </div>
                    </div>
                  </div>
                  
                  {/* Floating stats around the person */}
                  <div className="absolute -top-6 -right-6 bg-gradient-to-br from-emerald-500/20 to-emerald-600/20 backdrop-blur-sm rounded-xl p-4 border border-emerald-500/30 shadow-lg">
                    <div className="text-2xl font-bold text-white">500+</div>
                    <div className="text-xs text-emerald-300">Projects</div>
                  </div>
                  
                  <div className="absolute -bottom-6 -left-6 bg-gradient-to-br from-blue-500/20 to-blue-600/20 backdrop-blur-sm rounded-xl p-4 border border-blue-500/30 shadow-lg">
                    <div className="text-2xl font-bold text-white">99.7%</div>
                    <div className="text-xs text-blue-300">Satisfaction</div>
                  </div>
                  
                  <div className="absolute top-1/2 -right-12 transform -translate-y-1/2 bg-gradient-to-br from-purple-500/20 to-purple-600/20 backdrop-blur-sm rounded-xl p-4 border border-purple-500/30 shadow-lg">
                    <div className="text-2xl font-bold text-white">15+</div>
                    <div className="text-xs text-purple-300">Years</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Stats at bottom of image section */}
            <div className="grid grid-cols-3 gap-4 mt-8">
              {[
                { value: '250+', label: 'Projects', icon: Target, color: 'text-emerald-400' },
                { value: '40+', label: 'Engineers', icon: Users, color: 'text-blue-400' },
                { value: '24/7', label: 'Support', icon: Shield, color: 'text-purple-400' },
              ].map((stat, idx) => {
                const Icon = stat.icon;
                return (
                  <div
                    key={idx}
                    className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10 text-center"
                  >
                    <Icon className={`w-5 h-5 ${stat.color} mx-auto mb-2`} />
                    <div className="text-2xl font-bold text-white">{stat.value}</div>
                    <div className="text-xs text-gray-400">{stat.label}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 hidden lg:block">
          <div className="flex flex-col items-center">
            <span className="text-sm text-gray-500 mb-2 animate-pulse">
              Scroll to explore
            </span>
            <div className="w-6 h-10 rounded-full border border-gray-600 flex justify-center">
              <div className="w-1 h-3 rounded-full bg-emerald-400 mt-2 animate-bounce" />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-black to-transparent pointer-events-none" />
    </section>
  );
};

export default Hero;