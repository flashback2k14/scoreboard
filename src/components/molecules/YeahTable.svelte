<script>
  import { afterUpdate } from "svelte";
  import { getNotificationsContext } from "svelte-notifications";

  import { reader, updater } from "../../database";
  import {
    convertToDate,
    convertToTimestamp,
    convertToTableData,
    updateScores,
    initTableData
  } from "../../utils";

  import YeahCard from "../atoms/YeahCard.svelte";

  export let eventId;
  export let userRole;
  export let update;

  let onlyAdmin;
  let remoteData;
  let tableData;

  const { addNotification } = getNotificationsContext();

  $: {
    if (eventId) {
      loadData();
    }

    if (userRole) {
      onlyAdmin = userRole === "admin";
    }

    if (update) {
      switch (update.type) {
        case "NEW_DATE":
          addNewDate(update.value);
          break;

        case "NEW_PARTICIPANT":
          addNewParticipant(update.value);
          break;

        default:
          break;
      }
    }
  }

  async function loadData() {
    try {
      const data = await reader.getEventDataByEventId(eventId);
      remoteData = data;
      tableData = data ? convertToTableData(data) : initTableData();
    } catch (error) {
      _showErrorMessage(error);
    }
  }

  async function addNewDate(newDate) {
    try {
      const newDayKey = Object.keys(remoteData.days).length + 1;
      remoteData.days[newDayKey] = convertToTimestamp(newDate);

      Object.entries(remoteData.scores).forEach(([key, value]) => {
        const participant = key;
        value[newDayKey] = 0;
        remoteData.scores[participant] = value;
      });

      const newData = {
        ...remoteData
      };

      await updater.updateEventData(remoteData.id, newData);
      await loadData();
    } catch (error) {
      _showErrorMessage(error);
    }
  }

  async function addNewParticipant(newParticipant) {
    try {
      let newRow = {};

      for (
        let i = 1, length = Object.keys(remoteData.days).length;
        i <= length;
        i++
      ) {
        newRow[i] = 0;
      }

      remoteData.scores[newParticipant] = newRow;

      const newData = {
        ...remoteData
      };

      await updater.updateEventData(remoteData.id, newData);
      await loadData();
    } catch (error) {
      _showErrorMessage(error);
    }
  }

  async function handleOnBlur(e, rowIndex, colIndex) {
    try {
      tableData.rowData[rowIndex][colIndex] = {
        locked: JSON.parse(e.target.dataset.locked),
        value: Number(e.target.value)
      };
      const newScores = updateScores(tableData.rowData);
      const newData = {
        ...remoteData,
        scores: newScores
      };
      await updater.updateEventData(remoteData.id, newData);
      await loadData();
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

  afterUpdate(() => {
    try {
      const lastColumn = document.querySelector(
        "table thead tr:nth-of-type(2) th:last-child"
      );

      if (lastColumn) {
        lastColumn.scrollIntoView({ behavior: "smooth" });
      }
    } catch (error) {
      console.log(error);
    }
  });
</script>

<style>
  .table-scroll {
    overflow-x: auto;
    margin-top: 4px;
    margin-bottom: -6px;
  }

  .table-scroll table tr:nth-child(1) th:first-child,
  .table-scroll table td:first-child {
    position: sticky;
    left: 0;
    background-color: var(--light-primary-color);
  }

  .table-scroll table tr:nth-child(1) th:last-child,
  .table-scroll table td:last-child {
    position: sticky;
    right: 0;
    background-color: var(--light-primary-color);
  }

  .table-scroll table thead tr,
  .table-scroll table tbody tr:nth-child(even) {
    background: var(--light-primary-color);
  }

  .table-scroll table {
    border-collapse: collapse;
    margin-bottom: 12px;
    table-layout: fixed;
  }

  .table-scroll table,
  tr,
  td {
    border: 1px solid var(--border-2-color);
  }

  .table-scroll table thead tr th,
  .table-scroll table tbody tr td {
    font-weight: normal;
    font-size: 16px;
  }

  .table-scroll table thead {
    vertical-align: top;
  }

  .table-input {
    padding: 0 0 0 4px;
    margin: 0;
    border: 0;
    border-bottom: 1px solid var(--border-2-color);
    font-size: 16px;
  }

  .no-event-container {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
  }
</style>

{#if !eventId}
  <div class="no-event-container">
    <h2>No event is selected.</h2>
  </div>
{:else}
  {#if tableData}
    <YeahCard shadow="long">
      <div slot="card-content" class="table-scroll">
        <table border="1px solid black" cellpadding="4">
          <thead>
            <tr>
              <th align="left" rowspan="2">Teilnehmer</th>
              {#each tableData.rowHeaders as header}
                <th>Datum / Punktzahl</th>
              {/each}
              <th align="right" rowspan="2">Summe</th>
            </tr>
            <tr>
              {#each tableData.rowHeaders as header}
                <th>{header}</th>
              {/each}
            </tr>
          </thead>
          <tbody>
            {#each tableData.rowData as data, rowIndex}
              <tr>
                {#each data as entry, colIndex}
                  <td>
                    {#if colIndex === 0 || colIndex === data.length - 1 || !onlyAdmin || entry.locked}
                      <span>{entry.value}</span>
                    {:else}
                      <input
                        class="table-input"
                        type="number"
                        data-locked={entry.locked}
                        value={entry.value}
                        on:blur={e => handleOnBlur(e, rowIndex, colIndex)} />
                    {/if}
                  </td>
                {/each}
              </tr>
            {/each}
          </tbody>
        </table>
      </div>
    </YeahCard>
  {/if}
{/if}
