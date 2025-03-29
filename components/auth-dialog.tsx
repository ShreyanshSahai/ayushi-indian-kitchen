"use client";

import { useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { ShoppingBag } from "lucide-react";
import { CartCount } from "@/components/cart-count";

// Add this import at the top
import { atma } from "@/lib/fonts";
import { firebaseAuth } from "@/lib/firebase/auth";
// Add this import
import { FcGoogle } from "react-icons/fc";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

interface AuthDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onAuthSuccess: () => void;
    showCart?: boolean;
}

export function AuthDialog({
    open,
    onOpenChange,
    onAuthSuccess,
    showCart = false,
}: AuthDialogProps) {
    const [isLogin, setIsLogin] = useState(true);
    // Update the initial state with gender property
    const [formData, setFormData] = useState({
        email: "",
        mobile: "",
        username: "",
        password: "",
        confirmPassword: "",
        gender: "", // Add gender to initial state
    });

    // Add validation functions
    const isValidEmail = (email: string): boolean => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const isStrongPassword = (password: string): boolean => {
        const passwordRegex =
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        return passwordRegex.test(password);
    };

    // Add this function to reset the form state
    const resetForm = () => {
        setIsLogin(true);
        setFormData({
            email: "",
            mobile: "",
            username: "",
            password: "",
            confirmPassword: "",
            gender: "", // Add this line
        });
    };

    const handleGoogleSignIn = async () => {
        try {
            const result = await firebaseAuth.googleSignIn();
            if (result.success) {
                toast.success("Logged in successfully!");
                onAuthSuccess();
                resetForm();
            } else {
                toast.error(result.error || "Failed to login with Google");
            }
        } catch (err: unknown) {
            console.error("Google sign-in error:", err);
            toast.error("Failed to login with Google");
        }
    };

    // Add the handleSubmit function
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!isLogin) {
            if (!isValidEmail(formData.email)) {
                toast.error("Please enter a valid email address");
                return;
            }

            if (!isStrongPassword(formData.password)) {
                toast.error(
                    "Password must be at least 8 characters long and contain uppercase, lowercase, number, and special character"
                );
                return;
            }

            if (formData.password !== formData.confirmPassword) {
                toast.error("Passwords don't match");
                return;
            }

            if (!formData.gender) {
                toast.error("Please select your gender");
                return;
            }

            try {
                const result = await firebaseAuth.register(
                    formData.email,
                    formData.password,
                    {
                        username: formData.username,
                        mobile: formData.mobile,
                        gender: formData.gender,
                        email: formData.email,
                    }
                );

                if (result.success) {
                    toast.success("Registered successfully!");
                    onAuthSuccess();
                    resetForm();
                } else {
                    toast.error(result.error || "Registration failed");
                }
            } catch (err: unknown) {
                console.error("Registration error:", err);
                toast.error("Registration failed");
            }
        } else {
            if (!formData.email && !formData.mobile && !formData.username) {
                toast.error("Please enter email, mobile, or username");
                return;
            }
        }
    };

    // Modify the Dialog component to use resetForm
    return (
        <Dialog
            open={open}
            onOpenChange={(open) => {
                if (!open) {
                    resetForm();
                }
                onOpenChange(open);
            }}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle className={`text-3xl ${atma.className}`}>
                        {showCart
                            ? "Login to view cart"
                            : isLogin
                            ? "Login"
                            : "Create an account"}
                    </DialogTitle>
                </DialogHeader>
                {showCart && (
                    <div className="flex justify-center items-center mb-4">
                        <div className="relative">
                            <ShoppingBag className="h-12 w-12 text-muted-foreground" />
                            <CartCount />
                        </div>
                    </div>
                )}
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="email">
                            {isLogin ? "Email / Username / Mobile" : "Email"}
                        </Label>
                        <Input
                            id="email"
                            type={isLogin ? "text" : "email"}
                            required
                            value={formData.email}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    email: e.target.value,
                                })
                            }
                            className="focus:border-orange-500 focus:ring-1 focus:ring-orange-500/50"
                        />
                    </div>
                    {!isLogin && (
                        <>
                            <div className="space-y-2">
                                <Label htmlFor="mobile">Mobile</Label>
                                <Input
                                    id="mobile"
                                    type="tel"
                                    required
                                    value={formData.mobile}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            mobile: e.target.value,
                                        })
                                    }
                                    className="focus:border-orange-500 focus:ring-1 focus:ring-orange-500/50"
                                />
                            </div>
                            <div className="space-y-2">
                                <div className="flex items-center gap-4">
                                    <Label
                                        htmlFor="gender"
                                        className="min-w-[60px]">
                                        Gender
                                    </Label>
                                    <Select
                                        value={formData.gender}
                                        onValueChange={(value: string) =>
                                            setFormData({
                                                ...formData,
                                                gender: value,
                                            })
                                        }>
                                        <SelectTrigger className="focus:border-orange-500 focus:ring-1 focus:ring-orange-500/50">
                                            <SelectValue placeholder="Select Gender" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="M">
                                                Male
                                            </SelectItem>
                                            <SelectItem value="F">
                                                Female
                                            </SelectItem>
                                            <SelectItem value="O">
                                                Others
                                            </SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="username">Username</Label>
                                    <Input
                                        id="username"
                                        required
                                        value={formData.username}
                                        onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                username: e.target.value,
                                            })
                                        }
                                        className="focus:border-orange-500 focus:ring-1 focus:ring-orange-500/50"
                                    />
                                </div>
                            </div>
                        </>
                    )}
                    <div className="space-y-2">
                        <Label htmlFor="password">Password</Label>
                        <Input
                            id="password"
                            type="password"
                            required
                            value={formData.password}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    password: e.target.value,
                                })
                            }
                            className="focus:border-orange-500 focus:ring-1 focus:ring-orange-500/50"
                        />
                    </div>
                    {!isLogin && (
                        <div className="space-y-2">
                            <Label htmlFor="confirmPassword">
                                Confirm Password
                            </Label>
                            <Input
                                id="confirmPassword"
                                type="password"
                                required
                                value={formData.confirmPassword}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        confirmPassword: e.target.value,
                                    })
                                }
                                className="focus:border-orange-500 focus:ring-1 focus:ring-orange-500/50"
                            />
                        </div>
                    )}
                    <Button type="submit" className="w-full">
                        {isLogin ? "Login" : "Register"}
                    </Button>

                    {/* Add this section for Google sign-in */}
                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <span className="w-full border-t" />
                        </div>
                        <div className="relative flex justify-center text-xs uppercase">
                            <span className="bg-background px-2 text-muted-foreground">
                                Or continue with
                            </span>
                        </div>
                    </div>

                    <Button
                        type="button"
                        variant="outline"
                        className="w-full"
                        onClick={handleGoogleSignIn}>
                        <FcGoogle className="mr-2 h-5 w-5" />
                        Sign in with Google
                    </Button>
                    <div className="w-full text-center">
                        <p>
                            Don&apos;t have an account?{" "}
                            <span
                                className="text-orange-500 hover:text-orange-600 cursor-pointer"
                                onClick={() => setIsLogin(false)}>
                                Register
                            </span>
                        </p>
                        ) : (
                        <p>
                            Already have an account?{" "}
                            <span
                                className="text-orange-500 hover:text-orange-600 cursor-pointer"
                                onClick={() => setIsLogin(true)}>
                                Login
                            </span>
                        </p>
                        )
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
}
