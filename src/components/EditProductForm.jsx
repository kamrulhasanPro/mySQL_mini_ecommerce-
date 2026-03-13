"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { updateProduct } from "@/actions/products.action";

export default function EditProductForm({ product }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const [form, setForm] = useState({
    name: product.name,
    price: product.price,
    stock: product.stock,
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);
    const updateProductData = {
      name: form.name,
      price: parseFloat(form.price),
      stock: parseInt(form.stock),
    };

    try {
      await updateProduct(updateProductData, product.id);
      setSuccess(true);
      setTimeout(() => router.push(`/products/${product.id}`), 1000);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Back Button */}
      <Link
        href={`/products/${product.id}`}
        className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-6 text-sm w-fit"
      >
        ← Back to Product
      </Link>

      {/* Form Card */}
      <div className="border border-gray-700 rounded-2xl p-6 bg-gray-900">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-semibold text-white">Edit Product</h1>
          <p className="text-sm text-gray-500 mt-1">
            ID #{product.id} — Update the product details below
          </p>
        </div>

        <div className="border-t border-gray-700 mb-6" />

        {/* Error Message */}
        {error && (
          <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-sm px-4 py-3 rounded-xl mb-4">
            {error}
          </div>
        )}

        {/* Success Message */}
        {success && (
          <div className="bg-green-500/10 border border-green-500/20 text-green-400 text-sm px-4 py-3 rounded-xl mb-4">
            Product updated! Redirecting...
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          {/* Name */}
          <div className="flex flex-col gap-1.5">
            <label className="text-sm text-gray-400">
              Product Name <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="e.g. iPhone 15 Pro"
              required
              className="bg-gray-800 border border-gray-700 text-white text-sm rounded-xl px-4 py-2.5 placeholder-gray-600 focus:outline-none focus:border-blue-500 transition-colors"
            />
          </div>

          {/* Price */}
          <div className="flex flex-col gap-1.5">
            <label className="text-sm text-gray-400">
              Price ($) <span className="text-red-400">*</span>
            </label>
            <input
              type="number"
              name="price"
              value={form.price}
              onChange={handleChange}
              placeholder="e.g. 999.99"
              min="0"
              step="0.01"
              required
              className="bg-gray-800 border border-gray-700 text-white text-sm rounded-xl px-4 py-2.5 placeholder-gray-600 focus:outline-none focus:border-blue-500 transition-colors"
            />
          </div>

          {/* Stock */}
          <div className="flex flex-col gap-1.5">
            <label className="text-sm text-gray-400">
              Stock <span className="text-red-400">*</span>
            </label>
            <input
              type="number"
              name="stock"
              value={form.stock}
              onChange={handleChange}
              placeholder="e.g. 100"
              min="0"
              required
              className="bg-gray-800 border border-gray-700 text-white text-sm rounded-xl px-4 py-2.5 placeholder-gray-600 focus:outline-none focus:border-blue-500 transition-colors"
            />
          </div>

          <div className="border-t border-gray-700" />

          {/* Buttons */}
          <div className="flex gap-3">
            <button
              type="submit"
              disabled={loading}
              className="flex-1 bg-blue-600 hover:bg-blue-500 disabled:bg-blue-600/50 disabled:cursor-not-allowed text-white text-sm font-medium py-2.5 rounded-xl transition-colors"
            >
              {loading ? "Saving..." : "Save Changes"}
            </button>
            <Link
              href={`/products/${product.id}`}
              className="flex-1 text-center bg-gray-800 hover:bg-gray-700 text-gray-300 text-sm font-medium py-2.5 rounded-xl transition-colors border border-gray-700"
            >
              Cancel
            </Link>
          </div>
        </form>
      </div>
    </>
  );
}
