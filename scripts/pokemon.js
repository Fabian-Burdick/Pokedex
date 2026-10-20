//async for Cards//

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

//async for Dialog//

async function fetchEvolutionChain(chainUrl) {
  try {
    const response = await fetch(chainUrl);
    const chainData = await response.json();
    const chain = [];
    let currentStep = chainData.chain;
    while (currentStep) {
      const urlParts = currentStep.species.url.split('/').filter(Boolean);
      const pokemonId = parseInt(urlParts[urlParts.length - 1], 10);
      const imgUrl = `https://githubusercontent.com{pokemonId}.png`;
      chain.push({
        id: pokemonId,
        name: currentStep.species.name,
        image: imgUrl,
      });
      currentStep = currentStep.evolves_to[0];
    }
    return chain;
  } catch (err) {
    console.error('Fehler beim Laden der Entwicklungskette:', err);
    return null;
  }
}

async function loadAndOpenPokemon(pokemon) {
  try {
    if (!pokemon.evolutionChain) {
      const speciesResponse = await fetch(pokemon.species.url);
      const speciesData = await speciesResponse.json();

      const evolutionChain = await fetchEvolutionChain(speciesData.evolution_chain.url);
      pokemon.evolutionChain = evolutionChain;
    }
    openDialog(pokemon);
  } catch (error) {
    console.error('Fehler beim Vorbereiten der Evolutionsdaten:', error);
    openDialog(pokemon);
  }
}

loadMorePokemons.addEventListener('click', () => {
  loadNextPokemon(limit);
});

initPokemonApp();
