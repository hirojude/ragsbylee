import Link from "next/link";
import Image from "next/image";
import FavoriteButton from "./FavoriteButton";
import AuthContextProvider from "../../contexts/AuthContext";
import AddToCartButton from "./AddToCartButton";
import { getProductReviewCounts } from "../../lib/firestore/products/count/read";
import { Suspense } from "react";
import MyRating from "./MyRating";
import { ProductGridSkeleton } from "./Skeletons";

export default function ProductsGridView({ products, isLoading }) {
  if (isLoading) {
    return <ProductGridSkeleton />;
  }

  return (
    <section className="w-full flex justify-center">
      <div className="flex flex-col gap-4 max-w-[900px] px-2 py-8">
        <h1 className="text-center text-xl font-semibold text-gray-900">Products</h1>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {products?.map((item) => (
            <ProductCard key={item?.id} product={item} />
          ))}
        </div>
      </div>
    </section>
  );
}

export function ProductCard({ product }) {
  if (!product) return null;

  return (
    <div className="flex flex-col bg-white shadow-xl rounded-2xl overflow-hidden transition-transform duration-300 hover:scale-105">
      {/* Product Image */}
      <div className="relative h-56">
        <Image
          src={product?.featureImageURL}
          className="object-cover"
          alt={product?.title}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          loading="lazy"
          quality={75}
          placeholder="blur"
          blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gHYSUNDX1BST0ZJTEUAAQEAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADb/2wBDABQODxIPDRQSEBIXFRQdHx4eHRoaHSQtJSEkMjU1LS0yMi4qLjgyPjA+OjU/RUVHUFBQUFtbW1tbW1tbW1tbW1v/2wBDARUXFyAeIB4gHR4eIiohKjUqKioqNVs1NTU1NTU1W1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1v/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAb/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
        />
        {/* Favorite Button */}
        <div className="absolute top-3 right-3 bg-white/80 backdrop-blur-md p-0 rounded-full shadow-md z-10">
          <AuthContextProvider>
            <FavoriteButton productId={product?.id} />
          </AuthContextProvider>
        </div>
      </div>

      {/* Product Details */}
      <div className="p-4 pt-2 flex flex-col gap-2.5">
        <Link href={`/products/${product?.id}`} className="hover:underline">
          <h1 className="text-gray-900 font-medium text-lg truncate">
            {product?.title}
          </h1>
        </Link>

        {/* Pricing */}
        <div className="flex items-center justify-between">
          <h2 className="text-blue-600 text-xl font-semibold">₵{product?.salePrice}</h2>
          {product?.price !== product?.salePrice && (
            <span className="line-through text-sm text-gray-500">₵{product?.price}</span>
          )}
        </div>

        {/* Short Description */}
        <p className="text-sm text-gray-600 line-clamp-2">{product?.shortDescription}</p>

        {/* Stock Indicator */}
        {product?.stock <= (product?.orders ?? 0) && (
          <div className="bg-red-500 text-white text-xs font-medium py-1 px-3 rounded-full w-fit">
            Out Of Stock
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-3 mt-4">
          <AuthContextProvider>
            <AddToCartButton productId={product?.id} />
          </AuthContextProvider>
          <Link href={`/checkout?type=buynow&productId=${product?.id}`} className="w-full">
            <button className="w-full bg-gradient-to-r from-purple-400 to-blue-500 hover:bg-gradient-to-r hover:from-blue-500 hover:to-purple-400 text-white py-2 rounded-lg text-sm transition-all duration-100">
              Buy Now
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

async function RatingReview({ product }) {
  const counts = await getProductReviewCounts({ productId: product?.id });
  return (
    <div className="flex gap-2 items-center">
      <MyRating value={counts?.averageRating ?? 0} />
      <h1 className="text-xs text-gray-400">
        <span>{counts?.averageRating?.toFixed(1)}</span> ({counts?.totalReviews})
      </h1>
    </div>
  );
}
