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
    <div class="dialog-content">
      <button class="close-button" onclick="closeDialog()">X</button>
      <div class="dialog-header">
        <h2>#${pokemon.id} ${pokemon.name.toUpperCase()}</h2>
      </div>
      <div class="dialog-body">
        <img src="${pokemonImg}" alt="${pokemon.name}" class="dialog-img">
        <div class="pokemon-types">
          ${pokemon.types
            .map(
              (t) => `
            <span class="type-badge ${getPokemonColorClass(t.type.name)}">${t.type.name}</span>
          `,
            )
            .join('')}
        </div>
        <div class="pokemon-stats">
          <h3>Basis-Stats</h3>
          ${pokemon.stats
            .map(
              (s) => `
            <div class="stat-row">
              <span class="stat-name">${s.stat.name.toUpperCase()}</span>
              <span class="stat-value">${s.base_stat}</span>
            </div>
          `,
            )
            .join('')}
        </div>
      </div>
    </div>
  `;
}
