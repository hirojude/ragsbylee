"use client";

import { useAuth } from "../../../../contexts/AuthContext";
import { createCheckoutCODAndGetId } from "../../../.../../../lib/firestore/checkout/write";
import { Button } from "@nextui-org/react";
import confetti from "canvas-confetti";
import { CheckSquare2Icon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

export default function Checkout({ productList }) {
  const [isLoading, setIsLoading] = useState(false);
  const [address, setAddress] = useState(null);
  const router = useRouter();
  const { user } = useAuth();

  const handleAddress = (key, value) => {
    setAddress({ ...(address ?? {}), [key]: value });
  };

  const totalPrice = productList?.reduce((prev, curr) => {
    return prev + curr?.quantity * curr?.product?.salePrice;
  }, 0);

  const handlePlaceOrder = async () => {
    setIsLoading(true);
    try {
      // Validate total price
      if (totalPrice <= 0) {
        throw new Error("Total price must be greater than 0");
      }

      // Validate address
      if (!address?.fullName?.trim()) {
        throw new Error("Please enter your full name");
      }
      if (!address?.mobile?.trim()) {
        throw new Error("Please enter your mobile number");
      }
      if (!address?.email?.trim()) {
        throw new Error("Please enter your email address");
      }
      if (!address?.addressLine1?.trim()) {
        throw new Error("Please enter your delivery address");
      }
      if (!address?.addressLine2?.trim()) {
        throw new Error("Please enter your apartment, suite or floor");
      }

      // Validate product list
      if (!productList || productList.length === 0) {
        throw new Error("Your cart is empty");
      }

      // Validate product stock
      for (const item of productList) {
        if (!item?.product) {
          throw new Error("Some products are no longer available");
        }
        if (item?.product?.stock <= (item?.product?.orders ?? 0)) {
          throw new Error(`${item?.product?.title} is out of stock`);
        }
      }

      const { checkoutId, userId } = await createCheckoutCODAndGetId({
        uid: user?.uid,
        products: productList,
        address: address,
      });
      router.push(`/checkout-cod?checkout_id=${checkoutId}&user_id=${userId}`);
      toast.success("Order placed successfully!");
      confetti();
    } catch (error) {
      console.error("Checkout error:", error);
      toast.error(error?.message || "Failed to place order");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="flex flex-col md:flex-row gap-3">
      <section className="flex-1 flex flex-col gap-4 border rounded-xl p-4">
        <h1 className="text-xl">Personal Information</h1>
        <div className="flex flex-col gap-2">
          <input
            type="text"
            id="full-name"
            name="full-name"
            placeholder="Enter first and last name"
            value={address?.fullName ?? ""}
            onChange={(e) => {
              handleAddress("fullName", e.target.value);
            }}
            className="border px-4 py-2 rounded-lg w-full focus:outline-none"
          />
          <div className="flex items-center gap-2">
            <span className="border px-4 py-2 rounded-lg bg-gray-50">+233</span>
            <input
              type="tel"
              id="mobile"
              name="mobile"
              placeholder="Mobile Number"
              value={address?.mobile ?? ""}
              onChange={(e) => {
                handleAddress("mobile", e.target.value);
              }}
              className="border px-4 py-2 rounded-lg w-full focus:outline-none"
            />
          </div>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Enter email address"
            value={address?.email ?? ""}
            onChange={(e) => {
              handleAddress("email", e.target.value);
            }}
            className="border px-4 py-2 rounded-lg w-full focus:outline-none"
          />
        </div>

        <h1 className="text-xl mt-4">Delivery Details</h1>
        <div className="flex flex-col gap-2">
          <input
            type="text"
            id="address-line-1"
            name="address-line-1"
            placeholder="Enter address"
            value={address?.addressLine1 ?? ""}
            onChange={(e) => {
              handleAddress("addressLine1", e.target.value);
            }}
            className="border px-4 py-2 rounded-lg w-full focus:outline-none"
          />
          <input
            type="text"
            id="address-line-2"
            name="address-line-2"
            placeholder="Enter Apartment, suite or floor"
            value={address?.addressLine2 ?? ""}
            onChange={(e) => {
              handleAddress("addressLine2", e.target.value);
            }}
            className="border px-4 py-2 rounded-lg w-full focus:outline-none"
          />
          <textarea
            type="text"
            id="delivery-notes"
            name="delivery-notes"
            placeholder="NB: For clarity purposes, notes can contain delivery guide for your specified location, size of item, color of choice on item, e.t.c."
            value={address?.orderNote ?? ""}
            onChange={(e) => {
              handleAddress("orderNote", e.target.value);
            }}
            className="border px-4 py-2 rounded-lg w-full focus:outline-none h-32 resize-none"
          />
        </div>
      </section>
      <div className="flex-1 flex flex-col gap-3">
        <section className="flex flex-col gap-3 border rounded-xl p-4">
          <h1 className="text-xl">Products</h1>
          <div className="flex flex-col gap-2">
            {productList?.map((item) => {
              return (
                <div key={item?.product?.id} className="flex gap-3 items-center">
                  <img
                    className="w-10 h-10 object-cover rounded-lg"
                    src={item?.product?.featureImageURL}
                    alt=""
                  />
                  <div className="flex-1 flex flex-col">
                    <h1 className="text-sm">{item?.product?.title}</h1>
                    <h3 className="text-green-600 font-semibold text-[10px]">
                      ₵ {item?.product?.salePrice}{" "}
                      <span className="text-black">X</span>{" "}
                      <span className="text-gray-600">{item?.quantity}</span>
                    </h3>
                  </div>
                  <div>
                    <h3 className="text-sm">
                      ₵ {item?.product?.salePrice * item?.quantity}
                    </h3>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="flex justify-between w-full items-center p-2 font-semibold">
            <h1>Total</h1>
            <h1>₵ {totalPrice}</h1>
          </div>
        </section>
        <section className="flex flex-col gap-3 border rounded-xl p-4">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <h2 className="text-xl">Payment Mode</h2>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1 text-xs text-gray-500">
                <CheckSquare2Icon className="text-blue-500" size={13} />
                Cash On Delivery
              </div>
            </div>
          </div>
          <div className="flex gap-1 items-center">
            <CheckSquare2Icon className="text-blue-500" size={13} />
            <h4 className="text-xs text-gray-600">
              I agree with the{" "}
              <span className="text-blue-700">terms & conditions</span>
            </h4>
          </div>
          <Button
            isLoading={isLoading}
            isDisabled={isLoading}
            onClick={handlePlaceOrder}
            className="bg-black text-white"
          >
            Place Order
          </Button>
        </section>
      </div>
    </section>
  );
}
