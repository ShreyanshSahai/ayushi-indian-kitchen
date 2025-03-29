import { Inconsolata, Parisienne, Atma } from "next/font/google";

export const inconsolata = Inconsolata({
    subsets: ["latin"],
    display: "swap",
});

export const parisienne = Parisienne({
    weight: "400",
    subsets: ["latin"],
    display: "swap",
});

export const atma = Atma({
    weight: ["400", "500", "600", "700"],
    subsets: ["latin"],
    display: "swap",
});
