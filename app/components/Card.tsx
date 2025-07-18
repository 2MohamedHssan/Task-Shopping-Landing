"use client";
import Image from "next/image";
import { useContext, useState } from "react";
import { CartContext } from "../context/Cartcontext";
interface Product {
  id: number;
  category: string;
  description: string;
  title: string;
  price: number;
  image: string;
}

function Card({ product }: { product: Product }) {
  const cartContext = useContext(CartContext);
  const { addToCart } = cartContext || {};
  const [Add, setAdd] = useState(true);

  return (
    <div
      key={product.id}
      className="shadow-lg group mt-4 bg-gray-100 rounded-2xl overflow-hidden text-black"
    >
      <div className="flex  justify-center items-center h-48 bg-white">
        <Image
          width={100}
          loading="lazy"
          className="group-hover:scale-105 transition-transform duration-300"
          height={100}
          src={product.image}
          alt={product.title}
        />
      </div>
      <div className="p-4 text-start">
        <h2 className="text-xl font-semibold">{product.category}</h2>
        <h2 className="text-sm text-gray-600 font-semibold">
          {product.title.length > 40
            ? product.title.slice(0, 40) + "..."
            : product.title}
        </h2>
        <p className="text-gray-700 mt-2">
          {product.description.slice(0, 60)}...
        </p>
        <span className="block mt-1 text-lg font-bold">
          Price: ${product.price}
        </span>
        <button
          onClick={() => {
            if (addToCart) {
              addToCart({ ...product, quantity: 1 });
            }
            setAdd((prev: any) => (prev.id == product.id ? true : false));
          }}
          className={`mt-4 bg-blue-500 ${
            Add ? "" : "opacity-50"
          } text-white px-4 py-2 rounded hover:bg-blue-400 cursor-pointer `}
        >
          {Add ? "Add to Cart" : "Added to Cart"}
        </button>
      </div>
    </div>
  );
}

export default Card;
