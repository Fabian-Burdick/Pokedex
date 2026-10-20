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
