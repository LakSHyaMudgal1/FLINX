import React, { useState, useEffect } from "react";
import { db } from "../firebaseConfig";
import { collection, onSnapshot } from "firebase/firestore";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { FaShoppingCart } from "react-icons/fa";

// publishable key
const stripePromise = loadStripe("pk_test_51QObWyCozvwxkumzgGCoBNtmFUE3fb09PxUXh2FdZNlUY5mH5YDxdl1Tlv5LPiKw7kRyQrrJJ6XdCGEKYY0eI6aH00giKkJl3C");

const CombinedCart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);

  const serviceCollections = [
    { name: "barberCart", type: "Barber" },
    { name: "addedtocart", type: "Electrical Repair" },
    { name: "cleaningCart", type: "Home Cleaning" },
    { name: "plumbingCart", type: "Plumbing" },
    { name: "vegetableVendorCart", type: "Vegetable Vendor" },
    { name: "carpentryCart", type: "Carpentry" },
    { name: "paintingCart", type: "Painting" },
    { name: "tiffinCart", type: "Tiffin" },
    { name: "pestControlCart", type: "Pest Control" },
  ];

  useEffect(() => {
    const fetchCartItems = () => {
      const unsubscribes = serviceCollections.map((service) =>
        onSnapshot(collection(db, service.name), (snapshot) => {
          const items = snapshot.docs.map((doc) => ({
            id: doc.id,
            type: service.type,
            ...doc.data(),
          }));
          setCartItems((prev) => {
            const otherItems = prev.filter((item) => item.type !== service.type);
            return [...otherItems, ...items];
          });
        })
      );
      return () => unsubscribes.forEach((unsubscribe) => unsubscribe());
    };
    fetchCartItems();
  }, []);

  useEffect(() => {
    const total = cartItems.reduce((sum, item) => sum + (parseFloat(item.price) || 0), 0);
    setTotalAmount(total);
  }, [cartItems]);

  const handlePayment = async () => {
    console.log("Pay Now button clicked");
    try {
      const response = await fetch("http://localhost:5000/create-checkout-session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ cartItems }),
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const { id } = await response.json();
      console.log("Session ID:", id);
  
      const stripe = await stripePromise;
      const { error } = await stripe.redirectToCheckout({ sessionId: id });
  
      if (error) {
        console.error("Stripe Checkout error:", error.message);
      }
    } catch (error) {
      console.error("Payment initiation failed:", error.message);
    }
  };

  return (
    <div className="bg-[#121212] min-h-screen flex flex-col items-center text-white">
      <header className="w-full py-8 bg-gray-900 text-center shadow-lg">
        <h1 className="text-4xl font-bold">Combined Cart</h1>
      </header>

      <section className="w-full max-w-4xl px-4 py-16">
        <h2 className="text-2xl font-semibold mb-6">Your Selected Items</h2>

        {cartItems.length > 0 ? (
          <>
            <ul className="space-y-6">
              {cartItems.map((item) => (
                <li
                  key={item.id}
                  className="flex justify-between items-center bg-[#1e1e1e] p-6 rounded-lg shadow-xl transform transition duration-300 hover:scale-105"
                >
                  <div>
                    <h3 className="text-lg font-semibold">{item.providerName || "Provider"}</h3>
                    <p className="text-gray-400">
                      {item.type}: {item.service || "Service Type"} - ${item.price} per session/item
                    </p>
                    <p className="text-gray-400">Contact: {item.contact}</p>
                  </div>
                </li>
              ))}
            </ul>
            <div className="mt-10">
              <h3 className="text-xl font-bold">Total: ${totalAmount.toFixed(2)}</h3>

              <button
                onClick={handlePayment}
                className="bg-green-600 text-white px-8 py-3 rounded-lg hover:bg-green-800 transition duration-300 text-lg font-semibold shadow-md"
              >
                Pay Now
              </button>
            </div>
          </>
        ) : (
          <div className="text-center">
            <FaShoppingCart className="text-6xl text-gray-400 mx-auto" />
            <p className="text-gray-400 mt-4">Your cart is empty.</p>
          </div>
        )}
      </section>
    </div>
  );
};

export default CombinedCart;
