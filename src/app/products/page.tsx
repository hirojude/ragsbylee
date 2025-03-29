"use client";

import { ProductCard } from "@/components/ui/product-card";
import { Search, Filter } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

// Temporary mock data - will be replaced with Firebase data
const products = [
  {
    id: "1",
    name: "Classic Black Durag",
    price: 199.99,
    imageUrl: "/images/products/back.webp",
    description: "Premium silk material, perfect fit for all head sizes. Classic black design that never goes out of style.",
    category: "Classic",
    material: "Silk",
    color: "Black",
  },
  {
    id: "2",
    name: "Royal Blue Durag",
    price: 249.99,
    imageUrl: "/images/products/blue.webp",
    description: "Luxurious royal blue silk durag with premium stitching and comfortable elastic band.",
    category: "Premium",
    material: "Silk",
    color: "Blue",
  },
  {
    id: "3",
    name: "Red Velvet Durag",
    price: 299.99,
    imageUrl: "/images/products/red.webp",
    description: "Exclusive red velvet material with gold accents. Limited edition design.",
    category: "Limited Edition",
    material: "Velvet",
    color: "Red",
  },
  {
    id: "4",
    name: "Gold Silk Durag",
    price: 349.99,
    imageUrl: "/images/products/gold.webp",
    description: "Premium gold silk durag with metallic finish. Perfect for special occasions.",
    category: "Premium",
    material: "Silk",
    color: "Gold",
  },
  {
    id: "5",
    name: "Purple Wave Durag",
    price: 279.99,
    imageUrl: "/images/products/purple.webp",
    description: "Stylish purple durag with wave pattern design. Premium silk material.",
    category: "Design",
    material: "Silk",
    color: "Purple",
  },
  {
    id: "6",
    name: "White Cotton Durag",
    price: 229.99,
    imageUrl: "/images/products/white.webp",
    description: "Breathable cotton durag for everyday wear. Comfortable and durable.",
    category: "Classic",
    material: "Cotton",
    color: "White",
  },
  {
    id: "7",
    name: "Rainbow Tie-Dye Durag",
    price: 329.99,
    imageUrl: "/images/products/rainbow.webp",
    description: "Vibrant tie-dye design with rainbow colors. Unique and eye-catching style.",
    category: "Design",
    material: "Silk",
    color: "Rainbow",
  },
  {
    id: "8",
    name: "Leopard Print Durag",
    price: 289.99,
    imageUrl: "/images/products/leopad.webp",
    description: "Bold leopard print design on premium silk. Stand out with this unique pattern.",
    category: "Design",
    material: "Silk",
    color: "Leopard",
  },
  {
    id: "9",
    name: "Silver Metallic Durag",
    price: 319.99,
    imageUrl: "/images/products/silver.webp",
    description: "Shimmering silver metallic finish. Perfect for special occasions and photoshoots.",
    category: "Premium",
    material: "Silk",
    color: "Silver",
  },
];

export default function ProductsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedMaterial, setSelectedMaterial] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [sortBy, setSortBy] = useState("featured");

  // Filter products based on search and filters
  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesColor = !selectedColor || product.color === selectedColor;
    const matchesMaterial = !selectedMaterial || product.material === selectedMaterial;
    const matchesCategory = !selectedCategory || product.category === selectedCategory;
    return matchesSearch && matchesColor && matchesMaterial && matchesCategory;
  });

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case "price-low":
        return a.price - b.price;
      case "price-high":
        return b.price - a.price;
      case "newest":
        return b.id.localeCompare(a.id);
      default:
        return 0;
    }
  });

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
            Our Collection
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-xl text-purple-100"
          >
            Discover our premium collection of durags
          </motion.p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        {/* Search and Filter Bar */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            {/* Search Bar */}
            <div className="flex-1 w-full">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors duration-300"
                />
              </div>
            </div>

            {/* Filter Button */}
            <button 
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 px-6 py-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <Filter className="w-5 h-5 text-gray-600" />
              <span className="text-gray-700">Filters</span>
            </button>
          </div>
        </div>

        {/* Filters and Sort */}
        <AnimatePresence>
          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="bg-white rounded-xl shadow-sm p-6 mb-8 overflow-hidden"
            >
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                <div className="flex flex-wrap gap-4">
                  <select 
                    value={selectedColor}
                    onChange={(e) => setSelectedColor(e.target.value)}
                    className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white"
                  >
                    <option value="">All Colors</option>
                    <option value="Black">Black</option>
                    <option value="Blue">Blue</option>
                    <option value="Red">Red</option>
                    <option value="Gold">Gold</option>
                    <option value="Purple">Purple</option>
                    <option value="White">White</option>
                    <option value="Rainbow">Rainbow</option>
                    <option value="Leopard">Leopard</option>
                    <option value="Silver">Silver</option>
                  </select>
                  <select 
                    value={selectedMaterial}
                    onChange={(e) => setSelectedMaterial(e.target.value)}
                    className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white"
                  >
                    <option value="">All Materials</option>
                    <option value="Silk">Silk</option>
                    <option value="Velvet">Velvet</option>
                    <option value="Cotton">Cotton</option>
                  </select>
                  <select 
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white"
                  >
                    <option value="">All Categories</option>
                    <option value="Classic">Classic</option>
                    <option value="Premium">Premium</option>
                    <option value="Design">Design</option>
                    <option value="Limited Edition">Limited Edition</option>
                  </select>
                </div>
                <select 
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white"
                >
                  <option value="featured">Featured</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="newest">Newest First</option>
                </select>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Products Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {sortedProducts.map((product, index) => (
            <ProductCard key={product.id} {...product} index={index} />
          ))}
        </div>

        {/* No Results Message */}
        {sortedProducts.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No products found</h3>
            <p className="text-gray-600">Try adjusting your filters or search terms</p>
          </motion.div>
        )}

        {/* Pagination */}
        <div className="mt-12 flex justify-center">
          <nav className="flex items-center gap-2">
            <button className="px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              Previous
            </button>
            <button className="px-4 py-2 bg-purple-900 text-white rounded-lg hover:bg-purple-800 transition-colors">
              1
            </button>
            <button className="px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              2
            </button>
            <button className="px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              3
            </button>
            <button className="px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              Next
            </button>
          </nav>
        </div>
      </div>
    </div>
  );
} 