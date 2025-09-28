import { Metadata } from "next/types";
import { Toaster } from "sonner";
import QueryProvider from "@/providers/QueryProvider";
import Logo from "@/components/ui/Logo";
import "./globals.css";

export const metadata: Metadata = {
  title: "Challenge - Santiago Barletta",
  icons: {
    icon: "/favicon.png",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className="dark bg-background">
      <body className="text-foreground">
        <header className="flex items-center justify-center py-4">
          <Logo />
        </header>
        <QueryProvider>
          <main className="py-4">{children}</main>
          <Toaster position="top-right" richColors />
        </QueryProvider>
      </body>
    </html>
  );
}
