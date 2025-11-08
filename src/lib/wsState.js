import { writable } from "svelte/store";
const KEY="sqdc.ws.v1";
function load(){ try{ return JSON.parse(localStorage.getItem(KEY))||{} }catch{return{}} }
const init = load();
if(!init.list || !init.list.length) init.list=["WS01"];
if(!init.current) init.current=init.list[0];
export const ws = writable(init);
ws.subscribe(v=>{ try{ localStorage.setItem(KEY, JSON.stringify(v)); }catch{} });
export const setCurrent=id=>ws.update(s=>({...s,current:id}));
export const addWS=id=>ws.update(s=>s.list.includes(id)?s:{...s,list:[...s.list,id]});
export const renameWS=(a,b)=>ws.update(s=>{const list=s.list.map(x=>x===a?b:x); return {...s,list,current:s.current===a?b:s.current}});
export const removeWS=id=>ws.update(s=>{const list=s.list.filter(x=>x!==id); return {list,current:list[0]||""}});
