const dialogRef = document.getElementById('pokemonDialog');

function openDialog(pokemon) {
  const dialogContent = document.getElementById('dialogContent');
  const pokemonImg = pokemon.sprites.other['official-artwork'].front_default || pokemon.sprites.front_default;
  const primaryType = pokemon.types && pokemon.types[0] ? pokemon.types[0].type.name : 'normal';

  dialogContent.innerHTML = PokemonDialogTemplate(pokemon, pokemonImg, primaryType);
  dialogRef.className = '';
  dialogRef.showModal();
}

function closeDialog() {
  dialogRef.close();
}

function updateProgressBar() {
  let percent = (currentQuestion + 1) / questions.length;
  percent = Math.round(percent * 100);
  document.getElementById('progressBar').innerHTML = `${percent}%`;
  document.getElementById('progressBar').style.width = `${percent}%`;
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

async function nextPokemonBtn(currentId) {
  const currentIndex = allPokemons.findIndex((p) => p.id === currentId);
  const nextIndex = currentIndex + 1;
  if (nextIndex < allPokemons.length) {
    const nextPokemonStub = allPokemons[nextIndex];
    const detailResponse = await fetch(nextPokemonStub.url);
    const nextPokemonDetails = await detailResponse.json();
    await loadAndOpenPokemon(nextPokemonDetails);
  }
}

async function previousPokemonBtn(currentId) {
  const currentIndex = allPokemons.findIndex((p) => p.id === currentId);
  const prevIndex = currentIndex - 1;
  if (prevIndex >= 0) {
    const prevPokemonStub = allPokemons[prevIndex];
    const detailResponse = await fetch(prevPokemonStub.url);
    const prevPokemonDetails = await detailResponse.json();
    await loadAndOpenPokemon(prevPokemonDetails);
  }
}
