import type {Metadata} from "next";
import {Roboto} from "next/font/google";
import "./globals.css";
import 'swiper/css';
import 'swiper/css/grid';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ToastProvider from "@/contexts/ToastProvider";
import AuthContextProvider from "@/contexts/AuthProvider";
import {Suspense} from "react";
import PhoneProvider from "@/contexts/PhoneProvider";
import LocationProvider from "@/contexts/LocationProvider";
import AddressProvider from "@/contexts/AddressProvider";
import {ClerkProvider, SignedIn, SignedOut, SignInButton, UserButton} from "@clerk/nextjs";


const roboto = Roboto({
    weight: ["400", "700"],
    style: ["normal", "italic"],
    subsets: ["latin"],
    display: "swap",
});

export const metadata: Metadata = {
    title: "Create Next App",
    description: "Generated by create next app",
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <ClerkProvider>
            <html lang="en">
            <body className={roboto.className}>
            <ToastProvider/>
            <Suspense>
                <AuthContextProvider>
                    <PhoneProvider>
                        <LocationProvider>
                            <AddressProvider>
                                {children}
                            </AddressProvider>
                        </LocationProvider>
                    </PhoneProvider>
                </AuthContextProvider>
            </Suspense>
            </body>
            </html>
        </ClerkProvider>
    );
}
