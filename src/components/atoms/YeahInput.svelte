<script>
  export let labelText;
  export let inputType;
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
  }

  .textfield-outlined > input {
    box-sizing: border-box;
    margin: 0;
    border: solid 1px; /* Safari */
    border-color: var(--border-2-color);
    border-top-color: transparent;
    border-radius: 4px;
    padding: 15px 13px 15px;
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
  .textfield-outlined > input + span {
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
  .textfield-outlined > input + span::before,
  .textfield-outlined > input + span::after {
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

  .textfield-outlined > input + span::before {
    margin-right: 4px;
    border-left: solid 1px transparent;
    border-radius: 4px 0;
  }

  .textfield-outlined > input + span::after {
    flex-grow: 1;
    margin-left: 4px;
    border-right: solid 1px transparent;
    border-radius: 0 4px;
  }

  /* Hover */
  .textfield-outlined:hover > input {
    border-color: var(--border-3-color);
    border-top-color: transparent;
  }

  .textfield-outlined:hover > input + span::before,
  .textfield-outlined:hover > input + span::after {
    border-top-color: var(--border-3-color) !important;
  }

  .textfield-outlined > input:not(:focus):placeholder-shown {
    border-color: var(--border-3-color);
  }

  /* Placeholder-shown */
  .textfield-outlined > input:not(:focus):placeholder-shown {
    border-top-color: var(--border-3-color);
  }

  .textfield-outlined > input:not(:focus):placeholder-shown + span {
    font-size: inherit;
    line-height: 68px;
  }

  .textfield-outlined > input:not(:focus):placeholder-shown + span::before,
  .textfield-outlined > input:not(:focus):placeholder-shown + span::after {
    border-top-color: transparent;
  }

  /* Focus */
  .textfield-outlined > input:focus {
    border-color: var(--primary-color);
    border-top-color: transparent;
    box-shadow: inset 1px 0 var(--primary-color),
      inset -1px 0 var(--primary-color), inset 0 -1px var(--primary-color);
    outline: none;
  }

  .textfield-outlined > input:focus + span {
    color: var(--primary-color);
  }

  .textfield-outlined > input:focus + span::before,
  .textfield-outlined > input:focus + span::after {
    border-top-color: var(--primary-color) !important;
    box-shadow: inset 0 1px var(--primary-color);
  }

  /* Disabled */
  .textfield-outlined > input:disabled,
  .textfield-outlined > input:disabled + span {
    border-color: var(--border-1-color) !important;
    border-top-color: transparent !important;
    color: var(--border-1-color);
    pointer-events: none;
  }

  .textfield-outlined > input:disabled + span::before,
  .textfield-outlined > input:disabled + span::after {
    border-top-color: var(--border-1-color) !important;
  }

  .textfield-outlined > input:disabled:placeholder-shown,
  .textfield-outlined > input:disabled:placeholder-shown + span {
    border-top-color: var(--border-1-color) !important;
  }

  .textfield-outlined > input:disabled:placeholder-shown + span::before,
  .textfield-outlined > input:disabled:placeholder-shown + span::after {
    border-top-color: transparent !important;
  }

  /* Faster transition in Safari for less noticable fractional font-size issue */
  @media not all and (min-resolution: 0.001dpcm) {
    @supports (-webkit-appearance: none) {
      .textfield-outlined > input,
      .textfield-outlined > input + span,
      .textfield-outlined > input + span::before,
      .textfield-outlined > input + span::after {
        transition-duration: 0.1s;
      }
    }
  }
</style>

<label class="textfield-outlined">
  <input placeholder=" " type={inputType} />
  <span>{labelText}</span>
</label>
