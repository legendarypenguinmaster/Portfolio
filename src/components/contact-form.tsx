"use client";

import { useState, type FormEvent } from "react";
import { CheckIcon, Loader2Icon } from "lucide-react";
import { toast } from "sonner";
import { PillButton } from "@/components/brand";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { budgets, projectTypes, validateInquiry, type InquiryErrors } from "@/lib/contact";
import { cn } from "@/lib/utils";

const field =
  "h-14 rounded-full border-white/10 bg-white/6 px-7 text-base text-white placeholder:text-neutral-500 md:text-base focus-visible:border-brand focus-visible:ring-brand/20";

function FieldError({ message, id }: { message?: string; id: string }) {
  if (!message) return null;
  return (
    <p id={id} className="px-6 text-sm text-red-400">
      {message}
    </p>
  );
}

export function ContactForm() {
  const [errors, setErrors] = useState<InquiryErrors>({});
  const [pending, setPending] = useState(false);
  const [sent, setSent] = useState(false);
  const [projectType, setProjectType] = useState("");
  const [budget, setBudget] = useState("");

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = {
      ...Object.fromEntries(new FormData(form).entries()),
      projectType,
      budget,
    };

    const { errors: problems } = validateInquiry(data);
    setErrors(problems);
    if (Object.keys(problems).length) return;

    setPending(true);
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(data),
      });
      const payload = await response.json().catch(() => ({}));

      if (!response.ok || !payload.ok) {
        const serverErrors: InquiryErrors = payload.errors ?? {
          form: "We couldn't send your message. Try again in a moment.",
        };
        setErrors(serverErrors);
        if (serverErrors.form) toast.error(serverErrors.form);
        return;
      }

      form.reset();
      setProjectType("");
      setBudget("");
      setSent(true);
      toast.success("Message sent. We'll be in touch soon.");
    } catch {
      toast.error("We couldn't reach the server. Check your connection and try again.");
    } finally {
      setPending(false);
    }
  }

  if (sent) {
    return (
      <div className="mt-8 flex flex-col items-start gap-5 rounded-3xl border border-white/10 bg-white/5 p-8" role="status">
        <span className="flex size-14 items-center justify-center rounded-full bg-brand text-ink-900">
          <CheckIcon className="size-7" />
        </span>
        <h4 className="font-heading text-2xl font-medium text-white">Thanks — we&apos;ve got your message</h4>
        <p className="text-neutral-400">We&apos;ll reply to the email you provided within one business day.</p>
        <button
          type="button"
          onClick={() => setSent(false)}
          className="text-brand underline underline-offset-4 hover:text-white"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="mt-8 grid gap-5">
      <div className="hidden" aria-hidden="true">
        <label htmlFor="company_website">Company website</label>
        <input id="company_website" name="company_website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div className="grid gap-2">
          <Label htmlFor="name" className="sr-only">Your name</Label>
          <Input
            id="name"
            name="name"
            autoComplete="name"
            maxLength={80}
            placeholder="Your Name *"
            className={field}
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? "name-error" : undefined}
          />
          <FieldError id="name-error" message={errors.name} />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="email" className="sr-only">Work email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            maxLength={120}
            placeholder="Work E-Mail *"
            className={field}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? "email-error" : undefined}
          />
          <FieldError id="email-error" message={errors.email} />
        </div>
      </div>

      <div className="grid gap-2">
        <Label htmlFor="company" className="sr-only">Company (optional)</Label>
        <Input
          id="company"
          name="company"
          autoComplete="organization"
          maxLength={120}
          placeholder="Company"
          className={field}
        />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div className="grid gap-2">
          <Label htmlFor="projectType" className="sr-only">Project type</Label>
          <Select value={projectType} onValueChange={setProjectType}>
            <SelectTrigger
              id="projectType"
              className={cn(field, "h-14! w-full data-placeholder:text-neutral-500 [&_svg]:text-brand")}
              aria-invalid={Boolean(errors.projectType)}
              aria-describedby={errors.projectType ? "projectType-error" : undefined}
            >
              <SelectValue placeholder="Project Type *" />
            </SelectTrigger>
            <SelectContent>
              {Object.entries(projectTypes).map(([value, label]) => (
                <SelectItem key={value} value={value}>
                  {label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <FieldError id="projectType-error" message={errors.projectType} />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="budget" className="sr-only">Budget (optional)</Label>
          <Select value={budget} onValueChange={setBudget}>
            <SelectTrigger
              id="budget"
              className={cn(field, "h-14! w-full data-placeholder:text-neutral-500 [&_svg]:text-brand")}
            >
              <SelectValue placeholder="Budget" />
            </SelectTrigger>
            <SelectContent>
              {Object.entries(budgets).map(([value, label]) => (
                <SelectItem key={value} value={value}>
                  {label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid gap-2">
        <Label htmlFor="message" className="sr-only">Project details</Label>
        <Textarea
          id="message"
          name="message"
          rows={6}
          maxLength={2000}
          placeholder="Tell us about your project *"
          className={cn(field, "h-auto min-h-44 rounded-[28px] py-5")}
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? "message-error" : undefined}
        />
        <FieldError id="message-error" message={errors.message} />
      </div>

      <FieldError id="form-error" message={errors.form} />

      <div className="flex flex-wrap items-center gap-6 pt-2">
        <PillButton type="submit" disabled={pending}>
          {pending ? (
            <span className="inline-flex items-center gap-2">
              <Loader2Icon className="size-4 animate-spin" />
              Sending…
            </span>
          ) : (
            "Send Message"
          )}
        </PillButton>
        <p className="text-sm text-neutral-500">We only use your details to reply.</p>
      </div>
    </form>
  );
}
