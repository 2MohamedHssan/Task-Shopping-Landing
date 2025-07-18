"use client";

import { useContext } from "react";
import { CartContext } from "../context/Cartcontext";
import Link from "next/link";

export default function CartPage() {
  const cartContext = useContext(CartContext);

  if (!cartContext) return <p>Loading...</p>;

  const { cart, removeFromCart, clearCart, totalPrice, addToCart } =
    cartContext;

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4"> Your Cart</h1>

      {cart.length === 0 ? (
        <p className="text-gray-600">Your cart is empty</p>
      ) : (
        <div className="space-y-4">
          {cart.map((item) => (
            <div
              key={item.id}
              className="flex justify-between items-center bg-white shadow p-4 rounded"
            >
              <div>
                <h2 className="font-semibold">{item.title}</h2>
                <p className="text-gray-500">${item.price}</p>
                <p className="text-sm">Qty: {item.quantity}</p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => addToCart(item)}
                  className="px-2 py-1 cursor-pointer hover:opacity-85 bg-green-500 text-white rounded"
                >
                  +
                </button>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="px-2 cursor-pointer hover:opacity-85 py-1 bg-red-500 text-white rounded"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
          <div className="text-right mt-4">
            <h3 className="text-xl font-bold">
              Total: ${totalPrice.toFixed(2)}
            </h3>
            <button
              onClick={clearCart}
              className="mt-2 ml-2 px-4 py-2 bg-red-600 text-white hover:opacity-85 hover:bg-red-700 cursor-pointer rounded"
            >
              Clear Cart
            </button>
            <Link
              href="/checkout"
              className="mt-2 ml-2 px-4 py-3 bg-blue-600 text-white hover:opacity-85 hover:bg-blue-700 cursor-pointer rounded"
            >
              Checkout
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
