<script lang="ts">
  import { onMount } from "svelte";

  let portalElementRef: HTMLDivElement;

  onMount(() => {

  });
</script>

<div bind:this={portalElementRef} class="mask w-full h-full z-10 bg-black/40 flex items-center justify-center absolute top-0 left-0">
  <div class="w-96 h-96 rounded-sm bg-white p-4 z-50">
    this is menu
  </div>
</div>
