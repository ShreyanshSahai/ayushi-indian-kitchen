import { db } from "./config";
import { UserRole } from "../types/user";
import { doc, getDoc } from "firebase/firestore";

export async function getUserRole(userId: string): Promise<UserRole> {
    const userDoc = await getDoc(doc(db, "users", userId));
    if (userDoc.exists()) {
        return userDoc.data().role as UserRole;
    }
    return "user"; // Default role
}

export function isAdmin(role: UserRole): boolean {
    return role === "admin";
}
