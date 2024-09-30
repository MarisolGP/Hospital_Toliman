document.getElementById('buscarMedico').addEventListener('submit', function(e) {
    e.preventDefault();
    const id = document.getElementById('idMedico').value;
    
    fetch('doctores.json')
        .then(response => response.json())
        .then(data => {
            const medicos = data.Medicos;
            const medico = medicos.find(m => m.ID == id);
            const resultadoMedico = document.getElementById('resultadoMedico');
            
            if (medico) {
                resultadoMedico.innerHTML = `
                    <div class="medico-details">
                        <h3>Detalles del Médico</h3>
                        <p><strong>ID:</strong> <span>${medico.ID}</span></p>
                        <p><strong>Nombre:</strong> <span>${medico.Nombre}</span></p>
                        <p><strong>Especialidad:</strong> <span>${medico.Especialidad}</span></p>
                        <p><strong>Teléfono:</strong> <span>${medico.Telefono}</span></p>
                        <p><strong>Correo:</strong> <span>${medico.Correo}</span></p>
                    </div>
                `;
                resultadoMedico.classList.add('resultado-exitoso');
            } else {
                resultadoMedico.innerHTML = `<p class="resultado-error">No se encontró ningún médico con el ID <strong>${id}</strong>.</p>`;
                resultadoMedico.classList.remove('resultado-exitoso');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            document.getElementById('resultadoMedico').innerHTML = `<p class="resultado-error">Error, No existente.</p>`;
        });
});
