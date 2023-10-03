//BUSCADOR UNDIVIDUAL

const pokeCard = document.querySelector("[data-poke-card]");
const pokeName = document.querySelector("[data-poke-name]");
const pokeImg = document.querySelector("[data-poke-img]");
const pokeImgContainer = document.querySelector("[data-poke-img-container]");
const pokeId = document.querySelector("[data-poke-id]");
const pokeTypes = document.querySelector("[data-poke-types]");
const pokeStats = document.querySelector("[data-poke-stats]");
const pokeHistory = document.querySelector("[data-poke-history]");

//colores que se le pondra a el texto segun el tipo de pokemon
const typeColors = {
  electric: "#FFEA70",
  normal: "#B09398",
  fire: "#FF675C",
  water: "#0596C7",
  ice: "#AFEAFD",
  rock: "#999799",
  flying: "#7AE7C7",
  grass: "#4A9681",
  psychic: "#FFC6D9",
  ghost: "#561D25",
  bug: "#A2FAA3",
  poison: "#795663",
  ground: "#D2B074",
  dragon: "#DA627D",
  steel: "#1D8A99",
  fighting: "#2F2F2F",
  default: "#2A1A1F",
};

const setCardColor = (types) => {
  const colorOne = typeColors[types[0].type.name];
  const colorTwo = types[1]
    ? typeColors[types[1].type.name]
    : typeColors.default;
};
const renderPokemonTypes = (types) => {
  pokeTypes.innerHTML = "";
  types.forEach((type) => {
    const typeTextElement = document.createElement("div");
    typeTextElement.style.color = typeColors[type.type.name];
    typeTextElement.textContent = type.type.name;
    pokeTypes.appendChild(typeTextElement);
  });
};

