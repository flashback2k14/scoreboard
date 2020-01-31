<script>
  import { getNotificationsContext } from "svelte-notifications";

  import { creator, reader, updater } from "../../database";

  import YeahCard from "../atoms/YeahCard.svelte";

  export let eventId;

  let selectableUsers = [];

  const { addNotification } = getNotificationsContext();

  $: {
    if (eventId) {
      loadData();
    }
  }

  async function loadData() {
    try {
      selectableUsers = [];
      selectableUsers = await reader.getUsersByRole("read-only");
    } catch (error) {
      _showErrorMessage(error);
    }
  }

  function shouldBeSelected(userId, events) {
    for (const event of events) {
      if (event.id === eventId) {
        return true;
      }
    }
    return false;
  }

  async function handleChangedViewerSelection(event, user) {
    try {
      const data = event.target.checked
        ? {
            ...user,
            events: [...user.events, creator.getEventRef(eventId)]
          }
        : {
            ...user,
            events: user.events.filter(event => event.id !== eventId)
          };

      await updater.updateUserData(user.id, data);
    } catch (error) {
      _showErrorMessage(error);
    }
  }

  function _showErrorMessage(error) {
    addNotification({
      id: Date.now(),
      removeAfter: 3000,
      text: error.message,
      position: "bottom-right",
      type: "danger"
    });
  }
</script>

<style>
  ul {
    list-style: none;
    margin-top: 10px;
    margin-bottom: -4px;
    padding-left: 0;
  }

  .ctrl {
    box-sizing: border-box;
    padding: 16px 12px;
    margin-bottom: 6px;
    font-size: medium;
    border: 1px solid var(--border-3-color);
    border-radius: 4px;
    outline: none;
    font-family: inherit;
  }

  .ctrl:hover {
    border-color: var(--primary-color);
    box-shadow: inset 1px 1px var(--primary-color),
      inset -1px 1px var(--primary-color), inset 1px -1px var(--primary-color);
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
    border: 2px solid var(--border-3-color);
    border-radius: 2px;
  }

  input[type="checkbox"]:checked + label:after {
    content: "\E5CA";
    color: var(--white-color);
    font-size: 16px;
    text-align: center;
    line-height: 16px;
    background: var(--primary-color);
    border-color: var(--primary-color);
  }
</style>

{#if selectableUsers && selectableUsers.length > 0}
  <YeahCard cardTitle="Event viewer selection" shadow="long">
    <div slot="card-content">
      <ul>
        {#each selectableUsers as user, i}
          <li>
            <div class="ctrl">
              <input
                id={'liCheckbox' + i}
                type="checkbox"
                checked={shouldBeSelected(user.uid, user.events)}
                on:change={e => handleChangedViewerSelection(e, user)} />
              <label for={'liCheckbox' + i}>{user.name}</label>
            </div>
          </li>
        {/each}
      </ul>
    </div>
  </YeahCard>
{/if}
