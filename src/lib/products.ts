import samba from "@/assets/p-samba.jpg";
import oldskool from "@/assets/p-oldskool.jpg";
import slides from "@/assets/p-slides.jpg";
import tee from "@/assets/p-tee.jpg";
import jeans from "@/assets/p-jeans.jpg";
import shorts from "@/assets/p-shorts.jpg";
import acc from "@/assets/p-acc.jpg";

export type Badge = "NEW" | "BEST SELLER" | "SALE" | "LIMITED";

export type Category =
  | "Shoes"
  | "Shirts"
  | "Jeans"
  | "Pants"
  | "Shorts"
  | "Slides"
  | "Accessories";

export const CATEGORIES: Category[] = [
  "Shoes",
  "Shirts",
  "Jeans",
  "Pants",
  "Shorts",
  "Slides",
  "Accessories",
];

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
    slug: "samba-white-black",
    name: "Samba — White / Black",
    brand: "Adidas",
    category: "Shoes",
    price: 320,
    images: [samba, oldskool],
    sizes: ["40", "41", "42", "43", "44", "45"],
    colours: ["White", "Black"],
    inStock: true,
    badges: ["NEW", "BEST SELLER"],
    bestSellerRank: 1,
    addedIndex: 12,
    description:
      "A hand-picked pair in clean white with black stripes. Low profile suede and leather build that pairs with denim, shorts or trousers. Stock is limited and rotates whenever something new lands.",
  },
  {
    slug: "old-skool-black-white",
    name: "Old Skool — Black / White",
    brand: "Vans",
    category: "Shoes",
    price: 400,
    oldPrice: 470,
    images: [oldskool, samba],
    sizes: ["39", "40", "41", "42", "43", "44"],
    colours: ["Black", "White"],
    inStock: true,
    badges: ["SALE", "BEST SELLER"],
    bestSellerRank: 2,
    addedIndex: 11,
    description:
      "Canvas and suede skate silhouette in the classic black and white colourway. Padded collar, waffle outsole, everyday durability.",
  },
  {
    slug: "air-force-triple-white",
    name: "Air Force 1 — Triple White",
    brand: "Nike",
    category: "Shoes",
    price: 520,
    images: [samba],
    sizes: ["40", "41", "42", "43", "44"],
    colours: ["White"],
    inStock: true,
    badges: ["BEST SELLER"],
    bestSellerRank: 3,
    addedIndex: 8,
    description:
      "The all-white staple. Leather upper, cushioned Air sole, goes with everything in the vault.",
  },
  {
    slug: "arizona-sand-sandals",
    name: "Arizona — Sand Sandals",
    brand: "Birkenstock",
    category: "Slides",
    price: 380,
    images: [slides],
    sizes: ["40", "41", "42", "43", "44"],
    colours: ["Sand", "Brown"],
    inStock: true,
    badges: ["NEW"],
    addedIndex: 13,
    description:
      "Two-strap, cork footbed sandals in soft sand leather. Broken-in comfort straight out of the box.",
  },
  {
    slug: "leather-slides-black",
    name: "Leather Slides — Black",
    brand: "Pobe's Select",
    category: "Slides",
    price: 220,
    oldPrice: 280,
    images: [slides],
    sizes: ["40", "41", "42", "43", "44", "45"],
    colours: ["Black", "Brown"],
    inStock: true,
    badges: ["SALE"],
    addedIndex: 6,
    description: "Simple single-strap leather slides for everyday wear.",
  },
  {
    slug: "essential-white-tee",
    name: "Essential Tee — White",
    brand: "Pobe's Select",
    category: "Shirts",
    price: 120,
    images: [tee],
    sizes: ["S", "M", "L", "XL", "XXL"],
    colours: ["White", "Black", "Grey"],
    inStock: true,
    badges: ["BEST SELLER"],
    bestSellerRank: 4,
    addedIndex: 10,
    description:
      "Heavyweight cotton crew neck with a boxy fit. A plain, well-cut white t-shirt that holds its shape after washing.",
  },
  {
    slug: "boxy-black-shirt",
    name: "Boxy Shirt — Black",
    brand: "Pobe's Select",
    category: "Shirts",
    price: 180,
    images: [tee],
    sizes: ["S", "M", "L", "XL"],
    colours: ["Black"],
    inStock: true,
    badges: ["NEW"],
    addedIndex: 14,
    description: "Relaxed black shirt in soft cotton twill. Wear it open or buttoned.",
  },
  {
    slug: "grey-washed-flare-denim",
    name: "Grey Washed Flare Denim",
    brand: "Levi's",
    category: "Jeans",
    price: 300,
    images: [jeans],
    sizes: ["30", "32", "34", "36"],
    colours: ["Grey"],
    inStock: true,
    badges: ["LIMITED"],
    addedIndex: 9,
    description:
      "Stone wash grey denim with a slight flare through the leg. Raw hem, parallel fit, single piece only in some sizes.",
  },
  {
    slug: "straight-blue-jeans",
    name: "Straight Jeans — Mid Blue",
    brand: "Levi's",
    category: "Jeans",
    price: 280,
    images: [jeans],
    sizes: ["30", "32", "34", "36", "38"],
    colours: ["Blue"],
    inStock: false,
    badges: [],
    addedIndex: 4,
    description: "Classic straight-leg blue denim, mid-rise, everyday wash.",
  },
  {
    slug: "cargo-pants-black",
    name: "Cargo Pants — Black",
    brand: "Pobe's Select",
    category: "Pants",
    price: 260,
    images: [shorts],
    sizes: ["30", "32", "34", "36"],
    colours: ["Black", "Olive"],
    inStock: true,
    badges: ["NEW"],
    addedIndex: 15,
    description: "Utility cargo trousers with side pockets and a tapered leg.",
  },
  {
    slug: "pleated-trousers-stone",
    name: "Pleated Trousers — Stone",
    brand: "Pobe's Select",
    category: "Pants",
    price: 240,
    images: [shorts],
    sizes: ["30", "32", "34"],
    colours: ["Stone", "Black"],
    inStock: true,
    badges: [],
    addedIndex: 3,
    description: "Smart pleated trousers with a clean drape. Dress them up or down.",
  },
  {
    slug: "cargo-shorts-black",
    name: "Cargo Shorts — Black",
    brand: "Pobe's Select",
    category: "Shorts",
    price: 170,
    oldPrice: 210,
    images: [shorts],
    sizes: ["S", "M", "L", "XL"],
    colours: ["Black"],
    inStock: true,
    badges: ["SALE"],
    addedIndex: 7,
    description: "Knee-length cargo shorts in a hard-wearing cotton blend.",
  },
  {
    slug: "denim-shorts-washed",
    name: "Denim Shorts — Washed Blue",
    brand: "Pobe's Select",
    category: "Shorts",
    price: 150,
    images: [jeans],
    sizes: ["30", "32", "34"],
    colours: ["Blue"],
    inStock: true,
    badges: [],
    addedIndex: 2,
    description: "Cut-off style washed denim shorts for warm days.",
  },
  {
    slug: "cap-and-belt-set",
    name: "Cap & Leather Belt Set",
    brand: "Pobe's Select",
    category: "Accessories",
    price: 190,
    oldPrice: 250,
    images: [acc],
    sizes: ["One Size"],
    colours: ["Black", "Tan"],
    inStock: true,
    badges: ["LIMITED", "SALE"],
    addedIndex: 5,
    description:
      "Bundle deal: a plain black cap plus a tan leather belt. Limited number of sets available.",
  },
  {
    slug: "black-cap",
    name: "Classic Cap — Black",
    brand: "Pobe's Select",
    category: "Accessories",
    price: 90,
    images: [acc],
    sizes: ["One Size"],
    colours: ["Black"],
    inStock: true,
    badges: [],
    addedIndex: 1,
    description: "Six-panel cotton cap with an adjustable strap.",
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
