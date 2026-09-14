import { SPORTS } from "@/lib/data";
import { LinkCard, PageShell, QuoteBand, SectionHeading } from "@/components/pages/PageShell";

export default function SportsPage() {
  return (
    <PageShell eyebrow="Choose your arena" title={<>Built for the sport.<br /><span className="text-mist-500">Ready for yours.</span></>} intro="Performance teamwear designed around the movement, intensity, and identity of every game. Pick your discipline and start building.">
      <SectionHeading eyebrow="The roster" title="One standard: game ready." />
      <div className="grid gap-4 md:grid-cols-3">
        {SPORTS.filter((sport) => sport.href.startsWith("/sports/")).map((sport, i) => <LinkCard key={sport.slug} title={sport.name} body={sport.blurb} href={sport.href} accent={i % 2 ? "frost" : "volt"} />)}
      </div>
      <QuoteBand />
    </PageShell>
  );
}
