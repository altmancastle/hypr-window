<script lang="ts">
  import type { AppWindow } from "../store/app.store";
  import View from "./View.svelte";

  let { appWindow }: { appWindow: AppWindow } = $props();

  let gridTemplateColumns = $state("1fr");

  $effect(() => {
    const length = appWindow.children.length;
    let columns = [1];
    for (let i = 1; i < length; i++) {
      const last = columns[columns.length - 1];
      columns = [...columns.slice(0, -1), last / 2, last / 2];
    }
    gridTemplateColumns = columns.map((c) => `${c}fr`).join(" ");
  });
</script>

<div
  class="window w-full h-full grid grid-flow-col gap-4"
  style="grid-template-columns: {gridTemplateColumns}; grid-auto-flow: column;"
>
  {#each appWindow.children as item, i}
    <View view={item}></View>
  {/each}
</div>
