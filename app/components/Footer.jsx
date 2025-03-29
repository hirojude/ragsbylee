"use client";

// import { Mail, MapPin, Phone } from "lucide-react";
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import logo from "../../public/by lee logo.png";
export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
    <div className="container mx-auto px-4 py-16">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
        {/* Brand Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <Link href="/" className="flex items-center">
            <img src={logo.src} alt="By Lee Logo" className="h-8" />
            <span className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              RagsByLee
            </span>
          </Link>
          <p className="mt-4 text-gray-400 leading-relaxed">
            Premium durags for the modern gentleman. Quality materials, stylish designs, and ultimate comfort.
          </p>
          <div className="flex space-x-4 mt-6">
            <a href="#" className="text-gray-400 hover:text-white transition-colors">
              <Facebook className="w-5 h-5" />
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors">
              <Instagram className="w-5 h-5" />
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors">
              <Twitter className="w-5 h-5" />
            </a>
          </div>
        </motion.div>

        {/* Quick Links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          viewport={{ once: true }}
        >
          <h3 className="text-lg font-semibold mb-6">Quick Links</h3>
          <ul className="space-y-3">
            <li>
              <Link href="/" className="text-gray-400 hover:text-white transition-colors">
                Products
              </Link>
            </li>
            <li>
              <Link href="/about" className="text-gray-400 hover:text-white transition-colors">
                About Us
              </Link>
            </li>
            <li>
              <Link href="/" className="text-gray-400 hover:text-white transition-colors">
                Contact
              </Link>
            </li>
            <li>
              <Link href="/" className="text-gray-400 hover:text-white transition-colors">
                Blog
              </Link>
            </li>
          </ul>
        </motion.div>

        {/* Customer Service
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <h3 className="text-lg font-semibold mb-6">Customer Service</h3>
          <ul className="space-y-3">
            <li>
              <Link href="/shipping" className="text-gray-400 hover:text-white transition-colors">
                Shipping Info
              </Link>
            </li>
            <li>
              <Link href="/returns" className="text-gray-400 hover:text-white transition-colors">
                Returns
              </Link>
            </li>
            <li>
              <Link href="/faq" className="text-gray-400 hover:text-white transition-colors">
                FAQ
              </Link>
            </li>
            <li>
              <Link href="/track-order" className="text-gray-400 hover:text-white transition-colors">
                Track Order
              </Link>
            </li>
          </ul>
        </motion.div> */}

        {/* Contact Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <h3 className="text-lg font-semibold mb-6">Contact Us</h3>
          <ul className="space-y-4">
            <li className="flex items-start space-x-3">
              <Mail className="w-5 h-5 text-purple-400 mt-1" />
              <span className="text-gray-400">support@ragsbylee.com</span>
            </li>
            <li className="flex items-start space-x-3">
              <Phone className="w-5 h-5 text-purple-400 mt-1" />
              <span className="text-gray-400">+233 24 123 4567</span>
            </li>
            <li className="flex items-start space-x-3">
              <MapPin className="w-5 h-5 text-purple-400 mt-1" />
              <span className="text-gray-400">Accra, Ghana</span>
            </li>
          </ul>
        </motion.div>
      </div>

      {/* Newsletter */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        viewport={{ once: true }}
        className="mt-16 pt-8 border-t border-gray-800"
      >
        <div className="max-w-md mx-auto text-center">
          <h3 className="text-lg font-semibold mb-4">Stay Updated</h3>
          <p className="text-gray-400 mb-6">
            Subscribe to our newsletter for the latest updates and exclusive offers.
          </p>
          <form className="flex gap-2">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:border-purple-500 text-white placeholder-gray-400"
            />
            <button
              type="submit"
              className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
            >
              Subscribe
            </button>
          </form>
        </div>
      </motion.div>

      {/* Bottom Bar */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        viewport={{ once: true }}
        className="mt-12 pt-8 border-t border-gray-800"
      >
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-400 text-sm">
            © {new Date().getFullYear()} RagsByLee. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link href="/privacy" className="text-gray-400 hover:text-white text-sm transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-gray-400 hover:text-white text-sm transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  </footer>
  );
}
