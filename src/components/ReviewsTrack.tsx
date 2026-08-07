import Reveal from "@/components/Reveal";
import ReviewCard from "@/components/ReviewCard";
import { reviews } from "@/lib/reviews";

/* Full-bleed marquee of review cards — track ×2, hover pausa.
   ponytail: pr en cada card (no gap/px en el track): así -50% calza exacto y el loop es invisible. */
export default function ReviewsTrack() {
	return (
		<Reveal>
			<div className="group mb-[34px] w-full overflow-hidden pt-2 pb-6">
				<div className="flex w-max items-start animate-[galleryScrollH_70s_linear_infinite] group-hover:[animation-play-state:paused]">
					{[...reviews, ...reviews].map((r, i) => (
						<div
							key={i}
							aria-hidden={i >= reviews.length}
							className="w-[min(700px,88vw)] shrink-0 pr-[22px]"
						>
							<ReviewCard review={r} />
						</div>
					))}
				</div>
			</div>
		</Reveal>
	);
}
