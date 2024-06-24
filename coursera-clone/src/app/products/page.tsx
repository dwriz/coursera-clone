"use client";

import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import InfiniteScroll from "react-infinite-scroll-component";
import CardAllCourses from "@/components/CardAllCourses";
import { TProduct } from "@/types/product.types";

export default function Page() {
  const [products, setProducts] = useState<TProduct[]>([]);
  const [searchInput, setSearchInput] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const router = useRouter();

  useEffect(() => {
    fetchProducts(true);
  }, [searchQuery]);

  async function fetchProducts(reset = false) {
    if (reset) {
      setProducts([]);
      setPage(1);
      setHasMore(true);
    }

    Swal.fire({
      title: "Loading courses...",
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });

    try {
      const response = await fetch(`/api/products?search=${encodeURIComponent(searchQuery)}&page=${reset ? 1 : page}&limit=6`);

      const data = await response.json();

      if (response.ok) {
        if (reset) {
          setProducts(data);
        } else {
          setProducts((prevProducts) => [...prevProducts, ...data]);
        }

        if (data.length < 6) {
          setHasMore(false);
        }

        Swal.close();
      } else {
        throw new Error("Failed to fetch products");
      }
    } catch (error) {
      console.error(error);

      Swal.fire({
        icon: "error",
        title: "Error",
        text: error instanceof Error ? error.message : "An unexpected error occurred",
      }).then(() => {
        router.push("/");
      });
    }
  }

  function handleSearchInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    setSearchInput(event.target.value);
  }

  function handleSearchButtonClick() {
    setSearchQuery(searchInput);
  }

  function loadMoreProducts() {
    setPage((prevPage) => prevPage + 1);
  }

  useEffect(() => {
    if (page > 1) {
      fetchProducts();
    }
  }, [page]);

  return (
    <>
      <div className="px-20 mt-20 mb-10 justify-center">
        {/* title wrapper */}
        <div className="mb-5">
          <h2 className="text-5xl font-light mb-3">Course Library</h2>
          <p className="text-medium font-extralight">Explore our newest programs, focused on delivering in-demand skills.</p>
          <p className="text-medium font-extralight">
            Learn the skills employers think they need, <em>before they realize robots can do them cheaper.</em>
          </p>
        </div>
        {/* title wrapper end */}

        {/* product section wrapper */}
        <div className="flex">
          {/* left side wrapper */}
          <div className="w-1/4">
            <div>
              <input type="text" id="searchInput" placeholder="Search..." className="border border-gray-300 rounded w-full px-4 py-2 mb-2" value={searchInput} onChange={handleSearchInputChange} />
              <button onClick={handleSearchButtonClick} className="bg-blue-600 text-white rounded px-4 py-2 hover:bg-blue-700">
                Search
              </button>
            </div>
          </div>
          {/* left side wrapper end */}

          {/* right side wrapper */}
          <div className="w-3/4 ml-4">
            <InfiniteScroll dataLength={products.length} next={loadMoreProducts} hasMore={hasMore} loader={<h4>Loading...</h4>}>
              <div className="grid grid-cols-3 gap-4">
                {products.map((product, index) => (
                    <CardAllCourses key={index} product={product} />
                ))}
              </div>
            </InfiniteScroll>
            {/* card wrapper end */}
          </div>
          {/* right side wrapper end */}
        </div>
        {/* product section wrapper end */}
      </div>
    </>
  );
}
