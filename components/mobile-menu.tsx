"use client";

import { Menu, User, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import { ThemeToggle } from "@/components/theme-toggle";
import { CartCount } from "@/components/cart-count";
import { inconsolata, atma } from "@/lib/fonts";

interface MobileMenuProps {
    onCartClick: () => void;
    onAuthClick: () => void;
    isAuthenticated: boolean;
}

export function MobileMenu({
    onCartClick,
    onAuthClick,
    isAuthenticated,
}: MobileMenuProps) {
    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button variant="outline" size="icon" className="md:hidden">
                    <Menu className="h-5 w-5" />
                </Button>
            </SheetTrigger>
            <SheetContent className="z-50 right-0">
                <SheetHeader className="mb-4">
                    <SheetTitle className={`text-2xl ${atma.className}`}>
                        Menu
                    </SheetTitle>
                </SheetHeader>
                <div
                    className={`flex flex-col gap-6 px-2 ${inconsolata.className}`}>
                    <Button
                        variant="outline"
                        className="w-full justify-start gap-2 p-6"
                        onClick={onCartClick}>
                        <div className="relative">
                            <ShoppingBag className="h-5 w-5" />
                            <CartCount />
                        </div>
                        Cart
                    </Button>
                    {!isAuthenticated && (
                        <Button
                            variant="outline"
                            className="w-full justify-start gap-2 p-6"
                            onClick={onAuthClick}>
                            <User className="h-5 w-5" />
                            Login
                        </Button>
                    )}
                    <div className="flex items-center gap-2 p-2">
                        <span className="text-sm font-medium">Theme</span>
                        <ThemeToggle />
                    </div>
                </div>
            </SheetContent>
        </Sheet>
    );
}
