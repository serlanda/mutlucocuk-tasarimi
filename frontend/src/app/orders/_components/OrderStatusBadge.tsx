import { CheckCircleIcon, ClockIcon, TruckIcon, XCircleIcon } from '@heroicons/react/24/outline';
import type { OrderStatusBadgeProps } from '../types';
import { formatOrderStatus } from '../utils';

export default function OrderStatusBadge({ status }: OrderStatusBadgeProps) {
  const getStatusConfig = (status: string) => {
    switch (status) {
      case 'pending':
        return {
          color: 'bg-gray-100 text-gray-700 border-gray-300',
          icon: ClockIcon,
          text: formatOrderStatus(status)
        };
      case 'processing':
        return {
          color: 'bg-yellow-100 text-yellow-700 border-yellow-300',
          icon: ClockIcon,
          text: formatOrderStatus(status)
        };
      case 'shipped':
        return {
          color: 'bg-blue-100 text-blue-700 border-blue-300',
          icon: TruckIcon,
          text: formatOrderStatus(status)
        };
      case 'delivered':
        return {
          color: 'bg-green-100 text-green-700 border-green-300',
          icon: CheckCircleIcon,
          text: formatOrderStatus(status)
        };
      case 'cancelled':
        return {
          color: 'bg-red-100 text-red-700 border-red-300',
          icon: XCircleIcon,
          text: formatOrderStatus(status)
        };
      default:
        return {
          color: 'bg-gray-100 text-gray-700 border-gray-300',
          icon: ClockIcon,
          text: formatOrderStatus(status)
        };
    }
  };

  const config = getStatusConfig(status);
  const IconComponent = config.icon;

  return (
    <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium border ${config.color}`}>
      <IconComponent className="w-4 h-4" />
      {config.text}
    </span>
  );
}