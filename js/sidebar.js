document.addEventListener('DOMContentLoaded', function() {
    // ===== VERIFICAR SESION =====
    const usuarioLogueado = JSON.parse(localStorage.getItem('usuarioLogueado'));
    if (!usuarioLogueado) {
        window.location.href = 'login.html';
        return;
    }

    // ===== ELEMENTOS =====
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('overlay');
    const menuToggle = document.getElementById('menuToggle');
    const cerrarSidebar = document.getElementById('cerrarSidebar');
    const menuUsuarios = document.getElementById('menuUsuarios');
    const submenuUsuarios = document.getElementById('submenuUsuarios');
    const flechaUsuarios = document.getElementById('flechaUsuarios');
    const userDropdownBtn = document.getElementById('userDropdownBtn');
    const userDropdownMenu = document.getElementById('userDropdownMenu');
    const btnSalir = document.getElementById('btnSalir');
    const navbarUsuario = document.getElementById('navbarUsuario');

    // ===== SIDEBAR =====
    function abrirSidebar() {
        sidebar.classList.add('abierto');
        overlay.classList.add('activo');
        document.body.style.overflow = 'hidden';
    }

    function cerrarSidebarFunc() {
        sidebar.classList.remove('abierto');
        overlay.classList.remove('activo');
        document.body.style.overflow = '';
    }

    if (menuToggle) {
        menuToggle.addEventListener('click', abrirSidebar);
    }

    if (cerrarSidebar) {
        cerrarSidebar.addEventListener('click', cerrarSidebarFunc);
    }

    if (overlay) {
        overlay.addEventListener('click', cerrarSidebarFunc);
    }

    // ===== SUBMENU USUARIOS =====
    if (menuUsuarios) {
        menuUsuarios.addEventListener('click', function(e) {
            e.preventDefault();
            submenuUsuarios.classList.toggle('abierto');
            if (flechaUsuarios) {
                flechaUsuarios.classList.toggle('rotada');
            }
        });
    }

    // ===== DROPDOWN USUARIO =====
    if (userDropdownBtn) {
        userDropdownBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            userDropdownMenu.classList.toggle('mostrar');
        });
    }

    document.addEventListener('click', function() {
        if (userDropdownMenu) {
            userDropdownMenu.classList.remove('mostrar');
        }
    });

    // ===== MOSTRAR NOMBRE DE USUARIO =====
    if (navbarUsuario) {
        navbarUsuario.textContent = usuarioLogueado.nombre || 'Invitado';
    }

    // ===== SALIR DEL SISTEMA =====
    if (btnSalir) {
        btnSalir.addEventListener('click', function(e) {
            e.preventDefault();
            Swal.fire({
                title: 'Cerrar sesion',
                text: 'Estas seguro de que deseas salir',
                icon: 'question',
                showCancelButton: true,
                confirmButtonColor: '#dc2626',
                cancelButtonColor: '#6b7280',
                confirmButtonText: 'Si, salir',
                cancelButtonText: 'Cancelar'
            }).then(function(result) {
                if (result.isConfirmed) {
                    localStorage.removeItem('usuarioLogueado');
                    window.location.href = 'login.html';
                }
            });
        });
    }
});