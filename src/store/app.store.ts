import { writable } from "svelte/store";
import HyprWindow from "../lib/HyprWindow.svelte";

export type AppWindow = {
  id: string;
  element: typeof HyprWindow;
  children: any[];
};
export const appWindows = writable<AppWindow[]>([]);

export const activeWindowId = writable<string>("");
