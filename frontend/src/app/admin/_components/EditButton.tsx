"use client";

import { PencilIcon } from "@heroicons/react/24/outline";

interface Product {
  id: string;
  name: string;
  price: number;
  description: string | null;
  image: string;
}

interface EditButtonProps {
  product: Product;
  onEdit: (product: Product) => void;
}

export default function EditButton({ product, onEdit }: EditButtonProps) {
  return (
    <button 
      className="inline-flex items-center gap-1 px-3 py-1 text-sm text-blue-600 hover:text-blue-900 hover:bg-blue-50 rounded-lg transition-colors"
      onClick={() => onEdit(product)}
    >
      <PencilIcon className="w-4 h-4" />
      Düzenle
    </button>
  );
}