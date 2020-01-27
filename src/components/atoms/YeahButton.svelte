<script>
  export let buttonText;
</script>

<style>
  button {
    --primary-rgb: rgb(41, 98, 255);
    --secondary-rgb: rgb(255, 255, 255);

    cursor: pointer;
    outline: none;
    font-family: inherit;

    margin-top: 6px;
    height: 56px;
  }

  button.outline {
    position: relative;
    z-index: 3;
    background: transparent;
    color: var(--primary-rgb);
    font-size: 16px;
    border-color: var(--primary-rgb);
    border-style: solid;
    border-width: 2px;
    border-radius: 4px;
    padding: 10px 40px;
    text-transform: uppercase;
    transition: all 0.2s linear;
  }

  button.outline:hover,
  button.outline:focus {
    color: var(--secondary-rgb);
    background: var(--primary-rgb);
    transition: all 0.2s linear;
  }

  button.outline:active {
    border-radius: 4px;
  }
</style>

<button class="outline">{buttonText}</button>
