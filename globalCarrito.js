/**
 * Script para garantizar que el carrito funcione en todas las páginas
 */

// Carrito de compras global
window.carrito = JSON.parse(localStorage.getItem('carrito')) || [];

// Contador de inicializaciones para evitar duplicados
let initCount = 0;

// Inicialización única
document.addEventListener('DOMContentLoaded', function() {
    if (initCount > 0) return;
    initCount++;
    
    console.log('Inicializando carrito global');
    actualizarContadorCarrito();
    setupModalHandlers();
});

// Configurar manejadores del modal una sola vez
function setupModalHandlers() {
    const cartBtn = document.getElementById('cartBtn');
    const cartModalElement = document.getElementById('cartModal');
    
    // Si no existe el botón o modal, salir
    if (!cartBtn || !cartModalElement) return;
    
    // Remover todos los event listeners antiguos
    const newCartBtn = cartBtn.cloneNode(true);
    cartBtn.parentNode.replaceChild(newCartBtn, cartBtn);
    
    // Agregar nuevo event listener
    newCartBtn.addEventListener('click', function() {
        const bsModal = new bootstrap.Modal(cartModalElement);
        bsModal.show();
    });
    
    // Manejar apertura del modal
    cartModalElement.addEventListener('shown.bs.modal', function() {
        actualizarCarritoModal();
    });
    
    // Manejar cierre del modal de manera segura
    cartModalElement.addEventListener('hidden.bs.modal', function() {
        // Limpiar contenido después de cerrar para evitar problemas
        setTimeout(() => {
            const cartItems = document.getElementById('cartItems');
            if (cartItems) cartItems.innerHTML = '';
        }, 100);
    });
    
    // Configurar botón de vaciar carrito
    const clearCartBtn = document.getElementById('clearCartBtn');
    if (clearCartBtn) {
        clearCartBtn.addEventListener('click', function() {
            if (confirm('¿Estás seguro de que quieres vaciar tu pedido?')) {
                vaciarCarrito();
                mostrarNotificacionExito('Tu pedido ha sido vaciado');
            }
        });
    }
    
    // Configurar botón WhatsApp si existe
    const whatsappBtnFooter = document.getElementById('whatsappBtnFooter');
    if (whatsappBtnFooter) {
        whatsappBtnFooter.addEventListener('click', function(e) {
            e.preventDefault();
            enviarPedidoPorWhatsApp();
        });
    }
}

// Función para actualizar el contador del carrito
function actualizarContadorCarrito() {
    const badge = document.getElementById('cartBadge');
    if (!badge) return;
    
    const totalItems = window.carrito.reduce((sum, item) => sum + (item.cantidad || 1), 0);
    
    if (totalItems > 0) {
        badge.textContent = totalItems;
        badge.style.display = 'inline-block';
    } else {
        badge.style.display = 'none';
    }
}

// Función para agregar un producto al carrito
window.agregarAlCarrito = function(producto) {
    // Verificar si el producto ya está en el carrito
    const index = window.carrito.findIndex(item => item.id === producto.id);
    
    if (index !== -1) {
        // Si ya existe, aumentar cantidad
        window.carrito[index].cantidad = (window.carrito[index].cantidad || 1) + 1;
    } else {
        // Si no existe, agregarlo con cantidad 1
        const nuevoItem = {...producto, cantidad: 1};
        window.carrito.push(nuevoItem);
    }
    
    // Guardar en localStorage
    localStorage.setItem('carrito', JSON.stringify(window.carrito));
    
    // Actualizar contador de items
    actualizarContadorCarrito();
    
    // Actualizar el modal si está abierto
    if (document.querySelector('#cartModal.show')) {
        actualizarCarritoModal();
    }
    
    return true;
};

