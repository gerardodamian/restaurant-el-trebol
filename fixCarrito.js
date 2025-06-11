/**
 * Script para arreglar problemas con el carrito en todas las páginas
 */
document.addEventListener('DOMContentLoaded', function() {
    // Función para configurar el botón del carrito
    function configurarBotonCarrito() {
        const cartBtn = document.getElementById('cartBtn');
        if (!cartBtn) return;
        
        cartBtn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            // Asegurarse de que el modal existe
            let cartModal = document.getElementById('cartModal');
            
            // Si no existe, lo creamos dinámicamente
            if (!cartModal) {
                cartModal = document.createElement('div');
                cartModal.id = 'cartModal';
                cartModal.className = 'modal fade';
                cartModal.setAttribute('tabindex', '-1');
                cartModal.setAttribute('aria-hidden', 'true');
                
                cartModal.innerHTML = `
                    <div class="modal-dialog">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title">
                                    <i data-lucide="shopping-cart" width="18" height="18" class="me-2"></i>
                                    Tu Pedido
                                </h5>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div class="modal-body">
                                <div id="emptyCart" class="text-center py-5">
                                    <i data-lucide="utensils" width="48" height="48" class="text-muted mb-3"></i>
                                    <p class="lead">Tu pedido está vacío</p>
                                    <span class="text-muted">Agrega platos para continuar</span>
                                </div>
                                <div id="cartItems" style="display: none"></div>
                                <div id="cartFooter" class="mt-4 pt-3 border-top" style="display: none">
                                    <div class="d-flex justify-content-end align-items-center mb-3">
                                        <span class="me-2 fw-bold">Total:</span>
                                        <span class="fs-4 fw-bold" id="totalAmount">$0</span>
                                    </div>
                                    <form id="checkoutForm">
                                        <div class="mb-3">
                                            <input type="text" id="inputNombre" class="form-control" placeholder="Tu nombre" required />
                                        </div>
                                        <div class="mb-3">
                                            <input type="text" id="inputDireccion" class="form-control" placeholder="Teléfono de contacto" required />
                                        </div>
                                    </form>
                                    <div class="form-check">
                                        <input class="form-check-input" type="radio" name="metodoEntrega" id="entregaDelivery" value="delivery" />
                                        <label class="form-check-label" for="entregaDelivery">Delivery</label>
                                    </div>
                                    <div class="form-check mb-3">
                                        <input class="form-check-input" type="radio" name="metodoEntrega" id="entregaLocal" value="local" checked />
                                        <label class="form-check-label" for="entregaLocal">Reservar mesa</label>
                                    </div>

                                    <button class="btn btn-outline-danger w-100 mt-2 mb-3" id="clearDataBtn">
                                        Borrar datos guardados
                                    </button>

                                    <a href="#" class="btn btn-success w-100" id="whatsappBtn">
                                        <i data-lucide="message-circle" class="me-2"></i>
                                        Confirmar por WhatsApp
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                `;
                
                document.body.appendChild(cartModal);
                
                // Inicializar iconos después de añadir el modal al DOM
                if (typeof lucide !== "undefined") {
                    setTimeout(() => lucide.createIcons(), 100);
                }
            }
            
            // Abrir el modal
            const modalInstance = new bootstrap.Modal(cartModal);
            modalInstance.show();
            
            // Renderizar contenido del carrito después de que el modal esté visible
            setTimeout(() => {
                if (window.app && typeof window.app.renderCartModal === 'function') {
                    window.app.renderCartModal();
                }
            }, 150);
        });
        
        // Actualizar el contador del carrito
        actualizarContadorCarrito();
    }
    
    // Actualizar el contador del carrito
    function actualizarContadorCarrito() {
        if (!window.app) return;
        
        const cartBadge = document.getElementById('cartBadge');
        if (cartBadge) {
            const cantidad = window.app.carrito ? window.app.carrito.length : 0;
            cartBadge.textContent = cantidad;
            cartBadge.style.display = cantidad > 0 ? 'inline-block' : 'none';
        }
    }
    
    // Configurar modal de búsqueda
    function configurarModalBusqueda() {
        const searchBtn = document.getElementById('searchBtn');
        if (!searchBtn) return;
        
        searchBtn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            // Asegurarse de que el modal existe
            let searchModal = document.getElementById('searchModal');
            
            // Si no existe, lo creamos dinámicamente
            if (!searchModal) {
                searchModal = document.createElement('div');
                searchModal.id = 'searchModal';
                searchModal.className = 'modal fade';
                searchModal.setAttribute('tabindex', '-1');
                searchModal.setAttribute('aria-labelledby', 'searchModalLabel');
                searchModal.setAttribute('aria-hidden', 'true');
                
                searchModal.innerHTML = `
                    <div class="modal-dialog">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="searchModalLabel">Buscar en el menú</h5>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div class="modal-body">
                                <div class="mb-3">
                                    <input type="text" class="form-control" id="searchInput" placeholder="Buscar platos..." autocomplete="off">
                                </div>
                                <div id="searchResults"></div>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                                <a href="#" id="btnIrAResultados" class="btn btn-primary">Ver todos los resultados</a>
                            </div>
                        </div>
                    </div>
                `;
                
                document.body.appendChild(searchModal);
            }
            
            // Abrir el modal
            const modalInstance = new bootstrap.Modal(searchModal);
            modalInstance.show();
            
            // Configurar el input de búsqueda
            const searchInput = document.getElementById('searchInput');
            const searchResults = document.getElementById('searchResults');
            const btnIrAResultados = document.getElementById('btnIrAResultados');
            
            if (searchInput && searchResults && btnIrAResultados) {
                // Limpiar cualquier listener previo
                searchInput.removeEventListener('input', realizarBusquedaRapida);
                btnIrAResultados.removeEventListener('click', irAResultados);
                
                // Añadir listener para buscar mientras se escribe
                searchInput.addEventListener('input', realizarBusquedaRapida);
                
                // Añadir listener para ir a la página de resultados
                btnIrAResultados.addEventListener('click', irAResultados);
                
                // Enfocar el input de búsqueda
                setTimeout(() => searchInput.focus(), 300);
            }
        });
    }
    
    // Función para realizar búsqueda rápida
    function realizarBusquedaRapida() {
        const termino = this.value.trim();
        const searchResults = document.getElementById('searchResults');
        const btnIrAResultados = document.getElementById('btnIrAResultados');
        
        if (!searchResults || !btnIrAResultados || !window.app) return;
        
        if (!termino) {
            searchResults.innerHTML = '<div class="text-center text-muted py-4">Ingresa un término para buscar platos</div>';
            btnIrAResultados.style.display = 'none';
            return;
        }
        
        // Obtener resultados
        const resultados = window.app.buscarPlatos(termino);
        
        // Actualizar el botón de ir a resultados
        btnIrAResultados.style.display = 'block';
        btnIrAResultados.href = `menu.html?search=${encodeURIComponent(termino)}`;
        btnIrAResultados.textContent = `Ver todos los ${resultados.length} resultados`;
        
        if (resultados.length === 0) {
            searchResults.innerHTML = '<div class="text-center text-muted py-4">No se encontraron resultados</div>';
            btnIrAResultados.style.display = 'none';
            return;
        }
        
        // Mostrar resultados rápidos (máximo 5)
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
        html += '</div>';
        searchResults.innerHTML = html;
    }
    
    // Función para ir a la página de resultados
    function irAResultados(e) {
        e.preventDefault();
        const searchInput = document.getElementById('searchInput');
        if (!searchInput) return;
        
        const termino = searchInput.value.trim();
        if (!termino) return;
        
        // Cerrar el modal
        const searchModal = document.getElementById('searchModal');
        if (searchModal) {
            const modalInstance = bootstrap.Modal.getInstance(searchModal);
            if (modalInstance) modalInstance.hide();
        }
        
        // Navegar a la página de menú con el término de búsqueda
        window.location.href = `menu.html?search=${encodeURIComponent(termino)}`;
    }
    
    // Iniciar configuración
    configurarBotonCarrito();
    configurarModalBusqueda();
});