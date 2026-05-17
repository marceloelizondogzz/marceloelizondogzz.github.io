const imageFiles = [
  "_DSC0776-Pano_copy_2.jpeg",
  "_DSC7898.jpg",
  "_DSC3930.jpg",
  "3BF33B03-6837-43C4-8C06-5875263BD505.jpg",
  "DEFF9EF5-A3AE-4D5F-A594-6C572957674A.jpg",
  "DJI_0041.jpg",
  "DJI_20231123074757_0112_D.jpg",
  "DJI_20231123075000_0129_D.jpg",
  "DJI_20240216021345_0021_D.jpg",
  "DJI_20240216021501_0034_D-Pano.jpg",
  "DJI_20240216021501_0034_D.jpg",
  "DJI_20240216021509_0035_D.jpg",
  "DJI_20240216021603_0037_D-Pano.jpg",
  "DJI_20240216022713_0103_D.jpg",
  "DJI_20240216022713_0103_D_1.jpg",
  "DJI_20240216022852_0121_D-Pano.jpg",
  "DJI_20240216031503_0146_D.jpg",
  "DJI_20240216031651_0170_D.jpg",
];

for (let i = imageFiles.length - 1; i > 0; i--) {
  const j = Math.floor(Math.random() * (i + 1));
  [imageFiles[i], imageFiles[j]] = [imageFiles[j], imageFiles[i]];
}

let currentIndex = 0;

// Carousel elements
const carouselImg = document.querySelector(".carousel-img");
const prevBtn     = document.querySelector(".carousel-prev");
const nextBtn     = document.querySelector(".carousel-next");

// Lightbox elements
const lightbox   = document.getElementById("proj-lightbox");
const lbImg      = lightbox.querySelector(".proj-lb-img");
const lbPrev     = lightbox.querySelector(".proj-lb-prev");
const lbNext     = lightbox.querySelector(".proj-lb-next");
const lbClose    = lightbox.querySelector(".proj-lb-close");

function showCarousel(index) {
  carouselImg.style.opacity = 0;
  setTimeout(() => {
    carouselImg.src = `gallery/${imageFiles[index]}`;
    carouselImg.onload = () => { carouselImg.style.opacity = 1; };
  }, 200);
}

function openLightbox(index) {
  lbImg.src = `gallery/${imageFiles[index]}`;
  lightbox.classList.add("show");
}

function closeLightbox() {
  lightbox.classList.remove("show");
}

// Carousel navigation
prevBtn.addEventListener("click", () => {
  currentIndex = (currentIndex - 1 + imageFiles.length) % imageFiles.length;
  showCarousel(currentIndex);
});

nextBtn.addEventListener("click", () => {
  currentIndex = (currentIndex + 1) % imageFiles.length;
  showCarousel(currentIndex);
});

// Click photo to open lightbox
carouselImg.addEventListener("click", () => openLightbox(currentIndex));
carouselImg.style.cursor = "zoom-in";

// Lightbox navigation
lbPrev.addEventListener("click", (e) => {
  e.stopPropagation();
  currentIndex = (currentIndex - 1 + imageFiles.length) % imageFiles.length;
  showCarousel(currentIndex);
  lbImg.src = `gallery/${imageFiles[currentIndex]}`;
});

lbNext.addEventListener("click", (e) => {
  e.stopPropagation();
  currentIndex = (currentIndex + 1) % imageFiles.length;
  showCarousel(currentIndex);
  lbImg.src = `gallery/${imageFiles[currentIndex]}`;
});

lbClose.addEventListener("click", closeLightbox);
lightbox.addEventListener("click", (e) => { if (e.target === lightbox) closeLightbox(); });

// Keyboard
document.addEventListener("keydown", (e) => {
  const inLightbox = lightbox.classList.contains("show");
  if (e.key === "ArrowRight") inLightbox ? lbNext.click() : nextBtn.click();
  if (e.key === "ArrowLeft")  inLightbox ? lbPrev.click() : prevBtn.click();
  if (e.key === "Escape") closeLightbox();
});

showCarousel(0);
