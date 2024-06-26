// Función para encriptar el texto basado en la traducción proporcionada
function encriptar(traduccion) {
    // Eliminar cualquier estilo previamente aplicado a la advertencia
    document.querySelector("#advertencia").removeAttribute("style");
    
    // Obtener el textarea donde se ingresa el texto y su contenido
    var textarea = document.querySelector("#texto_principal");
    const texto = textarea.value;
    
    // Elementos para manejar la visualización de resultados
    var area_default = document.querySelector("#default");
    var area_result = document.querySelector("#result");
    var texto_out = document.querySelector("#texto_out");
    
    // Verificar si el texto no está vacío
    if (texto !== "") {
        // Verificar si el texto contiene caracteres inválidos
        if (isTextoInvalido(texto)) {
            // Mostrar advertencia si hay caracteres inválidos
            mostrarAdvertencia();
            return;
        }
        
        // Variable para almacenar el texto encriptado
        var out = "";
        // Recorrer cada carácter del texto y encriptarlo si es una vocal
        for (var i = 0; i < texto.length; i++) {
            out += traducirCaracter(texto[i], traduccion);
        }
        
        // Mostrar el resultado encriptado
        mostrarResultado(out, area_default, area_result, texto_out);
    }
}

// Función para desencriptar el texto basado en la traducción proporcionada
function desencriptar(traduccion) {
    // Eliminar cualquier estilo previamente aplicado a la advertencia
    document.querySelector("#advertencia").removeAttribute("style");
    
    // Obtener el textarea donde se ingresa el texto y su contenido
    var textarea = document.querySelector("#texto_principal");
    var texto = textarea.value;
    
    // Elementos para manejar la visualización de resultados
    var area_default = document.querySelector("#default");
    var area_result = document.querySelector("#result");
    var texto_out = document.querySelector("#texto_out");
    
    // Verificar si el texto no está vacío
    if (texto !== "") {
        // Verificar si el texto contiene caracteres inválidos
        if (isTextoInvalido(texto)) {
            // Mostrar advertencia si hay caracteres inválidos
            mostrarAdvertencia();
            return;
        }
        
        // Reemplazar las secuencias encriptadas por las vocales correspondientes
        for (const [key, value] of Object.entries(traduccion)) {
            texto = texto.replace(new RegExp(value, "g"), key);
        }
        
        // Mostrar el resultado desencriptado
        mostrarResultado(texto, area_default, area_result, texto_out);
    }
}

// Función para copiar el texto desencriptado al portapapeles
function clipboard() {
    const texto_out = document.querySelector("#texto_out");
    navigator.clipboard.writeText(texto_out.value)
        .then(() => {
            console.log('Texto copiado al portapapeles');
        })
        .catch(err => {
            console.error('Error al copiar el texto: ', err);
        });
}

// Función auxiliar para verificar si el texto contiene caracteres inválidos
function isTextoInvalido(texto) {
    // Expresión regular que define los caracteres permitidos (letras minúsculas, espacios y signos de puntuación)
    const caracteresPermitidos = /^[a-z\s?!.,]*$/;
    return !caracteresPermitidos.test(texto);
}

// Función para mostrar la advertencia de caracteres inválidos
function mostrarAdvertencia() {
    document.querySelector("#advertencia").style.color = "red";
    document.querySelector("#advertencia").style.fontSize = "16px";
}

// Función para mostrar el resultado (texto encriptado o desencriptado)
function mostrarResultado(out, area_default, area_result, texto_out) {
    area_default.classList.add("invisible");
    area_result.classList.remove("invisible");
    texto_out.value = out;
}

// Función para traducir un carácter según la tabla de traducción proporcionada
function traducirCaracter(char, traduccion) {
    switch (char) {
        case 'a': return traduccion['a'];
        case 'e': return traduccion['e'];
        case 'i': return traduccion['i'];
        case 'o': return traduccion['o'];
        case 'u': return traduccion['u'];
        default: return char;
    }
}

