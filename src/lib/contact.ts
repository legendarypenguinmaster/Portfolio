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

export const contactRoles = {
  client: "Client",
  partner: "Partner",
} as const;

export type ProjectType = keyof typeof projectTypes;
export type Budget = keyof typeof budgets;
export type ContactRole = keyof typeof contactRoles;

export type Inquiry = {
  role: ContactRole;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  company: string;
  projectType: ProjectType | "";
  budget: Budget | "";
  region: string;
  platforms: string;
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
  const role = clean(body.role, 20);
  const projectType = clean(body.projectType, 40);
  const budget = clean(body.budget, 40);
  const inquiry: Inquiry = {
    role: role in contactRoles ? (role as ContactRole) : "client",
    firstName: clean(body.firstName, 40),
    lastName: clean(body.lastName, 40),
    email: clean(body.email, 120).toLowerCase(),
    phone: clean(body.phone, 40),
    company: clean(body.company, 120),
    projectType: projectType in projectTypes ? (projectType as ProjectType) : "",
    budget: budget in budgets ? (budget as Budget) : "",
    region: clean(body.region, 80),
    platforms: clean(body.platforms, 160),
    message: clean(body.message, 2000),
  };
  const errors: InquiryErrors = {};
  const phoneDigits = inquiry.phone.replace(/\D/g, "");

  if (!(role in contactRoles)) errors.form = "Choose Client or Partner.";
  if (inquiry.firstName.length < 2) errors.firstName = "Enter your first name.";
  if (inquiry.lastName.length < 2) errors.lastName = "Enter your last name.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(inquiry.email)) {
    errors.email = "Enter a valid email address.";
  }
  if (phoneDigits.length < 7) errors.phone = "Enter a valid phone number.";

  if (inquiry.role === "client") {
    if (!inquiry.projectType) errors.projectType = "Choose a project type.";
    if (inquiry.message.length < 10) {
      errors.message = "Add a few sentences about the project.";
    }
  } else {
    if (inquiry.region.length < 2) errors.region = "Enter your city or region.";
    if (inquiry.platforms.length < 2) {
      errors.platforms = "Enter the freelance platforms you use.";
    }
    if (inquiry.message.length < 10) {
      errors.message = "Add a few sentences about how you want to partner.";
    }
  }

  return { inquiry, errors };
}
