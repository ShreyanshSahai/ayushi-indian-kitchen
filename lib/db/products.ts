import { dummyProducts, dummyImages } from "./dummy-data";

export async function getFoodProducts() {
    // For now, return dummy data instead of fetching from Firebase
    return {
        products: dummyProducts,
        images: dummyImages,
    };
}
