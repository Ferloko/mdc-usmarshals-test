# 🚀 Guía Rápida - Conectar y Usar la Base de Datos

## ✅ Paso 1: Configurar MongoDB Atlas (Ya lo tienes)

Tu conexión de MongoDB Atlas:
- **Usuario**: `ferlokgm_db_user`
- **Cluster**: `cluster0.2rcjy46.mongodb.net`
- **Base de datos**: `mdc_database`

## 🔑 Paso 2: Agregar tu contraseña

1. Abre el archivo: `server\.env`
2. Busca la línea que dice:
   ```
   MONGODB_URI=mongodb+srv://ferlokgm_db_user:<db_password>@cluster0...
   ```
3. Reemplaza `<db_password>` con tu contraseña real
4. Guarda el archivo

**Ejemplo:**
```env
PORT=3000
MONGODB_URI=mongodb+srv://ferlokgm_db_user:MiPassword123@cluster0.2rcjy46.mongodb.net/mdc_database?retryWrites=true&w=majority&appName=Cluster0
```

## 🌐 Paso 3: Configurar acceso en MongoDB Atlas

1. Ve a https://cloud.mongodb.com/
2. Inicia sesión
3. Ve a **Network Access** (menú izquierdo)
4. Haz clic en **"Add IP Address"**
5. Selecciona **"Allow Access from Anywhere"** (0.0.0.0/0)
6. Haz clic en **"Confirm"**

## 🚀 Paso 4: Iniciar el servidor

Abre una terminal en la carpeta `server` y ejecuta:

```bash
cd server
npm start
```

Deberías ver:
```
🚀 Servidor corriendo en http://localhost:3000
✅ Conectado a MongoDB
```

## 🖥️ Paso 5: Usar la aplicación

1. Abre el archivo `index.html` en tu navegador
2. Haz clic en el botón de **Inicio** (icono de Windows) en la barra inferior
3. Selecciona **"Añadir ficha gubernamental"**
4. Llena el formulario:
   - **Nombre**: Juan
   - **Apellido**: Pérez
   - **Identificación**: 12345678
   - **Teléfono**: 555-1234
   - **Edad**: 30
   - **Género**: Masculino
   - **Residencia**: Los Santos
   - **Raza**: Hispano
5. Haz clic en **"Enviar"**

## 📊 Paso 6: Ver los datos en MongoDB Atlas

1. Ve a https://cloud.mongodb.com/
2. Haz clic en **"Browse Collections"** en tu cluster
3. Verás la base de datos **"mdc_database"**
4. Dentro verás la colección **"fichas"** con todos los registros

## 🔧 Comandos útiles

### Probar la conexión a MongoDB
```bash
cd server
npm run test-connection
```

### Iniciar el servidor en modo desarrollo (con auto-reload)
```bash
cd server
npm run dev
```

### Ver todos los registros (usando la API)
Abre en tu navegador:
```
http://localhost:3000/api/fichas
```

### Buscar por identificación
```
http://localhost:3000/api/fichas/buscar/12345678
```

### Verificar que el servidor funciona
```
http://localhost:3000/api/health
```

## 📝 Editar/Eliminar registros

### Opción 1: Desde MongoDB Atlas (Interfaz visual)
1. Ve a https://cloud.mongodb.com/
2. Haz clic en **"Browse Collections"**
3. Selecciona la colección **"fichas"**
4. Haz clic en cualquier registro para editarlo
5. Usa el botón de **basura** para eliminar

### Opción 2: Usando herramientas como Postman o Thunder Client

**Actualizar un registro:**
```
PUT http://localhost:3000/api/fichas/[ID_DEL_REGISTRO]
Content-Type: application/json

{
  "telefono": "555-9999",
  "residencia": "Nueva dirección"
}
```

**Eliminar un registro:**
```
DELETE http://localhost:3000/api/fichas/[ID_DEL_REGISTRO]
```

## ❌ Solución de problemas

### Error: "Error de conexión"
- ✅ Verifica que el servidor esté corriendo (`npm start`)
- ✅ Verifica que la contraseña en `.env` sea correcta
- ✅ Verifica que tu IP esté en la whitelist de MongoDB Atlas

### Error: "Ya existe una ficha con esta identificación"
- Cada identificación debe ser única
- Usa una identificación diferente o elimina la anterior

### El formulario no se abre
- ✅ Verifica que hayas guardado todos los archivos
- ✅ Recarga la página (F5)
- ✅ Abre la consola del navegador (F12) para ver errores

## 🎯 Resumen rápido

1. **Edita** `server\.env` con tu contraseña
2. **Ejecuta** `cd server && npm start`
3. **Abre** `index.html` en el navegador
4. **Usa** el formulario para agregar registros
5. **Verifica** en MongoDB Atlas que se guardaron

---

**¿Necesitas ayuda?** Revisa la consola del navegador (F12) y la terminal del servidor para ver mensajes de error.
