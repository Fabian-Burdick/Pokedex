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
