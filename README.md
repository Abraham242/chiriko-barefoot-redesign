# Chiriko Barefoot Redesign

Sitio web de Chiriko Studio para presentar y vender calzado barefoot en Venezuela.

## Stack
- React 18 + TypeScript
- Vite
- Tailwind CSS
- React Router
- Vitest + Testing Library

## Requisitos
- Node.js 18+
- npm 9+

## Instalación
```bash
npm install
```

## Desarrollo local
```bash
npm run dev
```

La app se levanta en `http://localhost:5173` por defecto.

## Build de producción
```bash
npm run build
```

## Previsualizar build
```bash
npm run preview
```

## Tests
```bash
npm test
```

## Estructura principal
- `src/pages`: páginas (home, producto, guía de tallas, 404).
- `src/components`: secciones de UI reutilizables y componentes base.
- `src/data/products.ts`: catálogo de productos.
- `src/test`: pruebas automatizadas.
