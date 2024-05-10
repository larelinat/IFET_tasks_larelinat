<script lang="ts">
  import {onMount} from "svelte";

  const currencyLoad = async (cur: string) => {
    const res = await fetch(`https://open.er-api.com/v6/latest/${cur}`);
    const data = await res.json();
    return data.rates;
  }

  const changeCurrency = (cur: string) => {
    currencyLoad(cur).then(res => {
      currencies = res;
    });
  }

  let cur1 = 'USD';
  let cur2 = 'EUR';

  let currencyValue = 1;
  let value1 = 0;
  let value2 = 0;

  let direction = false;

  let currencies:{[key: string]:number} = {};

  onMount(async () => {
    currencies = await currencyLoad(cur1);
  });

  $: changeCurrency(cur1);
  $: currencyValue = currencies?.[cur2];
  $: {
    if (direction) {
      value2 = currencyValue * value1
    }
    else {
      value1 = value2 / currencyValue
    }
  }

  const handleFocus = (e: FocusEvent) => {
    (e.target as HTMLInputElement).select();
  }


</script>

<main>
  <h1>Конвертер валют</h1>
  <div>
    <select
            bind:value={cur1}
            on:click={() => {direction = true}}
    >
      {#each Object.keys(currencies) as currency}
        <option value={currency}>{currency}</option>
      {/each}
    </select>
    <input type='number'
           bind:value={value1}
           on:focus={(e) => {
             direction = true;
             handleFocus(e);
           }}
           >
  </div>
  <div>
    <select
            bind:value={cur2}
            on:click={() => {direction = false}}
    >
      {#each Object.keys(currencies) as currency}
        <option value={currency}>{currency}</option>
      {/each}
    </select>
    <input type='number'
           bind:value={value2}
           on:focus={(e) => {
             direction = false;
             handleFocus(e);
           }}
    >
  </div>
</main>

<style>

</style>
