// Formatting functions for order data
export const formatOrderNumber = (orderNumber: string): string => {
  return `#${orderNumber}`;
};

export const formatOrderDate = (date: Date): string => {
  return new Intl.DateTimeFormat('tr-TR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(date);
};

export const formatPrice = (price: number): string => {
  return `₺${price.toLocaleString('tr-TR')}`;
};

export const formatOrderStatus = (status: string): string => {
  const statusMap = {
    'pending': 'Beklemede',
    'processing': 'İşleniyor', 
    'shipped': 'Kargoya Verildi',
    'delivered': 'Teslim Edildi',
    'cancelled': 'İptal Edildi'
  };
  return statusMap[status] || status;
};

export const formatQuantity = (quantity: number): string => {
  return `${quantity} Adet`;
};

export const generateOrderNumber = (): string => {
  const timestamp = Date.now().toString();
  const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
  return `ORD-${timestamp.slice(-6)}-${random}`;
};