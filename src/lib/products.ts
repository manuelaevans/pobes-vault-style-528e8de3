import jordan4Asset from "@/assets/jordan4.asset.json";
import sambaAsset from "@/assets/samba.asset.json";
import campusAsset from "@/assets/campus.asset.json";
import oldskoolAsset from "@/assets/oldskool.asset.json";
import numerisAsset from "@/assets/numeris.asset.json";
import bostonAsset from "@/assets/boston.asset.json";
import amiriAsset from "@/assets/slides.asset.json";
import yeezyAsset from "@/assets/yeezyslides.asset.json";
import teesAsset from "@/assets/tees.asset.json";
import sweatpantsAsset from "@/assets/sweatpants.asset.json";
import blackJeansAsset from "@/assets/jeans.asset.json";
import greyJeansAsset from "@/assets/greyjeans.asset.json";
import pumaBlackAsset from "@/assets/pumasuede-black.asset.json";
import pumaBwAsset from "@/assets/pumasuede-bw.asset.json";
import coachAsset from "@/assets/coachslides.asset.json";
import airmaxAsset from "@/assets/airmax95.asset.json";
import adiletteAsset from "@/assets/adilette.asset.json";
import crocsAsset from "@/assets/crocs-yukon.asset.json";
import timberlandAsset from "@/assets/timberland.asset.json";
import poloHoodieAsset from "@/assets/polohoodie.asset.json";
import burberryAsset from "@/assets/burberryslides.asset.json";
import asicsAsset from "@/assets/asicsgel.asset.json";

const jordan4 = jordan4Asset.url;
const samba = sambaAsset.url;
const campus = campusAsset.url;
const oldskool = oldskoolAsset.url;
const numeris = numerisAsset.url;
const boston = bostonAsset.url;
const amiri = amiriAsset.url;
const yeezy = yeezyAsset.url;
const tees = teesAsset.url;
const sweatpants = sweatpantsAsset.url;
const blackJeans = blackJeansAsset.url;
const greyJeans = greyJeansAsset.url;

export type Badge = "NEW" | "BEST SELLER" | "SALE" | "LIMITED";

export type Category = "Shoes" | "Slides" | "Shirts" | "Hoodies" | "Jeans" | "Pants";

export const CATEGORIES: Category[] = ["Shoes", "Slides", "Shirts", "Hoodies", "Jeans", "Pants"];


export type Product = {
  slug: string;
  name: string;
  brand: string;
  category: Category;
  price: number;
  oldPrice?: number;
  images: string[];
  sizes: string[];
  colours: string[];
  inStock: boolean;
  badges: Badge[];
  bestSellerRank?: number;
  addedIndex: number;
  description: string;
};

export const WHATSAPP_NUMBER = "233558763858";
export const WHATSAPP_DISPLAY = "0558763858";

