import { writable } from "svelte/store";
const read = () => (location.hash.replace(/^#/, "") || "/login");
export const route = writable(read());
window.addEventListener("hashchange", () => route.set(read()));
export function goto(path="/"){ if(!path.startsWith("/")) path="/"+path; location.hash = path; }
export function back(){ if(history.length>1) history.back(); else goto("/"); }
