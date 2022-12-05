let palabraAleatoria = words[Math.floor(Math.random() * words.length)];
let espacios = document.getElementById('spaces');
let fallos = 0;
let letrasPalabra = [];
console.log(palabraAleatoria);
generateSpaces(palabraAleatoria);
generateKeyborad();


function generateSpaces(palabraAleatoria) {
    for (let i = 0; i < palabraAleatoria.length; i++) {
        espacios.innerHTML += '<span class="space"></span>';
    }
}

function generateKeyborad() {
    let teclado = document.getElementById('keyboard');

    //teclado en pantalla
    letras.forEach(letra => {
        let letra2 = document.createElement("span");
        letra2.textContent = letra;
        letra2.classList.add("key");
        letra2.id = letra;
        teclado.append(letra2);
        letra2.addEventListener("click", () => {
            updateWord(letra);
        });
    });

    // teclado del PC
    document.getElementsByTagName("body")[0].addEventListener("keyup", (e) => {
        updateWord(e.key);
        
    });
}

function updateWord(letra) {
    if (fallos < 8) {
        let letra2 = document.getElementById(letra);
        let palabraCompleta = false;

        if (palabraAleatoria.includes(letra) && !Array.from(letra2.classList).includes("succced")) {
            letra2.classList.add("succeed");
            letrasPalabra.push(letra);
            palabraCompleta = true;
            for (let i = 0; i < palabraAleatoria.length; i++) {
                if (palabraAleatoria.charAt(i) == letra) {
                    espacios.children[i].textContent = letra;
                }

                if (!letrasPalabra.includes(palabraAleatoria.charAt(i))) {
                    palabraCompleta = false;
                }
            }
        } else if (!Array.from(letra2.classList).includes("fail")) {
            letra2.classList.add("fail");
            fallos++;
            updateImg();
        }

        if (palabraCompleta) {
            alert("Has ganado :)");
        }
    } else {
        fallos++;
        updateImg();
        alert("Has perdido :(");
        for (let i = 0; i < palabraAleatoria.length; i++) {
            espacios.children[i].textContent = palabraAleatoria.charAt(i);
        }
    }

}

function updateImg() {
    let hanged = document.getElementById('hanged');
    hanged.innerHTML = `<img src="img/hangman_0${fallos}.png" />`;
}