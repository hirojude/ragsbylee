"use client";

import { useState } from "react";
import Image from "next/image";

export default function Photos({ imageList }) {
  const [selectedImage, setSelectedImage] = useState(imageList?.[0]);
  
  if (!imageList?.length) {
    return null;
  }

  return (
    <div className="flex flex-col gap-3 w-full">
      <div className="flex justify-center w-full relative h-[350px] md:h-[430px]">
        <Image
          className="object-cover"
          src={selectedImage}
          alt="Selected product image"
          fill
          priority
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      </div>
      <div className="flex flex-wrap justify-center items-center gap-3">
        {imageList?.map((item, index) => {
          return (
            <div
              key={`${item}-${index}`}
              onClick={() => {
                setSelectedImage(item);
              }}
              className="w-[80px] h-[80px] border rounded p-2 cursor-pointer hover:border-blue-500 transition-colors relative"
            >
              <Image 
                className="object-cover" 
                src={item} 
                alt={`Product image ${index + 1}`}
                fill
                sizes="80px"
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
