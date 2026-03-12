import { getProducts } from "@/actions/products.action";
import ProductCard from "@/components/ProductCard";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function Home() {
  const products = await getProducts();
  if (!products) notFound();

  return (
    <div>
      {/* title and button  */}
      <div className="flex items-center justify-center flex-col">
        <h1 className="font-bold text-center text-emerald-400 text-3xl my-4">
          This is MySql Mini Project
        </h1>
        <Link
          href="/products/add"
          className="bg-blue-600 hover:bg-blue-500 text-white text-sm font-medium px-4 py-2 rounded-xl transition-colors inline mx-auto"
        >
          + Add Product
        </Link>
      </div>

      {/* products */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
