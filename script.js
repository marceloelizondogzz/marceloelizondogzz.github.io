// --- GALLERY IMAGE FILES ---
// Add any new image filename here (in the gallery/ folder)
const imageFiles = [
  "000000010003-2.jpg",
  "000000010005-2-2.jpg",
  "000000010005-2.jpg",
  "000000010012-2.jpg",
  "000000010021.jpg",
  "A000324-R1-06-5.jpg",
  "A000324-R1-37-36.jpg",
  "A000325-R1-30-29A.jpg",
  "DJI_20250628110637_0189_D.jpg",
  "DJI_20250830113138_0257_D.jpg",
  "DSC06326.jpg",
  "DSC07410.jpg",
  "DSC08414.jpg",
  "_DSC0776-Pano_copy_2.jpeg",
  "timeblend3 pre print v2.jpg",
  "Marruecos 2025-94.jpg",
  "HYPERLAPSE_0202.jpg",
  "HYPERLAPSE_0001 copy 6.jpg",
  "DJI_20241109034103_0108_D.jpg",
  "DJI_20240216031651_0170_D.jpg",
  "DJI_20240216031503_0146_D.jpg",
  "DJI_20240216022713_0103_D.jpg",
  "DJI_20240216021603_0037_D-Pano.jpg",
  "DJI_20240216021509_0035_D.jpg",
  "DJI_20240216021501_0034_D.jpg",
  "DJI_20240216021501_0034_D-Pano.jpg",
  "DJI_20240216021345_0021_D.jpg",
  "DJI_20231123075000_0129_D.jpg",
  "DJI_20231123074757_0112_D.jpg",
  "DJI_20231001102751_0117_D.jpg",
  "DJI_0816.jpg",
  "DJI_0578.jpg",
  "DJI_0473 copy.jpg",
  "DJI_0396-HDR.jpg",
  "DJI_0174 copy 2-2.jpg",
  "DJI_0048-Edit copy.jpg",
  "DJI_0041.jpg",
  "DEFF9EF5-A3AE-4D5F-A594-6C572957674A.jpg",
  "3BF33B03-6837-43C4-8C06-5875263BD505.jpg",
  "_DSC9653.jpg",
  "_DSC9324.jpg",
  "_DSC9231 copy.jpg",
  "_DSC8842.jpg",
  "_DSC7898.jpg",
  "_DSC7564.jpg",
  "_DSC7319.jpg",
  "_DSC6944-2.jpg",
  "_DSC6027.jpg",
  "_DSC3930.jpg",
  "_DSC3799.jpg",
  "_DSC3725.jpg",
  "_DSC3441-DeNoiseAI-standard.jpg",
  "_DSC3165.jpg",
  "_DSC2590.jpg",
  "_DSC2191.jpg",
  "_DSC1354.jpg",
  "_DSC1310 2.jpg",
  "_DSC1302 2.jpg",
  "_DSC1111.jpg",
  "_DSC0062.jpg"
];

// Optional captions for images shown in the lightbox.
// Keyed by filename (exact match). Add more captions here.
const captions = {
  "A000324-R1-06-5.jpg": "Black's Beach"
};

// Shuffle function to randomize photo order
function shuffleArray(array) {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}
// DOM elements (may be absent on pages without a gallery)
const gallerySection = document.querySelector(".gallery");
const lightbox = document.getElementById("lightbox");
const lightboxImg = lightbox ? lightbox.querySelector(".lightbox-content") : null;
const lightboxCaption = lightbox ? lightbox.querySelector(".lightbox-caption") : null;
const closeBtn = lightbox ? lightbox.querySelector(".close") : null;

let currentIndex = 0;

// Only populate the gallery when a .gallery element exists on the page
if (gallerySection) {
  const shuffledImages = shuffleArray(imageFiles);

  // Dynamically create gallery images
  shuffledImages.forEach((filename, index) => {
    const img = document.createElement("img");
    img.src = `gallery/${filename}`;
    img.alt = `Photo ${index + 1}`;
    img.loading = "lazy";

    // Add loaded class when image finishes loading
    img.addEventListener("load", () => {
      img.classList.add("loaded");
    });

    // Click to open lightbox
    img.addEventListener("click", () => openLightbox(index));

    gallerySection.appendChild(img);
  });
}

// Open lightbox (guarded)
function openLightbox(index) {
  if (!lightbox || !lightboxImg) return;
  currentIndex = index;
  if (gallerySection && gallerySection.children[index]) {
    lightboxImg.src = gallerySection.children[index].src;
  }
  // set caption (if available)
  if (lightboxCaption) {
    const src = gallerySection && gallerySection.children[index] ? gallerySection.children[index].src : '';
    const filename = src.split('/').pop();
    lightboxCaption.textContent = captions[filename] || '';
  }

  lightbox.classList.add("show");
  lightbox.style.pointerEvents = "auto";
}

// Close lightbox (guarded)
function closeLightbox() {
  if (!lightbox) return;
  lightbox.classList.remove("show");
  lightbox.style.pointerEvents = "none";
  if (lightboxCaption) lightboxCaption.textContent = '';
}

// Close button
if (closeBtn) closeBtn.addEventListener("click", closeLightbox);

// Click outside image → close (guarded)
if (lightbox) {
  lightbox.addEventListener("click", e => {
    if (e.target === lightbox) closeLightbox();
  });
}

// Keyboard navigation (only when lightbox is present)
document.addEventListener("keydown", e => {
  if (!lightbox || !lightbox.classList.contains("show")) return;

  if (e.key === "ArrowRight") {
    if (!gallerySection) return;
    currentIndex = (currentIndex + 1) % gallerySection.children.length;
    openLightbox(currentIndex);
  }

  if (e.key === "ArrowLeft") {
    if (!gallerySection) return;
    currentIndex = (currentIndex - 1 + gallerySection.children.length) % gallerySection.children.length;
    openLightbox(currentIndex);
  }

  if (e.key === "Escape") {
    closeLightbox();
  }
});

// Random homepage background image
if (document.body.classList.contains('home')) {
  const heroImages = [
    'gallery/_DSC2191.jpg',
    'gallery/_DSC0776-Pano_copy_2.jpeg'
  ];
  const randomImage = heroImages[Math.floor(Math.random() * heroImages.length)];
  const heroElement = document.querySelector('.hero');
  if (heroElement) {
    heroElement.style.backgroundImage = `url('${randomImage}')`;
  }
}
