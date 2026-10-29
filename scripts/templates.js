function PokemonCardsTemplate(pokemon, pokemonImg) {
  const typeIconsHTML = pokemon.types
    .map((t) => {
      const typeName = t.type.name;
      const iconUrl = `assets/icons/${typeName}.webp`;
      return `
        <img class="type-icon ${getPokemonColorClass(typeName)}" 
             src="${iconUrl}" 
             alt="${typeName}" 
             title="${typeName.toUpperCase()}">
      `;
    })
    .join('');

  return `
        <h3>${pokemon.name}</h3>
        <img src="${pokemonImg}" alt="${pokemon.name}">
        <div class="types-container">
            ${typeIconsHTML}
        </div>
  `;
}

function PokemonDialogTemplate(pokemon, pokemonImg, primaryType) {
  return `
    <div class="dialog-header">
      <button class="prev-next-button" onclick="previousPokemonBtn(${pokemon.id})"><</button>
      <button class="close-button" onclick="closeDialog()">X</button>
      <button class="prev-next-button" onclick="nextPokemonBtn(${pokemon.id})">></button>
    </div>
    <div class="pokemon-info">
       <div class="pokemon-typ-container">
         <div class="pokemon-typ-text">
          <h1># ${pokemon.id} </h1>
          <h1>${pokemon.name.toUpperCase()}</h1>
          <img src="${pokemonImg}" alt="${pokemon.name}" class="dialog-id-img">
         </div>
         <div class="pokemon-typ">
           ${PokemonTypesTemplate(pokemon.types)}
         </div>    
       </div>
       <div class="pokemon-info-container">
         <h1>Basis-Stats</h1>
         <div class="pokemon-stats">
           ${PokemonStatsTemplate(pokemon.stats)}
         </div>
         <h1>Entwicklungen</h1>
         <div class="pokemon-evolution-container">
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

function PokemonStatsTemplate(stats, primaryType) {
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
  if (!evolutionChain || !Array.isArray(evolutionChain) || evolutionChain.length <= 1) {
    return `<p class="no-evolution">Dieses Pokémon hat keine Entwicklungen.</p>`;
  }
  return evolutionChain
    .map((p) => {
      if (!p || !p.name) return '';

      const isCurrent = p.name.toLowerCase() === currentPokemonName.toLowerCase() ? 'active-evolution' : '';
      const formattedName = p.name.charAt(0).toUpperCase() + p.name.slice(1);

      return `<div class="evolution-step ${isCurrent}">
          <img class="evolution-img" src="${p.image}" alt="${p.name}">
          <h2>${formattedName}<h2>
        </div>`;
    })
    .filter((html) => html !== '')
    .join(' <span class="evolution-arrow">➔</span> ');
}
