const API_URL = 'http://localhost:3000/api/rutas';

const form = document.getElementById('form-ruta');

let editando = false;
let idEditando = null;

form.addEventListener('submit', guardarRuta);

async function obtenerRutas() {
    try {
        const response = await fetch(API_URL);
        const data = await response.json();

        mostrarRutas(data);
    } catch (error) {
        console.error(error);
    }
}

async function guardarRuta(e) {
    e.preventDefault();

    const origen = document.getElementById('origen').value;
    const destion = document.getElementById('destion').value;
    const precio = document.getElementById('precio').value;

    const datos = {
        origen,
        destion,
        precio
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
        obtenerRutas();

    } catch (error) {
        console.error(error);
    }
}

function mostrarRutas(rutas) {
    const tabla = document.getElementById('tabla-rutas');

    tabla.innerHTML = '';

    rutas.forEach((r) => {
        tabla.innerHTML += `
            <tr class="border-b border-outline-variant hover:bg-surface-container-low transition-colors">

                <td class="px-lg py-md font-data-tabular text-primary">
                    ${r.id}
                </td>

                <td class="px-lg py-md">
                    ${r.origen}
                </td>

                <td class="px-lg py-md">
                    ${r.destion}
                </td>

                <td class="px-lg py-md">
                    $${r.precio}
                </td>

                <td class="px-lg py-md text-right">
                    <div class="flex gap-sm justify-end">

                        <button
                            onclick='cargarRuta(${JSON.stringify(r)})'
                            class="bg-primary text-white px-3 py-1 rounded">
                            Editar
                        </button>

                        <button
                            onclick="eliminarRuta(${r.id})"
                            class="bg-error text-white px-3 py-1 rounded">
                            Eliminar
                        </button>

                    </div>
                </td>

            </tr>
        `;
    });
}

async function eliminarRuta(id) {
    try {
        await fetch(`${API_URL}/${id}`, {
            method: 'DELETE'
        });

        obtenerRutas();
    } catch (error) {
        console.error(error);
    }
}

function cargarRuta(r) {
    document.getElementById('origen').value = r.origen;
    document.getElementById('destion').value = r.destion;
    document.getElementById('precio').value = r.precio;

    editando = true;
    idEditando = r.id;
}

obtenerRutas();