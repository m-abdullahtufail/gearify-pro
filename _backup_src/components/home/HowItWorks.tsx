"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight } from "lucide-react";
import { HOW_IT_WORKS } from "@/lib/data";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";

gsap.registerPlugin(ScrollTrigger);

export function HowItWorks() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    const line = lineRef.current;
    if (!section || !track) return;

    const mm = gsap.matchMedia();

    mm.add("(min-width: 768px) and (prefers-reduced-motion: no-preference)", () => {
      const getDistance = () => track.scrollWidth - window.innerWidth;
      const tween = gsap.to(track, {
        x: () => -getDistance(),
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${getDistance()}`,
          pin: true,
          scrub: 1,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            if (line) line.style.transform = `scaleX(${self.progress})`;
            const idx = Math.min(
              HOW_IT_WORKS.length - 1,
              Math.round(self.progress * (HOW_IT_WORKS.length - 1))
            );
            section.querySelectorAll("[data-step]").forEach((el, i) => {
              el.classList.toggle("is-active", i === idx);
            });
          },
        },
      });

      return () => {
        tween.scrollTrigger?.kill();
        tween.kill();
      };
    });

    return () => mm.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative overflow-hidden bg-ink-950 py-24 md:py-0 md:min-h-screen md:flex md:flex-col md:justify-center">
      <div className="mx-auto w-full max-w-[1440px] px-6 md:px-10">
        <Reveal className="mb-12 md:mb-16">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.3em] text-volt">
                How It Works
              </p>
              <h2 className="font-heading text-[clamp(2rem,4vw,3.5rem)] font-semibold uppercase leading-tight tracking-tight text-ink-100">
                From Idea To Kickoff,
                <br />
                <span className="text-mist-500">In Four Moves.</span>
              </h2>
            </div>
          </div>
        </Reveal>
      </div>

      {/* progress track */}
      <div className="mx-auto mb-8 hidden w-full max-w-[1440px] px-10 md:block">
        <div className="relative h-px w-full bg-[#e0e0e0]">
          <div
            ref={lineRef}
            className="absolute inset-y-0 left-0 w-full origin-left scale-x-0 bg-gradient-to-r from-volt via-frost to-volt"
          />
        </div>
      </div>

      <div className="overflow-hidden">
        <div
          ref={trackRef}
          className="flex w-max flex-col gap-6 px-6 md:flex-row md:items-stretch md:gap-8 md:px-10 md:pb-8"
        >
          {HOW_IT_WORKS.map((step, i) => (
            <Reveal key={step.step} delay={i * 0.08} className="w-full max-w-[560px] md:w-[30rem]">
              <article
                data-step={i}
                className="group relative flex h-full min-h-[300px] flex-col justify-between overflow-hidden rounded-3xl border border-[#2a2a30] bg-[#131316] p-8 transition-all duration-500 md:min-h-[380px] md:border-[#2a2a30]/80"
              >
                <span
                  aria-hidden
                  className="absolute -right-4 -top-6 font-sans text-[7rem] font-bold leading-none text-white/[0.05] transition-colors duration-500 group-[.is-active]:text-volt/10"
                >
                  {step.step}
                </span>
                <div>
                  <span className="inline-flex items-center gap-2 rounded-full border border-[#2a2a30] bg-[#0a0a0b]/70 px-3.5 py-1.5 text-[10px] font-semibold uppercase tracking-[0.22em] text-volt">
                    Step {step.step}
                  </span>
                  <h3 className="mt-6 font-heading text-2xl font-bold tracking-tight text-white md:text-3xl">
                    {step.title}
                  </h3>
                  <p className="mt-3 max-w-sm text-sm leading-relaxed text-mist-400">
                    {step.body}
                  </p>
                </div>
                <div className="mt-8 flex items-center gap-3">
                  <span className="h-px w-10 bg-volt transition-all duration-500 group-[.is-active]:w-16" />
                  <span className="text-[10px] font-semibold uppercase tracking-[0.24em] text-mist-500">
                    0{i + 1} / 04
                  </span>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>

      <Reveal className="mx-auto mt-10 hidden w-full max-w-[1440px] px-10 md:block">
        <div className="flex items-center justify-between border-t border-[#e0e0e0] pt-8">
          <p className="text-xs uppercase tracking-[0.22em] text-mist-500">
            Scroll to move through the process
          </p>
          <Button href="/request-a-quote" variant="gradient" size="md">
            Start Your Order
            <ArrowRight className="size-4" />
          </Button>
        </div>
      </Reveal>
    </section>
  );
}
