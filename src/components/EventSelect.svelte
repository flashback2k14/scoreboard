<script>
  import { onDestroy, createEventDispatcher } from "svelte";

  import { user } from "../store";
  import { creator, reader } from "../database";

  import YeahSeparator from "./atoms/YeahSeparator.svelte";
  import YeahCard from "./atoms/YeahCard.svelte";
  import YeahSelect from "./atoms/YeahSelect.svelte";
  import YeahInput from "./atoms/YeahInput.svelte";
  import YeahButton from "./atoms/YeahButton.svelte";

  let onlyAdmin = false;
  let localeUser = null;
  let selectableEvents = [];

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

  function handleEventSelectionChange(e) {
    dispatch("selected-event", { id: e.detail.id });
  }

  async function handleSubmit(e) {
    const eventName = formData.get("eventName");
    if (eventName && eventName.length > 0) {
      const createdEvent = await creator.addEvent(localeUser.uid, eventName);
      await creator.addEventData(createdEvent.id);
      selectableEvents = await reader.getEventsByUserId(localeUser.uid);
    }
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

<YeahCard cardTitle="Event selection" shadow="hover">
  <div slot="card-content">
    <YeahSelect
      labelText="Select an event or create one..."
      on:handle-changed-selection={handleEventSelectionChange}>
      {#each selectableEvents as event}
        <option value={event.id}>{event.name}</option>
      {/each}
    </YeahSelect>
  </div>
</YeahCard>

{#if onlyAdmin}
  <YeahSeparator />

  <YeahCard cardTitle="Event creation" shadow="hover">
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
