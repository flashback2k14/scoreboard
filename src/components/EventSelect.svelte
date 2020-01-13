<script>
  import { onDestroy, createEventDispatcher } from "svelte";

  import { user } from "../store/store.js";
  import { creator, reader } from "../database";

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
    const createdEvent = await creator.addEvent(localeUser.uid, addEventInput);
    await creator.addEventData(createdEvent.id);
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
    box-sizing: border-box;
    padding: 8px;
    font-size: medium;
    border: 1px solid lightgray;
    border-radius: 4px;
    outline: none;
    font-family: inherit;
  }

  .ctrl:hover,
  .ctrl:focus {
    border: 1px solid steelblue;
  }

  .ctrl_select {
    width: calc(100% - 4px);
    height: 36px;
    font-size: medium;
  }

  .ctrl_input {
    width: 82%;
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
      class="ctrl ctrl_input"
      type="text"
      placeholder="add event name" />
    <button class="ctrl ctrl_button" on:click={addEvent}>Add</button>
  </div>
</div>
