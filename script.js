const poke_container = document.getElementById("poke-container");
const pokemon_start = 1;
const pokemon_count = 300;
const colors = {
  fire: "#FDDFDF",
  grass: "#DEFDE0",
  electric: "#FCF7DE",
  water: "#DEF3FD",
  ground: "#f4e7da",
  rock: "#d5d5d4",
  fairy: "#fceaff",
  poison: "#98d7a5",
  bug: "#f8d5a3",
  dragon: "#97b3e6",
  psychic: "#eaeda1",
  flying: "#f5f5f5",
  fighting: "#e6e0d4",
  normal: "#f5f5f5",
};

const mainTypes = Object.keys(colors);

// Get Pokemon data from PokeAPI
const fetchPokemons = async () => {
  for (let i = pokemon_start; i <= pokemon_count; i++) {
    await getPokemon(i);
  }
};

// Parse the json and get data on individual pokemon
const getPokemon = async (id) => {
  const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
  const res = await fetch(url);
  const data = await res.json();
  createPokemonCard(data);
};

// Separate all the information and make a card
const createPokemonCard = (pokemon) => {
  const pokemonEl = document.createElement("div");
  pokemonEl.classList.add("pokemon");

  console.log(pokemon);
  const name = pokemon.name[0].toUpperCase() + pokemon.name.slice(1);
  const id = pokemon.id.toString().padStart(3, "0");

  const pokeTypes = pokemon.types.map((type) => type.type.name);
  const type = mainTypes.find((type) => pokeTypes.indexOf(type) > -1);
  const newType = type[0].toUpperCase() + type.slice(1);

  const color = colors[type];
  console.log(color);
  pokemonEl.style.backgroundColor = color;

  // Make new card
  const pokemonInnerHTML = `
    <div class="img-container">
        <img src="https://pokeres.bastionbot.org/images/pokemon/${pokemon.id}.png" alt=""/>
    </div>
    <div class="info">
        <span class="number">#${id}</span>
        <h3 class="name">${name}</h3>
        <small class="class">Type: <span>${newType}</span></small>
    </div>
    `;

  pokemonEl.innerHTML = pokemonInnerHTML;
  
  // Add card to the list
  poke_container.appendChild(pokemonEl);
};

fetchPokemons();
