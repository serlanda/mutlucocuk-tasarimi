"use client";

import { deleteTableProduct } from "../_actions/products";

export default function DeleteButton({ id }: { id: string}) {
    return (
        <button className="border py-2 px-4 rounded-lg hover:bg-red-500 transition-colors" onClick={() => deleteTableProduct(id)}>Kaldır</button>

    )
}