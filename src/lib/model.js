import { writable } from "svelte/store";

const KEY = "sqdc.app.v1";

export const catalog = {
  epus: [
    {
      id: "EPU-A",
      name: "EPU A – Montage",
      workstations: [
        { id: "WS01", name: "Workstation 01", atl: "M. Schneider" },
        { id: "WS02", name: "Workstation 02", atl: "L. Becker"   },
        { id: "WS03", name: "Workstation 03", atl: "K. Wagner"   },
        { id: "WS04", name: "Workstation 04", atl: "R. Roth"     },
        { id: "WS05", name: "Workstation 05", atl: "S. Hahn"     },
        { id: "WS06", name: "Workstation 06", atl: "T. Wolf"     }
      ]
    },
    {
      id: "EPU-B",
      name: "EPU B – Vormontage",
      workstations: [
        { id: "WS11", name: "Workstation 11", atl: "A. Krüger" },
        { id: "WS12", name: "Workstation 12", atl: "B. Neumann" },
        { id: "WS13", name: "Workstation 13", atl: "V. Kurz"    }
      ]
    }
  ],
  pictos: [
    { id:"safety",  label:"Safety",  icon:"🦺" },
    { id:"quality", label:"Quality", icon:"✅" },
    { id:"delivery",label:"Delivery",icon:"🚚" },
    { id:"cost",    label:"Cost",    icon:"💶" }
  ]
};

function load() {
  try { return JSON.parse(localStorage.getItem(KEY)) || {}; } catch { return {}; }
}
function save(obj) {
  try { localStorage.setItem(KEY, JSON.stringify(obj)); } catch {}
}

const start = load();
export const session = writable({
  project: start.project || "",
  epuId:   start.epuId   || "",
  wsId:    start.wsId    || ""
});

export const wsConfig = writable(
  start.wsConfig || {
    // Schema: [epuId][wsId] -> { month, takt, target, atl, note, pictoId }
  }
);

session.subscribe(v=>{
  const all = load();
  all.project = v.project; all.epuId = v.epuId; all.wsId = v.wsId;
  save(all);
});
wsConfig.subscribe(v=>{
  const all = load();
  all.wsConfig = v; save(all);
});

export function getEPU(epuId){
  return catalog.epus.find(e=>e.id===epuId);
}
export function getWS(epuId, wsId){
  const e = getEPU(epuId);
  return e?.workstations.find(w=>w.id===wsId);
}
export function ensureWS(epuId, wsId){
  let cur; wsConfig.update(all=>{
    all[epuId] ??= {};
    all[epuId][wsId] ??= { month:"", takt:"", target:"", atl:"", note:"", pictoId:"" };
    cur = all[epuId][wsId];
    return all;
  });
  return cur;
}
export function updateWS(epuId, wsId, patch){
  wsConfig.update(all=>{
    all[epuId] ??= {};
    all[epuId][wsId] = { ...(all[epuId][wsId]||{}), ...patch };
    return all;
  });
}
