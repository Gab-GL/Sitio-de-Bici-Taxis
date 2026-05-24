const API_URL = 'http://localhost:3000/api/bicitaxis';

const form = document.getElementById('form-bicitaxi');
let editando = false;

let idEditando = null;

form.addEventListener('submit', crearBicitaxi);

async function obtenerBicitaxis() {

    try {

        const response = await fetch(API_URL);

        const data = await response.json();

        mostrarBicitaxis(data);

    } catch (error) {

        console.error(error);
    }
}

async function crearBicitaxi(e) {

    e.preventDefault();

    const modelo = document.getElementById('modelo').value;

    const estado = document.getElementById('estado').value;

    const ubicacion = document.getElementById('ubicacion').value;

    const datos = {
        modelo,
        estado,
        ubicacion
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

        obtenerBicitaxis();

    } catch (error) {

        console.error(error);
    }
}
function mostrarBicitaxis(bicitaxis) {

    const tabla = document.getElementById('tabla-bicitaxis');

    tabla.innerHTML = '';

    bicitaxis.forEach((bici) => {

        tabla.innerHTML += `
            <tr class="border-b border-outline-variant hover:bg-surface-container-low transition-colors">

                <td class="px-lg py-md font-data-tabular text-primary border-r border-outline-variant">
                    ${bici.id}
                </td>

                <td class="px-lg py-md">
                    ${bici.modelo}
                </td>

                <td class="px-lg py-md">
                    ${bici.estado}
                </td>

                <td class="px-lg py-md">
                    ${bici.ubicacion}
                </td>

                      <td class="px-lg py-md text-right">
                    
                        <div class="flex gap-sm justify-end">
                    
                            <button
                                onclick='cargarBicitaxi(
                                    ${JSON.stringify(bici)}
                                )'
                                class="bg-primary text-white px-3 py-1 rounded">
                    
                                Editar
                    
                            </button>
                    
                            <button
                                onclick="eliminarBicitaxi(${bici.id})"
                                class="bg-error text-white px-3 py-1 rounded">
                    
                                Eliminar
                    
                            </button>
                    
                        </div>
                    
                    </td>

            </tr>
        `;
    });
}

async function eliminarBicitaxi(id) {

    try {

        await fetch(`${API_URL}/${id}`, {

            method: 'DELETE'
        });

        obtenerBicitaxis();

    } catch (error) {

        console.error(error);
    }
}

function cargarBicitaxi(bici) {

    document.getElementById('modelo').value =
        bici.modelo;

    document.getElementById('estado').value =
        bici.estado;

    document.getElementById('ubicacion').value =
        bici.ubicacion;

    editando = true;

    idEditando = bici.id;
}


obtenerBicitaxis();