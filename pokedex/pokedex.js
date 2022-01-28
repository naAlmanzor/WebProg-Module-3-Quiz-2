const pokedex = document.getElementById('pokedex');
const pokeCache = {};

const fetchPokemon = async () => {
    const url = `https://pokeapi.co/api/v2/pokemon?limit=493`;
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
            <h2>#${pkmn.id}</h2>
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
    const htmlString =
    `
    <div class="popup" onclick="closePopup()">
        <div>
            
            <div id="card" class="card">
                <div>
                    <img id=img class="card-image" src="${frontImage}"/>
                </div>
                <h2 id="pkmnName" class="card-desc">${pkmn.name}</h2>

                <span id="type1" class="card-desc">${type[0]}</span>
                <span id="type2" class="card-desc">${type[1]}</span>
               
                           
                <h2 id="abilities" class="card-desc">Abilities: <br>${abilities}</br></h2>
            
            </div>
        </div>
    </div>`;
    
    pokedex.innerHTML = pokedex.innerHTML + htmlString;

    const abilitiesDesc = document.getElementById("abilities")
    abilitiesDesc.style.fontSize = "15px"

    const img = document.getElementById("img")
    img.style.background = "none";


    const type1 = document.getElementById("type1")
    type1.style.color = "white";
    type1.style.borderRadius = '30px';
    type1.style.padding= '5px 30px'

    const type2 = document.getElementById("type2")
    type2.style.color = "white";
    type2.style.borderRadius = '30px';
    type2.style.padding= '5px 30px'

    if (type[1] == null){
        type2.style.display = "none"
    }

    const pkmnName = document.getElementById("pkmnName")
    pkmnName.style.borderRadius = '30px';

    const card = document.getElementById("card")

    function type1Color(){
        switch(type[0]){
            case 'normal':
                type1.style.backgroundColor = '#b7b0a6';
                card.style.background = 'radial-gradient(circle at 50% -25%, #b7b0a6 36%, #ffffff 36%'
                break;
            case 'fire':
                type1.style.backgroundColor = '#ec5007';
                card.style.background = 'radial-gradient(circle at 50% -25%, #ec5007 36%, #ffffff 36%'
                break;
            case 'water':
                type1.style.backgroundColor = '#308CD5';
                card.style.background = 'radial-gradient(circle at 50% -25%, #308CD5 36%, #ffffff 36%'
                break;
            case 'grass':
                type1.style.backgroundColor = '#62ab24';
                card.style.background = 'radial-gradient(circle at 50% -25%, #62ab24 36%, #ffffff 36%'
                break;
            case 'electric':
                type1.style.backgroundColor = '#fdc51a';
                card.style.background = 'radial-gradient(circle at 50% -25%, #fdc51a 36%, #ffffff 36%'
                break;
            case 'ice':
                type1.style.backgroundColor = '#48b3d8';
                card.style.background = 'radial-gradient(circle at 50% -25%, #48b3d8 36%, #ffffff 36%'
                break;
            case 'fighting':
                type1.style.backgroundColor = 'brown';
                card.style.background = 'radial-gradient(circle at 50% -25%, brown 36%, #ffffff 36%'
                break;
            case 'poison':
                type1.style.backgroundColor = '#8C248f';
                card.style.background = 'radial-gradient(circle at 50% -25%, #8C248f 36%, #ffffff 36%'
                break;
            case 'ground':
                type1.style.backgroundColor = 'burlywood';
                card.style.background = 'radial-gradient(circle at 50% -25%, burlywood 36%, #ffffff 36%'
                break;
            case 'flying':
                type1.style.backgroundColor = '#708bdc';
                card.style.background = 'radial-gradient(circle at 50% -25%, #708bdc 36%, #ffffff 36%'
                break;
            case 'psychic':
                type1.style.backgroundColor = '#e9447E';
                card.style.background = 'radial-gradient(circle at 50% -25%, #e9447E 36%, #ffffff 36%'
                break;
            case 'bug':
                type1.style.backgroundColor = '#a3ab17';
                card.style.background = 'radial-gradient(circle at 50% -25%, #a3ab17 36%, #ffffff 36%'
                break;
            case 'rock':
                type1.style.backgroundColor = '#94804d';
                card.style.background = 'radial-gradient(circle at 50% -25%, #94804d 36%, #ffffff 36%'
                break;
            case 'ghost':
                type1.style.backgroundColor = '#585ca7';
                card.style.background = 'radial-gradient(circle at 50% -25%, #585ca7 36%, #ffffff 36%'
                break;
            case 'steel':
                type1.style.backgroundColor = '#858594';
                card.style.background = 'radial-gradient(circle at 50% -25%, #858594 36%, #ffffff 36%'
                break;
            case 'dark':
                type1.style.backgroundColor = '#534133';
                card.style.background = 'radial-gradient(circle at 50% -25%, #534133 36%, #ffffff 36%'
                break;
            case 'dragon':
                type1.style.backgroundColor = '#8170e4';
                card.style.background = 'radial-gradient(circle at 50% -25%, #8170e4 36%, #ffffff 36%'
                break;
            case 'fairy':
                type1.style.backgroundColor = '#ff6486';
                card.style.background = 'radial-gradient(circle at 50% -25%, #ff6486 36%, #ffffff 36%'
                break;
        }
    }
    type1Color()

    function type2Color(){
        switch (type[1]) {
            case 'normal':
                type2.style.backgroundColor = '#b7b0a6';
                break;
            case 'fire':
                type2.style.backgroundColor = '#ec5007';
                break;
            case 'water':
                type2.style.backgroundColor = '#308CD5';
                break;
            case 'grass':
                type2.style.backgroundColor = '#62ab24';
                break;
            case 'electric':
                type2.style.backgroundColor = '#fdc51a';
                break;
            case 'ice':
                type2.style.backgroundColor = '#48b3d8';
                break;
            case 'fighting':
                type2.style.backgroundColor = 'brown';
                break;
            case 'poison':
                type2.style.backgroundColor = '#8C248f';
                break;
            case 'ground':
                type2.style.backgroundColor = 'burlywood';
                break;
            case 'flying':
                type2.style.backgroundColor = '#708bdc';
                break;
            case 'psychic':
                type2.style.backgroundColor = '#e9447E';
                break;
            case 'bug':
                type2.style.backgroundColor = '#a3ab17';
                break;
            case 'rock':
                type2.style.backgroundColor = '#94804d';
                break;
            case 'ghost':
                type2.style.backgroundColor = '#585ca7';
                break;
            case 'steel':
                type2.style.backgroundColor = '#858594';
                break;
            case 'dark':
                type2.style.backgroundColor = '#534133';
                break;
            case 'dragon':
                type2.style.backgroundColor = '#8170e4';
                break;
            case 'fairy':
                type2.style.backgroundColor = '#ff6486';
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

