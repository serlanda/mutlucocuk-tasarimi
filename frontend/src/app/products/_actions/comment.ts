"use server";

import { auth } from "@clerk/nextjs/server";
import { z } from "zod";
import { db } from "~/server/db";
import { comments } from "~/server/db/schema";
import { redirect } from "next/navigation";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";


const addSchema = z.object({
    author: z.string().min(1),
    header: z.string().min(1),
    content: z.string().min(1),
    star: z.string().min(1),
    productId: z.string().min(1),
})

const user = auth();

export async function addComment(formData: FormData) {
    const result = addSchema.safeParse(Object.fromEntries(formData.entries()))
    if (result.success === false ) return result.error.formErrors.fieldErrors;
    
    const data = result.data;

    console.log(data);
    await db.insert(comments).values({
        userId: user.userId,
        productId: data.productId,
        author: data.author,
        header: data.header,
        content: data.content,
        star: data.star,
    });

    redirect(`/products/${data.productId}`);
}

export async function deleteComment(id: string) {
    await db.delete(comments).where(eq(comments.id, id))

    revalidatePath("/products/[id]");
}