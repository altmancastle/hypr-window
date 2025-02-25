<script lang="ts">
  import type { AppWindow } from "../store/app.store";
  import View from "./View.svelte";

  let { appWindow }: { appWindow: AppWindow } = $props();
  let resizeRef: HTMLDivElement;
  let containerRef: HTMLDivElement;
  let isResizing = $state(false);

  let masterView = $derived(() => {
    if (appWindow.children.length > 0) {
      if (appWindow.children.length == 1) {
        document.documentElement.style.setProperty("--master-width", `100%`);
      } else {
        document.documentElement.style.setProperty("--master-width", `60%`);
      }
      return appWindow.children[0];
    }
  });

  let stackView = $derived(() => {
    if (appWindow.children.length > 1) {
      resizeRef.style.display = "block";
      return appWindow.children.slice(1);
    }
    return [];
  });

  $effect(() => {
    isResizing = false;

    resizeRef.addEventListener("mousedown", () => {
      isResizing = true;
      document.body.style.cursor = "col-resize";
    });

    document.addEventListener("mousemove", (e) => {
      if (!isResizing) return;

      const containerRect = containerRef.getBoundingClientRect();

      const newWidth =
        ((e.clientX - containerRect.left) / containerRect.width) * 100;

      document.documentElement.style.setProperty(
        "--master-width",
        `${Math.min(Math.max(20, newWidth), 80)}%`
      );
    });

    document.addEventListener("mouseup", () => {
      isResizing = false;
      document.body.style.cursor = "default";
    });
  });
</script>

<div bind:this={containerRef} class="window flex w-full h-full">
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
    width: 100%;
  }
  .master-area {
    width: var(--master-width);
    display: flex;
    flex-direction: column;
    gap: var(--gap);
  }

  .stack-area {
    width: auto;
    display: flex;
    flex-direction: column;
    gap: var(--gap);
  }

  .resize-handle {
    display: none;
    width: 5px;
    background: #4c566a;
    cursor: col-resize;
  }
</style>
