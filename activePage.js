// Marcar la página activa en el menú de navegación
document.addEventListener('DOMContentLoaded', function() {
    // Obtener la página actual del path
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    
    // Quitar clase active de todos los enlaces
    document.querySelectorAll('.navbar-nav .nav-link').forEach(link => {
        link.classList.remove('active');
    });
    
    // Determinar qué enlace activar según la página actual
    switch(currentPage) {
        case '':
        case 'index.html':
            document.getElementById('nav-inicio')?.classList.add('active');
            break;
        case 'menu.html':
            document.getElementById('nav-menu')?.classList.add('active');
            break;
        case 'reservas.html':
            document.getElementById('nav-reservas')?.classList.add('active');
            break;
        case 'contacto.html':
            document.getElementById('nav-contacto')?.classList.add('active');
            break;
    }
});