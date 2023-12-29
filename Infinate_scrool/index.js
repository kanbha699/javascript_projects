const imgcontainer = document.getElementById("img-container");
const loder = document.getElementById("loder");

let ready = false;
let imagesloaded = 0;
let totalimage = 0;
let photosArray = [];

// api url
const count = 30;
const apikey = `t8p8Tn_tyZfhwsjHEnclZ-DcRUIwksOOGFsgfo34Jq8`;
const url = `https://api.unsplash.com/photos/random/?client_id=${apikey}&count=${count}`;

function imageload() {
  console.log("image loaded");
  imagesloaded++;
  if (imagesloaded === totalimage) {
    ready = true;
    loder.hidden = true;
    console.log("ready = " + ready);
  }
}

function setAttributes(element, attributes) {
  for (const key in attributes) {
    element.setAttribute(key, attributes[key]);
  }
}

function displyPhoto() {
  imagesloaded = 0;

  totalimage = photosArray.length;
  console.log("total imagge" + totalimage);

  photosArray.forEach((photo) => {
    // creat a link to unsplash
    const item = document.createElement("a");
    item.setAttribute("href", photo.links.html);
    item.setAttribute("target", "_blank");
    // creat elemat for image
    const img = document.createElement("img");
    img.setAttribute("src", photo.urls.regular);
    img.setAttribute("alt", photo.alt_description);
    img.setAttribute("title", photo.alt_description);

    //event listener who check image is loaded oer nor
    img.addEventListener("load", imageload);

    // put <img> inside <a> then put both inside imagecontainer Elemant
    item.appendChild(img);
    imgcontainer.appendChild(item);
  });
}

async function getphotos() {
  try {
    const response = await fetch(url);
    photosArray = await response.json();
    displyPhoto();
    console.log(photosArray);
  } catch (error) {
    // console.log(error);
  }
}
//
// add event listener
window.addEventListener("scroll", () => {
  if (
    window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 &&
    ready
  ) {
    ready = false;
    getphotos();
  }
});

// on load
getphotos();
