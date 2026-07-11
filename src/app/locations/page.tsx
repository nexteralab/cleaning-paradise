import type { Metadata } from "next";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import { locations, locationSlugs } from "./locations-data";
import {
  MapPin,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  ShieldCheck,
  CalendarCheck,
  Award,
  DollarSign,
  BookOpen,
  Lightbulb,
  Home,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Professional Cleaning in Your City | Cleaning Paradise",
  description:
    "Cleaning Paradise brings expert residential and commercial cleaning services to neighborhoods across King and Snohomish County. Find your local team and book a free quote today.",
};

type City = {
  name: string;
  img: string;
  alt: string;
  description: string;
  href: string;
  linkLabel: string;
};

// Derived from the single source of truth in locations-data.ts.
const cities: City[] = locationSlugs.map((slug) => {
  const l = locations[slug];
  return {
    name: l.name,
    img: l.img,
    alt: `Cleaning Paradise team serving ${l.name}`,
    description: l.blurb,
    href: `/locations/${slug}`,
    linkLabel: `View ${l.name} services`,
  };
});

type Feature = {
  icon: React.ReactNode;
  iconClasses: string;
  title: string;
  description: string;
};

const featuresLeft: Feature[] = [
  {
    icon: <CheckCircle2 size={24} />,
    iconClasses: "bg-[#FFE0F0] text-pink-500",
    title: "Local Expertise",
    description:
      "Over 10 years serving Greater Seattle. We know the specific cleaning challenges of Pacific Northwest homes.",
  },
  {
    icon: <ShieldCheck size={24} />,
    iconClasses: "bg-blue-50 text-blue-600",
    title: "Licensed & Insured",
    description:
      "Full background checks and bonding for every team member. Your home is in safe hands.",
  },
  {
    icon: <Sparkles size={24} />,
    iconClasses: "bg-[#FFE0F0] text-pink-500",
    title: "Eco-Friendly Products",
    description:
      "Non-toxic, biodegradable cleaning solutions safe for kids, pets, and sensitive surfaces.",
  },
];

const featuresRight: Feature[] = [
  {
    icon: <CalendarCheck size={24} />,
    iconClasses: "bg-blue-50 text-blue-600",
    title: "Flexible Scheduling",
    description:
      "Mornings, evenings, weekends — we work around your schedule. Same-week availability.",
  },
  {
    icon: <Award size={24} />,
    iconClasses: "bg-[#FFE0F0] text-pink-500",
    title: "100% Satisfaction",
    description:
      "Not satisfied? We'll make it right at no extra cost. Your trust is our priority.",
  },
  {
    icon: <DollarSign size={24} />,
    iconClasses: "bg-blue-50 text-blue-600",
    title: "Transparent Pricing",
    description:
      "Free quotes. No hidden fees. Standard cleaning starts at $55/hr per person.",
  },
];

type BlogCard = {
  icon: React.ReactNode;
  iconClasses: string;
  hoverClasses: string;
  title: string;
  description: string;
};

const blogCards: BlogCard[] = [
  {
    icon: <BookOpen size={32} />,
    iconClasses: "bg-pink-500/10 text-pink-500",
    hoverClasses: "hover:border-pink-500 hover:bg-pink-50",
    title: "Spring Cleaning Guide",
    description:
      "Learn how to refresh your home for spring with our seasonal deep clean checklist.",
  },
  {
    icon: <Lightbulb size={32} />,
    iconClasses: "bg-blue-600/10 text-blue-600",
    hoverClasses: "hover:border-blue-600 hover:bg-blue-50",
    title: "Eco-Friendly Cleaning",
    description:
      "Discover our sustainable cleaning practices and how we reduce environmental impact.",
  },
  {
    icon: <Home size={32} />,
    iconClasses: "bg-pink-500/10 text-pink-500",
    hoverClasses: "hover:border-pink-500 hover:bg-pink-50",
    title: "Move-In Checklist",
    description:
      "Everything you need to know about our move-in and move-out cleaning services.",
  },
];

function CityCard({ city }: { city: City }) {
  const cardClasses =
    "block bg-white border-[1.5px] border-ink-200 rounded-[22px] overflow-hidden transition-all duration-300 ease-[cubic-bezier(.16,1,.3,1)] hover:border-pink-500 hover:shadow-[0_16px_40px_rgba(30,62,162,0.12)] hover:-translate-y-1";

  const media = (
    <div className="relative w-full h-[280px] bg-[#f0f0f5] overflow-hidden">
      <img src={city.img} alt={city.alt} className="w-full h-full object-cover block" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/0 to-black/30 pointer-events-none" />
    </div>
  );

  const heading = (
    <h3 className="font-serif text-[26px] text-ink-900 tracking-[-0.01em] mb-2.5">{city.name}</h3>
  );
  const copy = (
    <p className="text-sm text-ink-600 leading-[1.6] mb-[18px]">{city.description}</p>
  );

  return (
    <div className={cardClasses}>
      {media}
      <div className="p-7">
        {heading}
        {copy}
        <Link
          href={city.href}
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-pink-500 no-underline transition-all duration-200 hover:gap-2.5"
        >
          {city.linkLabel} <ArrowRight size={15} />
        </Link>
      </div>
    </div>
  );
}

