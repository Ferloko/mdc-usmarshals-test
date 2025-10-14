# 🔧 Configuración de MongoDB Atlas - Paso a Paso

## 📋 Checklist de Configuración

### ✅ 1. Acceso a MongoDB Atlas
- [ ] Ir a: https://cloud.mongodb.com/
- [ ] Iniciar sesión con tu cuenta

---

### ✅ 2. Configurar Network Access (CRÍTICO)

**Ubicación**: Menú lateral → Security → **Network Access**

1. Haz clic en **"+ ADD IP ADDRESS"**
2. Selecciona **"ALLOW ACCESS FROM ANYWHERE"**
3. Confirma
4. Espera a que el estado cambie a **"Active"** (puede tardar 1-2 minutos)

**¿Por qué?** MongoDB bloquea todas las conexiones por defecto. Esto permite que tu computadora se conecte.

---

### ✅ 3. Configurar Database Access (Usuario y Contraseña)

**Ubicación**: Menú lateral → Security → **Database Access**

1. Busca el usuario: **`ferlokgm_db_user`**
2. Si no existe, haz clic en **"+ ADD NEW DATABASE USER"**
3. Configura:
   - **Username**: `ferlokgm_db_user`
   - **Password**: Crea una contraseña SIMPLE (solo letras y números)
     - ✅ Ejemplos buenos: `Admin123`, `Password2024`, `MiPass456`
     - ❌ Evita: `@`, `#`, `$`, `%`, `&`, `!`
   - **Privileges**: Selecciona **"Read and write to any database"**
4. Haz clic en **"Add User"** o **"Update User"**
5. **ANOTA TU CONTRASEÑA** - la necesitarás ahora

---

### ✅ 4. Obtener la Connection String

**Ubicación**: Menú lateral → **Database** (o Deployment → Database)

1. Verás tu cluster: **Cluster0**
2. Haz clic en el botón **"Connect"**
3. Selecciona **"Drivers"** o **"Connect your application"**
4. Copia la cadena de conexión que se parece a:
   ```
   mongodb+srv://ferlokgm_db_user:<password>@cluster0.XXXXX.mongodb.net/?retryWrites=true&w=majority
   ```

---

### ✅ 5. Configurar el archivo .env

**IMPORTANTE**: Debes editar el archivo correctamente.

**Ubicación del archivo**: `c:\Users\Ferna\OneDrive\Documentos\MDC\server\.env`

**Formato correcto del archivo:**

```env
PORT=3000
MONGODB_URI=mongodb+srv://ferlokgm_db_user:TU_CONTRASEÑA@cluster0.2rcjy46.mongodb.net/mdc_database?retryWrites=true&w=majority&appName=Cluster0
```

**Ejemplo con contraseña real:**
```env
PORT=3000
MONGODB_URI=mongodb+srv://ferlokgm_db_user:Admin123@cluster0.2rcjy46.mongodb.net/mdc_database?retryWrites=true&w=majority&appName=Cluster0
```

**⚠️ IMPORTANTE:**
- Reemplaza `TU_CONTRASEÑA` con tu contraseña real (sin `<` ni `>`)
- NO uses espacios
- NO uses comillas
- La contraseña va directamente después de los dos puntos `:`

---

## 🧪 Probar la Conexión

Después de configurar el archivo `.env`:

1. Abre una terminal en la carpeta `server`
2. Ejecuta:
   ```bash
   npm run test-connection
   ```

**Si funciona, verás:**
```
✅ ¡Conexión exitosa a MongoDB!
📊 Base de datos: mdc_database
```

**Si falla, verás:**
```
❌ Error al conectar a MongoDB
```

---

## ❌ Solución de Problemas

### Error: "Authentication failed"
- ✅ Verifica que la contraseña en `.env` sea correcta
- ✅ Verifica que el usuario exista en Database Access
- ✅ Asegúrate de no tener espacios extra en el archivo `.env`

### Error: "Connection timeout" o "ECONNREFUSED"
- ✅ Verifica que tu IP esté en Network Access
- ✅ Usa "Allow Access from Anywhere" (0.0.0.0/0)
- ✅ Espera 1-2 minutos después de agregar la IP

### Error: "Invalid connection string"
- ✅ Verifica que no haya espacios en la URI
- ✅ Verifica que la contraseña no tenga caracteres especiales
- ✅ Asegúrate de que la URI esté en una sola línea

### La contraseña tiene caracteres especiales
Si tu contraseña tiene `@`, `#`, `$`, etc., debes:
1. Ir a MongoDB Atlas → Database Access
2. Editar el usuario
3. Cambiar la contraseña por una simple (solo letras y números)

---

## 🎯 Resumen Visual

```
MongoDB Atlas
    ↓
1. Network Access → Add IP → "Allow from Anywhere" → Confirm
    ↓
2. Database Access → Verify user "ferlokgm_db_user" → Note password
    ↓
3. Database → Connect → Drivers → Copy connection string
    ↓
4. Edit server/.env → Replace <password> with real password
    ↓
5. Run: npm run test-connection
    ↓
✅ Success!
```

---

## 📞 ¿Necesitas ayuda?

Si sigues teniendo problemas:

1. Verifica que completaste TODOS los pasos
2. Revisa que la contraseña no tenga caracteres especiales
3. Asegúrate de que tu IP esté en la whitelist
4. Espera 2-3 minutos después de hacer cambios en MongoDB Atlas

---

## 🚀 Siguiente Paso

Una vez que la conexión funcione, inicia el servidor:

```bash
cd server
npm start
```

Deberías ver:
```
🚀 Servidor corriendo en http://localhost:3000
✅ Conectado a MongoDB
```

Luego abre `index.html` en tu navegador y prueba el formulario.
