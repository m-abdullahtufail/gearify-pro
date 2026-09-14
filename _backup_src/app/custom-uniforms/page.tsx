import { Check, Palette, Shirt, Sparkles, Truck } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { PageShell, QuoteBand, SectionHeading } from "@/components/pages/PageShell";
import { RevealStagger, RevealItem } from "@/components/ui/Reveal";

const STEPS = [
  [Palette, "Set the direction", "Choose your sport, colors, fit, and the details that make the kit unmistakably yours."],
  [Shirt, "Build the system", "We turn your brief into match kits, training layers, travel wear, and sideline pieces."],
  [Sparkles, "Approve the details", "Review a clear digital spec with names, numbers, crests, and a complete size run."],
  [Truck, "Kit out the squad", "Your finished order goes through production and quality control before it ships to your team."],
] as const;

export default function CustomUniformsPage() {
  return <PageShell eyebrow="Custom teamwear" title={<>Your colors.<br /><span className="text-mist-500">Our craft.</span></>} intro="Custom uniforms without the compromise. Gearify Pro helps clubs, schools, academies, and brands turn a team identity into equipment players want to wear.">
    <div className="grid gap-4 md:grid-cols-2">{STEPS.map(([Icon, title, body], i) => <RevealStagger key={title} className="rounded-3xl border border-white/[0.08] bg-[#131316] p-8"><RevealItem><span className="flex items-center justify-between"><Icon className="size-7 text-volt" /><span className="text-xs font-semibold text-mist-500">0{i + 1}</span></span><h2 className="mt-14 font-heading text-2xl font-bold uppercase text-white">{title}</h2><p className="mt-3 text-sm leading-relaxed text-mist-400">{body}</p></RevealItem></RevealStagger>)}</div>
    <div className="mt-24 grid gap-12 lg:grid-cols-2 lg:items-center"><div><SectionHeading eyebrow="The Gearify standard" title="Designed to perform. Finished to belong." body="From the first sketch to the final seam, every choice is made around movement, durability, and the way your team wants to show up." /><ul className="space-y-4 text-sm text-mist-300">{["Sublimation and embroidery options", "Full size runs with pre-production checks", "Low-friction reorders for returning teams", "One point of contact from brief to delivery"].map((item) => <li key={item} className="flex gap-3"><Check className="size-4 text-volt" />{item}</li>)}</ul></div><div className="rounded-[2rem] border border-volt/20 bg-gradient-to-br from-volt/20 via-[#131316] to-[#131316] p-10"><p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-volt">Built for the whole season</p><p className="mt-6 font-heading text-4xl font-bold uppercase leading-tight text-white">One identity.<br />Every layer.</p><Button href="/request-a-quote" className="mt-10">Start your kit</Button></div></div>
    <QuoteBand />
  </PageShell>;
}
