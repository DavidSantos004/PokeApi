//BUSCADOR UNDIVIDUAL

const pokeCard = document.querySelector('[data-poke-card]');
const pokeName = document.querySelector('[data-poke-name]');
const pokeImg = document.querySelector('[data-poke-img]');
const pokeImgContainer = document.querySelector('[data-poke-img-container]');
const pokeId = document.querySelector('[data-poke-id]');
const pokeTypes = document.querySelector('[data-poke-types]');
const pokeStats = document.querySelector('[data-poke-stats]');
const pokeHistory = document.querySelector('[data-poke-history]');


//colores que se le pondra a el texto segun el tipo de pokemon
const typeColors = {
    electric: '#FFEA70',
    normal: '#B09398',
    fire: '#FF675C',
    water: '#0596C7',
    ice: '#AFEAFD',
    rock: '#999799',
    flying: '#7AE7C7',
    grass: '#4A9681',
    psychic: '#FFC6D9',
    ghost: '#561D25',
    bug: '#A2FAA3',
    poison: '#795663',
    ground: '#D2B074',
    dragon: '#DA627D',
    steel: '#1D8A99',
    fighting: '#2F2F2F',
    default: '#2A1A1F',
};

const callModifiedData = event =>{
  event.preventDefault();
  const { value } = event.target.pokemon;
    fetch(`http://localhost:3000/Pokemones${value.toLowerCase()}`)
        .then(dataM => dataM.json())
        .then(responseM => renderPokemonData(responseM))
        .catch(err => renderNotFound())
}


//buscar pokemon
const searchPokemon = event => {
    event.preventDefault();
    const { value } = event.target.pokemon;
    fetch(`https://pokeapi.co/api/v2/pokemon/${value.toLowerCase()}`)
        .then(data => data.json())
        .then(response => renderPokemonData(response))
        .catch(err => renderNotFound())
}

//renderizar nombre, imagen, y id
const renderPokemonData = data => {

    const sprite =  data.sprites.front_default;
    const { stats, types } = data;

    pokeName.textContent = data.name;
    pokeImg.setAttribute('src', sprite);
    pokeId.textContent = `Nº ${data.id}`;
    setCardColor(types);
    renderPokemonTypes(types);
    renderPokemonStats(stats);
}


const setCardColor = types => {
    const colorOne = typeColors[types[0].type.name];
    const colorTwo = types[1] ? typeColors[types[1].type.name] : typeColors.default;
}

const renderPokemonTypes = types => {
    pokeTypes.innerHTML = '';
    types.forEach(type => {
        const typeTextElement = document.createElement("div");
        typeTextElement.style.color = typeColors[type.type.name];
        typeTextElement.textContent = type.type.name;
        pokeTypes.appendChild(typeTextElement);
    });
}

//renderizar las habilidades del pokemon

const renderPokemonStats = stats => {
    pokeStats.innerHTML = '';


    
    stats.forEach(stat => {
        const statElement = document.createElement("div");
        const statElementName = document.createElement("div");
        const statElementAmount = document.createElement("div");
        statElementAmount.setAttribute("id", "stat")
        const statElementInput = document.createElement("input")
        statElementInput.setAttribute("type", "range")
        statElementInput.setAttribute("value", stat.base_stat)
        statElementInput.textContent = stat.base_stat;
        statElementName.textContent = stat.stat.name;

        statElementAmount.textContent = stat.base_stat;
        statElement.appendChild(statElementName);
        statElement.appendChild(statElementAmount);
        statElement.appendChild(statElementInput);
        pokeStats.appendChild(statElement);
        
        update();
    });  
    
}

