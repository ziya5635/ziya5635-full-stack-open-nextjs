import { Providers } from "./components/providers/providers";
import Navbar from "./components/navbar";
import Notification from "./components/notification";
import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="min-h-screen bg-background text-foreground">
      <body className="bg-background text-foreground font-sans">
        <Providers>
          <Navbar />
          <Notification />
          {children}
        </Providers>
      </body>
    </html>
  );
}
