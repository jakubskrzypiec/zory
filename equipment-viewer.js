const weaponData = {
  gel: {
    image: "image.png",
    pain: "Niski",
    age: "9+",
    mode: "Szybki"
  },
  cal50: {
    image: "image1.png",
    pain: "Średni",
    age: "10+",
    mode: "Lekki"
  },
  classic: {
    image: "image2.png",
    pain: "Wyższy",
    age: "14+",
    mode: "Mocny"
  }
};

const buttons = document.querySelectorAll("[data-weapon]");
const weaponImage = document.getElementById("weaponImage");
const weaponPain = document.getElementById("weaponPain");
const weaponAge = document.getElementById("weaponAge");
const weaponMode = document.getElementById("weaponMode");
const weaponCard = document.getElementById("weaponCard");

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    buttons.forEach((item) => item.classList.remove("active"));
    button.classList.add("active");

    const data = weaponData[button.dataset.weapon];

    weaponImage.src = data.image;
    weaponPain.textContent = data.pain;
    weaponAge.textContent = data.age;
    weaponMode.textContent = data.mode;
  });
});

weaponCard.addEventListener("mousemove", (event) => {
  const rect = weaponCard.getBoundingClientRect();
  const x = event.clientX - rect.left;
  const y = event.clientY - rect.top;

  const rotateY = ((x / rect.width) - 0.5) * 18;
  const rotateX = ((y / rect.height) - 0.5) * -18;

  weaponCard.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
});

weaponCard.addEventListener("mouseleave", () => {
  weaponCard.style.transform = "rotateX(0deg) rotateY(0deg) scale(1)";
});
