## Portada

**Proyecto:** Sistema de Login y Panel de Usuario
**Materia:** Programacion Web **/ Actividad:** Actividad 5

**Integrantes del equipo:**
- José Daniel Cruz Barrera - 23160879
- David Efraín José Ramos - 23160972

**Descripción breve:**
Sistema web de dos pantallas: una pantalla de acceso (`login.html`) que valida las credenciales del usuario, y una pantalla principal (`index.html`) que simula un panel de sistema con sidebar y navbar, donde se captura información adicional de usuarios y alumnos. El proyecto se desarrolla con HTML, CSS y JavaScript puro, y utiliza `localStorage` como medio de almacenamiento de datos.

## Tabla de Contenidos

- [Descripción General](#descripción-general)
- [Tecnologías Utilizadas](#tecnologías-utilizadas)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [Flujo del Proyecto](#flujo-del-proyecto)
- [Estructura Visual de index.html](#estructura-visual-de-indexhtml)
- [Funcionalidades](#funcionalidades)
- [La Librería utileria.js](#la-librería-utileriajs)
- [Métodos Principales](#métodos-principales)
- [Cómo se Pasa el Usuario del Login al Navbar](#cómo-se-pasa-el-usuario-del-login-al-navbar)
- [Proceso de Creación Paso a Paso](#proceso-de-creación-paso-a-paso)
- [Instalación y Uso](#instalación-y-uso)
- [Capturas de Pantalla](#capturas-de-pantalla)
- [Notas y Trabajo Futuro](#notas-y-trabajo-futuro)

## Descripción General

El proyecto está dividido en dos pantallas conectadas entre sí, en lugar de tener toda la funcionalidad en una sola página:

- **`login.html`**: pantalla de acceso al sistema. Contiene el formulario de correo y contraseña, validado con JavaScript. La validación es simulada (no requiere backend ni base de datos real); al pasar la validación, el usuario es redirigido a `index.html`.
- **`index.html`**: pantalla principal del sistema, a la que se llega una vez "dentro" tras iniciar sesión. Incluye un sidebar (menú lateral) y un navbar (barra superior), además de la funcionalidad de captura de alumnos.

También se conserva `registro.html`, utilizado para dar de alta las cuentas con las que posteriormente se inicia sesión en `login.html`.

## Tecnologías Utilizadas

- **HTML5**: estructura de las páginas.
- **CSS3 puro**: estilos y diseño responsivo mediante variables CSS, sin frameworks externos como Bootstrap o Tailwind. Se optó por mantener el mismo enfoque de CSS puro utilizado en el resto del proyecto (`login.html` y `registro.html`).
- **JavaScript (Vanilla JS)**: lógica de validación, manipulación del DOM, manejo del sidebar/navbar y manejo de `localStorage`.
- **[SweetAlert2](https://sweetalert2.github.io/)**: librería utilizada para mostrar alertas y mensajes emergentes estilizados (cargada mediante CDN).

## Estructura del Proyecto

```
Proyecto-Login/
├── css/
│   ├── style.css        # Estilos generales 
│   └── index.css        
├── img/                  # Recursos gráficos del proyecto
├── js/
│   ├── utileria.js       # Librería de funciones de validación reutilizables
│   ├── login.js          # Lógica del formulario de inicio de sesión
│   ├── registro.js       # Lógica del formulario de registro
│   ├── sidebar.js        # Lógica de apertura/cierre del sidebar y su overlay en móvil
│   └── index.js          # Lógica del panel principal: verificación de sesión, captura y tabla de alumnos
├── index.html            # Panel principal del sistema (sidebar + navbar)
├── login.html             # Formulario de inicio de sesión
├── registro.html          # Formulario de registro de usuario
└── README.md
```

> **Nota:** Los campos capturados en los formularios (tanto en `registro.html` como en el submenú **Captura** de `index.html`) pueden modificarse de acuerdo con las necesidades del proyecto; la estructura actual es un punto de partida y no una lista cerrada de campos.

## Flujo del Proyecto

1. El usuario abre `login.html` e ingresa su correo y contraseña.
2. Los campos se validan en tiempo real con las funciones `validarCorreo` y `validarPassword` de `utileria.js`.
3. Al enviar el formulario, si la validación es correcta (de forma simulada, sin backend), el usuario es redirigido a `index.html`.
4. Al cargar `index.html`, `index.js` verifica que exista una sesión guardada en `localStorage` bajo la clave `usuarioLogueado`; si no existe, redirige automáticamente de vuelta a `login.html`.
5. En `index.html`, el nombre o correo del usuario que inició sesión se muestra en el navbar.
6. Desde el sidebar, el usuario puede navegar al menú **Usuarios > Captura** para registrar nuevos alumnos.
7. Al registrar un alumno, sus datos se validan y se guardan en `localStorage` bajo la clave `alumnos`.
8. Los alumnos registrados se listan en una tabla dentro de la vista de Captura, desde la cual también pueden eliminarse (con confirmación mediante SweetAlert2).
9. Al dar clic en el nombre de usuario del navbar, se despliega un menú con la opción **Salir del sistema**, que redirige nuevamente a `login.html`, simulando el cierre de sesión.

## Estructura Visual de index.html

### Sidebar (menú lateral)

- Botón tipo hamburguesa (`menuToggle`) para abrir el sidebar, y botón de cierre (`cerrarSidebar`) dentro del propio sidebar.
- En pantallas pequeñas, se muestra un overlay (fondo oscuro) detrás del sidebar mientras está abierto.
- Opción **Usuarios**, con submenú desplegable **Captura**.

### Navbar (barra superior)

- Muestra, en la parte derecha, el nombre (o correo) del usuario que inició sesión (`navbarUsuario`).
- Al dar clic sobre el nombre, se despliega un menú (`userDropdownMenu`) con la opción **Salir del sistema** (`btnSalir`).

## Funcionalidades

### Login (`login.html`)

- Captura de correo electrónico y contraseña.
- Validación en tiempo real mediante `validarCorreo` y `validarPassword`.
- Comparación de credenciales contra los usuarios almacenados en `localStorage`.
- Alertas mediante SweetAlert2 en caso de credenciales o formato incorrectos.
- Redirección a `index.html` cuando el inicio de sesión es exitoso.

### Verificación de sesión (`index.html`)

- Al cargar la página, `index.js` revisa si existe la clave `usuarioLogueado` en `localStorage`.
- Si no existe, el usuario es redirigido automáticamente a `login.html`, evitando el acceso directo a `index.html` sin haber iniciado sesión.

### Menú Usuarios > Captura (`index.html`)

Formulario de captura de alumnos con los siguientes campos:

- **Nombre completo**: solo letras y espacios (incluye acentos y ñ).
- **Número de control**: exactamente 6 dígitos.
- **Correo electrónico**: formato de correo válido.
- **Contraseña**: mínimo 8 caracteres, combinando letras y números.
- **Edad**: número entero entre 1 y 100.

Cada campo se valida en tiempo real y marca visualmente su grupo (`grupo-campo`) como válido o inválido. Al enviar el formulario:

- Se valida que todos los campos sean correctos; de lo contrario, se muestra una alerta de SweetAlert2 indicando que hay campos por corregir.
- Se verifica que el número de control no esté ya registrado.
- Si todo es correcto, el alumno se agrega al arreglo `alumnos` y se guarda en `localStorage`.

### Tabla de alumnos registrados

- Lista, dentro de la vista de Captura, a todos los alumnos guardados en `localStorage` (nombre, número de control, correo y edad).
- Incluye un botón **Eliminar** por alumno, que solicita confirmación mediante un cuadro de diálogo de SweetAlert2 antes de borrar el registro.

### Navbar con nombre de usuario

- Muestra el nombre o correo capturado en `login.html`.
- Incluye un menú desplegable con la opción de cerrar sesión, que redirige a `login.html`.

## La Librería utileria.js

El archivo `js/utileria.js` funciona como una pequeña **librería de validaciones**, ya que no está atada a un formulario en particular, sino que expone funciones genéricas que pueden reutilizarse en distintas partes del proyecto. Estas funciones fueron creadas originalmente en un trabajo anterior del equipo y se reutilizan aquí tanto en `login.html`, `registro.html`, como en el panel principal `index.html`, evitando duplicar lógica de validación.

| Función | Descripción |
|---|---|
| `validarCorreo` | Verifica que el correo tenga un formato válido. |
| `soloLetras` | Verifica que un texto contenga únicamente letras y espacios (incluye acentos y ñ). |
| `validarLongitud` | Verifica que un valor no exceda (o cumpla) una longitud determinada; se utiliza, entre otros casos, para validar el número de control de 6 dígitos. |
| `validarPassword` | Verifica que la contraseña tenga mínimo 8 caracteres, incluyendo mayúscula, minúscula, número y carácter especial. |

> **Nota:** `index.js` incluye además sus propias funciones de validación internas (`validarNombre`, `validarNumControl`, `validarCorreo`, `validarContrasena`, `validarEdad`) para el formulario de captura de alumnos. Se recomienda revisar si conviene unificarlas con las de `utileria.js` para evitar lógica duplicada, ya que el script de `utileria.js` se carga en `index.html` pero no todas sus funciones se están invocando directamente ahí.

## Métodos Principales

Además de las funciones de validación de `utileria.js`, el proyecto se apoya en los siguientes métodos, repetidos en distintos archivos JS:

```javascript
// Obtiene el arreglo de usuarios almacenado, o un arreglo vacío si no existe
const obtenerUsuarios = () =>
    JSON.parse(localStorage.getItem("usuarios")) || [];

// Guarda el arreglo de usuarios actualizado en localStorage
const guardarUsuarios = (usuarios) =>
    localStorage.setItem("usuarios", JSON.stringify(usuarios));
```

- **`obtenerUsuarios` / `guardarUsuarios`**: usados en `registro.js` y `login.js` para leer y escribir el arreglo de usuarios en `localStorage`.
- **`marcarEstado`**: función auxiliar que agrega o quita las clases `valido` / `invalido` a un campo, según el resultado de su validación, para dar retroalimentación visual inmediata.
- **`validarCampo`** (en `index.js`): función equivalente usada en el formulario de captura de alumnos; agrega o quita las clases `valido` / `invalido` al contenedor del campo (`grupo-campo`) según el resultado de su validación.
- **`cargarTablaAlumnos`** (en `index.js`): lee el arreglo `alumnos` desde `localStorage` y reconstruye las filas de la tabla de alumnos registrados.
- **`eliminarAlumno`** (en `index.js`): solicita confirmación mediante SweetAlert2 y, de confirmarse, filtra al alumno del arreglo `alumnos` y actualiza `localStorage` y la tabla.

## Cómo se Pasa el Usuario del Login al Navbar

Cuando el login es exitoso, se guarda una referencia del usuario que inició sesión en `localStorage` bajo la clave `usuarioLogueado`, y se redirige a `index.html`:

```javascript
// Al iniciar sesión correctamente en login.js
localStorage.setItem("usuarioLogueado", JSON.stringify(usuarioEncontrado));
window.location.href = "index.html";
```

Al cargar `index.js`, se verifica que esa clave exista; si no, se redirige de vuelta a `login.html`:

```javascript
// Al inicio de index.js
const usuarioLogueado = JSON.parse(localStorage.getItem('usuarioLogueado'));
if (!usuarioLogueado) {
    window.location.href = 'login.html';
    return;
}
```

<!-- Ajustar si el nombre/correo mostrado en el elemento #navbarUsuario se asigna desde sidebar.js u otro archivo -->
El nombre o correo mostrado en el elemento `#navbarUsuario` del navbar se obtiene de este mismo objeto `usuarioLogueado`.

Y al cerrar sesión desde el navbar (botón `btnSalir`):

```javascript
localStorage.removeItem("usuarioLogueado");
window.location.href = "login.html";
```

Esto permite que `index.html` sepa quién inició sesión sin necesidad de un backend, y que al salir del sistema se limpie esa referencia.

## Proceso de Creación Paso a Paso

<!-- Completar cada paso con una breve descripción de cómo se realizó y agregar la captura correspondiente -->

1. **Login**: se partió del formulario de `login.html` ya existente, agregando la validación con `validarCorreo` y `validarPassword`, y la redirección a `index.html` al pasar la validación.

2. **Sidebar**: se creó el menú lateral con el botón hamburguesa para mostrarlo/ocultarlo (gestionado en `sidebar.js`), y la opción **Usuarios** con su submenú **Captura**.

3. **Navbar con usuario**: se agregó la barra superior, mostrando el nombre del usuario autenticado y su menú desplegable con la opción de salir del sistema.

4. **Número de control**: se añadió el campo de número de control al formulario de alumnos, validado para exigir 6 dígitos.

5. **Captura y tabla de alumnos**: se integró el formulario completo de alumnos (nombre, número de control, correo, contraseña y edad) junto con la tabla de alumnos registrados y la opción de eliminarlos.

## Instalación y Uso

1. Clona el repositorio:
   ```bash
   git clone https://github.com/osmards2003-commits/Actividad-5_Proyecto-de-login.git
   ```
2. Abre la carpeta del proyecto.
3. Abre `registro.html` para crear un usuario nuevo (si aún no existe uno).
4. Abre `login.html` e ingresa con las credenciales registradas.
5. Al validarse correctamente, serás redirigido a `index.html`, donde podrás navegar por el sidebar y capturar alumnos desde el menú **Usuarios > Captura**.

> No se requiere instalación de dependencias ni un servidor local, ya que el proyecto funciona directamente en el navegador. La única dependencia externa (SweetAlert2) se carga mediante un CDN.

## Capturas de Pantalla

### Login
![Login](img/login1.png)

![Login Alerta](img/login2.png)

![Login Alerta](img/login3.png)

### Sidebar abierto / cerrado
![Sidebar](img/index1.png)

![Sidebar](img/index2.png)

![Sidebar](img/index3.png)

![Sidebar](img/index4.png)

![Sidebar](img/index5.png)

### Navbar con nombre de usuario y menú de salir
![Sidebar](img/index6.png)

### Formulario de alumnos con número de control
![Sidebar](img/index2.png)

### Registro
![Sidebar](img/registro1.png)

![Sidebar](img/registro2.png)

![Sidebar](img/registro3.png)

## Notas y Trabajo Futuro

- Los campos de los formularios de captura (usuarios y alumnos) pueden ajustarse o ampliarse según las necesidades del proyecto; la estructura actual es solo una base.
- La validación del login es simulada mediante JavaScript y `localStorage`; no existe un backend ni una base de datos real detrás del sistema.
- Se planea reemplazar `localStorage` por una base de datos real en una futura versión del proyecto.
- Se planea reforzar el manejo de la sesión del usuario autenticado (por ejemplo, mediante `sessionStorage` o tokens), en lugar de depender únicamente de una clave en `localStorage`.
- Se recomienda unificar las funciones de validación propias de `index.js` con las ya existentes en `utileria.js`, para evitar duplicar lógica de validación en el proyecto.
