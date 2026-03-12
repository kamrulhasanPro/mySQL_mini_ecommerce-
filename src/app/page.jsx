import { getProducts } from "@/actions/products.action";
import ProductCard from "@/components/ProductCard";
import Image from "next/image";
import { notFound } from "next/navigation";

export default async function Home() {
  const products = await getProducts();
  if (!products) notFound();

  return (
    <div>
      <h1 className="font-bold text-center text-emerald-400 text-3xl my-4">
        This is MySql Mini Project
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
