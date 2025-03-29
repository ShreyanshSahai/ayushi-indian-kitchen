export interface FoodProduct {
    id: string;
    name: string;
    description: string;
    price: number;
    discountedPrice?: number;
    ingredientId: string;
    unit: string;
    quantity: number;
    isActive: boolean;
    isFeatured: boolean;
    imageId: string;
}
