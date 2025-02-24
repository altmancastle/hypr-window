import { writable } from "svelte/store";
import HyprWindow from "../lib/HyprWindow.svelte";
import type View from "../lib/View.svelte";

export type AppWindow = {
  id: string;
  element: typeof HyprWindow;
  children: ViewApp[];
};

export type ViewApp = {
  viewId: string;
  layout: typeof View;
  element: any;
};

export const appWindows = writable<AppWindow[]>([]);

export const activeWindowId = writable<string>("");
export const activeWindow = writable<AppWindow>();
export const activeView = writable<ViewApp>();

export const updateActiveWindow = (id: string) => {
  activeWindowId.set(id);
  appWindows.subscribe((val) => {
    const win = val.find((v) => v.id === id);
    if (win) {
      activeWindow.set(win);
    }
  });
};
