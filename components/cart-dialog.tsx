"use client";

import { inconsolata } from "@/lib/fonts";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useCart } from "@/contexts/CartContext";
import { Minus, Plus, Trash2 } from "lucide-react";
import { CartCountButton } from "./cart-count-button";

interface CartDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export function CartDialog({ open, onOpenChange }: CartDialogProps) {
    const { items, addToCart, removeFromCart, updateQuantity } = useCart();
    const total = items.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    );

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent
                className={`max-w-sm sm:max-w-md ${inconsolata.className}`}>
                <DialogHeader>
                    <DialogTitle>Your Cart</DialogTitle>
                </DialogHeader>
                <div className="flex flex-col gap-4 max-h-[60vh] overflow-auto">
                    {items.length === 0 ? (
                        <p className="text-center text-muted-foreground">
                            Your cart is empty
                        </p>
                    ) : (
                        items.map((item) => (
                            <div
                                key={item.id}
                                className="flex items-center justify-between gap-4 border-b pb-4">
                                <div>
                                    <h3 className="font-semibold">
                                        {item.name}
                                    </h3>
                                    <p className="text-sm text-muted-foreground">
                                        ${item.price} × {item.quantity}
                                    </p>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Button
                                        variant="outline"
                                        size="icon"
                                        className="h-8 w-8"
                                        onClick={() =>
                                            updateQuantity(
                                                item.id,
                                                item.quantity - 1
                                            )
                                        }>
                                        <Minus className="h-4 w-4" />
                                    </Button>
                                    <span className="w-8 text-center">
                                        {item.quantity}
                                    </span>
                                    <Button
                                        variant="outline"
                                        size="icon"
                                        className="h-8 w-8"
                                        onClick={() =>
                                            addToCart(
                                                item.id,
                                                item.name,
                                                item.price
                                            )
                                        }>
                                        <Plus className="h-4 w-4" />
                                    </Button>
                                    <Button
                                        variant="destructive"
                                        size="icon"
                                        className="h-8 w-8"
                                        onClick={() => removeFromCart(item.id)}>
                                        <Trash2 className="h-4 w-4" />
                                    </Button>
                                </div>
                            </div>
                        ))
                    )}
                </div>
                {items.length > 0 && (
                    <div className="flex flex-col gap-4 mt-4">
                        <div className="flex justify-between font-semibold">
                            <span>Total:</span>
                            <span>${total.toFixed(2)}</span>
                        </div>
                        <Button className="w-full">Checkout</Button>
                    </div>
                )}
            </DialogContent>
        </Dialog>
    );
}
