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

function PokemonDesktopDialogTemplate(pokemon, pokemonImg, primaryType) {
  return `
    <div class="desktop-dialog">
        <div class="dialog-header">
            <button class="prev-next-button" onclick="previousPokemonBtn(${pokemon.id})">&lt;</button>
            <button class="close-button" onclick="closeDialog()">X</button>
            <button class="prev-next-button" onclick="nextPokemonBtn(${pokemon.id})">&gt;</button>
        </div>
        <div class="pokemon-info">
            <div class="pokemon-typ-container">
                <div class="pokemon-typ-text">
                    <h1># ${pokemon.id}</h1>
                    <h1>${pokemon.name.toUpperCase()}</h1>
                    <img src="${pokemonImg}" alt="${pokemon.name}" />
                </div>
                <div class="pokemon-typ">${PokemonTypesTemplate(pokemon.types)}</div>
            </div>
            <div class="pokemon-info-container">
                <h1>Basis-Stats</h1>
                <div class="pokemon-stats">${PokemonStatsTemplate(pokemon.stats)}</div>
                <h1>Entwicklungen</h1>
                <div class="pokemon-evolution-container">${PokemonEvolutionTemplate(pokemon.evolutionChain, pokemon.name)}</div>
            </div>
        </div>
    </div>
    `;
}

function PokemonMobileDialogTemplate(pokemon, pokemonImg, primaryType) {
  return `
    <div class="mobile-dialog">
        <div class="mobile-dialog-header">
            <button class="close-button" onclick="closeDialog()">X</button>
            <h1>#${pokemon.id} ${pokemon.name.toUpperCase()}</h1>
        </div>
        <div class="mobile-pages">
            <!-- Seite 1 -->
            <div class="mobile-page active-page">
                <h1>Pokémon-Informationen</h1>
                <h1>#${pokemon.id}</h1>
                <h1>${pokemon.name.toUpperCase()}</h1>
                <img class="mobile-pokemon-img" src="${pokemonImg}" alt="${pokemon.name}" />
                <div class="pokemon-typ">${PokemonTypesTemplate(pokemon.types)}</div>
            </div>
            <!-- Seite 2 -->
            <div class="mobile-page">
                <h2>Basis-Stats</h2>
                <div class="pokemon-stats">${PokemonStatsTemplate(pokemon.stats)}</div>
                <h2>Weitere Informationen</h2>
                <p>Größe: ${pokemon.height / 10} m</p>
                <p>Gewicht: ${pokemon.weight / 10} kg</p>
            </div>
            <!-- Seite 3 -->
            <div class="mobile-page">
                <h2>Entwicklungen</h2>
                <div class="pokemon-evolution-container">${PokemonEvolutionTemplate(pokemon.evolutionChain, pokemon.name)}</div>
            </div>
        </div>
        <div class="mobile-navigation">
            <button onclick="changeMobilePage(-1)" class="mobile-nav-button">❮</button>
            <div class="mobile-page-indicator">
                <span class="active-dot"></span>
                <span></span>
                <span></span>
            </div>
            <button onclick="changeMobilePage(1)" class="mobile-nav-button">❯</button>
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
