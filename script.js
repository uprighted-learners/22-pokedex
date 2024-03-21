const searchInput = document.getElementById('pokemon-search');
const searchButton = document.getElementById('search-button');
const pokemonInfo = document.getElementById('pokemon-info');

searchButton.addEventListener('click', () => {
    const pokemonName = searchInput.value.toLowerCase();
    console.log(pokemonName);
    fetchPokemon(pokemonName);
});

async function fetchPokemon(data) {
    const url = `https://pokeapi.co/api/v2/pokemon/${data}`;

    if (data === '') {
        throw new Error('Please enter a valid pokemon name');
    }

    try {
        const response = await fetch(url);
        const pokemon = await response.json();
        console.log("POKEMON DATA:", pokemon);
        displayPokemon(pokemon);
    } catch (error) {
        console.log(error);
        pokemonInfo.innerHTML = `<h2>Pokemon not found</h2>`;
    }
}

function displayPokemon(pokemon) {
    const pokemonName = pokemon.name;
    const pokemonImage = pokemon.sprites.front_shiny;
    const pokemonType = pokemon.types.map(type => type.type.name).join(' | ');

    pokemonInfo.innerHTML = `
        <h2>Name: ${pokemonName}</h2>
        <img src="${pokemonImage}" alt="${pokemonName}">
        <p>Type: ${pokemonType}</p>
    `;
}

function displayAllPokemon() {
    const url = `https://pokeapi.co/api/v2/pokemon/`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            const allPokemon = data.results;
            console.log(allPokemon);
            allPokemon.forEach(pokemon => {
                const pokemonName = pokemon.name;
                const pokemonUrl = pokemon.url;
                const pokemonListItem = document.createElement('li');
                pokemonListItem.innerHTML = `
                    <a href="${pokemonUrl}" target="_blank">${pokemonName}</a>
                `;
                document.getElementById('all-the-pokemon').appendChild(pokemonListItem);
            });
        })
        .catch(error => console.log(error));
}

displayAllPokemon();