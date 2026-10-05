let allPokemons = [];
const limit = 20;
let currentOffset = 0;

const pokemonCards = document.getElementById('pokeCards');
const loadMorePokemons = document.getElementById('load20More');

async function initPokemonApp() {
  try {
    const response = await fetch('./database/pokemon.json');
    allPokemons = await response.json();
    loadNextPokemon(40);
  } catch (error) {
    console.error('Fehler beim Laden der lokalen JSON-Daten:', error);
  }
}

async function loadNextPokemon(amountToLoad) {
  const nextChunk = allPokemons.slice(currentOffset, currentOffset + amountToLoad);
  currentOffset += amountToLoad;

  for (const pokemon of nextChunk) {
    try {
      const detailResponse = await fetch(pokemon.url);
      const pokemonDetails = await detailResponse.json();
      getPokemonCard(pokemonDetails);
    } catch (err) {
      console.error(`Fehler beim Laden von ${pokemon.name}:`, err);
    }
  }
  if (currentOffset >= allPokemons.length) {
    loadMorePokemons.style.display = 'none';
  }
}

loadMorePokemons.addEventListener('click', () => {
  loadNextPokemon(limit);
});

initPokemonApp();

function getPokemonCard(pokemon) {
  const card = document.createElement('button');

  card.onclick = () => {
    const dialog = document.getElementById('openDialog');
    if (dialog) {
      dialog.showModal(); // Öffnet das HTML5 <dialog> Element
    }
  };

  card.classList.add('pokemon-card');
  const primaryType = pokemon.types && pokemon.types[0] ? pokemon.types[0].type.name : 'normal';
  const typeColors = {
    grass: 'bg-green',
    bug: 'bg-green2',
    water: 'bg-blue',
    fire: 'bg-red',
    electric: 'bg-yellow',
    psychic: 'bg-purple',
    poison: 'bg-purple',
    fairy: 'bg-rose',
    ground: 'bg-brown',
    rock: 'bg-brownorange',
    fighting: 'bg-rost',
    ghost: 'bg-lila',
    ice: 'bg-lightblue',
    dragon: 'bg-darkblue',
    steel: 'bg-grey',
    dark: 'bg-darkbrown',
    normal: 'bg-default',
  };
  card.classList.add(typeColors[primaryType] || 'bg-default');

  const pokemonImg = pokemon.sprites.other['official-artwork'].front_default || pokemon.sprites.front_default;
  const typeIconUrl = `./assets/icons/${primaryType}.webp`;

  card.innerHTML = `
    <h3>${pokemon.name}</h3>
    <img src="${pokemonImg}" alt="${pokemon.name}">
    <div>
      <img class="type-icon" 
           src="${typeIconUrl}" 
           alt="${primaryType}" 
           title="${primaryType.toUpperCase()}">
    </div>
  `;

  pokemonCards.appendChild(card);
}

loadPokemonFromJSON();
