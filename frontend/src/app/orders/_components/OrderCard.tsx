import { EyeIcon, CalendarDaysIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';
import OrderStatusBadge from './OrderStatusBadge';
import type { OrderCardProps } from '../types';
import { formatOrderNumber, formatOrderDate, formatPrice } from '../utils';

export default function OrderCard({ order, onViewDetails }: OrderCardProps) {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">
            {formatOrderNumber(order.orderNumber)}
          </h3>
          <div className="flex items-center gap-2 text-sm text-gray-600 mt-1">
            <CalendarDaysIcon className="w-4 h-4" />
            {formatOrderDate(order.createdAt)}
          </div>
        </div>
        <OrderStatusBadge status={order.status} />
      </div>

      <div className="flex items-center gap-4 mb-4">
        <div className="flex -space-x-2">
          {order.orderItems.slice(0, 3).map((item, index) => (
            <div key={item.id} className="relative w-12 h-12 rounded-lg overflow-hidden border-2 border-white">
              <Image
                src={item.product.image}
                alt={item.product.name}
                fill
                className="object-cover"
              />
            </div>
          ))}
          {order.orderItems.length > 3 && (
            <div className="w-12 h-12 rounded-lg bg-gray-100 border-2 border-white flex items-center justify-center text-xs font-medium text-gray-600">
              +{order.orderItems.length - 3}
            </div>
          )}
        </div>
        <div className="flex-1">
          <p className="text-sm text-gray-600">
            {order.orderItems.length} ürün
          </p>
          <p className="text-lg font-semibold text-gray-900">
            {formatPrice(order.totalAmount)}
          </p>
        </div>
      </div>

      <div className="flex justify-between items-center">
        <div className="text-sm text-gray-600">
          <p className="truncate max-w-xs">{order.shippingAddress}</p>
          {order.trackingNumber && (
            <p className="text-blue-600 font-medium">Takip: {order.trackingNumber}</p>
          )}
        </div>
        <button
          onClick={() => onViewDetails(order)}
          className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-[#A2D2FF] hover:text-white hover:bg-[#A2D2FF] border border-[#A2D2FF] rounded-lg transition-colors"
        >
          <EyeIcon className="w-4 h-4" />
          Detayları Görüntüle
        </button>
      </div>
    </div>
  );
}