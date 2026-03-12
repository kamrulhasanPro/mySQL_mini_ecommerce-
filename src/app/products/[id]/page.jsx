import { notFound } from "next/navigation";
import Link from "next/link";
import { getProductById } from "@/actions/products.action";

export default async function ProductDetailPage({ params }) {
  const { id } = await params;
  const product = await getProductById(id);

  if (!product) notFound();

  const formatDate = (dateStr) => {
    return new Date(dateStr).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const stockBadge = (stock) => {
    if (stock === 0)
      return { label: "Out of stock", class: "bg-red-500/20 text-red-400" };
    if (stock <= 20)
      return { label: "Low stock", class: "bg-yellow-500/20 text-yellow-400" };
    return { label: "In stock", class: "bg-green-500/20 text-green-400" };
  };

  const badge = stockBadge(product.stock);

  return (
    <div className="min-h-screen bg-gray-950 p-6">
      {/* Back Button */}
      <Link
        href="/"
        className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-6 text-sm w-fit"
      >
        ← Back to Products
      </Link>

      {/* Main Card */}
      <div className="max-w-2xl mx-auto border border-gray-700 rounded-2xl p-6 bg-gray-900">
        {/* Header */}
        <div className="flex items-start justify-between mb-6">
          <div>
            <p className="text-xs text-gray-500 mb-1">ID #{product.id}</p>
            <h1 className="text-2xl font-semibold text-white">
              {product.name}
            </h1>
          </div>
          <span
            className={`text-xs px-3 py-1 rounded-md font-medium ${badge.class}`}
          >
            {badge.label}
          </span>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-700 mb-6" />

        {/* Price & Stock */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-gray-800 rounded-xl p-4">
            <p className="text-xs text-gray-500 mb-1">Price</p>
            <p className="text-2xl font-semibold text-white">
              ${parseFloat(product.price).toFixed(2)}
            </p>
          </div>
          <div className="bg-gray-800 rounded-xl p-4">
            <p className="text-xs text-gray-500 mb-1">Stock</p>
            <p className="text-2xl font-semibold text-white">
              {product.stock}{" "}
              <span className="text-sm text-gray-400">units</span>
            </p>
          </div>
        </div>

        {/* Details Table */}
        <div className="bg-gray-800 rounded-xl p-4 mb-6">
          <p className="text-xs text-gray-500 mb-3">Product Details</p>
          <div className="flex flex-col gap-3">
            <div className="flex justify-between">
              <span className="text-sm text-gray-400">Product ID</span>
              <span className="text-sm text-white">#{product.id}</span>
            </div>
            <div className="border-t border-gray-700" />

            <div className="flex justify-between">
              <span className="text-sm text-gray-400">Product Name</span>
              <span className="text-sm text-white">{product.name}</span>
            </div>
            <div className="border-t border-gray-700" />

            <div className="flex justify-between">
              <span className="text-sm text-gray-400">Price</span>
              <span className="text-sm text-white">
                ${parseFloat(product.price).toFixed(2)}
              </span>
            </div>
            <div className="border-t border-gray-700" />

            <div className="flex justify-between">
              <span className="text-sm text-gray-400">Stock Available</span>
              <span className="text-sm text-white">{product.stock} units</span>
            </div>
            <div className="border-t border-gray-700" />

            <div className="flex justify-between">
              <span className="text-sm text-gray-400">Status</span>
              <span
                className={`text-xs px-2 py-1 rounded-md font-medium ${badge.class}`}
              >
                {badge.label}
              </span>
            </div>
            <div className="border-t border-gray-700" />

            <div className="flex justify-between">
              <span className="text-sm text-gray-400">Created At</span>
              <span className="text-sm text-white">
                {formatDate(product.created_at)}
              </span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <Link
            href={`/products/${product.id}/edit`}
            className="flex-1 text-center bg-blue-600 hover:bg-blue-500 text-white text-sm font-medium py-2.5 rounded-xl transition-colors"
          >
            Edit Product
          </Link>
          <Link
            href="/"
            className="flex-1 text-center bg-gray-800 hover:bg-gray-700 text-gray-300 text-sm font-medium py-2.5 rounded-xl transition-colors border border-gray-700"
          >
            All Products
          </Link>
        </div>
      </div>
    </div>
  );
}
