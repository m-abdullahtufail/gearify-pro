"use client";

import { FormEvent, useState } from "react";
import { Check, Send } from "lucide-react";
import { PageShell } from "@/components/pages/PageShell";
import { Button } from "@/components/ui/Button";

export default function RequestAQuotePage() {
  const [sent, setSent] = useState(false);
  function submit(event: FormEvent<HTMLFormElement>) { event.preventDefault(); setSent(true); }
  return <PageShell eyebrow="Start a project" title={<>Your next kit<br /><span className="text-mist-500">starts here.</span></>} intro="Tell us what you’re building. We’ll come back with practical next steps, a clear timeline, and a quote made for your team.">
    {sent ? <div className="mx-auto max-w-2xl rounded-[2rem] border border-volt/30 bg-volt/10 p-10 text-center md:p-16"><span className="mx-auto grid size-14 place-items-center rounded-full bg-volt text-black"><Check /></span><h2 className="mt-7 font-heading text-4xl font-bold uppercase text-white">Brief received.</h2><p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-mist-300">Thanks for reaching out. The Gearify Pro team will review your details and get back to you within one business day.</p></div> : <form onSubmit={submit} className="grid gap-5 rounded-[2rem] border border-white/[0.08] bg-[#131316] p-6 md:grid-cols-2 md:p-10"><Field label="Your name" name="name" required /><Field label="Team / organization" name="team" required /><Field label="Email address" name="email" type="email" required /><Field label="Sport" name="sport" placeholder="e.g. Soccer, cricket, basketball" required /><Field label="Estimated team size" name="size" placeholder="e.g. 18 players" /><Field label="Target delivery date" name="date" type="date" /><label className="md:col-span-2"><span className="mb-2 block text-[10px] font-semibold uppercase tracking-[0.2em] text-mist-500">Tell us about the kit</span><textarea name="message" rows={6} required placeholder="Colors, pieces, customization, quantities — give us the starting brief." className="w-full resize-y rounded-2xl border border-white/[0.1] bg-[#0a0a0b] px-4 py-4 text-sm text-white outline-none transition placeholder:text-mist-600 focus:border-volt" /></label><div className="flex flex-col items-start justify-between gap-5 pt-3 md:col-span-2 md:flex-row md:items-center"><p className="max-w-md text-xs leading-relaxed text-mist-500">No commitment required. We’ll use these details only to prepare your teamwear recommendation.</p><Button type="submit" size="lg">Send my brief <Send className="size-4" /></Button></div></form>}
  </PageShell>;
}

function Field({ label, name, type = "text", placeholder, required }: { label: string; name: string; type?: string; placeholder?: string; required?: boolean }) {
  return <label><span className="mb-2 block text-[10px] font-semibold uppercase tracking-[0.2em] text-mist-500">{label}</span><input name={name} type={type} placeholder={placeholder} required={required} className="h-12 w-full rounded-2xl border border-white/[0.1] bg-[#0a0a0b] px-4 text-sm text-white outline-none transition placeholder:text-mist-600 focus:border-volt" /></label>;
}
