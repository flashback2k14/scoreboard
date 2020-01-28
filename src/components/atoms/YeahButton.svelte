<script>
  export let buttonText;
</script>

<style>
  button {
    cursor: pointer;
    outline: none;
    font-family: inherit;

    margin-top: 6px;
    height: 53px;
  }

  button.outline {
    position: relative;
    z-index: 3;
    background: transparent;
    color: var(--primary-color);
    font-size: 14px;
    border-color: var(--primary-color);
    border-style: solid;
    border-width: 2px;
    border-radius: 4px;
    padding: 10px 40px;
    text-transform: uppercase;
    transition: all 0.2s linear;
  }

  button.outline:hover,
  button.outline:focus {
    color: var(--white-color);
    background: var(--primary-color);
    transition: all 0.2s linear;
  }

  button.outline:active {
    border-radius: 4px;
  }
</style>

<button class="outline">{buttonText}</button>
