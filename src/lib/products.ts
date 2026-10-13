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
import gelNycCreamAsset from "@/assets/asics-gel-nyc-cream-grey.png.asset.json";
import gelNycSilverAsset from "@/assets/asics-gel-nyc-silver-grey.png.asset.json";
import gelNycBlueAsset from "@/assets/asics-gel-nyc-sky-blue.png.asset.json";
import gelNycBlackAsset from "@/assets/asics-gel-nyc-black-silver.png.asset.json";

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

export type Category = string;

export const CATEGORIES: Category[] = ["Shoes", "Slides", "Shirts", "Hoodies", "Jeans", "Pants"];

export const allCategories = (list: Product[] = PRODUCTS) =>
  Array.from(new Set([...CATEGORIES, ...list.map((product) => product.category)])).sort();


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
  bestSellerRank?: number;
  addedIndex: number;
  relatedSlugs?: string[];
  description: string;
};

export const WHATSAPP_NUMBER = "233558763858";
export const WHATSAPP_DISPLAY = "0558763858";

export const PRODUCTS: Product[] = [
  {
    slug: "asics-gel-nyc-p134",
    name: "Gel-NYC / P134",
    brand: "Asics",
    category: "Shoes",
    price: 250,
    images: [
      gelNycCreamAsset.url,
      gelNycSilverAsset.url,
      gelNycBlueAsset.url,
      gelNycBlackAsset.url,
    ],
    sizes: ["40", "41", "42", "43", "44"],
    colours: ["Cream / Grey", "Silver / Grey", "Sky Blue", "Black / Silver"],
    inStock: true,
    badges: ["NEW"],
    addedIndex: 128,
    description:
      "ASICS Gel-NYC / P134 runner with layered mesh and synthetic overlays, available in four colourways with cushioned everyday comfort.",
  },
  {
    slug: "air-jordan-4-white-cement",
    name: "Air Jordan 4 — White Cement",
    brand: "Jordan",
    category: "Shoes",
    price: 450,
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
  
  
  
];

export const bySlug = (slug: string, list: Product[] = PRODUCTS) =>
  list.find((p) => p.slug === slug);

export const newArrivals = (list: Product[] = PRODUCTS) =>
  [...list].sort((a, b) => b.addedIndex - a.addedIndex).slice(0, 8);

export const bestSellers = (list: Product[] = PRODUCTS) =>
  list
    .filter((p) => p.bestSellerRank)
    .sort((a, b) => (a.bestSellerRank ?? 99) - (b.bestSellerRank ?? 99));

export const relatedTo = (p: Product, list: Product[] = PRODUCTS) =>
  list
    .filter((x) => x.slug !== p.slug && x.category === p.category)
    .concat(list.filter((x) => x.slug !== p.slug && x.category !== p.category))
    .slice(0, 4);
export const allColours = (list: Product[] = PRODUCTS) =>
  Array.from(new Set(list.flatMap((p) => p.colours))).sort();

export const allSizes = (list: Product[] = PRODUCTS) =>
  Array.from(new Set(list.flatMap((p) => p.sizes))).sort(
    (a, b) => Number(a) - Number(b)
  );

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
