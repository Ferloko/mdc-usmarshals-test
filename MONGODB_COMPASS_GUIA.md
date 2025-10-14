# 🧭 Guía de MongoDB Compass

## 📥 Descargar MongoDB Compass

1. Ve a: https://www.mongodb.com/try/download/compass
2. Descarga la versión para Windows
3. Instala el programa (siguiente, siguiente, finalizar)

## 🔌 Conectar a tu Base de Datos

### Método 1: URI de Conexión (Más Rápido)

1. Abre MongoDB Compass
2. En el campo "New Connection", pega esta URI:

```
mongodb+srv://ferlokgm_db_user:TU_CONTRASEÑA@cluster0.2rcjy46.mongodb.net/mdc_database?retryWrites=true&w=majority&appName=Cluster0
```

⚠️ **IMPORTANTE**: Reemplaza `TU_CONTRASEÑA` con tu contraseña real de MongoDB Atlas

3. Haz clic en "Connect"

### Método 2: Conexión Manual

1. Abre MongoDB Compass
2. Haz clic en "New Connection"
3. Llena los campos:
   - **Hostname**: `cluster0.2rcjy46.mongodb.net`
   - **Authentication**: Username/Password
   - **Username**: `ferlokgm_db_user`
   - **Password**: [Tu contraseña]
   - **Authentication Database**: `admin`
   - **SSL/TLS**: Activado (ON)

4. Haz clic en "Connect"

## 📊 Navegar por tus Datos

### Ver la Base de Datos

1. En el panel izquierdo, busca: **`mdc_database`**
2. Haz clic para expandir
3. Verás la colección: **`fichas`**
4. Haz clic en `fichas` para ver los registros

### Vista de Documentos

Verás todos los registros con esta estructura:

```json
{
  "_id": "ObjectId(...)",
  "nombre": "Juan",
  "apellido": "Pérez",
  "identificacion": "12345678",
  "telefono": "555-1234",
  "edad": 30,
  "genero": "masculino",
  "residencia": "Los Santos",
  "raza": "hispano",
  "fechaCreacion": "2025-10-06T...",
  "fechaActualizacion": "2025-10-06T..."
}
```

## 🔧 Operaciones Comunes

### ✏️ Editar un Registro

1. Haz clic en el registro que quieres editar
2. Modifica los campos directamente en el editor
3. Haz clic en **"Update"** para guardar los cambios

### 🗑️ Eliminar un Registro

1. Pasa el mouse sobre el registro
2. Haz clic en el icono de **basura** 🗑️
3. Confirma la eliminación

### ➕ Agregar un Registro Manualmente

1. Haz clic en el botón **"ADD DATA"** → **"Insert Document"**
2. Escribe el documento en formato JSON:

```json
{
  "nombre": "María",
  "apellido": "García",
  "identificacion": "87654321",
  "telefono": "555-5678",
  "edad": 28,
  "genero": "femenino",
  "residencia": "Los Santos",
  "raza": "hispano"
}
```

3. Haz clic en **"Insert"**

### 🔍 Buscar Registros

En la barra de **"Filter"**, puedes usar queries:

**Buscar por identificación:**
```json
{ "identificacion": "12345678" }
```

**Buscar por nombre:**
```json
{ "nombre": "Juan" }
```

**Buscar por edad mayor a 25:**
```json
{ "edad": { "$gt": 25 } }
```

**Buscar por género:**
```json
{ "genero": "masculino" }
```

### 📈 Ver Estadísticas

1. Haz clic en la pestaña **"Schema"**
2. Verás:
   - Tipos de datos de cada campo
   - Distribución de valores
   - Valores más comunes

### 📤 Exportar Datos

1. Haz clic en **"Export Data"**
2. Selecciona el formato:
   - **JSON**: Para respaldo o migración
   - **CSV**: Para Excel o análisis
3. Elige la ubicación y guarda

### 📥 Importar Datos

1. Haz clic en **"ADD DATA"** → **"Import File"**
2. Selecciona tu archivo JSON o CSV
3. Mapea los campos si es necesario
4. Haz clic en **"Import"**

## 🎯 Consejos Útiles

### Guardar la Conexión

1. Después de conectarte exitosamente
2. Haz clic en **"Save"** o **"Favorite"**
3. Dale un nombre: "MDC Database"
4. La próxima vez, solo haz clic en el favorito

### Refrescar Datos

- Haz clic en el botón de **refresh** (🔄) para ver los últimos cambios
- Útil después de agregar datos desde tu aplicación web

### Modo de Vista

Puedes cambiar entre:
- **List View**: Vista de lista (más compacta)
- **JSON View**: Vista de código JSON (más detallada)
- **Table View**: Vista de tabla (como Excel)

## ⚠️ Precauciones

- ❌ **NO elimines** la colección `fichas` completa
- ❌ **NO modifiques** el campo `_id` (es único y automático)
- ✅ **SÍ puedes** editar todos los demás campos
- ✅ **SÍ puedes** eliminar registros individuales

## 🔐 Seguridad

- Nunca compartas tu cadena de conexión con la contraseña
- Usa contraseñas fuertes
- En producción, restringe las IPs que pueden conectarse

## 🆘 Solución de Problemas

### Error: "Authentication failed"
- Verifica que la contraseña sea correcta
- Verifica que el usuario exista en MongoDB Atlas

### Error: "Connection timeout"
- Verifica tu conexión a internet
- Verifica que tu IP esté en la whitelist de MongoDB Atlas
- Ve a MongoDB Atlas → Network Access → Add IP

### No veo la base de datos
- Asegúrate de haber agregado al menos un registro desde la aplicación
- MongoDB crea la base de datos automáticamente cuando agregas el primer documento

## 📞 Recursos Adicionales

- Documentación oficial: https://docs.mongodb.com/compass/
- Tutoriales: https://learn.mongodb.com/

---

**¡Listo!** Ahora puedes gestionar tu base de datos visualmente con MongoDB Compass.
