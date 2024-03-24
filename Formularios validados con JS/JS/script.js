document.addEventListener("DOMContentLoaded", function() {
    const formulario = document.getElementById("formulario");
    const mensajeError = document.getElementById("mensajeError");
 

    formulario.addEventListener("submit", function(event) {
        event.preventDefault();
 

        // Obtener los valores de los campos
        const id = formulario.id.value;
        const nombre = formulario.nombre.value;
        const apellidos = formulario.apellidos.value;
        const telefono = formulario.telefono.value;
        const correo = formulario.correo.value;
        const edad = formulario.edad.value;
        const fechaNacimiento = formulario.fechaNacimiento.value;

        const errores = [];
        mensajeError.textContent =" "
 

        // Validar ID (5 dígitos exactos)
        if (!/^\d{5}$/.test(id)) {
            errores.push("El ID debe tener 5 dígitos exactos.");
        }
 

        // Validar nombre y apellidos (no pueden estar vacíos)
        if (nombre.trim() === "" || apellidos.trim() === "") {
            errores.push("El nombre y los apellidos no pueden estar vacíos.");
        }
 

        const telefonoInput = document.getElementById('telefono');

        telefonoInput.addEventListener('input', function() {
            
            let telefono = telefonoInput.value.replace(/\D/g, ''); // Eliminar caracteres que no sean dígitos

            // Aplicar formato (###)###-####
            if (telefono.length > 3) {
                telefono = `(${telefono.substring(0, 3)})${telefono.substring(3)}`;
            }

            if (telefono.length > 8) {
                telefono = `${telefono.substring(0, 8)}-${telefono.substring(8)}`;
            }

            // Actualizar el valor del campo de teléfono
            telefonoInput.value = telefono;
        });


        // Validar teléfono (###)###-####
        if (!/^\(\d{3}\)\d{3}-\d{4}$/.test(telefono)) {
            errores.push("El teléfono debe tener el formato (###)###-####.");
        }

 

        // Validar correo electrónico
        if (!/^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/.test(correo)) {
            errores.push("El correo electrónico no es válido.");
        }
 

        // Validar edad (número positivo)
        const edadNum = parseInt(edad);
        if (isNaN(edadNum) || edadNum <= 0) {
            errores.push("La edad debe ser un número positivo.");
        }
 

        // Validar fecha de nacimiento (AAAA-MM-DD)
        if (!/^\d{4}-\d{2}-\d{2}$/.test(fechaNacimiento)) {
            errores.push("La fecha de nacimiento debe tener el formato AAAA-MM-DD.");
        }

        if (errores.length > 0) {
            mensajeError.textContent = errores.join("\n"); // Concatenar los mensajes de error con salto de línea
            mensajeError.style.color = "red";
            mensajeError.style.whiteSpace = "pre-line";// Añadir esta línea para que los saltos de línea se muestren
        } else {
            // Si no hay errores, mostrar mensaje de éxito
            mensajeError.textContent = "Formulario enviado con éxito.";
            mensajeError.style.color = "green";

                // Crear un objeto con los datos del envío
            const envio = {
                id,
                nombre,
                apellidos,
                telefono,
                correo,
                edad,
                fechaNacimiento
            };
            // Obtener o inicializar un arreglo de envíos (puedes usar el almacenamiento local para mantener los envíos)
            const envios = JSON.parse(localStorage.getItem("envios")) || [];
            // Agregar el nuevo envío al arreglo
            envios.push(envio);
            // Guardar el arreglo actualizado en el almacenamiento local
            localStorage.setItem("envios", JSON.stringify(envios));
            // Redireccionar a la página de resultados
            window.location.href = "resultados.html";
        }
    });
});






