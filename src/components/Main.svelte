<script>
  import Table from "./Table.svelte";
  import EventSelect from "./EventSelect.svelte";

  import { user } from "../store/store.js";

  let localeUser;
  let selectedEventId;

  const userUnsubscriber = user.subscribe(async remoteUser => {
    localeUser = remoteUser;
  });

  async function handleSelectedEvent(event) {
    selectedEventId = event.detail.id;
  }
</script>

<style>
  main {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    height: calc(100vh - 68px - 48px);
    padding: 8px;
  }
</style>

<main>
  {#if localeUser}
    <Table eventId={selectedEventId} />
    <EventSelect on:selected-event={handleSelectedEvent} />
  {:else}
    <span>User is not logged in.</span>
  {/if}
</main>
