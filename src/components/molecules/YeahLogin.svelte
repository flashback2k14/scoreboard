<script>
  import { createEventDispatcher } from "svelte";
  import { getNotificationsContext } from "svelte-notifications";

  import { isEmpty } from "../../utils";

  import YeahCard from "../atoms/YeahCard.svelte";
  import YeahInput from "../atoms/YeahInput.svelte";
  import YeahButton from "../atoms/YeahButton.svelte";

  const dispatch = createEventDispatcher();
  const { addNotification } = getNotificationsContext();

  function handleSubmit(e) {
    const formData = new FormData(e.target);
    const email = formData.get("email");
    const password = formData.get("password");

    if (isEmpty(email) && isEmpty(password)) {
      addNotification({
        text: "E-Mail and/or Password is empty.",
        position: "bottom-center",
        type: "danger",
        removeAfter: 4000
      });
      return;
    }

    dispatch("submitted", {
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
