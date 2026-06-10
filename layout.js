import "./globals.css";

export const metadata = {
  title: "Monisha Sood — Product Manager",
  description:
    "Product Manager with 6+ years building zero-to-one products at the intersection of AI, strategy, and human impact. MBA '26, Wisconsin School of Business.",
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0a0908",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,300;9..144,500;9..144,600&family=Inter:wght@300;400;500&family=Space+Grotesk:wght@300;400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
