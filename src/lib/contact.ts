export const projectTypes = {
  "new-product": "New product or MVP",
  "web-app": "Web application",
  feature: "Feature for an existing product",
  integration: "API or integration",
  support: "Maintenance and support",
  other: "Something else",
} as const;

export const budgets = {
  "under-10k": "Under $10k",
  "10-25k": "$10k – $25k",
  "25-50k": "$25k – $50k",
  "50k-plus": "$50k+",
  unsure: "Not sure yet",
} as const;

export type ProjectType = keyof typeof projectTypes;
export type Budget = keyof typeof budgets;

export type Inquiry = {
  name: string;
  email: string;
  company: string;
  projectType: ProjectType;
  budget: Budget | "";
  message: string;
};

export type InquiryField = keyof Inquiry | "form";
export type InquiryErrors = Partial<Record<InquiryField, string>>;

function clean(value: unknown, max: number) {
  return String(value ?? "")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, max);
}

export function validateInquiry(body: Record<string, unknown>) {
  const projectType = clean(body.projectType, 40);
  const budget = clean(body.budget, 40);
  const inquiry: Inquiry = {
    name: clean(body.name, 80),
    email: clean(body.email, 120).toLowerCase(),
    company: clean(body.company, 120),
    projectType: projectType as ProjectType,
    budget: budget in budgets ? (budget as Budget) : "",
    message: clean(body.message, 2000),
  };
  const errors: InquiryErrors = {};

  if (inquiry.name.length < 2) errors.name = "Enter your name.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(inquiry.email)) {
    errors.email = "Enter a valid email address.";
  }
  if (!(projectType in projectTypes)) errors.projectType = "Choose a project type.";
  if (inquiry.message.length < 10) {
    errors.message = "Add a few sentences about the project.";
  }

  return { inquiry, errors };
}