export const PRODUCTS: Product[] = [
  {
    slug: "air-jordan-4-white-cement",
    name: "Air Jordan 4 — White Cement",
    brand: "Jordan",
    category: "Shoes",
    price: 1450,
    images: ["/images/jordan4.jpeg"],
    sizes: ["40", "41", "42", "43", "44", "45"],
    colours: ["White", "Grey", "Black"],
    inStock: true,
    badges: ["NEW", "BEST SELLER"],
    bestSellerRank: 1,
    addedIndex: 12,
    description:
      "The White Cement 4 in full box. White leather upper with cement-speckled grey overlays, black netting and visible Air unit. Comes as pictured with box.",
  },
  {
    slug: "adidas-samba-white-black",
    name: "Samba — White / Black",
    brand: "Adidas",
    category: "Shoes",
    price: 850,
    images: ["/images/samba.jpeg"],
    sizes: ["40", "41", "42", "43", "44", "45"],
    colours: ["White", "Black"],
    inStock: true,
    badges: ["BEST SELLER"],
    bestSellerRank: 2,
    addedIndex: 11,
    description:
      "Clean white leather Samba with black stripes, gum sole and grey suede toe. Low profile, pairs with denim, shorts or trousers.",
  },
  {
    slug: "adidas-campus-00s-black",
    name: "Campus 00s — Black / White",
    brand: "Adidas",
    category: "Shoes",
    price: 880,
    images: ["/images/campus.jpeg"],
    sizes: ["40", "41", "42", "43", "44"],
    colours: ["Black", "White"],
    inStock: true,
    badges: ["NEW"],
    addedIndex: 10,
    description:
      "Black suede Campus 00s with white three stripes, fat laces and gum outsole. Chunky retro shape, boxed.",
  },
  {
    slug: "vans-old-skool-black-white",
    name: "Old Skool — Black / White",
    brand: "Vans",
    category: "Shoes",
    price: 620,
    oldPrice: 700,
    images: ["/images/oldskool.webp"],
    sizes: ["39", "40", "41", "42", "43", "44"],
    colours: ["Black", "White"],
    inStock: true,
    badges: ["SALE", "BEST SELLER"],
    bestSellerRank: 3,
    addedIndex: 9,
    description:
      "Canvas and suede skate silhouette with the classic white sidestripe. Padded collar, waffle outsole, everyday durability.",
  },
  {
    slug: "numeris-low-black-white",
    name: "Numeris Low — Black / White",
    brand: "Numeriś",
    category: "Shoes",
    price: 950,
    images: ["/images/numeris.jpeg"],
    sizes: ["40", "41", "42", "43", "44"],
    colours: ["Black", "White"],
    inStock: true,
    badges: ["LIMITED"],
    addedIndex: 8,
    description:
      "Distressed black canvas low top on a chunky white sawtooth sole, with fat rope laces. Ships with dust bag, spare laces and box.",
  },
  {
    slug: "birkenstock-boston-clogs",
    name: "Boston Clogs — Suede & Leather",
    brand: "Birkenstock",
    category: "Slides",
    price: 780,
    images: ["/images/boston.jpeg"],
    sizes: ["40", "41", "42", "43", "44"],
    colours: ["Black", "Grey", "Sand", "Brown"],
    inStock: true,
    badges: ["NEW"],
    addedIndex: 7,
    description:
      "Closed-toe Boston clogs with buckle strap and cork footbed. Available in black, taupe grey, sand and oiled brown.",
  },
  {
    slug: "amiri-slides",
    name: "Amiri Slides — Logo Strap",
    brand: "Amiri",
    category: "Slides",
    price: 520,
    images: ["/images/slides.jpeg"],
    sizes: ["40", "41", "42", "43", "44"],
    colours: ["Blue", "Red", "Black"],
    inStock: true,
    badges: ["BEST SELLER"],
    bestSellerRank: 4,
    addedIndex: 6,
    description:
      "Moulded rubber slides with a raised logo strap. Blue, red and two black colourways, boxed.",
  },
  {
    slug: "yeezy-slides",
    name: "Yeezy Slides",
    brand: "Adidas",
    category: "Slides",
    price: 690,
    oldPrice: 760,
    images: ["/images/yeezyslides.jpeg"],
    sizes: ["40", "41", "42", "43", "44"],
    colours: ["Onyx", "Soot", "Ochre"],
    inStock: true,
    badges: ["SALE"],
    addedIndex: 5,
    description:
      "Soft EVA foam slides with a grooved sole. Onyx black, soot brown and ochre tan, each with original box.",
  },
  {
    slug: "essential-tee-two-pack",
    name: "Essential Tee — Black / White",
    brand: "Pobe's Select",
    category: "Shirts",
    price: 180,
    images: ["/images/tees.jpeg"],
    sizes: ["S", "M", "L", "XL", "XXL"],
    colours: ["Black", "White"],
    inStock: true,
    badges: ["BEST SELLER"],
    bestSellerRank: 5,
    addedIndex: 4,
    description:
      "Heavyweight cotton crew neck with a clean boxy fit. Take it in black, white, or both as a pair.",
  },
  {
    slug: "grey-wide-sweatpants",
    name: "Wide Leg Sweatpants — Grey",
    brand: "Pobe's Select",
    category: "Pants",
    price: 320,
    images: ["/images/sweatpants.jpeg"],
    sizes: ["S", "M", "L", "XL"],
    colours: ["Grey"],
    inStock: true,
    badges: ["NEW"],
    addedIndex: 3,
    description:
      "Heather grey fleece-back sweatpants with an elastic waist, side pockets and a relaxed wide leg.",
  },
  {
    slug: "black-painted-flare-jeans",
    name: "Painted Flare Jeans — Black",
    brand: "Pobe's Select",
    category: "Jeans",
    price: 450,
    images: ["/images/jeans.jpeg"],
    sizes: ["30", "32", "34", "36"],
    colours: ["Black"],
    inStock: true,
    badges: ["LIMITED"],
    addedIndex: 2,
    description:
      "Washed black denim with white paint splatter, panelled flare through the leg and a raw frayed hem.",
  },
  {
    slug: "grey-panelled-flare-jeans",
    name: "Panelled Flare Jeans — Grey",
    brand: "Pobe's Select",
    category: "Jeans",
    price: 430,
    images: ["/images/greyjeans.jpeg"],
    sizes: ["30", "32", "34", "36"],
    colours: ["Grey"],
    inStock: true,
    badges: ["NEW"],
    addedIndex: 1,
    description:
      "Acid-washed grey denim with contrast white panels down the leg and a stacked, frayed flare hem.",
  },
  {
    slug: "puma-suede-xl-triple-black",
    name: "Suede XL — Triple Black",
    brand: "Puma",
    category: "Shoes",
    price: 780,
    images: ["/images/pumasuede-black.jpeg"],
    sizes: ["40", "41", "42", "43", "44", "45"],
    colours: ["Black"],
    inStock: true,
    badges: ["NEW"],
    addedIndex: 22,
    description:
      "All-black suede XL with fat laces, gold Puma branding and the chunky ribbed sole. Boxed.",
  },
  {
    slug: "puma-suede-xl-black-white",
    name: "Suede XL — Black / White",
    brand: "Puma",
    category: "Shoes",
    price: 780,
    images: ["/images/pumasuede-bw.jpeg"],
    sizes: ["40", "41", "42", "43", "44", "45"],
    colours: ["Black", "White"],
    inStock: true,
    badges: ["NEW", "BEST SELLER"],
    bestSellerRank: 6,
    addedIndex: 21,
    description:
      "Black suede upper on a white XL sole with oversized white laces and the classic formstrip.",
  },
  {
    slug: "nike-air-max-95-grey",
    name: "Air Max 95 — Neutral Grey",
    brand: "Nike",
    category: "Shoes",
    price: 1350,
    images: ["/images/airmax95.jpeg"],
    sizes: ["40", "41", "42", "43", "44", "45"],
    colours: ["Grey", "White", "Black"],
    inStock: true,
    badges: ["LIMITED"],
    addedIndex: 20,
    description:
      "The OG Air Max 95 in layered greys with visible Air units front and back. Comes with box.",
  },
   {
    slug: "white airforce one",
    name: "Air Force 1 — White",
    brand: "Nike",
    category: "Shoes",
    price: 1250,
    images: ["/images/airforce1.jpg"],
    sizes: ["40", "41", "42", "43", "44", "45"],
    colours: [ "White", "Black"],
    inStock: true,
    badges: ["LIMITED"],
    addedIndex: 20,
    description:
      "The OG Air Force 1 in pristine white with a classic leather upper and iconic Swoosh. Comes with box.",
  },
  {
    slug: "asics-gel-kayano-14-cream",
    name: "Gel-Kayano 14 — Cream / Silver",
    brand: "Asics",
    category: "Shoes",
    price: 1250,
    images: ["/images/asicsgel.jpeg"],
    sizes: ["40", "41", "42", "43", "44"],
    colours: ["Cream", "Silver"],
    inStock: true,
    badges: ["NEW"],
    addedIndex: 19,
    description:
      "Cream mesh runner with silver overlays and gel cushioning. Y2K shape that goes with everything.",
  },
  {
    slug: "timberland-6-inch-wheat",
    name: "6-Inch Premium Boot — Wheat",
    brand: "Timberland",
    category: "Shoes",
    price: 1500,
    images: ["/images/timberland.jpeg"],
    sizes: ["40", "41", "42", "43", "44", "45"],
    colours: ["Wheat"],
    inStock: true,
    badges: ["NEW"],
    addedIndex: 18,
    description:
      "Waterproof wheat nubuck boot with padded collar and lug outsole. Original box and hang tag.",
  },
  {
    slug: "crocs-yukon-vista-clogs",
    name: "Yukon Vista Clogs",
    brand: "Crocs",
    category: "Slides",
    price: 560,
    images: ["/images/crocs-yukon.jpeg"],
    sizes: ["40", "41", "42", "43", "44", "45"],
    colours: ["Black", "Brown", "Khaki", "Espresso"],
    inStock: true,
    badges: ["NEW"],
    addedIndex: 17,
    description:
      "Rugged Yukon Vista clogs with adjustable heel strap and thick tread. Four colourways available.",
  },
  {
    slug: "adidas-adilette-slides",
    name: "Adilette Slides — Black / White",
    brand: "Adidas",
    category: "Slides",
    price: 380,
    images: ["/images/adilette.jpeg"],
    sizes: ["40", "41", "42", "43", "44"],
    colours: ["Black", "White"],
    inStock: true,
    badges: ["BEST SELLER"],
    bestSellerRank: 7,
    addedIndex: 16,
    description:
      "Classic three-stripe Adilette with a cushioned footbed. Brand new with tags.",
  },
  {
    slug: "burberry-check-slides",
    name: "Check Slides — Archive Beige",
    brand: "Burberry",
    category: "Slides",
    price: 890,
    images: ["/images/burberryslides.jpeg"],
    sizes: ["40", "41", "42", "43", "44"],
    colours: ["Beige", "Black"],
    inStock: true,
    badges: ["LIMITED"],
    addedIndex: 15,
    description:
      "Vintage check strap over a black moulded footbed. Comes with the Burberry box.",
  },
  {
    slug: "coach-signature-slides",
    name: "Signature Slides — Black",
    brand: "Coach",
    category: "Slides",
    price: 620,
    images: ["/images/coachslides.jpeg"],
    sizes: ["40", "41", "42", "43", "44"],
    colours: ["Black"],
    inStock: true,
    badges: ["NEW"],
    addedIndex: 14,
    description:
      "Monogram signature strap with a pebbled leather-look footbed and embossed Coach logo.",
  },
  {
    slug: "polo-full-zip-hoodie-grey",
    name: "Full-Zip Hoodie — Heather Grey",
    brand: "Polo Ralph Lauren",
    category: "Hoodies",
    price: 550,
    images: ["/images/polohoodie.jpeg"],
    sizes: ["S", "M", "L", "XL", "XXL"],
    colours: ["Grey"],
    inStock: true,
    badges: ["NEW"],
    addedIndex: 13,
    description:
      "Fleece-back full-zip hoodie in heather grey with the navy pony logo and kangaroo pockets.",
  },
];

