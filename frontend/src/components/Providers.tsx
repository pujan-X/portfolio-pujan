"use client";
import { ThemeProvider } from "next-themes";
import { LenisScroll } from "@/components/ui/LenisScroll";
import dynamic from "next/dynamic";

const CustomCursor = dynamic(
  () => import("@/components/ui/CustomCursor").then(m => m.CustomCursor),
  { ssr: false }
);

const ScrollProgress = dynamic(
  () => import("@/components/ui/ScrollProgress").then(m => m.ScrollProgress),
  { ssr: false }
);

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
      <LenisScroll />
      <CustomCursor />
      <ScrollProgress />
      {children}
    </ThemeProvider>
  );
}
