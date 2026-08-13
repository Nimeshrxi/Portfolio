import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("http://localhost:3000"),
  title: {
    default: "Nimesh Rai | Python, Django, AI & Data Portfolio",
    template: "%s | Nimesh Rai",
  },
  description:
    "A cinematic full-stack developer portfolio for Nimesh Rai, built with Next.js, Django REST Framework, and editable project content.",
  openGraph: {
    title: "Nimesh Rai | Cinematic Developer Portfolio",
    description:
      "Python, Django, AI, data, and full-stack projects presented as a cinematic developer command center.",
    type: "website",
    url: "http://localhost:3000",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#050507",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
