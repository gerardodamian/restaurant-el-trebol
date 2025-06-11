// Script para incluir componentes HTML en todas las páginas
document.addEventListener('DOMContentLoaded', function() {
    // Cargar navbar en el elemento con id "navbar-container"
    const navbarContainer = document.getElementById('navbar-container');
    if (navbarContainer) {
        fetch('components/navbar.html')
            .then(response => response.text())
            .then(data => {
                navbarContainer.innerHTML = data;
                
                // Después de cargar el navbar, inicializar iconos
                if (typeof lucide !== 'undefined') {
                    lucide.createIcons();
                }
                
                // Configurar funcionalidades del navbar
                configurarNavbar();
            })
            .catch(error => {
                console.error('Error al cargar el navbar:', error);
                navbarContainer.innerHTML = `<div class="alert alert-danger">Error al cargar la barra de navegación</div>`;
            });
    }
    
    // Cargar footer en el elemento con id "footer-container"
    const footerContainer = document.getElementById('footer-container');
    if (footerContainer) {
        fetch('components/footer.html')
            .then(response => response.text())
            .then(data => {
                footerContainer.innerHTML = data;
                
                // Después de cargar el footer, inicializar iconos
                if (typeof lucide !== 'undefined') {
                    lucide.createIcons();
                }
            })
            .catch(error => {
                console.error('Error al cargar el footer:', error);
            });
    }
    
    // Cargar modal del carrito en el elemento con id "modals-container"
    const modalsContainer = document.getElementById('modals-container');
    if (modalsContainer) {
        fetch('components/modals.html')
            .then(response => response.text())
            .then(data => {
                modalsContainer.innerHTML = data;
                
                // Después de cargar los modales, inicializar iconos y configuraciones
                if (typeof lucide !== 'undefined') {
                    lucide.createIcons();
                }
                
                // Configurar funcionalidades de los modales si existe la app
                if (window.app) {
                    window.app.actualizarContadorCarrito();
                }
            })
            .catch(error => {
                console.error('Error al cargar los modales:', error);
            });
    }
});

// Función para configurar funcionalidades del navbar
function configurarNavbar() {
    // Configurar búsqueda
    const searchInput = document.getElementById('searchInput');
    const searchBtn = document.getElementById('searchBtn');
    
    if (searchInput && searchBtn) {
        searchBtn.addEventListener('click', function() {
            const searchTerm = searchInput.value.trim();
            if (searchTerm) {
                // Si estamos en la página de menú, realizar búsqueda in-situ
                if (window.location.pathname.includes('menu.html') && typeof realizarBusqueda === 'function') {
                    realizarBusqueda(searchTerm);
                } else {
                    // Redirigir a menú con parámetro de búsqueda
                    window.location.href = `menu.html?search=${encodeURIComponent(searchTerm)}`;
                }
            }
        });
        
        // Buscar al presionar Enter
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                e.preventDefault();
                searchBtn.click();
            }
        });
    }
    
    // Configurar botón del carrito
    const cartBtn = document.getElementById('cartBtn');
    if (cartBtn && window.app) {
        cartBtn.addEventListener('click', function() {
            setTimeout(() => window.app.renderCartModal(), 100);
        });
    }
    
    // Cerrar el navbar en móviles al hacer clic en un enlace
    document.querySelectorAll('.navbar-nav .nav-link').forEach(link => {
        link.addEventListener('click', function() {
            const navbarCollapse = document.getElementById('navbarContent');
            if (navbarCollapse && navbarCollapse.classList.contains('show')) {
                const navbarToggler = document.querySelector('.navbar-toggler');
                if (navbarToggler) navbarToggler.click();
            }
        });
    });
}