"use client";

import { useEffect, useState } from "react";
import { FoodCard } from "@/components/food-card";
import { getFoodProducts } from "@/lib/db/products";
import { FoodProduct } from "@/lib/db/models/food-product";
import { Image } from "@/lib/db/models/image";

export default function MenuPage() {
    const [products, setProducts] = useState<FoodProduct[]>([]);
    const [images, setImages] = useState<Image[]>([]);

    useEffect(() => {
        const loadProducts = async () => {
            const { products, images } = await getFoodProducts();
            setProducts(products);
            setImages(images);
        };
        loadProducts();
    }, []);

    return (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {products.map((product) => {
                const image = images.find(
                    (img) => img.productId === product.id
                );
                if (!image) return null;
                return (
                    <FoodCard
                        key={product.id}
                        product={product}
                        image={image}
                    />
                );
            })}
        </div>
    );
}
