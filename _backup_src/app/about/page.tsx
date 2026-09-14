import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { PageShell, QuoteBand, SectionHeading, StatGrid } from "@/components/pages/PageShell";

export default function AboutPage() {
  return <PageShell eyebrow="About Gearify Pro" title={<>Sportswear with<br /><span className="text-mist-500">a point of view.</span></>} intro="We make custom teamwear for people who care how it performs — and how it feels when the whole squad walks out together.">
    <StatGrid stats={[{ value: "500+", label: "Teams outfitted" }, { value: "48h", label: "Design turnaround" }, { value: "40+", label: "Countries shipped" }, { value: "99%", label: "On-time delivery" }]} />
    <div className="mt-24 grid gap-12 lg:grid-cols-2"><div><SectionHeading eyebrow="Our belief" title="The kit is part of the game." /><p className="text-base leading-relaxed text-mist-300">A uniform does more than identify a team. It changes how players carry themselves, how opponents read the room, and how a group becomes a unit. That is why we treat every kit like equipment: considered, tested, and made to earn its place.</p></div><div className="rounded-[2rem] border border-white/[0.08] bg-[#131316] p-8 md:p-10"><p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-volt">What we bring</p><div className="mt-8 space-y-5">{["Performance-first materials", "Clear, collaborative design", "Production that respects the brief", "A partner for the next season too"].map((item) => <div key={item} className="flex items-center justify-between border-b border-white/[0.08] pb-4 text-sm text-mist-300"><span>{item}</span><ArrowUpRight className="size-4 text-volt" /></div>)}</div></div></div>
    <div className="mt-24 rounded-[2rem] bg-[#f0f0eb] p-8 text-[#0a0a0b] md:p-14"><p className="text-[11px] font-bold uppercase tracking-[0.25em] opacity-50">The next move</p><h2 className="mt-4 max-w-2xl font-heading text-4xl font-bold uppercase leading-tight md:text-6xl">Bring us the ambition. We’ll bring the kit.</h2><Link href="/contact" className="mt-8 inline-flex items-center gap-2 text-sm font-bold uppercase tracking-[0.16em]">Talk to the team <ArrowUpRight className="size-4" /></Link></div>
    <QuoteBand />
  </PageShell>;
}
