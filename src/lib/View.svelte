<script lang="ts">
  const { children } = $props();
</script>

<div class="view flex-1">
  {@render children?.()}
</div>
