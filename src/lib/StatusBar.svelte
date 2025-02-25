<script lang="ts">
  import { onMount } from "svelte";
  import {
    activeView,
    activeWindow,
    appWindows,
    updateActiveWindow,
    type AppWindow,
  } from "../store/app.store";
  import View from "./View.svelte";
  import Dashboard from "../pages/Dashboard.svelte";
  import Message from "../pages/Message.svelte";

  const { onNewWindow }: { onNewWindow: () => void } = $props();

  const Apps = {
    Dashboard,
    Message,
  };

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
    if (!$activeWindow) {
      handleNewWindow();
    }

    if ($activeWindow?.children.length == 4) {
      return;
    }

    activeWindow.update((active) => {
      const newActive = {
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
        const index = win.findIndex((w) => w.id === newActive.id);
        if (index !== -1) {
          win[index] = newActive;
        }
        return win;
      });

      return newActive;
    });
  };

  const handleToggleWindow = (item: AppWindow) => {
    updateActiveWindow(item.id);
  };
</script>

<div
  class="status-bar flex items-center px-2 py-2 bg-gray-200 text-black shadow shadow-blue-200 rounded-md overflow-hidden"
>
  <div class="flex-1 flex items-center">
    <button
      aria-labelledby="new-window"
      title="New Window"
      class="mr-0.5 rounded-md bg-gray-300 p-2 cursor-pointer"
      onclick={handleNewWindow}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        fill="currentColor"
        class="bi bi-house-add"
        viewBox="0 0 16 16"
      >
        <path
          d="M8.707 1.5a1 1 0 0 0-1.414 0L.646 8.146a.5.5 0 0 0 .708.708L2 8.207V13.5A1.5 1.5 0 0 0 3.5 15h4a.5.5 0 1 0 0-1h-4a.5.5 0 0 1-.5-.5V7.207l5-5 6.646 6.647a.5.5 0 0 0 .708-.708L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293z"
        />
        <path
          d="M16 12.5a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0m-3.5-2a.5.5 0 0 0-.5.5v1h-1a.5.5 0 0 0 0 1h1v1a.5.5 0 1 0 1 0v-1h1a.5.5 0 1 0 0-1h-1v-1a.5.5 0 0 0-.5-.5"
        />
      </svg>
    </button>
    <ul class="flex list-none space-x-0.5">
      {#each windowRefs as item, i}
        <li>
          <button
            onclick={() => handleToggleWindow(item)}
            class={[
              "bg-gray-300 rounded-sm w-8 h-8 flex items-center justify-center cursor-pointer",
              $activeWindow.id === item.id && "text-white bg-blue-400!",
            ]}>{i + 1}</button
          >
        </li>
      {/each}
    </ul>
  </div>
  <div class="flex-1 text-center">{$activeView?.viewId}</div>
  <div class="flex-1 text-right">
    <button onclick={() => handleOpenApp("Dashboard")}>dashboard</button>
    <button onclick={() => handleOpenApp("Message")}>message</button>
  </div>
</div>

<style>
</style>
