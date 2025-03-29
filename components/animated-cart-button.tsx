"use client";

import { Button } from "@/components/ui/button";
import { ShoppingBag, Check } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface AnimatedCartButtonProps {
    onAddToCart: () => void;
    variant?: "icon" | "full";
    className?: string;
}

export function AnimatedCartButton({
    onAddToCart,
    variant = "icon",
    className,
}: AnimatedCartButtonProps) {
    const [isAdded, setIsAdded] = useState(false);

    const handleClick = () => {
        onAddToCart();
        setIsAdded(true);
        setTimeout(() => setIsAdded(false), 2000);
    };

    if (variant === "icon") {
        return (
            <Button
                onClick={handleClick}
                size="icon"
                className={cn(
                    `relative 
                    transform 
                    transition-all 
                    duration-200 
                    hover:scale-110 
                    active:scale-95
                    shadow-lg
                    hover:shadow-xl
                    rounded-full
                    bg-gradient-to-br
                    from-orange-500/80
                    to-orange-600
                    hover:from-orange-400
                    hover:to-orange-500
                    border-2
                    border-orange-400/20
                    p-2`,
                    isAdded &&
                        "bg-green-500 border-green-400/20 from-green-500/80 to-green-600",
                    className
                )}>
                {isAdded ? (
                    <Check className="h-5 w-5 text-white" />
                ) : (
                    <ShoppingBag className="h-5 w-5 text-white" />
                )}
                <span className="sr-only">Add to cart</span>
            </Button>
        );
    }

    return (
        <Button
            className={cn(
                "w-full transition-all",
                isAdded && "bg-green-500",
                className
            )}
            onClick={handleClick}>
            {isAdded ? (
                <span className="flex items-center gap-2">
                    <Check className="h-5 w-5" />
                    Added!
                </span>
            ) : (
                "Add to Cart"
            )}
        </Button>
    );
}
