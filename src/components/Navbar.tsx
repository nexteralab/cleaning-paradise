import Link from "next/link";

const links = [
	{ href: "/services", label: "Services" },
	{ href: "/locations", label: "Locations" },
	{ href: "/blog", label: "Blog" },
	{ href: "/about", label: "About Us" },
];

export default function Navbar() {
	return (
		<nav className="fixed top-6 left-6 z-[9999] flex items-center gap-7 rounded-[14px] bg-white px-7 py-3.5 shadow-[0_8px_32px_rgba(30,62,162,0.15)] backdrop-blur-[10px]">
			<Link
				href="/"
				className="font-serif text-lg tracking-[-0.01em] whitespace-nowrap text-ink-900"
			>
				Cleaning Paradise
			</Link>
			<div className="flex flex-1 items-center justify-center gap-7">
				{links.map((l) => (
					<Link
						key={l.href}
						href={l.href}
						className="text-sm font-medium whitespace-nowrap text-ink-600 transition-colors duration-200 hover:text-pink-500"
					>
						{l.label}
					</Link>
				))}
			</div>
			<a
				href="tel:+14256100241"
				className="rounded-full bg-ink-900 px-5 py-2.5 text-sm font-semibold whitespace-nowrap text-white transition-all duration-200 ease-(--ease-out) hover:bg-[#2A2A3C] hover:shadow-[0_4px_20px_rgba(19,19,32,0.3)]"
			>
				(425) 610-0241
			</a>
		</nav>
	);
}
