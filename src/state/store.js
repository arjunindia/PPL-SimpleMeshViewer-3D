import { writable } from "svelte/store";

export const vertexes = writable("{{0,0,0}, {50,0,0}, {50,50,0}, {0,50,0}}");
export const colors = writable(
  "{0xffffffff, 0xffff00ff, 0xff00ffff, 0xff0000ff}"
);
export const segments = writable("{{0,1,2,3,0}}");
