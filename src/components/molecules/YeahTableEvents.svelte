<script>
  import { createEventDispatcher } from "svelte";

  import YeahCard from "../atoms/YeahCard.svelte";
  import YeahInput from "../atoms/YeahInput.svelte";
  import YeahButton from "../atoms/YeahButton.svelte";
  import YeahSeparator from "../atoms/YeahSeparator.svelte";

  const dispatch = createEventDispatcher();

  function handleNewDateSubmit(e) {
    const formData = new FormData(e.target);
    dispatch("new-date-added", {
      value: formData.get("newDate")
    });
    e.target.reset();
  }

  function handleNewParticipantSubmit(e) {
    const formData = new FormData(e.target);
    dispatch("new-participant", {
      value: formData.get("newParticipant")
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
