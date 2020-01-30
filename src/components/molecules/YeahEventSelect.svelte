<script>
  import { onDestroy, createEventDispatcher } from "svelte";
  import { getNotificationsContext } from "svelte-notifications";

  import { user } from "../../store";
  import { creator, reader } from "../../database";
  import { isEmpty } from "../../utils";

  import YeahSeparator from "../atoms/YeahSeparator.svelte";
  import YeahCard from "../atoms/YeahCard.svelte";
  import YeahSelect from "../atoms/YeahSelect.svelte";
  import YeahInput from "../atoms/YeahInput.svelte";
  import YeahButton from "../atoms/YeahButton.svelte";

  let onlyAdmin = false;
  let localeUser = null;
  let selectableEvents = [];

  const dispatch = createEventDispatcher();
  const { addNotification } = getNotificationsContext();

  const unsubscriber = user.subscribe(async remoteUser => {
    localeUser = remoteUser;
    if (remoteUser) {
      _showSuccessMessage("Loading event data...");

      try {
        onlyAdmin = remoteUser.role === "admin";
        selectableEvents =
          remoteUser.role === "read-only"
            ? await reader.getEventsByViewerRefs(remoteUser.events)
            : await reader.getEventsByUserId(remoteUser.uid);
      } catch (error) {
        _showErrorMessage(error);
      }
    }
  });

  function handleEventSelectionChange(e) {
    dispatch("event-selected", { id: e.detail.id });
  }

  async function handleSubmit(e) {
    const formData = new FormData(e.target);
    const eventName = formData.get("eventName");

    if (isEmpty(eventName)) {
      _showErrorMessage({ message: "Event name is empty" });
      return;
    }

    _showSuccessMessage("Updating event data...");

    try {
      const createdEvent = await creator.addEvent(localeUser.uid, eventName);
      await creator.addEventData(createdEvent.id);
      selectableEvents = await reader.getEventsByUserId(localeUser.uid);
    } catch (error) {
      _showErrorMessage(error);
    }
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
  form {
    display: flex;
    flex-direction: column;
  }
</style>

<YeahSeparator />

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

{#if onlyAdmin}
  <YeahSeparator />

  <YeahCard cardTitle="Event creation" shadow="long">
    <div slot="card-content">
      <form on:submit|preventDefault={handleSubmit}>
        <YeahInput
          labelText="Event Name"
          inputType="text"
          formName="eventName" />
        <YeahButton type="submit" text="Save" size="normal" style="primary" />
      </form>
    </div>
  </YeahCard>
{/if}
