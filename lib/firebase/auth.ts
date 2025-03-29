import { auth, db, googleProvider } from "@/lib/firebase/config";
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    UserCredential,
    signInWithPopup,
} from "firebase/auth";
import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore";
import { UserData, UserRole } from "../types/user";

export interface AuthResponse {
    success: boolean;
    error?: string;
    data?: UserCredential;
}

export const firebaseAuth = {
    register: async (
        email: string,
        password: string,
        userData: Partial<UserData>
    ): Promise<AuthResponse> => {
        try {
            const userCredential = await createUserWithEmailAndPassword(
                auth,
                email,
                password
            );

            // Save additional user data to Firestore
            await setDoc(doc(db, "users", userCredential.user.uid), {
                id: userCredential.user.uid,
                email: email,
                username: userData.username,
                mobile: userData.mobile,
                gender: userData.gender,
                role: "user", // Add default role
                createdOn: serverTimestamp(),
                isActive: true,
                isBlocked: false,
                createdFrom: "Registration",
            });

            return {
                success: true,
                data: userCredential,
            };
        } catch (error: unknown) {
            const firebaseError = error as { message: string };
            return {
                success: false,
                error: firebaseError.message,
            };
        }
    },

    login: async (email: string, password: string): Promise<AuthResponse> => {
        try {
            const userCredential = await signInWithEmailAndPassword(
                auth,
                email,
                password
            );
            return {
                success: true,
                data: userCredential,
            };
        } catch (error: unknown) {
            const firebaseError = error as { message: string };
            return {
                success: false,
                error: firebaseError.message,
            };
        }
    },

    googleSignIn: async (): Promise<AuthResponse> => {
        try {
            const userCredential = await signInWithPopup(auth, googleProvider);

            // Check if user exists in Firestore, if not create a new entry
            await setDoc(
                doc(db, "users", userCredential.user.uid),
                {
                    id: userCredential.user.uid,
                    email: userCredential.user.email,
                    username: userCredential.user.displayName,
                    createdOn: serverTimestamp(),
                    isActive: true,
                    isBlocked: false,
                    createdFrom: "GoogleSignIn",
                },
                { merge: true }
            ); // merge: true will only update missing fields

            return {
                success: true,
                data: userCredential,
            };
        } catch (error: unknown) {
            const firebaseError = error as { message: string };
            return {
                success: false,
                error: firebaseError.message,
            };
        }
    },

    logout: async (): Promise<AuthResponse> => {
        try {
            await signOut(auth);
            return {
                success: true,
            };
        } catch (error: unknown) {
            const firebaseError = error as { message: string };
            return {
                success: false,
                error: firebaseError.message,
            };
        }
    },
};

// Add this function to check user role
export async function getUserRole(userId: string): Promise<UserRole> {
    const userDoc = await getDoc(doc(db, "users", userId));
    if (userDoc.exists()) {
        return userDoc.data().role as UserRole;
    }
    return "user"; // Default role
}

// Modify the registration function to include role
export async function createUserDocument(
    userId: string,
    userData: Partial<UserData>
) {
    await setDoc(doc(db, "users", userId), {
        id: userId,
        email: userData.email,
        username: userData.username,
        mobile: userData.mobile,
        gender: userData.gender,
        role: "user", // Default role for new registrations
        createdOn: serverTimestamp(),
        isActive: true,
        isBlocked: false,
        createdFrom: userData.createdFrom || "Registration",
    });
}