// Asignar eventos a los botones de encriptar, desencriptar y copiar
const enc = document.querySelector('#enc');
const des = document.querySelector('#des');
const copy = document.querySelector('#copiar');

// Tabla de traducción para encriptar y desencriptar
var traduccion = {"a": "ai", "e": "enter", "i": "imes", "o": "ober", "u": "ufat"};



document.addEventListener('DOMContentLoaded', function () {
    // Selecciona el botón para alternar el tema y el icono del tema
    const toggleThemeBtn = document.getElementById('toggle-theme');
    const themeIcon = document.getElementById('theme-icon');
    
    // Obtiene el tema actual del almacenamiento local o establece 'claro' como predeterminado
    const currentTheme = localStorage.getItem('theme') || 'claro';

    // Aplica el tema actual al cargar la página
    if (currentTheme === 'oscuro') {
        // Establece los colores para el tema oscuro
        document.documentElement.style.setProperty('--color-primario', 'var(--color-primario-oscuro)');
        document.documentElement.style.setProperty('--color-secundario', 'var(--color-secundario-oscuro)');
        document.documentElement.style.setProperty('--color-terciario', 'var(--color-terciario-oscuro)');
        document.documentElement.style.setProperty('--color-negro', 'var(--color-negro-oscuro)');
        document.documentElement.style.setProperty('--color-gris', 'var(--color-gris-oscuro)');

        // Cambia el icono para indicar que el tema actual es oscuro
        themeIcon.textContent = 'light_mode'; // Mostrar icono de sol
        // Añade la clase 'oscuro' al cuerpo del documento
        document.body.classList.add('oscuro'); 
    }

    // Añade un evento de clic al botón para alternar el tema
    toggleThemeBtn.addEventListener('click', function () {
        // Alterna el tema entre 'claro' y 'oscuro'
        const newTheme = (localStorage.getItem('theme') || 'claro') === 'claro' ? 'oscuro' : 'claro';

        if (newTheme === 'oscuro') {
            // Establece los colores para el tema oscuro
            document.documentElement.style.setProperty('--color-primario', 'var(--color-primario-oscuro)');
            document.documentElement.style.setProperty('--color-secundario', 'var(--color-secundario-oscuro)');
            document.documentElement.style.setProperty('--color-terciario', 'var(--color-terciario-oscuro)');
            document.documentElement.style.setProperty('--color-negro', 'var(--color-negro-oscuro)');
            document.documentElement.style.setProperty('--color-gris', 'var(--color-gris-oscuro)');

            // Cambia el icono para indicar que el tema actual es oscuro
            themeIcon.textContent = 'light_mode'; // Mostrar icono de sol
            // Añade la clase 'oscuro' al cuerpo del documento
            document.body.classList.add('oscuro'); 
        } else {
            // Establece los colores para el tema claro
            document.documentElement.style.setProperty('--color-primario', 'var(--color-primario-claro)');
            document.documentElement.style.setProperty('--color-secundario', 'var(--color-secundario-claro)');
            document.documentElement.style.setProperty('--color-terciario', 'var(--color-terciario-claro)');
            document.documentElement.style.setProperty('--color-negro', 'var(--color-negro-claro)');
            document.documentElement.style.setProperty('--color-gris', 'var(--color-gris-claro)');

            // Cambia el icono para indicar que el tema actual es claro
            themeIcon.textContent = 'dark_mode'; // Mostrar icono de luna
            // Elimina la clase 'oscuro' del cuerpo del documento
            document.body.classList.remove('oscuro'); 
        }

        // Guarda el nuevo tema en el almacenamiento local
        localStorage.setItem('theme', newTheme);
    });
});




// Agregar eventos a los botones
enc.addEventListener('click', function() { encriptar(traduccion); });
des.addEventListener('click', function() { desencriptar(traduccion); });
copy.addEventListener('click', function() { clipboard(); });
