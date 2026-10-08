const dialogRef = document.getElementById('pokemonDialog');

function openDialog(pokemon) {
  const dialogContent = document.getElementById('dialogContent');
  const pokemonImg = pokemon.sprites.other['official-artwork'].front_default || pokemon.sprites.front_default;
  const primaryType = pokemon.types && pokemon.types[0] ? pokemon.types[0].type.name : 'normal';

  dialogContent.innerHTML = PokemonDialogTemplate(pokemon, pokemonImg, primaryType);
  dialogRef.className = '';
  dialogRef.classList.add(getPokemonColorClass(primaryType));
  dialogRef.showModal();
}

function closeDialog() {
  dialogRef.close();
}