//buscar pokemon
const searchPokemon = async (event) => {
  event.preventDefault();
  let res = await (await fetch("http://localhost:3000/Pokemones")).json();
  const { value } = event.target.pokemon;
  let exist = false;
  var pokemon = {};
  for (let i of res) {
    if (i.name == value) {
      exist = true;
      var pokemon = i;
    }

    //renderizar nombre, imagen, y id
    const renderPokemonData = (pokemon) => {
      const sprite = pokemon.image;
      pokeName.textContent = pokemon.name;
      pokeImg.setAttribute("src", sprite);
      pokeId.textContent = `Nº ${pokemon.id}`;
      pokeStats.innerHTML = "";
      //"hp"
      const statElement = document.createElement("div");
      const statElementName = document.createElement("div");
      const statElementAmount = document.createElement("div");
      statElementAmount.setAttribute("id", "stat");
      const statElementInput = document.createElement("input");
      statElementInput.setAttribute("type", "range");
      statElementInput.setAttribute("value", pokemon.hp);
      statElementInput.textContent = pokemon.hp;
      statElementName.textContent = "hp";
      statElementAmount.textContent = pokemon.hp;
      statElement.appendChild(statElementName);
      statElement.appendChild(statElementAmount);
      statElement.appendChild(statElementInput);
      pokeStats.appendChild(statElement);
      //"attack"
      const statElement1 = document.createElement("div");
      const statElementName1 = document.createElement("div");
      const statElementAmount1 = document.createElement("div");
      statElementAmount1.setAttribute("id", "stat");
      const statElementInput1 = document.createElement("input");
      statElementInput1.setAttribute("type", "range");
      statElementInput1.setAttribute("value", pokemon.attack);
      statElementInput1.textContent = pokemon.attack;
      statElementName1.textContent = "attack";
      statElementAmount1.textContent = pokemon.attack;
      statElement1.appendChild(statElementName1);
      statElement1.appendChild(statElementAmount1);
      statElement1.appendChild(statElementInput1);
      pokeStats.appendChild(statElement1);
      //"defense"
      const statElement2 = document.createElement("div");
      const statElementName2 = document.createElement("div");
      const statElementAmount2 = document.createElement("div");
      statElementAmount2.setAttribute("id", "stat");
      const statElementInput2 = document.createElement("input");
      statElementInput2.setAttribute("type", "range");
      statElementInput2.setAttribute("value", pokemon.defense);
      statElementInput2.textContent = pokemon.defense;
      statElementName2.textContent = "defense";
      statElementAmount2.textContent = pokemon.defense;
      statElement2.appendChild(statElementName2);
      statElement2.appendChild(statElementAmount2);
      statElement2.appendChild(statElementInput2);
      pokeStats.appendChild(statElement2);
      //"specialAttack"
      const statElement3 = document.createElement("div");
      const statElementName3 = document.createElement("div");
      const statElementAmount3 = document.createElement("div");
      statElementAmount3.setAttribute("id", "stat");
      const statElementInput3 = document.createElement("input");
      statElementInput3.setAttribute("type", "range");
      statElementInput3.setAttribute("value", pokemon.specialAttack);
      statElementInput3.textContent = pokemon.specialAttack;
      statElementName3.textContent = "special-Attack";
      statElementAmount3.textContent = pokemon.specialAttack;
      statElement3.appendChild(statElementName3);
      statElement3.appendChild(statElementAmount3);
      statElement3.appendChild(statElementInput3);
      pokeStats.appendChild(statElement3);
      //"specialDefense"
      const statElement4 = document.createElement("div");
      const statElementName4 = document.createElement("div");
      const statElementAmount4 = document.createElement("div");
      statElementAmount4.setAttribute("id", "stat");
      const statElementInput4 = document.createElement("input");
      statElementInput4.setAttribute("type", "range");
      statElementInput4.setAttribute("value", pokemon.specialDefense);
      statElementInput4.textContent = pokemon.specialDefense;
      statElementName4.textContent = "special-Defense";
      statElementAmount4.textContent = pokemon.specialDefense;
      statElement4.appendChild(statElementName4);
      statElement4.appendChild(statElementAmount4);
      statElement4.appendChild(statElementInput4);
      pokeStats.appendChild(statElement4);
      //"speed"
      const statElement5 = document.createElement("div");
      const statElementName5 = document.createElement("div");
      const statElementAmount5 = document.createElement("div");
      statElementAmount5.setAttribute("id", "stat");
      const statElementInput5 = document.createElement("input");
      statElementInput5.setAttribute("type", "range");
      statElementInput5.setAttribute("value", pokemon.speed);
      statElementInput5.textContent = pokemon.speed;
      statElementName5.textContent = "speed";
      statElementAmount5.textContent = pokemon.speed;
      statElement5.appendChild(statElementName5);
      statElement5.appendChild(statElementAmount5);
      statElement5.appendChild(statElementInput5);
      pokeStats.appendChild(statElement5);
    };
    renderPokemonData(pokemon);

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


      const pokemonData = {
        name: pokemonName,
        id: pokemonId,
        image: pokemonImage,
        hp: statValues[0],
        attack: statValues[1],
        defense: statValues[2],
        specialAttack: statValues[3],
        specialDefense: statValues[4],
        speed: statValues[5],
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
    // con esto podemos ver los cambios que hagamos a los stats con el input de tipo range
    let update = () => {
      pokeStats.addEventListener("input", (e) => {
        if (e.target.type === "range") {
          const label = e.target.previousElementSibling;
          label.innerHTML = `${e.target.value}`;
        }
      });
    };

    //si no se encuentra algun dato o ocurre un error
    const renderNotFound = () => {
      pokeName.textContent = "No encontrado";
      pokeImg.setAttribute(
        "src",
        "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/029b8bd9-cb5a-41e4-9c7e-ee516face9bb/dayo3ow-7ac86c31-8b2b-4810-89f2-e6134caf1f2d.gif?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzAyOWI4YmQ5LWNiNWEtNDFlNC05YzdlLWVlNTE2ZmFjZTliYlwvZGF5bzNvdy03YWM4NmMzMS04YjJiLTQ4MTAtODlmMi1lNjEzNGNhZjFmMmQuZ2lmIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.ooubhxjHp9PIMhVxvCFHziI6pxDAS8glXPWenUeomWs"
      );
      pokeImg.style.background = "#fff";
      pokeTypes.innerHTML = "";
      pokeStats.innerHTML = "";
      pokeId.textContent = "";
    };
  }
  if (exist == false) {
    fetch(`https://pokeapi.co/api/v2/pokemon/${value.toLowerCase()}`)
      .then((data) => data.json())
      .then((response) => renderPokemonData(response))
      .catch((err) => renderNotFound());

    //renderizar nombre, imagen, y id
    const renderPokemonData = (data) => {
      const sprite = data.sprites.front_default;
      const { stats, types } = data;
      pokeName.textContent = data.name;
      pokeImg.setAttribute("src", sprite);
      pokeId.textContent = `Nº ${data.id}`;
      setCardColor(types);
      renderPokemonTypes(types);
      renderPokemonStats(stats);
    };
    const setCardColor = (types) => {
      const colorOne = typeColors[types[0].type.name];
      const colorTwo = types[1]
        ? typeColors[types[1].type.name]
        : typeColors.default;
    };
    const renderPokemonTypes = (types) => {
      pokeTypes.innerHTML = "";
      types.forEach((type) => {
        const typeTextElement = document.createElement("div");
        typeTextElement.style.color = typeColors[type.type.name];
        typeTextElement.textContent = type.type.name;
        pokeTypes.appendChild(typeTextElement);
      });
    };
    const renderPokemonStats = (stats) => {
      pokeStats.innerHTML = "";

      stats.forEach((stat) => {
        const statElement = document.createElement("div");
        const statElementName = document.createElement("div");
        const statElementAmount = document.createElement("div");
        statElementAmount.setAttribute("id", "stat");
        const statElementInput = document.createElement("input");
        statElementInput.setAttribute("type", "range");
        statElementInput.setAttribute("value", stat.base_stat);
        statElementInput.textContent = stat.base_stat;
        statElementName.textContent = stat.stat.name;

        statElementAmount.textContent = stat.base_stat;
        statElement.appendChild(statElementName);
        statElement.appendChild(statElementAmount);
        statElement.appendChild(statElementInput);
        pokeStats.appendChild(statElement);

        update();
      });
    };

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


      const pokemonData = {
        name: pokemonName,
        id: pokemonId,
        image: pokemonImage,
        hp: statValues[0],
        attack: statValues[1],
        defense: statValues[2],
        specialAttack: statValues[3],
        specialDefense: statValues[4],
        speed: statValues[5],
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
    // con esto podemos ver los cambios que hagamos a los stats con el input de tipo range
    let update = () => {
      pokeStats.addEventListener("input", (e) => {
        if (e.target.type === "range") {
          const label = e.target.previousElementSibling;
          label.innerHTML = `${e.target.value}`;
        }
      });
    };

    //si no se encuentra algun dato o ocurre un error
    const renderNotFound = () => {
      pokeName.textContent = "No encontrado";
      pokeImg.setAttribute(
        "src",
        "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/029b8bd9-cb5a-41e4-9c7e-ee516face9bb/dayo3ow-7ac86c31-8b2b-4810-89f2-e6134caf1f2d.gif?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzAyOWI4YmQ5LWNiNWEtNDFlNC05YzdlLWVlNTE2ZmFjZTliYlwvZGF5bzNvdy03YWM4NmMzMS04YjJiLTQ4MTAtODlmMi1lNjEzNGNhZjFmMmQuZ2lmIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.ooubhxjHp9PIMhVxvCFHziI6pxDAS8glXPWenUeomWs"
      );
      pokeImg.style.background = "#fff";
      pokeTypes.innerHTML = "";
      pokeStats.innerHTML = "";
      pokeId.textContent = "";
    };
  }
};

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
  const card = document.createElement("div");
  card.classList.add("pokemon-block");

  //contenedor de imagen
  const spriteContainer = document.createElement("div");
  spriteContainer.classList.add("img-container");

  const sprite = document.createElement("img");
  sprite.src = pokemon.sprites.front_default;

  spriteContainer.appendChild(sprite);

  const number = document.createElement("p");
  number.textContent = `#${pokemon.id.toString().padStart(3, 0)}`;

  const name = document.createElement("p");
  name.classList.add("name");
  name.textContent = pokemon.name;

  card.appendChild(spriteContainer);
  card.appendChild(number);
  card.appendChild(name);

  pokemonContainer.appendChild(card);
}

//con esto borramos los pokemones ya mostrado para mostrar los siguientes
function removeChildNodes(parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}
fetchPokemons(offset, limit);