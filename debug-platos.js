/**
 * Script para verificar y corregir los platos
 */
document.addEventListener('DOMContentLoaded', function() {
    console.log("DEBUG PLATOS: Verificando datos...");
    
    // Si no existe app, crearla
    if (!window.app && typeof RestauranteApp === 'function') {
        window.app = new RestauranteApp();
        console.log("DEBUG PLATOS: App inicializada");
    } else if (!window.app) {
        window.app = {};
    }
    
    // Verificar si los platos están cargados
    if (!window.app.platos || !Array.isArray(window.app.platos) || window.app.platos.length === 0) {
        console.log("DEBUG PLATOS: No hay platos disponibles, cargando datos de ejemplo");
        
        // Cargar datos de ejemplo
        window.app.platos = [
            {
                id: 1,
                name: "Milanesa Napolitana",
                category: "principal",
                description: "Milanesa de ternera con salsa de tomate, jamón y queso gratinado, acompañada de puré de papas.",
                price: 1800,
                image: "assets/img/platos/milanesa.jpg",
                ingredients: ["Carne de ternera", "Pan rallado", "Huevo", "Salsa de tomate", "Jamón", "Queso", "Papas"],
                offer: true
            },
            {
                id: 2,
                name: "Ensalada César",
                category: "entrada",
                description: "Lechuga romana, crutones, queso parmesano, pollo grillado y aderezo césar.",
                price: 1200,
                image: "assets/img/platos/ensalada_cesar.jpg",
                ingredients: ["Lechuga romana", "Crutones", "Parmesano", "Pollo", "Aderezo César"],
                offer: false
            },
            {
                id: 3,
                name: "Tiramisú",
                category: "postre",
                description: "Clásico postre italiano con café, queso mascarpone y cacao.",
                price: 900,
                image: "assets/img/platos/tiramisu.jpg",
                ingredients: ["Café", "Queso mascarpone", "Bizcochos", "Cacao", "Azúcar"],
                offer: false
            },
            {
                id: 4, 
                name: "Vino Malbec",
                category: "bebida",
                description: "Vino tinto Malbec argentino, botella de 750ml.",
                price: 2200,
                image: "assets/img/platos/vino.jpg",
                ingredients: ["Uvas Malbec"],
                offer: false
            }
        ];
        
        console.log("DEBUG PLATOS: Se cargaron platos de ejemplo:", window.app.platos.length);
    } else {
        console.log(`DEBUG PLATOS: Se encontraron ${window.app.platos.length} platos ya cargados`);
    }
    
    // Mostrar las categorías disponibles
    const categorias = [...new Set(window.app.platos.map(p => p.category))];
    console.log("DEBUG PLATOS: Categorías disponibles:", categorias);
    
    // Método buscarPlatos si no existe
    if (!window.app.buscarPlatos) {
        window.app.buscarPlatos = function(termino) {
            if (!termino || !this.platos) return [];
            
            termino = termino.toLowerCase().trim();
            
            return this.platos.filter(plato => 
                plato.name.toLowerCase().includes(termino) || 
                plato.description.toLowerCase().includes(termino) || 
                plato.category.toLowerCase().includes(termino) ||
                (plato.ingredients && Array.isArray(plato.ingredients) && 
                plato.ingredients.some(i => i.toLowerCase().includes(termino)))
            );
        };
        
        console.log("DEBUG PLATOS: Método buscarPlatos agregado");
    }
    
    // Agregar el método mostrarNotificacion si no existe
    if (!window.app.mostrarNotificacion) {
        window.app.mostrarNotificacion = function(mensaje) {
            console.log("NOTIFICACIÓN:", mensaje);
            
            // Crear una notificación visual
            const notificacion = document.createElement('div');
            notificacion.className = 'position-fixed bottom-0 end-0 p-3';
            notificacion.style.zIndex = '5000';
            
            notificacion.innerHTML = `
                <div class="toast show" role="alert" aria-live="assertive" aria-atomic="true">
                    <div class="toast-header">
                        <strong class="me-auto">El Trébol</strong>
                        <small>Ahora</small>
                        <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
                    </div>
                    <div class="toast-body">
                        ${mensaje}
                    </div>
                </div>
            `;
            
            document.body.appendChild(notificacion);
            
            // Eliminar después de 3 segundos
            setTimeout(() => {
                notificacion.remove();
            }, 3000);
        };
        
        console.log("DEBUG PLATOS: Método mostrarNotificacion agregado");
    }
    
    // Agregar el método agregarAlCarrito si no existe
    if (!window.app.agregarAlCarrito) {
        window.app.carrito = window.app.carrito || [];
        
        window.app.agregarAlCarrito = function(plato) {
            if (!plato) return;
            
            // Buscar si el plato ya está en el carrito
            const platoEnCarrito = this.carrito.find(item => item.id === plato.id);
            
            if (platoEnCarrito) {
                // Si ya está, incrementar cantidad
                platoEnCarrito.cantidad++;
                console.log(`Cantidad incrementada para ${plato.name}`);
            } else {
                // Si no está, agregarlo con cantidad 1
                this.carrito.push({
                    ...plato,
                    cantidad: 1
                });
                console.log(`${plato.name} agregado al carrito`);
            }
            
            // Actualizar el carrito en localStorage
            localStorage.setItem('carrito', JSON.stringify(this.carrito));
            
            // Actualizar el contador del carrito
            const cartBadge = document.getElementById('cartBadge');
            if (cartBadge) {
                const cantidad = this.carrito.reduce((total, item) => total + item.cantidad, 0);
                cartBadge.textContent = cantidad;
                cartBadge.style.display = cantidad > 0 ? 'inline-block' : 'none';
            }
            
            // Mostrar notificación
            if (this.mostrarNotificacion) {
                this.mostrarNotificacion(`"${plato.name}" agregado al carrito.`);
            }
        };
        
        console.log("DEBUG PLATOS: Método agregarAlCarrito agregado");
    }
    
    console.log("DEBUG PLATOS: Verificación completa");
});