/*****************************DOM VARIABLES******************/
const randombut = document.querySelector("button");
const searchbar = document.querySelector("input");
const searchbut = document.querySelector("svg");
const searchcont = document.querySelector(".results");
const abilities = document.querySelector(".power1 p");
/*********************************VARIABLES******************/
const baseurl = `https://pokeapi.co/api/v2/pokemon/`;
let themecolor;
/*********************************ARRAYS AND OBJECTS*********/
const typecolor = {
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
  if (searchbar.value === "") alert("Please enter a valid name");
  else {
    fetchapi(`https://pokeapi.co/api/v2/pokemon/${searchbar.value}`);
  }
});
randombut.addEventListener("click", function () {
  let randid = Math.floor(Math.random() * 150) + 1;
  let finalurl = baseurl + randid;
  fetchapi(finalurl);
});
/*****************************FUNCTIONS**********************/

async function fetchapi(url) {
  let response = await fetch(url);
  let data = await response.json();
  //console.log("Api connected");
  generatehtml(data);
}

const fetchPokemons = async () => {
  for (let i = 1; i <= 50; i++) {
    await getPokemon(i);
  }
};

const getPokemon = async (id) => {
  const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
  const res = await fetch(url);
  const pokemon = await res.json();
  createPokemonCard(pokemon);
};

function createPokemonCard(pokemon) {
  let pokeInnerHTML = "";
  const name = pokemon.name[0].toUpperCase() + pokemon.name.slice(1);
  pokeInnerHTML = `<div class="pokecard">
        <div class="topinfo">
          <div class="idtag">#${pokemon.id}</div>
          <div class="hptag">
            <span>HP</span>${pokemon.stats[0].base_stat}
          </div>
        </div>
        <div class="pokeimglabe">
          <img src=${pokemon.sprites.other.dream_world.front_default} alt="${pokemon.name}" />
          <h3>${name}</h3>
        </div>
         <div class="power1">
            <p>
            ${pokemon.types[0].type.name}
            <img src="Grass.png" />
          </p>
          
          </div>
        <div class="bottominfo">
          <div class="attack">
            <span>${pokemon.stats[1].base_stat}</span>
            <p>Attack</p>
          </div>
          <div class="defence">
            <span>${pokemon.stats[2].base_stat}</span>
            <p>Defence</p>
          </div>
          <div class="speed">
            <span>${pokemon.stats[5].base_stat}</span>
            <p>Speed</p>
          </div>
        </div>
      </div>`;
  searchcont.innerHTML += pokeInnerHTML;
}
fetchPokemons();

function generatehtml(result) {
  const card = document.createElement("div");
  card.classList.add("pokecard");
  const name = result.name[0].toUpperCase() + result.name.slice(1);
  let newhtml = `
      <div class=pokecard>
        <div class="topinfo">
          <div class="idtag">#${result.id}</div>
          <div class="hptag">
            <span>HP</span>${result.stats[0].base_stat}
          </div>
        </div>
        <div class="pokeimglabe">
          <img src=${result.sprites.other.dream_world.front_default} alt="${name}" />
          <h3>${name}</h3>
        </div>
         <div class="power1">
            <p>
            ${result.types[0].type.name}
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
  themecolor = typecolor[result.types[0].type.name];
  card.style.background = `radial-gradient(circle at 50% 0%, ${themecolor} 36%, #ffffff 36%)`;
  abilities.style.backgroundColor - `${themecolor}`;
}

/****
 * POWERUPS---DONE
 * SEARCHBAR--DONE
 * COLOR-SCHEME AND TYPE SPRITE--NEEDHELP
 */
