"use client";

import { useState, useEffect } from 'react';
import { useUser } from "@clerk/nextjs";
import OrderCard from './_components/OrderCard';
import OrderDetailsModal from './_components/OrderDetailsModal';
import OrderFilters from './_components/OrderFilters';
import EmptyState from './_components/EmptyState';
import { useOrderFilters } from './_hooks/useOrderFilters';
import { useOrderModal } from './_hooks/useOrderModal';
import type { Order } from './types';

export default function OrdersPage() {
  const { user, isLoaded } = useUser();
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOrders = async () => {
      if (!isLoaded || !user) {
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        setError(null);
        
        // Fetch orders from API route
        const response = await fetch(`/api/orders?userId=${user.id}`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch orders');
        }
        
        const data = await response.json();
        
        // Transform the data to match our Order type
        const transformedOrders: Order[] = data.map((order: any) => ({
          ...order,
          createdAt: new Date(order.createdAt),
          updatedAt: order.updatedAt ? new Date(order.updatedAt) : null,
          orderItems: order.orderItems.map((item: any) => ({
            ...item,
            createdAt: new Date(item.createdAt),
            product: {
              ...item.product,
              createdAt: new Date(item.product.createdAt),
              updatedAt: item.product.updatedAt ? new Date(item.product.updatedAt) : null,
            }
          }))
        }));
        
        setOrders(transformedOrders);
      } catch (error) {
        console.error('Error fetching orders:', error);
        setError('Siparişler yüklenirken bir hata oluştu');
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrders();
  }, [user, isLoaded]);

  const { 
    filterPeriod, 
    setFilterPeriod, 
    sortBy, 
    setSortBy, 
    filteredOrders 
  } = useOrderFilters(orders);

  const { 
    selectedOrder, 
    isModalOpen, 
    openModal, 
    closeModal 
  } = useOrderModal();

  const handleStartShopping = () => {
    window.location.href = '/products';
  };

  if (!isLoaded || isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#A2D2FF] mx-auto mb-4"></div>
          <p className="text-gray-600">Siparişler yükleniyor...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 mb-4">Siparişlerinizi görüntülemek için giriş yapmanız gerekiyor.</p>
          <button 
            onClick={() => window.location.href = '/sign-in'}
            className="px-6 py-3 bg-[#A2D2FF] text-white font-medium rounded-lg hover:bg-[#BDE0FE] transition-colors"
          >
            Giriş Yap
          </button>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="px-6 py-3 bg-[#A2D2FF] text-white font-medium rounded-lg hover:bg-[#BDE0FE] transition-colors"
          >
            Tekrar Dene
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Siparişlerim</h1>
          <p className="text-gray-600">
            Tüm siparişlerinizi buradan takip edebilirsiniz
          </p>
        </div>

        {orders.length === 0 ? (
          <EmptyState onStartShopping={handleStartShopping} />
        ) : (
          <>
            <OrderFilters
              filterPeriod={filterPeriod}
              sortBy={sortBy}
              onFilterChange={setFilterPeriod}
              onSortChange={setSortBy}
            />

            {filteredOrders.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-600">
                  Seçilen kriterlere uygun sipariş bulunamadı.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {filteredOrders.map((order) => (
                  <OrderCard
                    key={order.id}
                    order={order}
                    onViewDetails={openModal}
                  />
                ))}
              </div>
            )}
          </>
        )}

        <OrderDetailsModal
          order={selectedOrder}
          isOpen={isModalOpen}
          onClose={closeModal}
        />
      </div>
    </div>
  );
}