// Función para actualizar el carrito modal
function actualizarCarritoModal() {
    const cartItems = document.getElementById('cartItems');
    const emptyCart = document.getElementById('emptyCart');
    const cartFooter = document.getElementById('cartFooter');
    const totalAmount = document.getElementById('totalAmount');
    
    // Si no hay items en el carrito o no hay elementos en el DOM
    if (!window.carrito || window.carrito.length === 0 || !cartItems || !emptyCart || !cartFooter) {
        if (emptyCart) emptyCart.style.display = 'block';
        if (cartItems) cartItems.style.display = 'none';
        if (cartFooter) cartFooter.style.display = 'none';
        return;
    }
    
    // Mostrar items y ocultar mensaje de carrito vacío
    emptyCart.style.display = 'none';
    cartItems.style.display = 'block';
    cartFooter.style.display = 'block';
    
    // Limpiar carrito actual
    cartItems.innerHTML = '';
    
    // Añadir cada producto al carrito
    let total = 0;
    
    window.carrito.forEach(item => {
        const subtotal = (item.price || item.precio) * (item.cantidad || 1);
        total += subtotal;
        
        // Crear elemento para el producto
        const itemElement = document.createElement('div');
        itemElement.className = 'cart-item mb-3 pb-3 border-bottom';
        
        // Generar imagen (usando placeholder si no hay imagen)
        const imgSrc = item.image || item.imagen || 
                      `https://via.placeholder.com/50x50/28a745/ffffff?text=${encodeURIComponent((item.name || item.nombre || '').charAt(0))}`;
        
        // Crear HTML del item
        itemElement.innerHTML = `
            <div class="row align-items-center">
                <div class="col-3">
                    <img src="${imgSrc}" alt="${item.name || item.nombre}" class="img-fluid rounded"
                         style="width: 60px; height: 60px; object-fit: cover;"
                         onerror="this.src='https://via.placeholder.com/60x60/28a745/ffffff?text=${encodeURIComponent((item.name || item.nombre || '').charAt(0))}'">
                </div>
                <div class="col-6">
                    <h6 class="mb-1">${item.name || item.nombre}</h6>
                    <div class="d-flex align-items-center">
                        <span class="text-muted me-2">$${item.price || item.precio}</span>
                        <div class="btn-group btn-group-sm" role="group">
                            <button type="button" class="btn btn-outline-secondary decrease-btn" data-id="${item.id}">
                                <i class="bi bi-dash"></i>
                            </button>
                            <span class="btn btn-outline-secondary disabled">${item.cantidad || 1}</span>
                            <button type="button" class="btn btn-outline-secondary increase-btn" data-id="${item.id}">
                                <i class="bi bi-plus"></i>
                            </button>
                        </div>
                    </div>
                </div>
                <div class="col-3 text-end">
                    <div class="fw-bold mb-2">$${subtotal}</div>
                    <button type="button" class="btn btn-danger btn-sm delete-btn" data-id="${item.id}">
                        <i class="bi bi-trash-fill"></i>
                    </button>
                </div>
            </div>
        `;
        
        // Agregar al contenedor
        cartItems.appendChild(itemElement);
        
        // Agregar eventos directamente al crear el elemento
        const decreaseBtn = itemElement.querySelector('.decrease-btn');
        const increaseBtn = itemElement.querySelector('.increase-btn');
        const deleteBtn = itemElement.querySelector('.delete-btn');
        
        decreaseBtn.addEventListener('click', function() {
            disminuirCantidad(item.id);
        });
        
        increaseBtn.addEventListener('click', function() {
            aumentarCantidad(item.id);
        });
        
        deleteBtn.addEventListener('click', function() {
            eliminarDelCarrito(item.id);
        });
    });
    
    // Actualizar el total
    totalAmount.textContent = `$${total}`;
}

// Función para eliminar un producto del carrito
function eliminarDelCarrito(id) {
    // Encontrar el producto antes de eliminarlo
    const producto = window.carrito.find(item => item.id === id);
    const nombre = producto ? (producto.name || producto.nombre || 'Producto') : 'Producto';
    
    // Eliminar del carrito
    window.carrito = window.carrito.filter(item => item.id !== id);
    localStorage.setItem('carrito', JSON.stringify(window.carrito));
    
    // Actualizar interfaz
    actualizarCarritoModal();
    actualizarContadorCarrito();
    
    // Notificación simple
    console.log(`${nombre} eliminado del carrito`);
}

// Funciones para modificar la cantidad
function disminuirCantidad(id) {
    const index = window.carrito.findIndex(item => item.id === id);
    if (index !== -1) {
        if (window.carrito[index].cantidad > 1) {
            window.carrito[index].cantidad--;
        } else {
            eliminarDelCarrito(id);
            return;
        }
        localStorage.setItem('carrito', JSON.stringify(window.carrito));
        actualizarCarritoModal();
        actualizarContadorCarrito();
    }
}

function aumentarCantidad(id) {
    const index = window.carrito.findIndex(item => item.id === id);
    if (index !== -1) {
        window.carrito[index].cantidad = (window.carrito[index].cantidad || 1) + 1;
        localStorage.setItem('carrito', JSON.stringify(window.carrito));
        actualizarCarritoModal();
        actualizarContadorCarrito();
    }
}

