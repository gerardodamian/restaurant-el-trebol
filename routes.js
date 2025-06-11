document.addEventListener('DOMContentLoaded', function() {
    // Función para gestionar las rutas y el contenido
    function handleRoutes() {
        const pathname = window.location.pathname;
        const pageName = pathname.split('/').pop().replace('.html', '');
        
        // Actualizar la navegación activa
        const links = document.querySelectorAll('.nav-link');
        links.forEach(link => {
            link.classList.remove('active');
            link.removeAttribute('aria-current');
            
            if (link.getAttribute('href').includes(pageName) || 
                (pageName === '' && link.getAttribute('href') === 'index.html')) {
                link.classList.add('active');
                link.setAttribute('aria-current', 'page');
            }
        });
        
        // Configurar título según la página
        const pageTitles = {
            '': 'Restaurante El Trébol',
            'index': 'Restaurante El Trébol',
            'menu': 'Menú | Restaurante El Trébol',
            'reservas': 'Reservas | Restaurante El Trébol',
            'contacto': 'Contacto | Restaurante El Trébol'
        };
        
        document.title = pageTitles[pageName] || 'Restaurante El Trébol';
    }
    
    // Ejecutar al cargar
    handleRoutes();
    
    // Para una experiencia SPA completa, podrías interceptar clics en enlaces
    // y manejar la navegación con History API (esto es opcional)
    document.addEventListener('click', function(e) {
        // Si es un enlace interno
        if (e.target.tagName === 'A' && 
            e.target.getAttribute('href') && 
            e.target.getAttribute('href').startsWith('/') &&
            !e.target.getAttribute('target')) {
            
            e.preventDefault();
            const url = e.target.getAttribute('href');
            history.pushState({}, '', url);
            handleRoutes();
        }
    });
    
    // Manejar eventos del historial
    window.addEventListener('popstate', function() {
        handleRoutes();
    });
});