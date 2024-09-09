// Lista de canciones correspondientes a cada div numerado
let canciones = [
    'Canciones/romeo.mp3',             // Para portada-1
    'Canciones/grupo5.mp3',    // Para portada-2
    'Canciones/elvega.mp3',// Para portada-3
    'Canciones/thiagopzk.mp3', // Para portada-4
    'Canciones/liz.mp3' // Para portada-5
];


// Variable para almacenar el audio actual que se está reproduciendo
let currentAudio = null;
let delayTimeout = null; // Para almacenar el timeout

// Esperamos a que el documento esté completamente cargado
document.addEventListener('DOMContentLoaded', function () {
    // Seleccionamos todos los divs con la clase "portada-musical"
    let portadasMusicales = document.querySelectorAll('.portada-musical');

    // Asignamos eventos a cada div
    portadasMusicales.forEach(portada => {
        // Al pasar el mouse sobre el div
        portada.addEventListener('mouseenter', function() {
            // Extraemos el número del id (por ejemplo, 'portada-1' se convierte en 1)
            let numeroPortada = parseInt(this.id.split('-')[1]);

            // Obtenemos la canción correspondiente usando el número
            let audioSrc = canciones[numeroPortada - 1];  // -1 porque el array es 0-indexed
            
            // Si ya hay una canción reproduciéndose, la detenemos
            if (currentAudio) {
                currentAudio.pause();
                currentAudio.currentTime = 0;
            }

            // Limpiar cualquier retraso anterior
            clearTimeout(delayTimeout);

            // Usar setTimeout para crear un retraso en la reproducción
            delayTimeout = setTimeout(function() {
                currentAudio = new Audio(audioSrc);
                currentAudio.play();
            }, 1000); // Retraso de 1 segundo (1000 milisegundos)
        });

        // Al salir del div
        portada.addEventListener('mouseleave', function() {
            // Limpiamos el timeout para evitar que se reproduzca después de salir
            clearTimeout(delayTimeout);

            if (currentAudio) {
                currentAudio.pause();
                currentAudio.currentTime = 0;  // Reinicia la canción al salir
                currentAudio = null;  // Limpiamos el audio actual
            }
        });
    });
});