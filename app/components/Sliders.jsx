"use client";

import { Button } from "@nextui-org/react";
import { Heart } from "lucide-react";
import Link from "next/link";
import Slider from "react-slick";
import FavoriteButton from "./FavoriteButton";
import AuthContextProvider from "../../contexts/AuthContext";
import AddToCartButton from "./AddToCartButton";

export default function FeaturedProductSlider({ featuredProducts }) {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <div className="overflow-hidden">
      <Slider {...settings}>
        {featuredProducts?.map((product) => {
          return (
            <div key={product?.id}>
              {/* Full-width background image container */}
              <div
                className="relative h-[30rem] lg:h-[35rem] w-full bg-cover bg-center  overflow-hidden"
                style={{ backgroundImage: `url(${product?.featureImageURL})` }}
              >
                <div className="absolute inset-0 bg-black/40 flex items-end justify-start p-10 md:p-20">
                  <div className="text-white max-w-lg">
                    <h2 className="text-gray-200 text-xs md:text-base uppercase tracking-wide">
                      New Fashion
                    </h2>
                    <Link href={`/products/${product?.id}`}>
                      <h1 className="md:text-5xl text-2xl font-bold mb-4">{product?.title}</h1>
                    </Link>
                    <p className="text-gray-300 md:text-lg text-sm mb-6 line-clamp-3">
                      {product?.shortDescription}
                    </p>
                    <AuthContextProvider>
                      <div className="flex items-center gap-4">
                        <Link href={`/checkout?type=buynow&productId=${product?.id}`}>
                          <button className="bg-gradient-to-r from-purple-500 to-blue-500 hover:bg-gradient-to-br hover:from-blue-600 hover:to-purple-600 text-white text-xs md:text-sm px-6 py-2 rounded-lg shadow-md transition-all duration-200">
                            Buy Now
                          </button>
                        </Link>
                        <AddToCartButton productId={product?.id} type="large" />
                        <div className="bg-white/70 p-2 rounded-full shadow-lg backdrop-blur-md">
                          <FavoriteButton productId={product?.id} />
                        </div>
                      </div>
                    </AuthContextProvider>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </Slider>
    </div>
  );
}