const imagesList = document.querySelector(".images");
const searchInput = document.querySelector(".search-box input");
const loadMoreBtn = document.querySelector(".load-more");
const lightbox = document.querySelector(".lightbox");
const closeImgBtn = lightbox.querySelector(".close-icon");
const downloadImgBtn = lightbox.querySelector(".uil-import");

// Add your images and memorys here
const images = [
  { name: 'img.jpeg', memory: 'School' },
  { name: 'img1.jpg', memory: 'Khona nahi' },
  { name: 'pancha.png', memory: 'pancha' },
  { name: 'img3.jpg', memory: 'IIT BOMBAY...' },
  { name: 'rani.jpg', memory: 'pancha' },
  { name: 'img7.png', memory: 'pancha' },
  { name: 'img6.png', memory: 'pancha' },
  { name: 'img8.jpg', memory: 'pancha' },
  { name: 'img9.jpg', memory: 'pancha' },
  { name: 'img10.jpg', memory: 'pancha' }
];
let currentImages = images;  // current list to display
let loadedImages = 0;
const batchSize = 5;

// Load images on page load
window.addEventListener("load", () => {
  loadImages();
});

loadMoreBtn.addEventListener("click", () => {
  loadImages();
});

const downloadImg = (imgUrl) => {
  fetch(imgUrl).then(res => res.blob()).then(blob => {
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = new Date().getTime();
    a.click();
  }).catch(() => alert("Failed to download image!"));
}

const showLightbox = (name, img) => {
  lightbox.querySelector("img").src = img;
  lightbox.querySelector("span").innerText = name;
  downloadImgBtn.setAttribute("data-img", img);
  lightbox.classList.add("show");
  document.body.style.overflow = "hidden";
}

const hideLightbox = () => {
  lightbox.classList.remove("show");
  document.body.style.overflow = "auto";
}

// Search images by memory name
searchInput.addEventListener("keyup", () => {
  const searchTerm = searchInput.value.toLowerCase();
  currentImages = images.filter((image) =>
    image.memory.toLowerCase().includes(searchTerm)
  );
  loadedImages = 0;
  imagesList.innerHTML = "";
  loadMoreBtn.style.display = "block";
  loadImages();
});

// Load images function
function loadImages() {
  const nextBatch = currentImages.slice(loadedImages, loadedImages + batchSize);

  nextBatch.forEach((imgObj) => {
    const image = document.createElement("li");
    const imgSrc = `../images/${imgObj.name}`;
    const memoryName = imgObj.memory;

    image.innerHTML = `
      <div class="card">
        <img src="${imgSrc}" alt="${imgObj.name}">
        <div class="details">
          <div class="memory">
            <i class="uil uil-camera"></i>
            <span>${memoryName}</span>
          </div>
          <i class="uil uil-heart"></i>  
        </div>
      </div>
    `;

    image.querySelector("img").addEventListener("click", () => {
      showLightbox(memoryName, imgSrc);
    });
    closeImgBtn.addEventListener("click", hideLightbox);
    imagesList.appendChild(image);
  });

  loadedImages += nextBatch.length;

  if (loadedImages >= currentImages.length) {
    loadMoreBtn.style.display = "none";
  }
}

downloadImgBtn.addEventListener("click", (e) => downloadImg(e.target.dataset.img));
