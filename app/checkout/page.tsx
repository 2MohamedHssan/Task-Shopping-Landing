"use client";

import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { CartContext } from "../context/Cartcontext";

const CheckoutSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  address: z.string().min(1, "Address is required"),
  cardNumber: z.string().regex(/^\d{16}$/, "Card number must be 16 digits"),
  expiry: z.string().regex(/^(0[1-9]|1[0-2])\/\d{2}$/, "Use MM/YY format"),
  cvc: z.string().regex(/^\d{3,4}$/, "CVC must be 3-4 digits"),
});

type CheckoutFormInputs = z.infer<typeof CheckoutSchema>;

export default function CheckoutPage() {
  const {
    cart = [],
    totalPrice = 0,
    clearCart,
  } = useContext(CartContext) || {
    cart: [],
    totalPrice: 0,
    clearCart: () => {},
  };

  const [orderConfirmed, setOrderConfirmed] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CheckoutFormInputs>({
    resolver: zodResolver(CheckoutSchema),
  });

  const onSubmit = (data: CheckoutFormInputs) => {
    console.log("Order Data:", data);
    setOrderConfirmed(true);
    clearCart?.();
    reset();
  };

  if (orderConfirmed) {
    return (
      <div className="min-h-screen bg-gray-100 py-10 flex items-center justify-center">
        <div className="max-w-md w-full bg-white shadow-lg rounded-lg p-6 text-center">
          <h1 className="text-2xl font-bold mb-2 text-green-600">
            ✅ Order Confirmed
          </h1>
          <p className="text-gray-600 mb-4">Thanks for your order!</p>
          <button
            onClick={() => setOrderConfirmed(false)}
            className="px-4 py-2 bg-blue-600 text-white cursor-pointer rounded hover:bg-blue-700 transition"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6">
        <h1 className="text-2xl font-bold mb-4 text-center">Checkout</h1>

        <div className="border-b pb-4 mb-4">
          <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
          {cart.length === 0 ? (
            <p>Your cart is empty.</p>
          ) : (
            <>
              {cart.map((item: any) => (
                <div key={item.id} className="flex justify-between mb-2">
                  <span>
                    {item.title?.slice(0, 20)} (x{item.quantity})
                  </span>
                  <span>${(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
              <hr className="my-3" />
              <h3 className="text-lg font-bold">
                Total: ${totalPrice.toFixed(2)}
              </h3>
            </>
          )}
        </div>

        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <h2 className="text-xl font-semibold mb-2">Billing Details</h2>

          <div>
            <input
              {...register("name")}
              placeholder="Full Name"
              className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-500"
            />
            {errors.name && (
              <p className="text-red-500 text-sm">{errors.name.message}</p>
            )}
          </div>

          <div>
            <input
              {...register("email")}
              placeholder="Email Address"
              className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-500"
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}
          </div>

          <div>
            <input
              {...register("address")}
              placeholder="Address"
              className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-500"
            />
            {errors.address && (
              <p className="text-red-500 text-sm">{errors.address.message}</p>
            )}
          </div>

          <h2 className="text-xl font-semibold mt-4">Payment Information</h2>

          <div>
            <input
              {...register("cardNumber")}
              placeholder="Card Number (16 digits)"
              className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-500"
            />
            {errors.cardNumber && (
              <p className="text-red-500 text-sm">
                {errors.cardNumber.message}
              </p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <input
                {...register("expiry")}
                placeholder="MM/YY"
                className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-500"
              />
              {errors.expiry && (
                <p className="text-red-500 text-sm">{errors.expiry.message}</p>
              )}
            </div>
            <div>
              <input
                {...register("cvc")}
                placeholder="CVC"
                className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-500"
              />
              {errors.cvc && (
                <p className="text-red-500 text-sm">{errors.cvc.message}</p>
              )}
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition"
          >
            Pay Now
          </button>
        </form>
      </div>
    </div>
  );
}
