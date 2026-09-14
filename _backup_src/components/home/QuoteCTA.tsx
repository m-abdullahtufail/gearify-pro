"use client";


import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { KineticHeadline } from "./KineticHeadline";

export function QuoteCTA() {
  return (
    <section className="relative overflow-hidden bg-ink-950 py-28 md:py-40">
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(46% 55% at 50% 100%, rgb(227 6 19 / 0.14) 0%, transparent 70%), radial-gradient(30% 40% at 20% 20%, rgb(255 90 99 / 0.06) 0%, transparent 70%)",
        }}
      />
      <div className="grid-bg absolute inset-0 opacity-30 [mask-image:radial-gradient(60%_60%_at_50%_50%,black,transparent)]" />

      <Reveal className="relative z-10 mx-auto flex max-w-4xl flex-col items-center px-6 text-center">
        <p className="mb-6 text-[11px] font-semibold uppercase tracking-[0.3em] text-volt">
          Request a Quote
        </p>

        <KineticHeadline
          as="h2"
          text="YOUR TEAM. YOUR COLORS. YOUR GAME."
          delay={0.15}
          className="font-heading text-[clamp(2.3rem,5.5vw,4.6rem)] font-bold uppercase leading-[1.02] tracking-tight text-ink-100"
        />

        <p className="mt-8 max-w-xl text-base leading-relaxed text-mist-400 md:text-lg">
          Tell us your sport, your numbers, and your deadline. A kit
          specialist will send a spec sheet and fixed quote — usually
          within 48 hours.
        </p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <Button href="/request-a-quote" size="lg">
            Request a Quote
          </Button>
          <Button href="/contact" variant="ghost" size="lg">
            Talk to Us
          </Button>
        </div>

        <p className="mt-10 text-[11px] uppercase tracking-[0.24em] text-mist-500">
          No minimums on team orders · Fixed quotes · 48h turnaround
        </p>
      </Reveal>
    </section>
  );
}
