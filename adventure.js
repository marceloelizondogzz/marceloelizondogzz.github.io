const imageFiles = [
  "_DSC0776-Pano_copy_2.jpeg",
  "_DSC1111.jpg",
  "_DSC1302 2.jpg",
  "_DSC1310 2.jpg",
  "_DSC1354.jpg",
  "_DSC2191.jpg",
  "_DSC7564.jpg",
  "_DSC3799.jpg",
  "DJI_0048-Edit copy.jpg",
  "DJI_0174 copy 2-2.jpg",
  "DJI_0473 copy.jpg",
  "DJI_0578.jpg",
  "DJI_20250628110637_0189_D.jpg",
  "DSC01338.jpg",
  "DSC07410.jpg",
  "Marruecos 2025-94.jpg",
];
const captions = {};

const gallerySection = document.querySelector(".gallery");
const lightbox = document.getElementById("lightbox");
const lightboxImg = lightbox ? lightbox.querySelector(".lightbox-content") : null;
const lightboxCaption = lightbox ? lightbox.querySelector(".lightbox-caption") : null;
const closeBtn = lightbox ? lightbox.querySelector(".close") : null;

let currentIndex = 0;

if (gallerySection) {
  imageFiles.forEach((filename, index) => {
    const img = document.createElement("img");
    img.src = `gallery/${filename}`;
    img.alt = `Photo ${index + 1}`;
    img.loading = "lazy";
    img.addEventListener("load", () => img.classList.add("loaded"));
    img.addEventListener("click", () => openLightbox(index));
    gallerySection.appendChild(img);
  });
}

function openLightbox(index) {
  if (!lightbox || !lightboxImg) return;
  currentIndex = index;
  if (gallerySection && gallerySection.children[index]) {
    lightboxImg.src = gallerySection.children[index].src;
  }
  if (lightboxCaption) {
    const filename = (gallerySection.children[index]?.src || "").split("/").pop();
    lightboxCaption.textContent = captions[filename] || "";
  }
  lightbox.classList.add("show");
  lightbox.style.pointerEvents = "auto";
}

function closeLightbox() {
  if (!lightbox) return;
  lightbox.classList.remove("show");
  lightbox.style.pointerEvents = "none";
  if (lightboxCaption) lightboxCaption.textContent = "";
}

if (closeBtn) closeBtn.addEventListener("click", closeLightbox);
if (lightbox) lightbox.addEventListener("click", (e) => { if (e.target === lightbox) closeLightbox(); });

document.addEventListener("keydown", (e) => {
  if (!lightbox || !lightbox.classList.contains("show")) return;
  if (e.key === "ArrowRight") { currentIndex = (currentIndex + 1) % gallerySection.children.length; openLightbox(currentIndex); }
  if (e.key === "ArrowLeft") { currentIndex = (currentIndex - 1 + gallerySection.children.length) % gallerySection.children.length; openLightbox(currentIndex); }
  if (e.key === "Escape") closeLightbox();
});
