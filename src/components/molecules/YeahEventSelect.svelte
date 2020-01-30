<script>
  import { onDestroy, createEventDispatcher } from "svelte";
  import { getNotificationsContext } from "svelte-notifications";

  import { user } from "../../store";
  import { reader } from "../../database";
  import { isEmpty } from "../../utils";

  import YeahCard from "../atoms/YeahCard.svelte";
  import YeahSelect from "../atoms/YeahSelect.svelte";
  import YeahInput from "../atoms/YeahInput.svelte";
  import YeahButton from "../atoms/YeahButton.svelte";

  let selectableEvents = [];

  const dispatch = createEventDispatcher();
  const { addNotification } = getNotificationsContext();

  const unsubscriber = user.subscribe(async storeUser => {
    if (storeUser) {
      _showSuccessMessage("Loading event data...");

      try {
        selectableEvents =
          storeUser.role === "read-only"
            ? await reader.getEventsByViewerRefs(storeUser.events)
            : await reader.getEventsByUserId(storeUser.uid);
      } catch (error) {
        _showErrorMessage(error);
      }
    }
  });

  function handleEventSelectionChange(e) {
    dispatch("event-selected", { id: e.detail.id });
  }

  function _showSuccessMessage(msg) {
    addNotification({
      text: msg,
      position: "bottom-center",
      type: "success",
      removeAfter: 2000
    });
  }

  function _showErrorMessage(error) {
    addNotification({
      text: error.message,
      position: "bottom-center",
      type: "danger",
      removeAfter: 4000
    });
  }

  onDestroy(unsubscriber);
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
