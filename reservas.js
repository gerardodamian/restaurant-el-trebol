document.addEventListener('DOMContentLoaded', function() {
    console.log('Inicializando sistema de reservas...');
    
    const formulario = document.getElementById('reservaForm');
    
    if (formulario) {
        console.log('Formulario de reservas encontrado');
        
        // Establecer la fecha mínima como hoy
        const inputFecha = document.getElementById('fecha');
        if (inputFecha) {
            const hoy = new Date();
            const fechaMinima = hoy.toISOString().split('T')[0];
            inputFecha.min = fechaMinima;
            
            // Establecer fecha por defecto (hoy)
            inputFecha.value = fechaMinima;
        }
        
        // Validación del número de teléfono
        const inputTelefono = document.getElementById('telefono');
        if (inputTelefono) {
            inputTelefono.addEventListener('input', function() {
                this.value = this.value.replace(/[^0-9+\- ]/g, '');
            });
        }
        
        formulario.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Obtener datos del formulario
            const nombre = document.getElementById('nombre').value.trim();
            const telefono = document.getElementById('telefono').value.trim();
            const email = document.getElementById('email').value.trim();
            const fecha = document.getElementById('fecha').value;
            const hora = document.getElementById('hora').value;
            const personas = document.getElementById('personas').value;
            const mensaje = document.getElementById('mensaje').value.trim();
            
            // Validación básica
            if (!nombre || !telefono || !email || !fecha || !hora || !personas) {
                mostrarAlerta('Por favor, completa todos los campos obligatorios.', 'danger');
                return;
            }
            
            // Validación de email
            if (!validarEmail(email)) {
                mostrarAlerta('Por favor, introduce un email válido.', 'danger');
                return;
            }
            
            // Formatear fecha para mejor legibilidad
            const fechaFormateada = formatearFecha(fecha);
            
            // Formatear mensaje para WhatsApp
            let mensajeWhatsapp = `🍀 *RESERVA - EL TRÉBOL* 🍀\n\n`;
            mensajeWhatsapp += `*Nombre:* ${nombre}\n`;
            mensajeWhatsapp += `*Teléfono:* ${telefono}\n`;
            mensajeWhatsapp += `*Email:* ${email}\n`;
            mensajeWhatsapp += `*Fecha:* ${fechaFormateada}\n`;
            mensajeWhatsapp += `*Hora:* ${hora}\n`;
            mensajeWhatsapp += `*Personas:* ${personas}\n`;
            
            if (mensaje) {
                mensajeWhatsapp += `\n*Solicitudes especiales:*\n${mensaje}\n`;
            }
            
            mensajeWhatsapp += `\nPor favor confirmar disponibilidad. Gracias!`;
            
            // Codificar el mensaje para URL
            const mensajeCodificado = encodeURIComponent(mensajeWhatsapp);
            
            try {
                // Abrir WhatsApp con el mensaje predeterminado
                window.open(`https://api.whatsapp.com/send?phone=5493517181975&text=${mensajeCodificado}`, '_blank');
                
                // Guardar datos del cliente en localStorage
                guardarDatosCliente({nombre, telefono, email});
                
                // Mostrar confirmación
                mostrarAlerta('¡Gracias! Tu solicitud de reserva ha sido enviada. Te contactaremos para confirmar disponibilidad.', 'success');
                
                // Opcional: resetear formulario después de un breve retraso
                setTimeout(() => {
                    formulario.reset();
                    // Restaurar la fecha
                    inputFecha.value = fechaMinima;
                }, 3000);
                
            } catch (error) {
                console.error('Error al abrir WhatsApp:', error);
                mostrarAlerta('Hubo un problema al enviar tu reserva. Por favor, intenta nuevamente o contáctanos por teléfono.', 'danger');
            }
        });
    } else {
        console.error('No se encontró el formulario de reservas');
    }
    
    // Función para mostrar alertas
    function mostrarAlerta(mensaje, tipo) {
        // Buscar contenedor existente o crearlo
        let alertContainer = document.getElementById('alertContainer');
        if (!alertContainer) {
            alertContainer = document.createElement('div');
            alertContainer.id = 'alertContainer';
            alertContainer.className = 'mt-3';
            formulario.parentNode.insertBefore(alertContainer, formulario.nextSibling);
        }
        
        // Crear alerta
        const alerta = document.createElement('div');
        alerta.className = `alert alert-${tipo} alert-dismissible fade show`;
        alerta.innerHTML = `
            ${mensaje}
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Cerrar"></button>
        `;
        
        // Mostrar alerta
        alertContainer.innerHTML = '';
        alertContainer.appendChild(alerta);
        
        // Auto ocultar después de 5 segundos
        setTimeout(() => {
            const bootstrapAlert = bootstrap.Alert.getOrCreateInstance(alerta);
            if (bootstrapAlert) bootstrapAlert.close();
        }, 5000);
    }
    
    // Función para validar email
    function validarEmail(email) {
        const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        return regex.test(email);
    }
    
    // Función para formatear fecha
    function formatearFecha(fechaISO) {
        try {
            const fecha = new Date(fechaISO);
            return fecha.toLocaleDateString('es-AR', {
                weekday: 'long',
                day: 'numeric',
                month: 'long',
                year: 'numeric'
            });
        } catch (e) {
            return fechaISO;
        }
    }
    
    // Función para guardar datos del cliente
    function guardarDatosCliente(datos) {
        try {
            localStorage.setItem('cliente_nombre', datos.nombre);
            localStorage.setItem('cliente_telefono', datos.telefono);
            localStorage.setItem('cliente_email', datos.email);
            localStorage.setItem('ultima_reserva', new Date().toISOString());
        } catch (e) {
            console.error('Error guardando datos en localStorage:', e);
        }
    }
});