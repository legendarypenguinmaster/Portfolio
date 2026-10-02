const navToggle = document.querySelector(".nav-toggle");
const nav = document.querySelector(".nav");
const form = document.querySelector("#contact-form");
const status = document.querySelector("#form-status");
const year = document.querySelector("#year");

if (year) year.textContent = String(new Date().getFullYear());

if (navToggle && nav) {
  navToggle.addEventListener("click", () => {
    const open = nav.classList.toggle("is-open");
    navToggle.setAttribute("aria-expanded", open ? "true" : "false");
  });

  nav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      nav.classList.remove("is-open");
      navToggle.setAttribute("aria-expanded", "false");
    });
  });
}

function setError(name, message) {
  const field = form.querySelector(`[data-field="${name}"]`);
  const slot = form.querySelector(`[data-error="${name}"]`);
  if (field) field.classList.toggle("is-invalid", Boolean(message));
  if (slot) slot.textContent = message || "";
}

function clearErrors() {
  ["name", "email", "seat", "message", "form"].forEach((name) => setError(name, ""));
}

if (form) {
  const params = new URLSearchParams(window.location.search);
  if (params.get("sent") === "1") {
    form.hidden = true;
    status.hidden = false;
    status.className = "form-status is-success";
    status.textContent = "Message sent to admin@diaittech.online. A studio lead will reply to the email you left.";
  } else if (params.get("error")) {
    status.hidden = false;
    status.className = "form-status is-error";
    status.textContent = "We couldn't send that message. Check the fields and try again.";
  }

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    clearErrors();
    status.hidden = true;

    const data = Object.fromEntries(new FormData(form).entries());
    const button = form.querySelector("button[type='submit']");
    button.disabled = true;
    button.textContent = "Sending…";

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(data),
      });
      const payload = await response.json();

      if (!response.ok || !payload.ok) {
        const errors = payload.errors || { form: "Something went wrong. Try again." };
        Object.entries(errors).forEach(([key, message]) => setError(key, message));
        if (errors.form) {
          status.hidden = false;
          status.className = "form-status is-error";
          status.textContent = errors.form;
        }
        return;
      }

      form.reset();
      form.hidden = true;
      status.hidden = false;
      status.className = "form-status is-success";
      status.textContent = "Message sent to admin@diaittech.online. A studio lead will reply to the email you left.";
    } catch {
      status.hidden = false;
      status.className = "form-status is-error";
      status.textContent = "The studio site couldn't reach the server. Try again in a moment.";
    } finally {
      button.disabled = false;
      button.textContent = "Send to the studio";
    }
  });
}
