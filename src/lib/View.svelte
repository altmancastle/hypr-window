<script lang="ts">
  import { activeView, type ViewApp } from "../store/app.store";

  const { view }: { view: ViewApp } = $props();

  const handleMouseenter = () => {
    if ($activeView?.viewId !== view.viewId) {
      activeView.set(view);
    }
  };
</script>

<div
  role="application"
  onmouseenter={handleMouseenter}
  class="view flex-1 p-2 rounded-md hover:bg-gray-200"
>
  <view.element></view.element>
</div>
