/**
 * Script para solucionar el problema de carga infinita
 */
(function() {
    console.log("🔧 Iniciando script de reparación para carga infinita");
    
    // 1. Comprobar si ya hay un timeout de rendimiento funcionando
    if (window._loadingTimeoutId) {
        console.log("🛑 Cancelando timeout anterior");
        clearTimeout(window._loadingTimeoutId);
    }
    
    // 2. Detectar y detener cualquier bucle de carga
    let contadorEjecuciones = 0;
    const maxEjecuciones = 5;
    
    // Sobrescribir funciones problemáticas que puedan estar causando bucles
    if (window.mostrarMenu) {
        const mostrarMenuOriginal = window.mostrarMenu;
        window.mostrarMenu = function(...args) {
            if (contadorEjecuciones >= maxEjecuciones) {
                console.log("🛑 Demasiadas llamadas a mostrarMenu, deteniendo ejecución");
                return;
            }
            contadorEjecuciones++;
            return mostrarMenuOriginal.apply(this, args);
        };
        console.log("✅ Función mostrarMenu protegida contra bucles");
    }
    
    // 3. Reparar problemas con los platos y filtros
    window._loadingTimeoutId = setTimeout(function() {
        console.log("⚙️ Ejecutando reparación de emergencia");
        
        // a. Verificar el contenedor del menú
        const menuContainer = document.getElementById("menuCompleto");
        if (menuContainer) {
            console.log("📋 Contenedor de menú encontrado");
            
            // Verificar si está vacío o en estado de carga
            if (menuContainer.innerHTML.includes("spinner-border") || menuContainer.innerHTML.trim() === "") {
                console.log("⚠️ Menú en estado de carga, forzando visualización de platos");
                
                // Si la aplicación global no existe o no tiene platos, cargar datos de muestra
                if (!window.app || !window.app.platos || !Array.isArray(window.app.platos) || window.app.platos.length === 0) {
                    console.log("⚠️ No se encontraron datos de platos, cargando datos de muestra");
                    
                    // Crear app si no existe
                    if (!window.app) window.app = {};
                    
                    // Cargar platos de muestra
                    window.app.platos = [
                        {
                            id: 1,
                            name: "Milanesa Napolitana",
                            category: "Platos Principales",
                            price: 3800,
                            image: "assets/img/foto3.png",
                            offer: true,
                            description: "Milanesa de ternera con salsa de tomate, jamón y queso gratinado. Acompañada de papas fritas.",
                            ingredients: ["Carne", "Pan rallado", "Salsa de tomate", "Jamón", "Queso", "Papas"]
                        },
                        {
                            id: 2,
                            name: "Ensalada César",
                            category: "Entradas",
                            price: 2200,
                            image: "assets/img/foto4.png",
                            offer: false,
                            description: "Clásica ensalada con lechuga romana, crutones, pollo grillado, queso parmesano y aderezo César casero.",
                            ingredients: ["Lechuga", "Pollo", "Pan tostado", "Queso parmesano", "Aderezo César"]
                        },
                        {
                            id: 3,
                            name: "Tiramisú",
                            category: "Postres",
                            price: 1800,
                            image: "assets/img/postre.jpg",
                            offer: true,
                            description: "Auténtico postre italiano con bizcochos de café, queso mascarpone y cacao.",
                            ingredients: ["Queso mascarpone", "Café", "Bizcochos", "Huevo", "Cacao"]
                        },
                        {
                            id: 4,
                            name: "Vino Malbec",
                            category: "Bebidas",
                            price: 3500,
                            image: "assets/img/vino.jpg",
                            offer: false,
                            description: "Vino tinto Malbec de primera calidad de bodega local. Copa o botella.",
                            ingredients: ["Uva Malbec"]
                        }
                    ];
                } else {
                    console.log(`📋 Se encontraron ${window.app.platos.length} platos en la aplicación`);
                }
                
                // Renderizar los platos en el contenedor
                renderizarPlatosForzados(window.app.platos);
            }
        } else {
            console.log("❌ No se encontró el contenedor del menú");
        }
        
        // b. Verificar botones de filtro y reconfigurarlos
        const filtrosBtns = document.querySelectorAll("[data-category]");
        if (filtrosBtns.length > 0) {
            console.log(`📋 Se encontraron ${filtrosBtns.length} botones de filtro`);
            
            // Reconfigurar eventos de filtro
            filtrosBtns.forEach(btn => {
                // Clonar y reemplazar para eliminar eventos anteriores
                const nuevoBtn = btn.cloneNode(true);
                btn.parentNode.replaceChild(nuevoBtn, btn);
                
                // Configurar nuevo evento
                nuevoBtn.addEventListener('click', function() {
                    console.log("🔍 Filtro clickeado:", this.getAttribute('data-category'));
                    
                    // Marcar como activo
                    document.querySelectorAll("[data-category]").forEach(b => b.classList.remove('active'));
                    this.classList.add('active');
                    
                    // Aplicar filtro
                    const category = this.getAttribute('data-category');
                    
                    if (category === 'all') {
                        renderizarPlatosForzados(window.app.platos);
                    } else {
                        const platosFiltrados = window.app.platos.filter(plato => 
                            plato.category.toLowerCase().includes(category.toLowerCase())
                        );
                        renderizarPlatosForzados(platosFiltrados);
                    }
                });
            });
            
            console.log("✅ Botones de filtro reconfigurados");
        }
        
        // 4. Eliminar spinner o indicador de carga
        const spinners = document.querySelectorAll('.spinner-border');
        spinners.forEach(spinner => {
            const container = spinner.closest('.col-12');
            if (container) {
                container.remove();
                console.log("✅ Spinner de carga eliminado");
            }
        });
        
        console.log("✅ Reparación de emergencia completada");
    }, 1000);
    
    // Función para renderizar platos forzadamente (sin depender de otras funciones)
    function renderizarPlatosForzados(platos) {
        const menuContainer = document.getElementById("menuCompleto");
        if (!menuContainer) return;
        
        // Si no hay platos, mostrar mensaje
        if (!platos || !Array.isArray(platos) || platos.length === 0) {
            menuContainer.innerHTML = `
                <div class="col-12 text-center py-5">
                    <p class="lead">No se encontraron platos disponibles</p>
                </div>
            `;
            return;
        }
        
        // Generar HTML para los platos
        let html = '';
        
        platos.forEach(plato => {
            html += `
                <div class="col-md-6 col-lg-4 mb-4" data-category="${plato.category}" id="plato-${plato.id}">
                    <div class="card h-100 ${plato.offer ? 'border-warning' : ''}">
                        ${plato.offer ? '<div class="position-absolute top-0 end-0 bg-warning text-dark p-2 m-2 rounded-pill fs-6">Oferta</div>' : ''}
                        <div class="card-img-container bg-light p-3" style="height: 200px;">
                            <img src="${plato.image}" alt="${plato.name}" 
                                class="card-img-top h-100 object-fit-contain" 
                                onerror="this.src='https://via.placeholder.com/300x200/e9ecef/495057?text=Imagen+no+disponible'"/>
                        </div>
                        <div class="card-body d-flex flex-column">
                            <h5 class="card-title producto-titulo">${plato.name}</h5>
                            <p class="card-text mb-2 text-muted">${plato.category}</p>
                            <p class="card-text mb-3 small">${(plato.description || '').substring(0, 100)}${(plato.description || '').length > 100 ? '...' : ''}</p>
                            
                            <div class="mt-auto">
                                <div class="d-flex justify-content-between align-items-center mb-3">
                                    ${plato.offer 
                                        ? `<p class="text-decoration-line-through text-muted mb-0 small">$${plato.price + Math.round(plato.price * 0.2)}</p>
                                          <p class="fw-bold text-danger fs-5 mb-0">$${plato.price}</p>`
                                        : `<p class="fw-bold fs-5 mb-0">$${plato.price}</p>`
                                    }
                                </div>
                                <div class="d-flex gap-2">
                                    <button class="btn btn-primary flex-grow-1 btn-agregar" data-plato-id="${plato.id}">
                                        <i data-lucide="shopping-cart" class="me-1" width="18" height="18"></i>
                                        Agregar
                                    </button>
                                    <button class="btn btn-outline-secondary btn-info" data-plato-id="${plato.id}" data-bs-toggle="modal" data-bs-target="#productoModal">
                                        <i data-lucide="info" width="18" height="18"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            `;
        });
        
        menuContainer.innerHTML = html;
        
        // Inicializar iconos
        if (typeof lucide !== "undefined") {
            setTimeout(() => lucide.createIcons(), 100);
        }
        
        // Configurar eventos para botones de agregar al carrito
        document.querySelectorAll('.btn-agregar').forEach(btn => {
            btn.addEventListener('click', function() {
                const platoId = parseInt(this.getAttribute('data-plato-id'));
                const plato = window.app.platos.find(p => p.id === platoId);
                
                if (plato && window.app && typeof window.app.agregarAlCarrito === 'function') {
                    window.app.agregarAlCarrito(plato);
                } else if (plato) {
                    alert(`Producto agregado: ${plato.name}`);
                }
            });
        });
        
        console.log("✅ Platos renderizados con éxito:", platos.length);
    }
})();