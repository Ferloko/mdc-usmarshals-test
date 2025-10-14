document.addEventListener('DOMContentLoaded', function() {
    // Elements
    const startMenu = document.getElementById('startMenu');
    const searchPanel = document.getElementById('searchPanel');
    const notificationsPanel = document.getElementById('notificationsPanel');
    const formModal = document.getElementById('formModal');
    const searchModal = document.getElementById('searchModal');
    const profileModal = document.getElementById('profileModal');
    const arrestModal = document.getElementById('arrestModal');
    const bycModal = document.getElementById('bycModal');
    const boloModal = document.getElementById('boloModal');
    const bolosActivosModal = document.getElementById('bolosActivosModal');
    const anotacionModal = document.getElementById('anotacionModal');
    const arrestDetailModal = document.getElementById('arrestDetailModal');
    const bycDetailModal = document.getElementById('bycDetailModal');
    const codigoPenalModal = document.getElementById('codigoPenalModal');
    const toolbarButtons = document.querySelectorAll('.toolbar-btn');
    const searchInput = document.getElementById('searchInput');
    const governmentForm = document.getElementById('governmentForm');
    const searchForm = document.getElementById('searchForm');
    const arrestForm = document.getElementById('arrestForm');
    const bycForm = document.getElementById('bycForm');
    const boloForm = document.getElementById('boloForm');
    const anotacionForm = document.getElementById('anotacionForm');
    
    // API Configuration
    const API_URL = window.CONFIG ? window.CONFIG.getApiUrl() : 'http://localhost:3000/api';
    console.log('🌐 API URL:', API_URL);

    // Check if server is running
    async function checkServerConnection() {
        try {
            console.log('🔍 Verificando conexión con el servidor...');
            const response = await fetch(`${API_URL}/fichas`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if (response.ok) {
                console.log('✅ Servidor conectado correctamente');
                return true;
            } else {
                console.warn('⚠️ Servidor respondió con error:', response.status);
                return false;
            }
        } catch (error) {
            console.warn('⚠️ No se pudo conectar con el servidor:', error.message);
            return false;
        }
    }

    // Current profile data
    let currentProfile = null;
    
    // Cargos data
    let allCargos = [];
    let selectedCargos = [];
    
    // Fichas data for autocomplete
    let allFichas = [];
    
    // Load data on page load for immediate availability
    loadFichas();
    loadCargos();
    
    // Global test function for debugging
    window.testMultiSelect = function() {
        console.log('🧪 Probando multi-select...');
        console.log('Cargos disponibles:', allCargos.length);
        console.log('Cargos seleccionados:', selectedCargos.length);
        console.log('Elementos del DOM:', {
            input: !!document.getElementById('cargosSelectInput'),
            dropdown: !!document.getElementById('cargosDropdown'),
            options: !!document.getElementById('cargosOptions')
        });
        console.log('Modal de arresto visible:', document.getElementById('arrestModal')?.classList.contains('active'));
    };
    
    // Global function to manually initialize multi-select
    window.initMultiSelect = function() {
        console.log('🔧 Inicializando multi-select manualmente...');
        initializeMultiSelect();
    };
    
    // Global function to test click manually
    window.testClick = function() {
        console.log('🖱️ Probando click manual...');
        const input = document.getElementById('cargosSelectInput');
        if (input) {
            console.log('✅ Elemento encontrado, simulando click...');
            input.click();
        } else {
            console.log('❌ Elemento no encontrado');
        }
    };
    
    // Global function to force open dropdown
    window.forceOpen = function() {
        console.log('🔧 Forzando apertura del dropdown...');
        const dropdown = document.getElementById('cargosDropdown');
        const input = document.getElementById('cargosSelectInput');
        if (dropdown && input) {
            dropdown.style.display = 'block';
            input.classList.add('active');
            console.log('✅ Dropdown forzado a abrir');
        } else {
            console.log('❌ Elementos no encontrados');
        }
    };
    
    // Notification system
    function showNotification(title, message, type = 'info', duration = 5000) {
        const notificationsPanel = document.getElementById('notificationsPanel');
        const notificationsContent = notificationsPanel.querySelector('.notifications-content');
        
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification-item ${type}`;
        
        // Set icon based on type
        let icon = 'fa-info-circle';
        if (type === 'success') icon = 'fa-check-circle';
        else if (type === 'error') icon = 'fa-exclamation-circle';
        else if (type === 'warning') icon = 'fa-exclamation-triangle';
        
        notification.innerHTML = `
            <i class="fa-solid ${icon}"></i>
            <div class="notification-text">
                <strong>${title}</strong>
                <p>${message}</p>
            </div>
            <button class="notification-close" onclick="this.parentElement.remove()">
                <i class="fa-solid fa-times"></i>
            </button>
        `;
        
        // Add to panel
        notificationsContent.appendChild(notification);
        
        // Auto remove after duration
        setTimeout(() => {
            if (notification.parentElement) {
                notification.remove();
            }
        }, duration);
        
        // Show notifications panel briefly
        notificationsPanel.classList.add('active');
        setTimeout(() => {
            notificationsPanel.classList.remove('active');
        }, 2000);
        
        console.log(`📢 Notificación ${type}: ${title} - ${message}`);
    }
    
    // Update time every second
    function updateTime() {
        const now = new Date();
        const timeElement = document.querySelector('.time');
        const dateElement = document.querySelector('.date');
        
        if (timeElement && dateElement) {
            const hours = String(now.getHours()).padStart(2, '0');
            const minutes = String(now.getMinutes()).padStart(2, '0');
            timeElement.textContent = `${hours}:${minutes}`;
            
            const day = String(now.getDate()).padStart(2, '0');
            const month = String(now.getMonth() + 1).padStart(2, '0');
            const year = now.getFullYear();
            dateElement.textContent = `${day}/${month}/${year}`;
        }
    }
    
    // Update time immediately and then every second
    updateTime();
    setInterval(updateTime, 1000);
    
    // Show welcome notification
    setTimeout(() => {
        showNotification('Sistema iniciado', 'Bienvenido al MDC U.S. Marshals Service', 'info');
    }, 1000);
    
    // Function to reset arrest modal styles
    function resetArrestModalStyles() {
        arrestModal.classList.remove('high-priority');
        arrestModal.style.removeProperty('z-index');
        arrestModal.style.removeProperty('position');
        arrestModal.style.removeProperty('top');
        arrestModal.style.removeProperty('left');
        arrestModal.style.removeProperty('right');
        arrestModal.style.removeProperty('bottom');
        arrestModal.style.removeProperty('background');
        arrestModal.style.removeProperty('display');
        arrestModal.style.removeProperty('opacity');
        arrestModal.style.removeProperty('visibility');
        arrestModal.style.removeProperty('width');
        
        // Restaurar modal de perfil a tamaño completo
        if (profileModal) {
            profileModal.style.removeProperty('width');
            profileModal.style.removeProperty('left');
            profileModal.style.removeProperty('right');
        }
        
        // Restaurar contenedor del modal de arresto
        const arrestContainer = arrestModal.querySelector('.form-container');
        if (arrestContainer) {
            arrestContainer.style.removeProperty('width');
            arrestContainer.style.removeProperty('maxWidth');
            arrestContainer.style.removeProperty('margin');
        }
    }
    
    // Close all panels
    function closeAllPanels() {
        // Close all modals with a single query
        document.querySelectorAll('.form-modal, .profile-modal, .search-modal').forEach(modal => {
            modal.classList.remove('active');
            modal.style.display = 'none';
        });
        
        // Close panels
        startMenu.classList.remove('active');
        searchPanel.classList.remove('active');
        notificationsPanel.classList.remove('active');
        
        // Reset arrest modal styles
        resetArrestModalStyles();
    }
    
    // Toggle panel
    function togglePanel(panel) {
        const isActive = panel.classList.contains('active');
        closeAllPanels();
        if (!isActive) {
            panel.classList.add('active');
        }
    }
    
    // Setup toolbar buttons
    setupToolbarButtons();
    
    // Close buttons
    document.getElementById('closeSearch')?.addEventListener('click', function(e) {
        e.stopPropagation();
        searchPanel.classList.remove('active');
    });
    
    document.getElementById('closeNotifications')?.addEventListener('click', function(e) {
        e.stopPropagation();
        notificationsPanel.classList.remove('active');
    });
    
    document.getElementById('closeFormModal')?.addEventListener('click', function(e) {
        e.stopPropagation();
        formModal.classList.remove('active');
        governmentForm.reset();
    });
    
    document.getElementById('closeSearchModal')?.addEventListener('click', function(e) {
        e.stopPropagation();
        searchModal.classList.remove('active');
        searchForm.reset();
        document.getElementById('searchResults').innerHTML = '';
    });
    
    document.getElementById('closeProfileModal')?.addEventListener('click', function(e) {
        e.stopPropagation();
        profileModal.classList.remove('active');
    });
    
    document.getElementById('closeArrestModal')?.addEventListener('click', function(e) {
        e.stopPropagation();
        arrestModal.classList.remove('active');
        resetArrestModalStyles();
        // Restaurar modal de perfil si había uno abierto
        if (profileModal && currentProfile) {
            profileModal.style.display = '';
            profileModal.classList.add('active');
        }
        arrestForm.reset();
        // Clear selected cargos
        selectedCargos = [];
        updateSelectedCargosDisplay();
        updateMultiSelectPlaceholder();
    });
    
    document.getElementById('closeByCModal')?.addEventListener('click', function(e) {
        e.stopPropagation();
        bycModal.classList.remove('active');
        bycForm.reset();
    });
    
    document.getElementById('closeBoloModal')?.addEventListener('click', function(e) {
        e.stopPropagation();
        boloModal.classList.remove('active');
        boloForm.reset();
    });
    
    document.getElementById('closeBolosActivosModal')?.addEventListener('click', function(e) {
        e.stopPropagation();
        bolosActivosModal.classList.remove('active');
    });
    
    document.getElementById('closeAnotacionModal')?.addEventListener('click', function(e) {
        e.stopPropagation();
        anotacionModal.classList.remove('active');
        anotacionForm.reset();
    });
    
    document.getElementById('closeArrestDetailModal')?.addEventListener('click', function(e) {
        e.stopPropagation();
        arrestDetailModal.classList.remove('active');
    });
    
    document.getElementById('closeBycDetailModal')?.addEventListener('click', function(e) {
        e.stopPropagation();
        bycDetailModal.classList.remove('active');
    });
    
    document.getElementById('closeCodigoPenalModal')?.addEventListener('click', function(e) {
        e.stopPropagation();
        codigoPenalModal.classList.remove('active');
    });
    
    
    // Menu items click handlers
    const menuItems = document.querySelectorAll('.menu-item-large');
    menuItems.forEach(item => {
        item.addEventListener('click', function() {
            const text = this.querySelector('span').textContent;
            console.log(`Abriendo: ${text}`);
            
            // Si es "Añadir ficha gubernamental", abrir el formulario
            if (text.includes('Añadir ficha')) {
                closeAllPanels();
                formModal.classList.add('active');
            } else if (text.includes('Buscar ficha')) {
                closeAllPanels();
                searchModal.classList.add('active');
            } else if (text.includes('Crear reporte de arresto')) {
                closeAllPanels();
                arrestModal.classList.add('active');
                // Clear arrest form first
                arrestForm.reset();
                // Set current date and time
                const now = new Date();
                document.getElementById('fechaArresto').value = now.toISOString().split('T')[0];
                document.getElementById('horaArresto').value = now.toTimeString().split(' ')[0].substring(0, 5);
                // Clear personal info fields when opening from menu (not from profile)
                document.getElementById('arrestNombre').value = '';
                document.getElementById('arrestIdentificacion').value = '';
                // Load cargos and initialize multi-select
                if (allCargos.length === 0) {
                    console.log('🔄 Cargando cargos para multi-select...');
                    loadCargos().then(() => {
                        console.log('✅ Cargos cargados, inicializando multi-select...');
                        setTimeout(() => {
                            console.log('🔧 Inicializando multi-select después de cargar cargos...');
                            initializeMultiSelect();
                        }, 500);
                    });
                } else {
                    console.log('✅ Cargos ya cargados, inicializando multi-select...');
                    setTimeout(() => {
                        console.log('🔧 Inicializando multi-select con cargos existentes...');
                        initializeMultiSelect();
                    }, 500);
                }
                // Setup autocomplete for arrest form
                if (!allFichas || allFichas.length === 0) {
                    loadFichas().then(() => {
                        setupArrestAutocomplete();
                    }).catch(error => {
                        console.error('Error loading fichas for autocomplete:', error);
                        setupArrestAutocomplete();
                    });
                } else {
                    setupArrestAutocomplete();
                }
            } else if (text.includes('Crear ByC')) {
                closeAllPanels();
                bycModal.classList.add('active');
                // Clear ByC form first
                bycForm.reset();
                // Clear personal info fields when opening from menu (not from profile)
                document.getElementById('bycNombreCompleto').value = '';
                document.getElementById('bycIdentificacion').value = '';
                document.getElementById('bycDescripcionHechos').value = '';
                // Setup autocomplete for ByC form
                if (allFichas.length === 0) {
                    loadFichas().then(() => {
                        setupByCAutocomplete();
                    });
                } else {
                    setupByCAutocomplete();
                }
            } else if (text.includes('Crear anotación')) {
                console.log('📝 Abriendo formulario de crear anotación...');
                closeAllPanels();
                if (anotacionModal) {
                    anotacionModal.classList.add('active');
                    console.log('✅ Modal de anotación abierto');
                } else {
                    console.error('❌ Modal de anotación no encontrado');
                }
            } else if (text.includes('Crear BOLO')) {
                showNotification('Funcionalidad en desarrollo', 'Próximamente podrás crear alertas BOLO (Be On the Lookout) para vehículos y personas sospechosas.', 'warning');
            } else {
                showNotification('Funcionalidad', `Abriendo: ${text}`, 'info');
                closeAllPanels();
            }
        });
    });
    
    // Menu button handler
    document.getElementById('menuBtn')?.addEventListener('click', function(e) {
        e.stopPropagation();
        console.log('Botón de menú clickeado');
    });
    
    // Search items click handlers
    const searchItems = document.querySelectorAll('.search-item');
    searchItems.forEach(item => {
        item.addEventListener('click', function() {
            const text = this.querySelector('span').textContent;
            console.log(`Abriendo: ${text}`);
            
            if (text.includes('Crear ficha')) {
                closeAllPanels();
                formModal.classList.add('active');
            } else if (text.includes('Configuración')) {
                showNotification('Configuración', 'Abriendo Configuración', 'info');
                closeAllPanels();
            } else {
                showNotification('Funcionalidad', `Abriendo: ${text}`, 'info');
                closeAllPanels();
            }
        });
    });
    
    // Search input functionality
    searchInput?.addEventListener('input', function() {
        const query = this.value.toLowerCase();
        console.log(`Buscando: ${query}`);
        // Here you would implement actual search functionality
    });
    
    // Close panels when clicking outside
    document.addEventListener('click', function(e) {
        if (!startMenu.contains(e.target) && 
            !searchPanel.contains(e.target) && 
            !notificationsPanel.contains(e.target)) {
            closeAllPanels();
        }
    });
    
    // Prevent closing when clicking inside panels
    startMenu.addEventListener('click', function(e) {
        e.stopPropagation();
    });
    
    searchPanel.addEventListener('click', function(e) {
        e.stopPropagation();
    });
    
    notificationsPanel.addEventListener('click', function(e) {
        e.stopPropagation();
    });
    
    // Keyboard shortcuts
    document.addEventListener('keydown', function(e) {
        // Escape to close all panels
        if (e.key === 'Escape') {
            closeAllPanels();
        }
        // Ctrl/Cmd + S for search
        if ((e.ctrlKey || e.metaKey) && e.key === 's') {
            e.preventDefault();
            togglePanel(searchPanel);
            setTimeout(() => searchInput.focus(), 100);
        }
    });
    
    // Form submission handler
    governmentForm?.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        // Obtener datos del formulario
        const formData = {
            nombre: document.getElementById('nombre').value,
            apellido: document.getElementById('apellido').value,
            identificacion: document.getElementById('identificacion').value,
            telefono: document.getElementById('telefono').value,
            edad: parseInt(document.getElementById('edad').value),
            genero: document.getElementById('genero').value,
            residencia: document.getElementById('residencia').value,
            raza: document.getElementById('raza').value
        };
        
        console.log('Enviando datos:', formData);
        
        try {
            // Check server connection first
            const isConnected = await checkServerConnection();
            if (!isConnected) {
                throw new Error('No se puede conectar con el servidor');
            }

            // Deshabilitar botón de envío
            const submitBtn = this.querySelector('.submit-btn');
            const originalText = submitBtn.innerHTML;
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i><span>Enviando...</span>';

            console.log('📤 Enviando datos de ficha al servidor:', formData);
            console.log('🌐 URL del servidor:', API_URL);
            
            // Enviar datos al servidor
            const response = await fetch(`${API_URL}/fichas`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            console.log('📥 Respuesta del servidor recibida:', response.status, response.statusText);

            if (!response.ok) {
                throw new Error(`Error HTTP ${response.status}: ${response.statusText}`);
            }
            
            const result = await response.json();
            console.log('📄 Datos de respuesta:', result);
            
            // Restaurar botón
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalText;
            
            if (result.success) {
                console.log('✅ Ficha creada exitosamente:', result.data);
                showNotification('Ficha creada exitosamente', `Nombre: ${formData.nombre} ${formData.apellido}\nIdentificación: ${formData.identificacion}`, 'success');
                governmentForm.reset();
                formModal.classList.remove('active');
                
                // Recargar fichas para autocompletado
                loadFichas();
            } else {
                console.error('❌ Error del servidor:', result.message);
                showNotification('Error', result.message || 'Error desconocido del servidor', 'error');
            }
        } catch (error) {
            console.error('❌ Error detallado:', error);
            console.error('❌ Error al enviar el formulario:', error.message);
            
            // Mostrar error más detallado
            let errorMsg = 'Error de conexión.\n\n';
            errorMsg += 'Detalles: ' + error.message + '\n\n';
            errorMsg += 'Verifica:\n';
            errorMsg += '1. El servidor está corriendo (npm start en carpeta server)\n';
            errorMsg += '2. El servidor está en http://localhost:3000\n';
            errorMsg += '3. No hay problemas de CORS';
            errorMsg += '4. El endpoint /api/fichas existe';
            
            showNotification('Error de conexión', errorMsg, 'error', 8000);
            
            // Restaurar botón
            const submitBtn = this.querySelector('.submit-btn');
            submitBtn.disabled = false;
            submitBtn.innerHTML = '<i class="fa-solid fa-paper-plane"></i><span>Enviar</span>';
        }
    });
    
    // Arrest form submission handler
    arrestForm?.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        // Validar que se hayan seleccionado cargos
        if (selectedCargos.length === 0) {
            showNotification('Validación requerida', 'Debes seleccionar al menos un cargo para crear el reporte de arresto.', 'warning');
            return;
        }
        
        // Validar campos requeridos
        const requiredFields = [
            { id: 'arrestNombre', name: 'Nombre del sospechoso' },
            { id: 'arrestIdentificacion', name: 'Identificación del sospechoso' },
            { id: 'fechaArresto', name: 'Fecha del arresto' },
            { id: 'horaArresto', name: 'Hora del arresto' },
            { id: 'ubicacionArresto', name: 'Ubicación del arresto' },
            { id: 'oficialNombre', name: 'Nombre del oficial' },
            { id: 'oficialPlaca', name: 'Placa del oficial' },
            { id: 'descripcionIncidente', name: 'Narrativa de arresto' }
        ];
        
        for (const field of requiredFields) {
            const element = document.getElementById(field.id);
            if (!element || !element.value.trim()) {
                showNotification('Campo requerido', `El campo "${field.name}" es requerido.`, 'warning');
                element?.focus();
                return;
            }
        }
        
        // Obtener datos del formulario de arresto
        const nombreCompleto = document.getElementById('arrestNombre').value.split(' ');
        const formData = {
            nombre: nombreCompleto[0] || '',
            apellido: nombreCompleto.slice(1).join(' ') || 'Sin apellido',
            identificacion: document.getElementById('arrestIdentificacion').value,
            edad: 18, // Valor por defecto ya que no tenemos este campo
            fechaArresto: document.getElementById('fechaArresto').value,
            horaArresto: document.getElementById('horaArresto').value,
            ubicacion: document.getElementById('ubicacionArresto').value,
            codigoArresto: document.getElementById('callsign').value || 'N/A', // Usar callsign como código
            oficialNombre: document.getElementById('oficialNombre').value,
            oficialPlaca: document.getElementById('oficialPlaca').value,
            departamento: 'LSPD', // Valor por defecto
            cargos: selectedCargos.map(cargo => ({
                cargoId: cargo._id,
                codigo: cargo.codigo,
                descripcion: cargo.descripcion
            })),
            descripcion: document.getElementById('descripcionIncidente').value,
            soporteEvidencia: document.getElementById('soporteEvidencia').value || ''
        };
        
        console.log('Enviando datos de arresto:', formData);
        
        try {
            // Deshabilitar botón de envío
            const submitBtn = this.querySelector('.submit-btn');
            const originalText = submitBtn.innerHTML;
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i><span>Creando reporte...</span>';
            
            // Enviar datos al servidor
            const response = await fetch(`${API_URL}/arrestos`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });
            
            const result = await response.json();
            
            // Restaurar botón
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalText;
            
            if (result.success) {
                const cargosTexto = selectedCargos.map(c => c.codigo).join(', ');
                showNotification('Reporte de arresto creado', `Arrestado: ${formData.nombre} ${formData.apellido}\nCódigo: ${formData.codigoArresto}\nCargos: ${cargosTexto}\nOficial: ${formData.oficialNombre}`, 'success');
                arrestForm.reset();
                arrestModal.classList.remove('active');
                resetArrestModalStyles();
                // Restaurar modal de perfil si había uno abierto
                if (profileModal && currentProfile) {
                    profileModal.style.removeProperty('visibility');
                    profileModal.style.removeProperty('opacity');
                    profileModal.style.removeProperty('z-index');
                    profileModal.classList.add('active');
                }
                // Clear selected cargos
                selectedCargos = [];
                updateSelectedCargosDisplay();
                updateMultiSelectPlaceholder();
                console.log('Reporte de arresto guardado:', result.data);
                
                // If we have a current profile open and the arrest is for the same person, reload the data
                if (currentProfile && currentProfile.identificacion === formData.identificacion) {
                    loadArrestos(currentProfile.identificacion);
                    loadProfileStats(currentProfile.identificacion);
                }
            } else {
                showNotification('Error', result.message, 'error');
                console.error('Error del servidor:', result);
            }
        } catch (error) {
            console.error('Error detallado:', error);
            console.error('Error al enviar el reporte de arresto:', error.message);
            
            // Mostrar error más detallado
            let errorMsg = 'Error de conexión.\n\n';
            errorMsg += 'Detalles: ' + error.message + '\n\n';
            errorMsg += 'Verifica:\n';
            errorMsg += '1. El servidor está corriendo (npm start en carpeta server)\n';
            errorMsg += '2. El servidor está en http://localhost:3000\n';
            errorMsg += '3. El endpoint /api/arrestos existe';
            
            showNotification('Error de conexión', errorMsg, 'error', 8000);
            
            // Restaurar botón
            const submitBtn = this.querySelector('.submit-btn');
            submitBtn.disabled = false;
            submitBtn.innerHTML = '<i class="fa-solid fa-handcuffs"></i><span>Crear reporte de arresto</span>';
        }
    });
    
    // BOLO form submission handler
    boloForm?.addEventListener('submit', async function(e) {
        e.preventDefault();

        // Validar campos requeridos
        const requiredFields = [
            { id: 'boloTipo', name: 'Tipo' },
            { id: 'boloUbicacion', name: 'Última ubicación' },
            { id: 'boloDescripcion', name: 'Descripción' },
            { id: 'boloFecha', name: 'Fecha' },
            { id: 'boloTiempo', name: 'Tiempo' },
            { id: 'boloCallsign', name: 'Callsign' },
            { id: 'boloOficialNombre', name: 'Nombre del oficial' },
            { id: 'boloOficialPlaca', name: 'Placa del oficial' },
            { id: 'boloDepartamento', name: 'Departamento' }
        ];

        for (const field of requiredFields) {
            const element = document.getElementById(field.id);
            if (!element || !element.value.trim()) {
                showNotification('Campo requerido', `El campo "${field.name}" es requerido.`, 'warning');
                element?.focus();
                return;
            }
        }

        // Obtener datos del formulario de BOLO
        const formData = {
            tipo: document.getElementById('boloTipo').value,
            genero: document.getElementById('boloGenero').value || '',
            raza: document.getElementById('boloRaza').value || '',
            ubicacion: document.getElementById('boloUbicacion').value,
            descripcion: document.getElementById('boloDescripcion').value,
            fecha: document.getElementById('boloFecha').value,
            tiempo: document.getElementById('boloTiempo').value,
            callsign: document.getElementById('boloCallsign').value,
            oficialNombre: document.getElementById('boloOficialNombre').value,
            oficialPlaca: document.getElementById('boloOficialPlaca').value,
            departamento: document.getElementById('boloDepartamento').value,
            estado: 'Activo',
            fechaCreacion: new Date(),
            fechaExpiracion: new Date(Date.now() + (12 * 60 * 60 * 1000)) // 12 horas
        };

        console.log('Enviando datos de BOLO:', formData);

        try {
            // Check server connection first
            const isConnected = await checkServerConnection();
            if (!isConnected) {
                throw new Error('No se puede conectar con el servidor');
            }

            // Deshabilitar botón de envío
            const submitBtn = this.querySelector('.submit-btn');
            const originalText = submitBtn.innerHTML;
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i><span>Creando BOLO...</span>';

            // Enviar datos al servidor
            const response = await fetch(`${API_URL}/bolos`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            if (!response.ok) {
                throw new Error(`Error HTTP ${response.status}: ${response.statusText}`);
            }

            const result = await response.json();

            // Restaurar botón
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalText;

            if (result.success) {
                showNotification('BOLO creado exitosamente', `${formData.tipo.toUpperCase()}\nUbicación: ${formData.ubicacion}\nOficial: ${formData.oficialNombre}\nDuración: 12 horas`, 'success');
                boloForm.reset();
                boloModal.classList.remove('active');

                // Recargar BOLOs activos
                loadActiveBolos();
            } else {
                showNotification('Error', result.message || 'Error desconocido del servidor', 'error');
            }
        } catch (error) {
            console.error('Error al enviar el formulario de BOLO:', error.message);

            let errorMsg = 'Error de conexión.\n\n';
            errorMsg += 'Detalles: ' + error.message + '\n\n';
            errorMsg += 'Verifica:\n';
            errorMsg += '1. El servidor está corriendo (npm start en carpeta server)\n';
            errorMsg += '2. El servidor está en http://localhost:3000\n';
            errorMsg += '3. El endpoint /api/bolos existe';

            showNotification('Error de conexión', errorMsg, 'error', 8000);

            // Restaurar botón
            const submitBtn = this.querySelector('.submit-btn');
            submitBtn.disabled = false;
            submitBtn.innerHTML = '<i class="fa-solid fa-bullhorn"></i><span>Crear BOLO</span>';
        }
    });
    
    // ByC form submission handler
    bycForm?.addEventListener('submit', async function(e) {
        e.preventDefault();

        console.log('ByC form submitted');

        // Get form data
        const nombreCompleto = document.getElementById('bycNombreCompleto').value.trim();
        const identificacion = document.getElementById('bycIdentificacion').value.trim();
        const descripcionHechos = document.getElementById('bycDescripcionHechos').value.trim();

        // Validate required fields
        if (!nombreCompleto || !identificacion || !descripcionHechos) {
            showNotification('Campos requeridos', 'Todos los campos son requeridos:\n- Nombre completo del sospechoso\n- Identificación\n- Descripción de los hechos', 'warning');
            return;
        }

        const formData = {
            nombreCompleto: nombreCompleto,
            identificacion: identificacion,
            descripcionHechos: descripcionHechos,
            estado: 'Activo',
            fechaCreacion: new Date(),
            fechaActualizacion: new Date()
        };

        console.log('Sending ByC data:', formData);

        try {
            // Disable submit button
            const submitBtn = this.querySelector('.submit-btn');
            const originalText = submitBtn.innerHTML;
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i><span>Generando...</span>';

            // Send data to server
            const response = await fetch(`${API_URL}/byc`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            const result = await response.json();
            console.log('Server response:', result);

            // Restore button
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalText;

            if (response.ok && result.success) {
                showNotification('Búsqueda y captura generada', `Sospechoso: ${formData.nombreCompleto}\nID: ${formData.identificacion}\nEstado: ${formData.estado}`, 'success');

                // Reset form
                bycForm.reset();

                // Close modal
                bycModal.classList.remove('active');

                console.log('ByC saved:', result.data);

                // Reload ByC data if profile is open
                if (currentProfile && currentProfile.identificacion === formData.identificacion) {
                    loadByC(currentProfile.identificacion);
                    loadProfileStats(currentProfile.identificacion);
                }
            } else {
                const errorMessage = result.message || 'Error desconocido del servidor';
                showNotification('Error al generar ByC', errorMessage, 'error');
                console.error('Server error:', result);
            }
        } catch (error) {
            console.error('Network error:', error);

            // Restore button
            const submitBtn = this.querySelector('.submit-btn');
            submitBtn.disabled = false;
            submitBtn.innerHTML = '<i class="fa-solid fa-paper-plane"></i><span>Generar</span>';

            showNotification('Error de conexión', `Error al generar la búsqueda y captura:\n\n${error.message}\n\nVerifica que el servidor esté corriendo en http://localhost:3000`, 'error', 8000);
        }
    });
    
    // Anotacion form submission handler
    anotacionForm?.addEventListener('submit', async function(e) {
        e.preventDefault();

        // Check if we're in edit mode
        const isEditMode = this.getAttribute('data-edit-mode') === 'true';
        const anotacionId = this.getAttribute('data-anotacion-id');

        const formData = {
            nombre: document.getElementById('anotacionNombre').value,
            apellido: document.getElementById('anotacionApellido').value,
            identificacion: document.getElementById('anotacionIdentificacion').value,
            titulo: document.getElementById('anotacionTitulo').value,
            contenido: document.getElementById('anotacionContenido').value,
            categoria: document.getElementById('anotacionCategoria').value,
            oficialNombre: document.getElementById('anotacionOficialNombre').value,
            oficialPlaca: document.getElementById('anotacionOficialPlaca').value,
            departamento: document.getElementById('anotacionDepartamento').value
        };

        console.log('Enviando datos de anotación:', formData);

        try {
            const submitBtn = this.querySelector('.submit-btn');
            const originalText = submitBtn.innerHTML;

            if (isEditMode) {
                submitBtn.disabled = true;
                submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i><span>Guardando cambios...</span>';

                const response = await fetch(`${API_URL}/anotaciones/${anotacionId}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(formData)
                });

                const result = await response.json();

                submitBtn.disabled = false;
                submitBtn.innerHTML = originalText;

                if (result.success) {
                    showNotification('Anotación actualizada', `Título: ${formData.titulo}\nCategoría: ${formData.categoria}`, 'success');
                    anotacionForm.reset();
                    anotacionModal.classList.remove('active');

                    // Remove edit mode attributes
                    this.removeAttribute('data-edit-mode');
                    this.removeAttribute('data-anotacion-id');

                    // Reload annotations if profile is open
                    if (currentProfile) {
                        loadAnotaciones(currentProfile.identificacion);
                    }
                } else {
                    showNotification('Error', result.message, 'error');
                }
            } else {
                submitBtn.disabled = true;
                submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i><span>Creando anotación...</span>';

                const response = await fetch(`${API_URL}/anotaciones`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(formData)
                });

                const result = await response.json();

                submitBtn.disabled = false;
                submitBtn.innerHTML = originalText;

                if (result.success) {
                    showNotification('Anotación creada exitosamente', `Persona: ${formData.nombre} ${formData.apellido}\nTítulo: ${formData.titulo}\nCategoría: ${formData.categoria}`, 'success');
                    anotacionForm.reset();
                    anotacionModal.classList.remove('active');
                    console.log('Anotación guardada:', result.data);

                    // Reload annotations if profile is open
                    if (currentProfile) {
                        loadAnotaciones(currentProfile.identificacion);
                    }
                } else {
                    showNotification('Error', result.message, 'error');
                    console.error('Error del servidor:', result);
                }
            }
        } catch (error) {
            console.error('Error al enviar la anotación:', error.message);
            showNotification('Error de conexión', 'Error de conexión al crear/actualizar la anotación.', 'error');

            const submitBtn = this.querySelector('.submit-btn');
            submitBtn.disabled = false;
            submitBtn.innerHTML = '<i class="fa-solid fa-sticky-note"></i><span>' + (isEditMode ? 'Guardar Cambios' : 'Crear Anotación') + '</span>';
        }
    });
    
    // Prevent form modal from closing when clicking inside
    formModal?.addEventListener('click', function(e) {
        e.stopPropagation(); // Prevent closing when clicking inside
    });
    
    document.querySelector('.form-container')?.addEventListener('click', function(e) {
        e.stopPropagation();
    });
    
    // Prevent arrest modal from closing when clicking inside
    arrestModal?.addEventListener('click', function(e) {
        e.stopPropagation(); // Prevent closing when clicking inside
    });
    
    // REMOVE click-outside-to-close functionality - modals only close with X button
    bycModal?.addEventListener('click', function(e) {
        e.stopPropagation(); // Prevent closing when clicking inside
    });
    
    anotacionModal?.addEventListener('click', function(e) {
        e.stopPropagation(); // Prevent closing when clicking inside
    });
    
    arrestDetailModal?.addEventListener('click', function(e) {
        e.stopPropagation(); // Prevent closing when clicking inside
    });
    
    bycDetailModal?.addEventListener('click', function(e) {
        e.stopPropagation(); // Prevent closing when clicking inside
    });
    
    codigoPenalModal?.addEventListener('click', function(e) {
        e.stopPropagation(); // Prevent closing when clicking inside
    });
    
    // Prevent modal content from closing when clicking inside
    document.querySelectorAll('.form-container').forEach(container => {
        container.addEventListener('click', function(e) {
            e.stopPropagation();
        });
    });
    
    // Multi-select functionality for cargos
    async function loadCargos() {
        try {
            console.log('🔄 Cargando cargos desde servidor...');
            const response = await fetch(`${API_URL}/cargos`);
            const result = await response.json();
            if (result.success) {
                allCargos = result.data;
                console.log(`✅ Cargos cargados: ${allCargos.length} cargos encontrados`);
                renderCargosOptions();
            } else {
                console.error('❌ Error del servidor al cargar cargos:', result.message);
                loadCargosOffline();
            }
        } catch (error) {
            console.warn('⚠️ Servidor no disponible, cargando cargos de ejemplo...');
            console.error('Detalles del error:', error);
            loadCargosOffline();
        }
    }
    
    // Load cargos from local storage or use sample data
    function loadCargosOffline() {
        try {
            // Try to load from localStorage first
            const savedCargos = localStorage.getItem('mdc_cargos');
            if (savedCargos) {
                allCargos = JSON.parse(savedCargos);
                console.log(`📱 Cargos cargados desde localStorage: ${allCargos.length} cargos`);
            } else {
                // Use sample data
                allCargos = [
                    {
                        _id: '1',
                        codigo: 'Art. 1.1',
                        descripcion: 'Exceso de velocidad',
                        categoria: 'infraccion'
                    },
                    {
                        _id: '2',
                        codigo: 'Art. 1.2',
                        descripcion: 'Conducir sin licencia',
                        categoria: 'misdemeanor'
                    },
                    {
                        _id: '3',
                        codigo: 'Art. 2.1',
                        descripcion: 'Robo simple',
                        categoria: 'felonia'
                    },
                    {
                        _id: '4',
                        codigo: 'Art. 2.2',
                        descripcion: 'Robo agravado',
                        categoria: 'felonia'
                    },
                    {
                        _id: '5',
                        codigo: 'Art. 3.1',
                        descripcion: 'Alteración del orden público',
                        categoria: 'misdemeanor'
                    },
                    {
                        _id: '6',
                        codigo: 'Art. 4.1',
                        descripcion: 'Homicidio',
                        categoria: 'felonia'
                    },
                    {
                        _id: '7',
                        codigo: 'Art. 4.2',
                        descripcion: 'Lesiones graves',
                        categoria: 'felonia'
                    },
                    {
                        _id: '8',
                        codigo: 'Art. 5.1',
                        descripcion: 'Violencia doméstica',
                        categoria: 'felonia'
                    },
                    {
                        _id: '9',
                        codigo: 'Art. 6.1',
                        descripcion: 'Tráfico de drogas',
                        categoria: 'felonia'
                    },
                    {
                        _id: '10',
                        codigo: 'Art. 7.1',
                        descripcion: 'Corrupción de funcionario',
                        categoria: 'felonia'
                    }
                ];
                console.log(`📋 Usando cargos de ejemplo: ${allCargos.length} cargos`);
            }
            renderCargosOptions();
        } catch (error) {
            console.error('❌ Error cargando cargos offline:', error);
            allCargos = [];
        }
    }
    
    function renderCargosOptions(filter = '') {
        console.log('🎨 Renderizando opciones de cargos...', { filter, totalCargos: allCargos.length });
        const cargosOptions = document.getElementById('cargosOptions');
        if (!cargosOptions) {
            console.error('❌ Elemento cargosOptions no encontrado');
            return;
        }
        
        const filteredCargos = allCargos.filter(cargo => 
            cargo.codigo.toLowerCase().includes(filter.toLowerCase()) ||
            cargo.descripcion.toLowerCase().includes(filter.toLowerCase())
        );
        
        console.log('📋 Cargos filtrados:', filteredCargos.length);
        
        if (filteredCargos.length === 0) {
            cargosOptions.innerHTML = '<div class="multi-select-option" style="color: #999; text-align: center; padding: 20px;">No se encontraron cargos</div>';
            return;
        }
        
        cargosOptions.innerHTML = filteredCargos.map(cargo => `
            <div class="multi-select-option ${selectedCargos.find(c => c._id === cargo._id) ? 'selected' : ''}" 
                 data-cargo-id="${cargo._id}">
                <div class="multi-select-checkbox ${selectedCargos.find(c => c._id === cargo._id) ? 'checked' : ''}"></div>
                <div class="multi-select-option-text">${cargo.descripcion}</div>
                <div class="multi-select-option-code">${cargo.codigo}</div>
            </div>
        `).join('');
        
        // Add click handlers
        cargosOptions.querySelectorAll('.multi-select-option').forEach(option => {
            option.addEventListener('click', function(e) {
                e.stopPropagation();
                const cargoId = this.getAttribute('data-cargo-id');
                toggleCargo(cargoId);
            });
        });
    }
    
    function toggleCargo(cargoId) {
        console.log('🔄 Toggleando cargo:', cargoId);
        const cargo = allCargos.find(c => c._id === cargoId);
        if (!cargo) {
            console.error('❌ Cargo no encontrado:', cargoId);
            return;
        }
        
        const existingIndex = selectedCargos.findIndex(c => c._id === cargoId);
        
        if (existingIndex > -1) {
            // Remove cargo
            selectedCargos.splice(existingIndex, 1);
            console.log('➖ Cargo removido:', cargo.descripcion);
        } else {
            // Add cargo
            selectedCargos.push(cargo);
            console.log('➕ Cargo agregado:', cargo.descripcion);
        }
        
        console.log('📊 Cargos seleccionados:', selectedCargos.length);
        
        // Update UI
        updateSelectedCargosDisplay();
        renderCargosOptions(document.getElementById('cargoSearchInput')?.value || '');
        updateMultiSelectPlaceholder();
    }
    
    function updateSelectedCargosDisplay() {
        const selectedCargosContainer = document.getElementById('selectedCargos');
        if (!selectedCargosContainer) return;
        
        selectedCargosContainer.innerHTML = selectedCargos.map(cargo => `
            <div class="selected-cargo-tag">
                <span>${cargo.codigo} - ${cargo.descripcion}</span>
                <div class="selected-cargo-remove" data-cargo-id="${cargo._id}"></div>
            </div>
        `).join('');
        
        // Add remove handlers
        selectedCargosContainer.querySelectorAll('.selected-cargo-remove').forEach(removeBtn => {
            removeBtn.addEventListener('click', function(e) {
                e.stopPropagation();
                const cargoId = this.getAttribute('data-cargo-id');
                toggleCargo(cargoId);
            });
        });
    }
    
    function updateMultiSelectPlaceholder() {
        const placeholder = document.querySelector('.multi-select-placeholder');
        if (!placeholder) return;
        
        if (selectedCargos.length === 0) {
            placeholder.textContent = 'Selecciona los cargos...';
            placeholder.style.display = 'block';
        } else {
            placeholder.style.display = 'none';
        }
    }
    
    function initializeMultiSelect() {
        console.log('🔧 Inicializando multi-select de cargos...');
        
        // Wait a bit for DOM to be ready
        setTimeout(() => {
            const multiSelectInput = document.getElementById('cargosSelectInput');
            const multiSelectDropdown = document.getElementById('cargosDropdown');
            const cargoSearchInput = document.getElementById('cargoSearchInput');
            
            console.log('📋 Elementos encontrados:', {
                input: !!multiSelectInput,
                dropdown: !!multiSelectDropdown,
                search: !!cargoSearchInput
            });
            
            if (!multiSelectInput || !multiSelectDropdown) {
                console.error('❌ Elementos no encontrados, reintentando...');
                setTimeout(initializeMultiSelect, 500);
                return;
            }
            
            // Make sure elements are visible and clickable
            multiSelectInput.style.pointerEvents = 'auto';
            multiSelectInput.style.cursor = 'pointer';
            multiSelectDropdown.style.display = 'none';
            
            console.log('✅ Configurando event listeners...');
            
            // Simple click handler
            multiSelectInput.onclick = function(e) {
                console.log('🖱️ CLICK DETECTADO!');
                e.stopPropagation();
                
                const isVisible = multiSelectDropdown.style.display !== 'none';
                
                if (isVisible) {
                    console.log('🔽 Cerrando dropdown');
                    multiSelectDropdown.style.display = 'none';
                    multiSelectInput.classList.remove('active');
                } else {
                    console.log('🔽 Abriendo dropdown');
                    multiSelectDropdown.style.display = 'block';
                    multiSelectInput.classList.add('active');
                    cargoSearchInput?.focus();
                }
            };
            
            // Search functionality
            if (cargoSearchInput) {
                cargoSearchInput.oninput = function() {
                    console.log('🔍 Buscando:', this.value);
                    renderCargosOptions(this.value);
                };
            }
            
            // Close on outside click
            document.onclick = function(e) {
                if (!multiSelectInput.contains(e.target) && !multiSelectDropdown.contains(e.target)) {
                    multiSelectDropdown.style.display = 'none';
                    multiSelectInput.classList.remove('active');
                }
            };
            
            // Initial render
            renderCargosOptions();
            console.log('✅ Multi-select configurado con onclick');
            
        }, 200);
    }
    
    // Load all fichas for autocomplete
    async function loadFichas() {
        try {
            console.log('🔄 Cargando fichas desde servidor...');
            const response = await fetch(`${API_URL}/fichas`);
            const result = await response.json();

            if (result.success) {
                allFichas = result.data;
                console.log(`✅ Fichas cargadas: ${allFichas.length} fichas encontradas`);
            } else {
                console.error('❌ Error del servidor al cargar fichas:', result.message);
                loadFichasOffline();
            }
        } catch (error) {
            console.warn('⚠️ Servidor no disponible, cargando datos de ejemplo...');
            console.error('Detalles del error:', error);
            showNotification('Modo Offline', 'El servidor no está disponible. Usando datos de ejemplo para demostración.', 'warning', 8000);
            loadFichasOffline();
        }
    }
    
    // Load fichas from local storage or use sample data
    function loadFichasOffline() {
        try {
            // Try to load from localStorage first
            const savedFichas = localStorage.getItem('mdc_fichas');
            if (savedFichas) {
                allFichas = JSON.parse(savedFichas);
                console.log(`📱 Fichas cargadas desde localStorage: ${allFichas.length} fichas`);
            } else {
                // Use sample data
                allFichas = [
                    {
                        _id: '1',
                        nombre: 'Juan',
                        apellido: 'Pérez',
                        identificacion: '12345678',
                        telefono: '555-0123',
                        edad: 35,
                        genero: 'masculino',
                        residencia: 'Los Santos',
                        raza: 'hispano'
                    },
                    {
                        _id: '2',
                        nombre: 'María',
                        apellido: 'González',
                        identificacion: '87654321',
                        telefono: '555-0456',
                        edad: 28,
                        genero: 'femenino',
                        residencia: 'Sandy Shores',
                        raza: 'caucasico'
                    },
                    {
                        _id: '3',
                        nombre: 'Carlos',
                        apellido: 'Rodríguez',
                        identificacion: '11223344',
                        telefono: '555-0789',
                        edad: 42,
                        genero: 'masculino',
                        residencia: 'Paleto Bay',
                        raza: 'afroamericano'
                    }
                ];
                console.log(`📋 Usando datos de ejemplo: ${allFichas.length} fichas`);
            }
        } catch (error) {
            console.error('❌ Error cargando fichas offline:', error);
            allFichas = [];
        }
    }
    
    // Save fichas to localStorage for offline mode
    function saveFichasToLocalStorage() {
        try {
            localStorage.setItem('mdc_fichas', JSON.stringify(allFichas));
            console.log('💾 Fichas guardadas en localStorage');
        } catch (error) {
            console.error('❌ Error guardando fichas en localStorage:', error);
        }
    }
    
    // Save cargos to localStorage for offline mode
    function saveCargosToLocalStorage() {
        try {
            localStorage.setItem('mdc_cargos', JSON.stringify(allCargos));
            console.log('💾 Cargos guardados en localStorage');
        } catch (error) {
            console.error('❌ Error guardando cargos en localStorage:', error);
        }
    }
    
    
    // Setup autocomplete for ByC form fields
    function setupByCAutocomplete() {
        console.log('🔧 Configurando autocompletado para ByC...');
        const nombreInput = document.getElementById('bycNombreCompleto');
        const identificacionInput = document.getElementById('bycIdentificacion');

        if (!nombreInput || !identificacionInput) {
            console.error('❌ Campos de ByC no encontrados:', {
                nombreInput: !!nombreInput,
                identificacionInput: !!identificacionInput
            });
            return;
        }
        
        console.log('✅ Campos de ByC encontrados, configurando autocompletado...');

        function fillByCFormWithFicha(ficha) {
            nombreInput.value = `${ficha.nombre} ${ficha.apellido}`.trim();
            identificacionInput.value = ficha.identificacion || '';

            console.log('Auto-rellenado ByC con ficha:', ficha);
        }

        // Setup autocomplete for nombre field
        nombreInput.addEventListener('input', function() {
            const value = this.value.trim().toLowerCase();

            if (value.length === 0) {
                // Clear dropdown when input is empty
                return;
            }

            const matches = (allFichas || []).filter(ficha => {
                const nombreCompleto = `${ficha.nombre} ${ficha.apellido}`.toLowerCase();
                return nombreCompleto.includes(value);
            }).slice(0, 5);

            if (matches.length > 0) {
                // Create dropdown if it doesn't exist
                let dropdown = document.getElementById('bycNombreDropdown');
                if (!dropdown) {
                    dropdown = document.createElement('div');
                    dropdown.id = 'bycNombreDropdown';
                    dropdown.className = 'autocomplete-dropdown';
                    nombreInput.parentNode.appendChild(dropdown);
                }

                dropdown.innerHTML = matches.map(ficha => `
                    <div class="autocomplete-item" data-ficha-id="${ficha._id}">
                        <strong>${ficha.nombre} ${ficha.apellido}</strong><br>
                        <small>ID: ${ficha.identificacion} | Edad: ${ficha.edad}</small>
                    </div>
                `).join('');

                dropdown.classList.add('active');

                // Add click handlers
                dropdown.querySelectorAll('.autocomplete-item').forEach(item => {
                    item.addEventListener('click', function(e) {
                        e.stopPropagation();
                        const fichaId = this.getAttribute('data-ficha-id');
                        const ficha = (allFichas || []).find(f => f._id === fichaId);
                        if (ficha) {
                            fillByCFormWithFicha(ficha);
                            dropdown.classList.remove('active');
                        }
                    });
                });
            } else {
                // Remove dropdown if no matches
                const dropdown = document.getElementById('bycNombreDropdown');
                if (dropdown) {
                    dropdown.classList.remove('active');
                }
            }
        });

        // Close dropdown when clicking outside
        document.addEventListener('click', function(e) {
            if (!nombreInput.contains(e.target)) {
                const dropdown = document.getElementById('bycNombreDropdown');
                if (dropdown) {
                    dropdown.classList.remove('active');
                }
            }
        });
    }
    
    // Make setupByCAutocomplete globally available
    window.setupByCAutocomplete = setupByCAutocomplete;
    
    // Setup autocomplete for a field (original function for search modal)
    function setupAutocomplete(inputId, dropdownId, field) {
        const input = document.getElementById(inputId);
        const dropdown = document.getElementById(dropdownId);
        
        if (!input || !dropdown) return;
        
        input.addEventListener('input', function() {
            const value = this.value.trim().toLowerCase();
            
            if (value.length === 0) {
                dropdown.classList.remove('active');
                dropdown.innerHTML = '';
                return;
            }
            
            const matches = (allFichas || []).filter(ficha => {
                const fieldValue = ficha[field].toString().toLowerCase();
                return fieldValue.includes(value);
            }).slice(0, 5); // Limit to 5 results
            
            if (matches.length > 0) {
                dropdown.innerHTML = matches.map(ficha => `
                    <div class="autocomplete-item" data-id="${ficha._id}">
                        ${ficha.nombre} ${ficha.apellido} - ${ficha.identificacion}
                    </div>
                `).join('');
                dropdown.classList.add('active');
                
                // Add click handlers
                dropdown.querySelectorAll('.autocomplete-item').forEach(item => {
                    item.addEventListener('click', function() {
                        const fichaId = this.getAttribute('data-id');
                        const ficha = (allFichas || []).find(f => f._id === fichaId);
                        if (ficha) {
                            showProfile(ficha);
                        }
                    });
                });
            } else {
                dropdown.classList.remove('active');
                dropdown.innerHTML = '';
            }
        });
        
        // Close dropdown when clicking outside
        document.addEventListener('click', function(e) {
            if (!input.contains(e.target) && !dropdown.contains(e.target)) {
                dropdown.classList.remove('active');
            }
        });
    }
    
    // Initialize autocomplete when search modal opens
    searchModal?.addEventListener('transitionend', function() {
        if (this.classList.contains('active')) {
            // Always load fichas when opening search modal to ensure fresh data
            loadFichas();
        }
    });

    // Initialize BOLOs when search panel opens
    searchPanel?.addEventListener('transitionend', function() {
        if (this.classList.contains('active')) {
            loadActiveBolos();
        }
    });
    
    // Setup autocomplete for all fields
    setupAutocomplete('searchNombre', 'nombreDropdown', 'nombre');
    setupAutocomplete('searchApellido', 'apellidoDropdown', 'apellido');
    setupAutocomplete('searchIdentificacion', 'identificacionDropdown', 'identificacion');
    
    // Function to show profile
    function showProfile(ficha) {
        currentProfile = ficha;

        // Llenar información del sidebar
        document.getElementById('profileFullNameSidebar').textContent = `${ficha.nombre} ${ficha.apellido}`;
        document.getElementById('profileMUJADSidebar').textContent = ficha.identificacion;

        // Manejar imagen de perfil
        const profileImage = document.getElementById('profileImage');
        const profileImageFrame = document.getElementById('profileImageFrame');
        const profileImageIframe = document.getElementById('profileImageIframe');
        const framePlaceholder = document.getElementById('framePlaceholder');

        if (ficha.imageUrl && ficha.imageUrl.trim() !== '') {
            profileImage.src = ficha.imageUrl;
            profileImage.style.display = 'none';

            profileImageIframe.src = ficha.imageUrl;
            profileImageIframe.style.display = 'block';
            framePlaceholder.style.display = 'none';
        } else {
            profileImage.style.display = 'none';
            profileImageIframe.style.display = 'none';
            framePlaceholder.style.display = 'flex';
        }

        // Llenar información básica
        document.getElementById('profileIdentificacion').textContent = ficha.identificacion;
        document.getElementById('profileMUJADValue').textContent = ficha.identificacion;
        document.getElementById('profileTelefono').textContent = ficha.telefono;
        document.getElementById('profileGenero').textContent = ficha.genero.charAt(0).toUpperCase() + ficha.genero.slice(1);
        document.getElementById('profileResidencia').textContent = ficha.residencia;
        document.getElementById('profileEdad').textContent = ficha.edad;
        document.getElementById('profileRaza').textContent = ficha.raza.charAt(0).toUpperCase() + ficha.raza.slice(1);

        // Cargar estadísticas reales
        loadProfileStats(ficha.identificacion);

        // Cargar arrestos reales
        loadArrestos(ficha.identificacion);

        // Cargar ByC
        loadByC(ficha.identificacion);

        // Cargar anotaciones
        loadAnotaciones(ficha.identificacion);

        // Cerrar modal de búsqueda y abrir perfil
        searchModal.classList.remove('active');
        profileModal.classList.add('active');

        // Initialize tabs after a short delay to ensure elements are rendered
        setTimeout(() => {
            initializeProfileTabs();
        }, 200);
    }
    
    // Load profile statistics
    async function loadProfileStats(identificacion) {
        try {
            // Load arrestos count
            const arrestosResponse = await fetch(`${API_URL}/arrestos/buscar/${identificacion}`);
            const arrestosResult = await arrestosResponse.json();
            const arrestosCount = arrestosResult.success ? arrestosResult.count : 0;
            
            // Load ByC count
            const bycResponse = await fetch(`${API_URL}/byc/persona/${identificacion}`);
            const bycResult = await bycResponse.json();
            const bycCount = bycResult.success ? bycResult.data.filter(byc => byc.estado === 'Activo').length : 0;
            
            // Update stats
            document.getElementById('profileByCActivos').textContent = bycCount;
            document.getElementById('profileBOLO').textContent = '0'; // BOLO functionality not implemented yet
            document.getElementById('profileArrestos').textContent = arrestosCount;
        } catch (error) {
            console.error('Error al cargar estadísticas:', error);
            document.getElementById('profileByCActivos').textContent = '0';
            document.getElementById('profileBOLO').textContent = '0';
            document.getElementById('profileArrestos').textContent = '0';
        }
    }
    
    
    // Load arrestos for profile
    async function loadArrestos(identificacion) {
        try {
            const response = await fetch(`${API_URL}/arrestos/buscar/${identificacion}`);
            const result = await response.json();
            const arrestosGrid = document.getElementById('arrestosGrid');
            
            if (result.success && result.data.length > 0) {
                arrestosGrid.innerHTML = result.data.map(arresto => {
                    const fecha = new Date(arresto.fechaArresto);
                    const fechaFormateada = fecha.toLocaleDateString('es-ES');
                    const cargosTexto = arresto.cargos.map(c => c.codigo).join(', ');
                    
                    return `
                        <div class="arresto-card">
                            <div class="arresto-header">
                                <div class="arresto-date">
                                    <i class="fa-regular fa-calendar"></i>
                                    <span>${fechaFormateada}</span>
                                </div>
                                <div class="arresto-time">
                                    <i class="fa-regular fa-clock"></i>
                                    <span>${arresto.horaArresto}</span>
                                </div>
                            </div>
                            <div class="arresto-body">
                                <div class="arresto-code">
                                    <i class="fa-solid fa-phone"></i>
                                    <span>${arresto.codigoArresto}</span>
                                </div>
                                <div class="arresto-charges">
                                    <i class="fa-solid fa-gavel"></i>
                                    <span>${arresto.cargos.length}</span>
                                </div>
                            </div>
                            <div class="arresto-footer">
                                <button class="ver-informe-btn" onclick="verDetalleArresto('${arresto._id}')">
                                    Ver informe
                                </button>
                            </div>
                        </div>
                    `;
                }).join('');
            } else {
                arrestosGrid.innerHTML = '<p class="no-data-new">No hay arrestos registrados</p>';
            }
        } catch (error) {
            console.error('Error al cargar arrestos:', error);
            document.getElementById('arrestosGrid').innerHTML = '<p class="no-data-new">Error al cargar arrestos</p>';
        }
    }
    
    // Load ByC for profile
    async function loadByC(identificacion) {
        try {
            console.log('🔄 Cargando ByC para identificación:', identificacion);
            const response = await fetch(`${API_URL}/byc/persona/${identificacion}`);
            const result = await response.json();
            
            const bycGrid = document.getElementById('bycGrid');
            if (!bycGrid) return;
            
            if (result.success && result.data.length > 0) {
                console.log(`📋 Encontrados ${result.data.length} ByC para ${identificacion}`);
                bycGrid.innerHTML = result.data.map(byc => {
                    const fecha = new Date(byc.fechaCreacion);
                    const fechaFormateada = fecha.toLocaleDateString('es-ES');
                    
                    // Determinar el estado visual
                    const estadoClass = byc.estado === 'Activo' ? 'activo' : 
                                      byc.estado === 'Resuelto' ? 'resuelto' : 'inactivo';
                    const estadoTexto = byc.estado === 'Activo' ? 'Activo' : 
                                      byc.estado === 'Resuelto' ? 'Inactivo' : 'Inactivo';
                    
                    return `
                        <div class="byc-card">
                            <div class="byc-header">
                                <div class="byc-date">
                                    <i class="fa-regular fa-calendar"></i>
                                    <span>${fechaFormateada}</span>
                            </div>
                                <div class="byc-status-indicator ${estadoClass}">
                                    <div class="byc-status-dot ${estadoClass}"></div>
                                    <span>${estadoTexto}</span>
                                </div>
                            </div>
                            <div class="byc-body">
                                <div class="byc-title">FUGITIVO - BYC - ORDEN DE DETENCIÓN...</div>
                            </div>
                            <div class="byc-footer">
                                <button class="ver-informe-btn" onclick="verDetalleByC('${byc._id}')">
                                    Ver informe
                                </button>
                            </div>
                        </div>
                    `;
                }).join('');
            } else {
                bycGrid.innerHTML = '<p class="no-data-new">No hay búsquedas y capturas registradas</p>';
            }
        } catch (error) {
            console.error('❌ Error loading ByC:', error);
            const bycGrid = document.getElementById('bycGrid');
            if (bycGrid) {
                bycGrid.innerHTML = '<p class="no-data-new">Error al cargar búsquedas y capturas</p>';
            }
        }
    }
    
    // Load anotaciones for profile
    async function loadAnotaciones(identificacion) {
        try {
            const response = await fetch(`${API_URL}/anotaciones/persona/${identificacion}`);
            const result = await response.json();
            const anotacionesGrid = document.getElementById('anotacionesGrid');
            
            if (result.success && result.data.length > 0) {
                anotacionesGrid.innerHTML = result.data.map(anotacion => {
                    const fecha = new Date(anotacion.fechaCreacion);
                    const fechaFormateada = fecha.toLocaleDateString('es-ES');
                    
                    return `
                        <div class="anotacion-card">
                            <div class="anotacion-header">
                                <div class="anotacion-titulo">${anotacion.titulo}</div>
                                <div class="anotacion-categoria">${anotacion.categoria}</div>
                            </div>
                            <div class="anotacion-contenido">${anotacion.contenido}</div>
                            <div class="anotacion-footer">
                                <span>Oficial: ${anotacion.oficialNombre}</span>
                                <div class="anotacion-actions">
                                    <button class="action-btn" onclick="editarAnotacion('${anotacion._id}')">Editar</button>
                                    <button class="action-btn" onclick="eliminarAnotacion('${anotacion._id}')">Eliminar</button>
                                </div>
                            </div>
                        </div>
                    `;
                }).join('');
            } else {
                anotacionesGrid.innerHTML = '<p class="no-data-new">No hay anotaciones</p>';
            }
        } catch (error) {
            console.error('Error al cargar anotaciones:', error);
            document.getElementById('anotacionesGrid').innerHTML = '<p class="no-data-new">Error al cargar anotaciones</p>';
        }
    }
    
    // Function to load BOLOs activos in the modal
    async function loadBolosActivosModal() {
        try {
            console.log('🔄 Cargando BOLOs activos para el modal...');
            const response = await fetch(`${API_URL}/bolos/activos`);
            const result = await response.json();

            const bolosTableBody = document.querySelector('.bolos-table-body');
            const totalBolos = document.getElementById('totalBolos');
            const bolosUrgentes = document.getElementById('bolosUrgentes');
            const bolosProximos = document.getElementById('bolosProximos');

            if (!bolosTableBody) return;

            if (result.success && result.data.length > 0) {
                console.log(`📋 Encontrados ${result.data.length} BOLOs activos`);
                
                // Calcular estadísticas
                let urgentes = 0;
                let proximos = 0;
                
                const bolosHTML = result.data.map(bolo => {
                    const tiempoRestante = calcularTiempoRestante(bolo.fechaExpiracion);
                    const tiempoClass = tiempoRestante.urgente ? 'urgente' : tiempoRestante.proximo ? 'proximo' : 'normal';
                    
                    // Contar urgentes y próximos
                    if (tiempoRestante.urgente) urgentes++;
                    else if (tiempoRestante.proximo) proximos++;

                    return `
                        <div class="bolos-table-row" data-tipo="${bolo.tipo}">
                            <div class="bolos-table-cell">
                                <div class="bolo-time ${tiempoClass}">
                                    <i class="fa-solid fa-clock"></i>
                                    <span>${tiempoRestante.texto}</span>
                                </div>
                            </div>
                            <div class="bolos-table-cell">
                                <div class="bolo-type">${bolo.tipo}</div>
                            </div>
                            <div class="bolos-table-cell">
                                <div class="bolo-description">
                                    <div class="bolo-subject">${bolo.descripcion}</div>
                                    <div class="bolo-location">
                                        <i class="fa-solid fa-map-marker-alt"></i>
                                        <span>${bolo.ubicacion}</span>
                                    </div>
                                    <div class="bolo-callsign">
                                        <i class="fa-solid fa-phone"></i>
                                        <span>Callsign: ${bolo.callsign}</span>
                                    </div>
                                    <div class="bolo-datetime">
                                        <i class="fa-solid fa-calendar"></i>
                                        <span>${bolo.fecha} ${bolo.tiempo}</span>
                                    </div>
                                </div>
                            </div>
                            <div class="bolos-table-cell">
                                <div class="bolo-actions">
                                    <button class="bolo-btn view" onclick="verDetalleBolo('${bolo._id}')" title="Ver detalles">
                                        <i class="fa-solid fa-eye"></i>
                                    </button>
                                    <button class="bolo-btn resolve" onclick="resolverBolo('${bolo._id}')" title="Resolver">
                                        <i class="fa-solid fa-check"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                    `;
                }).join('');

                bolosTableBody.innerHTML = bolosHTML;
                
                // Actualizar estadísticas
                totalBolos.textContent = result.data.length;
                bolosUrgentes.textContent = urgentes;
                bolosProximos.textContent = proximos;
                
                // Configurar filtros
                setupBolosFilters();
                
            } else {
                bolosTableBody.innerHTML = '<div class="no-bolos-table"><span>No hay datos disponibles</span></div>';
                totalBolos.textContent = '0';
                bolosUrgentes.textContent = '0';
                bolosProximos.textContent = '0';
            }
        } catch (error) {
            console.error('❌ Error loading BOLOs activos:', error);
            const bolosList = document.getElementById('bolosActivosList');
            if (bolosList) {
                bolosList.innerHTML = '<div class="error-bolos"><i class="fa-solid fa-exclamation-triangle"></i><p>Error al cargar BOLOs activos</p></div>';
            }
        }
    }

    // Function to setup BOLOs filters
    function setupBolosFilters() {
        const tipoFilter = document.getElementById('boloFilterTipo');
        const refreshBtn = document.getElementById('refreshBolos');

        if (tipoFilter) {
            tipoFilter.addEventListener('change', filterBolos);
        }
        if (refreshBtn) {
            refreshBtn.addEventListener('click', loadBolosActivosModal);
        }
    }

    // Function to filter BOLOs
    function filterBolos() {
        const tipoFilter = document.getElementById('boloFilterTipo');
        const bolosRows = document.querySelectorAll('.bolos-table-row');

        const tipoSeleccionado = tipoFilter ? tipoFilter.value : '';

        bolosRows.forEach(row => {
            const tipo = row.dataset.tipo;
            
            let mostrar = true;
            
            if (tipoSeleccionado && tipo !== tipoSeleccionado) {
                mostrar = false;
            }
            
            row.style.display = mostrar ? 'flex' : 'none';
        });
    }

    // Function to resolve BOLO
    async function resolverBolo(boloId) {
        try {
            console.log('✅ Resolviendo BOLO:', boloId);
            
            const response = await fetch(`${API_URL}/bolos/${boloId}/resolver`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            const result = await response.json();

            if (result.success) {
                showNotification('BOLO resuelto', 'El BOLO ha sido marcado como resuelto exitosamente', 'success');
                // Recargar la lista
                loadBolosActivosModal();
            } else {
                showNotification('Error', result.message || 'Error al resolver el BOLO', 'error');
            }
        } catch (error) {
            console.error('❌ Error al resolver BOLO:', error);
            showNotification('Error de conexión', 'Error de conexión al resolver el BOLO', 'error');
        }
    }

    // Function to load active BOLOs for search panel
    async function loadActiveBolos() {
        try {
            console.log('🔄 Cargando BOLOs activos...');
            const response = await fetch(`${API_URL}/bolos/activos`);
            const result = await response.json();

            const bolosList = document.getElementById('bolosActivosList');
            if (!bolosList) {
                console.error('Elemento bolosActivosList no encontrado');
                return;
            }

            if (result.success && result.data.length > 0) {
                console.log(`📋 Encontrados ${result.data.length} BOLOs activos`);
                bolosList.innerHTML = result.data.map(bolo => {
                    const fecha = new Date(bolo.fechaCreacion);
                    const fechaFormateada = fecha.toLocaleDateString('es-ES');
                    const tiempoRestante = calcularTiempoRestante(bolo.fechaExpiracion);
                    const tiempoClass = tiempoRestante.urgente ? 'urgente' : tiempoRestante.proximo ? 'proximo' : 'normal';

                    return `
                        <div class="bolo-item">
                            <div class="bolo-item-header">
                                <span class="bolo-item-type">${bolo.tipo.toUpperCase()}</span>
                                <span class="bolo-item-time ${tiempoClass}">
                                    <i class="fa-solid fa-clock"></i>
                                    ${tiempoRestante.texto}
                                </span>
                            </div>
                            <div class="bolo-item-subject">${bolo.descripcion}</div>
                            <div class="bolo-item-location">
                                <i class="fa-solid fa-map-marker-alt"></i>
                                ${bolo.ubicacion}
                            </div>
                            <div class="bolo-item-details">
                                <small>Oficial: ${bolo.oficialNombre} | Placa: ${bolo.oficialPlaca}</small>
                            </div>
                            <button class="bolo-item-btn" onclick="verDetalleBolo('${bolo._id}')">
                                <i class="fa-solid fa-eye"></i>
                                Ver detalles
                            </button>
                        </div>
                    `;
                }).join('');
            } else {
                bolosList.innerHTML = '<p class="no-bolos">No hay BOLOs activos en este momento</p>';
            }
        } catch (error) {
            console.error('❌ Error loading active BOLOs:', error);
            const bolosList = document.getElementById('bolosActivosList');
            if (bolosList) {
                bolosList.innerHTML = '<p class="no-bolos">Error al cargar BOLOs activos</p>';
            }
        }
    }

    // Function to calculate remaining time for BOLO
    function calcularTiempoRestante(fechaExpiracion) {
        const ahora = new Date();
        const expiracion = new Date(fechaExpiracion);
        const diferencia = expiracion - ahora;

        if (diferencia <= 0) {
            return { texto: 'Expirado', urgente: true, proximo: false };
        }

        const horas = Math.floor(diferencia / (1000 * 60 * 60));
        const minutos = Math.floor((diferencia % (1000 * 60 * 60)) / (1000 * 60));
        const segundos = Math.floor((diferencia % (1000 * 60)) / 1000);

        let texto = '';
        if (horas > 0) {
            texto += `${horas}h `;
        }
        if (minutos > 0) {
            texto += `${minutos}m `;
        }
        if (segundos > 0 && horas === 0) {
            texto += `${segundos}s `;
        }

        texto += 'restantes';

        if (horas <= 1) {
            return { texto: texto, urgente: true, proximo: false };
        } else if (horas <= 3) {
            return { texto: texto, urgente: false, proximo: true };
        } else {
            return { texto: texto, urgente: false, proximo: false };
        }
    }

    // Function to show BOLO details
    async function verDetalleBolo(boloId) {
        try {
            console.log('🔍 Cargando detalles del BOLO:', boloId);

            const response = await fetch(`${API_URL}/bolos/${boloId}`);
            const result = await response.json();

            if (result.success) {
                const bolo = result.data;
                showBoloDetail(bolo);
            } else {
                showNotification('Error', 'Error al cargar los detalles del BOLO: ' + result.message, 'error');
            }
        } catch (error) {
            console.error('❌ Error al cargar detalles del BOLO:', error);
            showNotification('Error de conexión', 'Error de conexión al cargar los detalles del BOLO.', 'error');
        }
    }

    // Function to display BOLO details in modal
    function showBoloDetail(bolo) {
        const fecha = new Date(bolo.fechaCreacion);
        const fechaFormateada = fecha.toLocaleDateString('es-ES', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });

        const fechaCreacion = new Date(bolo.fechaCreacion);
        const fechaCreacionFormateada = fechaCreacion.toLocaleDateString('es-ES') + ' ' + fechaCreacion.toLocaleTimeString('es-ES');

        const tiempoRestante = calcularTiempoRestante(bolo.fechaExpiracion);

        const detailContent = `
            <div class="bolo-header">
                <div class="bolo-header-left">
                    <h2>BOLO - ${bolo.tipo.toUpperCase()}</h2>
                    <p>${bolo.descripcion}</p>
                </div>
                <div class="bolo-header-right">
                    <div class="bolo-date">${fechaFormateada}</div>
                    <div class="bolo-status-indicator ${bolo.estado.toLowerCase()}">
                        <div class="bolo-status-dot ${bolo.estado.toLowerCase()}"></div>
                        <span>${bolo.estado}</span>
                    </div>
                </div>
            </div>

            <div class="detail-section">
                <h3>
                    <i class="fa-solid fa-info-circle"></i>
                    Información del Incidente
                </h3>
                <div class="detail-grid">
                    <div class="detail-item">
                        <div class="detail-label">Tipo de BOLO</div>
                        <div class="detail-value">${bolo.tipo.toUpperCase()}</div>
                    </div>
                    <div class="detail-item">
                        <div class="detail-label">Fecha del Incidente</div>
                        <div class="detail-value">${fechaFormateada}</div>
                    </div>
                    <div class="detail-item">
                        <div class="detail-label">Hora del Incidente</div>
                        <div class="detail-value">${bolo.tiempo}</div>
                    </div>
                    <div class="detail-item">
                        <div class="detail-label">Callsign/Radio</div>
                        <div class="detail-value">${bolo.callsign}</div>
                    </div>
                </div>
            </div>

            <div class="detail-section">
                <h3>
                    <i class="fa-solid fa-user"></i>
                    Información del Sujeto
                </h3>
                <div class="detail-grid">
                    ${bolo.genero ? `
                    <div class="detail-item">
                        <div class="detail-label">Género</div>
                        <div class="detail-value">${bolo.genero}</div>
                    </div>
                    ` : ''}
                    ${bolo.raza ? `
                    <div class="detail-item">
                        <div class="detail-label">Raza/Etnia</div>
                        <div class="detail-value">${bolo.raza}</div>
                    </div>
                    ` : ''}
                    <div class="detail-item">
                        <div class="detail-label">Última Ubicación</div>
                        <div class="detail-value">${bolo.ubicacion}</div>
                    </div>
                </div>
            </div>

            <div class="detail-section">
                <h3>
                    <i class="fa-solid fa-file-text"></i>
                    Descripción Detallada
                </h3>
                <div class="detail-grid">
                    <div class="detail-item detail-description">
                        <div class="detail-label">Detalles del BOLO</div>
                        <div class="detail-value">${bolo.descripcion}</div>
                    </div>
                </div>
            </div>

            <div class="detail-section">
                <h3>
                    <i class="fa-solid fa-shield-alt"></i>
                    Información del Oficial
                </h3>
                <div class="detail-grid">
                    <div class="detail-item">
                        <div class="detail-label">Oficial a Cargo</div>
                        <div class="detail-value">${bolo.oficialNombre}</div>
                    </div>
                    <div class="detail-item">
                        <div class="detail-label">Número de Placa</div>
                        <div class="detail-value">${bolo.oficialPlaca}</div>
                    </div>
                    <div class="detail-item">
                        <div class="detail-label">Departamento</div>
                        <div class="detail-value">${bolo.departamento}</div>
                    </div>
                </div>
            </div>

            <div class="detail-section">
                <h3>
                    <i class="fa-solid fa-clock"></i>
                    Información del Sistema
                </h3>
                <div class="detail-grid">
                    <div class="detail-item">
                        <div class="detail-label">Fecha de Creación</div>
                        <div class="detail-value">${fechaCreacionFormateada}</div>
                    </div>
                    <div class="detail-item">
                        <div class="detail-label">Fecha de Expiración</div>
                        <div class="detail-value">${new Date(bolo.fechaExpiracion).toLocaleString('es-ES')}</div>
                    </div>
                    <div class="detail-item">
                        <div class="detail-label">Tiempo Restante</div>
                        <div class="detail-value ${tiempoRestante.urgente ? 'urgente' : tiempoRestante.proximo ? 'proximo' : 'normal'}">
                            ${tiempoRestante.texto}
                        </div>
                    </div>
                    <div class="detail-item">
                        <div class="detail-label">ID del BOLO</div>
                        <div class="detail-value">${bolo._id}</div>
                    </div>
                </div>
            </div>
        `;

        // Crear modal de detalle si no existe
        let boloDetailModal = document.getElementById('boloDetailModal');
        if (!boloDetailModal) {
            boloDetailModal = document.createElement('div');
            boloDetailModal.id = 'boloDetailModal';
            boloDetailModal.className = 'form-modal';
            boloDetailModal.innerHTML = `
                <div class="form-container" style="max-width: 800px;">
                    <div class="form-header">
                        <h2>Detalles del BOLO</h2>
                        <button class="close-btn" id="closeBoloDetailModal">
                            <i class="fa-solid fa-times"></i>
                        </button>
                    </div>
                    <div id="boloDetailContent"></div>
                </div>
            `;
            document.body.appendChild(boloDetailModal);

            // Agregar event listener para cerrar
            document.getElementById('closeBoloDetailModal')?.addEventListener('click', function(e) {
                e.stopPropagation();
                boloDetailModal.classList.remove('active');
            });
        }

        document.getElementById('boloDetailContent').innerHTML = detailContent;
        closeAllPanels();
        boloDetailModal.classList.add('active');
    }

    // Function to show arrest details
    async function verDetalleArresto(arrestoId) {
        try {
            console.log('Cargando detalles del arresto:', arrestoId);
            
            const response = await fetch(`${API_URL}/arrestos/${arrestoId}`);
            const result = await response.json();
            
            if (result.success) {
                const arresto = result.data;
                showArrestDetail(arresto);
            } else {
                showNotification('Error', 'Error al cargar los detalles del arresto: ' + result.message, 'error');
            }
        } catch (error) {
            console.error('Error al cargar detalles del arresto:', error);
            showNotification('Error de conexión', 'Error de conexión al cargar los detalles del arresto.', 'error');
        }
    }
    
    // Function to display arrest details in modal
    function showArrestDetail(arresto) {
        const fecha = new Date(arresto.fechaArresto);
        const fechaFormateada = fecha.toLocaleDateString('es-ES', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
        
        const fechaCreacion = new Date(arresto.fechaCreacion);
        const fechaCreacionFormateada = fechaCreacion.toLocaleDateString('es-ES') + ' ' + fechaCreacion.toLocaleTimeString('es-ES');
        
        const cargosHtml = arresto.cargos.map(cargo => `
            <div class="cargo-tag">
                <i class="fa-solid fa-gavel"></i>
                ${cargo.codigo} - ${cargo.descripcion}
            </div>
        `).join('');
        
        const detailContent = `
            <div class="arrest-header">
                <div class="arrest-header-left">
                    <h2>Reporte de Arresto #${arresto.codigoArresto}</h2>
                    <p>${arresto.nombre} ${arresto.apellido} - ID: ${arresto.identificacion}</p>
                </div>
                <div class="arrest-header-right">
                    <div class="arrest-date">${fechaFormateada}</div>
                    <div class="arrest-time">${arresto.horaArresto}</div>
                </div>
            </div>
            
            <div class="detail-section">
                <h3>
                    <i class="fa-solid fa-user"></i>
                    Información del Arrestado
                </h3>
                <div class="detail-grid">
                    <div class="detail-item">
                        <div class="detail-label">Nombre Completo</div>
                        <div class="detail-value">${arresto.nombre} ${arresto.apellido}</div>
                    </div>
                    <div class="detail-item">
                        <div class="detail-label">Identificación</div>
                        <div class="detail-value">${arresto.identificacion}</div>
                    </div>
                    <div class="detail-item">
                        <div class="detail-label">Edad</div>
                        <div class="detail-value">${arresto.edad} años</div>
                    </div>
                </div>
            </div>
            
            <div class="detail-section">
                <h3>
                    <i class="fa-solid fa-handcuffs"></i>
                    Detalles del Arresto
                </h3>
                <div class="detail-grid">
                    <div class="detail-item">
                        <div class="detail-label">Fecha del Arresto</div>
                        <div class="detail-value">${fechaFormateada}</div>
                    </div>
                    <div class="detail-item">
                        <div class="detail-label">Hora del Arresto</div>
                        <div class="detail-value">${arresto.horaArresto}</div>
                    </div>
                    <div class="detail-item">
                        <div class="detail-label">Ubicación</div>
                        <div class="detail-value">${arresto.ubicacion}</div>
                    </div>
                    <div class="detail-item">
                        <div class="detail-label">Código de Arresto</div>
                        <div class="detail-value">${arresto.codigoArresto}</div>
                    </div>
                </div>
            </div>
            
            <div class="detail-section">
                <h3>
                    <i class="fa-solid fa-gavel"></i>
                    Cargos Aplicados (${arresto.cargos.length})
                </h3>
                <div class="cargos-list">
                    ${cargosHtml}
                </div>
            </div>
            
            <div class="detail-section">
                <h3>
                    <i class="fa-solid fa-shield-alt"></i>
                    Información del Oficial
                </h3>
                <div class="detail-grid">
                    <div class="detail-item">
                        <div class="detail-label">Oficial a Cargo</div>
                        <div class="detail-value">${arresto.oficialNombre}</div>
                    </div>
                    <div class="detail-item">
                        <div class="detail-label">Número de Placa</div>
                        <div class="detail-value">${arresto.oficialPlaca}</div>
                    </div>
                    <div class="detail-item">
                        <div class="detail-label">Departamento</div>
                        <div class="detail-value">${arresto.departamento}</div>
                    </div>
                </div>
            </div>
            
            <div class="detail-section">
                <h3>
                    <i class="fa-solid fa-file-text"></i>
                    Descripción del Incidente
                </h3>
                <div class="detail-grid">
                    <div class="detail-item detail-description">
                        <div class="detail-label">Descripción Detallada</div>
                        <div class="detail-value">${arresto.descripcion}</div>
                    </div>
                </div>
            </div>
            
            <div class="detail-section">
                <h3>
                    <i class="fa-solid fa-clock"></i>
                    Información del Sistema
                </h3>
                <div class="detail-grid">
                    <div class="detail-item">
                        <div class="detail-label">Fecha de Creación</div>
                        <div class="detail-value">${fechaCreacionFormateada}</div>
                    </div>
                    <div class="detail-item">
                        <div class="detail-label">ID del Reporte</div>
                        <div class="detail-value">${arresto._id}</div>
                    </div>
                </div>
            </div>
        `;
        
        document.getElementById('arrestDetailContent').innerHTML = detailContent;
        closeAllPanels();
        arrestDetailModal.classList.add('active');
    }
    
// Make verDetalleArresto globally available
window.verDetalleArresto = verDetalleArresto;

// Make BOLO functions globally available
window.verDetalleBolo = verDetalleBolo;
window.loadActiveBolos = loadActiveBolos;
window.loadBolosActivosModal = loadBolosActivosModal;
window.resolverBolo = resolverBolo;
    
    // Function to show ByC details
    async function verDetalleByC(bycId) {
        try {
            console.log('🔍 Cargando detalles del ByC:', bycId);
            console.log('🌐 URL completa:', `${API_URL}/byc/${bycId}`);
            
            // Check server connection first
            const isConnected = await checkServerConnection();
            if (!isConnected) {
                throw new Error('No se puede conectar con el servidor');
            }
            
            const response = await fetch(`${API_URL}/byc/${bycId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            
            console.log('📥 Respuesta del servidor:', response.status, response.statusText);
            
            if (!response.ok) {
                if (response.status === 404) {
                    throw new Error('ByC no encontrado en el servidor');
                } else {
                    throw new Error(`Error HTTP ${response.status}: ${response.statusText}`);
                }
            }
            
            const result = await response.json();
            console.log('📄 Datos de respuesta:', result);
            
            if (result.success) {
                const byc = result.data;
                showByCDetail(byc);
            } else {
                showNotification('Error', 'Error al cargar los detalles del ByC: ' + result.message, 'error');
            }
        } catch (error) {
            console.error('❌ Error al cargar detalles del ByC:', error);
            
            let errorMessage = 'Error de conexión al cargar los detalles del ByC.';
            if (error.message.includes('404') || error.message.includes('no encontrado')) {
                errorMessage = 'El ByC solicitado no fue encontrado en el servidor.';
            } else if (error.message.includes('JSON')) {
                errorMessage = 'El servidor devolvió una respuesta inválida. Verifica que el servidor esté funcionando correctamente.';
            } else if (error.message.includes('fetch')) {
                errorMessage = 'No se pudo conectar con el servidor. Verifica que esté corriendo en http://localhost:3000';
            }
            
            showNotification('Error de conexión', errorMessage, 'error', 8000);
        }
    }
    
    // Function to display ByC details in modal
    function showByCDetail(byc) {
        const fecha = new Date(byc.fechaCreacion);
        const fechaFormateada = fecha.toLocaleDateString('es-ES', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
        
        const fechaCreacion = new Date(byc.fechaCreacion);
        const fechaCreacionFormateada = fechaCreacion.toLocaleDateString('es-ES') + ' ' + fechaCreacion.toLocaleTimeString('es-ES');
        
        // Determinar el estado visual
        const estadoClass = byc.estado === 'Activo' ? 'activo' : 
                          byc.estado === 'Resuelto' ? 'resuelto' : 'inactivo';
        const estadoTexto = byc.estado === 'Activo' ? 'Activo' : 
                          byc.estado === 'Resuelto' ? 'Completado' : 'Inactivo';
        
        const detailContent = `
            <div class="byc-header">
                <div class="byc-header-left">
                    <h2>Búsqueda y Captura - ByC</h2>
                    <p>${byc.nombreCompleto} - ID: ${byc.identificacion}</p>
                </div>
                <div class="byc-header-right">
                    <div class="byc-date">${fechaFormateada}</div>
                    <div class="byc-status-indicator ${estadoClass}">
                        <div class="byc-status-dot ${estadoClass}"></div>
                        <span>${estadoTexto}</span>
                    </div>
                </div>
            </div>
            
            <div class="detail-section">
                <h3>
                    <i class="fa-solid fa-user"></i>
                    Información del Sospechoso
                </h3>
                <div class="detail-grid">
                    <div class="detail-item">
                        <div class="detail-label">Nombre Completo</div>
                        <div class="detail-value">${byc.nombreCompleto}</div>
                    </div>
                    <div class="detail-item">
                        <div class="detail-label">Identificación</div>
                        <div class="detail-value">${byc.identificacion}</div>
                    </div>
                    <div class="detail-item">
                        <div class="detail-label">Estado</div>
                        <div class="detail-value">
                            <div class="byc-status-indicator ${estadoClass}">
                                <div class="byc-status-dot ${estadoClass}"></div>
                                <span>${estadoTexto}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="detail-section">
                <h3>
                    <i class="fa-solid fa-file-text"></i>
                    Información
                </h3>
                <div class="detail-grid">
                    <div class="detail-item detail-description">
                        <div class="detail-label">Descripción de los hechos</div>
                        <div class="detail-value">${byc.descripcionHechos}</div>
                    </div>
                </div>
            </div>
            
            <div class="detail-section">
                <h3>
                    <i class="fa-solid fa-shield-alt"></i>
                    Información del oficial
                </h3>
                <div class="detail-grid">
                    <div class="detail-item">
                        <div class="detail-label">Nombre_Apellido</div>
                        <div class="detail-value">Sistema_Automático</div>
                    </div>
                    <div class="detail-item">
                        <div class="detail-label">Identificación</div>
                        <div class="detail-value">#SYS</div>
                    </div>
                    <div class="detail-item">
                        <div class="detail-label">Fecha de creación</div>
                        <div class="detail-value">${fechaCreacionFormateada}</div>
                    </div>
                </div>
            </div>
            
            <div class="detail-section">
                <h3>
                    <i class="fa-solid fa-clock"></i>
                    Información del Sistema
                </h3>
                <div class="detail-grid">
                    <div class="detail-item">
                        <div class="detail-label">Fecha de Creación</div>
                        <div class="detail-value">${fechaCreacionFormateada}</div>
                    </div>
                    <div class="detail-item">
                        <div class="detail-label">ID del ByC</div>
                        <div class="detail-value">${byc._id}</div>
                    </div>
                </div>
            </div>
            
            ${byc.estado === 'Activo' ? `
            <div class="detail-actions">
                <button class="completar-byc-btn" onclick="marcarByCCompletado('${byc._id}')">
                    <i class="fa-solid fa-check-circle"></i>
                    Marcar como completado
                </button>
            </div>
            ` : ''}
        `;
        
        document.getElementById('bycDetailContent').innerHTML = detailContent;
        closeAllPanels();
        bycDetailModal.classList.add('active');
    }
    
    // Function to mark ByC as completed
    async function marcarByCCompletado(bycId) {
        try {
            console.log('✅ Marcando ByC como completado:', bycId);
            
            const response = await fetch(`${API_URL}/byc/${bycId}/completar`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            
            const result = await response.json();
            
            if (result.success) {
                showNotification('ByC completado', 'La búsqueda y captura ha sido marcada como completada exitosamente.', 'success');
                
                // Cerrar modal de detalle
                bycDetailModal.classList.remove('active');
                
                // Recargar ByC si hay un perfil abierto
                if (currentProfile) {
                    loadByC(currentProfile.identificacion);
                    loadProfileStats(currentProfile.identificacion);
                }
                
                console.log('✅ ByC marcado como completado:', result.data);
            } else {
                showNotification('Error', 'Error al marcar el ByC como completado: ' + result.message, 'error');
            }
        } catch (error) {
            console.error('❌ Error al marcar ByC como completado:', error);
            showNotification('Error de conexión', 'Error de conexión al marcar el ByC como completado.', 'error');
        }
    }
    
    
    // Additional officers functionality
    let officerCounter = 0;
    
    document.getElementById('addOfficerBtn')?.addEventListener('click', function() {
        addAdditionalOfficer();
    });
    
    function addAdditionalOfficer() {
        officerCounter++;
        const additionalOfficersContainer = document.getElementById('additionalOfficers');
        
        const officerDiv = document.createElement('div');
        officerDiv.className = 'additional-officer';
        officerDiv.id = `officer-${officerCounter}`;
        
        officerDiv.innerHTML = `
            <div class="form-group">
                <label for="oficialNombre${officerCounter}">Nombre</label>
                <div class="input-with-icon">
                    <i class="fa-solid fa-user"></i>
                    <input type="text" id="oficialNombre${officerCounter}" name="oficialNombre${officerCounter}" placeholder="" required>
                </div>
            </div>
            <div class="form-group">
                <label for="rango${officerCounter}">Rango</label>
                <div class="input-with-icon">
                    <i class="fa-solid fa-chevron-down"></i>
                    <select id="rango${officerCounter}" name="rango${officerCounter}" required>
                        <option value="">Selecciona</option>
                        <option value="Officer">Officer</option>
                        <option value="Senior Officer">Senior Officer</option>
                        <option value="Corporal">Corporal</option>
                        <option value="Sergeant">Sergeant</option>
                        <option value="Lieutenant">Lieutenant</option>
                        <option value="Captain">Captain</option>
                        <option value="Deputy">Deputy</option>
                        <option value="Senior Deputy">Senior Deputy</option>
                        <option value="Detective">Detective</option>
                    </select>
                </div>
            </div>
            <div class="form-group">
                <label for="oficialPlaca${officerCounter}">Placa</label>
                <div class="input-with-icon">
                    <i class="fa-solid fa-badge"></i>
                    <input type="text" id="oficialPlaca${officerCounter}" name="oficialPlaca${officerCounter}" placeholder="#####" required>
                </div>
            </div>
            <button type="button" class="remove-officer-btn" onclick="removeOfficer(${officerCounter})" title="Remover agente">×</button>
        `;
        
        additionalOfficersContainer.appendChild(officerDiv);
        console.log(`Agente adicional #${officerCounter} agregado`);
    }
    
    function removeOfficer(officerId) {
        const officerDiv = document.getElementById(`officer-${officerId}`);
        if (officerDiv) {
            officerDiv.remove();
            console.log(`Agente #${officerId} removido`);
        }
    }
    
    // Make functions globally available
    window.removeOfficer = removeOfficer;
    window.addAdditionalOfficer = addAdditionalOfficer;
    
    // Annotation management functions
    async function editarAnotacion(anotacionId) {
        try {
            console.log(' Cargando detalles de anotación para editar:', anotacionId);
            
            // Check server connection first
            const isConnected = await checkServerConnection();
            if (!isConnected) {
                throw new Error('No se puede conectar con el servidor');
            }
            
            const response = await fetch(`${API_URL}/anotaciones/${anotacionId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            
            if (!response.ok) {
                if (response.status === 404) {
                    throw new Error('Anotación no encontrada en el servidor');
                } else {
                    throw new Error(`Error HTTP ${response.status}: ${response.statusText}`);
                }
            }
            
            const result = await response.json();
            
            if (result.success) {
                const anotacion = result.data;
                
                // Pre-fill the form with annotation data
                document.getElementById('anotacionNombre').value = anotacion.nombre || '';
                document.getElementById('anotacionApellido').value = anotacion.apellido || '';
                document.getElementById('anotacionIdentificacion').value = anotacion.identificacion || '';
                document.getElementById('anotacionTitulo').value = anotacion.titulo || '';
                document.getElementById('anotacionContenido').value = anotacion.contenido || '';
                document.getElementById('anotacionCategoria').value = anotacion.categoria || '';
                document.getElementById('anotacionOficialNombre').value = anotacion.oficialNombre || '';
                document.getElementById('anotacionOficialPlaca').value = anotacion.oficialPlaca || '';
                document.getElementById('anotacionDepartamento').value = anotacion.departamento || '';
                
                // Show modal
                anotacionModal.classList.add('active');
                
                // Update form to handle edit mode
                const form = document.getElementById('anotacionForm');
                form.setAttribute('data-edit-mode', 'true');
                form.setAttribute('data-anotacion-id', anotacionId);
                
                // Update submit button text
                const submitBtn = form.querySelector('.submit-btn');
                submitBtn.innerHTML = '<i class="fa-solid fa-save"></i><span>Guardar Cambios</span>';
                
                console.log('Anotación cargada para editar:', anotacion);
            } else {
                showNotification('Error', 'Error al cargar la anotación: ' + result.message, 'error');
            }
        } catch (error) {
            console.error(' Error al cargar anotación para editar:', error);
            
            let errorMessage = 'Error de conexión al cargar la anotación.';
            if (error.message.includes('404') || error.message.includes('no encontrada')) {
                errorMessage = 'La anotación solicitada no fue encontrada en el servidor.';
            } else if (error.message.includes('JSON')) {
                errorMessage = 'El servidor devolvió una respuesta inválida.';
            } else if (error.message.includes('fetch')) {
                errorMessage = 'No se pudo conectar con el servidor.';
            }
            
            showNotification('Error de conexión', errorMessage, 'error', 8000);
        }
    }

    async function eliminarAnotacion(anotacionId) {
        if (!confirm('¿Estás seguro de que deseas eliminar esta anotación? Esta acción no se puede deshacer.')) {
            return;
        }
        
        try {
            console.log(' Eliminando anotación:', anotacionId);
            
            // Check server connection first
            const isConnected = await checkServerConnection();
            if (!isConnected) {
                throw new Error('No se puede conectar con el servidor');
            }
            
            const response = await fetch(`${API_URL}/anotaciones/${anotacionId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            
            if (!response.ok) {
                if (response.status === 404) {
                    throw new Error('Anotación no encontrada en el servidor');
                } else {
                    throw new Error(`Error HTTP ${response.status}: ${response.statusText}`);
                }
            }
            
            const result = await response.json();
            
            if (result.success) {
                showNotification('Anotación eliminada', 'La anotación ha sido eliminada exitosamente.', 'success');
                
                // Reload annotations if profile is open
                if (currentProfile) {
                    loadAnotaciones(currentProfile.identificacion);
                }
                
                console.log('Anotación eliminada:', result.data);
            } else {
                showNotification('Error', 'Error al eliminar la anotación: ' + result.message, 'error');
            }
        } catch (error) {
            console.error(' Error al eliminar anotación:', error);
            
            let errorMessage = 'Error de conexión al eliminar la anotación.';
            if (error.message.includes('404') || error.message.includes('no encontrada')) {
                errorMessage = 'La anotación solicitada no fue encontrada en el servidor.';
            } else if (error.message.includes('fetch')) {
                errorMessage = 'No se pudo conectar con el servidor.';
            }
            
            showNotification('Error de conexión', errorMessage, 'error', 8000);
        }
    }

    // Make annotation functions globally available
    window.editarAnotacion = editarAnotacion;
    window.eliminarAnotacion = eliminarAnotacion;
    
    // Setup autocomplete for arrest suspect name
    function setupArrestAutocomplete() {
        console.log('🔧 Configurando autocompletado para arresto...');
        const nombreInput = document.getElementById('arrestNombre');
        const identificacionInput = document.getElementById('arrestIdentificacion');
        
        if (!nombreInput || !identificacionInput) {
            console.error('❌ Campos de arresto no encontrados:', { 
                nombreInput: !!nombreInput, 
                identificacionInput: !!identificacionInput 
            });
            return;
        }
        
        console.log('✅ Campos de arresto encontrados, configurando autocompletado...');
        
        // Get existing dropdown for nombre field
        const nombreDropdown = document.getElementById('arrestNombreDropdown');
        if (!nombreDropdown) {
            console.error('Dropdown de autocompletado no encontrado');
            return;
        }
        
        function fillArrestFormWithFicha(ficha) {
            nombreInput.value = `${ficha.nombre} ${ficha.apellido}` || '';
            identificacionInput.value = ficha.identificacion || '';
            
            // Close dropdown
            nombreDropdown.classList.remove('active');
            nombreDropdown.innerHTML = '';
            
            console.log('Auto-rellenado arresto con ficha:', ficha);
        }
        
        console.log('Autocompletado configurado correctamente');
        console.log('Fichas disponibles:', allFichas ? allFichas.length : 'undefined');
        
        // Setup autocomplete for nombre field
        nombreInput.addEventListener('input', function() {
            const value = this.value.trim().toLowerCase();
            console.log('Escribiendo en nombre:', value);
            
            if (value.length === 0) {
                nombreDropdown.classList.remove('active');
                nombreDropdown.innerHTML = '';
                return;
            }
            
            const matches = (allFichas || []).filter(ficha => {
                const nombreCompleto = `${ficha.nombre} ${ficha.apellido}`.toLowerCase();
                return ficha.nombre.toLowerCase().includes(value) || 
                       ficha.apellido.toLowerCase().includes(value) ||
                       nombreCompleto.includes(value);
            }).slice(0, 5);
            
            console.log('Coincidencias encontradas:', matches.length);
            
            if (matches.length > 0) {
                nombreDropdown.innerHTML = matches.map(ficha => `
                    <div class="autocomplete-item" data-ficha-id="${ficha._id}">
                        <strong>${ficha.nombre} ${ficha.apellido}</strong><br>
                        <small>ID: ${ficha.identificacion} | Edad: ${ficha.edad}</small>
                    </div>
                `).join('');
                nombreDropdown.classList.add('active');
                
                // Add click handlers
                nombreDropdown.querySelectorAll('.autocomplete-item').forEach(item => {
                    item.addEventListener('click', function(e) {
                        e.stopPropagation();
                        const fichaId = this.getAttribute('data-ficha-id');
                        const ficha = (allFichas || []).find(f => f._id === fichaId);
                        if (ficha) {
                            fillArrestFormWithFicha(ficha);
                        }
                    });
                });
            } else {
                nombreDropdown.classList.remove('active');
                nombreDropdown.innerHTML = '';
            }
        });
        
        // Close dropdown when clicking outside
        document.addEventListener('click', function(e) {
            if (!nombreInput.contains(e.target) && !nombreDropdown.contains(e.target)) {
                nombreDropdown.classList.remove('active');
            }
        });
    }
    
    // Make setupArrestAutocomplete globally available
    window.setupArrestAutocomplete = setupArrestAutocomplete;
    
    // Código Penal functionality
    async function loadCodigoPenal() {
        try {
            // Load cargos from database to avoid duplication
            if (allCargos.length === 0) {
                await loadCargos();
            }
            
            // Group cargos by article number
            const articulosData = {};
            
            allCargos.forEach(cargo => {
                const articuloMatch = cargo.codigo.match(/Art\. (\d+)\./);
                if (articuloMatch) {
                    const articuloNum = parseInt(articuloMatch[1]);
                    
                    if (!articulosData[articuloNum]) {
                        articulosData[articuloNum] = {
                            titulo: getArticuloTitle(articuloNum),
                            cargos: []
                        };
                    }
                    
                    articulosData[articuloNum].cargos.push(cargo);
                }
            });
            
            showCodigoPenalContent(articulosData, 1);
            setupCodigoPenalSidebar(articulosData);
            
        } catch (error) {
            console.error('Error loading código penal:', error);
        }
    }
    
    function getArticuloTitle(articuloNum) {
        const titles = {
            1: "De los Delitos de Tránsito",
            2: "Delitos contra el patrimonio", 
            3: "Delitos contra el orden público",
            4: "Delitos contra la vida y la libertad",
            5: "Delitos contra la convivencia civil",
            6: "Delitos contra la salud pública",
            7: "Delitos relacionados con la Adm. P.",
            8: "Delitos Federales"
        };
        return titles[articuloNum] || `Artículo ${articuloNum}`;
    }
    
    function showCodigoPenalContent(articulosData, articuloNum) {
        const articulo = articulosData[articuloNum];
        if (!articulo || !articulo.cargos) {
            document.getElementById('codigoPenalCards').innerHTML = '<p style="color: #fff; text-align: center; padding: 40px;">No hay cargos disponibles para este artículo</p>';
            return;
        }
        
        const cargosHtml = articulo.cargos.map(cargo => `
            <div class="cargo-card">
                <div class="cargo-card-content">
                    <span class="cargo-codigo-text">${cargo.codigo}</span>
                    ${cargo.descripcion}
                </div>
            </div>
        `).join('');
        
        document.getElementById('codigoPenalCards').innerHTML = cargosHtml;
    }
    
    function setupCodigoPenalSidebar(articulosData) {
        const sidebarItems = document.querySelectorAll('.sidebar-item');
        sidebarItems.forEach(item => {
            item.addEventListener('click', function() {
                // Remove active class from all items
                sidebarItems.forEach(sidebarItem => sidebarItem.classList.remove('active'));
                // Add active class to clicked item
                this.classList.add('active');
                
                const articuloNum = parseInt(this.getAttribute('data-articulo'));
                showCodigoPenalContent(articulosData, articuloNum);
            });
        });
    }
    
    // Profile action buttons functionality
    document.addEventListener('click', function(e) {
        if (e.target.id === 'addArrestoBtn' || e.target.closest('#addArrestoBtn')) {
            if (currentProfile) {
                console.log('Abriendo formulario de arresto desde ficha:', currentProfile);
                
                // NUEVA SOLUCIÓN: Modal de arresto al lado del perfil
                // Reducir el ancho del modal de perfil para hacer espacio
                if (profileModal) {
                    profileModal.style.width = '50%';
                    profileModal.style.left = '0';
                    profileModal.style.right = 'auto';
                }
                
                // Mostrar modal de arresto en el lado derecho
                arrestModal.style.display = 'flex';
                arrestModal.style.position = 'fixed';
                arrestModal.style.top = '0';
                arrestModal.style.left = '50%';
                arrestModal.style.right = '0';
                arrestModal.style.bottom = '0';
                arrestModal.style.width = '50%';
                arrestModal.style.zIndex = '3001';
                arrestModal.style.opacity = '1';
                arrestModal.style.visibility = 'visible';
                arrestModal.style.background = 'rgba(0, 0, 0, 0.95)';
                arrestModal.classList.add('active');
                
                // Ajustar el contenedor del modal para el espacio reducido
                const arrestContainer = arrestModal.querySelector('.form-container');
                if (arrestContainer) {
                    arrestContainer.style.width = '95%';
                    arrestContainer.style.maxWidth = 'none';
                    arrestContainer.style.margin = '20px auto';
                }
                
                console.log('Modal de arresto mostrado al lado del perfil');
                
                // Clear form first
                arrestForm.reset();
                selectedCargos = [];
                updateSelectedCargosDisplay();
                updateMultiSelectPlaceholder();
                
                // Pre-fill arrest form with current profile data
                setTimeout(() => {
                    document.getElementById('arrestNombre').value = `${currentProfile.nombre} ${currentProfile.apellido}` || '';
                    document.getElementById('arrestIdentificacion').value = currentProfile.identificacion || '';
                    
                    // Set current date and time
                    const now = new Date();
                    document.getElementById('fechaArresto').value = now.toISOString().split('T')[0];
                    document.getElementById('horaArresto').value = now.toTimeString().slice(0, 5);
                }, 100);
                
                // Load cargos and initialize multi-select
                if (allCargos.length === 0) {
                    console.log('🔄 Cargando cargos para multi-select...');
                    loadCargos().then(() => {
                        console.log('✅ Cargos cargados, inicializando multi-select...');
                        setTimeout(() => {
                            console.log('🔧 Inicializando multi-select después de cargar cargos...');
                            initializeMultiSelect();
                        }, 500);
                    });
                } else {
                    console.log('✅ Cargos ya cargados, inicializando multi-select...');
                    setTimeout(() => {
                        console.log('🔧 Inicializando multi-select con cargos existentes...');
                        initializeMultiSelect();
                    }, 500);
                }
                
                // Setup autocomplete for arrest form
                if (!allFichas || allFichas.length === 0) {
                    loadFichas().then(() => {
                        setupArrestAutocomplete();
                    }).catch(error => {
                        console.error('Error loading fichas for autocomplete:', error);
                        setupArrestAutocomplete();
                    });
                } else {
                    setupArrestAutocomplete();
                }
            }
        }
        
        if (e.target.id === 'addByCBtn' || e.target.closest('#addByCBtn')) {
            if (currentProfile) {
                console.log('Abriendo formulario de ByC desde ficha:', currentProfile);

                // Clear form first
                bycForm.reset();

                // Pre-fill ByC form with current profile data
                setTimeout(() => {
                    const nombreCompleto = `${currentProfile.nombre || ''} ${currentProfile.apellido || ''}`.trim();
                    document.getElementById('bycNombreCompleto').value = nombreCompleto;
                    document.getElementById('bycIdentificacion').value = currentProfile.identificacion || '';

                    // Focus on description field
                    document.getElementById('bycDescripcionHechos')?.focus();

                    console.log('ByC form pre-filled with profile data');
                }, 100);
            }
        }
        
        if (e.target.id === 'addAnotacionBtn' || e.target.closest('#addAnotacionBtn')) {
            if (currentProfile) {
                console.log('Abriendo formulario de anotación desde ficha:', currentProfile);
                closeAllPanels();
                anotacionModal.classList.add('active');
                
                // Clear form first
                anotacionForm.reset();
                
                // Pre-fill annotation form with current profile data
                setTimeout(() => {
                    document.getElementById('anotacionNombre').value = currentProfile.nombre || '';
                    document.getElementById('anotacionApellido').value = currentProfile.apellido || '';
                    document.getElementById('anotacionIdentificacion').value = currentProfile.identificacion || '';
                }, 100);
            }
        }
    });
    
    // Profile tabs functionality - Initialize when profile modal is shown
    function initializeProfileTabs() {
        const tabButtons = document.querySelectorAll('.tab-btn-new');
        const tabContents = document.querySelectorAll('.tab-content-new');

        if (tabButtons.length === 0 || tabContents.length === 0) {
            console.warn('Tab elements not found, retrying...');
            setTimeout(initializeProfileTabs, 100);
            return;
        }

        console.log('Initializing profile tabs...');

        // Set first tab as active by default if none are active
        const activeTabs = document.querySelectorAll('.tab-btn-new.active');
        if (activeTabs.length === 0 && tabButtons.length > 0) {
            tabButtons[0].classList.add('active');
            const firstTabContent = document.getElementById(`${tabButtons[0].getAttribute('data-tab')}Tab`);
            if (firstTabContent) {
                firstTabContent.classList.add('active');
            }
        }

        tabButtons.forEach(button => {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();

                const tabName = this.getAttribute('data-tab');
                console.log('Tab clicked:', tabName);

                // Remove active class from all tabs
                tabButtons.forEach(btn => btn.classList.remove('active'));
                tabContents.forEach(content => content.classList.remove('active'));

                // Add active class to clicked tab
                this.classList.add('active');

                // Find and show corresponding tab content
                const targetTab = document.getElementById(`${tabName}Tab`);
                if (targetTab) {
                    targetTab.classList.add('active');
                    console.log('Tab content shown:', tabName);
                } else {
                    console.error('Tab content not found:', `${tabName}Tab`);
                }
            });
        });

        console.log('Profile tabs initialized successfully');
    }

    // Setup BOLO form functionality
    document.getElementById('boloTipo')?.addEventListener('change', function() {
        const tipoSeleccionado = this.value;
        const generoField = document.getElementById('boloGenero').closest('.form-group');
        const razaField = document.getElementById('boloRaza').closest('.form-group');

        if (tipoSeleccionado === 'Persona') {
            // Mostrar campos de género y raza solo para personas
            generoField.style.display = 'block';
            razaField.style.display = 'block';
        } else {
            // Ocultar campos para vehículos u opción por defecto
            generoField.style.display = 'none';
            razaField.style.display = 'none';

            // Limpiar valores si los había
            document.getElementById('boloGenero').value = '';
            document.getElementById('boloRaza').value = '';
        }
    });

    // Initialize BOLO form on modal open
    boloModal?.addEventListener('transitionend', function() {
        if (this.classList.contains('active')) {
            // Trigger change event to apply current selection (which will hide fields by default)
            const boloTipoSelect = document.getElementById('boloTipo');
            if (boloTipoSelect) {
                boloTipoSelect.dispatchEvent(new Event('change'));
            }
        }
    });
    
    // Prevent modals from closing when clicking inside
    searchModal?.addEventListener('click', function(e) {
        if (e.target === searchModal) {
            searchModal.classList.remove('active');
            searchForm.reset();
            document.getElementById('searchResults').innerHTML = '';
        }
    });
    
    document.querySelector('.search-modal-container')?.addEventListener('click', function(e) {
        e.stopPropagation();
    });
    
    profileModal?.addEventListener('click', function(e) {
        e.stopPropagation(); // Prevent closing when clicking inside
    });
    
    document.querySelector('.profile-container-new')?.addEventListener('click', function(e) {
        e.stopPropagation();
    });
    
    // ==================== SISTEMA DE MODALES SIMPLIFICADO ====================
    
    // ==================== FUNCIONES DE UTILIDAD ====================
    
    
    
    // ==================== SISTEMA SIMPLIFICADO COMPLETADO ====================
});

// ==================== FUNCIONES GLOBALES ====================
// Make functions globally available for onclick handlers
window.verDetalleByC = async function(bycId) {
    try {
        console.log('🔍 Cargando detalles del ByC:', bycId);
        console.log('🌐 URL completa:', `http://localhost:3000/api/byc/${bycId}`);
        
        const response = await fetch(`http://localhost:3000/api/byc/${bycId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        
        console.log('📥 Respuesta del servidor:', response.status, response.statusText);
        
        if (!response.ok) {
            if (response.status === 404) {
                throw new Error('ByC no encontrado en el servidor');
            } else {
                throw new Error(`Error HTTP ${response.status}: ${response.statusText}`);
            }
        }
        
        const result = await response.json();
        console.log('📄 Datos de respuesta:', result);
        
        if (result.success) {
            const byc = result.data;
            showByCDetail(byc);
        } else {
            showNotification('Error', 'Error al cargar los detalles del ByC: ' + result.message, 'error');
        }
    } catch (error) {
        console.error('❌ Error al cargar detalles del ByC:', error);
        
        let errorMessage = 'Error de conexión al cargar los detalles del ByC.';
        if (error.message.includes('404') || error.message.includes('no encontrado')) {
            errorMessage = 'El ByC solicitado no fue encontrado en el servidor.';
        } else if (error.message.includes('JSON')) {
            errorMessage = 'El servidor devolvió una respuesta inválida. Verifica que el servidor esté funcionando correctamente.';
        } else if (error.message.includes('fetch')) {
            errorMessage = 'No se pudo conectar con el servidor. Verifica que esté corriendo en http://localhost:3000';
        }
        
        showNotification('Error de conexión', errorMessage, 'error', 8000);
    }
};

window.marcarByCCompletado = async function(bycId) {
    try {
        console.log('✅ Marcando ByC como completado:', bycId);
        
        const response = await fetch(`http://localhost:3000/api/byc/${bycId}/completar`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        
        const result = await response.json();
        
        if (result.success) {
            showNotification('Éxito', 'ByC marcado como completado exitosamente', 'success');
            
            // Reload ByC data
            const currentProfile = window.currentProfile;
            if (currentProfile && currentProfile.identificacion) {
                loadByC(currentProfile.identificacion);
            }
            
            // Close the detail modal
            const bycDetailModal = document.getElementById('bycDetailModal');
            if (bycDetailModal) {
                bycDetailModal.classList.remove('active');
            }
        } else {
            showNotification('Error', 'Error al marcar el ByC como completado: ' + result.message, 'error');
        }
    } catch (error) {
        console.error('❌ Error al marcar ByC como completado:', error);
        showNotification('Error de conexión', 'Error de conexión al marcar el ByC como completado.', 'error');
    }
};

// Helper function to show ByC detail (needs to be global too)
window.showByCDetail = function(byc) {
    const fecha = new Date(byc.fechaCreacion);
    const fechaFormateada = fecha.toLocaleDateString('es-ES', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
    });
    
    const fechaCreacionFormateada = fecha.toLocaleString('es-ES', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit'
    });
    
    const estadoClass = byc.estado === 'Activo' ? 'activo' : 
                       byc.estado === 'Resuelto' ? 'resuelto' : 'inactivo';
    const estadoTexto = byc.estado === 'Activo' ? 'Activo' : 
                       byc.estado === 'Resuelto' ? 'Completado' : 'Inactivo';
    
    const detailContent = `
        <div class="byc-header">
            <div class="byc-header-left">
                <h2>Búsqueda y Captura - ByC</h2>
                <p>
                    <i class="fa-regular fa-calendar"></i>
                    ${fechaFormateada}
                </p>
            </div>
            <div class="byc-header-right">
                <div class="byc-status-indicator ${estadoClass}">
                    <div class="byc-status-dot ${estadoClass}"></div>
                    <span>${estadoTexto}</span>
                </div>
            </div>
        </div>
        
        <div class="detail-section">
            <h3>
                <i class="fa-solid fa-user"></i>
                Información del sospechoso
            </h3>
            <div class="detail-grid">
                <div class="detail-item">
                    <div class="detail-label">Nombre_Apellido</div>
                    <div class="detail-value">${byc.nombreCompleto}</div>
                </div>
                <div class="detail-item">
                    <div class="detail-label">Identificación</div>
                    <div class="detail-value">#${byc.identificacion}</div>
                </div>
            </div>
        </div>
        
        <div class="detail-section">
            <h3>
                <i class="fa-solid fa-file-lines"></i>
                Descripción de los hechos
            </h3>
            <div class="detail-content">
                <div class="detail-text">${byc.descripcionHechos}</div>
            </div>
        </div>
        
        <div class="detail-section">
            <h3>
                <i class="fa-solid fa-shield-alt"></i>
                Información del oficial
            </h3>
            <div class="detail-grid">
                <div class="detail-item">
                    <div class="detail-label">Nombre_Apellido</div>
                    <div class="detail-value">Sistema_Automático</div>
                </div>
                <div class="detail-item">
                    <div class="detail-label">Identificación</div>
                    <div class="detail-value">#SYS</div>
                </div>
                <div class="detail-item">
                    <div class="detail-label">Fecha de creación</div>
                    <div class="detail-value">${fechaCreacionFormateada}</div>
                </div>
            </div>
        </div>
        
        <div class="detail-section">
            <h3>
                <i class="fa-solid fa-clock"></i>
                Información del Sistema
            </h3>
            <div class="detail-grid">
                <div class="detail-item">
                    <div class="detail-label">Fecha de Creación</div>
                    <div class="detail-value">${fechaCreacionFormateada}</div>
                </div>
                <div class="detail-item">
                    <div class="detail-label">ID del ByC</div>
                    <div class="detail-value">${byc._id}</div>
                </div>
            </div>
        </div>
        
        ${byc.estado === 'Activo' ? `
        <div class="detail-actions">
            <button class="completar-byc-btn" onclick="marcarByCCompletado('${byc._id}')">
                <i class="fa-solid fa-check-circle"></i>
                Marcar como completado
            </button>
        </div>
        ` : ''}
    `;
    
    const bycDetailContent = document.getElementById('bycDetailContent');
    if (bycDetailContent) {
        bycDetailContent.innerHTML = detailContent;
    }
    
    // Close all panels and show modal
    if (typeof closeAllPanels === 'function') {
        closeAllPanels();
    }
    
    const bycDetailModal = document.getElementById('bycDetailModal');
    if (bycDetailModal) {
        bycDetailModal.classList.add('active');
    }
};

// Make other necessary functions globally available
window.closeAllPanels = function() {
    console.log('🔄 Cerrando todos los paneles...');
    
    // Close all modals with a single query
    const modals = document.querySelectorAll('.form-modal, .profile-modal, .search-modal');
    console.log('🔍 Encontrados', modals.length, 'modales para cerrar');
    
    modals.forEach(modal => {
        modal.classList.remove('active');
        modal.style.display = 'none';
        console.log('✅ Modal cerrado:', modal.id);
    });
    
    // Close panels
    const startMenu = document.getElementById('startMenu');
    const searchPanel = document.getElementById('searchPanel');
    const notificationsPanel = document.getElementById('notificationsPanel');
    
    if (startMenu) {
        startMenu.classList.remove('active');
        console.log('✅ Start menu cerrado');
    }
    if (searchPanel) {
        searchPanel.classList.remove('active');
        console.log('✅ Search panel cerrado');
    }
    if (notificationsPanel) {
        notificationsPanel.classList.remove('active');
        console.log('✅ Notifications panel cerrado');
    }
    
    console.log('✅ Todos los paneles cerrados');
};

// Function to open modal without closing others (for OS-like behavior)
window.openModal = function(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        // Set a high z-index to appear on top
        const currentZIndex = Math.max(...Array.from(document.querySelectorAll('.form-modal, .profile-modal, .search-modal'))
            .map(m => parseInt(window.getComputedStyle(m).zIndex) || 0)) + 1;
        
        modal.style.zIndex = currentZIndex;
        modal.classList.add('active');
        modal.style.display = 'flex';
        
        // Make it draggable
        makeModalDraggable(modal);
        
        console.log('✅ Modal abierto:', modalId, 'con z-index:', currentZIndex);
    } else {
        console.error('❌ Modal no encontrado:', modalId);
    }
};

window.showNotification = function(title, message, type = 'info', duration = 5000) {
    const notificationsPanel = document.getElementById('notificationsPanel');
    if (!notificationsPanel) return;
    
    const notification = document.createElement('div');
    notification.className = `notification-item ${type}`;
    
    const icons = {
        success: 'fa-check-circle',
        error: 'fa-exclamation-circle',
        warning: 'fa-exclamation-triangle',
        info: 'fa-info-circle'
    };
    
    const icon = icons[type] || icons.info;
    
    notification.innerHTML = `
        <div class="notification-icon">
            <i class="fa-solid ${icon}"></i>
        </div>
        <div class="notification-text">
            <strong>${title}</strong>
            <p>${message}</p>
        </div>
        <button class="notification-close" onclick="this.parentElement.remove()">
            <i class="fa-solid fa-times"></i>
        </button>
    `;
    
    notificationsPanel.appendChild(notification);
    
    // Auto remove after duration
    setTimeout(() => {
        if (notification.parentElement) {
            notification.remove();
        }
    }, duration);
};

// Make loadByC globally available
window.loadByC = async function(identificacion) {
    try {
        const response = await fetch(`http://localhost:3000/api/byc/persona/${identificacion}`);
        const result = await response.json();
        
        const bycGrid = document.getElementById('bycGrid');
        if (!bycGrid) return;
        
        if (result.success && result.data.length > 0) {
            bycGrid.innerHTML = result.data.map(byc => {
                const fecha = new Date(byc.fechaCreacion);
                const fechaFormateada = fecha.toLocaleDateString('es-ES', {
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit'
                });
                
                const estadoClass = byc.estado === 'Activo' ? 'activo' : 
                                   byc.estado === 'Resuelto' ? 'resuelto' : 'inactivo';
                const estadoTexto = byc.estado === 'Activo' ? 'Activo' : 
                                   byc.estado === 'Resuelto' ? 'Completado' : 'Inactivo';
                
                return `
                    <div class="byc-card-new" data-status="${estadoClass}" onclick="verDetalleByC('${byc._id}')">
                        <div class="byc-card-indicator">
                            <span class="byc-indicator-emoji">${estadoClass === 'activo' ? '🟢' : estadoClass === 'resuelto' ? '✅' : '🔴'}</span>
                        </div>
                        <div class="byc-card-content">
                            <div class="byc-card-title">${byc.nombreCompleto}</div>
                            <div class="byc-card-subtitle">${byc.descripcionHechos}</div>
                        </div>
                        <div class="byc-card-count">
                            <span class="byc-count-number">${fechaFormateada}</span>
                        </div>
                    </div>
                `;
            }).join('');
        } else {
            bycGrid.innerHTML = '<p class="no-data-new">No hay búsquedas y capturas registradas</p>';
        }
    } catch (error) {
        console.error('❌ Error loading ByC:', error);
        const bycGrid = document.getElementById('bycGrid');
        if (bycGrid) {
            bycGrid.innerHTML = '<p class="no-data-new">Error al cargar búsquedas y capturas</p>';
        }
    }
};

// Setup toolbar buttons globally
window.setupToolbarButtons = function() {
    const toolbarButtons = document.querySelectorAll('.toolbar-btn');
    
    if (toolbarButtons.length === 0) {
        console.error('❌ No se encontraron botones de toolbar');
        return;
    }
    
    console.log('🔧 Configurando', toolbarButtons.length, 'botones de toolbar');
    
    // Toggle panel function
    const togglePanel = function(panelId) {
        const panel = document.getElementById(panelId);
        if (!panel) {
            console.error('❌ Panel no encontrado:', panelId);
            return;
        }
        
        const isActive = panel.classList.contains('active');
        closeAllPanels();
        if (!isActive) {
            panel.classList.add('active');
            console.log('✅ Panel abierto:', panelId);
        }
    };
    
    toolbarButtons.forEach((button, index) => {
        button.addEventListener('click', function(e) {
            e.stopPropagation();
            const title = this.getAttribute('title');
            console.log('🖱️ Botón clickeado:', title);
            
            switch(title) {
                case 'Inicio':
                    togglePanel('startMenu');
                    break;
                case 'Buscar':
                    togglePanel('searchPanel');
                    const searchInput = document.getElementById('searchInput');
                    if (searchInput) {
                        setTimeout(() => searchInput.focus(), 100);
                    }
                    break;
                case 'Notificaciones':
                    togglePanel('notificationsPanel');
                    break;
                case 'Crear ficha':
                    console.log('Abriendo formulario de crear ficha...');
                    openModal('formModal');
                    break;
                case 'Buscar ficha':
                    console.log('Abriendo búsqueda de fichas...');
                    openModal('searchModal');
                    break;
                case 'Crear reporte de arresto':
                    console.log('Abriendo formulario de arresto...');
                    openModal('arrestModal');
                    // Clear arrest form first
                    const arrestForm = document.getElementById('arrestForm');
                    if (arrestForm) {
                        arrestForm.reset();
                        // Set current date and time
                        const now = new Date();
                        const fechaInput = document.getElementById('fechaArresto');
                        const horaInput = document.getElementById('horaArresto');
                        if (fechaInput) fechaInput.value = now.toISOString().split('T')[0];
                        if (horaInput) horaInput.value = now.toTimeString().split(' ')[0].substring(0, 5);
                        
                        // Clear personal info fields
                        const nombreInput = document.getElementById('arrestNombre');
                        const idInput = document.getElementById('arrestIdentificacion');
                        if (nombreInput) nombreInput.value = '';
                        if (idInput) idInput.value = '';

                        // Setup autocomplete for arrest form
                        if (window.allFichas && window.allFichas.length === 0) {
                            window.loadFichas().then(() => {
                                window.setupArrestAutocomplete();
                            }).catch(error => {
                                console.error('Error loading fichas for arrest autocomplete:', error);
                                window.setupArrestAutocomplete();
                            });
                        } else {
                            window.setupArrestAutocomplete();
                        }
                    }
                    break;
                 case 'Crear ByC':
                     console.log('Abriendo formulario de ByC...');
                     openModal('bycModal');
                     // Clear ByC form first
                     const bycForm = document.getElementById('bycForm');
                     if (bycForm) {
                         bycForm.reset();
                         // Clear personal info fields
                         const nombreInput = document.getElementById('bycNombreCompleto');
                         const idInput = document.getElementById('bycIdentificacion');
                         const descInput = document.getElementById('bycDescripcionHechos');
                         if (nombreInput) nombreInput.value = '';
                         if (idInput) idInput.value = '';
                         if (descInput) descInput.value = '';

                         // Setup autocomplete for ByC form
                         if (window.allFichas && window.allFichas.length === 0) {
                             window.loadFichas().then(() => {
                                 window.setupByCAutocomplete();
                             }).catch(error => {
                                 console.error('Error loading fichas for ByC autocomplete:', error);
                                 window.setupByCAutocomplete();
                             });
                         } else {
                             window.setupByCAutocomplete();
                         }
                     }
                     break;
                 case 'Crear BOLO':
                    console.log('Abriendo formulario de BOLO...');
                    openModal('boloModal');
                    // Clear BOLO form first
                    const boloForm = document.getElementById('boloForm');
                    if (boloForm) {
                        boloForm.reset();
                        // Clear personal info fields
                        const nombreInput = document.getElementById('boloNombreCompleto');
                        const idInput = document.getElementById('boloIdentificacion');
                        const descInput = document.getElementById('boloDescripcion');
                        if (nombreInput) nombreInput.value = '';
                        if (idInput) idInput.value = '';
                        if (descInput) descInput.value = '';
                    }
                    break;
                 case 'BOLOs Activos':
                     console.log('Abriendo lista de BOLOs activos...');
                     openModal('bolosActivosModal');
                     // Load BOLOs activos
                     loadBolosActivosModal();
                     break;
                case 'Código Penal':
                    console.log('Abriendo Código Penal...');
                    openModal('codigoPenalModal');
                    // Load código penal content
                    loadCodigoPenal();
                    break;
                case 'Zoom':
                    console.log('Funcionalidad de zoom no implementada aún');
                    break;
                default:
                    console.log('Botón no reconocido:', title);
            }
        });
    });
    
    console.log('✅ Toolbar buttons configured');
};

// Test function to verify modals exist
window.testModals = function() {
    console.log('🧪 Probando existencia de modales...');
    
    const modals = [
        'formModal',
        'searchModal', 
        'arrestModal',
        'bycModal',
        'anotacionModal',
        'codigoPenalModal',
        'startMenu',
        'searchPanel',
        'notificationsPanel'
    ];
    
    modals.forEach(modalId => {
        const element = document.getElementById(modalId);
        if (element) {
            console.log('✅', modalId, 'encontrado');
        } else {
            console.error('❌', modalId, 'NO encontrado');
        }
    });
    
    // Test opening a modal
    const formModal = document.getElementById('formModal');
    if (formModal) {
        console.log('🧪 Probando apertura de modal...');
        closeAllPanels();
        formModal.classList.add('active');
        
        // Check if modal is actually visible
        setTimeout(() => {
            const computedStyle = window.getComputedStyle(formModal);
            console.log('🔍 Estado del modal:');
            console.log('- display:', computedStyle.display);
            console.log('- opacity:', computedStyle.opacity);
            console.log('- visibility:', computedStyle.visibility);
            console.log('- z-index:', computedStyle.zIndex);
            console.log('- position:', computedStyle.position);
            
            if (computedStyle.display === 'flex' && computedStyle.opacity === '1') {
                console.log('✅ Modal está visible correctamente');
            } else {
                console.error('❌ Modal NO está visible');
            }
        }, 100);
    }
};

// Simple test to open a modal
window.testOpenModal = function() {
    console.log('🧪 Abriendo modal de prueba...');
    const formModal = document.getElementById('formModal');
    if (formModal) {
        formModal.style.display = 'flex';
        formModal.style.opacity = '1';
        formModal.style.visibility = 'visible';
        formModal.classList.add('active');
        console.log('✅ Modal forzado a abrirse');
    }
};

// ==================== FUNCIONES DEL CÓDIGO PENAL ====================

// Load cargos from database
window.loadCargos = async function() {
    try {
        const response = await fetch('http://localhost:3000/api/cargos');
        const result = await response.json();
        
        if (result.success) {
            window.allCargos = result.data;
            console.log('✅ Cargos cargados:', allCargos.length);
            return allCargos;
        } else {
            console.error('❌ Error al cargar cargos:', result.message);
            return [];
        }
    } catch (error) {
        console.error('❌ Error de conexión al cargar cargos:', error);
        return [];
    }
};

// Load código penal
window.loadCodigoPenal = async function() {
    try {
        console.log('📚 Cargando código penal...');
        
        // Load cargos from database to avoid duplication
        if (!window.allCargos || window.allCargos.length === 0) {
            await loadCargos();
        }
        
        // Group cargos by article number
        const articulosData = {};
        
        window.allCargos.forEach(cargo => {
            // Match both "Art. X." and "Art. X.Y." patterns
            const articuloMatch = cargo.codigo.match(/Art\. (\d+)(?:\.(\d+))?\./);
            if (articuloMatch) {
                const articuloNum = parseInt(articuloMatch[1]);
                
                if (!articulosData[articuloNum]) {
                    articulosData[articuloNum] = {
                        titulo: getArticuloTitle(articuloNum),
                        cargos: []
                    };
                }
                
                articulosData[articuloNum].cargos.push(cargo);
            }
        });
        
        showCodigoPenalContent(articulosData, 1);
        setupCodigoPenalSidebar(articulosData);
        
        console.log('✅ Código penal cargado');
        
    } catch (error) {
        console.error('❌ Error loading código penal:', error);
    }
};

// Get article title
function getArticuloTitle(articuloNum) {
    const titles = {
        1: "De los Delitos de Tránsito",
        2: "Delitos contra el patrimonio", 
        3: "Delitos contra el orden público",
        4: "Delitos contra la vida y la libertad",
        5: "Delitos contra la convivencia civil",
        6: "Delitos contra la salud pública",
        7: "Delitos relacionados con la Adm. P.",
        8: "Delitos Federales"
    };
    return titles[articuloNum] || `Artículo ${articuloNum}`;
}

// Show código penal content
window.showCodigoPenalContent = function(articulosData, articuloNum) {
    const articulo = articulosData[articuloNum];
    const codigoPenalCards = document.getElementById('codigoPenalCards');
    
    if (!codigoPenalCards) {
        console.error('❌ Elemento codigoPenalCards no encontrado');
        return;
    }
    
    if (!articulo || !articulo.cargos) {
        codigoPenalCards.innerHTML = '<p style="color: #fff; text-align: center; padding: 40px;">No hay cargos disponibles para este artículo</p>';
        return;
    }
    
    codigoPenalCards.innerHTML = articulo.cargos.map(cargo => `
        <div class="cargo-card">
            <div class="cargo-card-content">
                <span class="cargo-codigo-text">${cargo.codigo}</span>
                <div style="color: #fff; font-size: 13px; line-height: 1.3; flex-grow: 1; display: flex; align-items: center; text-align: center; overflow: hidden;">
                    ${cargo.descripcion}
                </div>
            </div>
        </div>
    `).join('');
};

// Setup código penal sidebar
window.setupCodigoPenalSidebar = function(articulosData) {
    const sidebarItems = document.querySelectorAll('.sidebar-item');
    sidebarItems.forEach(item => {
        item.addEventListener('click', function() {
            // Remove active class from all items
            sidebarItems.forEach(sidebarItem => sidebarItem.classList.remove('active'));
            
            // Add active class to clicked item
            this.classList.add('active');
            
            // Get article number from data attribute or text
            const articuloNum = parseInt(this.dataset.articulo) || 1;
            showCodigoPenalContent(articulosData, articuloNum);
        });
    });
};

// Function to make modals draggable like OS windows
window.makeModalDraggable = function(modal) {
    if (!modal) return;
        
        // Find the header/title bar
        let header = modal.querySelector('.form-header');
        if (!header) header = modal.querySelector('h2'); // Fallback to h2
        if (!header) {
            console.warn('❌ No se encontró header para:', modal.id);
            return;
        }
        
        // Style the header to indicate it's draggable
        header.style.cursor = 'move';
        header.style.userSelect = 'none';
        header.style.padding = '10px';
        header.title = '🖱️ Arrastra para mover';
        
        let isDragging = false;
        let startX, startY, startLeft, startTop;
        
        header.addEventListener('mousedown', function(e) {
            // Don't drag if clicking on close button
            if (e.target.closest('.close-btn') || e.target.classList.contains('fa-times')) {
                return;
            }
            
            console.log('🖱️ Iniciando arrastre...');
            isDragging = true;
            
            // Get initial positions
            startX = e.clientX;
            startY = e.clientY;
            
            const rect = modal.getBoundingClientRect();
            startLeft = rect.left;
            startTop = rect.top;
            
            // Set modal to fixed position if not already
            modal.style.position = 'fixed';
            modal.style.left = startLeft + 'px';
            modal.style.top = startTop + 'px';
            modal.style.margin = '0';
            
            e.preventDefault();
        });
        
        document.addEventListener('mousemove', function(e) {
            if (!isDragging) return;
            
            const deltaX = e.clientX - startX;
            const deltaY = e.clientY - startY;
            
            const newLeft = startLeft + deltaX;
            const newTop = startTop + deltaY;
            
            // Keep within viewport
            const maxLeft = window.innerWidth - modal.offsetWidth;
            const maxTop = window.innerHeight - modal.offsetHeight;
            
            modal.style.left = Math.max(0, Math.min(newLeft, maxLeft)) + 'px';
            modal.style.top = Math.max(0, Math.min(newTop, maxTop)) + 'px';
        });
        
        document.addEventListener('mouseup', function() {
            if (isDragging) {
                console.log('🖱️ Arrastre terminado');
                isDragging = false;
            }
        });
// ==================== GESTIÓN DE ByC ====================

// Elementos del DOM para gestión de ByC
const bycManagementModal = document.getElementById('bycManagementModal');
const closeBycManagementModal = document.getElementById('closeBycManagementModal');
const openBycManagementBtn = document.getElementById('openBycManagementBtn');
const bycManagementCards = document.getElementById('bycManagementCards');

// Estado actual de la gestión de ByC
let currentBycView = 'activos';

// Función para abrir modal de gestión de ByC
function openBycManagement() {
    bycManagementModal?.classList.add('active');
    loadBycManagementData();
}

// Función para cerrar modal de gestión de ByC
function closeBycManagement() {
    bycManagementModal?.classList.remove('active');
    currentBycView = 'activos';
}

// Función para cargar datos de gestión de ByC
async function loadBycManagementData() {
    try {
        // Cargar estadísticas
        await loadBycEstadisticas();

        // Cargar datos iniciales (activos)
        await loadBycByEstado('activos');

    } catch (error) {
        console.error('❌ Error al cargar datos de gestión de ByC:', error);
    }
}

// Función para cargar estadísticas de ByC
async function loadBycEstadisticas() {
    try {
        const response = await fetch(`${API_URL}/byc/estadisticas`);
        const result = await response.json();

        if (result.success) {
            document.getElementById('activosCount').textContent = result.data.activos;
            document.getElementById('inactivosCount').textContent = result.data.inactivos;
        }
    } catch (error) {
        console.error('❌ Error al cargar estadísticas de ByC:', error);
    }
}

// Función para cargar ByC por estado
async function loadBycByEstado(estado) {
    try {
        let url;
        if (estado === 'activos') {
            url = `${API_URL}/byc/activos`;
        } else if (estado === 'inactivos') {
            url = `${API_URL}/byc/inactivos`;
        } else {
            url = `${API_URL}/byc`;
        }

        const response = await fetch(url);
        const result = await response.json();

        if (result.success) {
            renderBycCards(result.data, estado);
        }
    } catch (error) {
        console.error('❌ Error al cargar ByC por estado:', error);
    }
}

// Función para renderizar tarjetas de ByC
function renderBycCards(bycs, estado) {
    const container = bycManagementCards;
    if (!container) return;

    if (!bycs || bycs.length === 0) {
        container.innerHTML = `
            <div class="no-data-message">
                <i class="fa-solid fa-clipboard-list"></i>
                <p>No hay ByC ${estado === 'activos' ? 'activos' : 'inactivos'} en este momento</p>
            </div>
        `;
        return;
    }

    container.innerHTML = bycs.map(byc => `
        <div class="byc-card ${estado}" data-id="${byc._id}">
            <div class="byc-card-header">
                <div class="byc-status ${byc.estado.toLowerCase()}">
                    <span class="status-indicator"></span>
                    <span class="status-text">${byc.estado}</span>
                </div>
                <div class="byc-actions">
                    <button class="byc-btn view" title="Ver detalle" onclick="viewBycDetail('${byc._id}')">
                        <i class="fa-solid fa-eye"></i>
                    </button>
                    ${byc.estado === 'Activo' ? `
                        <button class="byc-btn complete" title="Marcar como completado" onclick="completeByc('${byc._id}')">
                            <i class="fa-solid fa-check"></i>
                        </button>
                    ` : ''}
                    <button class="byc-btn edit" title="Editar" onclick="editByc('${byc._id}')">
                        <i class="fa-solid fa-edit"></i>
                    </button>
                </div>
            </div>
            <div class="byc-card-content">
                <h3 class="byc-nombre">${byc.nombreCompleto}</h3>
                <p class="byc-id"><strong>ID:</strong> ${byc.identificacion}</p>
                <p class="byc-descripcion">${byc.descripcionHechos}</p>
                <div class="byc-meta">
                    <span class="byc-fecha">
                        <i class="fa-solid fa-calendar"></i>
                        ${new Date(byc.fechaCreacion).toLocaleDateString()}
                    </span>
                </div>
            </div>
        </div>
    `).join('');
}

// Función para cambiar de vista en el sidebar
function changeBycView(estado) {
    // Actualizar clases active en sidebar
    document.querySelectorAll('.byc-management-sidebar .sidebar-item').forEach(item => {
        item.classList.remove('active');
    });
    document.querySelector(`[data-estado="${estado}"]`).classList.add('active');

    // Cargar datos correspondientes
    loadBycByEstado(estado);
    currentBycView = estado;
}

// Función para ver detalle de ByC
async function viewBycDetail(bycId) {
    try {
        const response = await fetch(`${API_URL}/byc/${bycId}`);
        const result = await response.json();

        if (result.success) {
            showBycDetailModal(result.data);
        }
    } catch (error) {
        console.error('❌ Error al obtener detalle de ByC:', error);
    }
}

// Función para mostrar modal de detalle de ByC
function showBycDetailModal(byc) {
    const modal = document.getElementById('bycDetailModal');
    const content = document.getElementById('bycDetailContent');

    if (!modal || !content) return;

    content.innerHTML = `
        <div class="byc-detail-section">
            <h3>Información General</h3>
            <div class="byc-detail-grid">
                <div class="detail-row">
                    <span class="detail-label">Nombre Completo:</span>
                    <span class="detail-value">${byc.nombreCompleto}</span>
                </div>
                <div class="detail-row">
                    <span class="detail-label">Identificación:</span>
                    <span class="detail-value">${byc.identificacion}</span>
                </div>
                <div class="detail-row">
                    <span class="detail-label">Estado:</span>
                    <span class="detail-value status-${byc.estado.toLowerCase()}">${byc.estado}</span>
                </div>
                <div class="detail-row">
                    <span class="detail-label">Fecha de Creación:</span>
                    <span class="detail-value">${new Date(byc.fechaCreacion).toLocaleString()}</span>
                </div>
            </div>
        </div>
        <div class="byc-detail-section">
            <h3>Descripción de los Hechos</h3>
            <p class="byc-descripcion-detail">${byc.descripcionHechos}</p>
        </div>
    `;

    modal.classList.add('active');
}

// Función para completar ByC
async function completeByc(bycId) {
    try {
        const response = await fetch(`${API_URL}/byc/${bycId}/completar`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const result = await response.json();

        if (result.success) {
            showNotification('ByC Completado', 'El ByC ha sido marcado como completado exitosamente', 'success');
            // Recargar datos actuales
            loadBycByEstado(currentBycView);
            loadBycEstadisticas();
        }
    } catch (error) {
        console.error('❌ Error al completar ByC:', error);
        showNotification('Error', 'Error al completar el ByC', 'error');
    }
}

// Función para editar imagen de ByC
async function editBycImage(bycId, event) {
    event.stopPropagation(); // Evitar que se dispare el onclick de la tarjeta

    try {
        // Obtener datos actuales del ByC
        const response = await fetch(`${API_URL}/byc/${bycId}`);
        const result = await response.json();

        if (result.success) {
            const byc = result.data;
            showImageEditModal(byc, 'byc');
        }
    } catch (error) {
        console.error('❌ Error al obtener datos del ByC:', error);
        showNotification('Error', 'Error al cargar los datos del ByC', 'error');
    }
}

// Función para mostrar modal de edición de imagen
function showImageEditModal(data, type = 'byc') {
    // Crear modal si no existe
    let modal = document.getElementById('imageEditModal');
    if (!modal) {
        modal = document.createElement('div');
        modal.id = 'imageEditModal';
        modal.className = 'image-edit-modal';
        modal.innerHTML = `
            <div class="image-edit-container">
                <div class="image-edit-header">
                    <h3><i class="fa-solid fa-camera"></i>Editar Imagen</h3>
                    <p>Agrega o cambia la imagen usando un enlace de Imgur</p>
                </div>
                <form class="image-edit-form" id="imageEditForm">
                    <div class="image-edit-input-group">
                        <label class="image-edit-label" for="imageUrl">URL de Imgur:</label>
                        <input type="url" class="image-edit-input" id="imageUrl" name="imageUrl"
                               placeholder="https://i.imgur.com/xxxxx.jpg"
                               value="${data.imagenUrl || ''}">
                    </div>
                    <div class="image-edit-preview">
                        <p>Vista previa:</p>
                        <img id="imagePreview" src="${data.imagenUrl || ''}" alt="Preview"
                             style="${data.imagenUrl ? 'display: block;' : 'display: none;'}">
                        <div id="imagePreviewError" style="display: none;">
                            <i class="fa-solid fa-exclamation-triangle"></i>
                            <span>Error al cargar la imagen</span>
                        </div>
                    </div>
                    <div class="image-edit-buttons">
                        <button type="button" class="image-edit-btn cancel" onclick="closeImageEditModal()">
                            Cancelar
                        </button>
                        <button type="submit" class="image-edit-btn save">
                            Guardar Imagen
                        </button>
                    </div>
                </form>
            </div>
        `;
        document.body.appendChild(modal);

        // Configurar evento de cambio en el input para previsualizar
        document.getElementById('imageUrl').addEventListener('input', function() {
            const url = this.value.trim();
            const previewImg = document.getElementById('imagePreview');
            const errorDiv = document.getElementById('imagePreviewError');

            if (url) {
                previewImg.src = url;
                previewImg.style.display = 'block';
                previewImg.onerror = function() {
                    previewImg.style.display = 'none';
                    errorDiv.style.display = 'block';
                };
                previewImg.onload = function() {
                    errorDiv.style.display = 'none';
                    previewImg.style.display = 'block';
                };
            } else {
                previewImg.style.display = 'none';
                errorDiv.style.display = 'none';
            }
        });
    }

    // Actualizar datos del modal
    document.getElementById('imageUrl').value = data.imagenUrl || '';

    // Mostrar modal
    modal.classList.add('active');

    // Configurar envío del formulario
    const form = document.getElementById('imageEditForm');
    form.onsubmit = async function(e) {
        e.preventDefault();
        if (type === 'profile') {
            await saveProfileImage(data._id || data.id);
        } else {
            await saveBycImage(data._id);
        }
    };
}

// Función para cerrar modal de edición de imagen
function closeImageEditModal() {
    const modal = document.getElementById('imageEditModal');
    if (modal) {
        modal.classList.remove('active');
    }
}

// Función para guardar imagen de perfil
async function saveProfileImage(personaId) {
    const imageUrlInput = document.getElementById('imageUrl');
    const imageUrl = imageUrlInput.value.trim();

    // Validar URL
    if (imageUrl && !isValidImageUrl(imageUrl)) {
        showNotification('URL Inválida', 'Por favor ingresa una URL válida de imagen (jpg, png, gif)', 'warning');
        return;
    }

    try {
        const response = await fetch(`${API_URL}/persona/${personaId}/imagen`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                imagenUrl: imageUrl || null
            })
        });

        const result = await response.json();

        if (result.success) {
            showNotification('Imagen Actualizada', 'La imagen de perfil ha sido actualizada exitosamente', 'success');
            closeImageEditModal();

            // Recargar datos del perfil para reflejar cambios
            if (typeof loadProfile === 'function') {
                loadProfile();
            }
        } else {
            showNotification('Error', result.message || 'Error al actualizar la imagen', 'error');
        }
    } catch (error) {
        console.error('❌ Error al guardar imagen del perfil:', error);
        showNotification('Error', 'Error de conexión al guardar la imagen', 'error');
    }
}

// Función para validar URL de imagen
function isValidImageUrl(url) {
    try {
        const parsedUrl = new URL(url);
        const supportedExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp'];
        const pathname = parsedUrl.pathname.toLowerCase();
        return supportedExtensions.some(ext => pathname.includes(ext));
    } catch {
        return false;
    }
}

// Cerrar modal de imagen al hacer clic fuera
document.addEventListener('click', function(e) {
    const modal = document.getElementById('imageEditModal');
    if (modal && modal.classList.contains('active') && e.target === modal) {
        closeImageEditModal();
    }
});

// Cerrar modal con tecla Escape
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeImageEditModal();
    }
});

