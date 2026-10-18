import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	async redirects() {
		return [
			{ source: "/plans-pricing", destination: "/", permanent: true },
			// URLs del WordPress viejo (Wayback + DataForSEO) → equivalente nuevo.
			{ source: "/home", destination: "/", permanent: true },
			{ source: "/shop", destination: "/", permanent: true },
			{ source: "/faqs", destination: "/#faq", permanent: true },
			{ source: "/book-your-cleaner", destination: "/contact", permanent: true },
			{ source: "/product/:path*", destination: "/contact", permanent: true },
			{ source: "/product-category/:path*", destination: "/contact", permanent: true },
			{ source: "/cart", destination: "/contact", permanent: true },
			{ source: "/metform-form/:path*", destination: "/contact", permanent: true },
			{ source: "/residential-cleaning", destination: "/cleaning-services-in-wa", permanent: true },
			{ source: "/professional-cleaning-services", destination: "/cleaning-services-in-wa", permanent: true },
			{ source: "/verified-company", destination: "/about-us", permanent: true },
			{ source: "/trusted-by-thumbtack", destination: "/about-us", permanent: true },
			{ source: "/refund-guarantee-:rest", destination: "/about-us", permanent: true },
			{ source: "/2024/:path*", destination: "/blog", permanent: true },
			{ source: "/category/:path*", destination: "/blog", permanent: true },
			{ source: "/tag/:path*", destination: "/blog", permanent: true },
			{ source: "/author/:path*", destination: "/blog", permanent: true },
			// ponytail: imágenes viejas sin equivalente 1:1, todas a la home.
			{ source: "/wp-content/:path*", destination: "/", permanent: true },
		];
	},
};

export default nextConfig;

// Enable calling `getCloudflareContext()` in `next dev`.
// See https://opennext.js.org/cloudflare/bindings#local-access-to-bindings.
import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";
initOpenNextCloudflareForDev();
