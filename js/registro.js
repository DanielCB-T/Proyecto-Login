document.addEventListener('DOMContentLoaded', function() {
    const formulario = document.getElementById('formularioRegistro');

    const campoNombre = document.getElementById('nombre');
    const campoCorreo = document.getElementById('correo');
    const campoNumControl = document.getElementById('numControl');
    const campoEdad = document.getElementById('edad');
    const campoContrasena = document.getElementById('contrasena');
    const campoConfirmarContrasena = document.getElementById('confirmarContrasena');

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

    function validarCampoNombre() {
        const valor = campoNombre.value.trim();
        return marcarEstado(campoNombre, valor.length > 0 && soloLetras(valor));
    }

    function validarCampoCorreo() {
        const valor = campoCorreo.value.trim();
        return marcarEstado(campoCorreo, validarCorreo(valor));
    }

    function validarCampoNumControl() {
        const valor = campoNumControl.value.trim();
        return marcarEstado(campoNumControl, /^\d{6}$/.test(valor));
    }

    function validarCampoEdad() {
        const valor = campoEdad.value.trim();
        const num = parseInt(valor);
        return marcarEstado(campoEdad, !isNaN(num) && num >= 1 && num <= 100);
    }

    function validarCampoContrasena() {
        const valor = campoContrasena.value;
        return marcarEstado(campoContrasena, /^[A-Za-z\d]{8,}$/.test(valor));
    }

    function validarCampoConfirmarContrasena() {
        const valor = campoConfirmarContrasena.value;
        const coincide = valor === campoContrasena.value;
        return marcarEstado(campoConfirmarContrasena, coincide && valor.length > 0);
    }

    function obtenerAlumnos() {
        return JSON.parse(localStorage.getItem('alumnos')) || [];
    }

    function guardarAlumnos(alumnos) {
        localStorage.setItem('alumnos', JSON.stringify(alumnos));
    }

    campoNombre.addEventListener('input', validarCampoNombre);
    campoCorreo.addEventListener('input', validarCampoCorreo);
    campoNumControl.addEventListener('input', validarCampoNumControl);
    campoEdad.addEventListener('input', validarCampoEdad);
    campoContrasena.addEventListener('input', function() {
        validarCampoContrasena();
        if (campoConfirmarContrasena.value) {
            validarCampoConfirmarContrasena();
        }
    });
    campoConfirmarContrasena.addEventListener('input', validarCampoConfirmarContrasena);

    formulario.addEventListener('submit', function(evento) {
        evento.preventDefault();

        const nombreValido = validarCampoNombre();
        const correoValido = validarCampoCorreo();
        const numControlValido = validarCampoNumControl();
        const edadValida = validarCampoEdad();
        const contrasenaValida = validarCampoContrasena();
        const confirmarValida = validarCampoConfirmarContrasena();

        const todoCorrecto = nombreValido && correoValido && numControlValido &&
            edadValida && contrasenaValida && confirmarValida;

        if (todoCorrecto) {
            const alumnos = obtenerAlumnos();

            if (alumnos.some(function(a) { return a.correo === campoCorreo.value.trim(); })) {
                Swal.fire({
                    icon: 'error',
                    title: 'Correo ya registrado',
                    text: 'Este correo ya esta registrado. Usa otro o inicia sesion.'
                });
                return;
            }

            if (alumnos.some(function(a) { return a.numControl === campoNumControl.value.trim(); })) {
                Swal.fire({
                    icon: 'error',
                    title: 'Numero de control ya registrado',
                    text: 'Este numero de control ya esta registrado.'
                });
                return;
            }

            const nuevoAlumno = {
                id: Date.now(),
                nombre: campoNombre.value.trim(),
                correo: campoCorreo.value.trim(),
                numControl: campoNumControl.value.trim(),
                edad: parseInt(campoEdad.value.trim()),
                password: campoContrasena.value
            };

            alumnos.push(nuevoAlumno);
            guardarAlumnos(alumnos);

            Swal.fire({
                icon: 'success',
                title: 'Registro exitoso',
                text: 'Ahora puedes iniciar sesion con tus credenciales.'
            }).then(function() {
                window.location.href = 'login.html';
            });

            formulario.reset();
            document.querySelectorAll('.grupo-campo').forEach(function(grupo) {
                grupo.classList.remove('valido', 'invalido');
            });
        } else {
            Swal.fire({
                icon: 'warning',
                title: 'Verifica tus datos',
                text: 'Por favor, corrige los campos marcados en rojo.'
            });
        }
    });
});