import { TProduct } from "@/types/product.types";

export type CardFeaturedCoursesProps = {
  product: TProduct;
};

export default function CardFeaturedCourses({ product }: CardFeaturedCoursesProps) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden m-4 flex flex-col" style={{ width: 300, height: 350 }}>
      <img className="w-full h-48 object-cover" src={product.thumbnail} alt={product.name} />
      <div className="p-4 flex-grow flex flex-col justify-end">
        <h3 className="text-xl mb-2">{product.name}</h3>
        <p className="text-gray-700 text-sm font-extralight mt-auto">{product.excerpt}</p>
      </div>
    </div>
  );
}
