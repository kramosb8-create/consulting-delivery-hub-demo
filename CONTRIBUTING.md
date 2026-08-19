# Cómo trabajamos

1. Toda necesidad nace como **Issue**.
2. El Issue debe contener problema, valor esperado y criterios de aceptación.
3. El desarrollo se hace en una rama `feature/issue-<n>-descripcion`.
4. Todo cambio entra por **Pull Request**.
5. GitHub Actions debe quedar en verde antes de aprobar.
6. La aprobación funcional confirma que el cambio resuelve el problema de negocio.
7. Al integrar a `main`, se registra en `CHANGELOG.md` y se genera una **Release** cuando corresponda.

## Convención de commits
- `feat:` nueva capacidad
- `fix:` corrección
- `docs:` documentación
- `chore:` mantenimiento

Nunca guardar contraseñas, tokens, datos personales de clientes ni archivos productivos sensibles en el repositorio.
