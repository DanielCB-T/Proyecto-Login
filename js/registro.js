document.addEventListener('DOMContentLoaded', () => {
    // Referencias al formulario
    const formulario = document.getElementById('formularioRegistro');

    // Referencias a los campos
    const campoNombre = document.getElementById('nombre');
    const campoCorreo = document.getElementById('correo');
    const campoFechaNacimiento = document.getElementById('fechaNacimiento');
    const campoTelefono = document.getElementById('telefono');
    const campoCURP = document.getElementById('curp');
    const campoContrasena = document.getElementById('contrasena');
    const campoConfirmarContrasena = document.getElementById('confirmarContrasena');

    // Referencias al modal
    const modalEdad = document.getElementById('modalEdad');
    const textoModalEdad = document.getElementById('textoModalEdad');
    const cerrarModal = document.getElementById('cerrarModal');

    // Función auxiliar: marca un campo como válido o inválido
    const marcarEstado = (campoInput, esValido) => {
        const grupoCampo = campoInput.closest('.grupo-campo');
        if (esValido) {
            grupoCampo.classList.remove('invalido');
            grupoCampo.classList.add('valido');
        } else {
            grupoCampo.classList.remove('valido');
            grupoCampo.classList.add('invalido');
        }
        return esValido;
    };

    // Funciones de validación individuales
    const validarCampoNombre = () => {
        const valor = campoNombre.value.trim();
        return marcarEstado(campoNombre, valor.length > 0 && soloLetras(valor));
    };

    const validarCampoCorreo = () => {
        const valor = campoCorreo.value.trim();
        return marcarEstado(campoCorreo, validarCorreo(valor));
    };

    const validarCampoFechaNacimiento = () => {
        const valor = campoFechaNacimiento.value;
        if (!valor) return marcarEstado(campoFechaNacimiento, false);
        return marcarEstado(campoFechaNacimiento, esMayorDeEdad(valor));
    };

    const validarCampoTelefono = () => {
        const valor = campoTelefono.value.trim();
        return marcarEstado(campoTelefono, validarTelefono(valor));
    };

    const validarCampoCURP = () => {
        const valor = campoCURP.value.trim();
        return marcarEstado(campoCURP, validarCURP(valor));
    };

    const validarCampoContrasena = () => {
        const valor = campoContrasena.value;
        return marcarEstado(campoContrasena, validarPassword(valor));
    };

    const validarCampoConfirmarContrasena = () => {
        const valor = campoConfirmarContrasena.value;
        const coincide = valor === campoContrasena.value;
        const longitudValida = validarLongitud(valor, 20);
        return marcarEstado(campoConfirmarContrasena, coincide && longitudValida && valor.length > 0);
    };

    //Crea un arreglo vacio si no hay nada en localStorage, si hay entonces utiliza el arreglo (contenido) de localStorage
    const obtenerUsuarios = () =>
        JSON.parse(localStorage.getItem("usuarios")) || [];
    
    //Almacena el nuevo arreglo en localStorage
    const guardarUsuarios = (usuarios) => 
        localStorage.setItem("usuarios", JSON.stringify(usuarios));

    campoNombre.addEventListener('input', validarCampoNombre);
    campoCorreo.addEventListener('input', validarCampoCorreo);
    campoTelefono.addEventListener('input', validarCampoTelefono);
    campoCURP.addEventListener('input', validarCampoCURP);
    campoContrasena.addEventListener('input', () => {
        validarCampoContrasena();
        if (campoConfirmarContrasena.value) validarCampoConfirmarContrasena();
    });
    campoConfirmarContrasena.addEventListener('input', validarCampoConfirmarContrasena);

    // Al cambiar la fecha muestra el modal con la edad calculada
    campoFechaNacimiento.addEventListener('change', () => {
        const esFechaValida = validarCampoFechaNacimiento();
        if (campoFechaNacimiento.value) {
            const edadCalculada = calcularEdad(campoFechaNacimiento.value);
            if (esFechaValida) {
                textoModalEdad.textContent = `Tu edad calculada es de ${edadCalculada} años. ¡Acceso permitido!`;
            } else {
                textoModalEdad.textContent = `Tu edad calculada es de ${edadCalculada} años. Debes tener 18 años o más.`;
            }
            modalEdad.classList.add('activo');
        }
    });

    // Cierre del modal
    cerrarModal.addEventListener('click', () => {
        modalEdad.classList.remove('activo');
    });

    modalEdad.addEventListener('click', (evento) => {
        if (evento.target === modalEdad) {
            modalEdad.classList.remove('activo');
        }
    });

    formulario.addEventListener('submit', (evento) => {
        evento.preventDefault();

        const nombreValido = validarCampoNombre();
        const correoValido = validarCampoCorreo();
        const fechaNacimientoValida = validarCampoFechaNacimiento();
        const telefonoValido = validarCampoTelefono();
        const curpValida = validarCampoCURP();
        const contrasenaValida = validarCampoContrasena();
        const confirmarContrasenaValida = validarCampoConfirmarContrasena();

        // Console.log de cada validación
        console.log('--- Resultados de validación al enviar el formulario ---');
        console.log('validarCorreo("' + campoCorreo.value.trim() + '"):', validarCorreo(campoCorreo.value.trim()));
        console.log('soloLetras("' + campoNombre.value.trim() + '"):', soloLetras(campoNombre.value.trim()));
        console.log('validarLongitud(confirmarContrasena, 20):', validarLongitud(campoConfirmarContrasena.value, 20));
        console.log('calcularEdad("' + campoFechaNacimiento.value + '"):', calcularEdad(campoFechaNacimiento.value));
        console.log('esMayorDeEdad("' + campoFechaNacimiento.value + '"):', esMayorDeEdad(campoFechaNacimiento.value));
        console.log('validarPassword("' + campoContrasena.value + '"):', validarPassword(campoContrasena.value));
        console.log('validarTelefono("' + campoTelefono.value.trim() + '"):', validarTelefono(campoTelefono.value.trim()));
        console.log('validarCURP("' + campoCURP.value.trim() + '"):', validarCURP(campoCURP.value.trim()));
        console.log('--------------------------------------------------------');

        const todoCorrecto = nombreValido && correoValido && fechaNacimientoValida &&
            telefonoValido && curpValida && contrasenaValida && confirmarContrasenaValida;

        if (todoCorrecto) {
            console.log('Formulario enviado correctamente con los datos:', {
                nombre: campoNombre.value,
                correo: campoCorreo.value,
                fechaNacimiento: campoFechaNacimiento.value,
                telefono: campoTelefono.value,
                curp: campoCURP.value.toUpperCase()
            });
            Swal.fire({
                icon: 'success',
                title: 'Registro exitoso',
                text: 'Ahora puede usar sus credenciales para ingresar al sistema.'
            });

            //Aqui se pondra el codigo para guardar los datos
            
            const usuarios = obtenerUsuarios(); //Crea la variable usuarios y se le asigna obtenerUsuarios() para poder almacenar un nuevo usuario
            
            //Crea el usuario con los valores obtenidos de los campos correo y contrasena
            const nuevoUsuario = {
                nombre: campoNombre.value,
                correo: campoCorreo.value,
                fechaNacimiento: campoFechaNacimiento.value,
                telefono: campoTelefono.value,
                curp: campoCURP.value,
                password: campoContrasena.value,
            };

            usuarios.push(nuevoUsuario); // Almacena el nuevo usuario en el arreglo que contiene localStorage
            guardarUsuarios(usuarios); //Almacena el nuevo arreglo en localStorage
            console.log(localStorage);
            
            //Se guardan los usuarios aqui ya que de momento no tenemos una pagina para crear los usuarios y se necesita hacer uso de 
            //la informacion que se introduce aqui. En un futuro se planea solamente obtener los datos y comparar los ingresados en los campos
            //correo y contrasenia con los que ya estan almacenados en localStorage. Tambien se planea cambiar localStorage por una base de datos
            //en donde estaran los usuarios creados.

            //
            formulario.reset();
            document.querySelectorAll('.grupo-campo').forEach(grupo => {
                grupo.classList.remove('valido', 'invalido');
            });
        } else {
            console.log('Formulario con errores. Corrígelos antes de enviar.');
            Swal.fire({
                icon: 'warning',
                title: 'Verifique sus datos',
                text: 'Por favor, registre los datos de acuerdo a lo que se pide y no deje campos vacios.'
            });
        }
    });
});