<script>
  import { createEventDispatcher } from "svelte";

  import YeahCard from "../atoms/YeahCard.svelte";
  import YeahInput from "../atoms/YeahInput.svelte";
  import YeahButton from "../atoms/YeahButton.svelte";

  const dispatch = createEventDispatcher();

  function handleSubmit(e) {
    const formData = new FormData(e.target);
    dispatch("handle-submit", {
      email: formData.get("email"),
      password: formData.get("password")
    });
  }
</script>

<style>
  form {
    display: flex;
    flex-direction: column;
  }
</style>

<YeahCard cardTitle="Login" size="small" shadow="long">
  <form slot="card-content" on:submit|preventDefault={handleSubmit}>
    <YeahInput labelText="E-Mail" inputType="text" formName="email" />
    <YeahInput labelText="Passwort" inputType="password" formName="password" />
    <YeahButton type="submit" text="Submit" size="normal" style="primary" />
  </form>
</YeahCard>
