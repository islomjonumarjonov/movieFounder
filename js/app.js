let title = document.getElementById("title-movie");
const year = document.getElementById("year");
let type = document.getElementById("type");
const modal = document.querySelector(".modal");
const header = document.querySelector(".header__container");
const main = document.querySelector(".main__container");

const KEY = "3e90ace9";
const ul = document.querySelector("ul");

title.value.toLowerCase().replaceAll(" ", "+");
type.value.toLowerCase();
// btn
const searchBtn = document.querySelector(".search-btn");
const randomBtn = document.querySelector(".random-btn");
const searchAgainBtn = document.querySelector(".search-icon");

randomBtn.addEventListener("click", () => {
  const randomTitle = Math.floor(Math.random() * random.length) - 1;
  let newTitle = random[randomTitle].toLowerCase().replaceAll(" ", "+");
  finder(newTitle).then((data) =>
    data.Search.forEach((item) => {
      updateUI(item);
    })
  );
  modal.classList.add("hidden");
  searchAgainBtn.classList.remove("hidden");
});

const finder = async (data, year = "", type = "") => {
  const ggle = "https://www.omdbapi.com/?apikey=";
  const query = `${KEY}&s=${data}&plot=full&y=${year}&type=${type}`;
  const req = await fetch(ggle + query);
  const result = await req.json();
  return result;
};

const updateUI = (smth) => {
  ul.innerHTML += `
        <li class="updated">
        <img src="${smth.Poster}" alt="">
        <div class="update__info">
          <h2>${smth.Title}</h2>
          <p>Released: ${smth.Year}</p>
          <p>Type: ${smth.Type}</p>

        </div>
        </li>
    `;
};

searchBtn.addEventListener("click", () => {
  if (title.value == "") {
    ul.innerHTML = `
    <h2>Movie not found :(</h2>`;
  }

  searchAgainBtn.classList.remove("hidden");

  if (year.value && type.value) {
    finder(title.value.trim(), year.value, type.value).then((data) =>
      data.Search.forEach((item) => {
        updateUI(item);
      })
    );
  } else if (year.value) {
    finder(title.value.trim(), year.value).then((data) =>
      data.Search.forEach((item) => {
        updateUI(item);
      })
    );
  } else if (type.value) {
    finder(title.value.trim(), "", type.value).then((data) =>
      data.Search.forEach((item) => {
        updateUI(item);
      })
    );
  } else {
    finder(title.value.trim()).then((data) =>
      data.Search.forEach((item) => {
        updateUI(item);
      })
    );
  }
  ul.innerHTML = "";

  modal.classList.add("hidden");
});

searchAgainBtn.addEventListener("click", (item) => {
  ul.innerHTML = "";
  modal.classList.remove("hidden");
  searchAgainBtn.classList.add("hidden");
});
