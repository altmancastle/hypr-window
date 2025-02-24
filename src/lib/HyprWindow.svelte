<script lang="ts">
  import type { AppWindow } from "../store/app.store";
  import View from "./View.svelte";

  let { appWindow }: { appWindow: AppWindow } = $props();
</script>

<div class="window w-full h-full grid grid-flow-col grid-rows-3 gap-4">
  {#each appWindow.children as item, i}
    <View view={item}></View>
  {/each}
</div>
