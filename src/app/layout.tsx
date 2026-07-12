import type { Metadata } from "next";
import { Instrument_Serif, Poppins } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MusicPlayer from "@/components/MusicPlayer";
import ChatBot from "@/components/chatbot/ChatBot";

const instrumentSerif = Instrument_Serif({
	variable: "--font-instrument-serif",
	subsets: ["latin"],
	weight: "400",
	style: ["normal", "italic"],
});

const poppins = Poppins({
	variable: "--font-poppins",
	subsets: ["latin"],
	weight: ["300", "400", "500", "600", "700"],
	style: ["normal", "italic"],
});

export const metadata: Metadata = {
	metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://cleaningparadisellc.com"),
	title: "Cleaning Paradise | House Cleaning Services in Seattle, WA",
	description:
		"Professional residential and commercial cleaning based in Lynnwood, WA — serving Seattle and King & Snohomish County. Your home, perfectly clean.",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<head>
				{/* Sin JS, motion deja el estado `initial` (opacity:0 + translate + blur) como
				    inline style → contenido invisible. Esto lo fuerza a visible para SEO/no-JS. */}
				<noscript>
					<style>{`
						[style*="opacity: 0"],[style*="opacity:0"]{opacity:1!important}
						[style*="transform"][style*="translate"],[style*="transform"][style*="scale"],[style*="transform"][style*="matrix"]{transform:none!important}
						[style*="filter"][style*="blur"]{filter:none!important}
					`}</style>
				</noscript>
			</head>
			<body className={`${instrumentSerif.variable} ${poppins.variable} antialiased`}>
				<Navbar />
				{children}
				<Footer />
				<MusicPlayer />
				<ChatBot />
			</body>
		</html>
	);
}
