"use server";

import { Product } from "@/db/models/product.model";
import { redirect } from "next/navigation";
import ImageCarousel from "@/components/ImageCarousel";
import ButtonAddToWishlist from "@/components/ButtonAddToWishlist";

import type { Metadata, ResolvingMetadata } from "next";

type Props = {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata({ params, searchParams }: Props, parent: ResolvingMetadata): Promise<Metadata> {
  const slug = params.slug;

  const product = await Product.findBySlug(params.slug);

  if (!product) {
    redirect("/products");
  }

  const previousImages = (await parent).openGraph?.images || [];

  return {
    title: `Coursera - ${product.name}`,
    description: product.description,
    openGraph: {
      title: `Coursera - ${product.name}`,
      description: product.description,
      images: [`${product.images[0]}`, ...previousImages],
    },
  };
}

type PageProps = { params: { slug: string } };

export default async function Page({ params }: PageProps) {
  const product = await Product.findBySlug(params.slug);

  if (!product) {
    redirect("/products");
  }

  return (
    <div className="container mx-auto px-20 py-10">
      <div className="flex flex-col md:flex-row">
        {/* left side : image */}
        <div className="md:w-1/2 flex justify-center">
          <div className="w-full h-96 overflow-hidden rounded-lg shadow-lg">
            <ImageCarousel images={product.images} />
          </div>
        </div>
        {/* left side : image end */}
        {/* right side : details */}
        <div className="md:w-1/2 md:ml-10 mt-5 md:mt-0">
          <h1 className="text-4xl font-bold mb-3">{product.name}</h1>
          <p className="text-gray-600 text-lg mb-4">
            <em>{product.excerpt}</em>
          </p>
          <p className="text-gray-600 mb-4">{product.description}</p>
          <div className="mb-4">
            <span className="text-2xl font-bold text-blue-600">${product.price}</span>
          </div>
          <div className="mb-4">
            <ButtonAddToWishlist productId={product._id.toString()} />
          </div>
        </div>
        {/* right side : details end */}
      </div>
    </div>
  );
}
