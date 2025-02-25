<script lang="ts">
  import StatusBar from "./lib/StatusBar.svelte";
  import HyprWindow from "./lib/HyprWindow.svelte";
  import {
    activeWindowId,
    appWindows,
    updateActiveWindow,
  } from "./store/app.store";
  import { fly } from "svelte/transition";
  import { onMount } from "svelte";

  let windowClientRef: HTMLDivElement;
  let windowRef: HTMLDivElement;

  const handleNewWindow = () => {
    if($appWindows.length == 9) {
      return;
    }

    appWindows.update((value) => {
      let id = String(value.length + 1);
      value.push({
        id: id,
        element: HyprWindow,
        children: [],
      });
      updateActiveWindow(id);
      return value;
    });
  };

  $effect(() => {
    if (activeWindowId) {
      windowRef.style.width =
        $appWindows.length * (windowClientRef?.clientWidth || 0) + "px";
      activeWindowId.subscribe((value) => {
        windowRef.style.transform = `translateX(-${(Number(value) - 1) * (windowClientRef?.clientWidth || 0)}px)`;
      });
    } else {
      windowRef.style.width = "100%";
    }
  });

  onMount(() => {
    console.log($appWindows);
  });
</script>

<main class="h-screen w-screen flex flex-col overflow-hidden p-4 space-y-2">
  <StatusBar onNewWindow={handleNewWindow} />

  <div bind:this={windowClientRef} class="w-full h-full overflow-hidden">
    <div bind:this={windowRef} class="flex flex-row h-full">
      {#each $appWindows as item, i}
        <div transition:fly class="window rounded-md w-full h-full">
          <item.element appWindow={item}></item.element>
        </div>
      {/each}
    </div>
  </div>
</main>
