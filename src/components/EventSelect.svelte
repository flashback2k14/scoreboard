<script>
  import { onDestroy, createEventDispatcher } from "svelte";

  import { user } from "../store/store.js";
  import { creator, reader } from "../database/index.js";

  let localeUser = null;
  let selectableEvents = [];
  let selectedEvent = null;
  let addEventInput = "";

  const dispatch = createEventDispatcher();

  const unsubscriber = user.subscribe(async remoteUser => {
    localeUser = remoteUser;
    if (remoteUser) {
      selectableEvents = await reader.getEventByUserId(remoteUser.uid);
    }
  });

  function handleSelectionChange() {
    dispatch("selected-event", { id: selectedEvent });
  }

  async function addEvent() {
    await creator.addEvent(localeUser.uid, addEventInput);
    selectableEvents = await reader.getEventByUserId(localeUser.uid);
    addEventInput = "";
  }

  onDestroy(unsubscriber);
</script>

<style>
  .container {
    margin-top: 8px;
  }

  .ctrl-container {
    margin-top: 4px;
  }

  .ctrl {
    padding: 8px;
    margin-right: 4px;
    background: inherit;
    border: 1px solid steelblue;
    border-radius: 4px;
    font-size: medium;
    outline: none;
  }

  .ctrl:hover,
  .ctrl:focus {
    border: 2px solid steelblue;
  }

  .ctrl_select {
    width: calc(100% - 4px);
    font-size: larger;
  }

  .ctrl_button {
    text-transform: uppercase;
    cursor: pointer;
  }
</style>

<div class="container">
  <select
    class="ctrl ctrl_select"
    bind:value={selectedEvent}
    on:change={handleSelectionChange}>
    <option value="nothing" selected disabled>
      Select an event or create one...
    </option>
    {#each selectableEvents as event}
      <option value={event.id}>{event.name}</option>
    {/each}
  </select>
  <hr />
  <div class="ctrl-container">
    <input
      bind:value={addEventInput}
      style="width: 72%;"
      class="ctrl"
      type="text"
      placeholder="add event name" />
    <button class="ctrl ctrl_button" on:click={addEvent}>Add</button>
  </div>
</div>
