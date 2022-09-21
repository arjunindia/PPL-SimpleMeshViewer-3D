<script>
  import parse from "./lib/parse";
  import ParseInput from "./components/ParseInput.svelte";
  import babylon from "./lib/babylon";
  import { vectorizePoints, parseColor } from "./lib/babylon";
  import { vertexes, colors, segments } from "./state/store";
  import { onMount } from "svelte";

  let canvas;
  let button;
  let vertexArr = vectorizePoints(parse($vertexes));
  let colorArr = parseColor(parse($colors, true));
  let segmentArr = parse($segments);
  async function viewMesh() {
    babylon(canvas, vertexArr, colorArr, segmentArr)
      .then((destroy) => {
        button.addEventListener(
          "click",
          (e) => {
            destroy();
            viewMesh();
          },
          { once: true }
        );
      })
      .catch((err) => {
        console.log(err);
      });
  }
  onMount(async () => {
    viewMesh();
  });
  function setMesh() {
    vertexArr = vectorizePoints(parse($vertexes));
    colorArr = parseColor(parse($colors, true));
    segmentArr = parse($segments);
    console.log({ vertexArr, colorArr, segmentArr });
  }
</script>

<main>
  <canvas
    height={(window.innerHeight / 3) * 2.2}
    width={(window.innerWidth / 3) * 2.5}
    bind:this={canvas}
  />
  <div class="inputs">
    <ParseInput label={"vertexes"} bind:data={$vertexes} />
    <ParseInput label={"colors"} bind:data={$colors} />
    <ParseInput label={"segments"} bind:data={$segments} />
  </div>
  <button bind:this={button} on:click={setMesh}>View this mesh!</button>
</main>

<style>
  .inputs {
    display: flex;
    width: 80vw;
    justify-content: space-between;
    margin-top: 3vh;
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
