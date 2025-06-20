document.addEventListener('DOMContentLoaded', function() {
    
    
    const formularioContacto = document.getElementById('contactForm');
    
    if (formularioContacto) {
        
        
        // Cargar datos del cliente si existen
        const nombreGuardado = localStorage.getItem('cliente_nombre');
        const emailGuardado = localStorage.getItem('cliente_email');
        
        if (nombreGuardado) {
            document.getElementById('contactNombre').value = nombreGuardado;
        }
        
        if (emailGuardado) {
            document.getElementById('contactEmail').value = emailGuardado;
        }
        
        formularioContacto.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Obtener datos del formulario
            const nombre = document.getElementById('contactNombre').value.trim();
            const email = document.getElementById('contactEmail').value.trim();
            const asunto = document.getElementById('contactAsunto').value.trim();
            const mensaje = document.getElementById('contactMensaje').value.trim();
            
            // Validación básica
            if (!nombre || !email || !asunto || !mensaje) {
                mostrarAlerta('Por favor, completa todos los campos.', 'danger');
                return;
            }
            
            // Validación de email
            if (!validarEmail(email)) {
                mostrarAlerta('Por favor, ingresa un email válido.', 'danger');
                return;
            }
            
            // Formatear mensaje para WhatsApp
            let mensajeWhatsapp = `🍀 *CONTACTO - EL TRÉBOL* 🍀\n\n`;
            mensajeWhatsapp += `*Nombre:* ${nombre}\n`;
            mensajeWhatsapp += `*Email:* ${email}\n`;
            mensajeWhatsapp += `*Asunto:* ${asunto}\n\n`;
            mensajeWhatsapp += `*Mensaje:* ${mensaje}\n`;
            
            // Codificar el mensaje para URL
            const mensajeCodificado = encodeURIComponent(mensajeWhatsapp);
            
            try {
                // Abrir WhatsApp con el mensaje predeterminado
                window.open(`https://api.whatsapp.com/send?phone=5493517181975&text=${mensajeCodificado}`, '_blank');
                
                // Mostrar confirmación
                mostrarAlerta('¡Gracias por tu mensaje! Te responderemos a la brevedad.', 'success');
                
                // Guardar datos del cliente en localStorage
                localStorage.setItem('cliente_nombre', nombre);
                localStorage.setItem('cliente_email', email);
                
                // Reiniciar formulario después de un breve retraso
                setTimeout(() => {
                    formularioContacto.reset();
                    // Restaurar los datos guardados
                    document.getElementById('contactNombre').value = nombre;
                    document.getElementById('contactEmail').value = email;
                }, 2000);
            } catch (error) {
                console.error('Error al abrir WhatsApp:', error);
                mostrarAlerta('Hubo un problema al enviar tu mensaje. Por favor, intenta nuevamente.', 'danger');
            }
        });
    } else {
        console.error('No se encontró el formulario de contacto');
    }
    
    // Función para validar email
    function validarEmail(email) {
        const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        return regex.test(email);
    }
    
    // Función para mostrar alertas
    function mostrarAlerta(mensaje, tipo) {
        // Buscar o crear el contenedor de alertas
        let alertContainer = document.getElementById('alertContainer');
        if (!alertContainer) {
            alertContainer = document.createElement('div');
            alertContainer.id = 'alertContainer';
            alertContainer.className = 'mt-3';
            formularioContacto.parentNode.insertBefore(alertContainer, formularioContacto.nextSibling);
        }
        
        // Crear la alerta
        const alerta = document.createElement('div');
        alerta.className = `alert alert-${tipo} alert-dismissible fade show`;
        alerta.innerHTML = `
            ${mensaje}
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Cerrar"></button>
        `;
        
        // Mostrar la alerta
        alertContainer.innerHTML = '';
        alertContainer.appendChild(alerta);
        
        // Auto-cerrar después de 5 segundos
        setTimeout(() => {
            const bootstrapAlert = bootstrap.Alert.getOrCreateInstance(alerta);
            if (bootstrapAlert) bootstrapAlert.close();
        }, 5000);
    }
});