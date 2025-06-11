/**
 * Restaurante El Trébol - JavaScript Combinado
 * Versión: 1.0.0
 * Fecha: 9 de junio de 2025
 * 
 * Este archivo reemplaza a:
 * - script.js
 * - globalCarrito.js
 * - activePage.js
 * - menu.js
 * - debug-platos.js
 * - fixEvents.js
 * - fixFilters.js
 * - quickstart.js
 */

// Creamos un objeto global para El Trébol
const ElTrebol = {
    // Configuración general
    config: {
        apiUrl: './data/',
        whatsappNumber: '5491123456789',
        debug: true,
        enableQuickstart: true
    },
    
    // Estado de la aplicación
    state: {
        products: [],
        specialOffers: [],
        cart: [],
        currentPage: '',
        currentCategory: 'all'
    },
    
    // Inicialización principal
    init: function() {
        console.log('Aplicación inicializada correctamente');
        
        // Detección de página actual
        this.detectCurrentPage();
        
        // Inicialización del carrito
        this.cart.init();
        
        // Inicialización específica por página
        this.initByPage();
        
        // Debug (si está habilitado)
        if (this.config.debug) {
            this.debug.init();
        }
        
        // Inicialización rápida (si está habilitada)
        if (this.config.enableQuickstart) {
            this.quickstart();
        }
    },
    
    // Detecta la página actual basada en la URL
    detectCurrentPage: function() {
        const path = window.location.pathname;
        const filename = path.split('/').pop();
        
        if (filename === '' || filename === '/' || filename.includes('index')) {
            this.state.currentPage = 'inicio';
        } else if (filename.includes('menu')) {
            this.state.currentPage = 'menu';
        } else if (filename.includes('reservas')) {
            this.state.currentPage = 'reservas';
        } else if (filename.includes('contacto')) {
            this.state.currentPage = 'contacto';
        }
        
        // Destacar la página actual en el menú
        const navItem = document.getElementById(`nav-${this.state.currentPage}`);
        if (navItem) {
            navItem.classList.add('active');
        }
        
        console.log(`Página actual: ${this.state.currentPage}`);
    },
    
    // Inicialización específica por página
    initByPage: function() {
        // Inicializar componentes comunes
        this.initCommonComponents();
        
        // Inicialización específica
        if (this.state.currentPage === 'menu') {
            this.menu.init();
        } else if (this.state.currentPage === 'reservas') {
            // Inicializar reservas
        } else if (this.state.currentPage === 'contacto') {
            // Inicializar contacto
        }
    },
    
    // Inicializar componentes comunes a todas las páginas
    initCommonComponents: function() {
        // Botón de búsqueda
        const searchBtn = document.getElementById('searchBtn');
        if (searchBtn) {
            searchBtn.addEventListener('click', function() {
                const searchModal = new bootstrap.Modal(document.getElementById('searchModal'));
                searchModal.show();
                document.getElementById('searchInput').focus();
            });
        }
        
        // Botón de carrito
        const cartBtn = document.getElementById('cartBtn');
        if (cartBtn) {
            cartBtn.addEventListener('click', function() {
                ElTrebol.cart.showCart();
            });
        }
        
        // Búsqueda
        this.initSearch();
    },
    
    // Inicializa la funcionalidad de búsqueda
    initSearch: function() {
        const searchInput = document.getElementById('searchInput');
        const searchModalBtn = document.getElementById('searchModalBtn');
        const searchResults = document.getElementById('searchResults');
        
        if (!searchInput || !searchModalBtn || !searchResults) return;
        
        // Función para realizar la búsqueda
        const performSearch = () => {
            const query = searchInput.value.trim().toLowerCase();
            
            if (query.length < 2) {
                searchResults.innerHTML = '<p class="text-center my-4 text-muted">Ingresa al menos 2 caracteres para buscar</p>';
                return;
            }
            
            // Filtrar productos
            const results = this.state.products.filter(product => 
                product.nombre.toLowerCase().includes(query) || 
                product.descripcion.toLowerCase().includes(query) ||
                product.categoria.toLowerCase().includes(query)
            );
            
            // Mostrar resultados
            if (results.length === 0) {
                searchResults.innerHTML = '<p class="text-center my-4 text-muted">No se encontraron resultados</p>';
                return;
            }
            
            searchResults.innerHTML = '';
            
            // Mostrar resultados encontrados
            results.forEach(product => {
                const resultItem = document.createElement('div');
                resultItem.className = 'card mb-2 product-result';
                resultItem.dataset.id = product.id;
                resultItem.innerHTML = `
                    <div class="card-body d-flex align-items-center">
                        <img src="${product.imagen}" alt="${product.nombre}" class="me-3" 
                             width="60" height="60" onerror="this.src='https://via.placeholder.com/60?text=Menú'">
                        <div>
                            <h5 class="card-title mb-1">${product.nombre}</h5>
                            <p class="card-text text-muted mb-0">${product.categoria} - $${product.precio.toFixed(2)}</p>
                        </div>
                    </div>
                `;
                searchResults.appendChild(resultItem);
                
                // Agregar evento click para mostrar detalles
                resultItem.addEventListener('click', () => {
                    // Cerrar modal de búsqueda
                    bootstrap.Modal.getInstance(document.getElementById('searchModal')).hide();
                    
                    // Mostrar detalles del producto
                    if (this.state.currentPage === 'menu') {
                        this.menu.showProductDetails(product);
                    } else {
                        // Redirigir a menú con parámetro para mostrar detalles
                        window.location.href = `menu.html?product=${product.id}`;
                    }
                });
            });
        };
        
        // Evento de botón de búsqueda
        searchModalBtn.addEventListener('click', performSearch);
        
        // Evento de Enter en input
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                performSearch();
            }
        });
    },
    
    // Función de quickstart
    quickstart: function() {
        console.log('✅ Activada carga forzada de página');
        
        // Si estamos en la página de menú, forzar carga de menú
        if (this.state.currentPage === 'menu') {
            // Asegurarse de que los filtros funcionan
            document.querySelectorAll('[data-category]').forEach(btn => {
                btn.addEventListener('click', (e) => {
                    const category = btn.getAttribute('data-category');
                    
                    // Desactivar todos los botones
                    document.querySelectorAll('[data-category]').forEach(b => {
                        b.classList.remove('active');
                    });
                    
                    // Activar este botón
                    btn.classList.add('active');
                    
                    // Filtrar platos
                    if (ElTrebol.menu && ElTrebol.menu.filterByCategory) {
                        ElTrebol.menu.filterByCategory(category);
                    }
                });
            });
        }
    },
    
    // Módulo para el menú
    menu: {
        init: function() {
            console.log('📋 Inicializando página de menú');
            
            // Cargar productos
            this.loadProducts()
                .then(() => {
                    // Mostrar todos los platos
                    this.filterByCategory('all');
                    
                    console.log('📋 Mostrando todos los platos');
                    console.log('✅ Página de menú inicializada correctamente');
                })
                .catch(error => {
                    console.error('Error cargando productos:', error);
                });
        },
        
        // Carga los productos desde el archivo JSON
        loadProducts: function() {
            return new Promise((resolve, reject) => {
                // Simular carga de datos (reemplazar con fetch real)
                setTimeout(() => {
                    // Datos de ejemplo
                    ElTrebol.state.products = [
                        {
                            id: '1',
                            nombre: 'Milanesa napolitana',
                            descripcion: 'Milanesa de ternera cubierta con salsa de tomate, jamón y queso mozzarella.',
                            descripcionCorta: 'Milanesa con salsa, jamón y queso.',
                            categoria: 'Platos Principales',
                            precio: 1500,
                            imagen: 'assets/img/platos/milanesa-napolitana.jpg',
                            ingredientes: ['Ternera', 'Salsa de tomate', 'Jamón', 'Queso mozzarella', 'Orégano']
                        },
                        {
                            id: '2',
                            nombre: 'Ensalada César',
                            descripcion: 'Lechuga romana, crutones, pollo, queso parmesano y aderezo César.',
                            descripcionCorta: 'Clásica ensalada con pollo y aderezo César.',
                            categoria: 'Entradas',
                            precio: 950,
                            imagen: 'assets/img/platos/ensalada-cesar.jpg',
                            ingredientes: ['Lechuga romana', 'Pollo', 'Crutones', 'Queso parmesano', 'Aderezo César']
                        },
                        {
                            id: '3',
                            nombre: 'Tallarines a la Bolognesa',
                            descripcion: 'Tallarines al dente con salsa bolognesa casera y queso parmesano.',
                            descripcionCorta: 'Pasta con salsa de carne y tomate.',
                            categoria: 'Pastas',
                            precio: 1200,
                            imagen: 'assets/img/platos/tallarines-bolognesa.jpg',
                            ingredientes: ['Tallarines', 'Carne picada', 'Tomate', 'Zanahoria', 'Cebolla', 'Queso parmesano']
                        }
                    ];
                    
                    ElTrebol.state.specialOffers = [
                        {
                            id: '10',
                            nombre: 'Paella Marinera',
                            descripcion: 'Arroz con mariscos, azafrán y verduras.',
                            descripcionCorta: 'Deliciosa paella con mariscos frescos.',
                            categoria: 'Arroces',
                            precio: 1800,
                            imagen: 'assets/img/platos/paella.jpg',
                            oferta: true,
                            descuento: 15,
                            ingredientes: ['Arroz', 'Calamares', 'Mejillones', 'Camarones', 'Azafrán', 'Pimiento', 'Guisantes']
                        }
                    ];
                    
                    resolve();
                }, 500);
            });
        },
        
        // Filtra los platos por categoría
        filterByCategory: function(category) {
            ElTrebol.state.currentCategory = category;
            const menuContainer = document.getElementById('menuCompleto');
            
            if (!menuContainer) return;
            
            // Filtrar los productos según la categoría
            const filteredProducts = category === 'all' 
                ? ElTrebol.state.products 
                : ElTrebol.state.products.filter(product => product.categoria === category);
            
            // Limpiar el contenedor
            menuContainer.innerHTML = '';
            
            if (filteredProducts.length === 0) {
                menuContainer.innerHTML = '<div class="col-12 py-5 text-center"><p class="lead text-muted">No hay platos disponibles en esta categoría</p></div>';
                return;
            }
            
            // Mostrar los productos filtrados
            filteredProducts.forEach(product => {
                const productCard = document.createElement('div');
                productCard.className = 'col';
                productCard.innerHTML = `
                    <div class="card h-100 product-card" data-id="${product.id}">
                        <img src="${product.imagen}" class="card-img-top" alt="${product.nombre}" 
                            onerror="this.src='https://via.placeholder.com/300x200?text=Menú'">
                        <div class="card-body">
                            <h5 class="card-title">${product.nombre}</h5>
                            <p class="card-text text-muted">${product.descripcionCorta || product.descripcion.substring(0, 80) + '...'}</p>
                            <div class="d-flex justify-content-between align-items-center">
                                <span class="fs-5 fw-bold">$${product.precio.toFixed(2)}</span>
                                <button class="btn btn-sm btn-outline-success add-to-cart-btn">
                                    <i data-lucide="shopping-cart" width="16" height="16"></i> Agregar
                                </button>
                            </div>
                        </div>
                    </div>
                `;
                
                menuContainer.appendChild(productCard);
                
                // Evento para mostrar detalles al hacer clic en la tarjeta
                const card = productCard.querySelector('.product-card');
                card.addEventListener('click', (e) => {
                    if (!e.target.closest('.add-to-cart-btn')) {
                        this.showProductDetails(product);
                    }
                });
                
                // Evento para agregar al carrito
                const addBtn = productCard.querySelector('.add-to-cart-btn');
                addBtn.addEventListener('click', (e) => {
                    e.stopPropagation(); // Evitar que se abra el modal de detalles
                    ElTrebol.cart.addToCart(product);
                });
            });
            
            // Volver a inicializar iconos
            if (window.lucide) {
                lucide.createIcons();
            }
        },
        
        // Muestra los detalles del producto en un modal
        showProductDetails: function(product) {
            // Actualizar el contenido del modal con los datos del producto
            document.getElementById('modalProductoTitulo').textContent = product.nombre;
            document.getElementById('modalProductoCategoria').textContent = product.categoria;
            document.getElementById('modalProductoPrecio').textContent = `$${product.precio.toFixed(2)}`;
            document.getElementById('modalProductoDescripcion').textContent = product.descripcion;
            
            // Imagen
            const modalImg = document.getElementById('modalProductoImagen');
            modalImg.src = product.imagen;
            modalImg.alt = product.nombre;
            
            // Ingredientes
            const ingredientsList = document.getElementById('modalProductoIngredientes');
            ingredientsList.innerHTML = '';
            
            if (product.ingredientes && product.ingredientes.length > 0) {
                product.ingredientes.forEach(ingrediente => {
                    const li = document.createElement('li');
                    li.className = 'mb-1';
                    li.innerHTML = `<i data-lucide="check" width="16" height="16" class="text-success me-1"></i> ${ingrediente}`;
                    ingredientsList.appendChild(li);
                });
            } else {
                ingredientsList.innerHTML = '<li class="text-muted">No hay información disponible</li>';
            }
            
            // Botón de agregar al carrito
            const addBtn = document.getElementById('btnAgregarDesdeModal');
            addBtn.onclick = function() {
                ElTrebol.cart.addToCart(product);
                bootstrap.Modal.getInstance(document.getElementById('productoModal')).hide();
            };
            
            // Mostrar el modal
            const modal = new bootstrap.Modal(document.getElementById('productoModal'));
            modal.show();
            
            // Volver a inicializar iconos
            if (window.lucide) {
                lucide.createIcons();
            }
        }
    },
    
    // Módulo para el carrito
    cart: {
        // Inicializa el carrito
        init: function() {
            console.log('Inicializando funcionalidad del carrito global');
            
            // Cargar el carrito guardado
            this.loadCart();
            
            // Inicializar eventos del carrito
            this.initCartEvents();
            
            console.log('Aplicación inicializada para el carrito');
        },
        
        // Carga el carrito desde localStorage
        loadCart: function() {
            const savedCart = localStorage.getItem('elTrebolCart');
            if (savedCart) {
                try {
                    ElTrebol.state.cart = JSON.parse(savedCart);
                    this.updateCartBadge();
                } catch (e) {
                    console.error('Error al cargar el carrito:', e);
                    ElTrebol.state.cart = [];
                }
            }
        },
        
        // Guarda el carrito en localStorage
        saveCart: function() {
            localStorage.setItem('elTrebolCart', JSON.stringify(ElTrebol.state.cart));
        },
        
        // Inicializa los eventos relacionados con el carrito
        initCartEvents: function() {
            // Evento para el botón de WhatsApp
            const whatsappBtn = document.getElementById('whatsappBtn');
            if (whatsappBtn) {
                whatsappBtn.addEventListener('click', () => {
                    this.sendWhatsAppOrder();
                });
            }
            
            // Evento para borrar datos guardados
            const clearDataBtn = document.getElementById('clearDataBtn');
            if (clearDataBtn) {
                clearDataBtn.addEventListener('click', () => {
                    localStorage.removeItem('elTrebolUserData');
                    document.getElementById('inputNombre').value = '';
                    document.getElementById('inputDireccion').value = '';
                    alert('Datos guardados eliminados correctamente');
                });
            }
        },
        
        // Agrega un producto al carrito
        addToCart: function(product) {
            // Comprobar si el producto ya está en el carrito
            const existingProductIndex = ElTrebol.state.cart.findIndex(item => item.id === product.id);
            
            if (existingProductIndex >= 0) {
                // Incrementar cantidad
                ElTrebol.state.cart[existingProductIndex].cantidad++;
            } else {
                // Agregar nuevo producto
                ElTrebol.state.cart.push({
                    id: product.id,
                    nombre: product.nombre,
                    precio: product.precio,
                    imagen: product.imagen,
                    cantidad: 1
                });
            }
            
            // Guardar carrito y actualizar UI
            this.saveCart();
            this.updateCartBadge();
            
            // Mostrar notificación toast
            this.showToast(`${product.nombre} agregado al pedido`);
        },
        
        // Muestra el carrito
        showCart: function() {
            this.renderCart();
            const modal = new bootstrap.Modal(document.getElementById('cartModal'));
            modal.show();
        },
        
        // Renderiza el contenido del carrito
        renderCart: function() {
            const emptyCart = document.getElementById('emptyCart');
            const cartItems = document.getElementById('cartItems');
            const cartFooter = document.getElementById('cartFooter');
            
            if (ElTrebol.state.cart.length === 0) {
                emptyCart.style.display = 'block';
                cartItems.style.display = 'none';
                cartFooter.style.display = 'none';
                return;
            }
            
            // Mostrar items del carrito
            emptyCart.style.display = 'none';
            cartItems.style.display = 'block';
            cartFooter.style.display = 'block';
            
            // Renderizar productos en el carrito
            cartItems.innerHTML = '';
            let total = 0;
            
            ElTrebol.state.cart.forEach(item => {
                const subtotal = item.precio * item.cantidad;
                total += subtotal;
                
                const itemEl = document.createElement('div');
                itemEl.className = 'card mb-2';
                itemEl.innerHTML = `
                    <div class="card-body">
                        <div class="d-flex">
                            <img src="${item.imagen}" class="me-3" width="60" height="60" alt="${item.nombre}" 
                                onerror="this.src='https://via.placeholder.com/60?text=Menú'">
                            <div class="flex-grow-1">
                                <h6 class="mb-0">${item.nombre}</h6>
                                <div class="d-flex justify-content-between align-items-center mt-2">
                                    <div class="input-group input-group-sm" style="width: 120px;">
                                        <button class="btn btn-outline-secondary quantity-btn" data-action="decrement" data-id="${item.id}">−</button>
                                        <input type="number" class="form-control text-center quantity-input" value="${item.cantidad}" min="1" data-id="${item.id}">
                                        <button class="btn btn-outline-secondary quantity-btn" data-action="increment" data-id="${item.id}">+</button>
                                    </div>
                                    <div class="d-flex flex-column align-items-end">
                                        <span class="text-muted">$${item.precio.toFixed(2)} × ${item.cantidad}</span>
                                        <span class="fw-bold">$${subtotal.toFixed(2)}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <button class="btn btn-sm text-danger remove-item mt-2" data-id="${item.id}">
                            <i data-lucide="trash-2" width="16" height="16"></i> Eliminar
                        </button>
                    </div>
                `;
                
                cartItems.appendChild(itemEl);
            });
            
            // Actualizar total
            document.getElementById('totalAmount').textContent = `$${total.toFixed(2)}`;
            
            // Cargar datos guardados
            this.loadUserData();
            
            // Añadir eventos a los botones
            this.addCartItemsEvents();
            
            // Volver a inicializar iconos
            if (window.lucide) {
                lucide.createIcons();
            }
        },
        
        // Añade eventos a los items del carrito
        addCartItemsEvents: function() {
            // Botones de cantidad
            document.querySelectorAll('.quantity-btn').forEach(button => {
                button.addEventListener('click', () => {
                    const productId = button.dataset.id;
                    const action = button.dataset.action;
                    const currentItem = ElTrebol.state.cart.find(item => item.id === productId);
                    
                    if (currentItem) {
                        if (action === 'increment') {
                            this.updateQuantity(productId, currentItem.cantidad + 1);
                        } else if (action === 'decrement') {
                            this.updateQuantity(productId, currentItem.cantidad - 1);
                        }
                    }
                });
            });
            
            // Inputs de cantidad
            document.querySelectorAll('.quantity-input').forEach(input => {
                input.addEventListener('change', () => {
                    const productId = input.dataset.id;
                    const newQuantity = parseInt(input.value, 10);
                    
                    if (!isNaN(newQuantity)) {
                        this.updateQuantity(productId, newQuantity);
                    }
                });
            });
            
            // Botones de eliminar
            document.querySelectorAll('.remove-item').forEach(button => {
                button.addEventListener('click', () => {
                    const productId = button.dataset.id;
                    this.removeFromCart(productId);
                });
            });
        },
        
        // Actualiza la cantidad de un producto en el carrito
        updateQuantity: function(productId, newQuantity) {
            if (newQuantity <= 0) {
                this.removeFromCart(productId);
                return;
            }
            
            const productIndex = ElTrebol.state.cart.findIndex(item => item.id === productId);
            if (productIndex !== -1) {
                ElTrebol.state.cart[productIndex].cantidad = newQuantity;
                this.saveCart();
                this.updateCartBadge();
                
                // Si el modal está abierto, actualizar
                if (document.getElementById('cartModal').classList.contains('show')) {
                    this.renderCart();
                }
            }
        },
        
        // Elimina un producto del carrito
        removeFromCart: function(productId) {
            ElTrebol.state.cart = ElTrebol.state.cart.filter(item => item.id !== productId);
            this.saveCart();
            this.updateCartBadge();
            
            // Si el modal está abierto, actualizar
            if (document.getElementById('cartModal').classList.contains('show')) {
                this.renderCart();
            }
        },
        
        // Actualiza el badge del carrito
        updateCartBadge: function() {
            const cartBadge = document.getElementById('cartBadge');
            if (!cartBadge) return;
            
            const itemCount = ElTrebol.state.cart.reduce((sum, item) => sum + item.cantidad, 0);
            
            if (itemCount > 0) {
                cartBadge.textContent = itemCount;
                cartBadge.style.display = 'block';
            } else {
                cartBadge.style.display = 'none';
            }
        },
        
        // Carga datos del usuario desde localStorage
        loadUserData: function() {
            const savedUserData = localStorage.getItem('elTrebolUserData');
            if (savedUserData) {
                try {
                    const userData = JSON.parse(savedUserData);
                    document.getElementById('inputNombre').value = userData.nombre || '';
                    document.getElementById('inputDireccion').value = userData.direccion || '';
                    
                    // Método de entrega
                    if (userData.metodoEntrega) {
                        const radioBtn = document.querySelector(`input[name="metodoEntrega"][value="${userData.metodoEntrega}"]`);
                        if (radioBtn) radioBtn.checked = true;
                    }
                } catch (e) {
                    console.error('Error al cargar datos del usuario:', e);
                }
            }
        },
        
        // Guarda los datos del usuario en localStorage
        saveUserData: function() {
            const nombre = document.getElementById('inputNombre').value;
            const direccion = document.getElementById('inputDireccion').value;
            const metodoEntrega = document.querySelector('input[name="metodoEntrega"]:checked').value;
            
            const userData = { nombre, direccion, metodoEntrega };
            localStorage.setItem('elTrebolUserData', JSON.stringify(userData));
            
            return userData;
        },
        
        // Envía el pedido por WhatsApp
        sendWhatsAppOrder: function() {
            if (ElTrebol.state.cart.length === 0) {
                alert('Tu pedido está vacío');
                return;
            }
            
            // Guardar datos del usuario
            const userData = this.saveUserData();
            
            // Construir mensaje de WhatsApp
            let mensaje = `*Pedido El Trébol*\n`;
            mensaje += `*Nombre:* ${userData.nombre}\n`;
            mensaje += `*Teléfono:* ${userData.direccion}\n`;
            mensaje += `*Método:* ${userData.metodoEntrega === 'delivery' ? 'Delivery' : 'Retirar en local'}\n\n`;
            mensaje += `*Detalle del pedido:*\n`;
            
            let total = 0;
            ElTrebol.state.cart.forEach(item => {
                const subtotal = item.precio * item.cantidad;
                total += subtotal;
                mensaje += `• ${item.cantidad}× ${item.nombre} - $${subtotal.toFixed(2)}\n`;
            });
            
            mensaje += `\n*TOTAL: $${total.toFixed(2)}*`;
            
            // Codificar URL
            const mensajeCodificado = encodeURIComponent(mensaje);
            const whatsappUrl = `https://api.whatsapp.com/send?phone=${ElTrebol.config.whatsappNumber}&text=${mensajeCodificado}`;
            
            window.open(whatsappUrl, '_blank');
        },
        
        // Muestra una notificación toast
        showToast: function(message) {
            // Crear contenedor si no existe
            let toastContainer = document.querySelector('.toast-container');
            if (!toastContainer) {
                toastContainer = document.createElement('div');
                toastContainer.className = 'toast-container position-fixed bottom-0 end-0 p-3';
                document.body.appendChild(toastContainer);
            }
            
            // Crear toast
            const toastId = `toast-${Date.now()}`;
            const toastEl = document.createElement('div');
            toastEl.className = 'toast show';
            toastEl.setAttribute('role', 'alert');
            toastEl.setAttribute('aria-live', 'assertive');
            toastEl.setAttribute('aria-atomic', 'true');
            toastEl.setAttribute('id', toastId);
            
            toastEl.innerHTML = `
                <div class="toast-header">
                    <strong class="me-auto">El Trébol</strong>
                    <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
                </div>
                <div class="toast-body">
                    ${message}
                </div>
            `;
            
            toastContainer.appendChild(toastEl);
            
            // Auto eliminar después de 3 segundos
            setTimeout(() => {
                toastEl.remove();
            }, 3000);
        }
    },
    
    // Funcionalidades de depuración
    debug: {
        init: function() {
            console.log('DEBUG PLATOS: Verificando datos...');
            
            // Verificar productos cargados
            if (ElTrebol.state.products.length > 0) {
                console.log(`DEBUG PLATOS: Se encontraron ${ElTrebol.state.products.length} platos ya cargados`);
                
                // Verificar categorías
                const categories = [...new Set(ElTrebol.state.products.map(p => p.categoria))];
                console.log('DEBUG PLATOS: Categorías disponibles:', categories);
            } else {
                console.warn('DEBUG PLATOS: No hay platos cargados');
            }
            
            console.log('DEBUG PLATOS: Verificación completa');
        }
    }
};

// Inicializar la aplicación cuando el documento esté listo
document.addEventListener('DOMContentLoaded', function() {
    ElTrebol.init();
});