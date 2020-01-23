<script>
  import { reader } from "../database";

  export let eventId;
  export let userRole;

  let onlyAdmin = false;
  let selectableUsers = [];
  let selectedUsers = [];

  $: {
    if (eventId) {
      loadData();
    }

    if (userRole) {
      onlyAdmin = userRole === "admin";
    }
  }

  async function loadData() {
    selectedUsers = [];
    selectableUsers = [];
    selectableUsers = await reader.getUsersByRole("read-only");
  }

  function shouldBeSelected(userId, events) {
    for (const event of events) {
      if (event.id === eventId) {
        selectedUsers.push(userId);
        return true;
      }
    }
    return false;
  }

  function addUsers() {
    console.log(selectedUsers);
    console.log(Array.from(new Set([...selectedUsers])));
  }
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

{#if onlyAdmin}
  <hr />

  <div class="ctrl-container">
    <select
      class="ctrl ctrl_select ctrl_select-multi"
      multiple
      bind:value={selectedUsers}>
      {#each selectableUsers as user}
        <option value={user.id}>
          {user.name} {shouldBeSelected(user.id, user.events) ? '' : ''}
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
