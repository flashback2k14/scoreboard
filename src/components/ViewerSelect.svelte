<script>
  import { creator, reader, updater } from "../database";

  export let eventId;
  export let userRole;

  let onlyAdmin = false;
  let selectableUsers = [];

  $: {
    if (eventId) {
      loadData();
    }

    if (userRole) {
      onlyAdmin = userRole === "admin";
    }
  }

  async function loadData() {
    selectableUsers = [];
    selectableUsers = await reader.getUsersByRole("read-only");
  }

  function shouldBeSelected(userId, events) {
    for (const event of events) {
      if (event.id === eventId) {
        return true;
      }
    }
    return false;
  }

  function handleChangedViewerSelection(user) {
    return async function(event) {
      let data;

      if (event.target.checked) {
        // add to events
        const newEvent = creator.getEventRef(eventId);
        data = { ...user, events: [...user.events, newEvent] };
        console.log(data);
      } else {
        // remove from events
        const updatedEvents = user.events.filter(event => event.id !== eventId);
        data = { ...user, events: updatedEvents };
        console.log(data);
      }

      await updater.updateUserData(user.id, data);
    };
  }
</script>

<style>
  ul {
    list-style: none;
    margin-top: 0;
    padding-left: 0;
  }

  .ctrl {
    box-sizing: border-box;
    padding: 8px;
    margin-bottom: 4px;
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

  input[type="checkbox"] {
    display: none;
  }

  label {
    display: inline-block;
    cursor: pointer;
    padding-left: 25px;
    width: 90%;
    position: relative;
  }

  input[type="checkbox"] + label:after {
    font-family: "Material Icons";
    content: "";
    display: inline-block;
    width: 16px;
    height: 16px;
    position: absolute;
    left: 0;
    border: 2px solid lightgray;
    border-radius: 2px;
  }

  input[type="checkbox"]:checked + label:after {
    content: "\E5CA";
    color: #000;
    font-size: 16px;
    text-align: center;
    line-height: 16px;
    background: lightsteelblue;
    border-color: lightsteelblue;
  }
</style>

{#if onlyAdmin && selectableUsers && selectableUsers.length > 0}
  <hr />

  <h3>Viewer Selection</h3>

  <ul>
    {#each selectableUsers as user, i}
      <li>
        <div class="ctrl">
          <input
            id={'liCheckbox' + i}
            type="checkbox"
            checked={shouldBeSelected(user.uid, user.events)}
            on:change={handleChangedViewerSelection(user)} />
          <label for={'liCheckbox' + i}>{user.name}</label>
        </div>
      </li>
    {/each}
  </ul>
{/if}
