# Impulsa Fisioterapia Deportiva — Web corporativa (demo)

Web corporativa para un centro de fisioterapia deportiva en Tegucigalpa, Honduras. Proyecto **100% frontend**: React + Tailwind CSS, sin backend, sin base de datos y sin servicios externos de almacenamiento. Todos los datos introducidos en el formulario se guardan únicamente en el navegador mediante `localStorage`.

> ⚠️ **Aviso importante:** esta aplicación es una demostración/prototipo. `localStorage` **no** es un mecanismo adecuado para almacenar información sanitaria sensible en producción. Antes de usar este proyecto con pacientes reales, sustituye el almacenamiento local por un backend con las medidas de seguridad y cumplimiento normativo adecuadas.

## 1. Estructura del proyecto

```
fisio-tegus/
├── public/
│   └── favicon.svg
├── src/
│   ├── components/        # Componentes reutilizables
│   ├── pages/              # Una página por ruta
│   ├── data/                # Datos de demostración centralizados
│   ├── hooks/               # useLocalStorage
│   ├── utils/                # Validación, CRUD de localStorage, iconos
│   ├── App.jsx               # Definición de rutas
│   ├── main.jsx               # Punto de entrada
│   └── index.css               # Tailwind + estilos globales
├── tailwind.config.js    # Colores de marca centralizados aquí
├── vercel.json               # Rewrites para SPA en Vercel
└── package.json
```

## 2. Componentes creados

`Header`, `Footer`, `MobileMenu`, `Layout`, `Hero`, `SectionTitle`, `ServiceCard`, `TeamCard`, `BoxCard`, `ContactForm`, `CookieBanner`, `ConsultationList`, `ConsultationCard`, `Modal` (propio, sin `alert()`/`confirm()`), `Button`, `MapaSimulado`, `ImagenMuestra` (marcador visual que sustituye a fotografías externas) y `Seo` (title + meta description por página).

## 3. Rutas disponibles

| Ruta | Página |
| --- | --- |
| `/` | Inicio |
| `/servicios` | Catálogo de 6 servicios |
| `/equipo` | Equipo (perfiles de demostración) |
| `/contacto` | Contacto y formulario de turnos |
| `/consultas` | Visor interno de solicitudes guardadas |
| `/privacidad` | Política de privacidad (plantilla orientativa) |
| `/aviso-legal` | Aviso legal (plantilla orientativa) |
| `*` | Página 404 |

## 4. Funcionamiento de localStorage

- Clave `fisioterapia_consultas`: array de solicitudes con la estructura indicada en el encargo (`id`, `createdAt`, `nombre`, `telefono`, `email`, `tipoSolicitud`, `tratamiento`, `fechaPreferida`, `horarioPreferido`, `mensaje`).
- Funciones reutilizables en `src/utils/consultasStorage.js`: `obtenerConsultas`, `crearConsulta`, `eliminarConsulta`, `eliminarTodasLasConsultas`.
- Clave `cookie_consent`: `"accepted"` o `"rejected"`, gestionada por el hook genérico `useLocalStorage` (`src/hooks/useLocalStorage.js`).
- Ningún dato se envía a servidores externos.

## 5. Cómo probar el formulario

1. Ve a **Contacto** (`/contacto`).
2. Envía el formulario vacío para comprobar la validación (los errores aparecen debajo de cada campo, sin usar `alert()`).
3. Completa los campos obligatorios y acepta la política de privacidad.
4. Al enviar correctamente verás el mensaje de confirmación y el formulario se limpiará sin recargar la página.
5. Ve a **`/consultas`** para ver la solicitud guardada, eliminarla individualmente o vaciar todas las consultas (con modal propio de confirmación).

## 6. Cómo ejecutar el proyecto

```bash
npm install
npm run dev       # entorno de desarrollo
npm run build      # build de producción (carpeta dist/)
npm run preview     # sirve el build de producción localmente
```

## 7. Cómo desplegarlo en Vercel

1. Sube el proyecto a un repositorio Git (GitHub/GitLab/Bitbucket).
2. En [vercel.com](https://vercel.com), importa el repositorio.
3. Framework preset: **Vite**. Build command: `npm run build`. Output directory: `dist`.
4. El archivo `vercel.json` ya incluye el *rewrite* necesario para que las rutas de React Router funcionen correctamente (evita 404 al recargar `/servicios`, `/contacto`, etc.).
5. Despliega. No se requiere configurar ninguna variable de entorno ni base de datos.

## 8. Datos ficticios que deben sustituirse antes de publicar

- **`src/data/centro.js`**: nombre del centro, dirección, teléfono, email y redes sociales (datos de demostración).
- **`src/data/profesionales.js`**: nombres, formación y trayectoria del equipo son **contenido de demostración**; no se han usado números de colegiación ni universidades reales.
- **Fotografías del equipo y del hero**: se usan fotografías profesionales de banco gratuito (Unsplash, bajo licencia Unsplash — no requiere atribución obligatoria) como contenido de demostración. Sustitúyelas por fotografías reales del centro y del equipo antes de publicar; las URLs están en `foto` (profesionales) y en `Hero.jsx` / `Inicio.jsx`.
- **Boxes**: las tarjetas de los tres boxes usan un marcador visual (`ImagenMuestra`) etiquetado como "sustituir por fotografía real", ya que no existen fotografías reales de los espacios.
- **`MapaSimulado`**: mapa visual simulado (sin API externa); está preparado para sustituirse por un mapa real (Google Maps, Mapbox, etc.) cuando el centro lo decida.
- **`/privacidad` y `/aviso-legal`**: plantillas orientativas con placeholders (`[NOMBRE DEL CENTRO]`, `[DIRECCIÓN]`, etc.). Deben ser revisadas por un profesional legal antes de publicarse.

## 9. Identidad visual

Paleta centralizada en `tailwind.config.js`:

| Token | Valor | Uso |
| --- | --- | --- |
| `primary` (azul petróleo) | `#0F4C81` en el tono `700` | Marca: header, hero, footer, mapa, focos |
| `secondary` (verde turquesa) | `#0D9488` en el tono `600` | Acentos, CTAs (`700` para texto/botones por contraste AA) |
| Fondo | `slate-50` = `#F8FAFC` | Fondo general de página |
| Texto principal | `slate-800` = `#1E293B` | Texto y titulares |

Tipografía: **Plus Jakarta Sans** (Google Fonts), importada en `src/index.css`.

Se verificaron manualmente los contrastes de color clave (texto sobre fondo, botones, estados de foco) para cumplir con un nivel básico de accesibilidad AA: los textos en verde turquesa usan el tono `700` (no el `600`) para garantizar ≥ 4.5:1, y el foco de teclado usa un contorno visible en azul petróleo (`primary-600`) en todos los elementos interactivos.
