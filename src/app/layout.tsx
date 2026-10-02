import type { Metadata } from "next";
import { Lora, Poppins } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MusicPlayer from "@/components/MusicPlayer";
import ChatBot from "@/components/chatbot/ChatBot";
import { locations } from "@/app/locations/locations-data";
import { SITE as SITE_URL, BUSINESS_ID, WEBSITE_ID, FOUNDER_ID } from "@/lib/schema";

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

const TITLE = "Cleaning Paradise | House Cleaning Services in Seattle, WA";
const DESCRIPTION =
	"Professional residential and commercial cleaning based in Lynnwood, WA — serving Seattle and King & Snohomish County. Your home, perfectly clean.";

export const metadata: Metadata = {
	metadataBase: new URL(SITE_URL),
	title: TITLE,
	description: DESCRIPTION,
	icons: {
		icon: [
			{ url: "/favicon.ico", sizes: "16x16 32x32 48x48" },
			{ url: "/favicon.png", type: "image/png", sizes: "64x64" },
		],
		apple: "/apple-touch-icon.png",
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

// Sitewide JSON-LD (@graph). El negocio se define UNA vez con @id; las páginas lo
// referencian con { "@id": BUSINESS_ID } en vez de crear otro nodo de negocio.
// Sin aggregateRating/review: Google ignora ratings propios en LocalBusiness.

const siteJsonLd = {
	"@context": "https://schema.org",
	"@graph": [
		{
			"@type": "WebSite",
			"@id": WEBSITE_ID,
			url: SITE_URL,
			name: "Cleaning Paradise",
			publisher: { "@id": BUSINESS_ID },
			inLanguage: "en-US",
		},
		{
			"@type": "HouseCleaningService",
			"@id": BUSINESS_ID,
			name: "Cleaning Paradise LLC",
			alternateName: "Cleaning Paradise",
			url: SITE_URL,
			logo: { "@type": "ImageObject", url: `${SITE_URL}/img/logo.png`, width: 512, height: 512 },
			image: `${SITE_URL}/img/group.webp`,
			description:
				"Residential and commercial cleaning based in Lynnwood, WA, serving Seattle and King and Snohomish County.",
			telephone: "+1-425-610-0241",
			email: "hello@cleaningparadisellc.com",
			priceRange: "$$",
			// Service-area business: sin streetAddress, igual que el GBP.
			address: {
				"@type": "PostalAddress",
				addressLocality: "Lynnwood",
				addressRegion: "WA",
				postalCode: "98087",
				addressCountry: "US",
			},
			geo: { "@type": "GeoCoordinates", latitude: 47.8209, longitude: -122.3151 },
			areaServed: Object.values(locations).map(({ name }) => ({ "@type": "City", name: `${name}, WA` })),
			openingHoursSpecification: [
				{
					"@type": "OpeningHoursSpecification",
					dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
					opens: "07:00",
					closes: "19:00",
				},
			],
			foundingDate: "2019-04-15",
			founder: { "@id": FOUNDER_ID },
			knowsLanguage: ["en", "es"],
			paymentAccepted: "Credit card, debit card",
			// Solo perfiles con NAP igual al sitio. Yelp fuera hasta arreglar el listing CLOSED.
			// TODO: URL del Google Business Profile (también va en hasMap).
			sameAs: [
				"https://www.facebook.com/cleaningparadisellc",
				"https://www.instagram.com/cleaningparadisellc",
				"https://www.youtube.com/@cleaningparadisellc",
				"https://www.tiktok.com/@cleaningparadisellc",
				"https://www.bbb.org/us/wa/seattle-washington/profile/cleaning-services/cleaning-paradise-llc-1296-1000178895",
			],
		},
		{
			"@type": "Person",
			"@id": FOUNDER_ID,
			name: "Allizon Arana",
			jobTitle: "Founder",
			worksFor: { "@id": BUSINESS_ID },
		},
	],
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
					dangerouslySetInnerHTML={{ __html: JSON.stringify(siteJsonLd).replace(/</g, "\\u003c") }}
				/>
				{/* ponytail: script crudo en <head>, no next/script. afterInteractive lo inyecta
				    en cliente y el verificador de GA4 (que no ejecuta JS) no lo ve. */}
				<script async src="https://www.googletagmanager.com/gtag/js?id=G-K92THXSRRF" />
				<script
					dangerouslySetInnerHTML={{
						__html: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','G-K92THXSRRF');`,
					}}
				/>
				{/* Hotjar / Contentsquare */}
				<script async src="https://t.contentsquare.net/uxa/628fbdef29c13.js" />
				{/* Traks */}
				<script
					dangerouslySetInnerHTML={{
						__html: `window.traks=window.traks||function(){(window.traks.q=window.traks.q||[]).push(arguments)}`,
					}}
				/>
				<script defer data-site="pb_live_qai23u1emmk2q32annfx6aue" src="https://traks-collect.nexteralab.workers.dev/t.js" />
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