function FeatureItem({ feature, last }: { feature: Feature; last?: boolean }) {
  return (
    <div className={`flex items-start gap-3.5 ${last ? "" : "mb-5"}`}>
      <div
        className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 ${feature.iconClasses}`}
      >
        {feature.icon}
      </div>
      <div>
        <h3 className="text-base font-semibold text-ink-900 mb-1.5">{feature.title}</h3>
        <p className="text-sm text-ink-600 leading-[1.6]">{feature.description}</p>
      </div>
    </div>
  );
}

export default function LocationsPage() {
  return (
    <div className="relative w-full overflow-x-clip">
      {/* HERO: Locations Overview */}
      <section className="bg-white px-10 pt-[120px] pb-20 text-center border-b border-ink-200 max-md:px-5">
        <Reveal className="max-w-[1000px] mx-auto">
          <div className="inline-flex items-center gap-[7px] bg-pink-500/15 text-pink-500 text-[11.5px] font-semibold tracking-[.06em] uppercase px-4 py-2 rounded-full mb-[22px]">
            <MapPin size={13} />
            Serving Greater Seattle
          </div>
          <h1 className="font-serif text-[clamp(56px,7vw,88px)] font-normal leading-[1.06] text-ink-900 tracking-[-0.025em] mb-6">
            Professional Cleaning in Your City
          </h1>
          <p className="text-lg text-ink-600 leading-[1.7] mb-2">
            Cleaning Paradise brings expert residential and commercial cleaning services to
            neighborhoods across King and Snohomish County. Find your local team and book a free
            quote today.
          </p>
          <div className="text-[15px] text-[#808098] mt-4">
            ✓ Same-week availability · ✓ Licensed & Insured · ✓ 100% satisfaction guarantee
          </div>
        </Reveal>
      </section>

      {/* CITIES GRID */}
      <section className="py-24 px-10 bg-white max-md:px-5">
        <div className="max-w-[1240px] mx-auto">
          <Reveal className="text-center mb-16">
            <h2 className="font-serif text-[40px] text-ink-800 tracking-[-0.01em] leading-[1.05] mb-4">
              Choose Your Location
            </h2>
            <p className="text-base text-ink-600 max-w-[600px] mx-auto">
              Select your city to learn more about our cleaning services in your area and schedule
              your appointment.
            </p>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 mb-10">
            {cities.map((city, i) => (
              <Reveal key={city.name} delay={(i % 3) * 90}>
                <CityCard city={city} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* SEO Optimized Content Section */}
      <section className="py-20 px-10 bg-white border-t border-ink-200 max-md:px-5">
        <div className="max-w-[1000px] mx-auto">
          <Reveal>
            <h2 className="font-serif text-4xl text-ink-900 tracking-[-0.01em] mb-7">
              Why Choose Cleaning Paradise for Your Local Cleaning Needs
            </h2>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-11">
            <Reveal>
              {featuresLeft.map((feature, i) => (
                <FeatureItem key={feature.title} feature={feature} last={i === featuresLeft.length - 1} />
              ))}
            </Reveal>
            <Reveal delay={120}>
              {featuresRight.map((feature, i) => (
                <FeatureItem key={feature.title} feature={feature} last={i === featuresRight.length - 1} />
              ))}
            </Reveal>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-white py-20 px-10 text-center border-t border-ink-200 max-md:px-5">
        <Reveal className="max-w-[800px] mx-auto">
          <h2 className="font-serif text-[clamp(40px,5vw,64px)] font-normal text-ink-900 tracking-[-0.02em] leading-[1.1] mb-[18px]">
            Ready to Get Your Home Clean?
          </h2>
          <p className="text-[17px] text-ink-600 leading-[1.7] mb-8">
            Book a free, no-obligation quote with your local Cleaning Paradise team. Same-week
            availability in most areas.
          </p>
          <div className="flex gap-3.5 justify-center flex-wrap">
            <Link
              href="/contact"
              className="bg-pink-500 text-white font-bold text-base px-9 py-4 rounded-full no-underline transition-all duration-200 ease-[cubic-bezier(.16,1,.3,1)] hover:-translate-y-0.5 hover:shadow-[0_12px_30px_rgba(255,80,181,0.4)]"
            >
              Get Your Free Quote
            </Link>
            <a
              href="tel:+14256100241"
              className="bg-white text-ink-900 border-2 border-ink-200 font-semibold text-base px-[34px] py-3.5 rounded-full no-underline transition-all duration-200 hover:border-ink-900"
            >
              Call (425) 610-0241
            </a>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