// Función para enviar pedido por WhatsApp
function enviarPedidoPorWhatsApp() {
    if (window.carrito.length === 0) {
        alert('Tu pedido está vacío');
        return;
    }
    
    // Obtener datos del formulario
    const nombre = document.getElementById('inputNombre')?.value || '';
    const telefono = document.getElementById('inputTelefono')?.value || '';
    const comentarios = document.getElementById('inputComentarios')?.value || '';
    
    // Verificar si los campos requeridos están completos
    if (!nombre) {
        alert('Por favor, ingresa tu nombre');
        document.getElementById('inputNombre').focus();
        return;
    }
    
    // Obtener tipo de entrega
    const esDelivery = document.getElementById('radioDelivery')?.checked || false;
    const tipoEntrega = esDelivery ? 'Delivery' : 'Retiro en local';
    
    // Obtener dirección (solo si es delivery)
    let direccion = '';
    if (esDelivery) {
        direccion = document.getElementById('inputDireccion')?.value || '';
        if (!direccion) {
            alert('Por favor, ingresa tu dirección de entrega');
            document.getElementById('inputDireccion').focus();
            return;
        }
    }
    
    // Construir mensaje
    let mensaje = `*Nuevo Pedido desde Web*\n`;
    mensaje += `*Cliente:* ${nombre}\n`;
    if (telefono) {
        mensaje += `*Teléfono:* ${telefono}\n`;
    }
    mensaje += `*Tipo de entrega:* ${tipoEntrega}\n`;
    
    if (esDelivery) {
        mensaje += `*Dirección:* ${direccion}\n`;
    }
    
    if (comentarios) {
        mensaje += `*Comentarios:* ${comentarios}\n`;
    }
    
    mensaje += `\n*Pedido:*\n`;
    
    // Agregar items
    let total = 0;
    window.carrito.forEach(item => {
        const precio = item.price || item.precio || 0;
        const cantidad = item.cantidad || 1;
        const subtotal = precio * cantidad;
        total += subtotal;
        
        mensaje += `• ${cantidad}x ${item.name || item.nombre} - $${subtotal}\n`;
    });
    
    mensaje += `\n*Total:* $${total}`;
    
    if (esDelivery) {
        mensaje += `\n\n_Los tiempos de entrega varían según la zona. Te confirmaremos por WhatsApp._`;
    } else {
        mensaje += `\n\n_Tu pedido estará listo para retirar en aproximadamente 25 minutos._`;
    }
    
    // Codificar para URL
    const mensajeCodificado = encodeURIComponent(mensaje);
    const telefonoRestaurante = '5493517181975'; // Reemplazar con el número del restaurante
    
    // Preguntar al usuario si desea confirmar
    if (confirm('¿Confirmar tu pedido? Te redirigiremos a WhatsApp para finalizar.')) {
        // Abrir WhatsApp en una nueva ventana
        const whatsappWindow = window.open(`https://wa.me/${telefonoRestaurante}?text=${mensajeCodificado}`, '_blank');
        
        // Cuando se abre la ventana de WhatsApp, limpiamos el carrito
        if (whatsappWindow) {
            // Vaciar el carrito
            vaciarCarrito();
            
            // Mostrar mensaje de éxito
            mostrarNotificacionExito('¡Pedido enviado con éxito!');
            
            // Cerrar modal automáticamente
            const cartModal = bootstrap.Modal.getInstance(document.getElementById('cartModal'));
            if (cartModal) cartModal.hide();
        } else {
            // Si el navegador bloqueó la ventana emergente
            alert('Por favor, permite ventanas emergentes para continuar con tu pedido por WhatsApp');
        }
    }
}

// Función para vaciar el carrito completamente
function vaciarCarrito() {
    // Vaciar el array del carrito
    window.carrito = [];
    
    // Actualizar el localStorage
    localStorage.setItem('carrito', JSON.stringify(window.carrito));
    
    // Actualizar la interfaz
    actualizarContadorCarrito();
    
    // Si el modal está abierto, actualizar su contenido
    const cartItems = document.getElementById('cartItems');
    const emptyCart = document.getElementById('emptyCart');
    const cartFooter = document.getElementById('cartFooter');
    
    if (cartItems && emptyCart && cartFooter) {
        cartItems.innerHTML = '';
        cartItems.style.display = 'none';
        emptyCart.style.display = 'block';
        cartFooter.style.display = 'none';
    }
    
    // Limpiar campos del formulario
    const inputNombre = document.getElementById('inputNombre');
    const inputDireccion = document.getElementById('inputDireccion');
    const inputTelefono = document.getElementById('inputTelefono');
    const inputComentarios = document.getElementById('inputComentarios');
    
    if (inputNombre) inputNombre.value = '';
    if (inputDireccion) inputDireccion.value = '';
    if (inputTelefono) inputTelefono.value = '';
    if (inputComentarios) inputComentarios.value = '';
}

// Función para mostrar una notificación de éxito
function mostrarNotificacionExito(mensaje) {
    // Crear el toast
    const toastContainer = document.createElement('div');
    toastContainer.className = 'position-fixed bottom-0 end-0 p-3';
    toastContainer.style.zIndex = '11';
    
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
    
    // Agregar al cuerpo del documento
    document.body.appendChild(toastContainer);
    
    // Inicializar el toast
    const toast = new bootstrap.Toast(toastContainer.querySelector('.toast'));
    toast.show();
    
    // Eliminar después de cerrado
    toastContainer.addEventListener('hidden.bs.toast', function() {
        this.remove();
    });
    
    // También eliminar automáticamente después de 5 segundos
    setTimeout(() => {
        toastContainer.remove();
    }, 5000);
}