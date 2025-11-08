import { writable } from "svelte/store";
function stored(key, init) {
  const s = writable(init);
  const raw = localStorage.getItem(key);
  if (raw != null) s.set(JSON.parse(raw));
  s.subscribe(v => localStorage.setItem(key, JSON.stringify(v)));
  return s;
}
export const project     = stored("meta.project", "Arf");
export const workstation = stored("meta.workstation", "Ws1");
export const atl         = stored("meta.atl", "Teamlead");
export const month       = stored("meta.month", new Date().toISOString().slice(0,7));
export const theme       = stored("ui.theme", "light");
export function exportBackup() {
  const data = JSON.stringify(localStorage, null, 2);
  const blob = new Blob([data], { type: "application/json" });
  const url  = URL.createObjectURL(blob);
  const a = document.createElement("a"); a.href = url; a.download = "sqdc-backup.json"; a.click();
  URL.revokeObjectURL(url);
}
export function importBackup() {
  const i = document.createElement("input"); i.type = "file"; i.accept = "application/json";
  i.onchange = async () => {
    const f = i.files[0]; if (!f) return;
    const obj = JSON.parse(await f.text());
    Object.entries(obj).forEach(([k,v]) => localStorage.setItem(k, v));
    location.reload();
  };
  i.click();
}
export function clearAll() {
  if (confirm("Alle gespeicherten Daten löschen?")) { localStorage.clear(); location.reload(); }
}
