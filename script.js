let allPokemons = [];
let loadedPokemons = [];
let filteredPokemons = [];
let currentSearch = '';
let currentOffset = 0;

const limit = 20;
const pokemonCards = document.getElementById('pokeCards');
const loadMorePokemons = document.getElementById('loadMoreCards');
const loadingScreen = document.getElementById('loadingScreen');

const typeColors = {
  grass: 'bg-green',
  bug: 'bg-green2',
  water: 'bg-blue',
  fire: 'bg-red',
  electric: 'bg-yellow',
  psychic: 'bg-purple',
  poison: 'bg-purple',
  fairy: 'bg-rose',
  flying: 'bg-default',
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

function getPokemonColorClass(type) {
  return typeColors[type] || 'bg-default';
}

function getPokemonCard(pokemon) {
  const card = document.createElement('button');
  card.classList.add('pokemon-card');
  card.dataset.loaded = 'true';
  card.onclick = async () => {
    await loadAndOpenPokemon(pokemon);
  };
  const primaryType = pokemon.types && pokemon.types[0] ? pokemon.types[0].type.name : 'normal';
  card.classList.add(getPokemonColorClass(primaryType));
  const pokemonImg = pokemon.sprites.other['official-artwork'].front_default || pokemon.sprites.front_default;
  const typeIconUrl = `./assets/icons/${primaryType}.webp`;
  card.innerHTML = PokemonCardsTemplate(pokemon, pokemonImg, typeIconUrl, primaryType);
  pokemonCards.appendChild(card);
}

function filterPokemon(pokemonCards, filteredPokemons, noResultsMessage) {
  let visibleCount = 0;
  pokemonCards.forEach((card) => {
    const pokemonName = card.querySelector('h3').textContent.toLowerCase();
    if (filteredPokemons.some((pokemon) => pokemon.name.toLowerCase() === pokemonName)) {
      card.style.display = 'block';
      visibleCount++;
    } else {
      card.style.display = 'none';
    }
  });
  noResultsMessage.style.display = visibleCount === 0 ? 'block' : 'none';
}

function searchPokemon(searchString) {
  const pokemonCards = document.querySelectorAll('.pokemon-card');
  const noResultsMessage = document.getElementById('noResultsMessage');
  currentSearch = searchString.trim().toLowerCase();
  filteredPokemons = loadedPokemons.filter((pokemon) => {
    return currentSearch.length < 3 || pokemon.name.toLowerCase().includes(currentSearch);
  });
  filterPokemon(pokemonCards, filteredPokemons, noResultsMessage);
}

document.getElementById('pokemonSearch').addEventListener('input', function (event) {
  searchPokemon(event.target.value);
});
