import { writable } from "svelte/store";

const KEY = "sqdc.meta.v1";
const start = (()=>{ try{return JSON.parse(localStorage.getItem(KEY))||{}}catch{return{}}})();

export const meta = writable({
  project: start.project || "",
  epu:      start.epu || "",
  month:    start.month || ""
});
export const ws = writable({ id: start.ws?.id || "", name: start.ws?.name || "", teamlead: start.ws?.teamlead || "" });

meta.subscribe(v=>{ try{ localStorage.setItem(KEY, JSON.stringify({ ...v, ws: get(ws) })); }catch{} });
ws.subscribe(v=>{ try{ const m=get(meta); localStorage.setItem(KEY, JSON.stringify({ ...m, ws:v })); }catch{} });

export function pickEpu(epu){ meta.update(m=>({ ...m, epu })); }
export function pickWs(epu, id){ ws.set({ id, name:`Workstation ${id}`, teamlead:"(ATL …)" }); if(epu) pickEpu(epu); }

function get(store){ let v; const u=store.subscribe(x=>v=x); u(); return v; }
