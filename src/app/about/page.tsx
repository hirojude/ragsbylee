"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Heart, Star, Users } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-purple-900 to-blue-900 text-white py-16 relative overflow-hidden pt-24">
        <div className="absolute inset-0 bg-[url('/images/about/pattern.svg')] opacity-10"></div>
        <div className="container mx-auto px-4 relative">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-5xl font-bold mb-4"
          >
            About RagsByLee
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-xl text-purple-100"
          >
            Crafting premium durags for style and comfort
          </motion.p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        {/* Story Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="bg-white rounded-xl shadow-sm p-8 mb-12 hover:shadow-md transition-shadow duration-300"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Story</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                Founded in 2024, RagsByLee emerged from a passion for quality headwear and a commitment to style. 
                What started as a small collection of premium durags has grown into a trusted brand known for 
                exceptional quality and unique designs.
              </p>
              <p className="text-gray-600 leading-relaxed">
                Our journey began with a simple idea: to create durags that combine comfort, durability, and 
                style. Today, we&apos;re proud to offer a diverse collection that caters to various preferences and needs.
              </p>
            </div>
            <div className="relative aspect-square rounded-lg overflow-hidden group">
              <Image
                src="/images/products/about/story.jpg"
                alt="Our Story"
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
          </div>
        </motion.div>

        {/* Mission Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="bg-white rounded-xl shadow-sm p-8 mb-12 hover:shadow-md transition-shadow duration-300"
        >
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Mission</h2>
            <p className="text-gray-600 leading-relaxed text-lg">
              To provide premium quality durags that not only protect and style your hair but also make a statement. 
              We believe in creating products that combine traditional craftsmanship with modern design, ensuring 
              both functionality and fashion-forward appeal.
            </p>
          </div>
        </motion.div>

        {/* Values Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-all duration-300 group"
          >
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-4 group-hover:bg-purple-200 transition-colors duration-300">
              <Star className="w-6 h-6 text-purple-900" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Quality</h3>
            <p className="text-gray-600">
              We use only the finest materials and maintain strict quality control to ensure our products meet 
              the highest standards.
            </p>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-all duration-300 group"
          >
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-4 group-hover:bg-purple-200 transition-colors duration-300">
              <Heart className="w-6 h-6 text-purple-900" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Innovation</h3>
            <p className="text-gray-600">
              We continuously explore new designs and materials to bring you the latest trends in durag fashion.
            </p>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            viewport={{ once: true }}
            className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-all duration-300 group"
          >
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-4 group-hover:bg-purple-200 transition-colors duration-300">
              <Users className="w-6 h-6 text-purple-900" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Customer Focus</h3>
            <p className="text-gray-600">
              Your satisfaction is our priority. We&apos;re committed to providing excellent service and products 
              that exceed expectations.
            </p>
          </motion.div>
        </div>

        {/* Team Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="bg-white rounded-xl shadow-sm p-8 hover:shadow-md transition-shadow duration-300"
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Our Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Lee Johnson",
                role: "Founder & CEO",
                image: "/images/products/about/team1.jpg"
              },
              {
                name: "Sarah Chen",
                role: "Design Director",
                image: "/images/products/about/team2.jpg"
              },
              {
                name: "Marcus Rodriguez",
                role: "Quality Control Manager",
                image: "/images/products/about/team3.jpg"
              }
            ].map((member, index) => (
              <motion.div 
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="text-center group"
              >
                <div className="relative w-48 h-48 mx-auto mb-4 rounded-full overflow-hidden">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <h3 className="text-xl font-bold text-gray-900 group-hover:text-purple-900 transition-colors duration-300">
                  {member.name}
                </h3>
                <p className="text-gray-600">{member.role}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
} 