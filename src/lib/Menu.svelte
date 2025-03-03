<script lang="ts">
  import { onMount } from "svelte";
  import Dashboard from "../pages/Dashboard.svelte";
  import Message from "../pages/Message.svelte";

  export interface App {
    name: string;
    component: any;
  }

  const { onOpenApp }: { onOpenApp: (app: App) => void } = $props();

  let portalElementRef: HTMLDivElement;
  let searchRef: HTMLInputElement;

  let currentActive = $state(-1);

  const APPS = [
    {
      name: "dashboard",
      component: Dashboard,
    },
    {
      name: "message",
      component: Message,
    },
  ];

  onMount(() => {
    searchRef.focus();

    document.addEventListener("keydown", (e) => {
      if (e.key === "ArrowDown") {
        if (currentActive < apps.length - 1) {
          currentActive += 1;
        }
      }
      if (e.key === "ArrowUp") {
        if (currentActive > 0) {
          currentActive -= 1;
        }
      }
    });

    searchRef.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        handleApp(apps[currentActive]);
      }
    });
  });

  let apps = $state(APPS);

  const handleApp = (app: App) => {
    onOpenApp(app);
    portalElementRef.remove();
  };

  const handleSearch = (e: Event) => {
    const value = (e.target as HTMLInputElement).value;
    apps = APPS.filter((app) => app.name.includes(value));
  };
</script>

<div
  bind:this={portalElementRef}
  class="mask w-full h-full z-10 bg-black/40 flex items-center justify-center absolute top-0 left-0"
>
  <div class="w-96 h-96 rounded-sm bg-white p-4 z-50">
    <div>
      <input
        bind:this={searchRef}
        onchange={handleSearch}
        oninput={handleSearch}
        class="w-full px-2 py-2 border border-gray-200 rounded-sm"
        type="text"
        placeholder="请输入"
      />
    </div>
    <ul class="list-none p-0 m-0">
      {#each apps as app, index}
        <li class="">
          <button
            class={[
              "px-2 py-3 border-b border-amber-300 w-full text-left rounded-md hover:bg-blue-500 hover:text-white",
              currentActive === index ? "bg-blue-500 text-white" : "",
            ]}
            onkeydown={(e) => {
              if (e.key === "Enter") {
                handleApp(app);
              }
            }}
            onclick={() => handleApp(app)}
          >
            {app.name}
          </button>
        </li>
      {/each}
    </ul>
  </div>
</div>
