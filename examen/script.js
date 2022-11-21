//variable para saber en que pagina estamos y por lo tanto que elemento mostrar
let pagina = 1;
//variable para saber la canidad de personajes por pagina
//esta puestapos si en algun momento se quiera cambiar la contidad de personajes a un numero distinto
let personajesPagina = 5;


showCharacters()

//Funcion que llama a las funciones que crean el menu izquierdo
function showCharacters(){
    createCharacters();
    createMenu();
}

//funcion que crea el grupo de personajes
function createCharacters() {
    let divPersonajes = document.getElementById("people-list-characters");
    //Eliminacion de los nodos antes de añadir los nuevos
    while (divPersonajes.firstChild){
        divPersonajes.removeChild(divPersonajes.firstChild);
    };

    //filtro para saber el numero de elementos que mostrar
    results.filter((_,index) => {
        // if(index/personajesPagina >= (pagina-1) && index/personajesPagina < pagina){
        //     return true;
        // }else{
        //     return false;
        // }
        return (index/personajesPagina >= (pagina-1) && index/personajesPagina < pagina)
    }).forEach(element => {
        createCharacter(element);
    });
    
    //asignacion del un listener especifica a cada boton añadir
    let botonesDetalles = Array.from(document.getElementsByClassName("btn-char"));
    botonesDetalles.forEach((item)=>{
        item.addEventListener("click",(e)=>{
            let personaje = results[item.getAttribute("data-id")];
            showDetails(personaje);
        });
    });
}

//funcion que crea el menu de navegacion de navegacion de paginas
function createMenu(){
    let menu = document.getElementById("pages");

    //Eliminacion de los nodos antes de añadir los nuevos
    // while (menu.firstChild){
    //     menu.removeChild(menu.firstChild);
    // };
    menu.divPersonajes.innerHTML = "";

    //Creacion del 'boton' primera 
    let first = document.createElement("span");
    first.textContent = "Primera";
    first.classList.add("first");
    first.addEventListener("click", (e) =>{
        pagina = 1;
        showCharacters()
    } );
    menu.append(first);

    //Creacion del 'boton' anterior 
    let prev = document.createElement("span");
    prev.textContent = "Anterior";
    prev.classList.add("prev");
    prev.addEventListener("click", (e) => {
        pagina > 1 ? pagina-- : pagina;
        showCharacters();
    } );
    menu.append(prev);

    //Creacion de la seccion que inidca la pagina
    let numPagina = document.createElement("span");
    numPagina.textContent = `Página ${pagina} de ${Math.ceil(results.length/personajesPagina)}`;
    menu.append(numPagina);

    //Creacion del 'boton' siguiente 
    let next = document.createElement("span");
    next.textContent = "Siguiente";
    next.classList.add("next");
    next.addEventListener("click", (e) =>{
        pagina < results.length/personajesPagina ? pagina++ : pagina;
        showCharacters()
    });
    menu.append(next);
        
    //Creacion del 'boton' ultima 
    let last = document.createElement("span");
    last.textContent = "Ultima";
    last.classList.add("last");
    last.addEventListener("click", (e) =>{
        pagina = 4;
        showCharacters()
    } );
    menu.append(last);
}

function createCharacter(datosPersonaje){
    let menuPersonajes = document.getElementById("people-list-characters");
    
    //Crear el div
    let personaje = document.createElement("div");
    personaje.classList.add("character");
    menuPersonajes.append(personaje);

    //Nombre
    let nombre = document.createElement("div");
    datosPersonaje["name"] == null ? nombre.textContent = "-" : nombre.textContent = datosPersonaje["name"];
    nombre.classList.add("character-name");
    personaje.append(nombre);

    //Nacimiento
    let nacimiento = document.createElement("div");
    datosPersonaje["birth_year"] == null ? nacimiento.textContent = "-" : nacimiento.textContent = datosPersonaje["birth_year"];
    nacimiento.classList.add("character-birth-year");
    personaje.append(nacimiento);

    //Nombre Planeta
    let planeta = document.createElement("div");
    datosPersonaje["homeworld"]["name"] == null ? planeta.textContent = "-" : planeta.textContent = datosPersonaje["homeworld"]["name"];
    planeta.classList.add("character-homeworld");
    personaje.append(planeta);
   
    //Creacion del boton detalles
    let botonDetalles = document.createElement("div");
    botonDetalles.textContent = "Detalles";
    botonDetalles.classList.add("btn");
    botonDetalles.classList.add("btn-char");
    botonDetalles.setAttribute("data-id", results.findIndex(item => item['name'] == datosPersonaje['name'] ));
    personaje.append(botonDetalles);
}

//funcion para que salga la parte derecha
function showDetails(personaje){
    
    //nombre
    document.getElementById("detail-name").textContent = personaje["name"];

    //altura
    let altura = document.getElementById("height");
    (personaje["height"] == null) ? altura.textContent = "-" : altura.textContent = personaje["height"];

    //peso
    let peso = document.getElementById("mass");
    (personaje["mass"] == null) ? peso.textContent = "-" : peso.textContent = personaje["mass"];
    
    //Color Pelo
    let colorPelo = [];
    if((personaje["hair_color"]) == null ){
        colorPelo["name"] = '-';
        colorPelo["code"] = '#000000';
    }else{
        colorPelo = translate_colors[personaje["hair_color"]];
    } 
    document.getElementById("hair-color").textContent = colorPelo["name"];
    document.getElementById("hair-color-filled").style.backgroundColor = colorPelo["code"];

    //Color ojos
    let colorOjos = [];
    if((personaje["eye_color"]) == null ){
        colorOjos["name"] = '-';
        colorOjos["code"] = '#000000';
    }else{
        colorOjos = translate_colors[personaje["eye_color"]];
    } 
    document.getElementById("eye-color").textContent = colorOjos["name"];
    document.getElementById("eye-color-filled").style.backgroundColor = colorOjos["code"];

    //Nacimineto
    let nacimiento = document.getElementById("birth-year");
    (personaje["birth_year"] == null) ? nacimiento.textContent = "-" : nacimiento.textContent = personaje["birth_year"];
    
    //Nombre Planeta
    let nombrePlaneta = document.getElementById("homeworld");
    (personaje["homeworld"]["name"] == null) ? nombrePlaneta.textContent = "-" : nombrePlaneta.textContent = personaje["homeworld"]["name"];

    //Poblacion Planeta
    let poblacion = document.getElementById("population");
    (personaje["homeworld"]["population"] == null) ? poblacion.textContent = "-" : poblacion.textContent = personaje["homeworld"]["population"];
}

