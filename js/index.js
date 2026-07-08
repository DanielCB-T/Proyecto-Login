document.addEventListener('DOMContentLoaded', function() {
    // ===== VERIFICAR SESION =====
    const usuarioLogueado = JSON.parse(localStorage.getItem('usuarioLogueado'));
    if (!usuarioLogueado) {
        window.location.href = 'login.html';
        return;
    }

    // ===== VARIABLES =====
    let alumnos = JSON.parse(localStorage.getItem('alumnos')) || [];

    // ===== ELEMENTOS =====
    const menuCaptura = document.getElementById('menuCaptura');
    const vistaBienvenida = document.getElementById('vistaBienvenida');
    const vistaCaptura = document.getElementById('vistaCaptura');
    const cuerpoTabla = document.getElementById('cuerpoTabla');
    const formulario = document.getElementById('formularioAlumno');

    // ===== MOSTRAR FORMULARIO CAPTURA =====
    if (menuCaptura) {
        menuCaptura.addEventListener('click', function(e) {
            e.preventDefault();
            vistaBienvenida.style.display = 'none';
            vistaCaptura.style.display = 'block';
            cargarTablaAlumnos();
            const sidebar = document.getElementById('sidebar');
            const overlay = document.getElementById('overlay');
            if (sidebar) sidebar.classList.remove('abierto');
            if (overlay) overlay.classList.remove('activo');
            document.body.style.overflow = '';
        });
    }

    // ===== VALIDACIONES =====
    function validarNombre(nombre) {
        return /^[A-Za-záéíóúÁÉÍÓÚñÑ\s]+$/.test(nombre);
    }

    function validarNumControl(num) {
        return /^\d{6}$/.test(num);
    }

    function validarCorreo(correo) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo);
    }

    function validarContrasena(contra) {
        return /^[A-Za-z\d]{8,}$/.test(contra);
    }

    function validarEdad(edad) {
        const num = parseInt(edad);
        return !isNaN(num) && num >= 1 && num <= 100;
    }

    function limpiarValidaciones() {
        document.querySelectorAll('.grupo-campo').forEach(function(grupo) {
            grupo.classList.remove('valido', 'invalido');
        });
    }

    function validarCampo(input, valido, grupoId) {
        const grupo = document.getElementById(grupoId);
        if (grupo) {
            grupo.classList.remove('valido', 'invalido');
            if (valido) {
                grupo.classList.add('valido');
                return true;
            } else {
                grupo.classList.add('invalido');
                return false;
            }
        }
        return false;
    }

    // ===== VALIDAR EN TIEMPO REAL =====
    document.getElementById('nombre').addEventListener('input', function() {
        validarCampo(this, validarNombre(this.value), 'grupoNombre');
    });

    document.getElementById('numControl').addEventListener('input', function() {
        validarCampo(this, validarNumControl(this.value), 'grupoNumControl');
    });

    document.getElementById('correo').addEventListener('input', function() {
        validarCampo(this, validarCorreo(this.value), 'grupoCorreo');
    });

    document.getElementById('contrasena').addEventListener('input', function() {
        validarCampo(this, validarContrasena(this.value), 'grupoContrasena');
    });

    document.getElementById('edad').addEventListener('input', function() {
        validarCampo(this, validarEdad(this.value), 'grupoEdad');
    });

    // ===== GUARDAR ALUMNO =====
    if (formulario) {
        formulario.addEventListener('submit', function(e) {
            e.preventDefault();

            const nombre = document.getElementById('nombre').value.trim();
            const numControl = document.getElementById('numControl').value.trim();
            const correo = document.getElementById('correo').value.trim();
            const contrasena = document.getElementById('contrasena').value;
            const edad = document.getElementById('edad').value.trim();

            const esValidoNombre = validarCampo(document.getElementById('nombre'), validarNombre(nombre), 'grupoNombre');
            const esValidoNum = validarCampo(document.getElementById('numControl'), validarNumControl(numControl), 'grupoNumControl');
            const esValidoCorreo = validarCampo(document.getElementById('correo'), validarCorreo(correo), 'grupoCorreo');
            const esValidoContra = validarCampo(document.getElementById('contrasena'), validarContrasena(contrasena), 'grupoContrasena');
            const esValidoEdad = validarCampo(document.getElementById('edad'), validarEdad(edad), 'grupoEdad');

            if (!esValidoNombre || !esValidoNum || !esValidoCorreo || !esValidoContra || !esValidoEdad) {
                Swal.fire('Error', 'Corrige los campos marcados en rojo.', 'error');
                return;
            }

            if (alumnos.some(function(a) { return a.numControl === numControl; })) {
                Swal.fire('Error', 'El numero de control ya esta registrado.', 'error');
                return;
            }

            const nuevoAlumno = {
                id: Date.now(),
                nombre: nombre,
                numControl: numControl,
                correo: correo,
                password: contrasena,
                edad: parseInt(edad)
            };

            alumnos.push(nuevoAlumno);
            localStorage.setItem('alumnos', JSON.stringify(alumnos));

            Swal.fire('Exito', 'Alumno registrado correctamente.', 'success');

            formulario.reset();
            limpiarValidaciones();
            cargarTablaAlumnos();
        });
    }

    // ===== CARGAR TABLA =====
    function cargarTablaAlumnos() {
        if (!cuerpoTabla) return;
        alumnos = JSON.parse(localStorage.getItem('alumnos')) || [];
        cuerpoTabla.innerHTML = '';

        if (alumnos.length === 0) {
            cuerpoTabla.innerHTML = '<tr><td colspan="5" style="text-align: center; color: #9ca3af; padding: 20px;">No hay alumnos registrados</td></tr>';
            return;
        }

        alumnos.forEach(function(alumno) {
            const fila = document.createElement('tr');
            fila.innerHTML = `
                <td>${alumno.nombre || ''}</td>
                <td>${alumno.numControl || ''}</td>
                <td>${alumno.correo || ''}</td>
                <td>${alumno.edad || ''}</td>
                <td>
                    <button class="boton-eliminar" data-id="${alumno.id}">Eliminar</button>
                </td>
            `;
            cuerpoTabla.appendChild(fila);
        });

        document.querySelectorAll('.boton-eliminar').forEach(function(boton) {
            boton.addEventListener('click', function() {
                const id = parseInt(this.getAttribute('data-id'));
                eliminarAlumno(id);
            });
        });
    }

    // ===== ELIMINAR ALUMNO =====
    function eliminarAlumno(id) {
        Swal.fire({
            title: 'Eliminar alumno',
            text: 'Esta accion no se puede deshacer.',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#dc2626',
            cancelButtonColor: '#6b7280',
            confirmButtonText: 'Si, eliminar',
            cancelButtonText: 'Cancelar'
        }).then(function(result) {
            if (result.isConfirmed) {
                alumnos = alumnos.filter(function(a) { return a.id !== id; });
                localStorage.setItem('alumnos', JSON.stringify(alumnos));
                cargarTablaAlumnos();
                Swal.fire('Eliminado', 'Alumno eliminado correctamente.', 'success');
            }
        });
    }

    // ===== INICIALIZAR =====
    cargarTablaAlumnos();
});