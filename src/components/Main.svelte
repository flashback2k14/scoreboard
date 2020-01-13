<script>
  import { onDestroy } from "svelte";
  import Table from "./Table.svelte";
  import EventSelect from "./EventSelect.svelte";

  import { user } from "../store/store.js";

  let localeUser;
  let selectedEventId;

  const unsubscriber = user.subscribe(async remoteUser => {
    localeUser = remoteUser;
  });

  async function handleSelectedEvent(event) {
    selectedEventId = event.detail.id;
  }

  onDestroy(unsubscriber);
</script>

<style>
  main {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    height: calc(100vh - 68px - 48px);
    padding: 8px;
  }

  .left-col {
    width: 74%;
    padding-right: 6px;
    border-right: 1px solid black;
  }

  .right-col {
    width: 25%;
    padding-left: 4px;
  }
</style>

<main>
  {#if localeUser}
    <div class="left-col">
      <Table eventId={selectedEventId} userRole={localeUser.role} />
    </div>
    <div class="right-col">
      <EventSelect on:selected-event={handleSelectedEvent} />
    </div>
  {:else}
    <span>User is not logged in.</span>
  {/if}
</main>
