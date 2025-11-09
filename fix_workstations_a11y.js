const fs = require('fs');
const file = 'src/pages/Workstations.svelte';

if (!fs.existsSync(file)) {
  console.log('Workstations.svelte nicht gefunden – übersprungen.');
  process.exit(0);
}

const src = fs.readFileSync(file, 'utf8');
const lines = src.split('\n');

let changed = false;
for (let i = 0; i < lines.length; i++) {
  const L = lines[i];

  // Wir suchen die klickbare Kachel-Zeile:
  // Muss "cursor-pointer" + "on:click" enthalten (die äußere Kachel)
  if (L.includes('cursor-pointer') && L.includes('on:click')) {
    // Versuche Klassen herauszuziehen, sonst fallback zu bekannten Klassen
    const clsMatch = L.match(/class="([^"]+)"/);
    const klass = clsMatch ? clsMatch[1] :
      'p-6 rounded-2xl border border-black/10 dark:border-white/10 bg-white dark:bg-neutral-900 hover:bg-black/5 dark:hover:bg-white/10 transition cursor-pointer text-center';

    // Zielzeile: **valide** Svelte-Attribute, A11y vollständig
    const fixed =
      `        <div class="${klass}" on:click={()=>open(w)} role="button" tabindex="0" on:keydown={(e)=>{if(e.key==='Enter'||e.key===' '){open(w)}}}>`;

    // Ersetze gesamte Zeile
    lines[i] = fixed;
    changed = true;
    break; // nur die erste passende Zeile fixen
  }
}

if (!changed) {
  console.log('Keine zu reparierende Zeile gefunden – Datei unverändert.');
  process.exit(0);
}

fs.writeFileSync(file, lines.join('\n'), 'utf8');
console.log('A11y-Zeile repariert.');
