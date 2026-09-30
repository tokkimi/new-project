import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Cormorant_Garamond, Geist_Mono, Inter, Noto_Sans_KR } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { AuthProvider } from "@/components/auth-provider";
import { BottomNav } from "@/components/bottom-nav";
import { CookieBanner } from "@/components/cookie-banner";
import { BrandSplash } from "@/components/brand-splash";
import { FloatingScanner } from "@/components/floating-scanner";
import { routing } from "@/i18n/routing";
import "../globals.css";
import "../haru-public.css";

const inter = Inter({
  variable: "--font-sans-en",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const cormorant = Cormorant_Garamond({
  variable: "--font-serif-en",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const notoSansKr = Noto_Sans_KR({
  variable: "--font-sans-ko",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });
  return {
    title: t("title"),
    description: t("description"),
    manifest: "/manifest.webmanifest",
    appleWebApp: {
      capable: true,
      statusBarStyle: "default",
      title: "Haru",
    },
    icons: {
      icon: [
        { url: "/icon.png?v=haru-glass-20260930", sizes: "512x512", type: "image/png" },
      ],
      apple: [{ url: "/apple-icon.png?v=haru-glass-20260930", sizes: "180x180", type: "image/png" }],
      shortcut: ["/icon.png?v=haru-glass-20260930"],
    },
    other: {
      "mobile-web-app-capable": "yes",
    },
  };
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#050505",
};

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }
  setRequestLocale(locale);

  const fontVars =
    locale === "ko"
      ? `${notoSansKr.variable} ${inter.variable} ${cormorant.variable}`
      : `${inter.variable} ${cormorant.variable} ${notoSansKr.variable}`;

  return (
    <html
      lang={locale}
      suppressHydrationWarning
      data-lang={locale}
      className={`${fontVars} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col pb-24 font-sans">
        <NextIntlClientProvider>
          <AuthProvider>
            <ThemeProvider
              attribute="class"
              defaultTheme="light"
              forcedTheme="light"
              themes={["light"]}
              enableSystem={false}
              disableTransitionOnChange
            >
              <BrandSplash />
              {children}
              <FloatingScanner />
              <BottomNav />
              <CookieBanner />
            </ThemeProvider>
          </AuthProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
