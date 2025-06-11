/**
 * Script para corregir el filtrado de platos
 */
window.addEventListener('load', function() {
    console.log("🔧 Corrigiendo funcionalidad de filtros...");
    
    // Verificar si estamos en la página de menú
    if (!document.querySelector("[data-category]")) {
        console.log("No estamos en la página de menú, no se aplicarán correcciones");
        return;
    }
    
    // Verificar que la aplicación y los platos estén disponibles
    if (!window.app || !window.app.platos || !Array.isArray(window.app.platos)) {
        console.error("❌ No hay datos de platos disponibles");
        
        // Crear platos de ejemplo para probar la funcionalidad
        if (!window.app) window.app = {};
        window.app.platos = [
            {
                id: 1, name: "Milanesa Napolitana", 
                category: "principal",
                description: "Milanesa de ternera con salsa y queso",
                price: 1800, image: "assets/img/platos/milanesa.jpg", 
                ingredients: ["Carne", "Salsa", "Queso"], 
                offer: true
            },
            {
                id: 2, name: "Ensalada César", 
                category: "entrada", 
                description: "Ensalada con pollo y aderezo césar",
                price: 1200, image: "assets/img/platos/ensalada.jpg", 
                ingredients: ["Lechuga", "Pollo", "Aderezo"], 
                offer: false
            },
            {
                id: 3, name: "Tiramisú", 
                category: "postre", 
                description: "Postre italiano clásico",
                price: 950, image: "assets/img/platos/postre.jpg", 
                ingredients: ["Cafe", "Queso mascarpone", "Cacao"], 
                offer: false
            },
            {
                id: 4, name: "Vino Malbec", 
                category: "bebida", 
                description: "Vino tinto argentino",
                price: 2200, image: "assets/img/platos/vino.jpg", 
                ingredients: ["Uvas Malbec"], 
                offer: true
            }
        ];
        console.log("✅ Datos de muestra cargados:", window.app.platos.length, "platos");
    }
    
    // Verificar las categorías de los platos
    const categoriasExistentes = [...new Set(window.app.platos.map(p => p.category))];
    console.log("📋 Categorías en los datos:", categoriasExistentes);
    
    // Verificar los botones de filtro
    const botonesCategoria = document.querySelectorAll("[data-category]");
    console.log("🔘 Botones de filtro encontrados:", botonesCategoria.length);
    
    // Comprobar si coinciden las categorías de los botones con las de los datos
    const categoriasBotones = [...botonesCategoria].map(btn => btn.dataset.category);
    console.log("📋 Categorías en los botones:", categoriasBotones);
    
    // Reemplazar todos los listeners de eventos en los botones de filtro
    botonesCategoria.forEach(btn => {
        // Remover eventos existentes
        const nuevoBtn = btn.cloneNode(true);
        btn.parentNode.replaceChild(nuevoBtn, btn);
        
        // Registrar nuevo evento
        nuevoBtn.addEventListener('click', function() {
            const categoria = this.getAttribute('data-category');
            console.log("🔍 Filtro clickeado:", categoria);
            
            // Activar visualmente este botón
            document.querySelectorAll("[data-category]").forEach(b => 
                b.classList.remove('active')
            );
            this.classList.add('active');
            
            // Aplicar el filtro
            if (categoria === 'all') {
                console.log("📋 Mostrando todos los platos");
                
                if (typeof window.mostrarMenu === 'function') {
                    window.mostrarMenu();
                } else {
                    console.error("❌ La función mostrarMenu no está disponible");
                    if (window.app && window.app.platos) {
                        const mostrarFiltrados = getMostrarPlatosFiltrados();
                        if (mostrarFiltrados) mostrarFiltrados(window.app.platos);
                    }
                }
            } else {
                console.log("🔍 Filtrando por:", categoria);
                
                // Filtrar con máxima flexibilidad para hacer coincidir las categorías
                const platosFiltrados = window.app.platos.filter(plato => {
                    if (!plato.category) return false;
                    
                    const cat1 = plato.category.toLowerCase().trim();
                    const cat2 = categoria.toLowerCase().trim();
                    
                    console.log(`Comparando: "${cat1}" con "${cat2}"`);
                    
                    return cat1 === cat2;
                });
                
                console.log(`📋 Encontrados ${platosFiltrados.length} platos de categoría ${categoria}`);
                
                // Mostrar los platos filtrados
                const mostrarFiltrados = getMostrarPlatosFiltrados();
                if (mostrarFiltrados) {
                    mostrarFiltrados(platosFiltrados);
                } else {
                    console.error("❌ No se puede mostrar los platos filtrados, la función no está disponible");
                }
            }
        });
    });
    
    // Obtener la función para mostrar platos filtrados
    function getMostrarPlatosFiltrados() {
        if (typeof window.mostrarPlatosFiltrados === 'function') {
            return window.mostrarPlatosFiltrados;
        }
        
        // Si no existe globalmente, crearla
        return function (platos) {
            const menuContainer = document.getElementById("menuCompleto");
            if (!menuContainer) {
                console.error("❌ No se encontró el contenedor del menú");
                return;
            }
            
            if (!platos || !Array.isArray(platos) || platos.length === 0) {
                menuContainer.innerHTML = `
                    <div class="col-12 text-center py-5">
                        <div class="mb-3">
                            <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-muted"><circle cx="11" cy="11" r="8"></circle><path d="m21 21-4.3-4.3"></path><path d="M8 11h6"></path></svg>
                        </div>
                        <p class="lead">No se encontraron platos para esta categoría</p>
                        <button class="btn btn-outline-success mt-3" id="resetSearch">Mostrar todos los platos</button>
                    </div>
                `;
                
                // Configurar el botón para restablecer
                const resetBtn = document.getElementById("resetSearch");
                if (resetBtn) {
                    resetBtn.addEventListener("click", function() {
                        // Activar el botón "Todos"
                        const btnTodos = document.querySelector('[data-category="all"]');
                        if (btnTodos) {
                            document.querySelectorAll("[data-category]").forEach(b => 
                                b.classList.remove('active')
                            );
                            btnTodos.classList.add('active');
                            
                            // Mostrar todos los platos
                            if (typeof window.mostrarMenu === 'function') {
                                window.mostrarMenu();
                            } else if (window.app && window.app.platos) {
                                renderizarPlatos(window.app.platos);
                            }
                        }
                    });
                }
                
                return;
            }
            
            renderizarPlatos(platos);
        };
    }
    
    // Función para renderizar platos en el contenedor
    function renderizarPlatos(platos) {
        const menuContainer = document.getElementById("menuCompleto");
        if (!menuContainer) return;
        
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
                            <p class="card-text mb-3 small">${plato.description.substring(0, 100)}${plato.description.length > 100 ? '...' : ''}</p>
                            
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
            lucide.createIcons();
        }
        
        // Agregar eventos a los botones
        document.querySelectorAll('.btn-agregar').forEach(btn => {
            btn.addEventListener('click', function() {
                const platoId = parseInt(this.getAttribute('data-plato-id'));
                if (window.app && window.app.platos) {
                    const plato = window.app.platos.find(p => p.id === platoId);
                    if (plato && window.app.agregarAlCarrito) {
                        window.app.agregarAlCarrito(plato);
                    }
                }
            });
        });
        
        document.querySelectorAll('.btn-info').forEach(btn => {
            btn.addEventListener('click', function() {
                const platoId = parseInt(this.getAttribute('data-plato-id'));
                if (window.app && window.app.platos) {
                    const plato = window.app.platos.find(p => p.id === platoId);
                    if (plato && typeof window.mostrarInfoEnModal === 'function') {
                        window.mostrarInfoEnModal(platoId);
                    }
                }
            });
        });
    }
    
    // Simular un clic en el botón "Todos" para mostrar los platos al cargar
    const btnTodos = document.querySelector('[data-category="all"]');
    if (btnTodos) {
        setTimeout(() => {
            btnTodos.click();
        }, 500);
    }
    
    console.log("✅ Correcciones de filtros aplicadas");
});