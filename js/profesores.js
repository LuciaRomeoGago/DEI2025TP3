// profesores.js
async function cargarProfesores() {
    const res = await fetch('getProfesores.php');
    const profesores = await res.json();

    const main = mainContent();
    main.innerHTML = '<h2>Sobre nosotros</h2><h3>Nuestros Profesores</h3>';

    const divProfesores = document.createElement('div');
    divProfesores.classList.add('profesores-list');

    profesores.forEach(profesor => {
        profesor.materias.forEach(materia => {
            const profDiv = document.createElement('div');
            profDiv.classList.add('profesor');
            profDiv.innerHTML = `
                <strong>${profesor.nombre}</strong><br/>
                <em>${materia.nombre}</em>
            `;
            profDiv.addEventListener('click', () => {
                mostrarTurnero({
                    profesorId: profesor.id,
                    profesorNombre: profesor.nombre,
                    materiaId: materia.id,
                    materiaNombre: materia.nombre
                });
            });
            divProfesores.appendChild(profDiv);
        });
    });

    main.appendChild(divProfesores);

    const turnoContainer = document.createElement('div');
    turnoContainer.id = 'turno-container';
    main.appendChild(turnoContainer);
}

// Exportar o asignar globalmente:
window.cargarProfesores = cargarProfesores;
