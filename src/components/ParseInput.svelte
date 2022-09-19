<script>
  import parse from "../lib/parse";

  export let label = "";
  export let data = "";
</script>

<div>
  <label for="vertex">{label} = </label>
  <input
    id="vertex"
    name="vertex"
    placeholder={`{{0,0,0}, {500,0,0}, {500,500,0}, {0,500,0}}`}
    bind:value={data}
  />
  <p on:click={console.log(parse(data))}>{label} = {data}</p>
</div>
