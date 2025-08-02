"use client";

import { useState, useMemo } from 'react';
import { OrderFilterPeriod, OrderSortBy, type Order } from '../types';

export function useOrderFilters(orders: Order[]) {
  const [filterPeriod, setFilterPeriod] = useState<OrderFilterPeriod>(OrderFilterPeriod.ALL);
  const [sortBy, setSortBy] = useState<OrderSortBy>(OrderSortBy.DATE_DESC);

  const filteredOrders = useMemo(() => {
    let filtered = [...orders];

    // Apply date filter
    if (filterPeriod !== OrderFilterPeriod.ALL) {
      const now = new Date();
      let cutoffDate: Date;

      switch (filterPeriod) {
        case OrderFilterPeriod.LAST_30_DAYS:
          cutoffDate = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
          break;
        case OrderFilterPeriod.LAST_3_MONTHS:
          cutoffDate = new Date(now.getTime() - 90 * 24 * 60 * 60 * 1000);
          break;
        case OrderFilterPeriod.LAST_6_MONTHS:
          cutoffDate = new Date(now.getTime() - 180 * 24 * 60 * 60 * 1000);
          break;
        default:
          cutoffDate = new Date(0);
      }

      filtered = filtered.filter(order => order.createdAt >= cutoffDate);
    }

    // Apply sorting
    filtered.sort((a, b) => {
      switch (sortBy) {
        case OrderSortBy.DATE_DESC:
          return b.createdAt.getTime() - a.createdAt.getTime();
        case OrderSortBy.DATE_ASC:
          return a.createdAt.getTime() - b.createdAt.getTime();
        case OrderSortBy.AMOUNT_DESC:
          return b.totalAmount - a.totalAmount;
        case OrderSortBy.AMOUNT_ASC:
          return a.totalAmount - b.totalAmount;
        default:
          return 0;
      }
    });

    return filtered;
  }, [orders, filterPeriod, sortBy]);

  return {
    filterPeriod,
    setFilterPeriod,
    sortBy,
    setSortBy,
    filteredOrders
  };
}