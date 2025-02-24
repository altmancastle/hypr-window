<script lang="ts">
  import { onMount } from "svelte";
  import { appWindows, type AppWindow } from "../store/app.store";

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
  <div class="flex-1">operate</div>
</div>
