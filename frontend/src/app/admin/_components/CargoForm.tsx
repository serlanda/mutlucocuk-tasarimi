"use client";

import { useState } from "react";
import { updateOrderCargo, type UpdateCargoData } from "../_actions/orders";
import { TruckIcon, CheckCircleIcon } from "@heroicons/react/24/outline";

interface Order {
  id: string;
  orderNumber: string;
  status: string;
  trackingNumber: string | null;
  shippingAddress: string;
  totalAmount: number;
  createdAt: Date;
  orderItems: Array<{
    id: string;
    quantity: number;
    price: number;
    product: {
      name: string;
      image: string;
    };
  }>;
}

interface CargoFormProps {
  orders: Order[];
}

export default function CargoForm({ orders }: CargoFormProps) {
  const [selectedOrderId, setSelectedOrderId] = useState<string>("");
  const [formData, setFormData] = useState({
    trackingNumber: "",
    status: "pending",
    shippingAddress: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const selectedOrder = orders.find(order => order.id === selectedOrderId);

  const handleOrderSelect = (orderId: string) => {
    setSelectedOrderId(orderId);
    const order = orders.find(o => o.id === orderId);
    if (order) {
      setFormData({
        trackingNumber: order.trackingNumber || "",
        status: order.status,
        shippingAddress: order.shippingAddress,
      });
    }
    setMessage(null);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedOrderId) {
      setMessage({ type: "error", text: "Lütfen bir sipariş seçin" });
      return;
    }

    setIsSubmitting(true);
    setMessage(null);

    try {
      const updateData: UpdateCargoData = {
        orderId: selectedOrderId,
        trackingNumber: formData.trackingNumber,
        status: formData.status,
        shippingAddress: formData.shippingAddress,
      };

      const result = await updateOrderCargo(updateData);
      
      if (result.success) {
        setMessage({ type: "success", text: result.message });
      } else {
        setMessage({ type: "error", text: result.message });
      }
    } catch (error) {
      setMessage({ type: "error", text: "Beklenmeyen bir hata oluştu" });
    } finally {
      setIsSubmitting(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending": return "bg-yellow-100 text-yellow-800";
      case "processing": return "bg-blue-100 text-blue-800";
      case "shipped": return "bg-purple-100 text-purple-800";
      case "delivered": return "bg-green-100 text-green-800";
      case "cancelled": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "pending": return "Beklemede";
      case "processing": return "İşleniyor";
      case "shipped": return "Kargoya Verildi";
      case "delivered": return "Teslim Edildi";
      case "cancelled": return "İptal Edildi";
      default: return status;
    }
  };

  return (
    <div className="border border-gray-200 rounded-lg p-6 bg-white">
      <div className="flex items-center gap-3 mb-6">
        <TruckIcon className="w-6 h-6 text-blue-600" />
        <h2 className="text-2xl font-semibold text-gray-900">Kargo Bilgileri Güncelle</h2>
      </div>

      {message && (
        <div className={`mb-4 p-3 rounded-lg ${
          message.type === "success" 
            ? "bg-green-50 text-green-800 border border-green-200" 
            : "bg-red-50 text-red-800 border border-red-200"
        }`}>
          {message.text}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Order Selection */}
        <div className="space-y-2">
          <label htmlFor="orderSelect" className="block text-sm font-medium text-gray-700">
            Sipariş Seç
          </label>
          <select
            id="orderSelect"
            value={selectedOrderId}
            onChange={(e) => handleOrderSelect(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
            required
          >
            <option value="">Sipariş seçin...</option>
            {orders.map((order) => (
              <option key={order.id} value={order.id}>
                #{order.orderNumber} - {order.totalAmount} TL - {new Date(order.createdAt).toLocaleDateString('tr-TR')}
              </option>
            ))}
          </select>
        </div>

        {/* Selected Order Details */}
        {selectedOrder && (
          <div className="bg-gray-50 rounded-lg p-4 space-y-3">
            <h3 className="font-medium text-gray-900">Sipariş Detayları</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <span className="font-medium text-gray-600">Sipariş No:</span>
                <span className="ml-2 text-gray-900">#{selectedOrder.orderNumber}</span>
              </div>
              <div>
                <span className="font-medium text-gray-600">Toplam:</span>
                <span className="ml-2 text-gray-900">{selectedOrder.totalAmount} TL</span>
              </div>
              <div>
                <span className="font-medium text-gray-600">Durum:</span>
                <span className={`ml-2 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(selectedOrder.status)}`}>
                  {getStatusText(selectedOrder.status)}
                </span>
              </div>
              <div>
                <span className="font-medium text-gray-600">Ürün Sayısı:</span>
                <span className="ml-2 text-gray-900">{selectedOrder.orderItems.length}</span>
              </div>
            </div>
          </div>
        )}

        {/* Cargo Information Form */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label htmlFor="trackingNumber" className="block text-sm font-medium text-gray-700">
              Kargo Takip Numarası
            </label>
            <input
              type="text"
              id="trackingNumber"
              name="trackingNumber"
              value={formData.trackingNumber}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
              placeholder="Takip numarasını girin"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="status" className="block text-sm font-medium text-gray-700">
              Sipariş Durumu
            </label>
            <select
              id="status"
              name="status"
              value={formData.status}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
              required
            >
              <option value="pending">Beklemede</option>
              <option value="processing">İşleniyor</option>
              <option value="shipped">Kargoya Verildi</option>
              <option value="delivered">Teslim Edildi</option>
              <option value="cancelled">İptal Edildi</option>
            </select>
          </div>
        </div>

        <div className="space-y-2">
          <label htmlFor="shippingAddress" className="block text-sm font-medium text-gray-700">
            Teslimat Adresi
          </label>
          <textarea
            id="shippingAddress"
            name="shippingAddress"
            value={formData.shippingAddress}
            onChange={handleInputChange}
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
            placeholder="Teslimat adresini girin"
            required
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting || !selectedOrderId}
          className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          <CheckCircleIcon className="w-5 h-5" />
          {isSubmitting ? "Güncelleniyor..." : "Kargo Bilgilerini Güncelle"}
        </button>
      </form>
    </div>
  );
}