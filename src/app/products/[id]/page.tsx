"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Heart, Share2, Star, Truck, Shield, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { use } from "react";

// Client component for interactive elements
function ProductActions() {
  return (
    <div className="flex gap-4">
      <Button size="lg" className="flex-1">
        <ShoppingCart className="w-5 h-5 mr-2" />
        Add to Cart
      </Button>
      <Button size="lg" variant="outline" className="px-4">
        <Heart className="w-5 h-5" />
      </Button>
      <Button size="lg" variant="outline" className="px-4">
        <Share2 className="w-5 h-5" />
      </Button>
    </div>
  );
}

// Temporary mock data - will be replaced with Firebase data
const products = [
  {
    id: "1",
    name: "Classic Black Durag",
    price: 199.99,
    imageUrl: "/images/products/back.webp",
    description: "Premium silk material, perfect fit for all head sizes. Classic black design that never goes out of style.",
    features: [
      "Premium silk material",
      "Elastic band for secure fit",
      "One-size-fits-all design",
      "Breathable fabric",
      "Machine washable"
    ],
    specifications: {
      material: "100% Silk",
      dimensions: "24\" x 24\"",
      weight: "2 oz",
      origin: "Made in USA"
    },
    rating: 4.8,
    reviews: 128,
    inStock: true
  },
  {
    id: "2",
    name: "Royal Blue Durag",
    price: 249.99,
    imageUrl: "/images/products/blue.webp",
    description: "Luxurious royal blue silk durag with premium stitching and comfortable elastic band.",
    features: [
      "Premium silk material",
      "Elastic band for secure fit",
      "One-size-fits-all design",
      "Breathable fabric",
      "Machine washable"
    ],
    specifications: {
      material: "100% Silk",
      dimensions: "24\" x 24\"",
      weight: "2 oz",
      origin: "Made in USA"
    },
    rating: 4.7,
    reviews: 95,
    inStock: true
  },
  {
    id: "3",
    name: "Red Velvet Durag",
    price: 299.99,
    imageUrl: "/images/products/red.webp",
    description: "Exclusive red velvet material with gold accents. Limited edition design.",
    features: [
      "Premium velvet material",
      "Gold accent details",
      "One-size-fits-all design",
      "Breathable fabric",
      "Machine washable"
    ],
    specifications: {
      material: "100% Velvet",
      dimensions: "24\" x 24\"",
      weight: "2.2 oz",
      origin: "Made in USA"
    },
    rating: 4.9,
    reviews: 156,
    inStock: true
  },
  {
    id: "4",
    name: "Gold Silk Durag",
    price: 349.99,
    imageUrl: "/images/products/gold.webp",
    description: "Premium gold silk durag with metallic finish. Perfect for special occasions.",
    features: [
      "Premium silk material",
      "Metallic gold finish",
      "One-size-fits-all design",
      "Breathable fabric",
      "Machine washable"
    ],
    specifications: {
      material: "100% Silk",
      dimensions: "24\" x 24\"",
      weight: "2 oz",
      origin: "Made in USA"
    },
    rating: 4.8,
    reviews: 142,
    inStock: true
  },
  {
    id: "5",
    name: "Purple Wave Durag",
    price: 279.99,
    imageUrl: "/images/products/purple.webp",
    description: "Stylish purple durag with wave pattern design. Premium silk material.",
    features: [
      "Premium silk material",
      "Wave pattern design",
      "One-size-fits-all design",
      "Breathable fabric",
      "Machine washable"
    ],
    specifications: {
      material: "100% Silk",
      dimensions: "24\" x 24\"",
      weight: "2 oz",
      origin: "Made in USA"
    },
    rating: 4.6,
    reviews: 89,
    inStock: true
  },
  {
    id: "6",
    name: "White Cotton Durag",
    price: 229.99,
    imageUrl: "/images/products/white.webp",
    description: "Breathable cotton durag for everyday wear. Comfortable and durable.",
    features: [
      "Premium cotton material",
      "Elastic band for secure fit",
      "One-size-fits-all design",
      "Breathable fabric",
      "Machine washable"
    ],
    specifications: {
      material: "100% Cotton",
      dimensions: "24\" x 24\"",
      weight: "1.8 oz",
      origin: "Made in USA"
    },
    rating: 4.7,
    reviews: 112,
    inStock: true
  },
  {
    id: "7",
    name: "Rainbow Tie-Dye Durag",
    price: 329.99,
    imageUrl: "/images/products/rainbow.webp",
    description: "Vibrant tie-dye design with rainbow colors. Unique and eye-catching style.",
    features: [
      "Premium silk material",
      "Tie-dye design",
      "One-size-fits-all design",
      "Breathable fabric",
      "Machine washable"
    ],
    specifications: {
      material: "100% Silk",
      dimensions: "24\" x 24\"",
      weight: "2 oz",
      origin: "Made in USA"
    },
    rating: 4.9,
    reviews: 167,
    inStock: true
  },
  {
    id: "8",
    name: "Leopard Print Durag",
    price: 289.99,
    imageUrl: "/images/products/leopad.webp",
    description: "Bold leopard print design on premium silk. Stand out with this unique pattern.",
    features: [
      "Premium silk material",
      "Leopard print design",
      "One-size-fits-all design",
      "Breathable fabric",
      "Machine washable"
    ],
    specifications: {
      material: "100% Silk",
      dimensions: "24\" x 24\"",
      weight: "2 oz",
      origin: "Made in USA"
    },
    rating: 4.7,
    reviews: 98,
    inStock: true
  },
  {
    id: "9",
    name: "Silver Metallic Durag",
    price: 319.99,
    imageUrl: "/images/products/silver.webp",
    description: "Shimmering silver metallic finish. Perfect for special occasions and photoshoots.",
    features: [
      "Premium silk material",
      "Metallic silver finish",
      "One-size-fits-all design",
      "Breathable fabric",
      "Machine washable"
    ],
    specifications: {
      material: "100% Silk",
      dimensions: "24\" x 24\"",
      weight: "2 oz",
      origin: "Made in USA"
    },
    rating: 4.8,
    reviews: 134,
    inStock: true
  }
];

