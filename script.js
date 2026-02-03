const menuButton = document.getElementById("menuButton");
const nav = document.querySelector(".nav");
const contactForm = document.getElementById("contactForm");
const lightbox = document.getElementById("lightbox");
const lightboxImage = document.getElementById("lightboxImage");
const shotLinks = document.querySelectorAll(".shot-link");

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
