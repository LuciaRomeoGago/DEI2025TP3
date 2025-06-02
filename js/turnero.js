function mostrarTurnero({ profesorId, profesorNombre, materiaId, materiaNombre }) {
    const container = document.getElementById('turno-container');
    container.innerHTML = `
        <form id="reserva-form" class="reserva-form">
            <input type="hidden" name="profesor_id" value="${profesorId}">
            <input type="hidden" name="materia_id" value="${materiaId}">

            <label>Profesor:
                <input type="text" value="${profesorNombre}" disabled class="input-disabled">
            </label>
            <label>Materia:
                <input type="text" value="${materiaNombre}" disabled class="input-disabled">
            </label>
            <label>Alumno:
                <input type="text" name="alumno" required>
            </label>
            <label>Email Alumno:
                <input type="email" name="email" required>
            </label>
            <label>Fecha:
                <input type="date" name="fecha" required>
            </label>
            <label>Hora:
                <input type="time" name="hora" required>
            </label>
            <button type="submit">Reservar</button>
        </form>
        <div id="reserva-msg" class="reserva-msg"></div>
    `;

    document.getElementById('reserva-form').onsubmit = async function(e) {
        e.preventDefault();
        const formData = new FormData(this);
        const res = await fetch('phpBack/reservas.php', {
            method: 'POST',
            body: formData
        });
        const data = await res.json();
        document.getElementById('reserva-msg').textContent = data.msg;
    };
}

window.mostrarTurnero = mostrarTurnero;
