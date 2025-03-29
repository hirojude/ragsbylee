"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ShoppingCart } from "lucide-react";

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
  description: string;
  index?: number;
}

export function ProductCard({ id, name, price, imageUrl, description, index = 0 }: ProductCardProps) {
  const router = useRouter();

  const formatPrice = (price: number) => {
    return `GH₵${price.toLocaleString('en-GH', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    })}`;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden h-full flex flex-col group"
    >
      <div className="relative aspect-square overflow-hidden">
        <Image
          src={imageUrl}
          alt={name}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-2">
          <Button 
            size="sm"
            className="bg-white text-gray-900 hover:bg-gray-100"
            onClick={() => router.push(`/products/${id}`)}
          >
            Buy Now
          </Button>
          <Button 
            size="sm"
            variant="outline"
            className="bg-white/80 text-gray-900 hover:bg-white"
          >
            <ShoppingCart className="w-4 h-4" />
          </Button>
        </div>
      </div>
      <div className="p-3 flex flex-col flex-grow">
        <h3 className="text-sm font-semibold text-gray-900 mb-1 line-clamp-1 group-hover:text-purple-900 transition-colors">
          {name}
        </h3>
        <p className="text-xs text-gray-600 mb-2 flex-grow line-clamp-2">
          {description}
        </p>
        <div className="flex items-center justify-between mt-auto">
          <span className="text-sm font-bold text-purple-900">
            {formatPrice(price)}
          </span>
          <div className="md:hidden">
            <Button 
              variant="outline" 
              size="sm"
              className="text-purple-900 border-purple-900 hover:bg-purple-900 hover:text-white"
            >
              <ShoppingCart className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  );
} 