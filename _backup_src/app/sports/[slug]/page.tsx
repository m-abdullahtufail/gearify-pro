import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { SPORTS, PRODUCTS } from "@/lib/data";
import { PageShell, QuoteBand, SectionHeading } from "@/components/pages/PageShell";
import { Button } from "@/components/ui/Button";

export function generateStaticParams() { return SPORTS.filter((s) => s.href.startsWith("/sports/")).map((sport) => ({ slug: sport.slug })); }

export default async function SportPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const sport = SPORTS.find((item) => item.slug === slug && item.href.startsWith("/sports/"));
  if (!sport) notFound();
  const products = PRODUCTS.filter((product) => product.sport.toLowerCase() === sport.name.toLowerCase());
  return (
    <PageShell eyebrow={`${sport.name} / Gearify Pro`} title={<>{sport.name}<br /><span className="text-mist-500">Built to move.</span></>} intro={sport.tagline}>
      <div className="grid gap-12 lg:grid-cols-[1fr_1.5fr] lg:items-start">
        <div className="rounded-[2rem] border border-white/[0.08] bg-[#131316] p-8 md:p-10">
          <span className="mb-10 block size-3 rounded-full" style={{ backgroundColor: sport.color }} />
          <p className="text-lg leading-relaxed text-mist-300">{sport.blurb}</p>
          <div className="mt-10 flex flex-wrap gap-3"><Button href="/request-a-quote">Build my team kit</Button><Button href="/shop" variant="ghost">Shop all gear</Button></div>
        </div>
        <div>
          <SectionHeading eyebrow={`${products.length} products`} title="The starting lineup" />
          <div className="grid gap-3 sm:grid-cols-2">
            {products.map((product) => <a key={product.id} href={product.href} className="group overflow-hidden rounded-3xl border border-white/[0.08] bg-[#131316]">
              <div className="relative aspect-[4/3]"><Image src={product.image} alt={product.name} fill sizes="(max-width: 640px) 100vw, 50vw" className="object-cover transition-transform duration-700 group-hover:scale-105" /></div>
              <div className="flex items-center justify-between p-5"><div><h3 className="font-heading text-lg font-bold text-white">{product.name}</h3><p className="mt-1 text-[10px] uppercase tracking-[0.18em] text-mist-500">From ${product.price}</p></div><ArrowRight className="size-4 text-volt transition-transform group-hover:translate-x-1" /></div>
            </a>)}
          </div>
        </div>
      </div>
      <QuoteBand />
    </PageShell>
  );
}
