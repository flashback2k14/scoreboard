<script>
  export let cardTitle;
</script>

<style>
  .container {
    width: 25%;
    padding: 16px 16px 20px 16px;
    border-radius: 4px;

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

<div class="container">
  <h2>{cardTitle}</h2>
  <hr />
  <slot name="card-content" />
</div>
