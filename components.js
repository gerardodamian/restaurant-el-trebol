/**
 * Componentes reutilizables para el Restaurante El Trébol
 * Este archivo permite mantener una interfaz consistente en todas las páginas
 */

document.addEventListener('DOMContentLoaded', function() {
    // Aplicar la clase 'active' al enlace de navegación correspondiente
    function marcarEnlaceActivo() {
        // Obtener la página actual
        const paginaActual = window.location.pathname.split('/').pop() || 'index.html';
        
        // Quitar la clase active de todos los enlaces
        document.querySelectorAll('.navbar-nav .nav-link').forEach(link => {
            link.classList.remove('active');
            link.removeAttribute('aria-current');
        });
        
        // Determinar qué enlace activar
        let enlaceId = null;
        
        switch(paginaActual) {
            case '':
            case 'index.html':
                enlaceId = 'nav-inicio';
                break;
            case 'menu.html':
                enlaceId = 'nav-menu';
                break;
            case 'reservas.html':
                enlaceId = 'nav-reservas';
                break;
            case 'contacto.html':
                enlaceId = 'nav-contacto';
                break;
        }
        
        // Aplicar clase active al enlace correspondiente
        if (enlaceId) {
            const enlaceActivo = document.getElementById(enlaceId);
            if (enlaceActivo) {
                enlaceActivo.classList.add('active');
                enlaceActivo.setAttribute('aria-current', 'page');
            }
        }
    }
    
    // Configurar el modal de búsqueda
    function configurarBusqueda() {
        const searchBtn = document.getElementById('searchBtn');
        const searchModal = new bootstrap.Modal(document.getElementById('searchModal'));
        const searchInput = document.getElementById('searchInput');
        
        if (searchBtn && searchModal && searchInput) {
            // Abrir el modal de búsqueda al hacer clic en el botón
            searchBtn.addEventListener('click', function() {
                searchModal.show();
                setTimeout(() => {
                    searchInput.focus();
                }, 300);
            });
            
            // Realizar la búsqueda
            searchInput.addEventListener('input', function() {
                const termino = this.value.trim();
                realizarBusqueda(termino);
            });
            
            // También buscar al presionar Enter
            searchInput.addEventListener('keypress', function(e) {
                if (e.key === 'Enter') {
                    const termino = this.value.trim();
                    if (termino) {
                        // Si estamos en la página de menú, buscar directamente
                        if (window.location.pathname.includes('menu.html')) {
                            searchModal.hide();
                            realizarBusquedaEnMenu(termino);
                        } else {
                            // Redirigir a la página de menú con el término de búsqueda
                            window.location.href = `menu.html?search=${encodeURIComponent(termino)}`;
                        }
                    }
                }
            });
        }
    }
    
    // Realizar búsqueda y mostrar resultados en el modal
    function realizarBusqueda(termino) {
        const searchResults = document.getElementById('searchResults');
        if (!searchResults || !window.app || !window.app.platos) return;
        
        if (!termino) {
            searchResults.innerHTML = '<div class="text-center text-muted py-4">Ingresa un término para buscar platos</div>';
            return;
        }
        
        const resultados = window.app.buscarPlatos(termino);
        
        if (resultados.length === 0) {
            searchResults.innerHTML = '<div class="text-center text-muted py-4">No se encontraron resultados</div>';
            return;
        }
        
        let html = '<div class="list-group">';
        resultados.slice(0, 5).forEach(plato => {
            html += `
                <a href="menu.html?search=${encodeURIComponent(termino)}#plato-${plato.id}" 
                   class="list-group-item list-group-item-action d-flex align-items-center">
                    <div class="flex-shrink-0" style="width:60px;height:60px">
                        <img src="${plato.image}" class="img-fluid rounded" alt="${plato.name}"
                             style="width:100%;height:100%;object-fit:cover"
                             onerror="this.src='https://via.placeholder.com/60/f8f9fa/4caf50?text=${plato.name[0]}'">
                    </div>
                    <div class="flex-grow-1 ms-3">
                        <h6 class="mb-0">${plato.name}</h6>
                        <span class="text-muted small">${plato.category} - $${plato.price}</span>
                    </div>
                </a>
            `;
        });
        
        if (resultados.length > 5) {
            html += `
                <a href="menu.html?search=${encodeURIComponent(termino)}" 
                   class="list-group-item list-group-item-action text-center">
                    Ver todos los ${resultados.length} resultados
                </a>
            `;
        }
        
        html += '</div>';
        searchResults.innerHTML = html;
    }
    
    // Redirigir al menú con búsqueda
    function realizarBusquedaEnMenu(termino) {
        if (typeof window.realizarBusqueda === 'function') {
            window.realizarBusqueda(termino);
        }
    }
    
    // Configurar el botón del carrito
    function configurarBotonCarrito() {
        const cartBtn = document.getElementById('cartBtn');
        const cartBadge = document.getElementById('cartBadge');
        
        if (cartBtn && cartBadge && window.app) {
            // Actualizar contador del carrito
            function actualizarContador() {
                const cantidad = window.app.carrito ? window.app.carrito.length : 0;
                cartBadge.textContent = cantidad;
                cartBadge.style.display = cantidad > 0 ? 'inline-block' : 'none';
            }
            
            // Configurar el botón para abrir el modal
            cartBtn.addEventListener('click', function() {
                const cartModal = document.getElementById('cartModal');
                if (cartModal) {
                    const modalInstance = new bootstrap.Modal(cartModal);
                    modalInstance.show();
                    
                    // Renderizar el carrito después de que el modal esté visible
                    setTimeout(() => {
                        if (window.app && typeof window.app.renderCartModal === 'function') {
                            window.app.renderCartModal();
                        }
                    }, 150);
                }
            });
            
            // Actualizar el contador al cargar la página
            actualizarContador();
        }
    }
    
    // Iniciar todas las funcionalidades
    marcarEnlaceActivo();
    configurarBusqueda();
    configurarBotonCarrito();
});