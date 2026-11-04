let currentPokemon = null;
const dialogRef = document.getElementById('pokemonDialog');
function renderPokemonDialog(pokemon) {
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
window.matchMedia('(max-width: 767px)').addEventListener('change', () => {
  if (dialogRef.open && currentPokemon) {
    renderPokemonDialog(currentPokemon);
  }
});

function renderPokemonDialog(pokemon) {
  const dialogContent = document.getElementById('dialogContent');

  const pokemonImg = pokemon.sprites?.other?.['official-artwork']?.front_default || pokemon.sprites?.front_default || '';

  const primaryType = pokemon.types?.[0]?.type?.name || 'normal';

  const isMobile = window.matchMedia('(max-width: 767px)').matches;

  if (isMobile) {
    console.log('Rendere Mobil-Ansicht');
    dialogContent.innerHTML = PokemonMobileDialogTemplate(pokemon, pokemonImg, primaryType);
  } else {
    console.log('Rendere Desktop-Ansicht');
    dialogContent.innerHTML = PokemonDesktopDialogTemplate(pokemon, pokemonImg, primaryType);
  }
}

function updateProgressBar() {
  let percent = (currentQuestion + 1) / questions.length;
  percent = Math.round(percent * 100);
  document.getElementById('progressBar').innerHTML = `${percent}%`;
  document.getElementById('progressBar').style.width = `${percent}%`;
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
