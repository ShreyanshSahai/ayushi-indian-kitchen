"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Autoplay from "embla-carousel-autoplay";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
import { useState, useEffect } from "react";
import { useCart } from "@/contexts/CartContext";
import { AnimatedCartButton } from "@/components/animated-cart-button";
import { inconsolata, atma } from "@/lib/fonts";
import { getMenuItems } from "@/lib/db/menu";
import type { MenuItem } from "@/lib/db/menu";
import Image from "next/image";

// Update the initial featuredItems array
const featuredItems = [
    {
        id: 1,
        name: "Butter Chicken",
        image: "/butter-chicken.jpg",
        price: 15.99,
        discountedPrice: 13.99, // Added discounted price
    },
    {
        id: 2,
        name: "Chicken Biryani",
        image: "/biryani.jpg",
        price: 16.99,
    },
    {
        id: 3,
        name: "Veg Biryani",
        image: "/veg-biryani.jpg",
        price: 14.99,
    },
];

// First, let's update the menuItems array to ensure all items have categories
// Update the menuItems array to include discountedPrice
// Change the name from menuItems to defaultMenuItems
const defaultMenuItems: MenuItem[] = [
    {
        id: 1,
        name: "Butter Chicken",
        image: "https://placehold.co/400x300/png?text=Butter+Chicken",
        price: 15.99,
        discountedPrice: 13.99,
        isFeatured: true,
        category: "Gravy",
    },
    {
        id: 2,
        name: "Chicken Biryani",
        image: "https://placehold.co/400x300/png?text=Chicken+Biryani",
        price: 16.99,
        discountedPrice: 14.99,
        isFeatured: true,
        category: "Rice",
    },
    {
        id: 3,
        name: "Veg Biryani",
        image: "https://placehold.co/400x300/png?text=Veg+Biryani",
        price: 14.99,
        isFeatured: true,
        category: "Rice",
    },
    {
        id: 4,
        name: "Paneer Tikka",
        image: "https://placehold.co/400x300/png?text=Paneer+Tikka",
        price: 12.99,
        isFeatured: false,
        category: "Starter",
    },
    {
        id: 5,
        name: "Chole Bhature",
        image: "https://placehold.co/400x300/png?text=Chole+Bhature",
        price: 11.99,
        category: "Meal", // Changed from "Bread" to "Meal"
    },
    {
        id: 7,
        name: "Chole Bhature",
        image: "https://placehold.co/400x300/png?text=Chole+Bhature",
        price: 11.99,
        category: "Meal", // Changed from "Bread" to "Meal"
    },
    {
        id: 6,
        name: "Aloo Paratha",
        image: "https://placehold.co/400x300/png?text=Aloo+Paratha",
        price: 8.99,
        category: "Bread",
    },
    {
        id: 15, // Changed from 7
        name: "Chole Bhature",
        image: "https://placehold.co/400x300/png?text=Chole+Bhature",
        price: 11.99,
        category: "Meal",
    },
    {
        id: 8,
        name: "Aloo Paratha",
        image: "https://placehold.co/400x300/png?text=Aloo+Paratha",
        price: 8.99,
        category: "Bread",
    },
    {
        id: 9, // Changed from 4
        name: "Pyaaz Paratha",
        image: "https://placehold.co/400x300/png?text=Pyaaz+Paratha",
        price: 8.99,
        category: "Bread",
    },
    {
        id: 10, // Changed from 5
        name: "Paneer Paratha",
        image: "https://placehold.co/400x300/png?text=Paneer+Paratha",
        price: 9.99,
        category: "Bread",
    },
    {
        id: 11, // Changed from 6
        name: "Pyaaz Pakoda",
        image: "https://placehold.co/400x300/png?text=Pyaaz+Pakoda",
        price: 7.99,
        category: "Snacks",
    },
    {
        id: 12, // Changed from 7
        name: "Aloo Pakoda",
        image: "https://placehold.co/400x300/png?text=Aloo+Pakoda",
        price: 7.99,
        category: "Snacks",
    },
    {
        id: 13, // Changed from 8
        name: "Gobhi Pakoda",
        image: "https://placehold.co/400x300/png?text=Gobhi+Pakoda",
        price: 7.99,
        category: "Snacks",
    },
    {
        id: 14, // Changed from 9
        name: "Mix Pakoda Platter",
        image: "https://placehold.co/400x300/png?text=Mix+Pakoda",
        price: 10.99,
        category: "Snacks",
    },
];

