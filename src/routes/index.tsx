import { Link } from "@tanstack/react-router";
import {
  Search,
  ShoppingBag,
  Menu,
  ArrowRight,
  Heart,
  Truck,
  ShieldCheck,
  LockKeyhole,
  MessageCircle,
  Instagram,
  Sun,
} from "lucide-react";

const categories = [
  {
    name: "SHOES",
    image:
      "C:\Users\LENOVO\my code\pobes-vault-style-528e8de3\public\images\airforce1.jpg",
  },
  {
    name: "SLIDES",
    image:
      "public/images/coachslides.jpeg",
  },
  {
    name: "SHIRTS",
    image:
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=700&q=80",
  },
  {
    name: "HOODIES",
    image:
      "public\images\polohoodie.jpeg",
  },
];

const products = [
  {
    name: "Air Jordan 1 Retro Low",
    price: "GH₵ 350.00",
    image:
      "https://i.ibb.co/Q1FbyYN/IMG-5580.webp",
  },
  {
    name: "Premium Hoodie",
    price: "GH₵ 650.00",
    image:
      "https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?auto=format&fit=crop&w=700&q=80",
  },
  {
    name: "Classic Graphic Tee",
    price: "GH₵ 350.00",
    image:
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=700&q=80",
  },
  {
    name: "Premium Slides",
    price: "GH₵ 300.00",
    image:
      "https://images.unsplash.com/photo-1603487742131-4160ec999306?auto=format&fit=crop&w=700&q=80",
  },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-[#0b0909] text-[#f5f2ed]">

      {/* HEADER */}
      <header className="sticky top-0 z-50 border-b border-white/10 bg-[#0b0909]/95 backdrop-blur-xl">

        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4">

          <button className="hidden border border-white/10 p-3 md:block">
            <Sun size={20} />
          </button>

          <Link to="/" className="text-2xl font-black tracking-tight">
            Pobe's <span className="text-[#ff9d1c]">Vault</span>
          </Link>

          {/* DESKTOP NAV */}
          <nav className="hidden items-center gap-8 md:flex">
            <Link to="/" className="text-xs font-bold uppercase tracking-widest text-[#ff9d1c]">
              Home
            </Link>
            <Link to="/shop" className="text-xs font-bold uppercase tracking-widest hover:text-[#ff9d1c]">
              Shop
            </Link>
            <Link to="/new-arrivals" className="text-xs font-bold uppercase tracking-widest hover:text-[#ff9d1c]">
              New Arrivals
            </Link>
            <Link to="/best-sellers" className="text-xs font-bold uppercase tracking-widest hover:text-[#ff9d1c]">
              Best Sellers
            </Link>
            <Link to="/about" className="text-xs font-bold uppercase tracking-widest hover:text-[#ff9d1c]">
              About
            </Link>
            <Link to="/contact" className="text-xs font-bold uppercase tracking-widest hover:text-[#ff9d1c]">
              Contact
            </Link>
          </nav>

          <div className="flex items-center gap-3">
            <button className="border border-white/10 p-3">
              <Search size={21} />
            </button>

            <button className="relative border border-white/10 p-3">
              <ShoppingBag size={21} />
              <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-[#ff9d1c] text-[10px] font-bold text-black">
                1
              </span>
            </button>

            <button className="border border-white/10 p-3 md:hidden">
              <Menu size={21} />
            </button>
          </div>
        </div>

        {/* SEARCH */}
        <div className="mx-auto max-w-7xl px-5 pb-4">
          <div className="flex items-center gap-3 border border-white/10 bg-[#151212] px-4 py-3">
            <Search size={20} className="text-white/50" />
            <input
              type="text"
              placeholder="Search products, brands or categories..."
              className="w-full bg-transparent text-sm outline-none placeholder:text-white/40"
            />
          </div>
        </div>
      </header>

      {/* HERO */}
      <section className="relative min-h-[650px] overflow-hidden">

        <img
          src="https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=1800&q=85"
          className="absolute inset-0 h-full w-full object-cover"
          alt="Pobe's Vault fashion"
        />

        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/85 to-black/30" />

        <div className="relative mx-auto flex min-h-[650px] max-w-7xl items-center px-5 py-20">
          <div className="max-w-2xl">

            <p className="mb-5 text-sm font-bold uppercase tracking-[0.35em] text-[#ff9d1c]">
              Vendor · Accra · Ghana
            </p>

            <h1 className="text-6xl font-black uppercase leading-[0.82] tracking-tight sm:text-8xl">
              Pobe's
              <br />
              Vault
            </h1>

            <p className="mt-8 max-w-xl text-lg leading-relaxed text-white/65">
              Curated fashion pieces for people who want their
              style to stand out. Clothing, footwear and accessories.
            </p>

            <div className="mt-9 flex flex-wrap gap-4">

              <Link
                to="/shop"
                className="flex items-center gap-3 bg-[#ff9d1c] px-8 py-4 text-sm font-black uppercase tracking-widest text-black transition hover:bg-white"
              >
                Shop Now
                <ArrowRight size={18} />
              </Link>

              <a
                href="https://wa.me/233558763858"
                className="flex items-center gap-3 border border-white/30 px-8 py-4 text-sm font-black uppercase tracking-widest transition hover:border-[#ff9d1c] hover:text-[#ff9d1c]"
              >
                <MessageCircle size={18} />
                WhatsApp
              </a>

            </div>
          </div>
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="mx-auto max-w-7xl px-5 py-20">

        <div className="mb-8 flex items-end justify-between">
          <h2 className="text-4xl font-black uppercase tracking-tight">
            Shop by Category
          </h2>

          <Link
            to="/shop"
            className="hidden items-center gap-2 text-sm font-bold uppercase tracking-widest text-[#ff9d1c] sm:flex"
          >
            View All
            <ArrowRight size={16} />
          </Link>
        </div>

        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {categories.map((category) => (
            <Link
              key={category.name}
              to="/shop"
              className="group relative h-80 overflow-hidden border border-white/10"
            >
              <img
                src={category.image}
                alt={category.name}
                className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />

              <div className="absolute bottom-5 left-5">
                <h3 className="text-2xl font-black">{category.name}</h3>

                <p className="mt-1 text-xs font-bold uppercase tracking-widest text-[#ff9d1c]">
                  Explore Now →
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* NEW ARRIVALS */}
      <section className="border-y border-white/10 bg-[#100e0e]">
        <div className="mx-auto max-w-7xl px-5 py-20">

          <div className="mb-8 flex items-end justify-between">
            <div>
              <p className="mb-2 text-xs font-bold uppercase tracking-[0.3em] text-[#ff9d1c]">
                Fresh In
              </p>

              <h2 className="text-4xl font-black uppercase">
                New Arrivals
              </h2>
            </div>

            <Link
              to="/new-arrivals"
              className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-[#ff9d1c]"
            >
              View All <ArrowRight size={16} />
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {products.map((product) => (
              <div key={product.name} className="group">

                <div className="relative aspect-square overflow-hidden bg-[#181515]">

                  <span className="absolute left-3 top-3 z-10 bg-[#ff9d1c] px-3 py-1 text-[10px] font-black uppercase text-black">
                    New
                  </span>

                  <button className="absolute right-3 top-3 z-10 rounded-full bg-black/50 p-2 backdrop-blur">
                    <Heart size={17} />
                  </button>

                  <img
                    src={product.image}
                    alt={product.name}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  />
                </div>

                <div className="pt-4">
                  <h3 className="text-sm font-bold">{product.name}</h3>
                  <p className="mt-2 font-bold text-[#ff9d1c]">
                    {product.price}
                  </p>
                </div>

              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY US */}
      <section className="mx-auto max-w-7xl px-5 py-16">

        <div className="grid grid-cols-2 gap-px overflow-hidden border border-white/10 bg-white/10 md:grid-cols-4">

          <div className="bg-[#111010] p-7">
            <Truck className="mb-5 text-[#ff9d1c]" />
            <h3 className="font-black uppercase">Fast Delivery</h3>
            <p className="mt-2 text-sm text-white/50">
              Nationwide delivery across Ghana.
            </p>
          </div>

          <div className="bg-[#111010] p-7">
            <ShieldCheck className="mb-5 text-[#ff9d1c]" />
            <h3 className="font-black uppercase">Quality Guarantee</h3>
            <p className="mt-2 text-sm text-white/50">
              Carefully selected products.
            </p>
          </div>

          <div className="bg-[#111010] p-7">
            <LockKeyhole className="mb-5 text-[#ff9d1c]" />
            <h3 className="font-black uppercase">Secure Payment</h3>
            <p className="mt-2 text-sm text-white/50">
              Safe and secure payment methods.
            </p>
          </div>

          <div className="bg-[#111010] p-7">
            <MessageCircle className="mb-5 text-[#ff9d1c]" />
            <h3 className="font-black uppercase">Easy Ordering</h3>
            <p className="mt-2 text-sm text-white/50">
              Order easily through WhatsApp.
            </p>
          </div>

        </div>
      </section>

      {/* BRAND */}
      <section className="border-t border-white/10">
        <div className="mx-auto max-w-7xl px-5 py-24">

          <div className="max-w-2xl">
            <p className="mb-4 text-sm font-bold uppercase tracking-[0.3em] text-[#ff9d1c]">
              About Pobe's Vault
            </p>

            <h2 className="text-5xl font-black uppercase leading-tight">
              More Than
              <br />
              A Store.
            </h2>

            <p className="mt-6 text-lg leading-relaxed text-white/55">
              We bring you carefully selected fashion pieces that
              combine quality, style and confidence.
            </p>

            <Link
              to="/about"
              className="mt-8 inline-flex items-center gap-3 border border-white/20 px-7 py-4 text-sm font-black uppercase tracking-widest hover:border-[#ff9d1c] hover:text-[#ff9d1c]"
            >
              Discover Our Story
              <ArrowRight size={18} />
            </Link>
          </div>

        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-white/10 bg-black">

        <div className="mx-auto grid max-w-7xl gap-12 px-5 py-16 md:grid-cols-4">

          <div>
            <h3 className="text-2xl font-black">
              Pobe's <span className="text-[#ff9d1c]">Vault</span>
            </h3>

            <p className="mt-4 text-sm leading-relaxed text-white/45">
              Carefully selected fashion pieces for your style.
            </p>
          </div>

          <div>
            <h4 className="mb-5 text-xs font-black uppercase tracking-widest">
              Quick Links
            </h4>

            <div className="space-y-3 text-sm text-white/50">
              <Link to="/shop" className="block hover:text-white">Shop</Link>
              <Link to="/new-arrivals" className="block hover:text-white">New Arrivals</Link>
              <Link to="/best-sellers" className="block hover:text-white">Best Sellers</Link>
              <Link to="/about" className="block hover:text-white">About Us</Link>
            </div>
          </div>

          <div>
            <h4 className="mb-5 text-xs font-black uppercase tracking-widest">
              Customer Care
            </h4>

            <div className="space-y-3 text-sm text-white/50">
              <p>FAQs</p>
              <p>Delivery & Returns</p>
              <p>Size Guide</p>
              <p>Contact Us</p>
            </div>
          </div>

          <div>
            <h4 className="mb-5 text-xs font-black uppercase tracking-widest">
              Connect With Us
            </h4>

            <div className="flex gap-3">
              <a className="border border-white/10 p-3 hover:border-[#ff9d1c]">
                <MessageCircle size={18} />
              </a>

              <a className="border border-white/10 p-3 hover:border-[#ff9d1c]">
                <Instagram size={18} />
              </a>
            </div>
          </div>

        </div>

        <div className="border-t border-white/10 px-5 py-6 text-center text-xs text-white/30">
          © 2026 Pobe's Vault. All Rights Reserved.
        </div>
      </footer>

      {/* FLOATING WHATSAPP */}
      <a
        href="https://wa.me/233XXXXXXXXX"
        className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-2xl transition hover:scale-110"
      >
        <MessageCircle size={26} />
      </a>

    </main>
  );
}
