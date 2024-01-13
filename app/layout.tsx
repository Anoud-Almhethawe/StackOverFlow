import { ClerkProvider } from "@clerk/nextjs";
// eslint-disable-next-line camelcase
import { Inter, Space_Grotesk } from "next/font/google";
import { Metadata } from "next";
import "./globals.css";
import "../styles/prism.css";
import React from "react";
import { ThemeProvider } from "@/context/ThemeProvider";

export const metadata: Metadata = {
  title: "DevFlow",
  applicationName: "DevFlow",
  description:
    "A community-driven platform for asking and answering programming questions get help share knowledge and collaborate with developers from around the world Explore topics in web development mobile app development algorithms data structure and more",
  icons: {
    icon: "/assets/images/site-logo.svg",
  },
  authors: [
    { name: "Anoud", url: "https://dev-dverflow-app-nextjs14.vercel.app/" },
  ],
  keywords: [
    "programming",
    "web development",
    "community",
    "Questions",
    "developers",
    "tags",
    "answers",
  ],
  referrer: "origin",
  viewport: { width: "device-width", initialScale: 1 },
  creator: "Anoud",
  publisher: "DevFlow",
  robots: { index: true, follow: true },
  alternates: {
    canonical: "https://dev-dverflow-app-nextjs14.vercel.app/",
  },
  openGraph: {
    type: "website",
    url: "https://dev-dverflow-app-nextjs14.vercel.app/",
    title: "DevFlow",
    description: "A community-driven platform for developers",
    siteName: "DevFlow",
    images: [
      {
        url: "https://dev-dverflow-app-nextjs14.vercel.app/assets/meta.jpeg",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "https://dev-dverflow-app-nextjs14.vercel.app/",
    creator: "@Anoud",
    images: "https://dev-dverflow-app-nextjs14.vercel.app/assets/meta.jpeg",
  },
};

const inter = Inter({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-inter",
});
const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-spaceGrotesk",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <title>DevFlow</title>
        <meta
          name="description"
          content="A community-driven platform for asking and answering programming questions get help share knowledge and collaborate with developers from around the world Explore topics in web development mobile app development algorithms data structure and more"
        />

        <meta itemProp="name" content="DevFlow" />
        <meta
          itemProp="description"
          content="A community-driven platform for asking and answering programming questions get help share knowledge and collaborate with developers from around the world Explore topics in web development mobile app development algorithms data structure and more"
        />
        <meta
          itemProp="image"
          content="https://dev-dverflow-app-nextjs14.vercel.app/assets/meta.jpeg"
        />

        <meta
          property="og:url"
          content="https://dev-dverflow-app-nextjs14.vercel.app"
        />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="DevFlow" />
        <meta
          property="og:description"
          content="A community-driven platform for asking and answering programming questions get help share knowledge and collaborate with developers from around the world Explore topics in web development mobile app development algorithms data structure and more"
        />
        <meta
          property="og:image"
          content="https://dev-dverflow-app-nextjs14.vercel.app/assets/meta.jpeg"
        />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="DevFlow" />
        <meta
          name="twitter:description"
          content="A community-driven platform for asking and answering programming questions get help share knowledge and collaborate with developers from around the world Explore topics in web development mobile app development algorithms data structure and more"
        />
        <meta
          name="twitter:image"
          content="https://dev-dverflow-app-nextjs14.vercel.app/assets/meta.jpeg"
        />
      </head>

      <body className={`${inter.variable} ${spaceGrotesk.variable}`}>
        <ClerkProvider
          appearance={{
            elements: {
              formButtonPrimary: "primary-gradient",
              footerActionLink: "primary-text-gradient hover:text-primary-500 ",
            },
          }}
        >
          <ThemeProvider>{children}</ThemeProvider>
        </ClerkProvider>
      </body>
    </html>
  );
}
