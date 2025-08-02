"use client";

import { FunnelIcon, ArrowsUpDownIcon } from '@heroicons/react/24/outline';
import { OrderFilterPeriod, OrderSortBy } from '../types';

interface OrderFiltersProps {
  filterPeriod: OrderFilterPeriod;
  sortBy: OrderSortBy;
  onFilterChange: (period: OrderFilterPeriod) => void;
  onSortChange: (sort: OrderSortBy) => void;
}

export default function OrderFilters({ 
  filterPeriod, 
  sortBy, 
  onFilterChange, 
  onSortChange 
}: OrderFiltersProps) {
  return (
    <div className="flex flex-col sm:flex-row gap-4 mb-6">
      <div className="flex items-center gap-2">
        <FunnelIcon className="w-5 h-5 text-gray-400" />
        <select
          value={filterPeriod}
          onChange={(e) => onFilterChange(e.target.value as OrderFilterPeriod)}
          className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#A2D2FF] focus:border-transparent"
        >
          <option value={OrderFilterPeriod.ALL}>Tüm Siparişler</option>
          <option value={OrderFilterPeriod.LAST_30_DAYS}>Son 30 Gün</option>
          <option value={OrderFilterPeriod.LAST_3_MONTHS}>Son 3 Ay</option>
          <option value={OrderFilterPeriod.LAST_6_MONTHS}>Son 6 Ay</option>
        </select>
      </div>

      <div className="flex items-center gap-2">
        <ArrowsUpDownIcon className="w-5 h-5 text-gray-400" />
        <select
          value={sortBy}
          onChange={(e) => onSortChange(e.target.value as OrderSortBy)}
          className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#A2D2FF] focus:border-transparent"
        >
          <option value={OrderSortBy.DATE_DESC}>Tarih (Yeni → Eski)</option>
          <option value={OrderSortBy.DATE_ASC}>Tarih (Eski → Yeni)</option>
          <option value={OrderSortBy.AMOUNT_DESC}>Tutar (Yüksek → Düşük)</option>
          <option value={OrderSortBy.AMOUNT_ASC}>Tutar (Düşük → Yüksek)</option>
        </select>
      </div>
    </div>
  );
}