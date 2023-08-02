let title = document.getElementById("title-movie");
const year = document.getElementById("year");
let type = document.getElementById("type");
const modal = document.querySelector(".modal");
const header = document.querySelector(".header__container");
const main = document.querySelector(".main__container");

const KEY = "263d22d8";
const ul = document.querySelector("ul");

title.value.toLowerCase();
type.value.toLowerCase();
// btn
const searchBtn = document.querySelector(".search-btn");
const randomBtn = document.querySelector(".random-btn");
const searchAgainBtn = document.querySelector(".search-icon");
// ul.innerHTML = `
//   <button id="readmore-btn"></button>
// `;

randomBtn.addEventListener("click", () => {
  const randomTitle = Math.floor(Math.random() * random.length) - 1;
  console.log(randomTitle);
  let newTitle = random[randomTitle].toLowerCase().replaceAll(" ", "+");
  console.log(newTitle);
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

const reader = async (data) => {
  header.classList.add("hidden");
  main.classList.add("hidden");
  console.log("1");
  const query = "https://www.omdbapi.com/?apikey=";
  const ggle = `${KEY}&i=${data.imdbID}`;
  const req = await fetch(query + ggle);
  const result = await JSON.parse(req);
  return result;
};
const updateUI = (smth) => {
  console.log(smth);
  console.log(smth.imdbID);
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

//!
// changeLocation.addEventListener("submit", (e) => {
//   e.preventDefault();
//   const cityName = changeLocation.city.value.trim();
//   changeLocation.reset();
//   getWeather(cityName).then((data) => updateUI(data));
// });

// const KEY = "082855b6ab9c5af85d7eb9fc8d611808";

// const getData = async (city) => {
//   const base = "https://api.openweathermap.org/data/2.5/weather";
//   const query = `?q=${city}&appid=${KEY}`;
//   loader(true);
//   const req = await fetch(base + query);
//   const data = await req.json();
//   loader(false);
//   return data;
// };

///

// const changeLocation = document.getElementById("change-location");
// const card = document.getElementById("card");
// const details = document.getElementById("details");
// const weatherIcon = document.getElementById("weather-icon");
// const overlay = document.getElementById("overlay");

// changeLocation.city.focus();

// const loader = (state) => {
//   if (state) {
//     overlay.classList.remove("d-none");
//   } else {
//     overlay.classList.add("d-none");
//   }
// };

// const updateUI = (weather) => {
//   let temp = Math.floor(weather.main.temp);
//   temp -= Math.floor(weather.main.temp) % 10;
//   let tem = "";
//   tem += temp.toString().charAt(0);
//   tem += temp.toString().charAt(1);
//   details.innerHTML = `
//     <h5 class="mb-3">${weather.name}, ${weather.sys.country}</h5>
//     <p class="mb-3">${weather.weather[0].main}</p>
//     <div class="display-4 mb-3">
//       <span>${tem}</span>
//       <span>&deg;C</span>
//     </div>
//     </div>
//     `;

//   if (card.classList.contains("d-none")) {
//     card.classList.remove("d-none");
//   }

//   weatherIcon.src = `http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`;
// };

// const getWeather = async (city) => {
//   const data = getData(city);

//   return data;
// };
