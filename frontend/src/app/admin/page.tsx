import { auth } from "@clerk/nextjs/server";
import ProductForm from "./_components/productForm";
import AdminProductsTable from "./_components/productTable";
import CargoForm from "./_components/CargoForm";
import OrdersTable from "./_components/OrdersTable";
import { getAllOrders } from "./_actions/orders";
import { db } from "~/server/db";

export default async function AdminPage() {
  const { sessionClaims } = auth();

  if (sessionClaims?.metadata.role !== "admin") {
    return (
      <div className="text-center text-xl font-semibold text-black">
        <h1>Sayfa bulunamadı</h1>
      </div>
    );
  }

  const orders = await getAllOrders();
  const products = await db.query.products.findMany();

  return (
    <main className="min-h-screen w-full bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Paneli</h1>
          <p className="text-gray-600">Ürün ve sipariş yönetimi</p>
        </div>

        {/* Products Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1">
            <ProductForm />
          </div>
          <div className="lg:col-span-2">
            <AdminProductsTable products={products} />
          </div>
        </div>

        {/* Orders Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1">
            <CargoForm orders={orders} />
          </div>
          <div className="lg:col-span-2">
            <OrdersTable orders={orders} />
          </div>
        </div>
      </div>
    </main>
  );
}