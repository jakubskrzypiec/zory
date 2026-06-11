const revealElements = document.querySelectorAll(".reveal");

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
    }
  });
}, { threshold: 0.14 });

revealElements.forEach((element) => observer.observe(element));

window.addEventListener("load", () => {
  const loader = document.getElementById("pageLoader");

  if (!loader) return;

  setTimeout(() => {
    loader.classList.add("hidden");
  }, 850);

  setTimeout(() => {
    loader.remove();
  }, 1600);
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
