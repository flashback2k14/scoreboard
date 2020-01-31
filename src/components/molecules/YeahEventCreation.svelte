<script>
  import { createEventDispatcher } from "svelte";
  import { getNotificationsContext } from "svelte-notifications";

  import { creator } from "../../database";
  import { isEmpty } from "../../utils";

  import YeahCard from "../atoms/YeahCard.svelte";
  import YeahInput from "../atoms/YeahInput.svelte";
  import YeahButton from "../atoms/YeahButton.svelte";

  export let userId;

  const dispatch = createEventDispatcher();
  const { addNotification } = getNotificationsContext();

  async function handleSubmit(e) {
    const formData = new FormData(e.target);
    const eventName = formData.get("eventName");

    if (isEmpty(eventName)) {
      _showErrorMessage({ message: "Event name is empty" });
      return;
    }

    try {
      const createdEvent = await creator.addEvent(userId, eventName);
      await creator.addEventData(createdEvent.id);
      e.target.reset();
      dispatch("event-created");
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

<YeahCard cardTitle="Event creation" shadow="long">
  <div slot="card-content">
    <form on:submit|preventDefault={handleSubmit}>
      <YeahInput labelText="Event Name" inputType="text" formName="eventName" />
      <YeahButton type="submit" text="Save" size="normal" style="primary" />
    </form>
  </div>
</YeahCard>
