document.getElementById('buscarPaciente').addEventListener('submit', function(e) {
    e.preventDefault();
    const id = document.getElementById('idPaciente').value;

    fetch('pacientes.xml') // Cambia a 'pacientes.json' si usas JSON
        .then(response => response.text())
        .then(data => {
            const parser = new DOMParser();
            const xml = parser.parseFromString(data, "application/xml");
            const pacientes = xml.getElementsByTagName('Paciente');
            let encontrado = false;

            // Limpiar la tabla antes de buscar
            const filaPaciente = document.getElementById('filaPaciente');
            filaPaciente.innerHTML = '';

            for (let paciente of pacientes) {
                if (paciente.getElementsByTagName('ID')[0].textContent == id) {
                    const nombre = paciente.getElementsByTagName('Nombre')[0].textContent;
                    const edad = paciente.getElementsByTagName('Edad')[0].textContent;
                    const genero = paciente.getElementsByTagName('Genero')[0].textContent;
                    const diagnostico = paciente.getElementsByTagName('Diagnostico')[0].textContent;

                    // Agregar los datos a la fila
                    filaPaciente.innerHTML = `
                        <td>${id}</td>
                        <td>${nombre}</td>
                        <td>${edad}</td>
                        <td>${genero}</td>
                        <td>${diagnostico}</td>
                    `;
                    
                    // Mostrar la tabla
                    document.getElementById('tablaPaciente').style.display = 'table';
                    encontrado = true;
                    break;
                }
            }

            if (!encontrado) {
                document.getElementById('mensajeError').innerText = `No existe el ID del paciente ${id}.`;
                document.getElementById('mensajeError').style.display = 'block';
                document.getElementById('tablaPaciente').style.display = 'none'; // Ocultar tabla si no se encuentra
            } else {
                document.getElementById('mensajeError').style.display = 'none'; // Ocultar mensaje de error
            }
        })
        .catch(error => console.error('Error:', error));
});
