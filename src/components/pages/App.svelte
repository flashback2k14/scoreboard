<script>
  import { onMount, onDestroy } from "svelte";
  import { getNotificationsContext } from "svelte-notifications";

  import { auth as firebaseAuth } from "../../config";
  import { auth, reader } from "../../database";

  import YeahButton from "../atoms/YeahButton.svelte";
  import YeahSeparator from "../atoms/YeahSeparator.svelte";

  import YeahLogin from "../molecules/YeahLogin.svelte";
  import YeahTable from "../molecules/YeahTable.svelte";
  import YeahTableEvents from "../molecules/YeahTableEvents.svelte";
  import YeahEventSelect from "../molecules/YeahEventSelect.svelte";
  import YeahEventDescription from "../molecules/YeahEventDescription.svelte";
  import YeahEventViewerSelect from "../molecules/YeahEventViewerSelect.svelte";
  import YeahEventCreation from "../molecules/YeahEventCreation.svelte";

  let localUser;
  let selectedEventId;
  let updateTable;
  let updateEvents;

  const { addNotification } = getNotificationsContext();

  async function handleLoginSubmit(event) {
    try {
      _showSuccessMessage("logging in...");
      await auth.login(event.detail);
    } catch (error) {
      _showErrorMessage(error);
    }
  }

  async function logout() {
    try {
      _showSuccessMessage("logging out...");
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
    _showSuccessMessage("Updating...");
  }

  function handleRefreshTableWithParticipant(e) {
    updateTable = {
      type: "NEW_PARTICIPANT",
      value: e.detail.value
    };
    _showSuccessMessage("Updating...");
  }

  function handleEventCreated() {
    updateEvents = true;
    _showSuccessMessage("Updating...");
  }

  function _showSuccessMessage(msg) {
    addNotification({
      id: Date.now(),
      removeAfter: 3000,
      text: msg,
      position: "bottom-right",
      type: "success"
    });
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

  onMount(() => {
    firebaseAuth.onAuthStateChanged(async function(remoteUser) {
      if (remoteUser) {
        try {
          _showSuccessMessage("Automatic login...");
          const details = await reader.getUserByUserId(remoteUser.uid);
          localUser = { ...remoteUser, ...details };
        } catch (error) {
          _showErrorMessage(error);
        }
      } else {
        localUser = null;
      }
    });
  });

  onDestroy(() => {
    localUser = null;
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
    margin-left: 8px;
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
    padding-bottom: 8px;
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

  .footer-anchor {
    display: flex;
    text-decoration: none;
    color: var(--white-color);
    outline: none;
  }
  .footer-anchor:hover,
  .footer-anchor:focus {
    text-decoration: underline;
    cursor: pointer;
  }
  .footer-anchor:visited {
    color: var(--white-color);
  }
  .footer-icon {
    margin-left: 8px;
    margin-right: 12px;
  }
</style>

<div class="app--container">
  <header>
    <h1>Scoreboard</h1>
    {#if localUser}
      <div>
        <label>{localUser.name}</label>
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
    {#if !localUser}
      <div class="main--login">
        <YeahLogin on:submitted={handleLoginSubmit} />
      </div>
    {:else}
      <div class="main--left-col">
        <div class="main--left-col__top">
          <YeahTable
            eventId={selectedEventId}
            userRole={localUser.role}
            update={updateTable} />
        </div>
        {#if selectedEventId && localUser.role === 'admin'}
          <div class="main--left-col__bottom">
            <YeahTableEvents
              on:new-date-added={handleRefreshTableWithDate}
              on:new-participant-added={handleRefreshTableWithParticipant} />
          </div>
        {/if}
      </div>
      <div class="main--right-col">
        <YeahSeparator />
        <YeahEventSelect
          user={localUser}
          update={updateEvents}
          on:event-selected={handleSelectedEvent} />
        {#if selectedEventId}
          <YeahSeparator />
          <YeahEventDescription
            eventId={selectedEventId}
            setDisabled={localUser.role !== 'admin'} />
        {/if}
        {#if selectedEventId && localUser.role === 'admin'}
          <YeahSeparator />
          <YeahEventViewerSelect eventId={selectedEventId} />
        {/if}
        {#if localUser.role === 'admin'}
          <YeahSeparator />
          <YeahEventCreation
            userId={localUser.uid}
            on:event-created={handleEventCreated} />
        {/if}
      </div>
    {/if}
  </main>

  <footer>
    <a
      href="https://github.com/flashback2k14/scoreboard"
      target="_blank"
      rel="noopener"
      class="footer-anchor text-color">
      <img class="footer-icon" src="assets/github.svg" alt="Github Icon" />
      <span>developed by flashback2k14</span>
    </a>
  </footer>
</div>
