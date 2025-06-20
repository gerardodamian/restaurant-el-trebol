/**
 * Script para corregir eventos duplicados - Versión corregida
 * Previene errores de replaceChild con elementos null
 */



// Función para clonar elemento de forma segura
function safeCloneElement(element) {
    if (!element || !element.parentNode) {
        console.warn("⚠️ Elemento no válido para clonar:", element);
        return null;
    }

    try {
        const newElement = element.cloneNode(true);
        element.parentNode.replaceChild(newElement, element);
        return newElement;
    } catch (error) {
        console.error("❌ Error al clonar elemento:", error);
        return null;
    }
}

// Función para resetear eventos de botones de forma segura
function resetButtonEvents() {
    

    // Resetear botones de agregar al carrito
    const botonesAgregar = document.querySelectorAll(".btn-agregar");
    

    botonesAgregar.forEach((btn, index) => {
        if (btn && btn.parentNode) {
            const newBtn = safeCloneElement(btn);
            if (newBtn) {
                // Reconfigurar evento
                newBtn.addEventListener("click", function (e) {
                    e.preventDefault();
                    e.stopPropagation();

                    const platoId = parseInt(
                        this.getAttribute("data-plato-id")
                    );
                    if (window.app && window.app.platos) {
                        const plato = window.app.platos.find(
                            (p) => p.id === platoId
                        );
                        if (
                            plato &&
                            typeof window.app.agregarAlCarrito === "function"
                        ) {
                            window.app.agregarAlCarrito(plato);
                        }
                    }
                });
                
            }
        }
    });

    // Resetear botones de información
    const botonesInfo = document.querySelectorAll(".btn-info");
    

    botonesInfo.forEach((btn, index) => {
        if (btn && btn.parentNode) {
            const newBtn = safeCloneElement(btn);
            if (newBtn) {
                // Reconfigurar evento
                newBtn.addEventListener("click", function (e) {
                    e.preventDefault();
                    e.stopPropagation();

                    const platoId = parseInt(
                        this.getAttribute("data-plato-id")
                    );
                    if (typeof window.mostrarInfoEnModal === "function") {
                        window.mostrarInfoEnModal(platoId);
                    }
                });
                
            }
        }
    });

    // Resetear botones de filtro
    const botonesFiltro = document.querySelectorAll("[data-category]");
    

    botonesFiltro.forEach((btn, index) => {
        if (btn && btn.parentNode) {
            const newBtn = safeCloneElement(btn);
            if (newBtn) {
                // Reconfigurar evento
                newBtn.addEventListener("click", function (e) {
                    e.preventDefault();
                    e.stopPropagation();

                    const category = this.getAttribute("data-category");

                    // Actualizar estado visual
                    document
                        .querySelectorAll("[data-category]")
                        .forEach((b) => {
                            b.classList.remove("active");
                        });
                    this.classList.add("active");

                    // Filtrar platos
                    if (category === "all") {
                        if (typeof window.mostrarMenu === "function") {
                            window.mostrarMenu();
                        }
                    } else {
                        if (window.app && window.app.platos) {
                            const platosFiltrados = window.app.platos.filter(
                                (plato) => {
                                    return (
                                        plato.category &&
                                        plato.category
                                            .toLowerCase()
                                            .includes(category.toLowerCase())
                                    );
                                }
                            );

                            if (
                                typeof window.mostrarPlatosFiltrados ===
                                "function"
                            ) {
                                window.mostrarPlatosFiltrados(platosFiltrados);
                            }
                        }
                    }
                });
                
            }
        }
    });
}

