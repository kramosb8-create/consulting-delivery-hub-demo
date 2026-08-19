import fs from 'node:fs';
import assert from 'node:assert/strict';
const actions = JSON.parse(fs.readFileSync(new URL('../data/actions.json', import.meta.url)));
assert.ok(actions.length >= 5, 'Debe existir un portafolio demo suficiente');
for (const a of actions) {
  assert.ok(a.id && a.title && a.area && a.owner, `Registro incompleto: ${a.id}`);
  assert.ok(Number.isInteger(a.progress) && a.progress >= 0 && a.progress <= 100, `Avance inválido: ${a.id}`);
  assert.ok(['Pendiente','En curso','Bloqueado','Completado'].includes(a.status), `Estado inválido: ${a.id}`);
  assert.ok(Number.isInteger(a.issue), `Issue inválido: ${a.id}`);
}
console.log(`OK: ${actions.length} compromisos validados.`);
