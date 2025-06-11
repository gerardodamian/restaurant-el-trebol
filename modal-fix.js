/**
 * Solución para problemas con modales de Bootstrap
 * Este script evita que la página se bloquee al cerrar modales
 */
document.addEventListener('DOMContentLoaded', function() {
    // Función para limpiar modales atascados
    function limpiarModalAtascado() {
        // Eliminar clases que pueden causar bloqueos
        document.body.classList.remove('modal-open');
        document.body.style.paddingRight = '';
        document.body.style.overflow = '';
        
        // Eliminar backdrops que puedan haberse quedado
        const backdrops = document.querySelectorAll('.modal-backdrop');
        backdrops.forEach(backdrop => {
            if (backdrop.parentNode) {
                backdrop.parentNode.removeChild(backdrop);
            }
        });
    }
    
    // Escuchar todos los cierres de modales
    document.addEventListener('hidden.bs.modal', function(event) {
        // Pequeña pausa para permitir que Bootstrap termine sus operaciones
        setTimeout(limpiarModalAtascado, 100);
    });
    
    // Añadir un parche a los modales existentes
    document.querySelectorAll('.modal').forEach(modal => {
        modal.addEventListener('hidden.bs.modal', function(event) {
            event.stopPropagation(); // Evitar propagación duplicada
            setTimeout(limpiarModalAtascado, 100);
        });
    });
    
    // Corregir cualquier problema existente cuando se carga la página
    setTimeout(limpiarModalAtascado, 500);
});

// Función global que se puede llamar manualmente si la página se bloquea
window.fixModal = function() {
    document.body.classList.remove('modal-open');
    document.body.style.paddingRight = '';
    document.body.style.overflow = '';
    
    const backdrops = document.querySelectorAll('.modal-backdrop');
    backdrops.forEach(backdrop => {
        backdrop.parentNode.removeChild(backdrop);
    });
    
    console.log('Corrección de modal aplicada');
};