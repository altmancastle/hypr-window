<script lang="ts">
  import { onMount } from "svelte";
  import { activeWindow, appWindows, type AppWindow } from "../store/app.store";
  import View from "./View.svelte";

  const { onNewWindow }: { onNewWindow: () => void } = $props();

  let windowRefs = $state<AppWindow[]>([]);

  onMount(() => {
    appWindows.subscribe((value) => {
      windowRefs = value;
    });
  });

  const handleNewWindow = () => {
    onNewWindow();
  };

  const handleOpenApp = (app: string) => {
    activeWindow.update((value) => {
      value = {
        ...value,
        children: [
          ...value.children,
          {
            viewId: String(value.children.length + 1),
            layout: View,
            element: import(`../pages/${app}.svelte`),
          },
        ],
      };
      return value;
    });

    activeWindow.subscribe((active) => {
      appWindows.update((value) => {
        value.splice(Number(active.id) - 1, 1, active); 
        return value;
      });
    });

  };
</script>

<div
  class="status-bar flex items-center px-4 py-2 bg-gray-800 text-white rounded-md overflow-hidden"
>
  <div class="flex-1 flex items-center">
    <button
      class="mr-2 rounded-md bg-gray-300 px-3 py-2"
      onclick={handleNewWindow}>new window</button
    >
    <ul class="flex list-none">
      {#each windowRefs as item, i}
        <li>{i + 1}</li>
      {/each}
    </ul>
  </div>
  <div class="flex-1">active view</div>
  <div class="flex-1">
    <button onclick={() => handleOpenApp("Dashboard")}>dashboard</button>
    <button onclick={() => handleOpenApp("Message")}>message</button>
  </div>
</div>