// Función para editar imagen de perfil
async function editProfileImage(personaId) {
    try {
        // Obtener datos actuales de la persona
        const response = await fetch(`${API_URL}/persona/${personaId}`);
        const result = await response.json();

        if (result.success) {
            const persona = result.data;
            showImageEditModal(persona, 'profile');
        }
    } catch (error) {
        console.error('❌ Error al obtener datos de la persona:', error);
        showNotification('Error', 'Error al cargar los datos de la persona', 'error');
    }
}
openBycManagementBtn?.addEventListener('click', openBycManagement);
closeBycManagementModal?.addEventListener('click', closeBycManagement);

// Event listeners para gestión de ByC
document.querySelectorAll('.byc-management-sidebar .sidebar-item').forEach(item => {
    item.addEventListener('click', function() {
        const estado = this.getAttribute('data-estado');
        if (estado && estado !== 'estadisticas') {
            changeBycView(estado);
        }
    });
});

// Event listener para botón de edición de imagen de perfil
document.addEventListener('DOMContentLoaded', function() {
    const editBtn = document.getElementById('editProfileImageBtn');
    if (editBtn) {
        editBtn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();

            console.log('🖱️ Botón de edición de imagen clickeado');

            // Obtener el ID de la persona actual del perfil
            const profileModal = document.getElementById('profileModal');
            if (profileModal && profileModal.dataset.personaId) {
                const personaId = profileModal.dataset.personaId;
                console.log('📸 Abriendo editor de imagen para persona:', personaId);
                editProfileImage(personaId);
            } else {
                console.error('❌ No se pudo identificar la persona del perfil');
                showNotification('Error', 'No se pudo identificar la persona del Perfil', 'error');
            }
        });
        console.log('✅ Event listener del botón de edición conectado');
    } else {
        console.warn('⚠️ Botón de edición de imagen no encontrado');
    }
});

