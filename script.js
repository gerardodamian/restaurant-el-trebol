class RestauranteApp {
    constructor() {
        this.searchTerm = "";
        this.carrito = [];

        // Array de platos disponibles
        this.platos = [
            {
                id: 1,
                name: "Milanesa Napolitana",
                category: "Platos Principales",
                price: 3800,
                image: "assets/img/foto3.png",
                offer: true,
                description:
                    "Milanesa de ternera cubierta con salsa de tomate, jamón y queso gratinado. Acompañada de papas fritas.",
                ingredients: [
                    "Carne",
                    "Pan rallado",
                    "Salsa de tomate",
                    "Jamón",
                    "Queso",
                    "Papas",
                ],
            },
            {
                id: 2,
                name: "Locro",
                category: "Pastas",
                price: 3200,
                image: "assets/img/foto14.png",
                description:
                    "La preparación del locro comienza con la selección de los mejores ingredientes: maíz blanco, porotos, zapallo, y una variedad de carnes como panceta, chorizo colorado y carne de res. Estos ingredientes se cocinan juntos lentamente, permitiendo que los sabores se mezclen y resulten en un guiso espeso y sustancioso.",
                ingredients: ["Harina", "Huevo", "Sal", "Aceite de oliva"],
            },
            {
                id: 3,
                name: "Lomo al Roquefort",
                category: "Platos Principales",
                price: 4500,
                image: "assets/img/foto2.png",
                offer: true,
                description:
                    "Medallón de lomo de primera calidad bañado en salsa de queso roquefort. Acompañado de puré rústico.",
                ingredients: [
                    "Lomo de res",
                    "Queso roquefort",
                    "Crema",
                    "Papas",
                    "Manteca",
                    "Especias",
                ],
            },
            {
                id: 4,
                name: "Ensalada César",
                category: "Entradas",
                price: 2200,
                image: "https://www.culinariamente.com/wp-content/uploads/2024/10/Receta-de-ensalada-Cesar-con-pollo.jpg",
                description:
                    "Clásica ensalada con lechuga romana, crutones, pollo grillado, queso parmesano y aderezo César casero.",
                ingredients: [
                    "Lechuga",
                    "Pollo",
                    "Pan tostado",
                    "Queso parmesano",
                    "Aderezo César",
                ],
            },
            {
                id: 5,
                name: "Bife de Chorizo",
                category: "Platos Principales",
                price: 4800,
                image: "https://www.kingarthur.com.ar/wp-content/uploads/2016/01/CARNE-bife-chorizo-21.jpg",
                offer: true,
                description:
                    "Jugoso bife de chorizo (400gr) cocinado a la parrilla al punto que prefieras. Acompañado de ensalada mixta o papas.",
                ingredients: [
                    "Carne de res",
                    "Sal gruesa",
                    "Pimienta",
                    "Chimichurri",
                ],
            },
            {
                id: 6,
                name: "Rabas al Ajillo",
                category: "Entradas",
                price: 2900,
                image: "https://i.ytimg.com/vi/DVyc7BIhYvs/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLDgaQA2l-X3kXXFiENRpeQwzZjOjA",
                description:
                    "Tiernos aros de calamar salteados en aceite de oliva, ajo y perejil. Con un toque de limón.",
                ingredients: [
                    "Calamares",
                    "Ajo",
                    "Aceite de oliva",
                    "Perejil",
                    "Limón",
                ],
            },
            {
                id: 7,
                name: "Risotto de Hongos",
                category: "Arroces",
                price: 3300,
                image: "https://www.cucinare.tv/wp-content/uploads/2021/05/Risotto.jpg",
                description:
                    "Cremoso arroz arbóreo con variedad de hongos frescos, vino blanco y queso parmesano.",
                ingredients: [
                    "Arroz arbóreo",
                    "Hongos",
                    "Caldo",
                    "Vino blanco",
                    "Queso parmesano",
                    "Manteca",
                ],
            },
            {
                id: 8,
                name: "Sorrentinos de Jamón y Queso",
                category: "Pastas",
                price: 3400,
                image: "https://www.recetas-argentinas.com/base/stock/Recipe/sorrentinos-caseros-de-ricota-jamon-y-mozzarella/sorrentinos-caseros-de-ricota-jamon-y-mozzarella_web.jpg",
                offer: true,
                description:
                    "Sorrentinos caseros rellenos de jamón y queso. Servidos con salsa fileto, crema o mixta.",
                ingredients: [
                    "Harina",
                    "Huevo",
                    "Jamón",
                    "Queso",
                    "Salsa de tomate",
                ],
            },
            {
                id: 9,
                name: "Pollo al Verdeo",
                category: "Platos Principales",
                price: 3500,
                image: "https://hoycocino.com.ar/wp-content/uploads/2023/08/receta-de-pollo-al-verdeo.jpg",
                description:
                    "Pechuga de pollo en salsa cremosa de cebolla de verdeo. Acompañada de puré de papas.",
                ingredients: [
                    "Pollo",
                    "Cebolla de verdeo",
                    "Crema",
                    "Papas",
                    "Manteca",
                ],
            },
            {
                id: 10,
                name: "Provoleta",
                category: "Entradas",
                price: 2100,
                image: "https://statics.eleconomista.com.ar/2023/11/crop/654969aa42ec0__420x280.webp",
                description:
                    "Queso provolone fundido a la parrilla con orégano, aceite de oliva y un toque de ají molido.",
                ingredients: [
                    "Queso provolone",
                    "Orégano",
                    "Aceite de oliva",
                    "Ají molido",
                ],
            },
            {
                id: 11,
                name: "Flan Casero",
                category: "Postres",
                price: 1500,
                image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQlTQd4-oTAqGRDtcN1O8nJoGQ09-fKxaYfXA&s",
                description:
                    "Tradicional flan casero con huevos de campo y leche. Acompañado de dulce de leche y crema.",
                ingredients: [
                    "Huevos",
                    "Leche",
                    "Azúcar",
                    "Vainilla",
                    "Dulce de leche",
                ],
            },
            {
                id: 12,
                name: "Agua Mineral",
                category: "Bebidas",
                price: 800,
                image: "https://jumboargentina.vtexassets.com/arquivos/ids/620318-1200-auto?v=637466226602700000&width=1200&height=auto&aspect=true",
                description: "Agua mineral natural sin gas, 500ml.",
                ingredients: ["Agua mineral natural"],
            },
            {
                id: 13,
                name: "Tiramisú",
                category: "Postres",
                price: 1800,
                image: "https://www.recetasderechupete.com/wp-content/uploads/2020/05/Tiramisú-italiano.jpg",
                offer: true,
                description:
                    "Auténtico postre italiano con bizcochos de café, queso mascarpone y cacao.",
                ingredients: [
                    "Queso mascarpone",
                    "Café",
                    "Bizcochos",
                    "Huevo",
                    "Cacao",
                ],
            },
            {
                id: 14,
                name: "Gaseosa Línea Coca-Cola",
                category: "Bebidas",
                price: 900,
                image: "https://acdn-us.mitiendanube.com/stores/001/144/141/products/whatsapp-image-2021-08-25-at-10-58-511-ce2f1154472dd2632c16298999809869-640-0.jpeg",
                offer: true,
                description:
                    "Gaseosa a elección: Coca-Cola, Sprite o Fanta. Botella de 500ml.",
                ingredients: ["Según selección"],
            },
            {
                id: 15,
                name: "Vino Malbec",
                category: "Bebidas",
                price: 3500,
                image: "https://www.espaciovino.com.ar/media/default/0001/62/thumb_61996_default_big.jpeg",
                description:
                    "Vino tinto Malbec de primera calidad de bodega local. Copa o botella.",
                ingredients: ["Uva Malbec"],
            },
        ];

        this.promociones = [
            {
                id: 101,
                nombre: "Menú Ejecutivo",
                precioOriginal: 5500,
                precioOferta: 4300,
                imagen: "https://via.placeholder.com/200x150/fff3cd/856404?text=Menu+Ejecutivo",
                descripcion: "Entrada + plato principal + postre + bebida"
            },
            {
                id: 102,
                nombre: "Miércoles de Pastas",
                precioOriginal: 4000,
                precioOferta: 3200,
                imagen: "https://via.placeholder.com/200x150/fff3cd/856404?text=Pastas+2x1",
                descripcion: "Todos los miércoles 2x1 en pastas caseras"
            },
            {
                id: 103,
                nombre: "Happy Hour",
                precioOriginal: 2600,
                precioOferta: 1800,
                imagen: "https://via.placeholder.com/200x150/fff3cd/856404?text=Happy+Hour",
                descripcion: "De 18 a 20hs bebidas al 30% de descuento"
            },
            {
                id: 104,
                nombre: "Combo Familiar",
                precioOriginal: 9500,
                precioOferta: 7800,
                imagen: "https://via.placeholder.com/200x150/fff3cd/856404?text=Combo+Familiar",
                descripcion: "4 milanesas + papas + bebida familiar"
            },
        ];

        this.init();
    }

    // Método para inicializar la aplicación
init() {
    this.setupEventListeners();
    this.actualizarContadorCarrito();
    
    // Inicializar el carrito desde localStorage si existe
    const carritoGuardado = localStorage.getItem('carrito');
    if (carritoGuardado) {
        try {
            this.carrito = JSON.parse(carritoGuardado);
            this.actualizarContadorCarrito();
        } catch (e) {
            console.error('Error al cargar el carrito desde localStorage', e);
            this.carrito = [];
        }
    } else {
        this.carrito = [];
    }
}

// Configuración de event listeners
setupEventListeners() {
    // Evento para el botón del carrito
    const cartBtn = document.getElementById('cartBtn');
    if (cartBtn) {
        cartBtn.addEventListener('click', () => {
            this.renderCartModal();
        });
    }
    
    // Evento para formulario de búsqueda
    const searchBtn = document.getElementById("searchBtn");
    const searchModalEl = document.getElementById("searchModal");
    let searchModalInstance = null;

    if (searchBtn && searchModalEl) {
        searchModalInstance =
            bootstrap.Modal.getOrCreateInstance(searchModalEl);

        searchBtn.addEventListener("click", () => {
            searchModalInstance.show();
        });
    }

    
    // Eventos para el modal del carrito
    const clearDataBtn = document.getElementById('clearDataBtn');
    if (clearDataBtn) {
        clearDataBtn.addEventListener('click', () => {
            if (confirm('¿Estás seguro de borrar tus datos guardados?')) {
                localStorage.removeItem('cliente_nombre');
                localStorage.removeItem('cliente_direccion');
                
                const nombreInput = document.getElementById('inputNombre');
                const direccionInput = document.getElementById('inputDireccion');
                
                if (nombreInput) nombreInput.value = '';
                if (direccionInput) direccionInput.value = '';
            }
        });
    }
    
    // Evento para el botón de WhatsApp
    const whatsappBtn = document.getElementById('whatsappBtn');
    if (whatsappBtn) {
        whatsappBtn.addEventListener('click', (e) => {
            e.preventDefault();
            this.enviarPedidoWhatsApp();
        });
    }
    
    // Guardar datos del cliente cuando cambian
    const nombreInput = document.getElementById('inputNombre');
    const direccionInput = document.getElementById('inputDireccion');
    
    if (nombreInput) {
        nombreInput.addEventListener('change', () => {
            this.actualizarNombreCliente(nombreInput.value);
        });
        // Cargar valor guardado
        if (localStorage.getItem('cliente_nombre')) {
            nombreInput.value = localStorage.getItem('cliente_nombre');
        }
    }
    
    if (direccionInput) {
        direccionInput.addEventListener('change', () => {
            this.actualizarDireccionCliente(direccionInput.value);
        });
        // Cargar valor guardado
        if (localStorage.getItem('cliente_direccion')) {
            direccionInput.value = localStorage.getItem('cliente_direccion');
        }
    }
}

// Método para renderizar el modal del carrito
renderCartModal() {
    console.log("Renderizando modal del carrito");
    
    // Obtener las referencias a los elementos del DOM una sola vez
    const cartItems = document.getElementById('cartItems');
    const totalAmount = document.getElementById('totalAmount');
    const emptyCart = document.getElementById('emptyCart');
    const cartFooter = document.getElementById('cartFooter');
    
    if (!cartItems || !totalAmount) {
        console.error("No se encontraron los elementos del carrito en el DOM");
        return;
    }
    
    // Verificar si hay elementos en el carrito
    if (!this.carrito || this.carrito.length === 0) {
        if (emptyCart) emptyCart.style.display = 'block';
        if (cartItems) cartItems.style.display = 'none';
        if (cartFooter) cartFooter.style.display = 'none';
        if (totalAmount) totalAmount.textContent = '$0';
        return;
    }
    
    // Hay elementos en el carrito, mostrar los items y ocultar mensaje de vacío
    if (emptyCart) emptyCart.style.display = 'none';
    if (cartItems) cartItems.style.display = 'block';
    if (cartFooter) cartFooter.style.display = 'block';
    
    // Generar el HTML de los items del carrito
    let html = '';
    let total = 0;
    
    this.carrito.forEach(item => {
        const subtotal = item.price * (item.cantidad || 1);
        total += subtotal;
        
        html += `
            <div class="d-flex border-bottom py-2 mb-2">
                <div class="flex-shrink-0" style="width: 60px; height: 60px;">
                    <img src="${item.image}" alt="${item.name}" class="img-fluid rounded" 
                         style="width: 100%; height: 100%; object-fit: cover;"
                         onerror="this.src='https://via.placeholder.com/60/e9ecef/495057?text=Imagen'">
                </div>
                <div class="flex-grow-1 ms-3">
                    <div class="d-flex justify-content-between">
                        <h6 class="mb-0">${item.name}</h6>
                        <button type="button" class="btn btn-sm text-danger p-0 border-0 btn-eliminar-item" data-id="${item.id}">
                            <i data-lucide="x" width="16" height="16"></i>
                        </button>
                    </div>
                    <p class="text-muted small mb-2">${item.category}</p>
                    <div class="d-flex justify-content-between align-items-center">
                        <div class="btn-group btn-group-sm">
                            <button type="button" class="btn btn-outline-secondary btn-sm btn-decrementar" data-id="${item.id}">-</button>
                            <span class="btn btn-outline-secondary disabled">${item.cantidad || 1}</span>
                            <button type="button" class="btn btn-outline-secondary btn-sm btn-incrementar" data-id="${item.id}">+</button>
                        </div>
                        <span class="fw-bold">$${subtotal}</span>
                    </div>
                </div>
            </div>
        `;
    });
    
    // Actualizar el DOM
    cartItems.innerHTML = html;
    
    // Añadir los event listeners usando delegación de eventos
    cartItems.querySelectorAll('.btn-eliminar-item').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const id = parseInt(btn.getAttribute('data-id'));
            this.eliminarDelCarrito(id);
        });
    });
    
    cartItems.querySelectorAll('.btn-decrementar').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const id = parseInt(btn.getAttribute('data-id'));
            this.decrementarCantidad(id);
        });
    });
    
    cartItems.querySelectorAll('.btn-incrementar').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const id = parseInt(btn.getAttribute('data-id'));
            this.incrementarCantidad(id);
        });
    });
    
    // Actualizar el total
    if (totalAmount) totalAmount.textContent = `$${total}`;
    
    // Inicializar los iconos de Lucide de manera segura
    if (typeof lucide !== "undefined") {
        setTimeout(() => {
            try {
                lucide.createIcons();
            } catch (error) {
                console.error("Error al inicializar iconos Lucide:", error);
            }
        }, 50);
    }
}

