const fallbackActions = [];
let actions = [];

const $ = (s) => document.querySelector(s);
const normalize = (s) => s.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/\s+/g,'-');

async function loadActions(){
  try { actions = await fetch('data/actions.json').then(r => { if(!r.ok) throw new Error(); return r.json(); }); }
  catch { actions = fallbackActions; }
  const saved = JSON.parse(localStorage.getItem('consultingDemoRequests') || '[]');
  actions = [...actions, ...saved];
  hydrateFilters(); render();
}

function hydrateFilters(){
  const areas = [...new Set(actions.map(a=>a.area))].sort();
  areas.forEach(v=>$('#areaFilter').insertAdjacentHTML('beforeend',`<option>${v}</option>`));
  ['Pendiente','En curso','Bloqueado','Completado'].forEach(v=>$('#statusFilter').insertAdjacentHTML('beforeend',`<option>${v}</option>`));
}

function filtered(){
  const area=$('#areaFilter').value, status=$('#statusFilter').value;
  return actions.filter(a => (area==='Todas'||a.area===area) && (status==='Todos'||a.status===status));
}

function render(){ renderKPIs(); renderRows(); renderPipeline(); renderTimeline(); }
function renderKPIs(){
  const all=actions.length, done=actions.filter(a=>a.status==='Completado').length, blocked=actions.filter(a=>a.status==='Bloqueado').length;
  const avg=all?Math.round(actions.reduce((s,a)=>s+a.progress,0)/all):0;
  const vals=[['Cumplimiento',`${avg}%`,'Avance promedio del portafolio'],['Compromisos',all,'Total controlado'],['Completados',done,'Con evidencia de cierre'],['Bloqueados',blocked,'Requieren decisión gerencial']];
  $('#kpis').innerHTML=vals.map(v=>`<article class="kpi"><span class="meta">${v[0]}</span><div class="value">${v[1]}</div><span class="meta">${v[2]}</span></article>`).join('');
}
function renderRows(){
  $('#actionRows').innerHTML=filtered().map(a=>`<tr>
    <td><strong>${a.id}</strong></td><td>${a.title}</td><td>${a.area}</td><td>${a.owner}</td><td>${a.due}</td>
    <td><div class="progress" title="${a.progress}%"><b style="width:${a.progress}%"></b></div><small>${a.progress}%</small></td>
    <td><span class="status ${normalize(a.status)}">${a.status}</span></td>
    <td><div class="trace"><span>#${a.issue}</span>${a.pr?`<span>PR #${a.pr}</span>`:''}<span>CI ${a.ci}</span><span>${a.release}</span></div></td>
  </tr>`).join('') || '<tr><td colspan="8">No hay resultados para los filtros seleccionados.</td></tr>';
}
function renderPipeline(){
  const stages=[
    ['Issue','Necesidad registrada con alcance y aceptación',actions.length],
    ['Desarrollo','Responsable trabajando en rama controlada',actions.filter(a=>a.status==='En curso').length],
    ['Pull Request','Cambio enviado a revisión',actions.filter(a=>a.pr).length],
    ['CI / QA','Pruebas automáticas superadas',actions.filter(a=>a.ci==='OK').length],
    ['Release','Versión identificable en producción',actions.filter(a=>a.release && a.release!=='—').length]
  ];
  $('#pipeline').innerHTML=stages.map(s=>`<div class="stage"><strong>${s[0]}</strong><p>${s[1]}</p><div class="count">${s[2]}</div></div>`).join('');
}
function renderTimeline(){
  const events=[
    ['Release v1.0-demo','Dashboard ejecutivo y trazabilidad inicial','Hoy'],
    ['PR #112 aprobado','Se validó pronóstico por división antes de integrar','Hoy'],
    ['CI ejecutado','Pruebas de integridad de datos: OK','Hoy'],
    ['Issue #106 creado','Nueva automatización de alertas de vencimiento','Ayer']
  ];
  $('#timeline').innerHTML=events.map(e=>`<div class="event"><strong>${e[0]}</strong><span>${e[1]}</span><small>${e[2]}</small></div>`).join('');
}

$('#areaFilter').addEventListener('change',renderRows); $('#statusFilter').addEventListener('change',renderRows);
$('#newRequestBtn').addEventListener('click',()=>$('#requestDialog').showModal());
$('#saveRequest').addEventListener('click',(e)=>{
  e.preventDefault();
  if(!$('#reqTitle').value.trim()) return;
  const saved=JSON.parse(localStorage.getItem('consultingDemoRequests')||'[]');
  const num=200+saved.length+1;
  const item={id:`REQ-${num}`,title:$('#reqTitle').value.trim(),area:$('#reqArea').value,owner:'Por asignar',due:'Por definir',progress:0,status:'Pendiente',issue:num,pr:null,ci:'—',release:'—'};
  saved.push(item); localStorage.setItem('consultingDemoRequests',JSON.stringify(saved)); actions.push(item);
  $('#requestDialog').close(); $('#requestForm').reset(); hydrateFiltersSafe(); render(); toast(`Solicitud demo creada como Issue #${num}`);
});
function hydrateFiltersSafe(){
  const current=$('#areaFilter').value; $('#areaFilter').innerHTML='<option value="Todas">Todas las áreas</option>';
  [...new Set(actions.map(a=>a.area))].sort().forEach(v=>$('#areaFilter').insertAdjacentHTML('beforeend',`<option>${v}</option>`));
  if([...$('#areaFilter').options].some(o=>o.value===current)) $('#areaFilter').value=current;
}
function toast(msg){const t=$('#toast');t.textContent=msg;t.classList.add('show');setTimeout(()=>t.classList.remove('show'),2500)}

loadActions();
