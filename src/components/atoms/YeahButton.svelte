<script>
  import { createEventDispatcher } from "svelte";

  export let text;
  export let type;
  export let size;
  export let style;

  const dispatch = createEventDispatcher();

  function handleClick(e) {
    dispatch("clicked", e);
  }
</script>

<style>
  button {
    cursor: pointer;
    outline: none;
    font-family: inherit;
  }

  button.outline {
    position: relative;
    z-index: 3;
    background: transparent;
    font-size: 14px;
    border-style: solid;
    border-width: 2px;
    border-radius: 4px;
    text-transform: uppercase;
    transition: all 0.2s linear;
  }

  button.outline:hover,
  button.outline:focus {
    transition: all 0.2s linear;
  }

  button.outline:active {
    border-radius: 4px;
  }

  button.primary {
    color: var(--primary-color);
    border-color: var(--primary-color);
  }

  button.primary:hover,
  button.primary:focus {
    color: var(--white-color);
    background: var(--primary-color);
  }

  button.secondary {
    color: var(--secondary-color);
    border-color: var(--secondary-color);
  }

  button.secondary:hover,
  button.secondary:focus {
    color: var(--black-color);
    background: var(--secondary-color);
  }

  button.big {
    height: 53px;
    margin-top: 6px;
    padding: 10px 40px;
  }

  button.small {
    height: 38px;
    padding: 0 40px;
  }
</style>

<button
  class="outline"
  class:primary={style === 'primary'}
  class:secondary={style === 'secondary'}
  class:big={size === 'normal'}
  class:small={size === 'small'}
  {type}
  on:click={handleClick}>
  {text}
</button>
