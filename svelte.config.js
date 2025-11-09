import sveltePreprocess from "svelte-preprocess";

export default {
  // Preprocess für TS, PostCSS/Tailwind falls vorhanden
  preprocess: sveltePreprocess({
    sourceMap: true,
    typescript: true,
    postcss: true
  })
};
