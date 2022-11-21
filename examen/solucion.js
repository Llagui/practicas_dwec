
let pagina = 1;
let itemsPerPage = 5;
let numPages = Math.ceil(results.length/itemsPerPage);

renderCharacter();

function renderCharacter() {
    //Creamos la lista de personajes
    let characterList = results
                            .filter((_,index) => index/itemsPerPage >= (pagina-1) && index/itemsPerPage < pagina)
                            .map((character)=> createCharacter(character));
    let divPeople = document.getElementById("people-list-characters");
    divPeople.innerHTML = "";
    
    divPeople.append(...characterList);

    //paginas
    let divPages = document.getElementById('pages');
    divPages.innerHTML = "";
    
    //Creacion del 'boton' primera 
    let first = document.createElement("span");
    first.textContent = "Primera";
    first.classList.add("first");
    first.addEventListener("click", () =>{
        pagina = 1;
        renderCharacter();
    });

    //Creacion del 'boton' anterior 
    let prev = document.createElement("span");
    prev.textContent = "Anterior";
    prev.classList.add("prev");8
    prev.addEventListener("click", () =>{
        pagina = (pagina > 1 ? --pagina : pagina)
        renderCharacter();
    });

    //Creacion de la seccion que inidca la pagina
    let numPagina = document.createElement("span");
    numPagina.textContent = `Página ${pagina} de ${numPages}`;

    //Creacion del 'boton' siguiente 
    let next = document.createElement("span");
    next.textContent = "Siguiente";
    next.classList.add("next");
    next.addEventListener("click", () => {
        pagina = (pagina < numPages ? ++pagina : pagina);
        renderCharacter();
    });
        
    //Creacion del 'boton' ultima 
    let last = document.createElement("span");
    last.textContent = "Ultima";
    last.classList.add("last");
    last.addEventListener("click", () =>{
        pagina = numPages;
        renderCharacter();
    });
    
    divPages.append(first,prev,numPagina,next,last);
}

function createCharacter({name, birth_year, homeworld}){
    let divCharacter = document.createElement("div");
    divCharacter.classList.add("character");
    divCharacter.innerHTML =`<div class="character-name">${name}</div>
    <div class="character-birth-year">${birth_year ? birth_year : '-' }</div>
    <div class="character-homeworld">${homeworld?.name ? homeworld.name : '-' }</div>`;

    let btn = document.createElement('div');
    btn.classList.add("btn", "btn-char");
    btn.textContent = 'Detalles'; 
    btn.setAttribute("data-name",name);
    btn.addEventListener('click',(e) => renderDetail(e));
    divCharacter.append(btn);

    return divCharacter;
}

function renderDetail(e) {
    let character = results.find((item)=>item.name == e.target.dataSet.name); 
    let divName = document.getElementById("detail-name");  
    divName.textContent = character.name;

    let divHeight= document.getElementById("height");  
    divHeight.textContent = `${character.height} cm`;

    let divMass = document.getElementById("mass");  
    divMass.textContent = `${character.mass} kg`;

    let divHair = document.getElementById("hair-color");  
    divHair.textContent = character.hair_color ? translate_colors[character.hair_color].color : "-";
    let divHairFilled = document.getElementById("hair-color-filled");  
    divHairFilled.style.backgroundColor = character.hair_color ? translate_colors[character.hair_color].color : "#FFF";

    let divEye = document.getElementById("eye-color");  
    divEye.textContent = character.eye_color ? translate_colors[character.eye_color].name : "-";
    let divEyeFilled = document.getElementById("hair-color-filled");  
    divEyeFilled.style.backgroundColor = character.eye_color ? translate_colors[character.eye_color].color : "#FFF";

    let divNacimiento = document.getElementById("birth-year");  
    divNacimiento.textContent = character.birth_year;

    let divHomeworld = document.getElementById("homeworld");  
    divHomeworld.textContent = character.homeworld.name || '-';

    let divPopulation = document.getElementById("population");  
    divPopulation.textContent = character.homeworld.name || '-';

}