import Footer from "@/app/components/Footer";
import Header from "@/app/components/Header";
import { admin, adminDB } from "@/lib/firebase_admin";
import Link from "next/link";

const fetchCheckout = async (checkoutId, userId) => {
  try {
    console.log("Fetching checkout session for ID:", checkoutId);
    
    // Extract the unique ID from the checkout ID
    const uniqueId = checkoutId.split('_')[1];
    if (!uniqueId) {
      throw new Error("Invalid checkout ID format");
    }

    console.log("Fetching checkout with:", {
      checkoutId,
      uniqueId,
      userId
    });

    // Get the checkout session directly using the path
    const directRef = adminDB.doc(`users/${userId}/checkout_sessions_cod/${uniqueId}`);
    const directDoc = await directRef.get();
    
    if (directDoc.exists) {
      const data = directDoc.data();
      console.log("Found checkout session:", {
        id: directDoc.id,
        path: directDoc.ref.path,
        hasData: !!data,
        userId: data?.metadata?.uid,
        status: data?.status
      });

      // Verify that the checkout belongs to the correct user
      if (data?.metadata?.uid !== userId) {
        throw new Error("Invalid checkout session");
      }

      // Convert Firestore Timestamp to ISO string if it exists
      if (data.createdAt?.toDate) {
        data.createdAt = data.createdAt.toDate().toISOString();
      }

      // Parse the address from JSON string if it exists
      if (data.metadata?.address) {
        try {
          data.metadata.address = JSON.parse(data.metadata.address);
        } catch (e) {
          console.error("Error parsing address:", e);
        }
      }

      return {
        ...data,
        id: directDoc.id,
        path: directDoc.ref.path
      };
    }

    console.log("No checkout session found for ID:", checkoutId);
    throw new Error("Invalid Checkout ID");
  } catch (error) {
    console.error("Error in fetchCheckout:", error);
    throw new Error(`Failed to fetch checkout session: ${error.message}`);
  }
};

const processOrder = async ({ checkout }) => {
  try {
    console.log("Processing order for checkout:", checkout?.id);
    
    if (!checkout?.id) {
      throw new Error("Invalid checkout data: missing ID");
    }

    // Check if order already exists
    const order = await adminDB.doc(`orders/${checkout?.id}`).get();
    if (order.exists) {
      console.log("Order already exists:", checkout?.id);
      return false;
    }

    const uid = checkout?.metadata?.uid;
    if (!uid) {
      throw new Error("Invalid checkout data: missing user ID");
    }

    console.log("Creating order for user:", uid);

    // Calculate total amount
    const totalAmount = checkout?.line_items?.reduce((prev, curr) => {
      return prev + (curr?.price_data?.unit_amount * curr?.quantity);
    }, 0);

    console.log("Order total amount:", totalAmount);

    // Create the order
    const orderData = {
      checkout: {
        ...checkout,
        createdAt: admin.firestore.Timestamp.fromDate(new Date(checkout.createdAt))
      },
      payment: {
        amount: totalAmount,
        currency: "inr",
        status: "pending"
      },
      uid: uid,
      id: checkout?.id,
      paymentMode: "cod",
      status: "pending",
      timestampCreate: admin.firestore.Timestamp.now(),
      deliveryAddress: checkout?.metadata?.address || null,
      products: checkout?.line_items?.map(item => ({
        id: item?.price_data?.product_data?.metadata?.productId,
        title: item?.price_data?.product_data?.name,
        quantity: item?.quantity,
        price: item?.price_data?.unit_amount / 100
      }))
    };

    console.log("Order data prepared:", {
      orderId: orderData.id,
      userId: orderData.uid,
      amount: orderData.payment.amount,
      itemCount: orderData.products?.length
    });

    // Start a batch write
    const batch = adminDB.batch();

    // Add order creation to batch
    batch.set(adminDB.doc(`orders/${checkout?.id}`), orderData);

    // Get user data
    const userRef = adminDB.doc(`users/${uid}`);
    const user = await userRef.get();
    if (!user.exists) {
      throw new Error("User not found");
    }

    const userData = user.data();
    console.log("User data retrieved:", {
      userId: uid,
      hasCart: !!userData?.carts
    });

    // Get product IDs from checkout
    const productIdsList = checkout?.line_items?.map(item => 
      item?.price_data?.product_data?.metadata?.productId
    ).filter(Boolean);

    // Update user's cart
    const newCartList = (userData?.carts ?? []).filter(
      (cartItem) => !productIdsList.includes(cartItem?.id)
    );
    batch.update(userRef, { carts: newCartList });

    // Update product stock
    checkout?.line_items?.forEach((item) => {
      const productId = item?.price_data?.product_data?.metadata?.productId;
      if (productId) {
        const productRef = adminDB.doc(`products/${productId}`);
        batch.update(productRef, {
          orders: admin.firestore.FieldValue.increment(item?.quantity),
        });
      }
    });

    // Delete the checkout session
    if (checkout?.path) {
      batch.delete(adminDB.doc(checkout.path));
    }

    // Commit all changes
    await batch.commit();
    console.log("All changes committed successfully");

    return true;
  } catch (error) {
    console.error("Error in processOrder:", error);
    throw new Error(`Failed to process order: ${error.message}`);
  }
};

export default async function Page({ searchParams }) {
  try {
    const { checkout_id, user_id } = searchParams;
    console.log("Received params:", { checkout_id, user_id });

    if (!checkout_id) {
      throw new Error("No checkout ID provided");
    }

    if (!user_id) {
      throw new Error("No user ID provided");
    }

    const checkout = await fetchCheckout(checkout_id, user_id);
    console.log("Checkout fetched successfully");

    const result = await processOrder({ checkout });
    console.log("Order processed successfully:", result);

    return (
      <main>
        <Header />
        <section className="min-h-screen flex flex-col gap-3 justify-center items-center">
          <div className="flex justify-center w-full">
            <img src="/svgs/Mobile payments-rafiki.svg" className="h-48" alt="" />
          </div>
          <h1 className="text-2xl font-semibold text-green">
            Your Order Is{" "}
            <span className="font-bold text-green-600">Successfully</span> Placed
          </h1>
          <div className="flex items-center gap-4 text-sm">
            <Link href={"/account"}>
              <button className="bg-gradient-to-r from-purple-500 to-blue-500 hover:bg-gradient-to-br hover:from-blue-600 hover:to-purple-600 px-5 py-2 rounded-lg text-white transition-all duration-100">
                Go To Orders Page
              </button>
            </Link>
          </div>
        </section>
        <Footer />
      </main>
    );
  } catch (error) {
    console.error("Error in checkout-cod page:", error);
    return (
      <main>
        <Header />
        <section className="min-h-screen flex flex-col gap-3 justify-center items-center">
          <div className="flex justify-center w-full">
            <img src="/svgs/Mobile payments-rafiki.svg" className="h-48" alt="" />
          </div>
          <h1 className="text-2xl font-semibold text-red">
            Order Placement Failed
          </h1>
          <p className="text-gray-600">{error.message}</p>
          <div className="flex items-center gap-4 text-sm">
            <Link href={"/"}>
              <button className="bg-gradient-to-r from-purple-500 to-blue-500 hover:bg-gradient-to-br hover:from-blue-600 hover:to-purple-600 px-5 py-2 rounded-lg text-white transition-all duration-100">
                Return to Home
              </button>
            </Link>
          </div>
        </section>
        <Footer />
      </main>
    );
  }
}
