<script>
  import { getNotificationsContext } from "svelte-notifications";

  import { reader, updater } from "../../database";
  import { isEmpty } from "../../utils";

  import YeahCard from "../atoms/YeahCard.svelte";
  import YeahTextArea from "../atoms/YeahTextArea.svelte";
  import YeahButton from "../atoms/YeahButton.svelte";

  export let eventId;
  export let setDisabled;

  let descValue;
  const { addNotification } = getNotificationsContext();

  $: {
    if (eventId) {
      loadData();
    }
  }

  async function loadData() {
    try {
      const event = await reader.getEventByEventId(eventId);
      descValue = event.desc;
    } catch (error) {
      _showErrorMessage(error);
    }
  }

  async function handleSubmit(e) {
    const formData = new FormData(e.target);
    const eventDesc = formData.get("eventDesc");

    if (isEmpty(eventDesc)) {
      _showErrorMessage({ message: "Description is empty." });
      return;
    }

    try {
      const event = await reader.getEventByEventId(eventId);
      const updatedEvent = {
        ...event,
        desc: eventDesc
      };
      await updater.updateEvent(eventId, updatedEvent);
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
  form {
    display: flex;
    flex-direction: column;
  }
</style>

<YeahCard cardTitle="Event description" shadow="long">
  <div slot="card-content">
    <form on:submit|preventDefault={handleSubmit}>
      <YeahTextArea
        labelText="Event Description"
        formName="eventDesc"
        disabled={setDisabled}
        value={descValue} />
      {#if !setDisabled}
        <YeahButton type="submit" text="Save" size="normal" style="primary" />
      {/if}
    </form>
  </div>
</YeahCard>
