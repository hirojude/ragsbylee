"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ShoppingCart, Search } from "lucide-react";

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled 
          ? "bg-white/90 backdrop-blur-md shadow-md" 
          : "bg-black/20 backdrop-blur-sm shadow-lg"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16 md:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <span className={`text-xl md:text-2xl font-bold ${
              isScrolled 
                ? "bg-gradient-to-r from-purple-900 to-blue-900 bg-clip-text text-transparent"
                : "text-white"
            }`}>
              RagsByLee
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link 
              href="/products" 
              className={`transition-colors relative group ${
                isScrolled ? "text-gray-600 hover:text-purple-900" : "text-white/90 hover:text-white"
              }`}
            >
              Products
              <span className={`absolute bottom-0 left-0 w-0 h-0.5 transition-all duration-300 group-hover:w-full ${
                isScrolled ? "bg-purple-900" : "bg-white"
              }`}></span>
            </Link>
            <Link 
              href="/about" 
              className={`transition-colors relative group ${
                isScrolled ? "text-gray-600 hover:text-purple-900" : "text-white/90 hover:text-white"
              }`}
            >
              About
              <span className={`absolute bottom-0 left-0 w-0 h-0.5 transition-all duration-300 group-hover:w-full ${
                isScrolled ? "bg-purple-900" : "bg-white"
              }`}></span>
            </Link>
            <Link 
              href="/contact" 
              className={`transition-colors relative group ${
                isScrolled ? "text-gray-600 hover:text-purple-900" : "text-white/90 hover:text-white"
              }`}
            >
              Contact
              <span className={`absolute bottom-0 left-0 w-0 h-0.5 transition-all duration-300 group-hover:w-full ${
                isScrolled ? "bg-purple-900" : "bg-white"
              }`}></span>
            </Link>
            <div className="flex items-center space-x-3">
              <Button variant="ghost" size="sm" className={`relative ${
                isScrolled ? "text-gray-600 hover:text-purple-900" : "text-white/90 hover:text-white"
              }`}>
                <Search className="w-4 h-4" />
                <span className="sr-only">Search</span>
              </Button>
              <Button variant="ghost" size="sm" className={`relative ${
                isScrolled ? "text-gray-600 hover:text-purple-900" : "text-white/90 hover:text-white"
              }`}>
                <ShoppingCart className="w-4 h-4" />
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-purple-900 text-white text-xs rounded-full flex items-center justify-center">
                  0
                </span>
                <span className="sr-only">Cart</span>
              </Button>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-lg transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className={`w-5 h-5 ${isScrolled ? "text-gray-600" : "text-white"}`} />
            ) : (
              <Menu className={`w-5 h-5 ${isScrolled ? "text-gray-600" : "text-white"}`} />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className={`md:hidden overflow-hidden ${
                isScrolled ? "bg-white" : "bg-black/20 backdrop-blur-sm"
              }`}
            >
              <div className="py-3 space-y-3">
                <Link 
                  href="/products" 
                  className={`block transition-colors py-2 ${
                    isScrolled ? "text-gray-600 hover:text-purple-900" : "text-white/90 hover:text-white"
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Products
                </Link>
                <Link 
                  href="/about" 
                  className={`block transition-colors py-2 ${
                    isScrolled ? "text-gray-600 hover:text-purple-900" : "text-white/90 hover:text-white"
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  About
                </Link>
                <Link 
                  href="/contact" 
                  className={`block transition-colors py-2 ${
                    isScrolled ? "text-gray-600 hover:text-purple-900" : "text-white/90 hover:text-white"
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Contact
                </Link>
                <div className="flex items-center space-x-3 pt-3">
                  <Button variant="ghost" size="sm" className={`relative ${
                    isScrolled ? "text-gray-600 hover:text-purple-900" : "text-white/90 hover:text-white"
                  }`}>
                    <Search className="w-4 h-4" />
                    <span className="sr-only">Search</span>
                  </Button>
                  <Button variant="ghost" size="sm" className={`relative ${
                    isScrolled ? "text-gray-600 hover:text-purple-900" : "text-white/90 hover:text-white"
                  }`}>
                    <ShoppingCart className="w-4 h-4" />
                    <span className="absolute -top-1 -right-1 w-3 h-3 bg-purple-900 text-white text-xs rounded-full flex items-center justify-center">
                      0
                    </span>
                    <span className="sr-only">Cart</span>
                  </Button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
}