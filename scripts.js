// ABRIR CARTA //

const carta = document.getElementById("carta");
const contenidoCarta = document.getElementById("contenido-inicio");

carta.addEventListener("click", function () {
    carta.classList.add("abierta");

    const musica = document.getElementById("musica-fondo");
    musica.volume = 0.2;
    musica.play();

    setTimeout(function () {
        carta.classList.add("desvanecer");
    }, 600);

    setTimeout(function () {
        carta.style.display = "none";
        contenidoCarta.classList.remove("oculto");
        contenidoCarta.classList.add("aparecer");
        iniciarLluviaRosas();
    }, 1400);
});


function crearRosa() {
    const rosa = document.createElement("div")
    rosa.classList.add("rosa-cayendo");
    rosa.textContent = "🌹";

    const posicionHorizontal = Math.random() * 100;
    rosa.style.left = posicionHorizontal + "vw";

    const duracion = 3 + Math.random() * 1;
    rosa.style.animationDuration = duracion + "s";

    document.getElementById("lluvia-rosas").appendChild(rosa);

    setTimeout(function () {
        rosa.remove();
    }, duracion * 1000);
}


function iniciarLluviaRosas() {
    let contador = 0;
    const intervalo = setInterval(function () {
        crearRosa();
        contador++;
        if (contador > 100) {
            clearInterval(intervalo);
        }
    }, 100);
}

function crearTulipan() {
    const tulipan = document.createElement("div")
    tulipan.classList.add("tulipan-cayendo");
    tulipan.textContent = "🌷";

    const posicionHorizontal = Math.random() * 100;
    tulipan.style.left = posicionHorizontal + "vw";

    const duracion = 3 + Math.random() * 1;
    tulipan.style.animationDuration = duracion + "s";

    document.getElementById("lluvia-tulipan").appendChild(tulipan);

    setTimeout(function () {
        tulipan.remove();
    }, duracion * 1000);
}


function iniciarLluviaTulipan() {
    let contador = 0;
    const intervalo = setInterval(function () {
        crearTulipan();
        contador++;
        if (contador > 100) {
            clearInterval(intervalo);
        }
    }, 100);
}

function cambiarPantalla(pantallaActual, pantallaSiguiente) {
    pantallaActual.classList.add("saliendo");

    setTimeout(function () {
        pantallaActual.classList.remove("activa");
        pantallaActual.classList.remove("saliendo");

        pantallaSiguiente.classList.add("activa");
        pantallaSiguiente.classList.add("entrando");

        requestAnimationFrame(function () {
            pantallaSiguiente.classList.remove("entrando");
        });
    }, 600);
}


const btnSiguiente1 = document.getElementById("btn-siguiente-1");
const btnSiguiente2 = document.getElementById("btn-siguiente-2");

const pantallaInicio = document.getElementById("pantalla-inicio");
const pantallaFotos = document.getElementById("pantalla-fotos");
const pantallaMensaje = document.getElementById("pantalla-mensaje");
const pantallaPregunta = document.getElementById("pantalla-pregunta");

btnSiguiente1.addEventListener('click', function () {
    cambiarPantalla(pantallaFotos, pantallaMensaje);
    iniciarLluviaTulipan();



});

btnSiguiente2.addEventListener('click', function () {
    cambiarPantalla(pantallaMensaje, pantallaPregunta);

});



const btnSi = document.getElementById("btn-si");
const btnNo = document.getElementById("btn-no");
const pantallaCelebracion = document.getElementById("pantalla-celebracion");

const mensajeNo = [
    "¿Segura?😥",
    "¿Demasiado segura?☹️",
    "Namas piensalo tantito...",
    "Oye ya pues, piensalo🙏🏻",
    "Siguele siguele",
];

let clicsNo = 0

btnNo.addEventListener("click", function () {
    if (clicsNo < mensajeNo.length) {
        btnNo.textContent = mensajeNo[clicsNo]
    }

    clicsNo++;

    const nuevoTamano = Math.max(1 - clicsNo * 0.1, 0.0001);
    btnNo.style.transform = `scale(${nuevoTamano})`;

    if (nuevoTamano <= 0.4) {
        pantallaHacker.classList.remove("oculto");
        escribirLineas(lineasHacker, 0);
    }
});

