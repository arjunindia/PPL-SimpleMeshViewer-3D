<script>
  import parse from "./lib/parse";
  import ParseInput from "./components/ParseInput.svelte";
  import babylon from "./lib/babylon";
  import { vectorizePoints, parseColor } from "./lib/babylon";
  import { vertexes, colors, segments } from "./state/store";
  import { onMount } from "svelte";

  let canvas;
  onMount(async () => {
    babylon(canvas);
  });
</script>

<main>
  <canvas
    height={(window.innerHeight / 3) * 2.2}
    width={(window.innerWidth / 3) * 2.5}
    bind:this={canvas}
  />
  <div class="card">
    {console.log(parse($vertexes))}
  </div>
  <div class="inputs">
    <ParseInput label={"vertexes"} bind:data={$vertexes} />
    <ParseInput label={"colors"} bind:data={$colors} />
    <ParseInput label={"segments"} bind:data={$segments} />
  </div>
</main>

<style>
  .inputs {
    display: flex;
    width: 80vw;
    justify-content: space-between;
  }
  main {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  canvas {
    border-radius: 10px;
    border: 1px solid black;
  }
  @media screen and (max-width: 700px) {
    .inputs {
      flex-direction: column;
    }
  }
</style>
