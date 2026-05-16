const imageFiles = [
  "_DSC4184.jpg",
  "_DSC4192.jpg",
  "_DSC4211-Pano.jpg",
  "_DSC4212-Pano.jpg",
  "_DSC4221-Pano.jpg",
  "_DSC4223-Pano.jpg",
  "_DSC4288-2-Pano.jpg",
  "_DSC4289-2-Pano.jpg",
  "_DSC4291-2-Pano.jpg",
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
