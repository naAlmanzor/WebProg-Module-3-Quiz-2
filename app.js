const pokedex = document.getElementById('pokedex');
const pokeCache = {};

const fetchPokemon = async () => {
    const url = `https://pokeapi.co/api/v2/pokemon?limit=151`;
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
            (pkmn) => `
        <li id="pokemon" class="card" onclick="selectPokemon(${
            pkmn.id})">
            <img class="card-image" src="${pkmn.image}"/>
           
            <h2 class="card-desc">${pkmn.name}</h2>
        </li>`
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
    type.type.name);
    const abilities = pkmn.abilities.map((ability) =>
    ability.ability.name). join(" / ");

    let pkmnId;

    if(pkmn.id < 10){
        pkmnId = "#00"+pkmn.id
    }

    if(pkmn.id > 10 && pkmn.id < 100){
        pkmnId = "#0"+pkmn.id
    }

    if(pkmn.id >= 100){
        pkmnId = "#"+pkmn.id
    }

    const frontImage = pkmn.sprites['front_default'];
    const backImage = pkmn.sprites['back_default'];
    const htmlString =
    `
    <div class="popup" onclick="closePopup()">
        <div>
            
            <div id="card" class="card">
                <h2 id="pkmnName" class="card-desc">${pkmn.name}</h2>
                <div>
                    <img id=img class="card-image" src="${frontImage}"/>
                </div>
               
                <span id="type1" class="card-desc">${type[0]}</span>
                <span id="type2" class="card-desc">${type[1]}</span>
               
                           
                <h2 class="card-desc">Abilities: <br>${abilities}</br></h2>
            
            </div>
        </div>
    </div>`;
    
    pokedex.innerHTML = pokedex.innerHTML + htmlString;

    const img = document.getElementById("img")
    img.style.height='200px';
    img.style.padding = "30px 10vh";
    // img.style.backgroundColor = "white";
    img.style.marginBottom = "20px";
    img.style.borderRadius = "40px";


    const type1 = document.getElementById("type1")
    type1.style.color = "white";
    type1.style.borderRadius = '30px';    

    const type2 = document.getElementById("type2")
    type2.style.color = "white";
    type2.style.borderRadius = '30px';

    if (type[1] == null){
        type2.style.display = "none"
    }

    const pkmnName = document.getElementById("pkmnName")
    pkmnName.style.background = "black";
    pkmnName.style.color = 'white'; 
    pkmnName.style.borderRadius = '30px';

    const card = document.getElementById("card")

    function type1Color(){
        switch(type[0]){
            case 'normal':
                type1.style.backgroundColor = 'lightgray';
                break;
            case 'fire':
                type1.style.backgroundColor = 'red';
                break;
            case 'water':
                type1.style.backgroundColor = 'blue';
                break;
            case 'grass':
                type1.style.backgroundColor = 'green';
                card.style.border = "solid limegreen 20px";
                break;
            case 'electric':
                type1.style.backgroundColor = 'yellow';
                break;
            case 'ice':
                type1.style.backgroundColor = 'aliceblue';
                break;
            case 'fighting':
                type1.style.backgroundColor = 'brown';
                break;
            case 'poison':
                type1.style.backgroundColor = 'purple';
                break;
            case 'ground':
                type1.style.backgroundColor = 'burlywood';
                break;
            case 'flying':
                type1.style.backgroundColor = 'lightcyan';
                break;
            case 'psychic':
                type1.style.backgroundColor = 'magenta';
                break;
            case 'bug':
                type1.style.backgroundColor = 'yellowgreen';
                break;
            case 'rock':
                type1.style.backgroundColor = 'tan';
                break;
            case 'ghost':
                type1.style.backgroundColor = 'indigo';
                break;
            case 'steel':
                type1.style.backgroundColor = 'silver';
                break;
            case 'dark':
                type1.style.backgroundColor = 'darkgrey';
                break;
            case 'dragon':
                type1.style.backgroundColor = 'cornflowerblue';
                break;
            case 'fairy':
                type1.style.backgroundColor = 'pink';
                break;
        }
    }
    type1Color()

    function type2Color(){
        switch(type[1]){
            case 'normal':
                type2.style.backgroundColor = 'lightgray';
                break;
            case 'fire':
                type2.style.backgroundColor = 'red';
                break;
            case 'water':
                type2.style.backgroundColor = 'blue';
                break;
            case 'grass':
                type2.style.backgroundColor = 'green';
                break;
            case 'electric':
                type2.style.backgroundColor = 'yellow';
                break;
            case 'ice':
                type2.style.backgroundColor = 'aliceblue';
                break;
            case 'fighting':
                type2.style.backgroundColor = 'brown';
                break;
            case 'poison':
                type2.style.backgroundColor = 'purple';
                break;
            case 'ground':
                type2.style.backgroundColor = 'burlywood';
                break;
            case 'flying':
                type2.style.backgroundColor = 'lightcyan';
                break;
            case 'psychic':
                type2.style.backgroundColor = 'magenta';
                break;
            case 'bug':
                type2.style.backgroundColor = 'yellowgreen';
                break;
            case 'rock':
                type2.style.backgroundColor = 'tan';
                break;
            case 'ghost':
                type2.style.backgroundColor = 'indigo';
                break;
            case 'steel':
                type2.style.backgroundColor = 'silver';
                break;
            case 'dark':
                type2.style.backgroundColor = 'darkgrey';
                break;
            case 'dragon':
                type2.style.backgroundColor = 'cornflowerblue';
                break;
            case 'fairy':
                type2.style.backgroundColor = 'pink';
                break;
        }
    }
    type2Color()
};

const closePopup = () => {
    const popup = document.querySelector('.popup');
    popup.parentElement.removeChild(popup);
} 

function changeColor(){
    
}

fetchPokemon();

