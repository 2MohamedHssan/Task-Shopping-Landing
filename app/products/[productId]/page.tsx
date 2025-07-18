"use client";

import { useParams } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import Image from "next/image";
import { CartContext } from "@/app/context/Cartcontext";

interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  image: string;
}

export default function ProductDetails() {
  const { productId } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (productId) {
      fetch(`https://fakestoreapi.com/products/${productId}`)
        .then((res) => res.json())
        .then((data) => {
          setProduct(data);
          setLoading(false);
        })
        .catch(() => setLoading(false));
    }
  }, [productId]);

  if (loading) return <p className="text-center">Loading...</p>;
  if (!product) return <p className="text-center">Product not found!</p>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex flex-col md:flex-row gap-6">
        <Image
          src={product.image}
          alt={product.title}
          width={400}
          height={400}
          className="rounded-lg shadow"
        />
        <div>
          <h1 className="text-3xl font-bold">{product.title}</h1>
          <p className="text-gray-600 mt-4">{product.description}</p>
          <p className="text-xl font-semibold mt-4">${product.price}</p>
        </div>
      </div>
    </div>
  );
}
