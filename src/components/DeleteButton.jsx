'use client';

import { Trash2, Loader2 } from 'lucide-react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { deleteProductById } from '@/actions/products.action';

export default function DeleteButton({ id }) {
  const [isDeleting, setIsDeleting] = useState(false);
  const router = useRouter();

  const handleDelete = async () => {
    // Basic confirmation dialog
    if (!confirm('Are you sure you want to delete this?')) return;

    setIsDeleting(true);

    try {
      const res = await deleteProductById(id)

      if (res.success) {
        // Refresh the page data or redirect
        router.refresh();
      } else {
        alert('Failed to delete item.');
      }
    } catch (error) {
      console.error('Delete error:', error);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <button
      onClick={handleDelete}
      disabled={isDeleting}
      className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md transition-colors disabled:opacity-50 cursor-pointer"
    >
      {isDeleting ? (
        <Loader2 className="w-4 h-4 animate-spin" />
      ) : (
        <Trash2 className="w-4 h-4" />
      )}
      {isDeleting ? 'Deleting...' : 'Delete'}
    </button>
  );
}
