import React from "react";
import {Sora} from "@next/font/google";

import './globals.scss';

const sora = Sora({ subsets: ["latin"] });

export default function RootLayout({ children }: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body className={sora.className}>{children}</body>
        </html>
    );
}
