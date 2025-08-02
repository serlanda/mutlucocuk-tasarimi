"use server";

import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { db } from "~/server/db";
import { products, cartItems } from "~/server/db/schema";

const productSchema = z.object({
    name: z.string().min(1),
    price: z.coerce.number().int().min(1),
    description: z.string().min(1),
    image: z.string().min(1),
})

const updateSchema = productSchema.extend({
    id: z.string().min(1),
})


export async function addProduct(formData: FormData) {
    const result = productSchema.safeParse(Object.fromEntries(formData.entries()))
    if (result.success === false ) return result.error.formErrors.fieldErrors;
    
    const data = result.data;

    await db.insert(products).values({
        name: data.name,
        price: data.price,
        description: data.description,
        image: data.image,
    });

    redirect("/admin");
}

export async function updateProduct(formData: FormData) {
    const result = updateSchema.safeParse(Object.fromEntries(formData.entries()))
    if (result.success === false) return result.error.formErrors.fieldErrors;
    
    const data = result.data;

    try {
        await db.update(products)
            .set({
                name: data.name,
                price: data.price,
                description: data.description,
                image: data.image,
                updatedAt: new Date(),
            })
            .where(eq(products.id, data.id));

        revalidatePath("/admin");
        revalidatePath("/products");
        
        return { success: true, message: "Ürün başarıyla güncellendi" };
    } catch (error) {
        console.error("Error updating product:", error);
        return { success: false, message: "Ürün güncellenirken bir hata oluştu" };
    }
}

export async function deleteTableProduct(id: string) {
    try {
        // First, remove the product from all users' carts
        await db.delete(cartItems).where(eq(cartItems.productId, id));
        
        // Then delete the product itself
        await db.delete(products).where(eq(products.id, id));
        
        // Revalidate relevant paths
        revalidatePath("/admin");
        revalidatePath("/cart");
        revalidatePath("/products");
        
    } catch (error) {
        console.error("Error deleting product:", error);
        throw new Error("Ürün silinirken bir hata oluştu");
    }

    redirect("/admin");
}