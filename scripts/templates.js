function PokemonCardsTemplate(pokemon, pokemonImg) {
  return `
    <h3>${pokemon.name}</h3>
    <img src="${pokemonImg}" alt="${pokemon.name}">
    <div class="types-container">
      ${pokemon.types
        .map((t) => {
          const typeName = t.type.name;
          return `
            <img
              class="type-icon ${getPokemonColorClass(typeName)}"
              src="assets/icons/${typeName}.webp"
              alt="${typeName}"
              title="${typeName.toUpperCase()}"
            >
          `;
        })
        .join('')}
    </div>
  `;
}
function PokemonDesktopDialogTemplate(pokemon, pokemonImg, primaryType) {
  return `
    <div class="desktop-dialog">
        <div class="dialog-header">
            <button class="prev-button" onclick="previousPokemonBtn(${pokemon.id})">➔</button>
            <button class="close-button" onclick="closeDialog()">X</button>
            <button class="next-button" onclick="nextPokemonBtn(${pokemon.id})">➔</button>
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
    <div class="mobile-dialog-header">
        <button class="prev-button" onclick="previousPokemonBtn(${pokemon.id})">➔</button>
        <button class="close-button" onclick="closeDialog()">X</button>
        <button class="next-button" onclick="nextPokemonBtn(${pokemon.id})">➔</button>
    </div>
    <div class="mobile-dialog">
            <div class="mobile-page active-page">
            <h1> #${pokemon.id}<br>${pokemon.name.toUpperCase()}</h1>
                <img class="pokemon-img height" src="${pokemonImg}" alt="${pokemon.name}" />
                <div class="pokemon-typ">${PokemonTypesTemplate(pokemon.types)}</div>
            </div>

            <div class="mobile-page">
                <h4>Basis-Stats</h4>
                <div class="pokemon-stats">${PokemonStatsTemplate(pokemon.stats)}</div>
                <h2>Weitere Informationen</h2>
                <p class="pokemon-hw">Größe: ${pokemon.height / 10} m</p>
                <p class="pokemon-hw">Gewicht: ${pokemon.weight / 10} kg</p>
            </div>

            <div class="mobile-page">
                <h4>Entwicklungen</h4>
                <div class="pokemon-evolution-container">${PokemonEvolutionTemplate(pokemon.evolutionChain, pokemon.name)}</div>
            </div>
    </div>
        <div class="mobile-dialog-footer">
            <button onclick="changeMobilePage(-1)" class="mobile-nav-button">❮</button>
            <div class="mobile-page-indicator">
                <span class="active-dot"></span>
                <span></span>
                <span></span>
            </div>
            <button onclick="changeMobilePage(1)" class="mobile-nav-button">❯</button>
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
      return `
                <div class="stats-bar">
                    <p class="stat-name">${s.stat.name.toUpperCase()}</p>
                    <div class="stat-bar-container">
                        <div class="stat-bar-fill" style="width: ${calculateStatPercent(s.base_stat)}%;">
                            <span class="stat-number">${s.base_stat}</span>
                        </div>
                    </div>
                </div>
            `;
    })
    .join('');
}

function PokemonEvolutionTemplate(evolutionChain, currentPokemonName) {
  return `
        ${
          evolutionChain.length <= 1
            ? `<p class="no-evolution">Dieses Pokémon hat keine Entwicklungen.</p>`
            : filterEvolutionChain(evolutionChain)
                .map(
                  (p) => `
                <div class="evolution-step ${isCurrentPokemon(p.name, currentPokemonName)}">
                    <img class="evolution-img" src="${p.image}" alt="${p.name}">
                    <h2>${formatPokemonName(p.name)}</h2>
                </div>
            `,
                )
                .join(' <span class="evolution-arrow">➔</span> ')
        }
    `;
}
