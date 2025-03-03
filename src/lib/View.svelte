<script lang="ts">
  import {
    activeView,
    activeWindow,
    appWindows,
    type ViewApp,
  } from "../store/app.store";

  const {
    view,
    master,
    index,
  }: { view?: ViewApp; master?: boolean; index?: number } = $props();

  const handleMouseenter = () => {
    if ($activeView?.viewId !== view?.viewId && view) {
      activeView.set(view);
    }
  };

  const handleCloseApp = () => {
    activeView.set(null);

    activeWindow.update((active) => {
      const newActive = {
        ...active,
        children: active.children.filter((v, i) => i !== index),
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
</script>

{#if view}
  <div
    role="application"
    onmouseenter={handleMouseenter}
    class="view flex-1 rounded-md border-2 border-transparent relative hover:border-amber-500"
  >
    <div
      class="absolute -top-2 -right-2 w-4 h-4 z-50 items-center justify-center flex rounded-full bg-red-400 opacity-0 cursor-pointer hover:opacity-100"
    >
      <button onclick={handleCloseApp}>x</button>
    </div>
    <view.element></view.element>
  </div>
{/if}