// Método para agregar productos al carrito
agregarAlCarrito(plato) {
    console.log("Agregando al carrito:", plato.name);
    
    try {
        // Buscar si el plato ya está en el carrito
        const itemExistente = this.carrito.find(item => item.id === plato.id);
        
        if (itemExistente) {
            // Si ya existe, incrementar cantidad
            itemExistente.cantidad = (itemExistente.cantidad || 1) + 1;
        } else {
            // Si no existe, agregarlo con cantidad 1
            const platoParaCarrito = {...plato, cantidad: 1};
            this.carrito.push(platoParaCarrito);
        }
        
        // Guardar carrito en localStorage
        localStorage.setItem('carrito', JSON.stringify(this.carrito));
        
        // Actualizar contador visual
        this.actualizarContadorCarrito();
        
        // Mostrar notificación
        this.mostrarNotificacion(`${plato.name} agregado al pedido`);
        
        // También renderizar el carrito si está visible
        const cartModal = document.getElementById('cartModal');
        if (cartModal && cartModal.classList.contains('show')) {
            this.renderCartModal();
        }
    } catch (error) {
        console.error("Error al agregar al carrito:", error);
        this.mostrarNotificacionError("No se pudo agregar el producto al carrito");
    }
}

// Método para incrementar la cantidad de un producto en el carrito (optimizado)
incrementarCantidad(id) {
    try {
        const item = this.carrito.find(item => item.id === id);
        if (item) {
            item.cantidad = (item.cantidad || 1) + 1;
            localStorage.setItem('carrito', JSON.stringify(this.carrito));
            this.actualizarContadorCarrito();
            
            // Actualizar solo el elemento específico en lugar de todo el carrito
            const cantidadElement = document.querySelector(`.btn-incrementar[data-id="${id}"]`)
                ?.parentElement?.querySelector('.disabled');
            
            if (cantidadElement) {
                cantidadElement.textContent = item.cantidad;
            } else {
                // Si no podemos actualizar solo el elemento, renderizamos todo
                this.renderCartModal();
            }
        }
    } catch (error) {
        console.error('Error al incrementar cantidad:', error);
    }
}

