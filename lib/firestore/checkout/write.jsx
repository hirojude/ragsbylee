import { db } from "../../firebase";
import { collection, doc, getDoc, setDoc, Timestamp } from "firebase/firestore";

export const createCheckoutAndGetURL = async ({ uid, products, address }) => {
  const checkoutId = doc(collection(db, `ids`)).id;

  const ref = doc(db, `users/${uid}/checkout_sessions/${checkoutId}`);

  let line_items = [];

  products.forEach((item) => {
    line_items.push({
      price_data: {
        currency: "inr",
        product_data: {
          name: item?.product?.title ?? "",
          description: item?.product?.shortDescription ?? "",
          images: [
            item?.product?.featureImageURL ??
              `${process.env.NEXT_PUBLIC_DOMAIN}/logo.png`,
          ],
          metadata: {
            productId: item?.id,
          },
        },
        unit_amount: item?.product?.salePrice * 100,
      },
      quantity: item?.quantity ?? 1,
    });
  });

  await setDoc(ref, {
    id: checkoutId,
    payment_method_types: ["card"],
    mode: "payment",
    line_items: line_items,
    metadata: {
      checkoutId: checkoutId,
      uid: uid,
      address: JSON.stringify(address),
    },
    success_url: `${process.env.NEXT_PUBLIC_DOMAIN}/checkout-success?checkout_id=${checkoutId}`,
    cancel_url: `${process.env.NEXT_PUBLIC_DOMAIN}/checkout-failed?checkout_id=${checkoutId}`,
  });

  await new Promise((res) => setTimeout(res, 2000));

  const checkoutSession = await getDoc(ref);

  if (!checkoutSession?.exists()) {
    throw new Error("Checkout Session Not Found");
  }

  if (checkoutSession?.data()?.error?.message) {
    throw new Error(checkoutSession?.data()?.error?.message);
  }

  const url = checkoutSession.data()?.url;

  if (url) {
    return url;
  }

  // Wait and retry up to 3 times
  for (let i = 0; i < 3; i++) {
    await new Promise((res) => setTimeout(res, 2000));
    const retrySession = await getDoc(ref);

    if (retrySession?.data()?.error?.message) {
      throw new Error(retrySession?.data()?.error?.message);
    }

    if (retrySession.data()?.url) {
      return retrySession.data()?.url;
    }
  }

  throw new Error("Failed to create checkout session. Please try again.");
};

export const createCheckoutCODAndGetId = async ({ uid, products, address }) => {
  try {
    if (!uid) {
      throw new Error("User ID is required");
    }
    if (!products?.length) {
      throw new Error("No products in cart");
    }
    if (!address) {
      throw new Error("Delivery address is required");
    }

    console.log("Creating COD checkout for user:", uid);

    // Generate a unique ID without the cod_ prefix first
    const uniqueId = doc(collection(db, `ids`)).id;
    const checkoutId = `cod_${uniqueId}`;
    
    // Use the uniqueId (without cod_ prefix) in the path
    const ref = doc(db, `users/${uid}/checkout_sessions_cod/${uniqueId}`);

    let line_items = [];

    products.forEach((item) => {
      if (!item?.product?.title || !item?.product?.salePrice) {
        throw new Error(`Invalid product data for ${item?.product?.title || 'unknown product'}`);
      }

      line_items.push({
        price_data: {
          currency: "inr",
          product_data: {
            name: item?.product?.title ?? "",
            description: item?.product?.shortDescription ?? "",
            images: [
              item?.product?.featureImageURL ??
                `${process.env.NEXT_PUBLIC_DOMAIN}/logo.png`,
            ],
            metadata: {
              productId: item?.id,
            },
          },
          unit_amount: item?.product?.salePrice * 100,
        },
        quantity: item?.quantity ?? 1,
      });
    });

    const checkoutData = {
      id: checkoutId,
      line_items: line_items,
      metadata: {
        checkoutId: checkoutId,
        uid: uid,
        address: JSON.stringify(address),
      },
      createdAt: Timestamp.now(),
      status: "pending"
    };

    console.log("Saving checkout session:", {
      checkoutId,
      uniqueId,
      userId: uid,
      itemCount: line_items.length,
      path: ref.path
    });

    await setDoc(ref, checkoutData);

    // Verify the checkout session was created
    const verifyDoc = await getDoc(ref);
    if (!verifyDoc.exists()) {
      throw new Error("Failed to create checkout session");
    }

    console.log("Checkout session created successfully");
    return { checkoutId, userId: uid };
  } catch (error) {
    console.error("Error creating COD checkout:", error);
    throw new Error(`Failed to create checkout: ${error.message}`);
  }
};
