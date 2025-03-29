"use client";

import { useState } from "react";
import { ShoppingBag, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import { CartCount } from "@/components/cart-count";
import { CartDialog } from "@/components/cart-dialog";
import { AuthDialog } from "@/components/auth-dialog";
import { MobileMenu } from "@/components/mobile-menu";
import { parisienne } from "@/lib/fonts";

export function Header() {
    const [cartOpen, setCartOpen] = useState(false);
    const [authOpen, setAuthOpen] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [showCartInAuth, setShowCartInAuth] = useState(false);

    const handleCartClick = () => {
        if (!isAuthenticated) {
            setShowCartInAuth(true);
            setAuthOpen(true);
        } else {
            setCartOpen(true);
        }
    };

    const handleAuthSuccess = () => {
        setIsAuthenticated(true);
        setAuthOpen(false);
        if (showCartInAuth) {
            setShowCartInAuth(false);
            setCartOpen(true);
        }
    };

    return (
        <header className="border-b">
            <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                <h1
                    className={`text-4xl font-black tracking-wide px-1 bg-gradient-to-r from-orange-500 to-orange-600 dark:from-orange-500 dark:via-white dark:to-green-600 bg-clip-text text-transparent hover:scale-105 transition-transform drop-shadow-sm ${parisienne.className}`}>
                    Ayushi's Indian Kitchen
                </h1>
                <div className="flex items-center gap-4">
                    <div className="hidden md:flex items-center gap-4">
                        <Button
                            variant="outline"
                            size="icon"
                            className="relative"
                            onClick={handleCartClick}>
                            <ShoppingBag className="h-5 w-5" />
                            <CartCount />
                        </Button>
                        {!isAuthenticated && (
                            <Button
                                variant="outline"
                                size="icon"
                                onClick={() => setAuthOpen(true)}>
                                <User className="h-5 w-5" />
                            </Button>
                        )}
                        <ThemeToggle />
                    </div>
                    <MobileMenu
                        onCartClick={handleCartClick}
                        isAuthenticated={isAuthenticated}
                        onAuthClick={() => setAuthOpen(true)}
                    />
                </div>
            </div>
            <CartDialog open={cartOpen} onOpenChange={setCartOpen} />
            <AuthDialog
                open={authOpen}
                onOpenChange={setAuthOpen}
                onAuthSuccess={handleAuthSuccess}
                showCart={showCartInAuth}
            />
        </header>
    );
}
