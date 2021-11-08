/*****************************DOM VARIABLES******************/
const randombut = document.querySelector("button");
const searchbar = document.querySelector("input");
const searchbut = document.querySelector("svg");

const searchcont = document.querySelector(".results");
const card = document.getElementById("rcard");
const pokeid = document.querySelector(".idtag");
const pokehp = document.querySelector(".hptag");

const pokeimg = document.querySelector(".pokeimglabe img");
const pokename = document.querySelector(".pokeimglabe h3");

const poketype = document.querySelector(".power1 p");
const typeimg = document.querySelector(".power1 img");

const atk = document.querySelector(".attack span");
const def = document.querySelector(".defence span");
const spd = document.querySelector(".speed span");
/*********************************VARIABLES******************/
let searchquery = "";
const baseurl = `https://pokeapi.co/api/v2/pokemon/`;
let themecolor;
/*********************************ARRAYS AND OBJECTS*********/
const typeColor = {
  bug: "#26de81",
  dragon: "#ffeaa7",
  electric: "#fed330",
  fairy: "#FF0069",
  fighting: "#30336b",
  fire: "#f0932b",
  flying: "#81ecec",
  grass: "#00b894",
  ground: "#EFB549",
  ghost: "#a55eea",
  ice: "#74b9ff",
  normal: "#95afc0",
  poison: "#6c5ce7",
  psychic: "#a29bfe",
  rock: "#2d3436",
  water: "#0190FF",
};
/*****************************ADDEVENTLISTENERS**************/
searchbut.addEventListener("click", function () {
  searchquery = searchbar.value;
  if ((searchquery = "")) alert("Please enter a valid name");
  else fetchapi(baseurl);
});
randombut.addEventListener("click", function () {
  let randid = Math.floor(Math.random() * 150) + 1;
  let finalurl = baseurl + randid;
  fetchapi(finalurl);
});
/*****************************FUNCTIONS**********************/
async function fetchapi(url) {
  let response = await fetch(url);
  try {
    let data = await response.json();
    console.log("Api connected");
    generatehtml(data);
  } catch {
    console.log("error");
  }
}

function setcardstyle(color) {
  card.style.background = `radial-gradient(circle at 50% 0%, ${color} 36%, #ffffff 36%)`;
  poketype.style.backgroundColor = `${color}`;
  console.log("color changed to:" + color);
}

function generatehtml(result) {
  let newhtml = `<div class="pokecard">
        <div class="topinfo">
          <div class="idtag">#${result.id}</div>
          <div class="hptag">
            <span>HP</span>${result.stats[0].base_stat}
          </div>
        </div>
        <div class="pokeimglabe">
          <img src=${result.sprites.other.dream_world.front_default} alt="${result.name}" />
          <h3>${result.name}</h3>
        </div>
         <div class="power1">
            <p>
            ${result.types[0].type.name}
            <img src="Grass.png" />
          </p>
          <p>
            ${result.types[1].type.name}
            <img src="Grass.png" />
          </p>
          </div>
        <div class="bottominfo">
          <div class="attack">
            <span>${result.stats[1].base_stat}</span>
            <p>Attack</p>
          </div>
          <div class="defence">
            <span>${result.stats[2].base_stat}</span>
            <p>Defence</p>
          </div>
          <div class="speed">
            <span>${result.stats[5].base_stat}</span>
            <p>Speed</p>
          </div>
        </div>
      </div>
`;
  searchcont.innerHTML = newhtml;
  themecolor = typeColor[result.types[0].type.name];
  setcardstyle(themecolor);
}