// Función para resetear eventos de búsqueda
function resetSearchEvents() {
    

    const searchBtn = document.getElementById("searchBtn");
    const searchInput = document.getElementById("searchInput");
    const searchModalBtn = document.getElementById("searchModalBtn");

    // Resetear botón de búsqueda principal
    if (searchBtn && searchBtn.parentNode) {
        const newSearchBtn = safeCloneElement(searchBtn);
        if (newSearchBtn) {
            newSearchBtn.addEventListener("click", function (e) {
                e.preventDefault();
                const modal = new bootstrap.Modal(
                    document.getElementById("searchModal")
                );
                modal.show();
            });
        }
    }

    // Resetear botón de búsqueda en modal
    if (searchModalBtn && searchModalBtn.parentNode) {
        const newSearchModalBtn = safeCloneElement(searchModalBtn);
        if (newSearchModalBtn) {
            newSearchModalBtn.addEventListener("click", function (e) {
                e.preventDefault();
                if (
                    searchInput &&
                    typeof window.realizarBusqueda === "function"
                ) {
                    const termino = searchInput.value.trim();
                    if (termino) {
                        window.realizarBusqueda(termino);
                        // Cerrar modal
                        const modal = bootstrap.Modal.getInstance(
                            document.getElementById("searchModal")
                        );
                        if (modal) modal.hide();
                    }
                }
            });
        }
    }

    // Resetear input de búsqueda
    if (searchInput) {
        // Remover eventos anteriores clonando
        if (searchInput.parentNode) {
            const newSearchInput = safeCloneElement(searchInput);
            if (newSearchInput) {
                newSearchInput.addEventListener("keypress", function (e) {
                    if (e.key === "Enter") {
                        e.preventDefault();
                        if (typeof window.realizarBusqueda === "function") {
                            const termino = this.value.trim();
                            if (termino) {
                                window.realizarBusqueda(termino);
                                // Cerrar modal si está abierto
                                const modal = bootstrap.Modal.getInstance(
                                    document.getElementById("searchModal")
                                );
                                if (modal) modal.hide();
                            }
                        }
                    }
                });

                // Mantener el foco en el input
                newSearchInput.focus();
            }
        }
    }
}

// Función para resetear eventos del carrito
function resetCartEvents() {
    

    const cartBtn = document.getElementById("cartBtn");
    if (cartBtn && cartBtn.parentNode) {
        const newCartBtn = safeCloneElement(cartBtn);
        if (newCartBtn) {
            newCartBtn.addEventListener("click", function (e) {
                e.preventDefault();
                const modal = new bootstrap.Modal(
                    document.getElementById("cartModal")
                );
                modal.show();
            });
        }
    }
}

// Función principal para resetear todos los eventos
function resetAllEvents() {
    try {
        resetButtonEvents();
        resetSearchEvents();
        resetCartEvents();

        // Reinitializar iconos después de clonar elementos
        if (typeof lucide !== "undefined") {
            setTimeout(() => {
                lucide.createIcons();
                
            }, 100);
        }

        
    } catch (error) {
        console.error("❌ Error al resetear eventos:", error);
    }
}

// Observer para detectar cambios en el DOM y resetear eventos
const observer = new MutationObserver(function (mutations) {
    let shouldReset = false;

    mutations.forEach(function (mutation) {
        if (mutation.type === "childList" && mutation.addedNodes.length > 0) {
            // Verificar si se agregaron elementos que necesitan eventos
            mutation.addedNodes.forEach(function (node) {
                if (node.nodeType === 1) {
                    // Element node
                    if (
                        node.classList &&
                        (node.classList.contains("btn-agregar") ||
                            node.classList.contains("btn-info") ||
                            node.hasAttribute("data-category"))
                    ) {
                        shouldReset = true;
                    }

                    // También verificar elementos hijos
                    if (
                        node.querySelector &&
                        (node.querySelector(".btn-agregar") ||
                            node.querySelector(".btn-info") ||
                            node.querySelector("[data-category]"))
                    ) {
                        shouldReset = true;
                    }
                }
            });
        }
    });

    if (shouldReset) {
        
        setTimeout(resetAllEvents, 300);
    }
});

// Inicializar cuando el DOM esté listo
if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", function () {
        setTimeout(resetAllEvents, 500);

        // Iniciar observer
        observer.observe(document.body, {
            childList: true,
            subtree: true,
        });
    });
} else {
    // El DOM ya está listo
    setTimeout(resetAllEvents, 500);

    // Iniciar observer
    observer.observe(document.body, {
        childList: true,
        subtree: true,
    });
}

// Función manual para uso en consola
window.resetEvents = resetAllEvents;