// Main page component
export default function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);

  // Find the product based on the ID
  const product = products.find(p => p.id === id);

  // If product not found, show error or redirect
  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Product Not Found</h1>
          <Link href="/products" className="text-purple-900 hover:text-purple-800">
            Return to Products
          </Link>
        </div>
      </div>
    );
  }

  // Format price in Ghana Cedis
  const formatPrice = (price: number) => {
    return `GH₵${price.toLocaleString('en-GH', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    })}`;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Back Button */}
      <div className="container mx-auto px-4 py-4">
        <Link href="/products" className="inline-flex items-center text-gray-600 hover:text-purple-900 transition-colors">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Products
        </Link>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8">
            {/* Image Gallery */}
            <div className="space-y-4">
              <div className="relative aspect-square rounded-lg overflow-hidden bg-gray-100">
                <Image
                  src={product.imageUrl}
                  alt={product.name}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
              <div className="grid grid-cols-4 gap-2">
                {/* Thumbnail images would go here */}
              </div>
            </div>

            {/* Product Info */}
            <div className="space-y-6">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
                <div className="flex items-center gap-4 mb-4">
                  <div className="flex items-center">
                    <Star className="w-5 h-5 text-yellow-400 fill-current" />
                    <span className="ml-1 text-gray-700">{product.rating}</span>
                    <span className="ml-2 text-gray-500">({product.reviews} reviews)</span>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-sm ${product.inStock ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                    {product.inStock ? 'In Stock' : 'Out of Stock'}
                  </span>
                </div>
                <p className="text-3xl font-bold text-purple-900">
                  {formatPrice(product.price)}
                </p>
              </div>

              <ProductActions />

              {/* Shipping Info */}
              <div className="flex items-center gap-6 py-4 border-t border-b">
                <div className="flex items-center gap-2">
                  <Truck className="w-5 h-5 text-purple-900" />
                  <span className="text-sm text-gray-600">Free Shipping</span>
                </div>
                <div className="flex items-center gap-2">
                  <Shield className="w-5 h-5 text-purple-900" />
                  <span className="text-sm text-gray-600">Secure Payment</span>
                </div>
              </div>

              <div>
                <h2 className="text-xl font-semibold mb-2">Description</h2>
                <p className="text-gray-600 leading-relaxed">{product.description}</p>
              </div>

              <div>
                <h2 className="text-xl font-semibold mb-2">Features</h2>
                <ul className="space-y-2">
                  {product.features.map((feature, index) => (
                    <li key={index} className="flex items-center gap-2 text-gray-600">
                      <div className="w-1.5 h-1.5 bg-purple-900 rounded-full" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h2 className="text-xl font-semibold mb-2">Specifications</h2>
                <div className="grid grid-cols-2 gap-4">
                  {Object.entries(product.specifications).map(([key, value]) => (
                    <div key={key} className="border-b pb-2">
                      <span className="font-medium text-gray-900 capitalize">{key}:</span>
                      <span className="ml-2 text-gray-600">{value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products Section */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Related Products</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Related products would go here */}
          </div>
        </div>
      </div>
    </div>
  );
} 