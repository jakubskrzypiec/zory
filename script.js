document.documentElement.classList.add("js-enabled");

const revealElements = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  }, { threshold: 0.14 });

  revealElements.forEach((element) => observer.observe(element));
} else {
  revealElements.forEach((element) => element.classList.add("visible"));
}

window.addEventListener("load", () => {
  const loader = document.getElementById("pageLoader");

  if (!loader) return;

  setTimeout(() => {
    loader.classList.add("hidden");
  }, 650);

  setTimeout(() => {
    loader.remove();
  }, 1300);
});

const lightbox = document.getElementById("lightbox");
const lightboxImage = document.getElementById("lightboxImage");
const lightboxClose = document.getElementById("lightboxClose");

document.querySelectorAll(".gallery-item").forEach((image) => {
  image.addEventListener("click", () => {
    if (!lightbox || !lightboxImage) return;

    lightboxImage.src = image.src;
    lightboxImage.alt = image.alt;
    lightbox.classList.add("active");
  });
});

if (lightboxClose) {
  lightboxClose.addEventListener("click", () => {
    lightbox.classList.remove("active");
  });
}

if (lightbox) {
  lightbox.addEventListener("click", (event) => {
    if (event.target === lightbox) {
      lightbox.classList.remove("active");
    }
  });
}

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && lightbox) {
    lightbox.classList.remove("active");
  }
});

const fieldPopup = document.getElementById("fieldPopup");
const fieldPopupTitle = document.getElementById("fieldPopupTitle");
const fieldPopupText = document.getElementById("fieldPopupText");
const fieldPopupClose = document.getElementById("fieldPopupClose");

document.querySelectorAll(".field-point").forEach((point) => {
  point.addEventListener("click", () => {
    if (!fieldPopup || !fieldPopupTitle || !fieldPopupText) return;

    fieldPopupTitle.textContent = point.dataset.title;
    fieldPopupText.textContent = point.dataset.text;
    fieldPopup.classList.add("active");
  });
});

if (fieldPopupClose) {
  fieldPopupClose.addEventListener("click", () => {
    fieldPopup.classList.remove("active");
  });
}

const contactForm = document.getElementById("contactForm");

if (contactForm) {
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const name = document.getElementById("name").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const mode = document.getElementById("mode").value;
    const message = document.getElementById("message").value.trim();

    const subject = encodeURIComponent("Zapytanie ze strony Paintball Żory");
    const body = encodeURIComponent(
      `Imię: ${name}\nTelefon: ${phone}\nTryb gry: ${mode}\n\nWiadomość:\n${message}`
    );

    window.location.href = `mailto:otamix@poczta.onet.pl?subject=${subject}&body=${body}`;
  });
}
