"use client";

import { useAuth } from "../../contexts/AuthContext";
import { useUser } from "../../lib/firestore/user/read";
import { updateFavorites } from "../../lib/firestore/user/write";
import { Button } from "@nextui-org/react";
import { Heart } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useRouter } from "next/navigation";

export default function FavoriteButton({ productId }) {
  const { user } = useAuth();
  const { data } = useUser({ uid: user?.uid });
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleAddToFavorite = async () => {
    setIsLoading(true);
    try {
      if (!user?.uid) {
        router.push("/login");
        throw new Error("Please Logged In First!");
      }
      const favoriteList = data?.favorites ?? [];
      const newFavoriteList = favoriteList.includes(productId)
        ? favoriteList.filter(id => id !== productId)
        : [...favoriteList, productId];
      
      await updateFavorites({ uid: user?.uid, favoriteList: newFavoriteList });
      toast.success(favoriteList.includes(productId) ? "Removed from favorites" : "Added to favorites");
    } catch (error) {
      toast.error(error?.message);
    }
    setIsLoading(false);
  };

  const isLiked = data?.favorites?.includes(productId);

  if (!user) {
    return <></>;
  }

  return (
    <Button
      onClick={handleAddToFavorite}
      isLoading={isLoading}
      isDisabled={isLoading}
      isIconOnly
      className={`${
        isLiked
          ? "bg-gradient-to-r from-purple-900 to-blue-400 text-white"
          : "bg-white text-black"
      } rounded-full`}
      size="sm"
    >
      {isLiked ? <FavoriteIcon className="text-xs" /> : <FavoriteBorderOutlinedIcon className="text-xs " />}
    </Button>
  );
}
