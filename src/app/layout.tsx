import "~/styles/globals.css";
// import "~leaflet/dist/leaflet.css";
// import "~react-leaflet-markercluster/dist/styles.min.css";

import { Inter } from "next/font/google";
import QueryContectProvider from "./_context/queryHook";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata = {
  title: "Grameen VIZ",
  description: "Vizualizing the Grameen Community for a better tomorrow.",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`font-sans ${inter.variable}`}>
        <QueryContectProvider>{children}</QueryContectProvider>
      </body>
    </html>
  );
}
