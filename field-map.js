import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.160.1/build/three.module.js";
import { OrbitControls } from "https://cdn.jsdelivr.net/npm/three@0.160.1/examples/jsm/controls/OrbitControls.js";

const canvas = document.getElementById("fieldCanvas");
const popup = document.getElementById("mapPopup");

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x0b0b0b);

const camera = new THREE.PerspectiveCamera(
  55,
  canvas.clientWidth / canvas.clientHeight,
  0.1,
  1000
);

camera.position.set(18, 16, 18);

const renderer = new THREE.WebGLRenderer({
  canvas,
  antialias: true
});

renderer.setSize(canvas.clientWidth, canvas.clientHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.shadowMap.enabled = true;

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.08;
controls.minDistance = 10;
controls.maxDistance = 42;
controls.maxPolarAngle = Math.PI / 2.05;

const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
scene.add(ambientLight);

const sun = new THREE.DirectionalLight(0xffb36b, 1.2);
sun.position.set(12, 18, 8);
sun.castShadow = true;
scene.add(sun);

const groundGeometry = new THREE.PlaneGeometry(34, 26);
const groundMaterial = new THREE.MeshStandardMaterial({
  color: 0x2f3a20,
  roughness: 0.9
});

const ground = new THREE.Mesh(groundGeometry, groundMaterial);
ground.rotation.x = -Math.PI / 2;
ground.receiveShadow = true;
scene.add(ground);

function createBox(name, x, z, w, h, d, color, info) {
  const geometry = new THREE.BoxGeometry(w, h, d);
  const material = new THREE.MeshStandardMaterial({
    color,
    roughness: 0.65
  });

  const mesh = new THREE.Mesh(geometry, material);
  mesh.position.set(x, h / 2, z);
  mesh.castShadow = true;
  mesh.receiveShadow = true;
  mesh.userData = {
    name,
    info
  };

  scene.add(mesh);
  return mesh;
}

function createTree(x, z) {
  const trunk = createBox("Drzewo", x, z, 0.25, 1.2, 0.25, 0x5b3a1d, "Element lasu i naturalnej osłony.");
  const crownGeometry = new THREE.SphereGeometry(0.9, 16, 16);
  const crownMaterial = new THREE.MeshStandardMaterial({
    color: 0x1f4a24,
    roughness: 0.8
  });

  const crown = new THREE.Mesh(crownGeometry, crownMaterial);
  crown.position.set(x, 1.8, z);
  crown.castShadow = true;
  scene.add(crown);

  return trunk;
}

const clickable = [];

clickable.push(createBox(
  "Baza drużyny",
  -10,
  -8,
  4,
  1,
  2.2,
  0xff6a00,
  "Strefa startowa jednej z drużyn. Tutaj zaczyna się rozgrywka."
));

clickable.push(createBox(
  "Baza przeciwnika",
  10,
  8,
  4,
  1,
  2.2,
  0xff6a00,
  "Druga baza. Idealny punkt do trybów drużynowych i scenariuszy."
));

clickable.push(createBox(
  "Wieża / punkt kontroli",
  0,
  0,
  2.2,
  3.6,
  2.2,
  0x1f1f1f,
  "Centralny punkt mapy. Dobry do trybu King of the Hill."
));

clickable.push(createBox(
  "Ognisko",
  -12,
  8,
  2.2,
  0.5,
  2.2,
  0xff9d00,
  "Miejsce odpoczynku po grze, spotkania ekipy i grillowania."
));

const barriers = [
  [-6, -3], [-3, -5], [3, -4], [6, -2],
  [-7, 3], [-2, 4], [4, 3], [8, 5],
  [0, -8], [0, 8]
];

barriers.forEach((pos, index) => {
  clickable.push(createBox(
    "Przeszkoda",
    pos[0],
    pos[1],
    2.6,
    1.3,
    0.55,
    0x4b4b4b,
    "Osłona na polu gry. Można za nią planować ruch i kryć się przed przeciwnikiem."
  ));
});

for (let i = 0; i < 26; i++) {
  const x = -16 + Math.random() * 32;
  const z = -12 + Math.random() * 24;

  if (Math.abs(x) < 11 && Math.abs(z) < 9) continue;
  createTree(x, z);
}

const raycaster = new THREE.Raycaster();
const pointer = new THREE.Vector2();

function showPopup(title, text) {
  popup.querySelector("h3").textContent = title;
  popup.querySelector("p").textContent = text;
  popup.classList.add("active");
}

canvas.addEventListener("click", (event) => {
  const rect = canvas.getBoundingClientRect();

  pointer.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
  pointer.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

  raycaster.setFromCamera(pointer, camera);

  const intersects = raycaster.intersectObjects(clickable);

  if (intersects.length > 0) {
    const object = intersects[0].object;
    showPopup(object.userData.name, object.userData.info);
  }
});

document.querySelectorAll("[data-focus]").forEach((button) => {
  button.addEventListener("click", () => {
    const target = button.dataset.focus;

    if (target === "base") {
      camera.position.set(-12, 12, -12);
    }

    if (target === "cover") {
      camera.position.set(9, 12, 12);
    }

    if (target === "forest") {
      camera.position.set(-18, 14, 12);
    }

    if (target === "fire") {
      camera.position.set(-14, 10, 10);
    }

    controls.update();
  });
});

function resizeRenderer() {
  const width = canvas.clientWidth;
  const height = canvas.clientHeight;

  camera.aspect = width / height;
  camera.updateProjectionMatrix();

  renderer.setSize(width, height, false);
}

window.addEventListener("resize", resizeRenderer);

function animate() {
  controls.update();
  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}

resizeRenderer();
animate();