// aqui se recopilan los datos del pokemon para hacer "POST"
const saveStatsButton = document.getElementById("saveStatsButton");
saveStatsButton.addEventListener("click", () => {
  const pokemonName = pokeName.textContent;
  const pokemonId = pokeId.textContent.replace("Nº ", ""); 
  const pokemonImage = pokeImg.src;
  
const statValues = [];

const statElements = document.querySelectorAll('div[id="stat"]');

statElements.forEach((statElement) => {
  const statValue = parseInt(statElement.textContent);
  statValues.push(statValue);
});

console.log(statValues);
 
   const pokemonData = {
    name: pokemonName,
    id: pokemonId,
    image: pokemonImage,
    hp: statValues[0],
    attack: statValues[1],
    defense:statValues[2],
    specialAttack : statValues[3],
    specialDefense : statValues[4],
    speed : statValues[5]
   };
  

  fetch("http://localhost:3000/Pokemones", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(pokemonData),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Datos guardados exitosamente:", data);
    })
    .catch((error) => {
      console.error("Error al guardar datos:", error);
      
    });
});

// mostrar datos modificados




//COMING SOON....///





// con esto podemos ver los cambios que hagamos a los stats con el input de tipo range
let update = ()=>{
    pokeStats.addEventListener("input", (e)=> {
    if(e.target.type === "range"){
    const label = e.target.previousElementSibling;
    label.innerHTML = `${e.target.value}`;
    }
  })
}


//si no se encuentra algun dato o ocurre un error
const renderNotFound = () => {
    pokeName.textContent = 'No encontrado';
    pokeImg.setAttribute('src', 'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/029b8bd9-cb5a-41e4-9c7e-ee516face9bb/dayo3ow-7ac86c31-8b2b-4810-89f2-e6134caf1f2d.gif?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzAyOWI4YmQ5LWNiNWEtNDFlNC05YzdlLWVlNTE2ZmFjZTliYlwvZGF5bzNvdy03YWM4NmMzMS04YjJiLTQ4MTAtODlmMi1lNjEzNGNhZjFmMmQuZ2lmIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.ooubhxjHp9PIMhVxvCFHziI6pxDAS8glXPWenUeomWs');
    pokeImg.style.background =  '#fff';
    pokeTypes.innerHTML = '';
    pokeStats.innerHTML = '';
    pokeId.textContent = '';
}

//LISTA DE TODOS LOS POKEMONES

const pokemonContainer = document.querySelector(".pokemon-container");
const spinner = document.querySelector("#spinner");
const previous = document.querySelector("#previous");
const next = document.querySelector("#next");

//paginado de lista de pokemones
let limit = 8;
let offset = 1;

previous.addEventListener("click", () => {
  if (offset != 1) {
    offset -= 9;
    removeChildNodes(pokemonContainer);
    fetchPokemons(offset, limit);
  }
});
next.addEventListener("click", () => {
  offset += 9;
  removeChildNodes(pokemonContainer);
  fetchPokemons(offset, limit);
});

//para traer los pokemones
function fetchPokemon(id) {
  fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`)
    .then((res) => res.json())
    .then((data) => {
      createPokemon(data);
      spinner.style.display = "none";
    });
}
function fetchPokemons(offset, limit) {
  spinner.style.display = "block";
  for (let i = offset; i <= offset + limit; i++) {
    fetchPokemon(i);
  }
}

//para mostar cada card de cada pokemon
function createPokemon(pokemon) {
  const card= document.createElement('div')
    card.classList.add('pokemon-block')

    //contenedor de imagen
    const spriteContainer = document.createElement('div')
    spriteContainer.classList.add('img-container')

    const sprite= document.createElement('img')
    sprite.src = pokemon.sprites.front_default

    spriteContainer.appendChild(sprite);

    const number = document.createElement('p')
    number.textContent = `#${pokemon.id.toString().padStart(3, 0)}`

    const name = document.createElement('p')
    name.classList.add('name')
    name.textContent = pokemon.name

    card.appendChild(spriteContainer)
    card.appendChild(number)
    card.appendChild(name)

    pokemonContainer.appendChild(card)
}

//con esto borramos los pokemones ya mostrado para mostrar los siguientes
function removeChildNodes(parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}
fetchPokemons(offset, limit);








 
