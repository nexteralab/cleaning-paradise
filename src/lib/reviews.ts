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
	// Thumbtack no publica la ciudad del reviewer — usamos el área de servicio.
	{
		text: "We love Cleaning Paradise! We look forward to them coming every two weeks. We have arranged for a standard set of to-dos as well as a \"project\" like the oven or our downstairs bathroom that don't need regular cleaning. When we don't tell them which project we'd like, they always just find something to tackle and exceed our expectations. Love them!!",
		initials: "MH",
		name: "Melissa H.",
		location: "Greater Seattle, WA",
	},
	{
		text: "I had a great experience with the team for a one-time deep cleaning; the quality was as good as I've seen after trying several different local options. I plan to work with them again for regular cleanings!",
		initials: "JK",
		name: "Jay K.",
		location: "Greater Seattle, WA",
	},
	{
		text: "Allizon and her partner did an amazing and completely thorough job, even down to scrubbing the top of the baseboards and cleaning inside the dishwasher. They made the bathroom look like new! I will definitely use her again and again.",
		initials: "BL",
		name: "Beth L.",
		location: "Greater Seattle, WA",
	},
	{
		text: "We love Cleaning Paradise and use them as our monthly cleaning service. They are fast and thorough. They come as a team of three, which I really appreciate as previous cleaning services would only send one person. They are very responsive over text and very flexible, making scheduling a breeze. I also really appreciate the little touches and extra effort on their part.",
		initials: "AS",
		name: "Amber & Tyson S.",
		location: "Greater Seattle, WA",
	},
	{
		text: "I recently hired Cleaning Paradise to help unpack and clean my new home, and I couldn't be happier with their service! The team was professional, efficient, and incredibly thorough. They unpacked all of my boxes with care, organized everything neatly, and left my house sparkling clean. I highly recommend them!",
		initials: "CH",
		name: "Chincholi H.",
		location: "Greater Seattle, WA",
	},
	{
		text: "Cleaning Paradise's team did a phenomenal job on my home. They went way above and beyond my expectations. I was blown away. I can't recommend them highly enough!! What a blessing to have my house cleaned for me. So grateful.",
		initials: "CA",
		name: "Connie A.",
		location: "Greater Seattle, WA",
	},
];
