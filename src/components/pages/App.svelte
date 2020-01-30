<script>
  import { onMount } from "svelte";
  import { getNotificationsContext } from "svelte-notifications";

  import { auth as firebaseAuth } from "../../config";
  import { auth, reader } from "../../database";
  import { user as storeUser } from "../../store";

  import YeahButton from "../atoms/YeahButton.svelte";
  import YeahSeparator from "../atoms/YeahSeparator.svelte";

  import YeahLogin from "../molecules/YeahLogin.svelte";
  import YeahTable from "../molecules/YeahTable.svelte";
  import YeahTableEvents from "../molecules/YeahTableEvents.svelte";
  import YeahEventSelect from "../molecules/YeahEventSelect.svelte";
  import YeahEventDescription from "../molecules/YeahEventDescription.svelte";
  import YeahEventCreation from "../molecules/YeahEventCreation.svelte";
  import YeahViewerSelect from "../molecules/YeahViewerSelect.svelte";

  let selectedEventId;
  let updateTable;

  const { addNotification } = getNotificationsContext();

  async function handleLoginSubmit(event) {
    _showSuccessMessage("logging in...");
    try {
      await auth.login(event.detail);
    } catch (error) {
      _showErrorMessage(error);
    }
  }

  async function logout() {
    _showSuccessMessage("logging out...");
    try {
      await auth.logout();
    } catch (error) {
      _showErrorMessage(error);
    }
  }

  function handleSelectedEvent(event) {
    selectedEventId = event.detail.id;
  }

  function handleRefreshTableWithDate(e) {
    updateTable = {
      type: "NEW_DATE",
      value: e.detail.value
    };
  }

  function handleRefreshTableWithParticipant(e) {
    updateTable = {
      type: "NEW_PARTICIPANT",
      value: e.detail.value
    };
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

  onMount(() => {
    firebaseAuth.onAuthStateChanged(async function(remoteUser) {
      if (remoteUser) {
        _showSuccessMessage("Automatic login...");

        try {
          const details = await reader.getUserByUserId(remoteUser.uid);
          storeUser.set({ ...remoteUser, ...details });
        } catch (error) {
          _showErrorMessage(error);
        }
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
    z-index: 5;
    height: 60px;
    padding: 4px 8px;
    background: var(--dark-primary-color);
    color: var(--white-color);
    box-shadow: 0 1px 1px rgba(0, 0, 0, 0.25), 0 2px 2px rgba(0, 0, 0, 0.2),
      0 4px 4px rgba(0, 0, 0, 0.15), 0 8px 8px rgba(0, 0, 0, 0.1),
      0 16px 16px rgba(0, 0, 0, 0.05);
  }

  header > h1 {
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
    height: calc(100vh - 92px - 32px);
    padding: 8px;
    background: var(--background-color);
  }

  .main--left-col {
    width: 74%;
    margin-top: 8px;
    padding-right: 8px;
    border-right: 1px solid black;
    overflow: hidden;
  }

  .main--left-col__top {
    height: calc(100vh - 92px - 32px - 118px);
    overflow: auto;
  }

  .main--left-col__bottom {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    border-top: 1px solid black;
    padding-top: 8px;
  }

  .main--right-col {
    width: 25%;
    padding-left: 8px;
    overflow: auto;
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
    background: var(--dark-primary-color);
    color: var(--white-color);
  }
</style>

<div class="app--container">
  <header>
    <h1>Scoreboard</h1>
    {#if $storeUser}
      <div>
        <label>{$storeUser.name}</label>
        <YeahButton
          type="button"
          text="LOGOUT"
          size="small"
          style="secondary"
          on:clicked={logout} />
      </div>
    {/if}
  </header>

  <main>
    {#if !$storeUser}
      <div class="main--login">
        <YeahLogin on:submitted={handleLoginSubmit} />
      </div>
    {:else}
      <div class="main--left-col">
        <div class="main--left-col__top">
          <YeahTable
            eventId={selectedEventId}
            userRole={$storeUser.role}
            update={updateTable} />
        </div>
        {#if selectedEventId && $storeUser.role === 'admin'}
          <div class="main--left-col__bottom">
            <YeahTableEvents
              on:new-date-added={handleRefreshTableWithDate}
              on:new-participant-added={handleRefreshTableWithParticipant} />
          </div>
        {/if}
      </div>
      <div class="main--right-col">
        <YeahSeparator />
        <YeahEventSelect on:event-selected={handleSelectedEvent} />
        {#if selectedEventId}
          <YeahSeparator />
          <YeahEventDescription
            eventId={selectedEventId}
            setDisabled={$storeUser.role !== 'admin'} />
        {/if}
        {#if $storeUser.role === 'admin'}
          <YeahSeparator />
          <YeahEventCreation userId={$storeUser.uid} />
        {/if}
        {#if selectedEventId && $storeUser.role === 'admin'}
          <YeahSeparator />
          <YeahViewerSelect eventId={selectedEventId} />
        {/if}
      </div>
    {/if}
  </main>

  <footer>
    <span>developed by flashback2k14</span>
  </footer>
</div>
