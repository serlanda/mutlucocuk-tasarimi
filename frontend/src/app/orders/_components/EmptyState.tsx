import { ShoppingBagIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import type { EmptyStateProps } from '../types';

export default function EmptyState({ onStartShopping }: EmptyStateProps) {
  return (
    <div className="text-center py-12">
      <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
        <ShoppingBagIcon className="w-12 h-12 text-gray-400" />
      </div>
      
      <h3 className="text-lg font-medium text-gray-900 mb-2">
        Henüz siparişiniz bulunmamaktadır
      </h3>
      
      <p className="text-gray-600 mb-6">
        Alışverişe başlamak için ürünleri inceleyebilirsiniz
      </p>
      
      <Link
        href="/products"
        className="inline-flex items-center gap-2 px-6 py-3 bg-[#A2D2FF] text-white font-medium rounded-lg hover:bg-[#BDE0FE] transition-colors"
        onClick={onStartShopping}
      >
        <ShoppingBagIcon className="w-5 h-5" />
        Ürünleri İncele
      </Link>
    </div>
  );
}