"use client";

import { useAuth } from "../../../contexts/AuthContext";
import { useProduct } from "../../../lib/firestore/products/read";
import { useUser } from "../../../lib/firestore/user/read";
import { updateCarts } from "../../../lib/firestore/user/write";
import { Button } from "@nextui-org/react";
import { Minus, Plus, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { CartItemSkeleton } from "../../../app/components/Skeletons";
import { toast } from "react-hot-toast";

export default function Page() {
  const { user } = useAuth();
  const { data, isLoading } = useUser({ uid: user?.uid });

  if (isLoading) {
    return (
      <div className="p-5 w-full md:max-w-[900px] gap-4 grid grid-cols-1 md:grid-cols-2">
        {[1, 2, 3, 4].map((i) => (
          <CartItemSkeleton key={i} />
        ))}
      </div>
    );
  }

  return (
    <main className="flex flex-col gap-3 justify-center items-center p-5">
      <h1 className="text-2xl font-semibold">Cart</h1>
      {(!data?.carts || data?.carts?.length === 0) && (
        <div className="flex flex-col gap-5 justify-center items-center h-full w-full py-20">
          <div className="flex justify-center">
            <img className="h-[200px]" src="/svgs/Empty-pana.svg" alt="" />
          </div>
          <h1 className="text-gray-600 font-semibold">
            Please Add Products To Cart
          </h1>
        </div>
      )}
      <div className="p-5 w-full md:max-w-[900px] gap-4 grid grid-cols-1 md:grid-cols-2">
        {data?.carts?.map((item) => {
          return <ProductItem item={item} key={item?.id} />;
        })}
      </div>
      {data?.carts?.length > 0 && (
        <div>
          <Link href={`/checkout?type=cart`}>
            <button className="bg-gradient-to-r from-purple-500 to-blue-500 hover:bg-gradient-to-br hover:from-blue-600 hover:to-purple-600 px-5 py-2 text-sm rounded-lg text-white transition-all duration-100">
              Checkout
            </button>
          </Link>
        </div>
      )}
    </main>
  );
}

function ProductItem({ item }) {
  const { user } = useAuth();
  const { data } = useUser({ uid: user?.uid });
  const { data: product, isLoading } = useProduct({ productId: item?.id });

  const [isRemoving, setIsRemoving] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  if (isLoading) {
    return <CartItemSkeleton />;
  }

  const handleRemove = async () => {
    if (!confirm("Are you sure you want to remove this item?")) return;
    setIsRemoving(true);
    try {
      const newList = data?.carts?.filter((d) => d?.id !== item?.id);
      await updateCarts({ list: newList, uid: user?.uid });
      toast.success("Item removed from cart");
    } catch (error) {
      toast.error(error?.message || "Failed to remove item");
    } finally {
      setIsRemoving(false);
    }
  };

  const handleUpdate = async (quantity) => {
    const newQuantity = parseInt(quantity);
    if (isNaN(newQuantity) || newQuantity < 1) {
      toast.error("Invalid quantity");
      return;
    }

    setIsUpdating(true);
    try {
      const newList = data?.carts?.map((d) => {
        if (d?.id === item?.id) {
          return {
            ...d,
            quantity: newQuantity,
          };
        }
        return d;
      });
      await updateCarts({ list: newList, uid: user?.uid });
      toast.success("Cart updated");
    } catch (error) {
      toast.error(error?.message || "Failed to update cart");
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div className="flex gap-3 items-center border px-3 py-3 rounded-xl">
      <div className="h-14 w-14 p-1">
        <img
          className="w-full h-full object-cover rounded-lg"
          src={product?.featureImageURL}
          alt={product?.title}
        />
      </div>
      <div className="flex flex-col gap-1 w-full">
        <h1 className="text-sm font-semibold">{product?.title}</h1>
        <h1 className="text-green-500 text-sm">
          ₵ {product?.salePrice}{" "}
          <span className="line-through text-xs text-gray-500">
            ₵ {product?.price}
          </span>
        </h1>
        <div className="flex text-xs items-center gap-2">
          <Button
            onClick={() => {
              handleUpdate(item?.quantity - 1);
            }}
            isDisabled={isUpdating || item?.quantity <= 1}
            isIconOnly
            size="sm"
            className="h-6 w-4"
          >
            <Minus size={12} />
          </Button>
          <h2>{item?.quantity}</h2>
          <Button
            onClick={() => {
              handleUpdate(item?.quantity + 1);
            }}
            isDisabled={isUpdating}
            isIconOnly
            size="sm"
            className="h-6 w-4"
          >
            <Plus size={12} />
          </Button>
        </div>
      </div>
      <div className="flex gap-3 items-center">
        <Button
          onClick={handleRemove}
          isLoading={isRemoving}
          isDisabled={isRemoving}
          isIconOnly
          color="danger"
          size="sm"
        >
          <X size={13} />
        </Button>
      </div>
    </div>
  );
}
