let currentPokemon = null;
const dialogRef = document.getElementById('pokemonDialog');

function renderPokemonDialog(pokemon) {
  const dialogContent = document.getElementById('dialogContent');
  const { pokemonImg, primaryType, isMobile } = getPokemonDialogData(pokemon);

  return (dialogContent.innerHTML = isMobile
    ? PokemonMobileDialogTemplate(pokemon, pokemonImg, primaryType)
    : PokemonDesktopDialogTemplate(pokemon, pokemonImg, primaryType));
}

function openDialog(pokemon) {
  try {
    currentPokemon = pokemon;
    renderPokemonDialog(pokemon);
    if (!dialogRef.open) {
      dialogRef.showModal();
    }
  } catch (error) {
    console.error('Fehler beim Öffnen:', error);
  }
}

function closeDialog() {
  dialogRef.close();
}

function nextPokemonBtn(id) {
  const currentIndex = filteredPokemons.findIndex((p) => p.id === id);

  if (currentIndex >= 0 && currentIndex < filteredPokemons.length - 1) {
    const nextPokemon = filteredPokemons[currentIndex + 1];

    loadAndOpenPokemon(nextPokemon, false);
  }
}

function previousPokemonBtn(id) {
  const currentIndex = filteredPokemons.findIndex((p) => p.id === id);
  if (currentIndex > 0) {
    const previousPokemon = filteredPokemons[currentIndex - 1];

    loadAndOpenPokemon(previousPokemon, false);
  }
}

function getPokemonDialogData(pokemon) {
  return {
    pokemonImg: pokemon.sprites?.other?.['official-artwork']?.front_default || pokemon.sprites?.front_default || '',
    primaryType: pokemon.types?.[0]?.type?.name || 'normal',
    isMobile: window.matchMedia('(max-width: 767px)').matches,
  };
}

function calculateStatPercent(baseStat) {
  return Math.min((baseStat / 255) * 100, 100);
}

function updateStatsBar() {
  let percent = (currentQuestion + 1) / questions.length;
  percent = Math.round(percent * 100);
  document.getElementById('progressBar').innerHTML = `${percent}%`;
  document.getElementById('progressBar').style.width = `${percent}%`;
}

function filterEvolutionChain(evolutionChain) {
  return evolutionChain.filter((p) => p && p.name);
}

function isCurrentPokemon(pokemonName, currentPokemonName) {
  return pokemonName.toLowerCase() === currentPokemonName.toLowerCase() ? 'active-evolution' : '';
}

function formatPokemonName(name) {
  return name.charAt(0).toUpperCase() + name.slice(1);
}

function changeMobilePage(direction) {
  const pages = document.querySelectorAll('.mobile-page');
  const dots = document.querySelectorAll('.mobile-page-indicator span');
  if (pages.length === 0) return;
  currentMobilePage += direction;
  if (currentMobilePage < 0) {
    currentMobilePage = pages.length - 1;
  }
  if (currentMobilePage >= pages.length) {
    currentMobilePage = 0;
  }
  pages.forEach((page, index) => {
    page.classList.toggle('active-page', index === currentMobilePage);
  });
  dots.forEach((dot, index) => {
    dot.classList.toggle('active-dot', index === currentMobilePage);
  });
}

window.matchMedia('(max-width: 767px)').addEventListener('change', () => {
  if (dialogRef.open && currentPokemon) {
    currentMobilePage = 0;
    renderPokemonDialog(currentPokemon);
  }
});

let currentMobilePage = 0;
