<script lang="ts">
  import StatusBar from "./lib/StatusBar.svelte";
  import HyprWindow from "./lib/HyprWindow.svelte";
  import { activeWindowId, appWindows } from "./store/app.store";

  const handleNewWindow = () => {
    appWindows.update((value) => {
      let id = String(value.length + 1);
      value.push({
        id: id,
        element: HyprWindow,
        children: [],
      });
      activeWindowId.set(id);
      return value;
    });
  };
</script>

<main>
  <StatusBar onNewWindow={handleNewWindow} />

  {#each $appWindows as item, i}
    <div class="window border border-gray-300 rounded-md p-4">
      {item.element}
    </div>
  {/each}
</main>
