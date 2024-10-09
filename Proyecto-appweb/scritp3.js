// Recuperamos el inventario de localStorage
const inventario = JSON.parse(localStorage.getItem('inventario')) || [];

// Función para mostrar los datos en la tabla
function renderTable(data) {
    const inventarioBody = document.getElementById('inventario-body');
    inventarioBody.innerHTML = ''; // Limpiar tabla

    let equiposEnUso = 0; // Contador de equipos en uso
    let equiposMalEstado = 0; // Contador de equipos en mal estado

    data.forEach((equipo) => {
        const row = document.createElement('tr');

        row.innerHTML = `
            <td>${equipo.marca}</td>
            <td>${equipo.numeroSerie}</td>
            <td>${equipo.fechaAdquisicion}</td>
            <td>${equipo.especificaciones}</td>
            <td>${equipo.fechaMantenimiento}</td>
            <td>${equipo.descripcionMantenimiento}</td>
            <td>${equipo.estado}</td>
            <td>${equipo.lugar}</td>
            <td>${equipo.responsable}</td>
        `;

        inventarioBody.appendChild(row);

        // Contar equipos en uso y en mal estado
        if (equipo.estado === "En Uso") {
            equiposEnUso++;
        }
        if (equipo.estado === "Dañado") {
            equiposMalEstado++;
        }
    });

    // Actualizar estadísticas
    document.getElementById('total-equipos').innerText = data.length;
    document.getElementById('total-uso').innerText = equiposEnUso;
    document.getElementById('total-mal-estado').innerText = equiposMalEstado;
}

// Función para filtrar la tabla
function filterTable() {
    const searchOption = document.getElementById('search-option').value;
    const searchValue = document.getElementById('search-value').value.toLowerCase();

    const filteredData = inventario.filter(equipo => {
        return (
            (equipo[searchOption]?.toLowerCase().includes(searchValue) || searchValue === '')
        );
    });

    renderTable(filteredData); // Renderizamos la tabla con los datos filtrados
}

// Renderizamos la tabla inicialmente
renderTable(inventario);
