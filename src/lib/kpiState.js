import { writable } from "svelte/store";
const KEY="sqdc.kpi.v2";
const base={
  S:{weeks:8,gridType:"line",guides:[25,50,75],goal:60,goalLabel:"Ziel Safety",monthlyRows:1,weeklyTitles:["Kennzahl 1","Kennzahl 2"]},
  Q:{weeks:8,gridType:"line",guides:[25,50,75],goal:85,goalLabel:"Ziel Quality",monthlyRows:1,weeklyTitles:["Right First Time","Kontrollen"]},
  D:{weeks:8,gridType:"bar",guides:[25,50,75],goal:92,goalLabel:"Ziel Delivery",monthlyRows:1,weeklyTitles:["Erfüllung","Taktfolge"]},
  C:{weeks:8,gridType:"line",guides:[25,50,75],goal:50,goalLabel:"Ziel Cost",monthlyRows:1,weeklyTitles:["Energie","Ausschuss"]}
};
function load(){ try{ return JSON.parse(localStorage.getItem(KEY))||{perWS:{WS01:structuredClone(base)}} }catch{ return {perWS:{WS01:structuredClone(base)}} }
}
export const kpi = writable(load());
kpi.subscribe(v=>{ try{ localStorage.setItem(KEY, JSON.stringify(v)); }catch{} });
export function getKpiFor(wsId,code){ let all; const u=kpi.subscribe(v=>all=v); u(); return all.perWS[wsId]?.[code]||base[code]; }
export function setKpiFor(wsId,code,patch){ kpi.update(all=>{ all.perWS[wsId] ||= structuredClone(base); all.perWS[wsId][code]={...all.perWS[wsId][code],...patch}; return all;}); }
export function cloneProfile(fromId,toId){ kpi.update(all=>{ all.perWS[toId]=structuredClone(all.perWS[fromId]||base); return all;}); }
export function removeProfile(id){ kpi.update(all=>{ delete all.perWS[id]; return all;}); }
