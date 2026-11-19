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
      loadedPokemons.push(pokemonDetails);
      getPokemonCard(pokemonDetails);
    } catch (err) {
      console.error(`Fehler beim Laden von ${pokemon.name}:`, err);
    }
  }
  if (currentOffset >= allPokemons.length) {
    loadMorePokemons.style.display = 'none';
  }
  searchPokemon(currentSearch);
}

//async for Dialog//

function getPokemonEvolutionData(currentStep) {
  const pokemonId = Number(currentStep.species.url.split('/').filter(Boolean).pop());
  return {
    id: pokemonId,
    name: currentStep.species.name,
    image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonId}.png`,
  };
}

function getNextEvolution(currentStep) {
  return currentStep.evolves_to?.[0] || null;
}

async function loadEvolutionChain(pokemon) {
  const response = await fetch(pokemon.species.url);
  const data = await response.json();
  return fetchEvolutionChain(data.evolution_chain.url);
}

async function fetchEvolutionChain(chainUrl) {
  try {
    const response = await fetch(chainUrl);
    const chainData = await response.json();
    const chain = [];
    let currentStep = chainData.chain;
    while (currentStep) {
      chain.push(getPokemonEvolutionData(currentStep));
      currentStep = getNextEvolution(currentStep);
    }
    return chain;
  } catch (error) {
    console.error('Fehler beim Laden der Entwicklungskette:', error);
    return null;
  }
}

async function preparePokemon(pokemon) {
  try {
    const speciesResponse = await fetch(pokemon.species.url);
    const speciesData = await speciesResponse.json();
    const evolutionChain = await fetchEvolutionChain(speciesData.evolution_chain.url);
    pokemon.evolutionChain = evolutionChain || [];
    return pokemon;
  } catch (error) {
    console.error('Fehler beim Laden der Evolution:', error);
    pokemon.evolutionChain = [];
    return pokemon;
  }
}

async function waitForLoadingScreen(startTime) {
  const remainingTime = Math.max(0, 1000 - (Date.now() - startTime));
  await new Promise((resolve) => setTimeout(resolve, remainingTime));
}

async function loadAndOpenPokemon(pokemon, showLoading = true) {
  const needsLoading = !pokemon.evolutionChain;
  const shouldShowLoader = needsLoading && showLoading;
  const startTime = Date.now();
  try {
    if (shouldShowLoader) loadingScreen.classList.add('active');
    if (needsLoading) {
      pokemon.evolutionChain = await loadEvolutionChain(pokemon);
      if (shouldShowLoader) await waitForLoadingScreen(startTime);
    }
  } catch (error) {
    console.error('Fehler beim Laden:', error);
  } finally {
    if (shouldShowLoader) loadingScreen.classList.remove('active');
  }
  openDialog(pokemon);
}

loadMorePokemons.addEventListener('click', () => {
  loadNextPokemon(limit);
});