// In the return statement, update the Carousel section:
// For the first carousel in the code
<Carousel
    className="w-full"
    plugins={[
        Autoplay({
            delay: 2000,
        }),
    ]}
    opts={{
        loop: true,
    }}>
    <CarouselContent>
        {featuredItems.map((item) => (
            <CarouselItem
                key={item.id}
                className="md:basis-1/2 lg:basis-1/3 pl-4">
                <Card className="h-full">
                    <CardContent className="p-4">
                        <Image
                            src={item.image}
                            alt={item.name}
                            width={400}
                            height={300}
                            className="w-full h-64 object-cover rounded-md"
                        />
                        <h3 className="text-xl font-semibold mt-2">
                            {item.name}
                        </h3>
                        <p className="text-lg font-bold">${item.price}</p>
                    </CardContent>
                </Card>
            </CarouselItem>
        ))}
    </CarouselContent>
    <CarouselPrevious className="left-2" />
    <CarouselNext className="right-2" />
</Carousel>;

// Remove the standalone carousel components and keep them only in the Home component's return statement

export default function Home() {
    const { addToCart } = useCart();
    const [selectedCategory, setSelectedCategory] = useState<
        string | undefined
    >("All");
    const [menuItems, setMenuItems] = useState<MenuItem[]>(defaultMenuItems);

    useEffect(() => {
        async function loadMenuItems() {
            const dbMenuItems = await getMenuItems();
            setMenuItems(dbMenuItems || defaultMenuItems);
        }
        loadMenuItems();
    }, []);

    // Rest of your existing code remains the same, but now uses the menuItems state
    const featuredItems = menuItems.filter((item) => item.isFeatured);

    // Get unique categories
    const categories = [
        "All",
        ...new Set(menuItems.map((item) => item.category).filter(Boolean)),
    ];

    // Filter menu items based on selected category
    const filteredMenuItems =
        selectedCategory === "All"
            ? menuItems
            : menuItems.filter((item) => item.category === selectedCategory);

    return (
        <main className="container mx-auto px-4 py-8 overflow-hidden">
            <section className="mb-12">
                <h2 className={`text-3xl font-bold mb-6 ${atma.className}`}>
                    Featured Dishes
                </h2>
                <div className="relative">
                    <Carousel
                        className="w-full max-w-5xl mx-auto"
                        opts={{ loop: true }}>
                        <CarouselContent>
                            {featuredItems.map((item) => (
                                <CarouselItem
                                    key={item.id}
                                    className="md:basis-1/2 lg:basis-1/3">
                                    <Card
                                        className="group h-full transform transition-all duration-300 hover:scale-[1.02] 
                                                bg-gradient-to-br from-background/80 via-background to-muted/50 
                                                dark:from-muted/20 dark:via-background dark:to-background/80
                                                backdrop-blur-sm border-2 border-muted/30
                                                dark:border-white/[0.08]
                                                rounded-xl">
                                        <CardContent
                                            className={`p-4 ${inconsolata.className}`}>
                                            <div className="overflow-hidden rounded-md">
                                                <Image
                                                    src={item.image}
                                                    alt={item.name}
                                                    width={400}
                                                    height={300}
                                                    className="w-full h-48 object-cover rounded-md transform transition-transform duration-300 group-hover:scale-110"
                                                />
                                            </div>
                                            <div className="space-y-2 mt-3">
                                                <h3 className="text-xl font-semibold text-foreground/90">
                                                    {item.name}
                                                </h3>
                                                <div className="flex justify-between items-center pt-2">
                                                    <PriceDisplay
                                                        price={item.price}
                                                        discountedPrice={
                                                            item.discountedPrice
                                                        }
                                                    />
                                                    <AnimatedCartButton
                                                        variant="icon"
                                                        onAddToCart={() =>
                                                            addToCart(
                                                                item.id,
                                                                item.name,
                                                                item.discountedPrice ||
                                                                    item.price
                                                            )
                                                        }
                                                    />
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </CarouselItem>
                            ))}
                        </CarouselContent>
                        <CarouselPrevious className="bg-orange-500 hover:bg-orange-600 border-orange-400/20 text-white md:hidden" />
                        <CarouselNext className="bg-orange-500 hover:bg-orange-600 border-orange-400/20 text-white md:hidden" />
                    </Carousel>
                    <div className="flex justify-center gap-2 mt-4 md:hidden">
                        {featuredItems.map((_, index) => (
                            <div
                                key={index}
                                className={`h-2 w-2 rounded-full transition-all duration-300 ${
                                    index === 0
                                        ? "bg-orange-500 w-4"
                                        : "bg-orange-200 dark:bg-orange-900"
                                }`}
                            />
                        ))}
                    </div>
                </div>
            </section>

            <section>
                <h2 className={`text-3xl font-bold mb-6 ${atma.className}`}>
                    Our Menu
                </h2>
                <div
                    className={`flex gap-4 mb-6 flex-wrap ${inconsolata.className}`}>
                    {categories.map((category) => (
                        <Button
                            key={category}
                            variant={
                                selectedCategory === category
                                    ? "default"
                                    : "outline"
                            }
                            onClick={() => setSelectedCategory(category)}
                            className={`
                                text-base
                                transform 
                                transition-all 
                                duration-200 
                                hover:scale-105 
                                active:scale-95
                                shadow-md
                                hover:shadow-xl
                                ${
                                    selectedCategory === category
                                        ? "bg-gradient-to-br from-orange-500 to-orange-600 hover:from-orange-400 hover:to-orange-500 border-orange-400/20"
                                        : "hover:border-orange-500/50"
                                }
                            `}>
                            {category}
                        </Button>
                    ))}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredMenuItems.map((item) => (
                        <Card
                            key={item.id}
                            className="group h-full transform transition-all duration-300 hover:scale-[1.02] 
                            shadow-[0_8px_30px_rgb(0,0,0,0.12)] 
                            hover:shadow-[0_20px_40px_rgba(0,0,0,0.18)]
                            dark:shadow-[0_8px_30px_rgba(255,255,255,0.04)]
                            dark:hover:shadow-[0_20px_40px_rgba(255,255,255,0.08)]
                            bg-gradient-to-br from-background/80 via-background to-muted/50 
                            dark:from-muted/20 dark:via-background dark:to-background/80
                            backdrop-blur-sm border-2 border-muted/30
                            dark:border-white/[0.08]
                            rounded-xl">
                            <CardContent
                                className={`p-4 ${inconsolata.className}`}>
                                <div className="overflow-hidden rounded-md">
                                    <Image
                                        src={item.image}
                                        alt={item.name}
                                        width={400}
                                        height={300}
                                        className="w-full h-48 object-cover rounded-md transform transition-transform duration-300 group-hover:scale-110"
                                    />
                                </div>
                                <div className="space-y-2 mt-3">
                                    <h3 className="text-xl font-semibold text-foreground/90">
                                        {item.name}
                                    </h3>
                                    <div className="flex justify-between items-center pt-2">
                                        <PriceDisplay
                                            price={item.price}
                                            discountedPrice={
                                                item.discountedPrice
                                            }
                                        />
                                        <AnimatedCartButton
                                            variant="icon"
                                            onAddToCart={() =>
                                                addToCart(
                                                    item.id,
                                                    item.name,
                                                    item.discountedPrice ||
                                                        item.price
                                                )
                                            }
                                        />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </section>
        </main>
    );
}

// Update the price display in both carousel and menu items cards
// Remove the duplicate JSX blocks at the end of the file and keep only the PriceDisplay component
const PriceDisplay = ({
    price,
    discountedPrice,
}: {
    price: number;
    discountedPrice?: number;
}) => {
    const discountPercentage = discountedPrice
        ? Math.round(((price - discountedPrice) / price) * 100)
        : 0;

    return (
        <div className="flex flex-col">
            {discountedPrice ? (
                <>
                    <span className="text-lg font-bold bg-gradient-to-r from-orange-500 to-orange-700 bg-clip-text text-transparent">
                        ${discountedPrice}
                    </span>
                    <div className="flex items-center gap-2">
                        <span className="text-sm text-muted-foreground line-through">
                            ${price}
                        </span>
                        <span className="text-sm text-green-600">
                            ({discountPercentage}% off)
                        </span>
                    </div>
                </>
            ) : (
                <span className="text-lg font-bold bg-gradient-to-r from-orange-500 to-orange-700 bg-clip-text text-transparent">
                    ${price}
                </span>
            )}
        </div>
    );
};
