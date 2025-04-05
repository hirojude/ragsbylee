"use client";

import { useState } from "react";

export default function Photos({ imageList }) {
  const [selectedImage, setSelectedImage] = useState(imageList?.[0]);
  
  if (!imageList?.length) {
    return null;
  }

  return (
    <div className="flex flex-col gap-3 w-full">
      <div className="flex justify-center w-full">
        <img
          className="object-cover h-[350px] md:h-[430px]"
          src={selectedImage}
          alt="Selected product image"
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
