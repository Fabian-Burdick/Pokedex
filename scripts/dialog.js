let currentPokemon = null;
const dialogRef = document.getElementById('pokemonDialog');

function renderPokemonDesktopDialog(pokemon) {
  const dialogContent = document.getElementById('dialogContent');
  const pokemonImg = pokemon.sprites?.other?.['official-artwork']?.front_default || pokemon.sprites?.front_default || '';
  const primaryType = pokemon.types?.[0]?.type?.name || 'normal';
  const isMobile = window.matchMedia('(max-width: 767px)').matches;
  if (isMobile) {
    dialogContent.innerHTML = PokemonMobileDialogTemplate(pokemon, pokemonImg, primaryType);
    dialogRef.className = 'mobile-view';
  } else {
    dialogContent.innerHTML = PokemonDesktopDialogTemplate(pokemon, pokemonImg, primaryType);
    dialogRef.className = 'desktop-view';
  }
}

function openDialog(pokemon) {
  try {
    currentPokemon = pokemon;
    renderPokemonDesktopDialog(pokemon);
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
window.matchMedia('(max-width: 767px)').addEventListener('change', () => {
  if (dialogRef.open && currentPokemon) {
    renderPokemonDesktopDialog(currentPokemon);
  }
});

function renderPokemonMobileDialog(pokemon) {
  const dialogContent = document.getElementById('dialogContent');
  const pokemonImg = pokemon.sprites?.other?.['official-artwork']?.front_default || pokemon.sprites?.front_default || '';
  const primaryType = pokemon.types?.[0]?.type?.name || 'normal';
  const isMobile = window.matchMedia('(max-width: 767px)').matches;

  if (isMobile) {
    dialogContent.innerHTML = PokemonMobileDialogTemplate(pokemon, pokemonImg, primaryType);
  } else {
    dialogContent.innerHTML = PokemonDesktopDialogTemplate(pokemon, pokemonImg, primaryType);
  }
}

function updateProgressBar() {
  let percent = (currentQuestion + 1) / questions.length;
  percent = Math.round(percent * 100);
  document.getElementById('progressBar').innerHTML = `${percent}%`;
  document.getElementById('progressBar').style.width = `${percent}%`;
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

let currentMobilePage = 0;

function changeMobilePage(direction) {
  const pages = document.querySelectorAll('.mobile-page');
  const dots = document.querySelectorAll('.mobile-page-indicator span');
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
