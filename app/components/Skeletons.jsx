"use client";

export function ProductCardSkeleton() {
  return (
    <div className="flex flex-col gap-3 border p-4 rounded-lg animate-pulse">
      <div className="relative w-full">
        <div className="rounded-lg h-48 w-full bg-gray-200" />
        <div className="absolute top-1 right-1">
          <div className="h-8 w-8 bg-gray-200 rounded-full" />
        </div>
      </div>
      <div className="h-4 w-3/4 bg-gray-200 rounded" />
      <div className="h-4 w-1/2 bg-gray-200 rounded" />
      <div className="h-4 w-2/3 bg-gray-200 rounded" />
      <div className="flex items-center gap-4 w-full">
        <div className="flex-1 h-8 bg-gray-200 rounded-lg" />
        <div className="h-8 w-8 bg-gray-200 rounded-lg" />
      </div>
    </div>
  );
}

export function ProductDetailsSkeleton() {
  return (
    <div className="p-5 md:p-10 animate-pulse">
      <section className="flex flex-col-reverse md:flex-row gap-3">
        {/* Product Images */}
        <div className="flex flex-col gap-3 w-full">
          <div className="flex justify-center w-full">
            <div className="bg-gray-200 h-[350px] md:h-[430px] w-full rounded-lg" />
          </div>
          <div className="flex flex-wrap justify-center items-center gap-3">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="w-[80px] h-[80px] bg-gray-200 rounded-lg" />
            ))}
          </div>
        </div>
        
        {/* Product Info */}
        <div className="w-full flex flex-col gap-4">
          <div className="flex gap-3">
            <div className="h-8 w-24 bg-gray-200 rounded-full" />
            <div className="h-8 w-24 bg-gray-200 rounded-full" />
          </div>
          <div className="h-8 w-3/4 bg-gray-200 rounded" />
          <div className="h-4 w-1/4 bg-gray-200 rounded" />
          <div className="h-20 w-full bg-gray-200 rounded" />
          <div className="h-6 w-1/3 bg-gray-200 rounded" />
          <div className="flex flex-wrap items-center gap-4">
            <div className="h-10 w-24 bg-gray-200 rounded-lg" />
            <div className="h-10 w-24 bg-gray-200 rounded-lg" />
            <div className="h-10 w-10 bg-gray-200 rounded-lg" />
          </div>
        </div>
      </section>
    </div>
  );
}

export function ProductGridSkeleton({ count = 8 }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5">
      {Array(count).fill(0).map((_, i) => (
        <ProductCardSkeleton key={i} />
      ))}
    </div>
  );
}

export function CartItemSkeleton() {
  return (
    <div className="flex gap-3 items-center border px-3 py-3 rounded-xl animate-pulse">
      <div className="h-14 w-14 bg-gray-200 rounded-lg" />
      <div className="flex flex-col gap-2 flex-1">
        <div className="h-4 w-3/4 bg-gray-200 rounded" />
        <div className="h-4 w-1/2 bg-gray-200 rounded" />
        <div className="flex items-center gap-2">
          <div className="h-6 w-6 bg-gray-200 rounded" />
          <div className="h-4 w-4 bg-gray-200 rounded" />
          <div className="h-6 w-6 bg-gray-200 rounded" />
        </div>
      </div>
      <div className="h-8 w-8 bg-gray-200 rounded-lg" />
    </div>
  );
}

export function OrderItemSkeleton() {
  return (
    <div className="flex flex-col gap-2 border rounded-lg p-4 animate-pulse">
      <div className="flex gap-3">
        <div className="h-6 w-20 bg-gray-200 rounded-lg" />
        <div className="h-6 w-20 bg-gray-200 rounded-lg" />
        <div className="h-6 w-20 bg-gray-200 rounded-lg" />
      </div>
      <div className="h-4 w-1/3 bg-gray-200 rounded" />
      <div className="flex flex-col gap-3">
        {[1, 2].map((i) => (
          <div key={i} className="flex gap-2 items-center">
            <div className="h-10 w-10 bg-gray-200 rounded-lg" />
            <div className="flex-1">
              <div className="h-4 w-3/4 bg-gray-200 rounded mb-2" />
              <div className="h-3 w-1/2 bg-gray-200 rounded" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 