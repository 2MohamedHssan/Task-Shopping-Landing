"use client";

import Link from "next/link";
import React, { useContext, useState } from "react";
import { Product } from "../context/Cartcontext";
import { DataContext } from "../context/dataAPI";

function Navbar() {
  const [open, setOpen] = useState(false);
  const [empty, setEmpty] = useState(false);
  const [searchTerm, setSearchTerm] = useState<Product[]>([]);
  const products = useContext(DataContext);
  console.log("Data from context in Navbar:", products?.data);

  const HandleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toLowerCase();
    const filteredProducts = products?.data.filter((product) =>
      product.category.toLowerCase().includes(value)
    );
    if (filteredProducts?.length === 0) {
      setEmpty(true);
    } else {
      setEmpty(false);
    }
    setSearchTerm(filteredProducts || []);
    setOpen(true);
    if (e.target.value === "") {
      setOpen(false);
    }
    console.log("Search Results:", filteredProducts);
  };

  return (
    <nav className="bg-gray-800 text-white sticky top-0 w-full z-50 shadow-md">
      <div className="container mx-auto flex justify-between gap-5 md:gap-20 items-center p-4  text-white">
        <Link href="/" className="text-nowrap">
          My Store
        </Link>
        <input
          onChange={(e) => {
            HandleSearch(e);
          }}
          type="search"
          className="border-b-white border-b md:flex-grow focus:outline-none"
          placeholder="Search products"
        />
        <Link href="/cart" className="link link-hover">
          Cart
        </Link>
        {open && (
          <ul className="flex gap-4 flex-col bg-white text-black p-4 absolute top-16 right-[10%] w-[80%] shadow-lg rounded-lg">
            {empty ? (
              <li className="text-red-500">No products found</li>
            ) : (
              <li className="text-gray-500">Search Results:</li>
            )}{" "}
            {searchTerm?.map((product: Product) => (
              <li
                key={product.id}
                onClick={() => setOpen(false)}
                className="hover:bg-gray-200 p-2 rounded"
              >
                <Link href={`/products/${product.id}`}>{product.title}</Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
