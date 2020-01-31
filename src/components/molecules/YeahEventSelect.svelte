<script>
  import { createEventDispatcher } from "svelte";
  import { getNotificationsContext } from "svelte-notifications";

  import { reader } from "../../database";
  import { isEmpty } from "../../utils";

  import YeahCard from "../atoms/YeahCard.svelte";
  import YeahSelect from "../atoms/YeahSelect.svelte";
  import YeahInput from "../atoms/YeahInput.svelte";
  import YeahButton from "../atoms/YeahButton.svelte";

  export let user;
  export let update;

  let selectableEvents = [];

  const dispatch = createEventDispatcher();
  const { addNotification } = getNotificationsContext();

  $: {
    if (user) {
      loadData();
    }

    if (update) {
      loadData();
    }
  }

  async function loadData() {
    try {
      selectableEvents =
        user.role === "read-only"
          ? await reader.getEventsByViewerRefs(user.events)
          : await reader.getEventsByUserId(user.uid);
    } catch (error) {
      _showErrorMessage(error);
    }
  }

  function handleEventSelectionChange(e) {
    dispatch("event-selected", { id: e.detail.id });
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

</style>

<YeahCard cardTitle="Event selection" shadow="long">
  <div slot="card-content">
    <YeahSelect
      labelText="Select an event or create one..."
      on:selection-changed={handleEventSelectionChange}>
      {#each selectableEvents as event}
        <option value={event.id}>{event.name}</option>
      {/each}
    </YeahSelect>
  </div>
</YeahCard>
