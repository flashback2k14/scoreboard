<script>
  import { createEventDispatcher } from "svelte";
  import { getNotificationsContext } from "svelte-notifications";

  import { isEmpty } from "../../utils";

  import YeahCard from "../atoms/YeahCard.svelte";
  import YeahInput from "../atoms/YeahInput.svelte";
  import YeahButton from "../atoms/YeahButton.svelte";
  import YeahSeparator from "../atoms/YeahSeparator.svelte";

  const dispatch = createEventDispatcher();
  const { addNotification } = getNotificationsContext();

  function handleNewDateSubmit(e) {
    const formData = new FormData(e.target);
    const newDate = formData.get("newDate");

    if (isEmpty(newDate)) {
      addNotification({
        id: Date.now(),
        removeAfter: 3000,
        text: "Date is empty.",
        position: "bottom-right",
        type: "danger"
      });
      return;
    }

    dispatch("new-date-added", {
      value: newDate
    });

    e.target.reset();
  }

  function handleNewParticipantSubmit(e) {
    const formData = new FormData(e.target);
    const newParticipant = formData.get("newParticipant");

    if (isEmpty(newParticipant)) {
      addNotification({
        id: Date.now(),
        removeAfter: 3000,
        text: "Participant is empty.",
        position: "bottom-right",
        type: "danger"
      });
      return;
    }

    dispatch("new-participant-added", {
      value: newParticipant
    });

    e.target.reset();
  }
</script>

<style>
  form {
    display: flex;
    flex-direction: row;
  }
</style>

<YeahCard shadow="long">
  <div slot="card-content">
    <form on:submit|preventDefault={handleNewDateSubmit}>
      <YeahInput labelText="New Date" inputType="date" formName="newDate" />
      <YeahSeparator align="vertical" />
      <YeahButton type="submit" text="Save" size="normal" style="primary" />
    </form>
  </div>
</YeahCard>
<YeahCard shadow="long">
  <div slot="card-content">
    <form on:submit|preventDefault={handleNewParticipantSubmit}>
      <YeahInput
        labelText="New Participant"
        inputType="text"
        formName="newParticipant" />
      <YeahSeparator align="vertical" />
      <YeahButton type="submit" text="Save" size="normal" style="primary" />
    </form>
  </div>
</YeahCard>