// Función para mostrar modal de perfil
function showProfileModal(personaId) {
    const profileModal = document.getElementById('profileModal');
    if (profileModal) {
        console.log('🖼️ Abriendo modal de perfil para persona ID:', personaId);

        // Establecer el ID de la persona en el modal
        profileModal.dataset.personaId = personaId;

        // Cargar datos de la persona
        loadProfileData(personaId);

        // Mostrar el modal
        profileModal.classList.add('active');
    } else {
        console.error('❌ Modal de perfil no encontrado');
    }
}

// Función básica para cargar datos del perfil
async function loadProfileData(personaId) {
    try {
        const response = await fetch(`${API_URL}/persona/${personaId}`);
        const result = await response.json();

        if (result.success) {
            const persona = result.data;
            displayProfileData(persona);
        } else {
            console.error('Error al cargar datos del perfil:', result.message);
        }
    } catch (error) {
        console.error('❌ Error al cargar datos del perfil:', error);
    }
}

// Función básica para mostrar datos del perfil
function displayProfileData(persona) {
    const profileModal = document.getElementById('profileModal');
    if (!profileModal) {
        console.error('❌ Modal de perfil no encontrado');
        return;
    }

    // Actualizar información básica
    const nombreElement = document.getElementById('profileFullNameSidebar');
    const idElement = document.getElementById('profileMUJADSidebar');

    if (nombreElement) nombreElement.textContent = persona.nombreCompleto || 'Nombre no disponible';
    if (idElement) idElement.textContent = `#${persona.identificacion || 'ID no disponible'}`;

    // Actualizar imagen si existe
    const profileImage = document.getElementById('profileImage');
    const profileImageFrame = document.getElementById('profileImageFrame');

    if (profileImage && profileImageFrame) {
        if (persona.imagenUrl) {
            console.log('🖼️ Mostrando imagen de perfil:', persona.imagenUrl);
            // Mostrar imagen de Imgur
            profileImage.src = persona.imagenUrl;
            profileImage.style.display = 'block';
            profileImageFrame.style.display = 'none';

            // Manejar errores de carga de imagen
            profileImage.onerror = function() {
                console.warn('❌ Error al cargar imagen de perfil, mostrando placeholder');
                profileImage.style.display = 'none';
                profileImageFrame.style.display = 'flex';
            };

            profileImage.onload = function() {
                console.log('✅ Imagen de perfil cargada correctamente');
            };
        } else {
            console.log('📷 No hay imagen, mostrando placeholder');
            // Mostrar placeholder cuando no hay imagen
            profileImage.style.display = 'none';
            profileImageFrame.style.display = 'flex';
        }
    }

    console.log('✅ Datos del perfil mostrados:', persona.nombreCompleto);
}
openBycManagementBtn?.addEventListener('click', openBycManagement);
closeBycManagementModal?.addEventListener('click', closeBycManagement);

document.querySelectorAll('.byc-management-sidebar .sidebar-item').forEach(item => {
    item.addEventListener('click', function() {
        const estado = this.getAttribute('data-estado');
        if (estado && estado !== 'estadisticas') {
            changeBycView(estado);
        }
    });
});

// Cerrar modal al hacer clic fuera
bycManagementModal?.addEventListener('click', function(e) {
    if (e.target === this) {
        closeBycManagement();
    }
});

console.log('✅ Funcionalidad de gestión de ByC inicializada');

}
