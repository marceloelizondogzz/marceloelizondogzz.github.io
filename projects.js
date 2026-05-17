const imageFiles = [
  "_DSC0776-Pano_copy_2.jpeg",
  "_DSC7898.jpg",
  "3BF33B03-6837-43C4-8C06-5875263BD505.jpg",
  "DEFF9EF5-A3AE-4D5F-A594-6C572957674A.jpg",
  "DJI_0041.jpg",
  "DJI_20231123074757_0112_D.jpg",
  "DJI_20231123075000_0129_D.jpg",
  "DJI_20240216021345_0021_D.jpg",
  "DJI_20240216021501_0034_D.jpg",
  "DJI_20240216021509_0035_D.jpg",
  "DJI_20240216022713_0103_D.jpg",
  "DJI_20240216031503_0146_D.jpg",
  "DJI_20240216031651_0170_D.jpg",
];
const captions = {};

for (let i = imageFiles.length - 1; i > 0; i--) {
  const j = Math.floor(Math.random() * (i + 1));
  [imageFiles[i], imageFiles[j]] = [imageFiles[j], imageFiles[i]];
}

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
