"use client";

import { createContext, useContext, useState, ReactNode } from "react";

interface CartItem {
    id: number;
    name: string;
    price: number;
    quantity: number;
}

interface CartContextType {
    items: CartItem[];
    addToCart: (id: number, name: string, price: number) => void;
    removeFromCart: (id: number) => void;
    getItemCount: () => number;
    updateQuantity: (id: number, newQuantity: number) => void; // Add this line
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
    const [items, setItems] = useState<CartItem[]>([]);

    const addToCart = (id: number, name: string, price: number) => {
        setItems((currentItems) => {
            const existingItem = currentItems.find((item) => item.id === id);
            if (existingItem) {
                return currentItems.map((item) =>
                    item.id === id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            }
            return [...currentItems, { id, name, price, quantity: 1 }];
        });
    };

    const removeFromCart = (id: number) => {
        setItems((currentItems) =>
            currentItems.filter((item) => item.id !== id)
        );
    };

    const getItemCount = () => {
        return items.reduce((total, item) => total + item.quantity, 0);
    };

    const updateQuantity = (id: number, newQuantity: number) => {
        setItems((currentItems) => {
            if (newQuantity <= 0) {
                return currentItems.filter((item) => item.id !== id);
            }
            return currentItems.map((item) =>
                item.id === id ? { ...item, quantity: newQuantity } : item
            );
        });
    };

    return (
        <CartContext.Provider
            value={{
                items,
                addToCart,
                removeFromCart,
                getItemCount,
                updateQuantity,
            }}>
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    const context = useContext(CartContext);
    if (context === undefined) {
        throw new Error("useCart must be used within a CartProvider");
    }
    return context;
}