// Método para decrementar la cantidad de un producto en el carrito (optimizado)
decrementarCantidad(id) {
    try {
        const item = this.carrito.find(item => item.id === id);
        if (!item) return;
        
        if ((item.cantidad || 1) > 1) {
            item.cantidad = item.cantidad - 1;
            localStorage.setItem('carrito', JSON.stringify(this.carrito));
            
            // Actualizar solo el elemento específico en lugar de todo el carrito
            const cantidadElement = document.querySelector(`.btn-decrementar[data-id="${id}"]`)
                ?.parentElement?.querySelector('.disabled');
            
            if (cantidadElement) {
                cantidadElement.textContent = item.cantidad;
            } else {
                // Si no podemos actualizar solo el elemento, renderizamos todo
                this.renderCartModal();
            }
        } else {
            this.eliminarDelCarrito(id);
            return;
        }
        
        this.actualizarContadorCarrito();
    } catch (error) {
        console.error('Error al decrementar cantidad:', error);
    }
}

// Método para eliminar un producto del carrito (optimizado)
eliminarDelCarrito(id) {
    try {
        const index = this.carrito.findIndex(item => item.id === id);
        if (index !== -1) {
            // Eliminar visualmente el elemento antes de procesarlo
            const elemento = document.querySelector(`[data-id="${id}"]`)?.closest('.d-flex.border-bottom');
            if (elemento) {
                elemento.style.height = elemento.offsetHeight + 'px';
                elemento.style.overflow = 'hidden';
                elemento.style.transition = 'all 0.3s ease-out';
                
                // Aplicar animación de desvanecimiento
                setTimeout(() => {
                    elemento.style.height = '0';
                    elemento.style.opacity = '0';
                    elemento.style.padding = '0';
                    elemento.style.margin = '0';
                }, 10);
                
                // Eliminar después de la animación
                setTimeout(() => {
                    // Eliminar del array y actualizar localStorage
                    this.carrito.splice(index, 1);
                    localStorage.setItem('carrito', JSON.stringify(this.carrito));
                    this.actualizarContadorCarrito();
                    
                    // Renderizar todo el carrito si está vacío
                    if (this.carrito.length === 0) {
                        this.renderCartModal();
                    }
                }, 300);
            } else {
                // Si no se encontró el elemento visual, eliminar directamente
                this.carrito.splice(index, 1);
                localStorage.setItem('carrito', JSON.stringify(this.carrito));
                this.actualizarContadorCarrito();
                this.renderCartModal();
            }
        }
    } catch (error) {
        console.error('Error al eliminar del carrito:', error);
    }
}

