<script lang="ts">
  import type { AppWindow } from "../store/app.store";
  import View from "./View.svelte";

  let { appWindow }: { appWindow: AppWindow } = $props();
</script>

<div class="window">
  <div>
    windows {appWindow.id}
  </div>

  {#each appWindow.children as item, i}
    <div>
      <View children={item.element}></View>
    </div>
  {/each}
</div>
