<script>
  export let cardTitle;
  export let size = undefined;
  export let shadow = undefined;
</script>

<style>
  .container {
    padding: 16px 16px 20px 16px;
    border-radius: 4px;
    transition: box-shadow 0.2s;
  }

  .small {
    width: 25%;
  }

  .hover-shadow:hover {
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.07), 0 2px 4px rgba(0, 0, 0, 0.07),
      0 4px 8px rgba(0, 0, 0, 0.07), 0 8px 16px rgba(0, 0, 0, 0.07),
      0 16px 32px rgba(0, 0, 0, 0.07), 0 32px 64px rgba(0, 0, 0, 0.07);
  }

  .long-shadow {
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.07), 0 2px 4px rgba(0, 0, 0, 0.07),
      0 4px 8px rgba(0, 0, 0, 0.07), 0 8px 16px rgba(0, 0, 0, 0.07),
      0 16px 32px rgba(0, 0, 0, 0.07), 0 32px 64px rgba(0, 0, 0, 0.07);
  }

  h2 {
    margin-top: 4px;
    margin-bottom: 12px;
  }

  hr {
    margin-bottom: 4px;
  }
</style>

<div
  class="container"
  class:small={size === 'small'}
  class:hover-shadow={shadow === 'hover'}
  class:long-shadow={shadow === 'long'}>
  <h2>{cardTitle}</h2>
  <hr />
  <slot name="card-content" />
</div>
