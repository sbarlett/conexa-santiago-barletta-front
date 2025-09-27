import QueryProvider from "@/providers/QueryProvider";
import type { Metadata } from "next";
import type React from "react";
import { Suspense } from "react";
import { Toaster } from 'sonner';
import "./globals.css";

export const metadata: Metadata = {
  title: "Conexa - Santiago Barletta",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className="dark">
      <body className="bg-background text-foreground">
        <Suspense fallback={null}>
          <QueryProvider>{children}</QueryProvider>
        </Suspense>
        <Toaster position="top-right" richColors />
      </body>
    </html>
  );
}
