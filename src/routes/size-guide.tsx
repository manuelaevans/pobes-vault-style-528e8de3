import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/page";
import { waLink } from "@/lib/cart";

export const Route = createFileRoute("/size-guide")({
  head: () => ({
    meta: [
      { title: "Size Guide — Pobe's Vault" },
      {
        name: "description",
        content: "Measurements for shirts, trousers, jeans, shorts and shoes to help you order the right size from Pobe's Vault.",
      },
      { property: "og:title", content: "Size Guide — Pobe's Vault" },
      { property: "og:description", content: "Find your fit before you order." },
    ],
  }),
  component: SizeGuide,
});

const TABLES: { title: string; head: string[]; rows: string[][] }[] = [
  {
    title: "Shirts & T-Shirts",
    head: ["Size", "Chest (in)", "Length (in)", "Shoulder (in)"],
    rows: [
      ["S", "36–38", "27", "17"],
      ["M", "38–40", "28", "18"],
      ["L", "40–42", "29", "19"],
      ["XL", "42–44", "30", "20"],
      ["XXL", "44–46", "31", "21"],
    ],
  },
  {
    title: "Trousers & Jeans",
    head: ["Size", "Waist (in)", "Hip (in)", "Inseam (in)"],
    rows: [
      ["30", "30", "38", "30"],
      ["32", "32", "40", "31"],
      ["34", "34", "42", "31"],
      ["36", "36", "44", "32"],
      ["38", "38", "46", "32"],
    ],
  },
  {
    title: "Shorts",
    head: ["Size", "Waist (in)", "Length (in)"],
    rows: [
      ["S", "28–30", "18"],
      ["M", "31–33", "19"],
      ["L", "34–36", "20"],
      ["XL", "37–39", "21"],
    ],
  },
  {
    title: "Shoes",
    head: ["EU", "UK", "US", "Foot length (cm)"],
    rows: [
      ["39", "6", "7", "24.5"],
      ["40", "6.5", "7.5", "25"],
      ["41", "7.5", "8.5", "26"],
      ["42", "8", "9", "26.5"],
      ["43", "9", "10", "27.5"],
      ["44", "9.5", "10.5", "28"],
      ["45", "10.5", "11.5", "29"],
    ],
  },
];

function SizeGuide() {
  return (
    <>
      <PageHeader
        eyebrow="Fit"
        title="Size Guide"
        subtitle="Standard measurements as a guide. Exact measurements for a specific piece can be confirmed on WhatsApp before you order."
      />
      <div className="mx-auto max-w-4xl space-y-10 px-4 py-12">
        {TABLES.map((t) => (
          <section key={t.title}>
            <h2 className="font-display text-xl">{t.title}</h2>
            <div className="mt-3 overflow-x-auto rounded-sm border border-border">
              <table className="w-full text-sm">
                <thead className="bg-card">
                  <tr>
                    {t.head.map((h) => (
                      <th key={h} className="label-xs px-3 py-2 text-left text-muted-foreground">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {t.rows.map((r) => (
                    <tr key={r.join()} className="border-t border-border">
                      {r.map((c) => (
                        <td key={c} className="px-3 py-2">
                          {c}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        ))}
        <div className="rounded-sm border border-gold/40 bg-card p-5 text-sm">
          Not sure about your size?{" "}
          <a
            href={waLink("Hi Pobe's Vault, please help me choose a size.")}
            target="_blank"
            rel="noreferrer"
            className="text-gold"
          >
            Contact Pobe's Vault on WhatsApp
          </a>{" "}
          and we'll help you choose.
        </div>
      </div>
    </>
  );
}
