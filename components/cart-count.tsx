"use client";

import { useCart } from "@/contexts/CartContext";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";

export function CartCount() {
    const { getItemCount } = useCart();
    const [isAnimating, setIsAnimating] = useState(false);
    const count = getItemCount();

    useEffect(() => {
        setIsAnimating(true);
        const timer = setTimeout(() => setIsAnimating(false), 300);
        return () => clearTimeout(timer);
    }, [count]);

    return (
        <span
            className={cn(
                "absolute -top-2 -right-2 bg-primary text-primary-foreground rounded-full w-5 h-5 text-xs flex items-center justify-center transition-transform",
                isAnimating && "scale-125"
            )}>
            {count}
        </span>
    );
}