// Método para actualizar el contador visual del carrito
actualizarContadorCarrito() {
    const badge = document.getElementById('cartBadge');
    if (!badge) return;
    
    const totalItems = this.carrito.reduce((total, item) => total + (item.cantidad || 1), 0);
    
    if (totalItems > 0) {
        badge.textContent = totalItems;
        badge.style.display = 'inline-block';
    } else {
        badge.style.display = 'none';
    }
}

// Método para enviar pedido por WhatsApp
enviarPedidoWhatsApp() {
    if (this.carrito.length === 0) {
        this.mostrarNotificacionError('Agrega productos al carrito antes de enviar el pedido');
        return;
    }
    
    const nombre = document.getElementById('inputNombre')?.value || '';
    const direccion = document.getElementById('inputDireccion')?.value || '';
    
    if (!nombre || !direccion) {
        this.mostrarNotificacionError('Por favor completa tus datos para continuar');
        return;
    }
    
    // Guardar datos del cliente
    this.actualizarNombreCliente(nombre);
    this.actualizarDireccionCliente(direccion);
    
    // Método de entrega
    const metodoEntrega = document.querySelector('input[name="metodoEntrega"]:checked')?.value || 'local';
    
    // Crear mensaje de WhatsApp
    let mensaje = `*NUEVO PEDIDO - EL TRÉBOL*\n\n`;
    mensaje += `*Cliente:* ${nombre}\n`;
    mensaje += `*Teléfono:* ${direccion}\n`;
    mensaje += `*Método:* ${metodoEntrega === 'delivery' ? 'Delivery' : 'Retira en local'}\n\n`;
    mensaje += `*Detalle del pedido:*\n`;
    
    let total = 0;
    this.carrito.forEach(item => {
        const subtotal = item.price * (item.cantidad || 1);
        total += subtotal;
        mensaje += `• ${item.cantidad || 1}x ${item.name} - $${subtotal}\n`;
    });
    
    mensaje += `\n*Total:* $${total}`;
    mensaje += `\n\nGracias por tu pedido!`;
    
    // Abrir WhatsApp with the message
    const numeroWhatsApp = '5491123456789'; // Tu número de WhatsApp
    const urlWhatsApp = `https://api.whatsapp.com/send?phone=${numeroWhatsApp}&text=${encodeURIComponent(mensaje)}`;
    window.open(urlWhatsApp, '_blank');
}

