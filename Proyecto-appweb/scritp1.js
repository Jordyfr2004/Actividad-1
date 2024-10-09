let inventario = JSON.parse(localStorage.getItem('inventario')) || [];
        let editingIndex = null;

        const inventarioBody = document.getElementById('inventario-body');

        function renderTable() {
            inventarioBody.innerHTML = ''; // Limpiar la tabla
            let equiposEnUso = 0; // Variable para contar los equipos en uso
            let equiposMalEstado = 0; // Variable para contar los equipos dañados

            inventario.forEach((equipo, index) => {
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
                    <td>
                        <button class="edit-btn" onclick="editRow(${index})">Editar</button>
                        <button class="delete-btn" onclick="deleteRow(${index})">Eliminar</button>
                    </td>
                `;
                inventarioBody.appendChild(row);

                // Contar equipos en uso y mal estado
                if (equipo.estado === "En Uso") {
                    equiposEnUso++;
                }
                // Aquí suponemos que un equipo está en mal estado
                if (equipo.estado === "Dañado") {
                    equiposMalEstado++;
                }
            });

            document.getElementById('total-equipos').innerText = inventario.length;
            document.getElementById('total-uso').innerText = equiposEnUso;
            document.getElementById('total-mal-estado').innerText = equiposMalEstado;
        }

        function editRow(index) {
            editingIndex = index;
            const equipo = inventario[index];

            // Rellenar el formulario con los datos del equipo seleccionado
            document.getElementById('edit-marca').value = equipo.marca;
            document.getElementById('edit-numero-serie').value = equipo.numeroSerie;
            document.getElementById('edit-fecha-adquisicion').value = equipo.fechaAdquisicion;
            document.getElementById('edit-especificaciones').value = equipo.especificaciones;
            document.getElementById('edit-fecha-mantenimiento').value = equipo.fechaMantenimiento;
            document.getElementById('edit-descripcion-mantenimiento').value = equipo.descripcionMantenimiento;
            document.getElementById('edit-estado').value = equipo.estado;
            document.getElementById('edit-lugar').value = equipo.lugar;
            document.getElementById('edit-responsable').value = equipo.responsable;

            // Limpiar mensajes de error
            clearErrorMessages();

            // Mostrar el modal
            document.getElementById('modal-overlay').style.display = 'block';
            document.getElementById('edit-modal').style.display = 'block';
        }

        function closeModal() {
            // Limpiar el formulario y mensajes de error
            document.getElementById('edit-form').reset();
            clearErrorMessages();
            // Ocultar el modal
            document.getElementById('modal-overlay').style.display = 'none';
            document.getElementById('edit-modal').style.display = 'none';
            editingIndex = null; // Resetear el índice de edición
        }

        function saveChanges() {
            // Obtener los valores del formulario
            const marca = document.getElementById('edit-marca').value.trim();
            const numeroSerie = document.getElementById('edit-numero-serie').value.trim();
            const fechaAdquisicion = document.getElementById('edit-fecha-adquisicion').value;
            const especificaciones = document.getElementById('edit-especificaciones').value.trim();
            const fechaMantenimiento = document.getElementById('edit-fecha-mantenimiento').value;
            const descripcionMantenimiento = document.getElementById('edit-descripcion-mantenimiento').value.trim();
            const estado = document.getElementById('edit-estado').value;
            const lugar = document.getElementById('edit-lugar').value.trim();
            const responsable = document.getElementById('edit-responsable').value.trim();

            let hasError = false;

            // Validaciones manuales
            if (!marca) {
                showError('marca-error', 'Este campo no debe estar vacío.');
                hasError = true;
            }
            if (!numeroSerie) {
                showError('numero-serie-error', 'Este campo no debe estar vacío.');
                hasError = true;
            }
            if (!fechaAdquisicion) {
                showError('fecha-adquisicion-error', 'Este campo no debe estar vacío.');
                hasError = true;
            }
            if (!especificaciones) {
                showError('especificaciones-error', 'Este campo no debe estar vacío.');
                hasError = true;
            }
            if (!estado) {
                showError('estado-error', 'Este campo no debe estar vacío.');
                hasError = true;
            }
            if (!lugar) {
                showError('lugar-error', 'Este campo no debe estar vacío.');
                hasError = true;
            }
            if (!responsable) {
                showError('responsable-error', 'Este campo no debe estar vacío.');
                hasError = true;
            }

            if (hasError) return; // Detener el proceso si hay errores

            // Actualizar el equipo en la lista de inventario
            inventario[editingIndex] = {
                marca,
                numeroSerie,
                fechaAdquisicion,
                especificaciones,
                fechaMantenimiento,
                descripcionMantenimiento,
                estado,
                lugar,
                responsable
            };

            // Guardar en localStorage
            localStorage.setItem('inventario', JSON.stringify(inventario));

            // Volver a renderizar la tabla y cerrar el modal
            renderTable();
            closeModal();
        }

        function showError(elementId, message) {
            const errorElement = document.getElementById(elementId);
            errorElement.innerText = message;
        }

        function clearErrorMessages() {
            const errorElements = document.querySelectorAll('.error-message');
            errorElements.forEach(el => el.innerText = '');
        }

        let deleteIndex = null;

        function deleteRow(index) {
            // Guardar el índice del equipo que se va a eliminar
            deleteIndex = index;
            // Mostrar el modal de confirmación
            document.getElementById('modal-overlay').style.display = 'block';
            document.getElementById('confirm-delete-modal').style.display = 'block';
        }

        function confirmDelete() {
            // Eliminar el equipo del inventario
            inventario.splice(deleteIndex, 1);
            // Guardar los cambios en localStorage
            localStorage.setItem('inventario', JSON.stringify(inventario));
            // Volver a renderizar la tabla
            renderTable();
            // Cerrar el modal
            closeConfirmDeleteModal();
        }

        function closeConfirmDeleteModal() {
            // Ocultar el modal de confirmación
            document.getElementById('modal-overlay').style.display = 'none';
            document.getElementById('confirm-delete-modal').style.display = 'none';
        }


        renderTable(); // Inicializar la tabla al cargar la página