import { getDocs, query, where } from "firebase/firestore";
import { foodProductsCollection, imagesCollection } from "./collections";
import { FoodProduct } from "./models/food-product";
import { Image } from "./models/image";
import { dummyProducts, dummyImages } from "./dummy-data";

export async function getFoodProducts() {
    // For now, return dummy data instead of fetching from Firebase
    return {
        products: dummyProducts,
        images: dummyImages,
    };
}
