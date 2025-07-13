document.addEventListener("DOMContentLoaded", function () {
    const cursos = document.querySelectorAll(".curso");

    cursos.forEach((curso, index) => {
        const estado = localStorage.getItem(`curso_${index}`);
        const detalle = document.querySelector(`.detalle[data-index='${index}']`);

        if (estado === "completado") {
            curso.classList.add("completado");
            desbloquear(index + 1);
            if (detalle) detalle.style.display = "block";
        }
    });
});

function toggleCurso(boton) {
    if (boton.classList.contains("bloqueado")) return;

    const index = parseInt(boton.getAttribute("data-index"));
    const detalle = document.querySelector(`.detalle[data-index='${index}']`);

    if (boton.classList.contains("completado")) {
        boton.classList.remove("completado");
        localStorage.removeItem(`curso_${index}`);
        bloquearDesde(index + 1);
        if (detalle) detalle.style.display = "none";
    } else {
        boton.classList.add("completado");
        localStorage.setItem(`curso_${index}`, "completado");
        desbloquear(index + 1);
        if (detalle) detalle.style.display = "block";
    }
}

function desbloquear(index) {
    const siguiente = document.querySelector(`.curso[data-index='${index}']`);
    if (siguiente) siguiente.classList.remove("bloqueado");
}

function bloquearDesde(index) {
    for (let i = index; i < 10; i++) {
        const curso = document.querySelector(`.curso[data-index='${i}']`);
        const detalle = document.querySelector(`.detalle[data-index='${i}']`);
        if (curso) {
            curso.classList.remove("completado");
            curso.classList.add("bloqueado");
            localStorage.removeItem(`curso_${i}`);
        }
        if (detalle) {
            detalle.style.display = "none";
        }
    }
}
<script src="script.js"></script>
