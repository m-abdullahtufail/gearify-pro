import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Reveal, RevealStagger, RevealItem } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";

export function PageShell({
  eyebrow,
  title,
  intro,
  children,
}: {
  eyebrow: string;
  title: React.ReactNode;
  intro?: string;
  children: React.ReactNode;
}) {
  return (
    <main className="min-h-screen bg-ink-950 pb-24 pt-32 md:pt-40">
      <div className="mx-auto max-w-[1440px] px-6 md:px-10">
        <Reveal className="max-w-4xl">
          <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.3em] text-volt">{eyebrow}</p>
          <h1 className="font-heading text-[clamp(2.8rem,7vw,7rem)] font-semibold uppercase leading-[0.94] tracking-[-0.04em] text-ink-100">{title}</h1>
          {intro && <p className="mt-7 max-w-2xl text-base leading-relaxed text-mist-400 md:text-lg">{intro}</p>}
        </Reveal>
        <div className="mt-20">{children}</div>
      </div>
    </main>
  );
}

export function SectionHeading({ eyebrow, title, body }: { eyebrow?: string; title: React.ReactNode; body?: string }) {
  return (
    <Reveal className="mb-10 max-w-2xl">
      {eyebrow && <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.3em] text-volt">{eyebrow}</p>}
      <h2 className="font-heading text-3xl font-semibold uppercase leading-tight tracking-tight text-white md:text-5xl">{title}</h2>
      {body && <p className="mt-4 text-sm leading-relaxed text-mist-400 md:text-base">{body}</p>}
    </Reveal>
  );
}

export function LinkCard({ title, body, href, accent = "volt" }: { title: string; body: string; href: string; accent?: "volt" | "frost" }) {
  return (
    <Link href={href} className="group rounded-3xl border border-white/[0.08] bg-[#131316] p-7 transition-all duration-500 hover:-translate-y-1 hover:border-white/20">
      <span className={`mb-8 block size-2 rounded-full ${accent === "frost" ? "bg-frost" : "bg-volt"}`} />
      <h3 className="font-heading text-xl font-bold uppercase text-white">{title}</h3>
      <p className="mt-3 text-sm leading-relaxed text-mist-400">{body}</p>
      <span className="mt-8 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-volt">Explore <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-1" /></span>
    </Link>
  );
}

export function StatGrid({ stats }: { stats: { value: string; label: string }[] }) {
  return (
    <RevealStagger className="grid grid-cols-2 gap-3 md:grid-cols-4">
      {stats.map((stat) => (
        <RevealItem key={stat.label} className="rounded-3xl border border-white/[0.08] bg-[#131316] p-6 md:p-8">
          <p className="font-heading text-4xl font-bold text-white md:text-5xl">{stat.value}</p>
          <p className="mt-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-mist-500">{stat.label}</p>
        </RevealItem>
      ))}
    </RevealStagger>
  );
}

export function QuoteBand() {
  return (
    <section className="mt-24 overflow-hidden rounded-[2rem] border border-volt/20 bg-volt p-8 text-black md:p-14">
      <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-end">
        <div>
          <p className="text-[11px] font-bold uppercase tracking-[0.25em] opacity-60">Gearify Pro</p>
          <h2 className="mt-3 max-w-xl font-heading text-3xl font-bold uppercase leading-tight md:text-5xl">Ready to kit out your team?</h2>
        </div>
        <Button href="/request-a-quote" variant="ghost" size="lg" className="!border-black/20 !bg-black !text-white">Request a quote</Button>
      </div>
    </section>
  );
}
