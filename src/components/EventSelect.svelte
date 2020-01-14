<script>
  import { onDestroy, createEventDispatcher } from "svelte";

  import { user } from "../store/store.js";
  import { creator, reader } from "../database";

  let onlyAdmin = false;
  let localeUser = null;
  let selectableEvents = [];
  let selectableUsers = [];
  let selectedEvent = null;
  let selectedUsers = [];
  let addEventInput = "";

  const dispatch = createEventDispatcher();

  const unsubscriber = user.subscribe(async remoteUser => {
    localeUser = remoteUser;
    onlyAdmin = remoteUser.role === "admin";

    if (remoteUser) {
      selectableEvents =
        remoteUser.role === "read-only"
          ? await reader.getEventsByViewerRefs(remoteUser.events)
          : await reader.getEventsByUserId(remoteUser.uid);
    }
  });

  async function handleEventSelectionChange() {
    selectableUsers = [];
    dispatch("selected-event", { id: selectedEvent });
    selectableUsers = await reader.getUsersByRole("read-only");
  }

  async function addEvent() {
    const createdEvent = await creator.addEvent(localeUser.uid, addEventInput);
    await creator.addEventData(createdEvent.id);
    selectableEvents = await reader.getEventsByUserId(localeUser.uid);
    addEventInput = "";
  }

  function shouldBeSelected(userId) {
    for (const user of selectableUsers) {
      if (user.id === userId) {
        for (const event of user.events) {
          if (event.id.localeCompare(selectedEvent) !== -1) {
            return true;
          }
        }
      }
    }

    return false;
  }

  function addUsers() {}

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

  .ctrl_select-multi {
    height: 78px;
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
        placeholder="add event name" />
      <button class="ctrl ctrl_button" on:click={addEvent}>Add</button>
    </div>

    {#if selectableUsers.length > 0}
      <hr />

      <div class="ctrl-container">
        <select
          class="ctrl ctrl_select ctrl_select-multi"
          multiple
          bind:value={selectedUsers}>
          {#each selectableUsers as user}
            <option value={user.id}>
              {user.name} {shouldBeSelected(user.id) ? ' - selected' : ''}
            </option>
          {/each}
        </select>
        <button
          class="ctrl ctrl_button"
          style="margin-top: 4px"
          on:click={addUsers}>
          Save
        </button>
      </div>
    {/if}
  {/if}
</div>
