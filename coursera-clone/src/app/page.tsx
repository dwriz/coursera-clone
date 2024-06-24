"use server";

import CardFeaturedCourses from "@/components/CardFeaturedCourses";
import { Product } from "@/db/models/product.model";
import Link from "next/link";

export default async function Home() {
  const products = await Product.findAll();

  return (
    <>
      {/* hero */}
      <div className="flex flex-row px-20">
        <div className="w-full px-4 py-20">
          <h1 className="text-6xl font-bold mb-4">Grow your career with Coursera</h1>
          <p className="text-lg font-extralight mb-8">
            Feeling stuck in a dead-end job? Learn your way out with 7,000+ learning programs starting from $10! <em>(Although, statistically, ur probably still going to be there next year.)</em>
          </p>
          <div className="flex space-x-4">
            <Link href="/products" className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700 hover:underline">Start Learning</Link>
            <Link href="https://www.tiktok.com/" className="bg-transparent border border-blue-600 text-blue-600 px-6 py-3 rounded hover:bg-blue-100 hover:underline">Procrastinate</Link>
          </div>
        </div>
        <div>
          <img src="/hero.png" />
        </div>
      </div>
      {/* hero end */}

      {/* partners */}
      <div className="bg-gray-100 py-20">
        <h1 className="text-2xl text-center font-medium mb-10">
          We collaborate with <span className="text-blue-500">325+ leading universities and companies</span>
        </h1>
        <div className="justify-center flex flex-row">
          <img src="https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/https://images.ctfassets.net/wp1lcwdav1p1/77hmeEJo3ZPlURCU02fD52/aa37b7f7b52285ba350acac62d8af5c1/illinois-3.png?auto=format%2Ccompress&dpr=2&h=32" className="h-9 mr-7" />
          <img src="/of-logo.png" className="h-8 mr-7" />
          <img src="https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/https://images.ctfassets.net/wp1lcwdav1p1/1c6RjBHi3Lqb9QpWxje7iA/b529f909c5230af3210ba2d47d149620/google.png?auto=format%2Ccompress&dpr=2&h=37" className="h-10 mr-7" />
          <img src="https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/https://images.ctfassets.net/wp1lcwdav1p1/60SA8pGxPXMmJf4n7umK1H/ccec31bbe2358210bf8391dcba6cd2f1/umich.png?auto=format%2Ccompress&dpr=2&h=55" className="h-12 mr-7" />
          <img src="https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/https://images.ctfassets.net/wp1lcwdav1p1/3toC4I7jbWxiedfxiyNjtT/735faeaf976a9692f425f8c3a7d125dc/1000px-IBM_logo.svg.png?auto=format%2Ccompress&dpr=2&h=37" className="h-9 mr-7" />
          <img src="https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/https://images.ctfassets.net/wp1lcwdav1p1/FHOd44z40jTFsSSao84AM/d1e357f5650a23bf2936114112d44445/imperial.png?auto=format%2Ccompress&dpr=2&h=35" className="h-9 mr-7" />
          <img src="https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/https://images.ctfassets.net/wp1lcwdav1p1/4FSFmNXuDIzTvFb7n0v4mK/704ae9e0a7981fb6415f4cb4609bbbb3/stanford.svg?auto=format%2Ccompress&dpr=2&h=27" className="h-9 mr-7" />
          <img src="https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/https://images.ctfassets.net/wp1lcwdav1p1/1ZeiauXe5bPProvfuIo7o2/55d005d42979ab585cdfa01f825b7d4f/penn.svg?auto=format%2Ccompress&dpr=2&h=37" className="h-9 mr-7" />
        </div>
      </div>
      {/* partners end */}

      {/* featured courses */}
      <div className="py-20 px-20">
        <h2 className="text-4xl font-light mb-2">Featured Courses</h2>
        <p className="mb-8 text-lg font-extralight">Explore our newest programs, focused on delivering in-demand skills.</p>

        {/* cards */}
        <div className="flex flex-wrap justify-start">
          {products.map((product, index) => (
            <CardFeaturedCourses key={index} product={product} />
          ))}
        </div>
        {/* cards end */}

        <div className="flex space-x-4 mt-8">
          <Link href="/products" className="bg-transparent border border-blue-600 text-blue-600 px-6 py-3 rounded hover:bg-blue-100 hover:underline">
            View all
          </Link>
        </div>
      </div>
      {/* featured courses end */}
    </>
  );
}
