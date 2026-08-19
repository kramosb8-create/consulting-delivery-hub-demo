# Arquitectura del demo

```mermaid
flowchart LR
  A[Cliente / Consultor] --> B[GitHub Issue]
  B --> C[Rama de trabajo]
  C --> D[Pull Request]
  D --> E[GitHub Actions / QA]
  E --> F[Aprobación]
  F --> G[Main]
  G --> H[Release]
  H --> I[GitHub Pages / Producción]
```

La aplicación es deliberadamente estática para que el concepto pueda demostrarse sin infraestructura adicional. En un proyecto real, la misma gobernanza puede envolver soluciones React, Supabase, APIs, SQL, Tableau, Power BI, automatizaciones u otros componentes.
