const pokedex = document.getElementById('pokedex');
const pokeCache = {};
const fetchPokemon = async () => {
    const url = `https://pokeapi.co/api/v2/pokemon?limit=150`;
    const res = await fetch(url);
    const data = await res.json();
    const pokemon = data.results.map( (result, index) =>({
        ... result,
        id: index + 1,
        image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${index + 1}.png`,
        apiURL: result.url
    }));
    console.log(pokemon)
    displayPokemon(pokemon);
};

const displayPokemon = (pokemon) => {
    const pokemonHTMLString = pokemon
        .map(
            (pokeman) => `
        <li class="card" onclick="selectPokemon(${
            pokeman.id})">
            <img class="card-image" src="${pokeman.image}"/>
            <h2 class="card-title">${pokeman.id}. ${pokeman.name}</h2>
        </li>
    `
        )
        .join('');
    pokedex.innerHTML = pokemonHTMLString;
};

const selectPokemon = async (id) => {
    if(!pokeCache[id]){
        const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
        const res = await fetch(url);
        const pkmn = await res.json();
        pokeCache[id] = pkmn;
        displayPopup(pkmn);
    }
    else{
        displayPopup(pokeCache[id]);
    } 
    
};

const displayPopup = (pkmn) => {
    const type = pkmn.types.map((type) =>
    type.type.name).join(', ');
    const image = pkmn.sprites['front_default'];
    const htmlString =
    `
    <div class="popup">
        <button id="closeBtn" onclick="closePopup()
        ">Close</button>
        <div class="card">
            <img class="card-image" src="${image}"/>
            <h2 class="card-title">${pkmn.id}. ${pkmn.name}</h2>
            <p><small>Height: </small>${pkmn.height} | <small>Weight: </small>${pkmn.weight} | <small>
            <small>Type: </small>${type}
        </div>
    </div>`;
    
    pokedex.innerHTML = pokedex.innerHTML + htmlString;
};

const closePopup = () => {
    const popup = document.querySelector('.popup');
    popup.parentElement.removeChild(popup);
}

fetchPokemon();

