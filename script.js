const menuButton = document.getElementById("menuButton");
const nav = document.querySelector(".nav");
const contactForm = document.getElementById("contactForm");
const wasteCalculator = document.getElementById("wasteCalculator");
const monthlyLoss = document.getElementById("monthlyLoss");
const totalLoss = document.getElementById("totalLoss");
const lossSummary = document.getElementById("lossSummary");
const lightbox = document.getElementById("lightbox");
const lightboxImage = document.getElementById("lightboxImage");
const shotLinks = document.querySelectorAll(".shot-link");
const faqItems = document.querySelectorAll(".faq__item");

if (menuButton && nav) {
  menuButton.addEventListener("click", () => {
    nav.classList.toggle("nav--open");
  });
}

if (contactForm) {
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const formData = new FormData(contactForm);
    const name = formData.get("name");
    const email = formData.get("email");
    const company = formData.get("company");
    const message = formData.get("message");

    if (!name || !email) {
      alert("Por favor, preencha nome e email para continuarmos.");
      return;
    }

    const subject = encodeURIComponent("Contato SeLiga - NinxSystem");
    const body = encodeURIComponent(
      `Nome: ${name}\nEmpresa: ${company || ""}\nEmail: ${email}\n\nMensagem:\n${message || ""}`
    );

    window.location.href = `mailto:admin@ninxsystem.com.br?subject=${subject}&body=${body}`;
  });
}

if (wasteCalculator && monthlyLoss && totalLoss && lossSummary) {
  const brl = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  });

  const parseNumber = (value) => {
    const numeric = Number(value);
    return Number.isFinite(numeric) && numeric >= 0 ? numeric : 0;
  };

  const updateLoss = () => {
    const formData = new FormData(wasteCalculator);
    const units = parseNumber(formData.get("unitsPerMonth"));
    const unitCost = parseNumber(formData.get("unitCost"));
    const periodMonths = Math.max(1, parseNumber(formData.get("periodMonths")));

    const monthly = units * unitCost;
    const total = monthly * periodMonths;

    monthlyLoss.textContent = brl.format(monthly);
    totalLoss.textContent = brl.format(total);
    lossSummary.textContent = `${units} un./mês x ${brl.format(unitCost)} por unidade durante ${periodMonths} mês(es).`;
  };

  wasteCalculator.addEventListener("input", updateLoss);
  updateLoss();
}

const openLightbox = (src, alt) => {
  if (!lightbox || !lightboxImage) return;
  lightboxImage.src = src;
  lightboxImage.alt = alt || "Preview ampliado";
  lightbox.classList.add("lightbox--open");
  lightbox.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
};

const closeLightbox = () => {
  if (!lightbox || !lightboxImage) return;
  lightbox.classList.remove("lightbox--open");
  lightbox.setAttribute("aria-hidden", "true");
  lightboxImage.src = "";
  document.body.style.overflow = "";
};

shotLinks.forEach((link) => {
  link.addEventListener("click", (event) => {
    event.preventDefault();
    const img = link.querySelector("img");
    const src = link.getAttribute("href");
    openLightbox(src, img ? img.alt : "");
  });
});

if (lightbox) {
  lightbox.addEventListener("click", (event) => {
    const target = event.target;
    if (target && target.getAttribute("data-close") === "true") {
      closeLightbox();
    }
  });
}

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeLightbox();
  }
});

faqItems.forEach((item) => {
  item.addEventListener("toggle", () => {
    if (!item.open) return;
    faqItems.forEach((otherItem) => {
      if (otherItem !== item) {
        otherItem.open = false;
      }
    });
  });
});
