// Container aus deiner index.html auswählen
const container = document.getElementById('pokeCards');

// Funktion, um die Daten aus deiner lokalen JSON-Datei zu laden
async function loadPokemonFromJSON() {
  try {
    // Pfad zu deiner pokemon.json (relativ von der index.html aus gesehen)
    const response = await fetch('./database/pokemon.json');
    const pokemonList = await response.json();

    // Durch die Liste aus der JSON laufen
    for (const pokemon of pokemonList) {
      // Da in deiner JSON nur Name und die API-URL stehen,
      // holen wir uns hier die Details (wie Bilder und Typen) live aus dem Web
      const detailResponse = await fetch(pokemon.url);
      const pokemonDetails = await detailResponse.json();

      // Karte erstellen und anzeigen
      createCard(pokemonDetails);
    }
  } catch (error) {
    console.error('Fehler beim Laden der lokalen JSON-Daten:', error);
  }
}

// Funktion, die die HTML-Karten generiert
function createCard(pokemon) {
  const card = document.createElement('div');
  card.classList.add('pokemon-card');

  // Typen bestimmen
  const primaryType = pokemon.types[0].type.name;

  // Farben basierend auf deinem Design zuweisen
  const typeColors = {
    grass: 'bg-green',
    bug: 'bg-green2',
    water: 'bg-blue',
    fire: 'bg-red',
    electric: 'bg-yellow',
    psychic: 'bg-purple',
    poison: 'bg-purple',
    fairy: 'bg-rose',
    ground: 'bg-brown',
    rock: 'bg-brownorange',
    fighting: 'bg-rost',
    ghost: 'bg-lila',
    ice: 'bg-lightblue',
    dragon: 'bg-darkblue',
    steel: 'bg-grey',
    dark: 'bg-darkbrown',
  };

  // 2. Die Klasse in nur einer Zeile ermitteln und hinzufügen!
  card.classList.add(typeColors[primaryType] || 'bg-default');

  // Karte mit offiziellem Bild und Name befüllen
  card.innerHTML = `
    <img src="${pokemon.sprites.other['official-artwork'].front_default}" alt="${pokemon.name}">
    <h3>${pokemon.name.toUpperCase()}</h3>
    <span class="type-badge">${primaryType}</span>
  `;

  container.appendChild(card);
}

// Funktion direkt beim Laden ausführen
// (Da du vermutlich 'defer' nutzt oder das Script unten eingebunden hast)
loadPokemonFromJSON();
