document.addEventListener('DOMContentLoaded', () => {
    // Referencias al formulario y campos
    const formulario = document.getElementById('formularioLogin');
    const campoCorreo = document.getElementById('correo');
    const campoContrasena = document.getElementById('contrasena');

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
    const validarCampoCorreo = () => {
        return marcarEstado(campoCorreo, validarCorreo(campoCorreo.value.trim()));
    };

    const validarCampoContrasena = () => {
        return marcarEstado(campoContrasena, validarPassword(campoContrasena.value));
    };

    const obtenerUsuarios = () =>
        JSON.parse(localStorage.getItem("usuarios")) || [];
    
    //Almacena el nuevo arreglo en localStorage
    const guardarUsuarios = (usuarios) => 
        localStorage.setItem("usuarios", JSON.stringify(usuarios));

    // Escuchadores en tiempo real (sin console.log)
    campoCorreo.addEventListener('input', validarCampoCorreo);
    campoContrasena.addEventListener('input', validarCampoContrasena);

    // Envío del formulario
    formulario.addEventListener('submit', (evento) => {
        evento.preventDefault();

        const correoValido = validarCampoCorreo();
        const contrasenaValida = validarCampoContrasena();

        if (correoValido && contrasenaValida) {
            //Aqui se debe comparar la informacion ingresada con la que esta en localStorage.
            const usuarios = obtenerUsuarios();
            const usuarioEncontrado = usuarios.find(usuario =>
                usuario.correo === campoCorreo.value.trim() &&
                usuario.password === campoContrasena.value
            );   

            if (usuarioEncontrado){
                formulario.reset();
                document.querySelectorAll('.grupo-campo').forEach(grupo => {
                    grupo.classList.remove('valido', 'invalido');
                });
                window.location.href = "index.html"; //redirige a index al momento de dar click al boton.     
            }
            else{
                Swal.fire({
                icon: 'error',
                title: 'Credenciales incorrectas',
                text: 'Por favor, ingresa una credencial valida o verifique que sus datos esten correctos.'
            });
            }
            //
            
        } else {
            Swal.fire({
                icon: 'warning',
                title: 'Formato no valido',
                text: 'Por favor, ingresa correctamente los datos.'
            });
        }
    });
});