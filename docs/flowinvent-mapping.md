# Cómo mapear FlowInvent / GEI a GitHub

| Artefacto actual | GitHub propuesto | Ejemplo |
|---|---|---|
| Acuerdo de comité / minuta | Issue | “Mercadeo debe completar forecast por división” |
| Checklist de implementación | GitHub Project + Issues | Pendiente / En curso / Bloqueado / Hecho |
| Cambio de fórmula o lógica | Pull Request | Ajuste de regla ±15% ForecastPro vs Demanda |
| Validación funcional | Review / comentario en PR | Aprobación del responsable del proceso |
| Evidencia técnica | Checks de Actions | Prueba de integridad de datos |
| Entrega mensual | Release | `v2026.08` |
| Manual / reglas de negocio | `/docs` | KPI, fórmulas, gobierno y decisiones |
| Scripts SQL | `/sql` en repo de producto | Consultas versionadas y revisables |

## Separación recomendada
No subir bases reales ni archivos con datos sensibles. GitHub debe contener código, configuración segura, documentación, plantillas, definiciones y evidencia de cambio; los datos productivos permanecen en los sistemas autorizados del cliente.
