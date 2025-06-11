/**
 * Optimizador de rendimiento para El Trébol
 * Versión: 1.0.0
 * 
 * Este script evita ejecuciones repetidas de funciones y
 * reduce el parpadeo en la página del menú
 */

// Variable para controlar ejecuciones
const optimizador = {
    ejecutados: {},
    iconosReemplazados: false,
    eventosFijados: false,
    observer: null
};

// Desactivar console.log en producción
if (window.location.hostname !== 'localhost' && window.location.hostname !== '127.0.0.1') {
    const noop = function() {};
    const métodos = ['log', 'debug', 'info', 'warn'];
    
    for (const método of métodos) {
        console[método] = noop;
    }
}

// Función para evitar ejecuciones repetidas
function ejecutarUnaVez(id, fn) {
    if (optimizador.ejecutados[id]) return false;
    const resultado = fn();
    optimizador.ejecutados[id] = true;
    return resultado;
}

// Reemplazar iconos de WhatsApp una sola vez
function corregirIconosWhatsApp() {
    return ejecutarUnaVez('iconos_whatsapp', function() {
        document.querySelectorAll('[data-lucide="whatsapp"]').forEach(icon => {
            icon.setAttribute('data-lucide', 'message-circle');
        });
        
        // Forzar una sola creación de iconos
        if (window.lucide) {
            const originalCreateIcons = window.lucide.createIcons;
            window.lucide.createIcons = function(opts) {
                ejecutarUnaVez('crear_iconos', function() {
                    originalCreateIcons(opts);
                });
            };
        }
        
        return true;
    });
}

// Optimizar renderizado evitando repintados frecuentes
function optimizarRenderizado() {
    // Detener observer anterior si existe
    if (optimizador.observer) {
        optimizador.observer.disconnect();
    }
    
    let timeout;
    
    // Crear un nuevo observer con límite de frecuencia
    optimizador.observer = new MutationObserver(function(mutations) {
        if (timeout) clearTimeout(timeout);
        
        timeout = setTimeout(function() {
            if (!optimizador.iconosReemplazados) {
                corregirIconosWhatsApp();
                optimizador.iconosReemplazados = true;
            }
        }, 300);
    });
    
    // Configuración menos agresiva del observer
    optimizador.observer.observe(document.body, {
        childList: true,
        subtree: true,
        attributes: false,
        characterData: false
    });
}

// Detener ejecuciones repetidas de fixEvents.js
function optimizarFixEvents() {
    return ejecutarUnaVez('fix_events', function() {
        if (window.resetEvents) {
            const originalResetEvents = window.resetEvents;
            window.resetEvents = function() {
                return ejecutarUnaVez('reset_events_call', function() {
                    return originalResetEvents();
                });
            };
        }
        return true;
    });
}

// Ejecución principal
document.addEventListener("DOMContentLoaded", function() {
    // Aplicar todas las optimizaciones
    corregirIconosWhatsApp();
    optimizarFixEvents();
    optimizarRenderizado();
    
    // Ejecutar las funciones necesarias una sola vez cuando la página esté lista
    setTimeout(function() {
        if (typeof lucide !== 'undefined') {
            lucide.createIcons();
        }
    }, 100);
});

// Exponer funciones para uso global
window.optimizador = optimizador;
window.ejecutarUnaVez = ejecutarUnaVez;