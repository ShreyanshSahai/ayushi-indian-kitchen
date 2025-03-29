export type UserRole = "admin" | "user";

export interface UserData {
    id: string;
    username: string;
    mobile: string;
    email: string;
    gender: string;
    role: UserRole;
    createdOn: Date;
    isActive: boolean;
    isBlocked: boolean;
    createdFrom: "Registration" | "GoogleSignIn";
}
