"use client";

import React, { useContext, useState } from "react";
import { DataContext } from "../context/dataAPI";
import Card from "./Card";
import Skeleton from "./Skeleton";

function Products() {
  const products = useContext(DataContext);
  const [minPrice, setMinPrice] = useState<number | "">("");
  const [maxPrice, setMaxPrice] = useState<number | "">("");

  if (!products) return <p>Loading context...</p>;

  const filteredProducts = products.data?.filter((product) => {
    if (minPrice !== "" && product.price < Number(minPrice)) return false;
    if (maxPrice !== "" && product.price > Number(maxPrice)) return false;
    return true;
  });

  return (
    <div className="container mx-auto text-center py-20 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">View Products</h1>

      <div className="flex flex-col md:flex-row px-4 justify-center gap-4 mb-6">
        <input
          type="number"
          value={minPrice}
          onChange={(e) =>
            setMinPrice(e.target.value ? Number(e.target.value) : "")
          }
          placeholder="Min Price"
          className="border rounded p-2"
        />

        <input
          type="number"
          value={maxPrice}
          onChange={(e) =>
            setMaxPrice(e.target.value ? Number(e.target.value) : "")
          }
          placeholder="Max Price"
          className="border rounded p-2"
        />
      </div>

      <div className="container px-2 mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {products.loading
          ? Array.from({ length: 6 }).map((_, index) => (
              <Skeleton key={index} />
            ))
          : filteredProducts?.map((product) => (
              <Card key={product?.id} product={product} />
            ))}
      </div>
    </div>
  );
}

export default Products;
