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
    font-size: 14px;
    line-height: 1.5;
    overflow: hidden;
  }

  .textfield-outlined > textarea {
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
  .textfield-outlined > textarea + span {
    position: absolute;
    top: 0;
    left: 0;
    display: flex;
    border-color: var(--border-1-rgba);
    width: 100%;
    max-height: 100%;
    color: var(--border-1-rgba);
    font-size: 85%;
    line-height: 15px;
    cursor: text;
    transition: color 0.2s, font-size 0.2s, line-height 0.2s;
  }

  /* Corners */
  .textfield-outlined > textarea + span::before,
  .textfield-outlined > textarea + span::after {
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

  .textfield-outlined > textarea + span::before {
    margin-right: 4px;
    border-left: solid 1px transparent;
    border-radius: 4px 0;
  }

  .textfield-outlined > textarea + span::after {
    flex-grow: 1;
    margin-left: 4px;
    border-right: solid 1px transparent;
    border-radius: 0 4px;
  }

  /* Hover */
  .textfield-outlined > textarea:hover {
    border-color: var(--primary-rgb);
    border-top-color: transparent;
    box-shadow: inset 1px 1px var(--primary-rgb),
      inset -1px 1px var(--primary-rgb), inset 1px -1px var(--primary-rgb);
    outline: none;
  }

  .textfield-outlined > textarea:hover + span {
    color: var(--primary-rgb);
  }

  .textfield-outlined > textarea:hover + span::before,
  .textfield-outlined > textarea:hover + span::after {
    border-top-color: var(--primary-rgb) !important;
    box-shadow: inset 0 1px var(--primary-rgb);
  }

  .textfield-outlined:hover > textarea:not(:focus):placeholder-shown {
    border-color: var(--primary-rgb);
  }

  /* Placeholder-shown */
  .textfield-outlined > textarea:not(:focus):placeholder-shown {
    border-top-color: var(--border-2-rgba);
  }

  .textfield-outlined > textarea:not(:focus):placeholder-shown + span {
    font-size: inherit;
    line-height: 68px;
  }

  .textfield-outlined > textarea:not(:focus):placeholder-shown + span::before,
  .textfield-outlined > textarea:not(:focus):placeholder-shown + span::after {
    border-top-color: transparent;
  }

  /* Focus */
  .textfield-outlined > textarea:focus {
    border-color: var(--primary-rgb);
    border-top-color: transparent;
    box-shadow: inset 1px 0 var(--primary-rgb), inset -1px 0 var(--primary-rgb),
      inset 0 -1px var(--primary-rgb);
    outline: none;
  }

  .textfield-outlined > textarea:focus + span {
    color: var(--primary-rgb);
  }

  .textfield-outlined > textarea:focus + span::before,
  .textfield-outlined > textarea:focus + span::after {
    border-top-color: var(--primary-rgb) !important;
    box-shadow: inset 0 1px var(--primary-rgb);
  }

  /* Disabled */
  .textfield-outlined > textarea:disabled,
  .textfield-outlined > textarea:disabled + span {
    border-color: var(--border-3-rgba) !important;
    border-top-color: transparent !important;
    color: var(--border-3-rgba);
    pointer-events: none;
  }

  .textfield-outlined > textarea:disabled + span::before,
  .textfield-outlined > textarea:disabled + span::after {
    border-top-color: var(--border-3-rgba) !important;
  }

  .textfield-outlined > textarea:disabled:placeholder-shown,
  .textfield-outlined > textarea:disabled:placeholder-shown + span {
    border-top-color: var(--border-3-rgba) !important;
  }

  .textfield-outlined > textarea:disabled:placeholder-shown + span::before,
  .textfield-outlined > textarea:disabled:placeholder-shown + span::after {
    border-top-color: transparent !important;
  }

  /* Faster transition in Safari for less noticable fractional font-size issue */
  @media not all and (min-resolution: 0.001dpcm) {
    @supports (-webkit-appearance: none) {
      .textfield-outlined > textarea,
      .textfield-outlined > textarea + span,
      .textfield-outlined > textarea + span::before,
      .textfield-outlined > textarea + span::after {
        transition-duration: 0.1s;
      }
    }
  }
</style>

<label class="textfield-outlined">
  <textarea placeholder=" " rows="5" />
  <span>{labelText}</span>
</label>
