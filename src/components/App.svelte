<script>
  import { onMount } from "svelte";

  import { auth as firebaseAuth } from "../config";
  import { auth, reader } from "../database";
  import { user as storeUser } from "../store";

  import Table from "./Table.svelte";
  import EventSelect from "./EventSelect.svelte";
  import ViewerSelect from "./ViewerSelect.svelte";

  import YeahButton from "./atoms/YeahButton.svelte";
  import YeahLogin from "./molecules/YeahLogin.svelte";

  let selectedEventId;

  async function handleSelectedEvent(event) {
    selectedEventId = event.detail.id;
  }

  async function handleLoginSubmit(event) {
    await auth.login(event.detail);
  }

  async function logout() {
    await auth.logout();
  }

  onMount(() => {
    firebaseAuth.onAuthStateChanged(async function(remoteUser) {
      if (remoteUser) {
        const details = await reader.getUserByUserId(remoteUser.uid);
        storeUser.set({ ...remoteUser, ...details });
      } else {
        storeUser.set(null);
      }
    });
  });
</script>

<style>
  .app--container {
    display: flex;
    flex-direction: column;
    width: 100vw;
    height: 100vh;
  }

  header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 60px;
    padding: 4px 8px;
    background: lightsteelblue;
    box-shadow: 0 1px 1px rgba(0, 0, 0, 0.25), 0 2px 2px rgba(0, 0, 0, 0.2),
      0 4px 4px rgba(0, 0, 0, 0.15), 0 8px 8px rgba(0, 0, 0, 0.1),
      0 16px 16px rgba(0, 0, 0, 0.05);
  }

  header > h2 {
    letter-spacing: 0.1em;
  }

  header > div > label {
    margin-right: 4px;
    letter-spacing: 0.1em;
  }

  main {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    height: calc(100vh - 68px - 32px);
    padding: 8px;
  }

  .main--left-col {
    width: 74%;
    margin-top: 8px;
    padding-right: 6px;
    border-right: 1px solid black;
  }

  .main--right-col {
    width: 25%;
    padding-left: 4px;
  }

  .main--login {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
    width: 100%;
  }

  footer {
    display: flex;
    align-items: center;
    height: 32px;
    padding: 4px 8px;
    background: lightsteelblue;
  }
</style>

<div class="app--container">
  <header>
    <h2>Scoreboard</h2>
    {#if $storeUser}
      <div>
        <label>{$storeUser.name}</label>
        <YeahButton
          type="button"
          text="LOGOUT"
          size="small"
          style="secondary"
          on:handle-click={logout} />
      </div>
    {/if}
  </header>

  <main>
    {#if $storeUser}
      <div class="main--left-col">
        <Table eventId={selectedEventId} userRole={$storeUser.role} />
      </div>
      <div class="main--right-col">
        <EventSelect on:selected-event={handleSelectedEvent} />
        <ViewerSelect eventId={selectedEventId} userRole={$storeUser.role} />
      </div>
    {:else}
      <div class="main--login">
        <YeahLogin on:handle-submit={handleLoginSubmit} />
      </div>
    {/if}
  </main>

  <footer>
    <span>developed by flashback2k14</span>
  </footer>
</div>
