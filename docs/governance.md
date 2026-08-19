# Modelo de gobierno propuesto

| Rol | Responsabilidad en GitHub | Equivalente de negocio |
|---|---|---|
| Product Owner / Consultor líder | Prioriza Issues y valida aceptación | Dueño funcional del entregable |
| Consultor funcional | Documenta requerimientos y evidencia | Traductor negocio-tecnología |
| Desarrollador / IA supervisada | Implementa cambios | Constructor de solución |
| Revisor técnico | Revisa PR, seguridad y mantenibilidad | Control de calidad técnica |
| Cliente / key user | Valida criterios de aceptación | Aprobador funcional |
| Release owner | Autoriza versión productiva | Responsable de despliegue |

## Política mínima
- `main` representa versión aprobada.
- No se desarrolla directamente en `main`.
- Cada PR debe referenciar un Issue.
- Un PR requiere calidad automática y revisión.
- Toda Release debe tener notas de cambio.
- Secretos solo en mecanismos protegidos, nunca en código.
