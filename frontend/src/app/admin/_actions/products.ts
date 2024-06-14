"use server";

import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";
import { z } from "zod";
import { db } from "~/server/db";
import { products } from "~/server/db/schema";

const addSchema = z.object({
    name: z.string().min(1),
    price: z.coerce.number().int().min(1),
    description: z.string().min(1),
    image: z.string().min(1),
})


export async function addProduct(formData: FormData) {
    const result = addSchema.safeParse(Object.fromEntries(formData.entries()))
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

export async function deleteTableProduct(id: string) {
    await db.delete(products).where(eq(products.id, id))

    redirect("/admin");
}