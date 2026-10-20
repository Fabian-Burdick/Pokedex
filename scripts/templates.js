function PokemonCardsTemplate(pokemon, pokemonImg, typeIconUrl, primaryType) {
  return `
        <h3>${pokemon.name}</h3>
        <img src="${pokemonImg}" alt="${pokemon.name}">
        <div>
            <img class="type-icon" 
                 src="${typeIconUrl}" 
                 alt="${primaryType}" 
                 title="${primaryType.toUpperCase()}">
        </div>
    `;
}

function PokemonDialogTemplate(pokemon, pokemonImg, primaryType) {
  return `
    <div class="dialog-header">
      <button class="close-button" onclick="previousPokemonBtn(${pokemon.id})"><</button>
      <button class="close-button" onclick="closeDialog()">X</button>
      <button class="close-button" onclick="nextPokemonBtn(${pokemon.id})">></button>
    </div>
    <div class="pokemon-info">
       <div class="pokemon-typ-container">
         <h1># ${pokemon.id} </h1>
         <h1>${pokemon.name.toUpperCase()}</h1>
         <img src="${pokemonImg}" alt="${pokemon.name}" ${getPokemonColorClass()}>
         <div class="pokemon-typ">
           ${PokemonTypesTemplate(pokemon.types)}
         </div>    
       </div>
       <div class="pokemon-stats-container">
         <h1>Basis-Stats</h1>
         <div class="pokemon-stats">
           ${PokemonStatsTemplate(pokemon.stats)}
         </div>
         <h1>Entwicklungen</h1>
         <div class="pokemon-evolution-chain">
           ${PokemonEvolutionTemplate(pokemon.evolutionChain, pokemon.name)}
         </div>
       </div> 
    </div>
  `;
}

function PokemonTypesTemplate(types) {
  return types
    .map(
      (t) => `
      <h3 class="type-text ${getPokemonColorClass(t.type.name)}">
        ${t.type.name}
      </h3>`,
    )
    .join('');
}

function PokemonStatsTemplate(stats) {
  return stats
    .map((s) => {
      const percent = (s.base_stat / 255) * 100;
      return `
      <div class="stats-bar">
        <p class="stat-name">${s.stat.name.toUpperCase()}</p>
        <div class="stat-bar-container">
          <div class="stat-bar-fill" style="width: ${percent}%;">
            <span class="stat-number">${s.base_stat}</span>
          </div>
        </div>
      </div>`;
    })
    .join('');
}

function PokemonEvolutionTemplate(evolutionChain, currentPokemonName) {
  // Sicherheitsabfrage: Wenn keine Kette vorhanden oder das Array leer ist
  if (!evolutionChain || !Array.isArray(evolutionChain) || evolutionChain.length <= 1) {
    return `<p class="no-evolution">Dieses Pokémon hat keine Entwicklungen.</p>`;
  }

  return evolutionChain
    .map((p) => {
      // Fehlerschutz: Falls 'p' oder 'p.name' unerwartet undefined ist
      if (!p || !p.name) return '';

      // Vergleicht den Namen des aktuellen Pokémon mit dem Schritt in der Evolution-Kette
      const isCurrent = p.name.toLowerCase() === currentPokemonName.toLowerCase() ? 'active-evolution' : '';

      // Ersten Buchstaben groß schreiben für eine schönere Optik
      const formattedName = p.name.charAt(0).toUpperCase() + p.name.slice(1);

      return `<span class="evolution-step ${isCurrent}">${formattedName}</span>`;
    })
    .filter((html) => html !== '') // Entfernt leere Einträge, falls Daten fehlerhaft waren
    .join(' <span class="evolution-arrow">➔</span> ');
}
