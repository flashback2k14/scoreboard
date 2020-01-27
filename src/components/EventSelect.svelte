<script>
  import { onDestroy, createEventDispatcher } from "svelte";

  import { user } from "../store";
  import { creator, reader } from "../database";

  let onlyAdmin = false;
  let localeUser = null;
  let selectableEvents = [];
  let selectedEvent = null;
  let addEventInput = "";

  const dispatch = createEventDispatcher();

  const unsubscriber = user.subscribe(async remoteUser => {
    localeUser = remoteUser;

    if (remoteUser) {
      onlyAdmin = remoteUser.role === "admin";
      selectableEvents =
        remoteUser.role === "read-only"
          ? await reader.getEventsByViewerRefs(remoteUser.events)
          : await reader.getEventsByUserId(remoteUser.uid);
    }
  });

  async function handleEventSelectionChange() {
    dispatch("selected-event", { id: selectedEvent });
  }

  async function addEvent() {
    const createdEvent = await creator.addEvent(localeUser.uid, addEventInput);
    await creator.addEventData(createdEvent.id);
    selectableEvents = await reader.getEventsByUserId(localeUser.uid);
    addEventInput = "";
  }

  onDestroy(unsubscriber);
</script>

<style>
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
    width: 84%;
  }

  .ctrl_button {
    text-transform: uppercase;
    cursor: pointer;
    background: lightsteelblue;
    color: #000;
  }
</style>

<h3>Event Selection</h3>

<select
  class="ctrl ctrl_select"
  bind:value={selectedEvent}
  on:change={handleEventSelectionChange}>
  <option value="nothing" selected disabled>
    Select an event or create one...
  </option>
  {#each selectableEvents as event}
    <option value={event.id}>{event.name}</option>
  {/each}
</select>

{#if onlyAdmin}
  <hr />

  <div class="ctrl-container">
    <input
      bind:value={addEventInput}
      class="ctrl ctrl_input"
      type="text"
      placeholder="New event name" />
    <button class="ctrl ctrl_button" on:click={addEvent}>Add</button>
  </div>
{/if}
