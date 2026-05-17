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
  "DJI_20240216022713_0103_D.jpg",
  "DJI_20240216031503_0146_D.jpg",
  "DJI_20240216031651_0170_D.jpg",
];

for (let i = imageFiles.length - 1; i > 0; i--) {
  const j = Math.floor(Math.random() * (i + 1));
  [imageFiles[i], imageFiles[j]] = [imageFiles[j], imageFiles[i]];
}

let currentIndex = 0;

const img     = document.querySelector(".carousel-img");
const prevBtn = document.querySelector(".carousel-prev");
const nextBtn = document.querySelector(".carousel-next");

function showPhoto(index) {
  img.style.opacity = 0;
  setTimeout(() => {
    img.src = `gallery/${imageFiles[index]}`;
    img.onload = () => { img.style.opacity = 1; };
  }, 200);
}

prevBtn.addEventListener("click", () => {
  currentIndex = (currentIndex - 1 + imageFiles.length) % imageFiles.length;
  showPhoto(currentIndex);
});

nextBtn.addEventListener("click", () => {
  currentIndex = (currentIndex + 1) % imageFiles.length;
  showPhoto(currentIndex);
});

document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowRight") nextBtn.click();
  if (e.key === "ArrowLeft")  prevBtn.click();
});

showPhoto(0);
