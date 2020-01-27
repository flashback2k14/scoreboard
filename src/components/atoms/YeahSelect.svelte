<script>
  export let labelText;
</script>

<style>
  .textfield-outlined {
    --primary-rgb: rgb(41, 98, 255);
    --border-1-rgba: rgba(55, 71, 79, 0.6);
    --border-2-rgba: rgba(55, 71, 79, 0.87);
    --border-3-rgba: rgba(55, 71, 79, 0.38);

    position: relative;
    display: inline-block;
    padding-top: 6px;
    font-family: inherit;
    font-size: 16px;
    line-height: 1.5;
    overflow: hidden;

    width: inherit;
    height: 56px;
  }

  .textfield-outlined > select {
    box-sizing: border-box;
    margin: 0;
    border: solid 1px; /* Safari */
    border-color: var(--border-1-rgba);
    border-top-color: transparent;
    border-radius: 4px;
    padding: 15px 13px 15px;
    width: 100%;
    height: inherit;
    color: var(--border-2-rgba);
    background-color: transparent;
    box-shadow: none; /* Firefox */
    font-family: inherit;
    font-size: inherit;
    line-height: inherit;
    caret-color: var(--primary-rgb);
    transition: border 0.2s, box-shadow 0.2s;
  }

  /* Span */
  .textfield-outlined > select + span {
    position: absolute;
    top: 0;
    left: 0;
    display: flex;
    border-color: var(--border-1-rgba);
    width: 100%;
    max-height: 100%;
    color: var(--border-1-rgba);
    font-size: 75%;
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
    border-top-color: var(--border-1-rgba);
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
  .textfield-outlined > select:hover {
    border-color: var(--primary-rgb);
    border-top-color: transparent;
    box-shadow: inset 1px 0 var(--primary-rgb), inset -1px 0 var(--primary-rgb),
      inset 0 -1px var(--primary-rgb);
    outline: none;
  }

  .textfield-outlined > select:hover + span {
    color: var(--primary-rgb);
  }

  .textfield-outlined > select:hover + span::before,
  .textfield-outlined > select:hover + span::after {
    border-top-color: var(--primary-rgb) !important;
    box-shadow: inset 0 1px var(--primary-rgb);
  }

  .textfield-outlined:hover > select:not(:focus):placeholder-shown {
    border-color: var(--primary-rgb);
  }

  /* Placeholder-shown */
  .textfield-outlined > select:not(:focus):placeholder-shown {
    border-top-color: var(--border-2-rgba);
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
    border-color: var(--primary-rgb);
    border-top-color: transparent;
    box-shadow: inset 1px 0 var(--primary-rgb), inset -1px 0 var(--primary-rgb),
      inset 0 -1px var(--primary-rgb);
    outline: none;
  }

  .textfield-outlined > select:focus + span {
    color: var(--primary-rgb);
  }

  .textfield-outlined > select:focus + span::before,
  .textfield-outlined > select:focus + span::after {
    border-top-color: var(--primary-rgb) !important;
    box-shadow: inset 0 1px var(--primary-rgb);
  }

  /* Disabled */
  .textfield-outlined > select:disabled,
  .textfield-outlined > select:disabled + span {
    border-color: var(--border-3-rgba) !important;
    border-top-color: transparent !important;
    color: var(--border-3-rgba);
    pointer-events: none;
  }

  .textfield-outlined > select:disabled + span::before,
  .textfield-outlined > select:disabled + span::after {
    border-top-color: var(--border-3-rgba) !important;
  }

  .textfield-outlined > select:disabled:placeholder-shown,
  .textfield-outlined > select:disabled:placeholder-shown + span {
    border-top-color: var(--border-3-rgba) !important;
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
  <select placeholder=" ">
    <option value="nothing" selected disabled>
      Select an event or create one...
    </option>
    <option value="1">1</option>
    <option value="2">2</option>
    <option value="3">3</option>
    <option value="4">4</option>
  </select>
  <span>{labelText}</span>
</label>
