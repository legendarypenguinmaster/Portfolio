import { ContactForm } from "@/components/contact-form";
import { Eyebrow, Silk } from "@/components/brand";
import { Reveal } from "@/components/reveal";
import { site } from "@/lib/site";

export function Contact() {
  return (
    <section id="contact" className="grid lg:grid-cols-2">
      <div className="relative isolate overflow-hidden bg-brand px-5 py-24 sm:px-8 lg:py-32 lg:pl-[max(2rem,calc((100vw-1400px)/2+2rem))]">
        <Silk className="-z-10 opacity-40 mix-blend-soft-light" />
        <div
          aria-hidden="true"
          className="absolute -bottom-24 -left-24 -z-10 size-96 rounded-full bg-[radial-gradient(closest-side,rgba(180,140,20,0.45),transparent)]"
        />
        <Reveal className="max-w-xl">
          <Eyebrow className="text-ink-900 [&_svg]:text-ink-900">Contact Us</Eyebrow>
          <h2 className="mt-4 font-heading text-4xl leading-[1.2] font-medium tracking-tight text-ink-900/80 sm:text-[44px]">
            Have a project in mind? Let&apos;s build it together
          </h2>
          <p className="mt-8 max-w-md leading-relaxed text-ink-900/80">
            Tell us what you&apos;re building. A studio lead will reply with next steps and an honest
            view of how we can help.
          </p>
          <ul className="mt-10 space-y-3 text-ink-900">
            {["Reply within one business day", "Free discovery call", "Written proposal with scope & cost"].map(
              (item) => (
                <li key={item} className="flex items-center gap-3 font-medium">
                  <span className="size-2 rounded-full bg-ink-900" />
                  {item}
                </li>
              ),
            )}
          </ul>
          <a
            href={`mailto:${site.email}`}
            className="mt-12 inline-block font-heading text-2xl font-medium text-ink-900 underline decoration-ink-900/30 underline-offset-8 transition-colors hover:decoration-ink-900 sm:text-3xl"
          >
            {site.email}
          </a>
        </Reveal>
      </div>

      <div className="relative isolate overflow-hidden bg-ink-950 px-5 py-24 sm:px-8 lg:py-32 lg:pr-[max(2rem,calc((100vw-1400px)/2+2rem))] lg:pl-24">
        <Silk className="-z-10 opacity-50" />
        <Reveal delay={100} className="max-w-xl">
          <h3 className="font-heading text-2xl font-semibold text-white">Tell us about your project</h3>
          <ContactForm />
        </Reveal>
      </div>
    </section>
  );
}
