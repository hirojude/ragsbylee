"use client";

import { Button } from "@nextui-org/react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { 
  ArrowRight, 
  Instagram, 
  Facebook, 
  Twitter, 
  Star, 
  Award, 
  Heart, 
  Users, 
  ShoppingBag, 
  Truck, 
  Shield, 
  Clock, 
  ChevronDown 
} from "lucide-react";

export default function AboutUs() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [testimonialIndex, setTestimonialIndex] = useState(0);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);

  // Handle scroll progress
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.body.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / totalHeight) * 100;
      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Testimonials data
  const testimonials = [
    {
      text: "The quality of these durags is amazing! They're comfortable and stylish. Will definitely buy again!",
      author: "John D.",
      stars: 5
    },
    {
      text: "Best customer service ever! Fast shipping and beautiful products. Highly recommended!",
      author: "Sarah M.",
      stars: 5
    },
    {
      text: "These durags hold my waves perfectly. The fabric is breathable and the designs are unique!",
      author: "Mike T.",
      stars: 5
    },
    {
      text: "I've tried many brands, but RagsByLee offers the perfect balance of style and functionality. Love it!",
      author: "Tanya B.",
      stars: 5
    }
  ];

  // Handle testimonial cycling
  useEffect(() => {
    const interval = setInterval(() => {
      setTestimonialIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [testimonials.length]);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <div className="relative w-full min-h-screen overflow-hidden">
      {/* Scroll Progress Indicator */}
      <div 
        className="fixed top-0 left-0 h-1 bg-gradient-to-r from-blue-400 to-purple-500 z-50"
        style={{ width: `${scrollProgress}%` }}
      />

      {/* Background Video with Filter */}
      <div className="fixed top-0 left-0 w-full h-full">
        {!isVideoLoaded && (
          <div className="absolute inset-0 bg-black z-0 flex items-center justify-center">
            <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
          </div>
        )}
        <video
          className={`absolute top-0 left-0 w-full h-full object-cover z-0 transition-opacity duration-1000 ${isVideoLoaded ? 'opacity-100' : 'opacity-0'}`}
          autoPlay
          loop
          muted
          playsInline
          src="/videos/ragsbylee-showcase.mp4"
          onLoadedData={() => setIsVideoLoaded(true)}
          loading="lazy"
          style={{ filter: 'contrast(1.2) saturate(1.1) brightness(0.5)', animation: 'slowFade 1s ease-in-out' }}
        ></video>
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/50 to-black/80 z-10"></div>
      </div>

      {/* Content */}
      <div className="relative z-20">
        {/* Hero Section */}
        <section className="h-screen flex items-center justify-center px-6 md:px-20 lg:px-40">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="text-center"
          >
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="mb-6 inline-block"
            >
              <div className="h-1 w-20 bg-gradient-to-r from-blue-400 to-purple-400 mx-auto mb-6"></div>
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="text-4xl md:text-6xl font-bold mb-6 uppercase tracking-wide text-shadow"
              style={{ textShadow: '0 4px 12px rgba(0,0,0,0.5)' }}
            >
              About <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 relative">
                RagsByLee
                <span className="absolute -bottom-2 left-0 w-full h-0.5 bg-gradient-to-r from-blue-400 to-purple-400"></span>
              </span>
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="text-lg md:text-xl max-w-3xl mx-auto leading-relaxed text-gray-200"
            >
              Experience luxury with our premium durags, designed for the modern individual. Crafted from high-quality materials, featuring stylish designs, and built for ultimate comfort, our durags are the perfect blend of fashion and function. Unisex and versatile, they offer a sleek fit for everyone, ensuring you look and feel your best.
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="mt-10 flex flex-row gap-6 justify-center"
            >
              <Link href="/">
                <Button 
                  className="group bg-gradient-to-r from-purple-500 to-blue-500 hover:bg-gradient-to-br hover:from-blue-600 hover:to-purple-600 text-white px-8 py-6 text-lg transition-all duration-300 flex items-center gap-3 shadow-lg hover:shadow-xl"
                  aria-label="Shop Now"
                >
                  Shop Now
                  <ArrowRight className="group-hover:translate-x-2 transition-transform duration-300" />
                </Button>
              </Link>
              <Link href="/">
                <Button 
                  className="bg-white/10 backdrop-blur-md hover:bg-white/20 text-white px-8 py-6 text-lg transition-all duration-300 border border-white/20 hover:border-white/40 shadow-lg"
                  aria-label="Contact Us"
                >
                  Contact Us
                </Button>
              </Link>
            </motion.div>
          </motion.div>
          
          {/* Scroll Indicator */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.8 }}
            className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center"
          >
            <p className="text-gray-400 text-sm mb-2">Scroll to explore</p>
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
            >
              <ChevronDown className="w-6 h-6 text-gray-400" />
            </motion.div>
          </motion.div>
        </section>

        {/* Decorative Divider */}
        <div className="relative py-4">
          <div className="absolute left-1/2 transform -translate-x-1/2 w-1/2 h-0.5 bg-gradient-to-r from-transparent via-purple-400 to-transparent"></div>
        </div>

        {/* Stats Section */}
        <section className="py-20 px-6 md:px-20 lg:px-40 bg-black/40 backdrop-blur-md">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto"
          >
            <motion.div 
              variants={itemVariants}
              className="text-center p-8 rounded-xl bg-white/5 backdrop-blur-md hover:bg-white/10 transition-all duration-500 transform hover:-translate-y-2 border border-white/5 hover:border-white/20 shadow-lg"
            >
              <Star className="w-12 h-12 text-blue-400 mx-auto mb-6" />
              <h3 className="text-4xl font-bold text-blue-400 mb-3">1000+</h3>
              <p className="text-gray-300">Happy Customers</p>
            </motion.div>
            
            <motion.div 
              variants={itemVariants}
              className="text-center p-8 rounded-xl bg-white/5 backdrop-blur-md hover:bg-white/10 transition-all duration-500 transform hover:-translate-y-2 border border-white/5 hover:border-white/20 shadow-lg"
            >
              <Award className="w-12 h-12 text-purple-400 mx-auto mb-6" />
              <h3 className="text-4xl font-bold text-purple-400 mb-3">50+</h3>
              <p className="text-gray-300">Unique Designs</p>
            </motion.div>
            
            <motion.div 
              variants={itemVariants}
              className="text-center p-8 rounded-xl bg-white/5 backdrop-blur-md hover:bg-white/10 transition-all duration-500 transform hover:-translate-y-2 border border-white/5 hover:border-white/20 shadow-lg"
            >
              <Clock className="w-12 h-12 text-blue-400 mx-auto mb-6" />
              <h3 className="text-4xl font-bold text-blue-400 mb-3">24/7</h3>
              <p className="text-gray-300">Customer Support</p>
            </motion.div>
          </motion.div>
        </section>

        {/* Decorative Divider */}
        <div className="relative py-4">
          <div className="absolute left-1/2 transform -translate-x-1/2 w-1/2 h-0.5 bg-gradient-to-r from-transparent via-blue-400 to-transparent"></div>
        </div>

        {/* Features Section */}
        <section className="py-20 px-6 md:px-20 lg:px-40">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="max-w-6xl mx-auto"
          >
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">Why Choose Us</h2>
              <div className="h-1 w-20 bg-gradient-to-r from-blue-400 to-purple-400 mx-auto"></div>
            </div>
            
            <motion.div 
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
            >
              <motion.div 
                variants={itemVariants}
                whileHover={{ scale: 1.05 }}
                className="p-8 rounded-xl bg-white/5 backdrop-blur-md hover:bg-white/10 transition-all duration-300 border border-white/5 hover:border-white/20 shadow-lg"
              >
                <Heart className="w-12 h-12 text-purple-400 mb-6" />
                <h3 className="text-xl font-semibold text-white mb-3">Quality Materials</h3>
                <p className="text-gray-300">Premium fabrics and materials for ultimate comfort and longevity</p>
              </motion.div>
              
              <motion.div 
                variants={itemVariants}
                whileHover={{ scale: 1.05 }}
                className="p-8 rounded-xl bg-white/5 backdrop-blur-md hover:bg-white/10 transition-all duration-300 border border-white/5 hover:border-white/20 shadow-lg"
              >
                <Truck className="w-12 h-12 text-blue-400 mb-6" />
                <h3 className="text-xl font-semibold text-white mb-3">Fast Delivery</h3>
                <p className="text-gray-300">Quick and reliable shipping worldwide with tracking included</p>
              </motion.div>
              
              <motion.div 
                variants={itemVariants}
                whileHover={{ scale: 1.05 }}
                className="p-8 rounded-xl bg-white/5 backdrop-blur-md hover:bg-white/10 transition-all duration-300 border border-white/5 hover:border-white/20 shadow-lg"
              >
                <Shield className="w-12 h-12 text-purple-400 mb-6" />
                <h3 className="text-xl font-semibold text-white mb-3">Secure Payment</h3>
                <p className="text-gray-300">Safe and encrypted payment processing with multiple options</p>
              </motion.div>
              
              <motion.div 
                variants={itemVariants}
                whileHover={{ scale: 1.05 }}
                className="p-8 rounded-xl bg-white/5 backdrop-blur-md hover:bg-white/10 transition-all duration-300 border border-white/5 hover:border-white/20 shadow-lg"
              >
                <Users className="w-12 h-12 text-blue-400 mb-6" />
                <h3 className="text-xl font-semibold text-white mb-3">Dedicated Support</h3>
                <p className="text-gray-300">24/7 customer service assistance from our expert team</p>
              </motion.div>
            </motion.div>
          </motion.div>
        </section>

        {/* Decorative Divider */}
        <div className="relative py-4">
          <div className="absolute left-1/2 transform -translate-x-1/2 w-1/2 h-0.5 bg-gradient-to-r from-transparent via-purple-400 to-transparent"></div>
        </div>

        {/* Testimonials Section - Now as Carousel */}
        <section className="py-20 px-6 md:px-20 lg:px-40 bg-black/40 backdrop-blur-md">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto text-center"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">What Our Customers Say</h2>
            <div className="h-1 w-20 bg-gradient-to-r from-blue-400 to-purple-400 mx-auto mb-12"></div>
            
            <div className="relative">
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 100 }}
                  animate={{ 
                    opacity: index === testimonialIndex ? 1 : 0,
                    x: index === testimonialIndex ? 0 : 100,
                    position: index === testimonialIndex ? 'relative' : 'absolute'
                  }}
                  transition={{ duration: 0.5 }}
                  className="w-full p-8 rounded-xl bg-white/5 backdrop-blur-md border border-white/10 shadow-xl"
                  style={{ top: 0, left: 0, display: index === testimonialIndex ? 'block' : 'none' }}
                >
                  <div className="flex items-center gap-2 mb-6 justify-center">
                    {[...Array(testimonial.stars)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-yellow-400" fill="#FBBF24" />
                    ))}
                  </div>
                  <p className="text-gray-300 mb-6 text-lg italic">"{testimonial.text}"</p>
                  <p className="text-white font-semibold">- {testimonial.author}</p>
                </motion.div>
              ))}
            </div>
            
            {/* Carousel Controls */}
            <div className="flex justify-center mt-8 gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setTestimonialIndex(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === testimonialIndex ? 'bg-blue-400 w-6' : 'bg-white/30'
                  }`}
                  aria-label={`View testimonial ${index + 1}`}
                />
              ))}
            </div>
          </motion.div>
        </section>

        {/* Decorative Divider */}
        <div className="relative py-4">
          <div className="absolute left-1/2 transform -translate-x-1/2 w-1/2 h-0.5 bg-gradient-to-r from-transparent via-blue-400 to-transparent"></div>
        </div>

        {/* Social Proof Section */}
        <section className="py-20 px-6 md:px-20 lg:px-40">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto text-center"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">Join Our Community</h2>
            <div className="h-1 w-20 bg-gradient-to-r from-blue-400 to-purple-400 mx-auto mb-12"></div>
            
            <div className="flex justify-center gap-6">
              <motion.a 
                href="#" 
                whileHover={{ scale: 1.1, rotate: 5 }}
                whileTap={{ scale: 0.95 }}
                className="p-4 rounded-full bg-gradient-to-br from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 transition-all duration-300 shadow-lg"
                aria-label="Instagram"
              >
                <Instagram className="w-6 h-6 text-white" />
              </motion.a>
              <motion.a 
                href="#" 
                whileHover={{ scale: 1.1, rotate: 5 }}
                whileTap={{ scale: 0.95 }}
                className="p-4 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 transition-all duration-300 shadow-lg"
                aria-label="Facebook"
              >
                <Facebook className="w-6 h-6 text-white" />
              </motion.a>
              <motion.a 
                href="#" 
                whileHover={{ scale: 1.1, rotate: 5 }}
                whileTap={{ scale: 0.95 }}
                className="p-4 rounded-full bg-gradient-to-br from-blue-400 to-sky-500 hover:from-blue-500 hover:to-sky-600 transition-all duration-300 shadow-lg"
                aria-label="Twitter"
              >
                <Twitter className="w-6 h-6 text-white" />
              </motion.a>
            </div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              viewport={{ once: true }}
              className="mt-12 p-6 border border-white/10 rounded-xl bg-white/5 backdrop-blur-md"
            >
              <p className="text-white text-lg mb-4">Stay updated with our latest designs and promotions</p>
              <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-3 rounded-lg bg-black/30 border border-white/20 text-white focus:outline-none focus:border-blue-400"
                  aria-label="Email address"
                />
                <Button 
                  className="bg-gradient-to-r from-blue-500 to-purple-500 hover:bg-gradient-to-br hover:from-blue-600 hover:to-purple-600 text-white px-6 py-3 rounded-lg transition-all duration-300"
                >
                  Subscribe
                </Button>
              </div>
            </motion.div>
          </motion.div>
        </section>
        
        {/* Footer with Reduced Motion Option */}
        <footer className="py-6 bg-black/70 backdrop-blur-md text-center text-gray-400">
          <button 
            className="text-sm underline focus:outline-none focus:text-blue-400 hover:text-blue-400 transition-colors"
            aria-label="Toggle reduced motion"
            onClick={() => {
              // This would be implemented with actual reduced motion state
              alert("Reduced motion preference toggled. This would disable animations for accessibility.");
            }}
          >
            Toggle reduced motion
          </button>
          <p className="mt-2">© 2025 RagsByLee. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
}