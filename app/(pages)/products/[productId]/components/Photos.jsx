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
      <div className="flex justify-center w-full">
        <Image
          className="object-contain"
          src={selectedImage}
          alt="Selected product image"
          width={400}
          height={600} // or calculate based on 750x1131 aspect ratio
          priority={false} // or true if you want it to load immediately
          sizes="(max-width: 768px) 100vw, 400px"
        />
      </div>
      {/* <div className="flex flex-wrap justify-center items-center gap-3">
        {imageList?.map((item, index) => {
          return (
            <div
              key={`${item}-${index}`}
              onClick={() => {
                setSelectedImage(item);
              }}
              className="w-[80px] border rounded p-2 cursor-pointer hover:border-blue-500 transition-colors"
            >
              <img 
                className="object-cover w-full h-full" 
                src={item} 
                alt={`Product image ${index + 1}`}
              />
            </div>
          );
        })}
      </div> */}
    </div>
  );
}
