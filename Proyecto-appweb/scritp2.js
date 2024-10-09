document.getElementById('formRegistro').addEventListener('submit', function(event) {
    event.preventDefault();

    // Limpiar mensajes de error previos
    clearErrorMessages();

    // Capturamos los valores del formulario
    const marca = document.getElementById('marca').value.trim();
    const numeroSerie = document.getElementById('numero-serie').value.trim();
    const fechaAdquisicion = document.getElementById('fecha-adquisicion').value;
    const fechaMantenimiento = document.getElementById('fecha-mantenimiento').value;
    const especificaciones = document.getElementById('especificaciones').value.trim();
    const descripcionMantenimiento = document.getElementById('descripcion-mantenimiento').value.trim();

    let hasError = false;

    // Validaciones manuales
    if (!marca) {
        showError('marca-error');
        hasError = true;
    }
    if (!numeroSerie) {
        showError('numero-serie-error');
        hasError = true;
    }
    if (!fechaAdquisicion) {
        showError('fecha-adquisicion-error');
        hasError = true;
    }
    if (!especificaciones) {
        showError('especificaciones-error');
        hasError = true;
    }

    if (!hasError) {
        // Creamos un objeto con los datos
        const equipo = {
            marca,
            numeroSerie,
            fechaAdquisicion,
            fechaMantenimiento,
            especificaciones,
            descripcionMantenimiento,
            estado: 'Ninguno', // Valor por defecto
            lugar: 'No asignado', // Valor por defecto
            responsable: 'No asignado' // Valor por defecto
        };

        // Guardamos los datos en localStorage
        let inventario = JSON.parse(localStorage.getItem('inventario')) || [];
        inventario.push(equipo);
        localStorage.setItem('inventario', JSON.stringify(inventario));

        // Redireccionamos a la página de inventario
        window.location.href = 'tabla.html';
    }
});

function showError(elementId) {
    const errorElement = document.getElementById(elementId);
    errorElement.style.display = 'block'; // Mostrar mensaje de error
}

function clearErrorMessages() {
    const errorElements = document.querySelectorAll('.error-message');
    errorElements.forEach(el => el.style.display = 'none'); // Ocultar todos los mensajes de error
}
