# Restaurante El Trébol - Sitio Web

## Descripción
Este proyecto es un sitio web completo para el Restaurante El Trébol, ubicado en Salicas, La Rioja. La plataforma permite a los clientes conocer el menú, realizar pedidos, hacer reservas y contactar directamente con el restaurante a través de WhatsApp.

## Características principales

- **Diseño responsive**: Se adapta perfectamente a dispositivos móviles, tablets y computadoras.
- **Menú digital interactivo**: Visualización de platos con imágenes, descripciones detalladas e ingredientes.
- **Carrito de compras**: Permite agregar productos y gestionar pedidos.
- **Sistema de reservas**: Formulario que envía la solicitud directamente por WhatsApp.
- **Buscador de productos**: Búsqueda rápida de platos por nombre, categoría o ingredientes.
- **Formulario de contacto**: Comunicación directa con el restaurante.
- **Integración con WhatsApp**: Sistema de mensajería directa para reservas, pedidos y consultas.
- **Geolocalización**: Integración con Google Maps para mostrar la ubicación del restaurante.

## Tecnologías utilizadas

- HTML5
- CSS3
- JavaScript (ES6+)
- Bootstrap 5.3
- Bootstrap Icons
- LocalStorage (para almacenar datos del cliente y carrito)
- Google Maps API
- WhatsApp Business API

## Estructura del proyecto

```
restaurante-el-trebol/
├── index.html              # Página principal
├── menu.html               # Página del menú completo
├── reservas.html           # Sistema de reservas
├── contacto.html           # Formulario de contacto
├── style.css               # Estilos generales
├── script.js               # Funciones compartidas
├── globalCarrito.js        # Sistema de carrito de compras
├── menu.js                 # Lógica específica del menú
├── search.js               # Funcionalidad de búsqueda
├── reservas.js             # Gestión de reservas
├── contacto.js             # Lógica del formulario de contacto
├── activePage.js           # Manejo de navegación activa
└── assets/                 # Imágenes y recursos
    └── img/
        ├── logo.jpg
        └── ...
```

## Instalación y uso

1. Clona este repositorio:
```
git clone https://github.com/tuusuario/restaurante-el-trebol.git
```

2. Abre el archivo index.html en tu navegador web preferido.

3. Para un entorno de desarrollo, se recomienda usar un servidor local como Live Server de VS Code.

## Funcionalidades implementadas

### Sistema de Menú
- Visualización de productos por categorías
- Detalles de cada plato (ingredientes, descripción, precio)
- Platos destacados en la página principal

### Sistema de Carrito
- Agregar productos al carrito
- Modificar cantidades
- Ver resumen del pedido
- Enviar pedido por WhatsApp

### Sistema de Búsqueda
- Búsqueda en tiempo real
- Resultados filtrados por relevancia
- Agregar productos desde los resultados de búsqueda

### Sistema de Reservas
- Formulario para datos personales y detalles de la reserva
- Validación de campos
- Envío directo por WhatsApp

### Sistema de Contacto
- Formulario para consultas y sugerencias
- Datos precargados para usuarios recurrentes
- Envío directo por WhatsApp

## Mejoras futuras

- Sistema de pedidos online con pago integrado
- Panel de administración para gestión de productos
- Sistema de notificaciones por email
- Versiones de la carta en diferentes idiomas
- Reservas con confirmación automática

## Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

## Contacto

Restaurante El Trébol
- 📍 Ruta Nacional 40 Salicas (frente YPF), La Rioja, Argentina
- 📞 +54 9 11 2345-6789
- 📧 info@restauranteltrebol.com

---

Desarrollado con 💚 para Restaurante El Trébol - 2025