// Método para mostrar una notificación de éxito
mostrarNotificacion(mensaje) {
    // Verificar si ya hay una notificación visible y eliminarla
    const notificacionesExistentes = document.querySelectorAll('.toast');
    notificacionesExistentes.forEach(notif => {
        try {
            // Obtener la instancia de Bootstrap si existe
            const toastInstance = bootstrap.Toast.getInstance(notif);
            if (toastInstance) {
                toastInstance.hide();
            }
            // Si después de 300ms sigue en el DOM, eliminarla
            setTimeout(() => {
                if (notif.parentNode) {
                    notif.parentNode.removeChild(notif);
                }
            }, 300);
        } catch (e) {
            // Si hay error, simplemente eliminar del DOM
            if (notif.parentNode) {
                notif.parentNode.removeChild(notif);
            }
        }
    });
    
    // Crear elemento de notificación
    const notificacion = document.createElement('div');
    notificacion.className = 'toast align-items-center text-bg-success border-0 position-fixed bottom-0 end-0 m-3';
    notificacion.style.zIndex = "1080";
    notificacion.setAttribute('role', 'alert');
    notificacion.innerHTML = `
        <div class="d-flex">
            <div class="toast-body">
                <i data-lucide="check-circle" class="me-2"></i>
                ${mensaje}
            </div>
            <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast"></button>
        </div>
    `;
    
    // Agregar al DOM
    document.body.appendChild(notificacion);
    
    // Inicializar el toast con Bootstrap
    const toast = new bootstrap.Toast(notificacion, {
        delay: 3000,
        autohide: true
    });
    
    // Mostrar después de un breve retraso para que la transición sea suave
    setTimeout(() => {
        toast.show();
        
        // Inicializar iconos
        if (typeof lucide !== "undefined") {
            try {
                lucide.createIcons();
            } catch (e) {
                console.error("Error al inicializar iconos:", e);
            }
        }
    }, 50);
    
    // Eliminar del DOM después de ocultarse
    notificacion.addEventListener('hidden.bs.toast', function () {
        if (notificacion.parentNode) {
            setTimeout(() => {
                if (notificacion.parentNode) {
                    notificacion.parentNode.removeChild(notificacion);
                }
            }, 300);
        }
    });
}

