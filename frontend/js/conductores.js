const API_URL = 'http://localhost:3000/api/conductores';

const form = document.getElementById('form-conductor');

let editando = false;
let idEditando = null;

form.addEventListener('submit', guardarConductor);

async function obtenerConductores() {
    try {
        const response = await fetch(API_URL);
        const data = await response.json();

        mostrarConductores(data);
    } catch (error) {
        console.error(error);
    }
}

async function guardarConductor(e) {
    e.preventDefault();

    const nombre = document.getElementById('nombre').value;
    const licencia = document.getElementById('licencia').value;
    const telefono = document.getElementById('telefono').value;

    const datos = {
        nombre,
        licencia,
        telefono
    };

    try {
        if (editando) {
            await fetch(`${API_URL}/${idEditando}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(datos)
            });

            editando = false;
            idEditando = null;

        } else {
            await fetch(API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(datos)
            });
        }

        form.reset();
        obtenerConductores();

    } catch (error) {
        console.error(error);
    }
}

function mostrarConductores(conductores) {
    const tabla = document.getElementById('tabla-conductores');

    tabla.innerHTML = '';

    conductores.forEach((c) => {
        tabla.innerHTML += `
            <tr class="border-b border-outline-variant hover:bg-surface-container-low transition-colors">

                <td class="px-lg py-md font-data-tabular text-primary">
                    ${c.id}
                </td>

                <td class="px-lg py-md">
                    ${c.nombre}
                </td>

                <td class="px-lg py-md">
                    ${c.licencia}
                </td>

                <td class="px-lg py-md">
                    ${c.telefono}
                </td>

                <td class="px-lg py-md text-right">
                    <div class="flex gap-sm justify-end">

                        <button
                            onclick='cargarConductor(${JSON.stringify(c)})'
                            class="bg-primary text-white px-3 py-1 rounded">
                            Editar
                        </button>

                        <button
                            onclick="eliminarConductor(${c.id})"
                            class="bg-error text-white px-3 py-1 rounded">
                            Eliminar
                        </button>

                    </div>
                </td>

            </tr>
        `;
    });
}

async function eliminarConductor(id) {
    try {
        await fetch(`${API_URL}/${id}`, {
            method: 'DELETE'
        });

        obtenerConductores();
    } catch (error) {
        console.error(error);
    }
}

function cargarConductor(c) {
    document.getElementById('nombre').value = c.nombre;
    document.getElementById('licencia').value = c.licencia;
    document.getElementById('telefono').value = c.telefono;

    editando = true;
    idEditando = c.id;
}

obtenerConductores();