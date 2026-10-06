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
