<script>
  let count = 0;

  function increment() {
    count += 1;
  }
</script>

<main>
  <h1>Hello Svelte!</h1>
  <button on:click={increment}>Count: {count}</button>
</main>
