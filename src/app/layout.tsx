import type { Metadata } from "next";
import { Lora, Poppins } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MusicPlayer from "@/components/MusicPlayer";
import ChatBot from "@/components/chatbot/ChatBot";

const lora = Lora({
	variable: "--font-lora",
	subsets: ["latin"],
	style: ["normal", "italic"],
});

const poppins = Poppins({
	variable: "--font-poppins",
	subsets: ["latin"],
	weight: ["300", "400", "500", "600", "700"],
	style: ["normal", "italic"],
});

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://cleaningparadisellc.com";
const TITLE = "Cleaning Paradise | House Cleaning Services in Seattle, WA";
const DESCRIPTION =
	"Professional residential and commercial cleaning based in Lynnwood, WA — serving Seattle and King & Snohomish County. Your home, perfectly clean.";

export const metadata: Metadata = {
	metadataBase: new URL(SITE_URL),
	title: TITLE,
	description: DESCRIPTION,
	icons: {
		icon: [
			{ url: "/favicon.ico", sizes: "32x32" },
			{ url: "/favicon.png", type: "image/png", sizes: "64x64" },
		],
		apple: "/apple-icon.png",
	},
	manifest: "/site.webmanifest",
	openGraph: {
		type: "website",
		siteName: "Cleaning Paradise",
		title: TITLE,
		description: DESCRIPTION,
		url: SITE_URL,
		images: [{ url: "/img/logo.png", width: 512, height: 512, alt: "Cleaning Paradise" }],
	},
	twitter: {
		card: "summary_large_image",
		title: TITLE,
		description: DESCRIPTION,
		images: ["/img/logo.png"],
	},
};

// Sitewide LocalBusiness structured data — helps Google/AI engines identify the
// business, service area and hours. AggregateRating deliberately omitted until
// on-page reviews are verifiable (avoids a manual-action risk).
const localBusinessJsonLd = {
	"@context": "https://schema.org",
	"@type": "HouseCleaningService",
	name: "Cleaning Paradise LLC",
	description: DESCRIPTION,
	url: SITE_URL,
	telephone: "+1-425-610-0241",
	email: "cleaning.paradise.llc@gmail.com",
	image: `${SITE_URL}/img/logo.png`,
	priceRange: "$$",
	address: {
		"@type": "PostalAddress",
		addressLocality: "Lynnwood",
		addressRegion: "WA",
		addressCountry: "US",
	},
	areaServed: [
		"Seattle",
		"Bellevue",
		"Kirkland",
		"Lynnwood",
		"Mercer Island",
		"Shoreline",
		"Edmonds",
		"Mill Creek",
	].map((name) => ({ "@type": "City", name })),
	openingHoursSpecification: {
		"@type": "OpeningHoursSpecification",
		dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
		opens: "07:00",
		closes: "19:00",
	},
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
				<script
					type="application/ld+json"
					dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }}
				/>
			</head>
			<body className={`${lora.variable} ${poppins.variable} antialiased`}>
				<a
					href="#main"
					className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[10000] focus:rounded-lg focus:bg-ink-900 focus:px-4 focus:py-2 focus:text-white"
				>
					Skip to content
				</a>
				<Navbar />
				<main id="main">{children}</main>
				<Footer />
				<MusicPlayer />
				<ChatBot />
			</body>
		</html>
	);
}
