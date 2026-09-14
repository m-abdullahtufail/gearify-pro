import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Check, Ruler } from "lucide-react";
import { PRODUCTS } from "@/lib/data";
import { PageShell, QuoteBand, SectionHeading } from "@/components/pages/PageShell";
import { Button } from "@/components/ui/Button";

const CATEGORY_SLUGS: Record<string, string> = { jerseys: "Jerseys", "cricket-uniforms": "Cricket Uniforms", "track-suits": "Track Suits", hoodies: "Hoodies", "duffel-bags": "Duffel Bags" };
export function generateStaticParams() { return [...PRODUCTS.map((p) => ({ slug: p.id })), ...Object.keys(CATEGORY_SLUGS).map((slug) => ({ slug }))]; }

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = PRODUCTS.find((item) => item.id === slug);
  if (!product && CATEGORY_SLUGS[slug]) return <CategoryPage category={CATEGORY_SLUGS[slug]} />;
  if (!product) notFound();
  const related = PRODUCTS.filter((item) => item.category === product.category && item.id !== product.id).slice(0, 3);
  return (
    <PageShell eyebrow={`${product.category} / ${product.sport}`} title={<>{product.name}<br /><span className="text-mist-500">Made for more.</span></>} intro={product.description}>
      <div className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr]">
        <div className="relative aspect-square overflow-hidden rounded-[2rem] border border-white/[0.08] bg-[#131316]"><Image src={product.image} alt={product.name} fill priority sizes="(max-width: 1024px) 100vw, 60vw" className="object-cover" /></div>
        <div className="flex flex-col rounded-[2rem] border border-white/[0.08] bg-[#131316] p-8 md:p-10">
          <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-volt"><span className="size-2 rounded-full" style={{ backgroundColor: product.color }} />{product.tag ?? "Performance range"}</div>
          <p className="mt-7 font-heading text-4xl font-bold text-white">${product.price}<span className="ml-2 text-xs font-normal uppercase tracking-[0.18em] text-mist-500">per unit</span></p>
          <div className="my-8 border-y border-white/[0.08] py-6"><p className="mb-3 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-mist-500"><Ruler className="size-4" /> Available sizes</p><div className="flex flex-wrap gap-2">{product.sizes.map((size) => <span key={size} className="rounded-full border border-white/10 px-4 py-2 text-xs text-mist-300">{size}</span>)}</div></div>
          <ul className="space-y-3 text-sm text-mist-300"><li className="flex gap-3"><Check className="size-4 shrink-0 text-volt" /> Team customization available</li><li className="flex gap-3"><Check className="size-4 shrink-0 text-volt" /> Built for repeat match-day wear</li><li className="flex gap-3"><Check className="size-4 shrink-0 text-volt" /> Fixed quote before production</li></ul>
          <div className="mt-auto flex flex-wrap gap-3 pt-10"><Button href="/request-a-quote" size="lg">Customize this kit</Button><Button href="/shop" variant="ghost" size="lg"><ArrowLeft className="size-4" /> Back to shop</Button></div>
        </div>
      </div>
      {related.length > 0 && <><SectionHeading eyebrow="You may also like" title="More from the range" /><div className="grid gap-4 md:grid-cols-3">{related.map((item) => <Link href={item.href} key={item.id} className="rounded-3xl border border-white/[0.08] bg-[#131316] p-5 transition hover:border-white/20"><div className="relative aspect-[4/3] overflow-hidden rounded-2xl"><Image src={item.image} alt={item.name} fill sizes="33vw" className="object-cover" /></div><h3 className="mt-4 font-heading text-lg font-bold text-white">{item.name}</h3><p className="mt-1 text-xs text-mist-500">From ${item.price}</p></Link>)}</div></>}
      <QuoteBand />
    </PageShell>
  );
}

function CategoryPage({ category }: { category: string }) {
  const products = PRODUCTS.filter((product) => product.category === category);
  return <PageShell eyebrow="Shop by category" title={<>{category}<br /><span className="text-mist-500">Ready for the team.</span></>} intro={`Explore the ${category.toLowerCase()} range from Gearify Pro. Built for performance, ready for your identity.`}><SectionHeading eyebrow={`${products.length} products`} title="Choose your starting point" /><div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{products.map((product) => <Link href={product.href} key={product.id} className="group rounded-3xl border border-white/[0.08] bg-[#131316] p-4"><div className="relative aspect-square overflow-hidden rounded-2xl"><Image src={product.image} alt={product.name} fill sizes="25vw" className="object-cover transition-transform duration-700 group-hover:scale-105" /></div><h3 className="mt-4 font-heading font-bold text-white">{product.name}</h3><p className="mt-1 text-xs text-mist-500">From ${product.price}</p></Link>)}</div><QuoteBand /></PageShell>;
}