export const bySlug = (slug: string) => PRODUCTS.find((p) => p.slug === slug);

export const newArrivals = () =>
  [...PRODUCTS].sort((a, b) => b.addedIndex - a.addedIndex).slice(0, 8);

export const bestSellers = () =>
  PRODUCTS.filter((p) => p.bestSellerRank).sort(
    (a, b) => (a.bestSellerRank ?? 99) - (b.bestSellerRank ?? 99),
  );

export const deals = () => PRODUCTS.filter((p) => p.oldPrice || p.badges.includes("LIMITED"));

export const relatedTo = (p: Product) =>
  PRODUCTS.filter((x) => x.slug !== p.slug && x.category === p.category)
    .concat(PRODUCTS.filter((x) => x.slug !== p.slug && x.category !== p.category))
    .slice(0, 4);

export const allSizes = () =>
  Array.from(new Set(PRODUCTS.flatMap((p) => p.sizes))).sort((a, b) => a.localeCompare(b));

export const allColours = () =>
  Array.from(new Set(PRODUCTS.flatMap((p) => p.colours))).sort();

export function searchProducts(query: string, list: Product[] = PRODUCTS) {
  const q = query.trim().toLowerCase();
  if (!q) return list;
  const terms = q.split(/\s+/);
  return list.filter((p) => {
    const haystack = [
      p.name,
      p.brand,
      p.category,
      p.description,
      ...p.colours,
      ...p.sizes,
      ...p.badges,
    ]
      .join(" ")
      .toLowerCase();
    return terms.every((t) => haystack.includes(t));
  });
}

export const cedis = (n: number) => `GH₵${n.toLocaleString("en-GH")}`;
