//#region node_modules/.nitro/vite/services/ssr/assets/products-sweX_gG3.js
var look_1_default = "/assets/look-1-BsJ31WbL.jpg";
var look_2_default = "/assets/look-2-7Rjj_Tq7.jpg";
var look_3_default = "/assets/look-3-DMYl2xBH.jpg";
var look_4_default = "/assets/look-4-CrJZIJtT.jpg";
var look_5_default = "/assets/look-5-D7ItTc4S.jpg";
var look_6_default = "/assets/look-6-BEFyZHWG.jpg";
var banner_1_default = "/assets/banner-1-B-w-PyMT.jpg";
var banner_2_default = "/assets/banner-2-B63qtxn1.jpg";
var CATEGORIES = [
	"New Drops",
	"Party & Clubbing",
	"Formals & Galas",
	"Streetwear",
	"Luxury Designer",
	"Subscription Plans",
	"Clearance Sale"
];
var EVENTS = [
	"Concert",
	"Gala",
	"Club Night",
	"Wedding",
	"Campus",
	"Brunch"
];
var SIZES = [
	"XS",
	"S",
	"M",
	"L",
	"XL",
	"XXL"
];
var DURATIONS = [
	"3-day",
	"7-day",
	"14-day"
];
var BRANDS = [
	"MAISON NOIR",
	"ATELIER 9",
	"RIOT LABEL",
	"VELVET CULT",
	"KAI STUDIO"
];
var PRODUCTS = [
	{
		id: "p1",
		slug: "emerald-sequin-slip-dress",
		title: "Emerald Sequin Slip Dress",
		designer: "VELVET CULT",
		image: look_1_default,
		gallery: [
			look_1_default,
			look_4_default,
			look_5_default
		],
		category: "Party & Clubbing",
		gender: "Women",
		sizes: [
			"XS",
			"S",
			"M",
			"L"
		],
		retail: 42e3,
		perDay: 649,
		rating: 4.8,
		reviews: 214,
		available: true,
		badge: "TRENDING",
		event: "Club Night"
	},
	{
		id: "p2",
		slug: "oversized-moto-leather-set",
		title: "Oversized Moto Leather Set",
		designer: "RIOT LABEL",
		image: look_2_default,
		gallery: [
			look_2_default,
			look_6_default,
			look_3_default
		],
		category: "Streetwear",
		gender: "Unisex",
		sizes: [
			"S",
			"M",
			"L",
			"XL",
			"XXL"
		],
		retail: 68e3,
		perDay: 899,
		rating: 4.6,
		reviews: 132,
		available: true,
		badge: "NEW DROP",
		event: "Concert"
	},
	{
		id: "p3",
		slug: "ivory-three-piece-gala-tux",
		title: "Ivory Three-Piece Gala Tux",
		designer: "MAISON NOIR",
		image: look_3_default,
		gallery: [
			look_3_default,
			look_6_default,
			look_2_default
		],
		category: "Formals & Galas",
		gender: "Men",
		sizes: [
			"S",
			"M",
			"L",
			"XL"
		],
		retail: 95e3,
		perDay: 1199,
		rating: 4.9,
		reviews: 88,
		available: true,
		badge: "VIP ONLY",
		event: "Gala"
	},
	{
		id: "p4",
		slug: "crimson-silk-column-gown",
		title: "Crimson Silk Column Gown",
		designer: "ATELIER 9",
		image: look_4_default,
		gallery: [
			look_4_default,
			look_1_default,
			look_5_default
		],
		category: "Luxury Designer",
		gender: "Women",
		sizes: [
			"XS",
			"S",
			"M"
		],
		retail: 128e3,
		perDay: 1499,
		rating: 5,
		reviews: 61,
		available: false,
		badge: "WAITLIST",
		event: "Wedding"
	},
	{
		id: "p5",
		slug: "liquid-chrome-co-ord",
		title: "Liquid Chrome Co-Ord",
		designer: "KAI STUDIO",
		image: look_5_default,
		gallery: [
			look_5_default,
			look_1_default,
			look_2_default
		],
		category: "Party & Clubbing",
		gender: "Women",
		sizes: [
			"XS",
			"S",
			"M",
			"L",
			"XL"
		],
		retail: 37e3,
		perDay: 549,
		rating: 4.4,
		reviews: 176,
		available: true,
		event: "Club Night"
	},
	{
		id: "p6",
		slug: "camel-trench-knit-layer",
		title: "Camel Trench & Knit Layer",
		designer: "MAISON NOIR",
		image: look_6_default,
		gallery: [
			look_6_default,
			look_3_default,
			look_2_default
		],
		category: "New Drops",
		gender: "Unisex",
		sizes: [
			"S",
			"M",
			"L",
			"XL",
			"XXL"
		],
		retail: 54e3,
		perDay: 599,
		rating: 4.7,
		reviews: 143,
		available: true,
		badge: "CAMPUS PICK",
		event: "Campus"
	}
];
function getProductBySlug(slug) {
	return PRODUCTS.find((product) => product.slug === slug);
}
var BANNERS = [{
	image: banner_1_default,
	kicker: "DROP 011 — LIVE NOW",
	title: "Gala Season, Rented.",
	copy: "Couture gowns and tuxedos from ₹649/day. Dry-cleaned, delivered, collected.",
	cta: "Shop Formals & Galas"
}, {
	image: banner_2_default,
	kicker: "AFTER DARK COLLECTION",
	title: "Streetwear On Rotation.",
	copy: "Rotate 4 statement fits a month with the Gold Pass. No resale guilt.",
	cta: "Explore Streetwear"
}];
var PLANS = [
	{
		name: "Silver Pass",
		price: 999,
		outfits: "2 outfits / month",
		perks: [
			"Free 3-day rentals",
			"Standard delivery",
			"Basic AI Stylist"
		],
		highlight: false
	},
	{
		name: "Gold Pass",
		price: 1899,
		outfits: "4 outfits / month",
		perks: [
			"Free 7-day rentals",
			"Priority delivery slots",
			"Full AI Try-On Studio",
			"Zero security deposit"
		],
		highlight: true
	},
	{
		name: "Unlimited VIP Pass",
		price: 3499,
		outfits: "Unlimited swaps",
		perks: [
			"Any duration, any label",
			"Same-day delivery in metros",
			"Early access to drops",
			"Personal human stylist call"
		],
		highlight: false
	}
];
//#endregion
export { EVENTS as a, SIZES as c, DURATIONS as i, getProductBySlug as l, BRANDS as n, PLANS as o, CATEGORIES as r, PRODUCTS as s, BANNERS as t };
