<script>
  import { createEventDispatcher } from "svelte";

  const dispatch = createEventDispatcher();

  export let labelText;

  function handleChangedSelection(e) {
    dispatch("handle-changed-selection", { id: e.target.value });
  }
</script>

<style>
  .textfield-outlined {
    position: relative;
    display: inline-block;
    padding-top: 6px;
    font-family: inherit;
    font-size: 14px;
    line-height: 1.5;
    overflow: hidden;

    width: 100%;
    height: 56px;
  }

  .textfield-outlined > select {
    box-sizing: border-box;
    margin: 0;
    border: solid 1px; /* Safari */
    border-color: var(--border-2-color);
    border-top-color: transparent;
    border-radius: 4px;
    padding: 15px 13px 13px;
    width: 100%;
    height: inherit;
    color: var(--border-3-color);
    background-color: transparent;
    box-shadow: none; /* Firefox */
    font-family: inherit;
    font-size: inherit;
    line-height: inherit;
    caret-color: var(--primary-color);
    transition: border 0.2s, box-shadow 0.2s;
  }

  /* Span */
  .textfield-outlined > select + span {
    position: absolute;
    top: 0;
    left: 0;
    display: flex;
    border-color: var(--border-2-color);
    width: 100%;
    max-height: 100%;
    color: var(--border-2-color);
    font-size: 85%;
    line-height: 15px;
    cursor: text;
    transition: color 0.2s, font-size 0.2s, line-height 0.2s;
  }

  /* Corners */
  .textfield-outlined > select + span::before,
  .textfield-outlined > select + span::after {
    content: "";
    display: block;
    box-sizing: border-box;
    margin-top: 6px;
    border-top: solid 1px;
    border-top-color: var(--border-2-color);
    min-width: 10px;
    height: 8px;
    pointer-events: none;
    box-shadow: inset 0 1px transparent;
    transition: border-color 0.2s, box-shadow 0.2s;
  }

  .textfield-outlined > select + span::before {
    margin-right: 4px;
    border-left: solid 1px transparent;
    border-radius: 4px 0;
  }

  .textfield-outlined > select + span::after {
    flex-grow: 1;
    margin-left: 4px;
    border-right: solid 1px transparent;
    border-radius: 0 4px;
  }

  /* Hover */
  .textfield-outlined:hover > select {
    border-color: var(--border-3-color);
    border-top-color: transparent;
  }

  .textfield-outlined:hover > select + span::before,
  .textfield-outlined:hover > select + span::after {
    border-top-color: var(--border-3-color) !important;
  }

  .textfield-outlined > select:not(:focus):placeholder-shown {
    border-color: var(--border-3-color);
  }

  /* Placeholder-shown */
  .textfield-outlined > select:not(:focus):placeholder-shown {
    border-top-color: var(--border-3-color);
  }

  .textfield-outlined > select:not(:focus):placeholder-shown + span {
    font-size: inherit;
    line-height: 68px;
  }

  .textfield-outlined > select:not(:focus):placeholder-shown + span::before,
  .textfield-outlined > select:not(:focus):placeholder-shown + span::after {
    border-top-color: transparent;
  }

  /* Focus */
  .textfield-outlined > select:focus {
    border-color: var(--primary-color);
    border-top-color: transparent;
    box-shadow: inset 1px 0 var(--primary-color),
      inset -1px 0 var(--primary-color), inset 0 -1px var(--primary-color);
    outline: none;
  }

  .textfield-outlined > select:focus + span {
    color: var(--primary-color);
  }

  .textfield-outlined > select:focus + span::before,
  .textfield-outlined > select:focus + span::after {
    border-top-color: var(--primary-color) !important;
    box-shadow: inset 0 1px var(--primary-color);
  }

  /* Disabled */
  .textfield-outlined > select:disabled,
  .textfield-outlined > select:disabled + span {
    border-color: var(--border-1-color) !important;
    border-top-color: transparent !important;
    color: var(--border-1-color);
    pointer-events: none;
  }

  .textfield-outlined > select:disabled + span::before,
  .textfield-outlined > select:disabled + span::after {
    border-top-color: var(--border-1-color) !important;
  }

  .textfield-outlined > select:disabled:placeholder-shown,
  .textfield-outlined > select:disabled:placeholder-shown + span {
    border-top-color: var(--border-1-color) !important;
  }

  .textfield-outlined > select:disabled:placeholder-shown + span::before,
  .textfield-outlined > select:disabled:placeholder-shown + span::after {
    border-top-color: transparent !important;
  }

  /* Faster transition in Safari for less noticable fractional font-size issue */
  @media not all and (min-resolution: 0.001dpcm) {
    @supports (-webkit-appearance: none) {
      .textfield-outlined > select,
      .textfield-outlined > select + span,
      .textfield-outlined > select + span::before,
      .textfield-outlined > select + span::after {
        transition-duration: 0.1s;
      }
    }
  }
</style>

<label class="textfield-outlined">
  <select placeholder=" " on:change={handleChangedSelection}>
    <option value="nothing" selected disabled>Nothing selected...</option>
    <slot />
  </select>
  <span>{labelText}</span>
</label>