btnSi.addEventListener("click", function () {
    cambiarPantalla(pantallaPregunta, pantallaCelebracion);

    setTimeout(function () {
        iniciarLluviaFlores();
    }, 600);
});


const slideFotos = document.querySelectorAll(".foto-slide");

const observador = new IntersectionObserver(function (entradas) {
    entradas.forEach(function (entrada) {
        if (entrada.isIntersecting) {
            entrada.target.classList.add("visible");
        } else {
            entrada.target.classList.remove("visible");
        }
    });
}, { threshold: 0.5 });

slideFotos.forEach(function (slide) {
    observador.observe(slide)
});


const marcadorFin = document.getElementById("marcador-fin-mensaje");
const indicadorScroll = document.querySelector(".indicador-scroll");
const btnContinuar = document.getElementById("btn-continuar")

const observadorFin = new IntersectionObserver(function (entradas) {
    const entrada = entradas[0];
    if (entrada.isIntersecting) {
        indicadorScroll.style.display = "none";
        btnContinuar.classList.remove("btn-oculto");
    }
}, { threshold: 1 });

observadorFin.observe(marcadorFin);

btnContinuar.addEventListener('click', function () {
    cambiarPantalla(pantallaInicio, pantallaFotos);



});

const pantallaHacker = document.getElementById("pantalla-hacker");
const textoHacker = document.getElementById("texto-hacker");

const lineasHacker = [
    "Iniciando protocolo de seguridad",
    "Accediendo a datos personales",
    "Transfiriendo datos...",
    "Cargando...",
    "Cargando...",
    "Formateando computadora...",
    "Formateo completado😊."
];


function escribirLineas(lineas, indiceLinea) {
    if (indiceLinea >= lineas.length) {
        mostrarPromptReintentar();
        return;
    }

    textoHacker.textContent = "";

    const linea = lineas[indiceLinea];
    let indiceLetra = 0;

    const intervalo = setInterval(function () {
        textoHacker.textContent += linea[indiceLetra];
        indiceLetra++;

        if (indiceLetra >= linea.length) {
            clearInterval(intervalo);
            setTimeout(function () {
                escribirLineas(lineas, indiceLinea + 1)
            }, 900);
        }
    }, 35);

}

function mostrarPromptReintentar() {
    textoHacker.textContent = "";
    const mensaje = "Presiona ENTER para reintentar";
    let indiceLetra = 0;

    const intervalo = setInterval(function () {
        textoHacker.textContent += mensaje[indiceLetra];
        indiceLetra++;

        if (indiceLetra >= mensaje.length) {
            clearInterval(intervalo);
        }
    }, 35);

    document.addEventListener("keydown", function manejarEnter(evento) {
        if (evento.key === "Enter") {
            document.removeEventListener("keydown", manejarEnter);
            cerrarPantallaHacker();
        }
    });
}


function cerrarPantallaHacker() {
    pantallaHacker.classList.add("oculto");
    textoHacker.textContent = "";

    btnNo.textContent = "No✖️";
    btnNo.style.transform = "scale(1)";
    clicsNo = 0;
}

function crearFlor() {
    const flor = document.createElement("div")
    flor.classList.add("tulipan-cayendo");
    flor.textContent = "🌼";

    const posicionHorizontal = Math.random() * 100;
    flor.style.left = posicionHorizontal + "vw";

    const duracion = 3 + Math.random() * 1;
    flor.style.animationDuration = duracion + "s";

    document.getElementById("lluvia-rosas").appendChild(flor);

    setTimeout(function () {
        flor.remove();
    }, duracion * 1000);
}


function iniciarLluviaFlores() {
    let contador = 0;
    const intervalo = setInterval(function () {
        crearFlor();
        contador++;
        if (contador > 60) {
            clearInterval(intervalo);
        }
    }, 90);
}