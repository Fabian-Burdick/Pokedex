const dialogRef = document.getElementById('pokemonDialog');

// function openDialog(pokemon) {
//   const dialogContent = document.getElementById('dialogContent');
//   const pokemonImg = pokemon.sprites.other['official-artwork'].front_default || pokemon.sprites.front_default;
//   const primaryType = pokemon.types && pokemon.types[0] ? pokemon.types[0].type.name : 'normal';

//   dialogContent.innerHTML = PokemonDialogTemplate(pokemon, pokemonImg, primaryType);
//   dialogRef.showModal();
// }

function openDialog(pokemon) {
  const dialogContent = document.getElementById('dialogContent');

  const pokemonImg = pokemon.sprites.other['official-artwork'].front_default || pokemon.sprites.front_default;
  const primaryType = pokemon.types && pokemon.types[0] ? pokemon.types[0].type.name : 'normal';

  // 1. Das Template befüllen
  dialogContent.innerHTML = PokemonDialogTemplate(pokemon, pokemonImg, primaryType);

  // 2. SCHNELLE LÖSUNG FÜR DIE HINGRUNDFARBE:
  // Wir setzen die Klassen des Dialogs zurück, behalten aber 'pokemonDialog' (falls du es im CSS nutzt)
  dialogRef.className = '';
  // Jetzt fügen wir die dynamische Farb-Klasse hinzu
  dialogRef.classList.add(getPokemonColorClass(primaryType));

  // 3. Dialog öffnen
  dialogRef.showModal();
}

function closeDialog() {
  dialogRef.close();
}
