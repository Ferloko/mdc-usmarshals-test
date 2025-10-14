# 📸 Cómo agregar imágenes de perfil con Imgur

## 🎯 Pasos para subir y usar una imagen

### 1️⃣ Subir imagen a Imgur

1. **Ve a**: https://imgur.com/
2. **Haz clic en** "New post" o "Upload images"
3. **Arrastra tu imagen** o haz clic para seleccionarla
4. **Espera** a que se suba la imagen
5. **Haz clic derecho** en la imagen subida
6. **Selecciona** "Copy image address" o "Copiar dirección de imagen"

### 2️⃣ Obtener el link directo

El link debe verse así:
```
https://i.imgur.com/XXXXXXX.png
```

o

```
https://i.imgur.com/XXXXXXX.jpg
```

⚠️ **IMPORTANTE**: Asegúrate de que el link termine en `.png`, `.jpg`, `.jpeg`, o `.gif`

### 3️⃣ Usar el link en el formulario

1. **Abre** el formulario de "Añadir ficha gubernamental"
2. **Llena** todos los campos requeridos
3. **En el campo "URL de imagen"**, pega el link de Imgur
4. **Haz clic en** "Enviar"

## 🖼️ Ejemplo de link correcto

```
https://i.imgur.com/abc123.png
```

## ❌ Links que NO funcionan

- `https://imgur.com/abc123` (sin el `i.` al inicio y sin extensión)
- `https://imgur.com/gallery/abc123` (link de galería)
- Links sin extensión de imagen

## 🔧 Solución de problemas

### La imagen no se muestra

1. **Verifica** que el link sea correcto (debe empezar con `https://i.imgur.com/`)
2. **Verifica** que el link termine en `.png`, `.jpg`, `.jpeg`, o `.gif`
3. **Prueba** abrir el link en una nueva pestaña del navegador
4. Si el link abre la imagen directamente, está correcto

### Cómo convertir un link de Imgur normal a link directo

Si tienes un link como:
```
https://imgur.com/abc123
```

Conviértelo a:
```
https://i.imgur.com/abc123.png
```

Cambios:
1. Agrega `i.` después de `https://`
2. Agrega `.png` o `.jpg` al final

## 🎨 Recomendaciones para la imagen

- **Tamaño recomendado**: 500x500 píxeles o mayor
- **Formato**: PNG o JPG
- **Aspecto**: Cuadrado (1:1) para mejor visualización
- **Tamaño de archivo**: Menor a 5MB

## 🌐 Alternativas a Imgur

También puedes usar otros servicios de hosting de imágenes:

- **ImgBB**: https://imgbb.com/
- **PostImages**: https://postimages.org/
- **ImageShack**: https://imageshack.com/

**Importante**: Siempre usa el link directo de la imagen (que termine en .png, .jpg, etc.)

## 📝 Ejemplo completo

### Paso a paso con captura de pantalla:

1. **Sube tu imagen a Imgur**
2. **Copia el link directo**: `https://i.imgur.com/example123.png`
3. **Abre el formulario** en tu aplicación MDC
4. **Llena los datos**:
   - Nombre: Juan
   - Apellido: Pérez
   - Identificación: 12345678
   - Teléfono: 555-1234
   - Edad: 30
   - Género: Masculino
   - Residencia: Los Santos
   - Raza: Hispano
   - **URL de imagen**: `https://i.imgur.com/example123.png`
5. **Envía el formulario**
6. **Busca la ficha** y verás tu imagen en el perfil

## ✅ Verificar que funciona

Después de crear la ficha:

1. **Busca la ficha** usando el buscador
2. **Abre el perfil**
3. **Verás tu imagen** en el lado izquierdo del perfil
4. Si no hay imagen o el link es incorrecto, verás el logo HUB azul por defecto

## 🔄 Actualizar imagen existente

Para cambiar la imagen de una ficha existente:

1. Necesitarás implementar la funcionalidad de edición (próximamente)
2. O puedes editar directamente en MongoDB Compass
3. O usar la API con una herramienta como Postman

---

**¿Necesitas ayuda?** Si tienes problemas con las imágenes, verifica:
- ✅ El link es directo (termina en .png, .jpg, etc.)
- ✅ La imagen es accesible públicamente
- ✅ El servidor backend está corriendo
