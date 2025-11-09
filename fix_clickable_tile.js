const fs = require('fs');
const f = 'src/pages/Workstations.svelte';
if (!fs.existsSync(f)) process.exit(0);
let s = fs.readFileSync(f, 'utf8');
const re = /(^\s*)<div\s+class="([^"]*cursor-pointer[^"]*)"\s+on:click=\{\s*\(\)\s*=>\s*open\(w\)\s*\}\s*>/m;

const m = s.match(re);
if (!m) { console.log('Zielzeile nicht gefunden — Datei unverändert.'); process.exit(0); }

const indent = m[1];
const classes = m[2]
  .replace(/\bcursor-pointer\b/g, 'cursor-pointer') // keep
  .replace(/\btext-center\b/g, 'text-center')
  .trim();

// Button ist semantisch korrekt und hat automatisch Tastatur-Support
const replacement = `${indent}<button type="button" class="${classes}" on:click={()=>open(w)}>`;
s = s.replace(re, replacement);

// passendes schließendes Tag: das erste passende </div> der Kachel zu </button> ändern
// Wir suchen in der gleichen Indentation-Ebene (heuristisch: die nächste Zeile mit genau indent + "</div>")
const closeRe = new RegExp(`^${indent}<\\/div>`, 'm');
s = s.replace(closeRe, `${indent}</button>`);

fs.writeFileSync(f, s, 'utf8');
console.log('Clickable Tile → <button> umgebaut.');
