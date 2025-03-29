import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase/config";

export type MenuItem = {
    id: number;
    name: string;
    image: string;
    price: number;
    discountedPrice?: number;
    isFeatured?: boolean;
    category: string;
};

export async function getMenuItems(): Promise<MenuItem[] | null> {
    try {
        const menuCollection = collection(db, "menu-items");
        const snapshot = await getDocs(menuCollection);

        if (snapshot.empty) {
            return null;
        }

        return snapshot.docs.map((doc) => ({
            id: Number(doc.id),
            ...doc.data(),
        })) as MenuItem[];
    } catch (error) {
        console.error("Error fetching menu items:", error);
        return null;
    }
}
