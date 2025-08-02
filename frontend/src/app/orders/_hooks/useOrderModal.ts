"use client";

import { useState } from 'react';
import type { Order } from '../types';

export function useOrderModal() {
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = (order: Order) => {
    setSelectedOrder(order);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedOrder(null);
  };

  return {
    selectedOrder,
    isModalOpen,
    openModal,
    closeModal
  };
}