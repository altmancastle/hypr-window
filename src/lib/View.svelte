<script lang="ts">
  import { activeView, type ViewApp } from "../store/app.store";

  const { view, master, index }: { view?: ViewApp, master?: boolean, index?: number } = $props();

  const handleMouseenter = () => {
    if ($activeView?.viewId !== view?.viewId && view) {
      activeView.set(view);
    }
  };
</script>

{#if view}
  <div
    role="application"
    onmouseenter={handleMouseenter}
    class="view flex-1 rounded-md border-2 border-transparent hover:border-amber-500"
  >
    <view.element></view.element>
  </div>
{/if}