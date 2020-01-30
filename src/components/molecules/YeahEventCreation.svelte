<script>
  import { getNotificationsContext } from "svelte-notifications";

  import { creator, reader } from "../../database";
  import { isEmpty } from "../../utils";

  import YeahCard from "../atoms/YeahCard.svelte";
  import YeahInput from "../atoms/YeahInput.svelte";
  import YeahButton from "../atoms/YeahButton.svelte";

  export let userId;

  const { addNotification } = getNotificationsContext();

  async function handleSubmit(e) {
    const formData = new FormData(e.target);
    const eventName = formData.get("eventName");

    if (isEmpty(eventName)) {
      _showErrorMessage({ message: "Event name is empty" });
      return;
    }

    _showSuccessMessage("Updating event data...");

    try {
      const createdEvent = await creator.addEvent(userId, eventName);
      await creator.addEventData(createdEvent.id);
      selectableEvents = await reader.getEventsByUserId(userId);
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
</script>

<style>
  form {
    display: flex;
    flex-direction: column;
  }
</style>

<YeahCard cardTitle="Event creation" shadow="long">
  <div slot="card-content">
    <form on:submit|preventDefault={handleSubmit}>
      <YeahInput labelText="Event Name" inputType="text" formName="eventName" />
      <YeahButton type="submit" text="Save" size="normal" style="primary" />
    </form>
  </div>
</YeahCard>
