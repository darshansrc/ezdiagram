import "@/styles/globals.css";
import { Analytics } from "@vercel/analytics/react";
import { fontHeading, fontSans, fontUrban } from "@/assets/fonts";
import { Toaster } from "react-hot-toast";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "next-themes";
import { AuthModal } from "@/components/auth/auth-modal";

interface RootLayoutProps {
  children: React.ReactNode;
}

export const metadata = {
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    "Next.js",
    "React",
    "Prisma",
    "Neon",
    "Auth.js",
    "shadcn ui",
    "Resend",
    "React Email",
    "Stripe",
  ],
  authors: [
    {
      name: "mickasmt",
    },
  ],
  creator: "mickasmt",
  // metadataBase: new URL(siteConfig.url),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
    creator: "@miickasmt",
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
  manifest: `${siteConfig.url}/site.webmanifest`,
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable,
          fontUrban.variable,
          fontHeading.variable
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <AuthModal />
          <Analytics />
          <Toaster
            position="top-right"
            toastOptions={{
              className:
                "dark:bg-neutral-900 dark:text-white text-sm shadow-none border animate-none",
              duration: 2000,
            }}
          />
        </ThemeProvider>
      </body>
    </html>
  );
}
