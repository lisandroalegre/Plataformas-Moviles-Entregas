let offset = 0;
const limit = 20;

document.addEventListener("DOMContentLoaded", () => {
    loadPokemons();

    document.getElementById("loadMoreBtn").addEventListener("click", () => {
        loadPokemons();
    });
});

function loadPokemons() {
    document.getElementById("loading").style.display = "block";

    fetch(`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`)
        .then(response => response.json())
        .then(data => {
            displayPokemons(data.results);
            offset += limit;
            document.getElementById("loading").style.display = "none";
        });
}

function displayPokemons(pokemons) {
    const pokedex = document.getElementById("pokedex");

    pokemons.forEach(pokemon => {
        fetch(pokemon.url)
            .then(response => response.json())
            .then(pokemonData => {
                const pokemonCard = createPokemonCard(pokemonData);
                pokedex.appendChild(pokemonCard);
            });
    });
}

function createPokemonCard(pokemon) {
    const card = document.createElement("div");
    card.className = "card col-sm-6 col-md-4 col-lg-3";

    const cardBody = document.createElement("div");
    cardBody.className = "card-body";

    const img = document.createElement("img");
    img.src = pokemon.sprites.front_default;
    img.className = "card-img-top";
    img.alt = pokemon.name;

    const cardTitle = document.createElement("h5");
    cardTitle.className = "card-title";
    cardTitle.innerText = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);

    const cardText = document.createElement("p");
    cardText.className = "card-text";
    cardText.innerText = `Type: ${pokemon.types.map(type => type.type.name).join(", ")}`;

    const moreInfoBtn = document.createElement("button");
    moreInfoBtn.className = "btn btn-primary";
    moreInfoBtn.innerText = "More Info";
    moreInfoBtn.addEventListener("click", () => showMoreInfo(pokemon));

    cardBody.appendChild(img);
    cardBody.appendChild(cardTitle);
    cardBody.appendChild(cardText);
    cardBody.appendChild(moreInfoBtn);
    card.appendChild(cardBody);

    return card;
}

function showMoreInfo(pokemon) {
    alert(`Name: ${pokemon.name}\nTypes: ${pokemon.types.map(type => type.type.name).join(", ")}\nAbilities: ${pokemon.abilities.map(ability => ability.ability.name).join(", ")}\nMoves: ${pokemon.moves.slice(0, 4).map(move => move.move.name).join(", ")}`);
}



