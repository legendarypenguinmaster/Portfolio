import { PillButton, SectionTitle } from "@/components/brand";
import { Reveal } from "@/components/reveal";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "What kinds of projects do you take on?",
    answer:
      "New products and MVPs, web applications, features inside existing products, API integrations, and ongoing maintenance. If it runs on the web, we can likely help.",
  },
  {
    question: "How do you price projects?",
    answer:
      "Well-defined work is quoted as a fixed price per milestone. Evolving products usually work best with a dedicated team on a monthly basis. We recommend the model that fits after a short discovery call.",
  },
  {
    question: "How will we communicate during the project?",
    answer:
      "You get a shared project board, a weekly demo, and a direct channel with the team building your product. You will always know what shipped and what is next.",
  },
  {
    question: "Who owns the code?",
    answer:
      "You do. All code lives in your repositories and is handed over with documentation, so your team or any other team can continue the work.",
  },
  {
    question: "Can you work with our existing codebase?",
    answer:
      "Yes. We start with a short code review to understand the architecture, then follow your conventions, workflows, and release process.",
  },
  {
    question: "Do you support projects after launch?",
    answer:
      "Yes. Our support and maintenance plans cover fixes, upgrades, monitoring, and new features as your product grows.",
  },
];

export function Faq() {
  return (
    <section id="faq" className="bg-ink-900 py-24 lg:py-32">
      <div className="mx-auto grid max-w-[1400px] gap-14 px-5 sm:px-8 lg:grid-cols-[1fr_1.4fr] lg:gap-20">
        <div className="lg:sticky lg:top-32 lg:self-start">
          <SectionTitle eyebrow="FAQ" title="Answers to the questions clients ask most" />
          <Reveal delay={100}>
            <p className="mt-6 max-w-md leading-relaxed text-neutral-400">
              Can&apos;t find what you&apos;re looking for? Send us a note and a studio lead will
              get back to you.
            </p>
            <PillButton href="#contact" size="md" className="mt-10">
              Ask a Question
            </PillButton>
          </Reveal>
        </div>

        <Reveal>
          <Accordion type="single" collapsible defaultValue="item-0" className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={faq.question}
                value={`item-${index}`}
                className="rounded-3xl border border-white/10 bg-ink-800 px-7 transition-colors last:border-b data-[state=open]:border-brand/60"
              >
                <AccordionTrigger className="py-6 font-heading text-lg font-medium text-white hover:no-underline data-[state=open]:text-brand [&>svg]:text-brand">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="pb-6 text-base leading-relaxed text-neutral-400">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Reveal>
      </div>
    </section>
  );
}
