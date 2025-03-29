"use client";

import { X } from "lucide-react";
import { useState } from "react";
import { Button } from "./ui/button";

interface CartCountButtonProps {
    count: number;
    onClear: () => void;
}

export function CartCountButton({ count, onClear }: CartCountButtonProps) {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <Button
            variant="outline"
            size="icon"
            className="h-6 w-6 transition-all duration-200 hover:bg-destructive hover:text-destructive-foreground"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={onClear}>
            {isHovered ? (
                <X className="h-4 w-4" />
            ) : (
                <span className="text-sm">{count}</span>
            )}
        </Button>
    );
}
