document.addEventListener('DOMContentLoaded', function() {
    const formulario = document.getElementById('formularioLogin');
    const campoCorreo = document.getElementById('correo');
    const campoContrasena = document.getElementById('contrasena');

    function marcarEstado(campoInput, esValido) {
        const grupoCampo = campoInput.closest('.grupo-campo');
        if (esValido) {
            grupoCampo.classList.remove('invalido');
            grupoCampo.classList.add('valido');
        } else {
            grupoCampo.classList.remove('valido');
            grupoCampo.classList.add('invalido');
        }
        return esValido;
    }

    function validarCampoCorreo() {
        return marcarEstado(campoCorreo, validarCorreo(campoCorreo.value.trim()));
    }

    function validarCampoContrasena() {
        return marcarEstado(campoContrasena, validarPassword(campoContrasena.value));
    }

    function obtenerAlumnos() {
        return JSON.parse(localStorage.getItem('alumnos')) || [];
    }

    campoCorreo.addEventListener('input', validarCampoCorreo);
    campoContrasena.addEventListener('input', validarCampoContrasena);

    formulario.addEventListener('submit', function(evento) {
        evento.preventDefault();

        const correoValido = validarCampoCorreo();
        const contrasenaValida = validarCampoContrasena();

        if (correoValido && contrasenaValida) {
            const alumnos = obtenerAlumnos();
            const alumnoEncontrado = alumnos.find(function(alumno) {
                return alumno.correo === campoCorreo.value.trim() &&
                       alumno.password === campoContrasena.value;
            });

            if (alumnoEncontrado) {
                const usuarioLogueado = {
                    nombre: alumnoEncontrado.nombre,
                    correo: alumnoEncontrado.correo
                };
                localStorage.setItem('usuarioLogueado', JSON.stringify(usuarioLogueado));

                formulario.reset();
                document.querySelectorAll('.grupo-campo').forEach(function(grupo) {
                    grupo.classList.remove('valido', 'invalido');
                });
                window.location.href = 'index.html';
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Credenciales incorrectas',
                    text: 'Correo o contraseña incorrectos. Verifica tus datos.'
                });
            }
        } else {
            Swal.fire({
                icon: 'warning',
                title: 'Formato no valido',
                text: 'Por favor, ingresa correctamente los datos.'
            });
        }
    });
});