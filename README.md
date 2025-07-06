🎨 Leyendas costarricenses Frontend – Mauricio Torres Fernández
Este es el frontend del proyecto leyendas costarricenses, desarrollado con Vue 3, TypeScript, Vite y Bootstrap. Consume una API construida en FastAPI para gestionar leyendas costarricenses.

⚙️ Tecnologías utilizadas
Vue 3 + Composition API
TypeScript
Vite
Vue Router
Axios
Bootstrap 5
Modularización por componentes
Autenticación con JWT (localStorage)

🚀 Cómo ejecutar el proyecto
1. Clona el repositorio
git clone https://github.com/MauricioTF/4thewords_frontend_mauricio_torresfernandez.git
cd 4thewords_frontend_mauricio_torresfernandez
2. Instala las dependencias
npm install
3. Ejecuta el servidor de desarrollo
npm run dev
Accede en el navegador:
🌐 http://localhost:3000

⚠️ Importante: asegúrate de que el backend esté corriendo en http://localhost:8080

📁 Estructura del proyecto
src/
├── assets/                # Estilos globales
├── components/base/       # Componentes reutilizables 
├── views/                 # Vistas principales
├── router/                # Configuración de rutas protegidas
├── services/              # Funciones para consumir la API 
├── types/                 # Tipos TypeScript 
├── composables/           # Lógica reutilizable

🧩 Funcionalidades principales
✅ Login de usuario con validación (JWT)
✅ Visualización de leyendas en una lista
✅ Filtrado por:
Nombre
Fecha
Categoría
Provincia, Cantón, Distrito
✅ Creación de leyendas con validaciones de formularios
✅ Edición y prellenado de formularios
✅ Eliminación con confirmación por modal
✅ Carga y previsualización de imágenes
✅ Toasts flotantes para notificaciones

🔐 Autenticación
Al iniciar sesión correctamente, el token se guarda en localStorage.
Las rutas de leyendas están protegidas (no accesibles sin login).

📦 Scripts útiles
npm run dev       # Ejecuta en modo desarrollo (localhost:3000)
npm run build     # Compila para producción
npm run preview   # Previsualiza el build

🧑‍💻 Autor
Mauricio Torres Fernández
