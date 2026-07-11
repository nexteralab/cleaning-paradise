// Shared client testimonials — used by the home page and the service pages.
export type Review = {
	text: string;
	photos?: string[];
	initials: string;
	name: string;
	location: string;
};

export const reviews: Review[] = [
	{
		text: "Cleaning Paradise has been amazing to work with. Their communication is always prompt, professional, and friendly. The quality of their cleaning service is outstanding, and they consistently pay attention to the details. Their pricing is also very reasonable for the level of service they provide. It's hard to find a company that combines reliability, quality, and affordability so well. I highly recommend Cleaning Paradise to anyone in the Seattle area looking for a trustworthy cleaning service.",
		photos: ["/img/review-1-p1.webp"],
		initials: "MG",
		name: "Camilo P.",
		location: "Bellevue, WA",
	},
	{
		text: "Allizon was a true lifesaver during a family crisis. We all live out of state. She moved her schedule around to assist with a cleaning for a terminally ill family member and a disabled child. She came in with no judgement, we talked priorities and the team went to town. The house looked so nice and smelled so fresh, I would never have been able to pull that off without her help. This wasn't a normal clean as I needed help moving furniture around to accommodate a large group of people in the middle of trying to get the house ready for sale. We will be working with her again in the future and highly recommend Cleaning Paradise LLC for all your cleaning needs. They are amazing and the house shined when the whole family showed up for the funeral.",
		photos: ["/img/review-2-p1.webp", "/img/review-2-p2.webp"],
		initials: "JC",
		name: "Brenda G.",
		location: "Kirkland, WA",
	},
	{
		text: "We've been using Cleaning Paradise's services for about 6 months, almost monthly. Allizon and her team are excellent, always communicating well, working with our schedules and very kind. We always love how spotless they make our home, especially with us having a pet dog that sheds a lot! Happy to keep their services for many more months to come!",
		photos: ["/img/review-3-p1.webp", "/img/review-3-p2.webp"],
		initials: "AL",
		name: "Roynerah B",
		location: "Seattle, WA",
	},
];
