import Link from "next/link";
import DeleteButton from "./DeleteButton";

export default function ProductCard({ product }) {
  const { id, name, price, stock, created_at } = product;

  const formatDate = (dateStr) => {
    return new Date(dateStr).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const stockBadge = (stock) => {
    if (stock === 0)
      return { label: "Out of stock", class: "bg-red-500/20 text-red-400" };
    if (stock <= 20)
      return { label: "Low stock", class: "bg-yellow-500/20 text-yellow-400" };
    return { label: "In stock", class: "bg-green-500/20 text-green-400" };
  };

  const badge = stockBadge(stock);

  return (
    <div className="border border-gray-700 rounded-xl p-4 flex flex-col gap-2 bg-gray-900 hover:border-gray-500 transition-colors">
      <div className="flex items-center justify-between">
        <span className="text-xs text-gray-500">ID #{id}</span>
        <DeleteButton id={id}/>
      </div>

      <Link
        href={`/products/${id}`}
        className="text-base font-medium text-white leading-snug"
      >
        {name}
      </Link>

      <div className="text-xl font-semibold text-white">
        ${parseFloat(price).toFixed(2)}
      </div>

      <div className="flex items-center justify-between">
        <span
          className={`text-xs px-2 py-1 rounded-md font-medium ${badge.class}`}
        >
          {badge.label}
        </span>
        <span className="text-xs text-gray-400">{stock} units</span>
      </div>

      <div className="text-xs text-gray-600 border-t border-gray-700 pt-2">
        {formatDate(created_at)}
      </div>
    </div>
  );
}
