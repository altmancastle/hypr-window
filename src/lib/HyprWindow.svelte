<script lang="ts">
  import type { AppWindow } from "../store/app.store";
  import View from "./View.svelte";

  let { appWindow }: { appWindow: AppWindow } = $props();
  let resizeRef: HTMLDivElement;
  let containerRef: HTMLDivElement;
  let isResizing = $state(false);

  let masterView = $derived(()=>{
    if(appWindow.children.length > 0) {
      return appWindow.children[0]
    }
  })

  let stackView = $derived(()=>{
    if(appWindow.children.length > 1) {
      return appWindow.children.slice(1)
    }
    return []
  })

  $effect(()=>{

    isResizing = false

    const container = document.querySelector('.container');

    resizeRef.addEventListener('mousedown', () => {
      isResizing = true;
      document.body.style.cursor = 'col-resize';
    });

    document.addEventListener('mousemove', (e) => {
      if (!isResizing) return;

      const containerRect = containerRef.getBoundingClientRect();
      console.log(e.clientX, containerRect.left)


      const newWidth = (e.clientX - containerRect.left) / containerRect.width * 100;

      document.documentElement.style.setProperty(
        '--master-width',
        `${Math.min(Math.max(20, newWidth), 80)}%`
      );
    });

    document.addEventListener('mouseup', () => {
      isResizing = false;
      document.body.style.cursor = 'default';
    });
  })


</script>

<div
  bind:this={containerRef}
  class="window flex w-full h-full"
>
  <div class="master-area">
      <View view={masterView()}></View>
  </div>
  <div bind:this={resizeRef} class="resize-handle"></div>
  <div class="stack-area flex-1 flex flex-column">
    {#each stackView() as item, i}
      <View view={item}></View>
    {/each}
  </div>
</div>

<style>

:root {
  --gap: 5px;
  --master-width: 60%;
}

.window {
  gap: var(--gap);
  padding: var(--gap);
}
.master-area {
  flex: 1 1 var(--master-width);
  display: flex;
  flex-direction: column;
  gap: var(--gap);
}

.stack-area {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: var(--gap);
}

.resize-handle {
  width: 5px;
  background: #4c566a;
  cursor: col-resize;
}


</style>
