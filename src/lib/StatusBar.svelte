<script lang="ts">
  import { onMount } from "svelte";
  import { activeWindow, appWindows, type AppWindow } from "../store/app.store";
  import View from "./View.svelte";
  import Dashboard from "../pages/Dashboard.svelte";
  import Message from "../pages/Message.svelte";

  const { onNewWindow }: { onNewWindow: () => void } = $props();

  const Apps = {
    Dashboard,
    Message,
  }

  let windowRefs = $state<AppWindow[]>([]);

  onMount(() => {
    appWindows.subscribe((value) => {
      windowRefs = value;
    });
  });

  const handleNewWindow = () => {
    onNewWindow();
  };

  const handleOpenApp = (app: keyof typeof Apps) => {
    activeWindow.update((active) => {
      const value = {
        ...active,
        children: [
          ...active.children,
          {
            viewId: String(active.children.length + 1),
            layout: View,
            element: Apps[app],
          },
        ],
      };


      appWindows.update((win) => {
        win.splice(Number(value.id) - 1, 1, active);
        return win.slice(0);
      });

      return value;
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