// Método para mostrar una notificación de error
mostrarNotificacionError(mensaje) {
    // Crear elemento de notificación
    const notificacion = document.createElement('div');
    notificacion.className = 'toast align-items-center text-bg-danger border-0 position-fixed bottom-0 end-0 m-3';
    notificacion.style.zIndex = "1080";
    notificacion.setAttribute('role', 'alert');
    notificacion.innerHTML = `
        <div class="d-flex">
            <div class="toast-body">
                <i data-lucide="alert-circle" class="me-2"></i>
                ${mensaje}
            </div>
            <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast"></button>
        </div>
    `;
    
    // Agregar al DOM
    document.body.appendChild(notificacion);
    
    // Inicializar el toast con Bootstrap
    const toast = new bootstrap.Toast(notificacion, {
        delay: 3000,
        autohide: true
    });
    toast.show();
    
    // Inicializar iconos
    if (typeof lucide !== "undefined") {
        lucide.createIcons();
    }
    
    // Eliminar del DOM después de ocultarse
    notificacion.addEventListener('hidden.bs.toast', function () {
        document.body.removeChild(notificacion);
    });
}

// Método para buscar platos
buscarPlatos(termino) {
    if (!termino || !this.platos) return [];
    
    termino = termino.toLowerCase().trim();
    
    return this.platos.filter(plato => 
        plato.name.toLowerCase().includes(termino) || 
        plato.description.toLowerCase().includes(termino) || 
        plato.category.toLowerCase().includes(termino) ||
        (plato.ingredients && Array.isArray(plato.ingredients) && 
        plato.ingredients.some(i => i.toLowerCase().includes(termino)))
    );
}
}

// Inicializar la aplicación y hacerla accesible globalmente
window.addEventListener("DOMContentLoaded", function () {
    window.app = new RestauranteApp();
});
  

// Agregar esta función para configurar el carrito en cualquier página
function configurarCarritoEnPagina() {
    // Si ya existe la app global
    if (!window.app) return;
    
    // Configurar el botón del carrito para que abra el modal
    const cartBtn = document.getElementById('cartBtn');
    if (cartBtn) {
        cartBtn.addEventListener('click', function() {
            window.app.renderCartModal();
        });
    }
    
    // Inicializar contador del carrito
    window.app.actualizarContadorCarrito();
}

// Ejecutar cuando el DOM esté listo
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', configurarCarritoEnPagina);
} else {
    configurarCarritoEnPagina();
}