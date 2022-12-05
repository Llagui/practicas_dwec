let cont = 0;
let max = 300;
let min = 100;
let tiempo = 0;
let myInterval;
let players = [
    { 'name': 'Yago', 'puntuacion': '22' },
    { 'name': 'Waluigi', 'puntuacion': '20' },
    { 'name': 'Anonimo', 'puntuacion': '18' },
];

document.getElementById('btn-start').addEventListener("click", () => {
    if (tiempo >= 20.0 || tiempo == 0) {
        tiempo = 0;
        empezarPartida();
    }
});
document.getElementById('btn-reset').addEventListener("click", terminarPartida);

let nivelesDificultad = document.querySelectorAll(".diff-level");
nivelesDificultad.forEach(element => {
    element.addEventListener("click", () => {
        if (tiempo >= 20.0 || tiempo == 0) {
            max = 300 / element.textContent;
            min = 100 / (element.textContent / 2);
            nivelesDificultad.forEach(element2 => { element2.classList.remove("selected") });
            element.classList.add("selected");
        }
    });
});
actualizarResultados();

function createCuadro() {
    let contenedor = document.getElementById("game-zone");
    let ancho = contenedor.clientWidth;
    let alto = contenedor.clientHeight;
    let rojo = document.createElement("div");
    let distanciaIzda = ((ancho - max) * Math.random()).toFixed(0);
    let distanciaTop = ((alto - max) * Math.random()).toFixed(0);

    document.getElementById("score").innerHTML = cont;
    rojo.classList.add("rojo");
    rojo.style.left = distanciaIzda + "px";
    rojo.style.top = distanciaTop + "px";
    rojo.style.width = (Math.random() * (max - min) + min).toFixed(0) + "px";
    rojo.style.height = (Math.random() * (max - min) + min).toFixed(0) + "px";

    contenedor.append(rojo);
    rojo.addEventListener("click", (e) => {
        if (tiempo <= 20) {
            contenedor.innerHTML = "";
            cont++;
            createCuadro();
        }
    });
}

function updateTime() {
    tiempo += 0.1;
    document.getElementById("time").textContent = tiempo.toFixed(1);
    if (tiempo >= 20) {
        clearInterval(myInterval);
        actualizarResultados();
    }
}

function empezarPartida() {
    document.getElementById("game-zone").innerHTML = '';
    myInterval = setInterval(updateTime, 100);
    createCuadro();
}

function terminarPartida() {
    tiempo = 0;
    document.getElementById("game-zone").innerHTML = '';
    document.getElementById("time").textContent = 0;
    document.getElementById("score").textContent = 0;
    clearInterval(myInterval);
}

function actualizarResultados() {
    let puntuacion = document.getElementById("score").textContent;
    let nombre = document.getElementById("player-input").value;
    let partida = { 'name': nombre, 'puntuacion': puntuacion };
    let posiciones = [
            document.getElementById("ranking-first"),
            document.getElementById("ranking-second"),
            document.getElementById("ranking-third")
    ];

    players[3] = partida;
    players.sort((a, b) => b['puntuacion'] - a['puntuacion']);
    delete players[3];
    
    for (let i = 0; i < posiciones.length; i++) {
        posiciones[i].children[0].textContent = players[i]["name"];
        posiciones[i].children[1].textContent = players[i]["puntuacion"];
    }
}