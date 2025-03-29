import { FoodProduct } from "@/lib/db/models/food-product";
import { Image } from "@/lib/db/models/image";

interface FoodCardProps {
    product: FoodProduct;
    image: Image;
}

export function FoodCard({ product, image }: FoodCardProps) {
    if (!product.isActive) return null;

    // Calculate discount percentage if discounted price exists
    const discountPercentage = product.discountedPrice
        ? Math.round(
              ((product.price - product.discountedPrice) / product.price) * 100
          )
        : 0;

    return (
        <div className="group relative rounded-lg border p-4 hover:border-orange-500">
            <div className="aspect-square overflow-hidden rounded-lg">
                <img
                    src={image.path}
                    alt={product.name}
                    className="h-full w-full object-cover transition-transform group-hover:scale-105"
                />
            </div>
            <div className="mt-4 space-y-2">
                <h3 className="text-lg font-semibold">{product.name}</h3>
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        {product.discountedPrice ? (
                            <>
                                <span className="text-lg font-bold">
                                    ₹{product.discountedPrice}
                                </span>
                                <span className="text-sm text-muted-foreground line-through">
                                    ₹{product.price}
                                </span>
                                <span className="text-sm text-green-600">
                                    ({discountPercentage}% off)
                                </span>
                            </>
                        ) : (
                            <span className="text-lg font-bold">
                                ₹{product.price}
                            </span>
                        )}
                    </div>
                    <div className="text-sm text-muted-foreground">
                        {product.quantity} {product.unit}
                    </div>
                </div>
            </div>
        </div>
    );
}
