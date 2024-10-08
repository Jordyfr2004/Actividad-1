let inventario = JSON.parse(localStorage.getItem('inventario')) || [];
let editingIndex = null;
let deletingIndex = null; // Variable para almacenar el índice del equipo a eliminar

const inventarioBody = document.getElementById('inventario-body');

function renderTable() {
    inventarioBody.innerHTML = ''; // Limpiar tabla antes de renderizar

    inventario.forEach((equipo, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${equipo.marca}</td>
            <td>${equipo.numero_serie}</td>
            <td>${equipo.fecha_adquisicion}</td>
            <td>${equipo.especificaciones}</td>
            <td>${equipo.fecha_mantenimiento}</td>
            <td>${equipo.descripcion_mantenimiento}</td>
            <td>${equipo.estado}</td>
            <td>${equipo.lugar}</td>
            <td>${equipo.responsable}</td>
            <td>
                <button class="edit-btn" onclick="openEditModal(${index})">Editar</button>
                <button class="delete-btn" onclick="deleteEquipo(${index})">Eliminar</button>
            </td>
        `;
        inventarioBody.appendChild(row);
    });

    // Actualizar estadísticas
    document.getElementById('total-equipos').textContent = inventario.length;
    document.getElementById('total-uso').textContent = inventario.filter(e => e.estado === 'En Uso').length;
    document.getElementById('total-mal-estado').textContent = inventario.filter(e => e.estado === 'Dañado').length;
}

function openEditModal(index) {
    editingIndex = index; // Guardar el índice del equipo a editar
    const equipo = inventario[index];

    document.getElementById('edit-marca').value = equipo.marca;
    document.getElementById('edit-numero-serie').value = equipo.numero_serie;
    document.getElementById('edit-fecha-adquisicion').value = equipo.fecha_adquisicion;
    document.getElementById('edit-especificaciones').value = equipo.especificaciones;
    document.getElementById('edit-fecha-mantenimiento').value = equipo.fecha_mantenimiento;
    document.getElementById('edit-descripcion-mantenimiento').value = equipo.descripcion_mantenimiento;
    document.getElementById('edit-estado').value = equipo.estado;
    document.getElementById('edit-lugar').value = equipo.lugar;
    document.getElementById('edit-responsable').value = equipo.responsable;

    document.getElementById('modal-overlay').style.display = 'block';
    document.getElementById('edit-modal').style.display = 'block';
}

function closeModal() {
    document.getElementById('modal-overlay').style.display = 'none';
    document.getElementById('edit-modal').style.display = 'none';
}

function saveChanges() {
    const marca = document.getElementById('edit-marca').value;
    const numeroSerie = document.getElementById('edit-numero-serie').value;
    const fechaAdquisicion = document.getElementById('edit-fecha-adquisicion').value;
    const especificaciones = document.getElementById('edit-especificaciones').value;
    const fechaMantenimiento = document.getElementById('edit-fecha-mantenimiento').value;
    const descripcionMantenimiento = document.getElementById('edit-descripcion-mantenimiento').value;
    const estado = document.getElementById('edit-estado').value;
    const lugar = document.getElementById('edit-lugar').value;
    const responsable = document.getElementById('edit-responsable').value;

    // Validación de campos
    let isValid = true;
    clearErrors();

    if (!marca) {
        showError('marca-error', 'La marca es requerida.');
        isValid = false;
    }
    if (!numeroSerie) {
        showError('numero-serie-error', 'El número de serie es requerido.');
        isValid = false;
    }
    if (!fechaAdquisicion) {
        showError('fecha-adquisicion-error', 'La fecha de adquisición es requerida.');
        isValid = false;
    }
    if (!especificaciones) {
        showError('especificaciones-error', 'Las especificaciones son requeridas.');
        isValid = false;
    }
    if (!fechaMantenimiento) {
        showError('fecha-mantenimiento-error', 'La fecha de mantenimiento es requerida.');
        isValid = false;
    }
    if (!descripcionMantenimiento) {
        showError('descripcion-mantenimiento-error', 'La descripción del mantenimiento es requerida.');
        isValid = false;
    }
    if (!estado) {
        showError('estado-error', 'El estado es requerido.');
        isValid = false;
    }
    if (!lugar) {
        showError('lugar-error', 'El lugar es requerido.');
        isValid = false;
    }
    if (!responsable) {
        showError('responsable-error', 'El responsable es requerido.');
        isValid = false;
    }

    if (isValid) {
        inventario[editingIndex] = {
            marca,
            numero_serie: numeroSerie,
            fecha_adquisicion: fechaAdquisicion,
            especificaciones: especificaciones,
            fecha_mantenimiento: fechaMantenimiento,
            descripcion_mantenimiento: descripcionMantenimiento,
            estado: estado,
            lugar: lugar,
            responsable: responsable,
        };

        localStorage.setItem('inventario', JSON.stringify(inventario));
        closeModal(); // Cerrar el modal
        renderTable(); // Actualizar la tabla
    }
}

function clearErrors() {
    document.querySelectorAll('.error-message').forEach(el => el.textContent = '');
}

function showError(elementId, message) {
    document.getElementById(elementId).textContent = message;
}

function openConfirmDeleteModal(index) {
    deletingIndex = index; // Guardar el índice del equipo a eliminar
    document.getElementById('modal-overlay').style.display = 'block';
    document.getElementById('confirm-delete-modal').style.display = 'block';
}

function closeConfirmDeleteModal() {
    document.getElementById('modal-overlay').style.display = 'none';
    document.getElementById('confirm-delete-modal').style.display = 'none';
}

function confirmDelete() {
    inventario.splice(deletingIndex, 1); // Eliminar el equipo usando el índice guardado
    localStorage.setItem('inventario', JSON.stringify(inventario));
    closeConfirmDeleteModal(); // Cerrar el modal
    renderTable(); // Actualizar la tabla
}

// Modificar la función deleteEquipo para usar el modal
function deleteEquipo(index) {
    openConfirmDeleteModal(index); // Abre el modal de confirmación
}

// Renderizar la tabla al cargar
renderTable();
