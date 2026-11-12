# Mercatodon — Fase 1

Frontend responsive construido con React + Vite + iconos oficiales de marcas mediante react-icons, preparado para Vercel y GitHub.

## Requisitos
- Node.js 20 o superior
- npm

## Ejecutar localmente
```bash
npm install
npm run dev
```
Abre la dirección que muestra Vite (normalmente http://localhost:5173).

## Compilar
```bash
npm run build
npm run preview
```

## Publicar en GitHub
1. Crea un repositorio llamado `mercadoplaza`.
2. Sube el contenido de esta carpeta (no la carpeta ZIP).
3. En Vercel selecciona **Add New → Project** y conecta el repositorio.
4. Framework: Vite. Build command: `npm run build`. Output directory: `dist`.
5. No necesitas variables de entorno para la demo visual.

## Instalar como aplicación
La PWA incluye `manifest.webmanifest`, iconos y un service worker básico. En producción debe servirse mediante HTTPS. En Android/Chrome utiliza “Instalar aplicación”; en iPhone/iPad usa Compartir → Añadir a pantalla de inicio.

## Estado de esta fase
- Interfaz y navegación: funcionales.
- Registro: validación de interfaz y almacenamiento local de demostración.
- Favoritos: persistencia local del navegador.
- Banners: datos de ejemplo.
- Calificaciones: formulario de demostración; no verifica teléfonos ni registra votos en servidor.
- Google Sheets / Apps Script: pendiente de integración en Fase 2.
- Los puestos incluidos son datos ficticios de demostración.

## Estructura
- `src/App.jsx`: aplicación, datos de ejemplo, filtros y modales.
- `src/styles.css`: diseño responsive.
- `src/main.jsx`: punto de entrada y registro del service worker.
- `public/`: manifiesto, iconos y service worker.

## Próximos pasos técnicos
1. Conectar la capa de servicios con Google Apps Script.
2. Implementar persistencia centralizada de puestos y banners.
3. Implementar autenticación/verificación OTP mediante proveedor autorizado.
4. Migrar favoritos y votos a base de datos adecuada para concurrencia.
