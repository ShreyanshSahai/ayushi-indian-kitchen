import { collection } from "firebase/firestore";
import { db } from "@/lib/firebase/config";

export const ingredientsCollection = collection(db, "ingredients");
export const imagesCollection = collection(db, "images");
export const foodProductsCollection = collection(db, "food-products");
