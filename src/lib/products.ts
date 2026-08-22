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

export type Category = "Shoes" | "Slides" | "Shirts" | "Jeans" | "Pants";

export const CATEGORIES: Category[] = ["Shoes", "Slides", "Shirts", "Jeans", "Pants"];

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
    images: [jordan4],
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
    images: [samba],
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
    images: [campus],
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
    images: [oldskool],
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
    images: [numeris],
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
    images: [boston],
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
    images: [amiri],
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
    images: [yeezy],
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
    images: [tees],
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
    images: [sweatpants],
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
    images: [blackJeans],
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
    images: [greyJeans],
    sizes: ["30", "32", "34", "36"],
    colours: ["Grey"],
    inStock: true,
    badges: ["NEW"],
    addedIndex: 1,
    description:
      "Acid-washed grey denim with contrast white panels down the leg and a stacked, frayed flare hem.",
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
