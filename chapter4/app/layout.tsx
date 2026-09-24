import { Providers } from "@/components/providers/providers";
import Navbar from "@/components/navbar";
import Notification from "@/components/notification";
import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body className="min-h-screen flex flex-col px-2 bg-background text-foreground font-sans">
        <Providers>
          <Navbar />
          <Notification />
          {children}
        </Providers>
      </body>
    </html>
  );
}
