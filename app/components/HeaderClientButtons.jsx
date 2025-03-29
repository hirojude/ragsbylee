"use client";

import { useAuth } from "../../contexts/AuthContext";
import { useUser } from "../../lib/firestore/user/read";
import { Badge } from "@nextui-org/react";
import { Heart, ShoppingCart } from "lucide-react";
import Link from "next/link";

export default function HeaderClientButtons() {
  const { user } = useAuth();
  const { data } = useUser({ uid: user?.uid });

  if (!user) {
    return <></>;
  }

  return (
    <>
      <Link href={`/favorites`}>
        <button
          title="Favorites"
          className="h-8 w-8 flex justify-center items-center rounded-full hover:bg-gray-50"
        >
          <Badge
            content={data?.favorites?.length ?? 0}
            color="danger"
            size="sm"
            className="text-[10px]"
          >
            <Heart size={14} />
          </Badge>
        </button>
      </Link>
      <Link href={`/cart`}>
        <button
          title="Cart"
          className="h-8 w-8 flex justify-center items-center rounded-full hover:bg-gray-50"
        >
          <Badge
            content={data?.carts?.length ?? 0}
            color="danger"
            size="sm"
            className="text-[10px]"
          >
            <ShoppingCart size={14} />
          </Badge>
        </button>
      </Link>
    </>
  );
}
