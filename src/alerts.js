const ALERT_WINDOW_HOURS = 48;

function evaluateDueDate(value) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return null;
  const due = new Date(`${value}T23:59:59`);
  const hours = (due.getTime() - Date.now()) / 36e5;
  if (hours < 0) return { label: 'Vencido', level: 'overdue' };
  if (hours <= ALERT_WINDOW_HOURS) return { label: 'Vence <48h', level: 'due-soon' };
  return null;
}

function applyAlerts() {
  document.querySelectorAll('#actionRows tr').forEach((row) => {
    const dueCell = row.children[4];
    const statusCell = row.children[6];
    if (!dueCell || !statusCell || statusCell.textContent.trim() === 'Completado') return;
    row.classList.remove('due-soon-row', 'overdue-row');
    dueCell.querySelector('.due-alert')?.remove();
    const result = evaluateDueDate(dueCell.childNodes[0]?.textContent?.trim() || dueCell.textContent.trim());
    if (!result) return;
    row.classList.add(`${result.level}-row`);
    dueCell.insertAdjacentHTML('beforeend', `<span class="due-alert ${result.level}">${result.label}</span>`);
  });
}

const table = document.querySelector('#actionRows');
if (table) {
  new MutationObserver(applyAlerts).observe(table, { childList: true, subtree: true });
  applyAlerts();
}
