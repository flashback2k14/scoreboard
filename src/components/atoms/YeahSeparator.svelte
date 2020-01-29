<script>
  export let align = "horizontal";
</script>

<style>
  .horizontal {
    margin: 8px 0;
  }

  .vertical {
    margin: 0 3px;
  }
</style>

<div
  class:horizontal={align === 'horizontal'}
  class:vertical={align === 'vertical'} />
