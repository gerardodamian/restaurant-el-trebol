/**
 * Script para la funcionalidad de búsqueda global
 * Versión optimizada para encontrar todos los platos sin duplicados
 */

document.addEventListener('DOMContentLoaded', function() {
    console.log('Inicializando sistema de búsqueda sin duplicados...');
    
    // Referencias a los elementos del DOM
    const searchBtn = document.getElementById('searchBtn');
    const searchModalBtn = document.getElementById('searchModalBtn');
    const searchInput = document.getElementById('searchInput');
    const searchResults = document.getElementById('searchResults');
    const searchModal = document.getElementById('searchModal');
    
    // Verificar que existan los elementos necesarios
    if (!searchBtn || !searchModal) {
        console.log("No se encontraron elementos de búsqueda");
        return;
    }
    
    // Inicializar modal de manera segura
    let bsSearchModal;
    try {
        bsSearchModal = new bootstrap.Modal(searchModal);
    } catch (error) {
        console.error('Error al inicializar modal:', error);
        return;
    }
    
    // Evento para abrir el modal de búsqueda
    searchBtn.addEventListener('click', function() {
        // Limpiar búsquedas anteriores
        if (searchInput) searchInput.value = '';
        if (searchResults) searchResults.innerHTML = '';
        
        // Mostrar el modal
        bsSearchModal.show();
        
        // Enfocar el campo de búsqueda
        searchModal.addEventListener('shown.bs.modal', function() {
            if (searchInput) searchInput.focus();
        }, { once: true });
    });
    
    // Manejar búsqueda con botón
    if (searchModalBtn) {
        searchModalBtn.addEventListener('click', realizarBusqueda);
    }
    
    // Manejar búsqueda con Enter
    if (searchInput) {
        searchInput.addEventListener('keyup', function(e) {
            if (e.key === 'Enter') realizarBusqueda();
        });
    }
    
    // Limpiar resultados al cerrar el modal
    searchModal.addEventListener('hidden.bs.modal', function() {
        setTimeout(() => {
            if (searchResults) searchResults.innerHTML = '';
        }, 200);
    });
    
    // Lista de platos predefinidos para cuando no se encuentran en el DOM
    const platosDefault = [
        { id: 1, nombre: "Milanesa Napolitana", precio: 3800, categoria: "Platos Principales", descripcion: "Milanesa de ternera cubierta con salsa de tomate, jamón y queso." },
        { id: 2, nombre: "Bife de Chorizo", precio: 4800, categoria: "Platos Principales", descripcion: "Jugoso bife de chorizo con guarnición." },
        { id: 3, nombre: "Ensalada César", precio: 1200, categoria: "Entradas", descripcion: "Lechuga, crutones, queso parmesano y aderezo." },
        { id: 4, nombre: "Tallarines a la Bolognesa", precio: 2900, categoria: "Pastas", descripcion: "Pasta con salsa de carne." },
        { id: 5, nombre: "Tiramisú", precio: 1200, categoria: "Postres", descripcion: "Postre italiano con café y queso mascarpone." }
    ];
    
    // Función para realizar la búsqueda
    function realizarBusqueda() {
        if (!searchInput || !searchResults) return;
        
        const termino = searchInput.value.trim().toLowerCase();
        
        if (termino.length < 2) {
            searchResults.innerHTML = '<div class="alert alert-info">Ingresa al menos 2 caracteres para buscar</div>';
            return;
        }
        
        // Mostrar spinner de carga
        searchResults.innerHTML = `
            <div class="text-center py-4">
                <div class="spinner-border text-success" role="status">
                    <span class="visually-hidden">Buscando...</span>
                </div>
                <p class="mt-3">Buscando platos...</p>
            </div>
        `;
        
        // Pequeño retraso para mostrar el spinner
        setTimeout(() => {
            try {
                // Obtener todos los platos disponibles (sin duplicados)
                const platos = obtenerPlatosSinDuplicados();
                
                console.log(`Se encontraron ${platos.length} platos únicos en total`);
                
                // Filtrar por el término de búsqueda
                const resultados = platos.filter(plato => {
                    const nombre = (plato.nombre || '').toLowerCase();
                    const categoria = (plato.categoria || '').toLowerCase();
                    const descripcion = (plato.descripcion || '').toLowerCase();
                    
                    return nombre.includes(termino) || 
                           categoria.includes(termino) || 
                           descripcion.includes(termino);
                });
                
                console.log(`Se encontraron ${resultados.length} coincidencias para "${termino}"`);
                
                // Mostrar resultados
                mostrarResultados(resultados);
                
            } catch (error) {
                console.error('Error en búsqueda:', error);
                searchResults.innerHTML = `
                    <div class="alert alert-danger">
                        <i class="bi bi-exclamation-triangle-fill me-2"></i>
                        Ocurrió un error al realizar la búsqueda
                    </div>
                `;
            }
        }, 300);
    }
    
    // Función para obtener platos sin duplicados
    function obtenerPlatosSinDuplicados() {
        // Mapa para detectar duplicados por nombre
        const platosMap = new Map();
        
        // 1. Intentar obtener platos del menú completo primero
        document.querySelectorAll('#menuCompleto .card, #ofertasGrid .card, #productosGrid .card').forEach(card => {
            try {
                const platoInfo = extraerInfoPlato(card);
                if (platoInfo && platoInfo.nombre) {
                    // Usar nombre como clave para evitar duplicados
                    if (!platosMap.has(platoInfo.nombre)) {
                        platosMap.set(platoInfo.nombre, platoInfo);
                    }
                }
            } catch (e) {
                console.error('Error procesando tarjeta:', e);
            }
        });
        
        // 2. Si no se encontraron suficientes platos, usar método alternativo
        if (platosMap.size < 5) {
            console.log('Usando método alternativo para encontrar platos...');
            document.querySelectorAll('.card').forEach(card => {
                // Verificar si es una tarjeta de producto (tiene título y precio)
                if (card.querySelector('.card-title') && card.querySelector('.fw-bold, .fs-5')) {
                    try {
                        const platoInfo = extraerInfoPlato(card);
                        if (platoInfo && platoInfo.nombre) {
                            // Solo agregar si no existe ya
                            if (!platosMap.has(platoInfo.nombre)) {
                                platosMap.set(platoInfo.nombre, platoInfo);
                            }
                        }
                    } catch (e) {
                        console.error('Error en método alternativo:', e);
                    }
                }
            });
        }
        
        // 3. Si aún no hay platos, usar los valores predeterminados
        if (platosMap.size === 0) {
            console.log('Usando platos predefinidos...');
            platosDefault.forEach(plato => {
                platosMap.set(plato.nombre, plato);
            });
        }
        
        // Convertir el mapa a un array
        return Array.from(platosMap.values());
    }
    
    // Función para extraer información de un plato desde una tarjeta
    function extraerInfoPlato(card) {
        // Obtener título primero (requisito principal)
        const tituloElement = card.querySelector('.card-title');
        if (!tituloElement) return null;
        
        // Asignar un ID único basado en el título si no hay otro
        const nombrePlato = tituloElement.textContent.trim();
        let id = nombrePlato.split(' ').join('').toLowerCase().substring(0, 10);
        
        // Intentar obtener el ID del botón si existe
        const btnInfo = card.querySelector('[data-id]');
        if (btnInfo && btnInfo.dataset.id) {
            id = parseInt(btnInfo.dataset.id);
        }
        
        // Obtener precio
        let precio = 0;
        const precioElement = card.querySelector('.fw-bold, .fs-5');
        if (precioElement) {
            const precioText = precioElement.textContent;
            const match = precioText.match(/\$?(\d+)/);
            if (match && match[1]) {
                precio = parseInt(match[1]);
            }
        }
        
        // Obtener categoría
        let categoria = 'Plato';
        const categoriaElement = card.querySelector('.badge');
        if (categoriaElement) {
            categoria = categoriaElement.textContent.trim();
        }
        
        // Obtener descripción
        let descripcion = '';
        const descElement = card.querySelector('.card-text:not(.fw-bold)');
        if (descElement) {
            descripcion = descElement.textContent.trim();
        }
        
        // Obtener imagen
        let imagen = '';
        const imgElement = card.querySelector('img');
        if (imgElement) {
            imagen = imgElement.src;
        }
        
        return {
            id,
            nombre: nombrePlato,
            precio,
            categoria,
            descripcion,
            imagen
        };
    }
    
    // Función para mostrar resultados
    function mostrarResultados(resultados) {
        searchResults.innerHTML = '';
        
        if (resultados.length === 0) {
            searchResults.innerHTML = `
                <div class="alert alert-info">
                    <i class="bi bi-info-circle me-2"></i>
                    No se encontraron platos que coincidan con tu búsqueda
                </div>
            `;
            return;
        }
        
        // Crear container para resultados
        const container = document.createElement('div');
        container.className = 'row row-cols-1 g-3';
        
        // Añadir cada resultado
        resultados.forEach(plato => {
            const cardCol = document.createElement('div');
            cardCol.className = 'col';
            
            // Imagen con fallback
            const imgSrc = plato.imagen || `https://via.placeholder.com/100x100/28a745/ffffff?text=${encodeURIComponent(plato.nombre.charAt(0))}`;
            
            cardCol.innerHTML = `
                <div class="card h-100">
                    <div class="row g-0">
                        <div class="col-4">
                            <img src="${imgSrc}" class="img-fluid rounded-start h-100" alt="${plato.nombre}" 
                                style="object-fit: cover;" onerror="this.src='https://via.placeholder.com/100x100/28a745/ffffff?text=${encodeURIComponent(plato.nombre.charAt(0))}'">
                        </div>
                        <div class="col-8">
                            <div class="card-body">
                                <h5 class="card-title">${plato.nombre}</h5>
                                <span class="badge bg-light text-dark mb-1">${plato.categoria}</span>
                                <p class="card-text small text-muted mb-2">${plato.descripcion}</p>
                                <div class="d-flex justify-content-between align-items-center mt-2">
                                    <span class="fw-bold text-success">$${plato.precio}</span>
                                    <button class="btn btn-sm btn-success search-add-btn"
                                            data-id="${plato.id}" data-nombre="${plato.nombre}" data-precio="${plato.precio}">
                                        <i class="bi bi-cart-plus me-1"></i>
                                        Agregar
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            `;
            
            container.appendChild(cardCol);
        });
        
        searchResults.appendChild(container);
        
        // Configurar botones de agregar al carrito
        document.querySelectorAll('.search-add-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                const id = this.dataset.id;
                const nombre = this.dataset.nombre;
                const precio = parseInt(this.dataset.precio);
                
                // Verificar disponibilidad de la función del carrito
                if (typeof window.agregarAlCarrito === 'function') {
                    // Crear producto para añadir al carrito
                    const producto = {
                        id: id,
                        nombre: nombre,
                        name: nombre, // Compatibilidad con ambas propiedades
                        precio: precio,
                        price: precio, // Compatibilidad con ambas propiedades
                        cantidad: 1
                    };
                    
                    // Agregar al carrito
                    window.agregarAlCarrito(producto);
                    
                    // Notificación
                    mostrarNotificacion(`¡${nombre} agregado a tu pedido!`);
                    
                    // Cerrar modal
                    bsSearchModal.hide();
                } else {
                    console.error('La función del carrito no está disponible');
                    alert('No se pudo agregar el producto al carrito');
                }
            });
        });
    }
    
    // Función para mostrar notificaciones
    function mostrarNotificacion(mensaje) {
        const toastContainer = document.createElement('div');
        toastContainer.className = 'position-fixed bottom-0 end-0 p-3';
        toastContainer.style.zIndex = '1080';
        
        toastContainer.innerHTML = `
            <div class="toast align-items-center text-white bg-success border-0" role="alert" aria-live="assertive" aria-atomic="true">
                <div class="d-flex">
                    <div class="toast-body">
                        <i class="bi bi-check-circle-fill me-2"></i>
                        ${mensaje}
                    </div>
                    <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
                </div>
            </div>
        `;
        
        document.body.appendChild(toastContainer);
        
        const toast = new bootstrap.Toast(toastContainer.querySelector('.toast'), {
            delay: 3000
        });
        toast.show();
        
        toastContainer.addEventListener('hidden.bs.toast', function() {
            if (document.body.contains(toastContainer)) {
                document.body.removeChild(toastContainer);
            }
        });
        
        // Por seguridad, eliminar después de 5 segundos
        setTimeout(() => {
            if (document.body.contains(toastContainer)) {
                document.body.removeChild(toastContainer);
            }
        }, 5000);
    }
});