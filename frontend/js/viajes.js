const API_URL = 'http://localhost:3000/api/viajes';

const API_CONDUCTORES = 'http://localhost:3000/api/conductores';
const API_RUTAS = 'http://localhost:3000/api/rutas';
const API_BICITAXIS = 'http://localhost:3000/api/bicitaxis';

const form = document.getElementById('form-viaje');

let editando = false;
let idEditando = null;

form.addEventListener('submit', guardarViaje);

async function cargarOpciones() {

    try {

        const [
            conductoresRes,
            rutasRes,
            bicitaxisRes
        ] = await Promise.all([
            fetch(API_CONDUCTORES),
            fetch(API_RUTAS),
            fetch(API_BICITAXIS)
        ]);

        const conductores = await conductoresRes.json();
        const rutas = await rutasRes.json();
        const bicitaxis = await bicitaxisRes.json();

        cargarConductores(conductores);
        cargarRutas(rutas);
        cargarBicitaxis(bicitaxis);

    } catch (error) {
        console.error(error);
    }
}

function cargarConductores(conductores) {

    const select = document.getElementById('conductor_id');

    select.innerHTML = `
        <option value="">
            Selecciona un conductor
        </option>
    `;

    conductores.forEach((c) => {

        select.innerHTML += `
            <option value="${c.id}">
                ${c.nombre}
            </option>
        `;
    });
}

function cargarRutas(rutas) {

    const select = document.getElementById('ruta_id');

    select.innerHTML = `
        <option value="">
            Selecciona una ruta
        </option>
    `;

    rutas.forEach((r) => {

        select.innerHTML += `
            <option value="${r.id}">
                ${r.origen} → ${r.destion} ($${r.precio})
            </option>
        `;
    });
}

function cargarBicitaxis(bicitaxis) {

    const select = document.getElementById('bicitaxi_id');

    select.innerHTML = `
        <option value="">
            Selecciona un bicitaxi
        </option>
    `;

    bicitaxis.forEach((b) => {

        select.innerHTML += `
            <option value="${b.id}">
                ${b.modelo}
            </option>
        `;
    });
}

async function obtenerViajes() {

    try {

        const response = await fetch(API_URL);

        const data = await response.json();

        mostrarViajes(data);

    } catch (error) {

        console.error(error);
    }
}

async function guardarViaje(e) {

    e.preventDefault();

    const ruta_id = document.getElementById('ruta_id').value;

    const conductor_id = document.getElementById('conductor_id').value;

    const bicitaxi_id = document.getElementById('bicitaxi_id').value;

    const datos = {
        ruta_id,
        conductor_id,
        bicitaxi_id
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

        obtenerViajes();

    } catch (error) {

        console.error(error);
    }
}

function mostrarViajes(viajes) {

    const tabla = document.getElementById('tabla-viajes');

    tabla.innerHTML = '';

    viajes.forEach((v) => {

        tabla.innerHTML += `
            <tr class="border-b border-outline-variant hover:bg-surface-container-low transition-colors">

                <td class="px-lg py-md font-data-tabular text-primary">
                    ${v.id}
                </td>

                <td class="px-lg py-md">
                    ${v.conductor}
                </td>

                <td class="px-lg py-md">
                    ${v.origen} → ${v.destion}
                </td>

                <td class="px-lg py-md">
                    $${v.precio}
                </td>

                <td class="px-lg py-md">
                    ${v.bicitaxi}
                </td>

                <td class="px-lg py-md text-right">

                    <div class="flex gap-sm justify-end">

                        <button
                            onclick='cargarViaje(${JSON.stringify(v)})'
                            class="bg-primary text-white px-3 py-1 rounded">

                            Editar

                        </button>

                        <button
                            onclick="eliminarViaje(${v.id})"
                            class="bg-error text-white px-3 py-1 rounded">

                            Eliminar

                        </button>

                    </div>

                </td>

            </tr>
        `;
    });
}

async function eliminarViaje(id) {

    try {

        await fetch(`${API_URL}/${id}`, {
            method: 'DELETE'
        });

        obtenerViajes();

    } catch (error) {

        console.error(error);
    }
}

function cargarViaje(v) {

    document.getElementById('ruta_id').value = v.ruta_id;

    document.getElementById('conductor_id').value = v.conductor_id;

    document.getElementById('bicitaxi_id').value = v.bicitaxi_id;

    editando = true;

    idEditando = v.id;
}

cargarOpciones();

obtenerViajes();