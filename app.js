const API_KEY = "563492ad6f9170000100000181570428c91e4096b82045aacbc653bb";
const input = document.querySelector(".input");
const fromBtn = document.querySelector(".search_btn");

let searchText = "";
let search = false;
async function defaultPhotos() {
  const data = await fetch(`https://api.pexels.com/v1/curated`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: API_KEY,
    },
  });

  const response = await data.json();

  console.log(response);
  displayImages(response);
}

function displayImages(response) {
  response.photos.forEach((image) => {
    const photoDiv = document.createElement("div");
    photoDiv.innerHTML = `
    <a href=${image.src.large} target="_black">
        <img class="image" src=${image.src.large} alt=${image.url}</img>
    </a>
    <figcaption class="caption">📷: ${image.photographer}</figcaption>`;

    document.querySelector(".display_images").appendChild(photoDiv);
  });
}

// Search Photos

async function searchPhotos(query) {
  const data = await fetch(`https://api.pexels.com/v1/search?query=${query}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: API_KEY,
    },
  });

  const response = await data.json();

  console.log(response);
  displayImages(response);
}

input.addEventListener("input", (e) => {
  e.preventDefault();
  searchText = e.target.value;
});

fromBtn.addEventListener("click", () => {
  if (searchText === "") {
    document.querySelector(".display_images").innerHTML = "Mistak...";
  } else {
    document.querySelector(".display_images").innerHTML = "";
    // search = true;
    searchPhotos(searchText);
  }
});

defaultPhotos();
