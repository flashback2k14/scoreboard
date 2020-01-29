<script>
  import { afterUpdate } from "svelte";
  import { reader, updater } from "../../database";
  import {
    convertToDate,
    convertToTimestamp,
    convertToTableData,
    updateScores,
    initTableData
  } from "../../utils";

  export let eventId;
  export let userRole;
  export let update;

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

  let onlyAdmin;
  let remoteData;
  let tableData;

  async function loadData() {
    const data = await reader.getEventDataByEventId(eventId);
    remoteData = data;
    tableData = data ? convertToTableData(data) : initTableData();
  }

  async function addNewDate(newDate) {
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
  }

  async function addNewParticipant(newParticipant) {
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
  }

  async function handleOnBlur(e, rowIndex, colIndex) {
    tableData.rowData[rowIndex][colIndex] = e.target.value;
    const newScores = updateScores(tableData.rowData);

    const newData = {
      ...remoteData,
      scores: newScores
    };

    await updater.updateEventData(remoteData.id, newData);
    await loadData();
  }
</script>

<style>
  .table-scroll {
    overflow-x: auto;
    margin-top: 4px;
    margin-bottom: 8px;
  }

  .table-scroll table tr:nth-child(1) th:first-child,
  .table-scroll table td:first-child {
    position: sticky;
    left: 0;
    background-color: #ddd;
  }

  .table-scroll table tr:nth-child(1) th:last-child,
  .table-scroll table td:last-child {
    position: sticky;
    right: 0;
    background-color: #ddd;
  }

  table {
    border-collapse: collapse;
    margin-bottom: 12px;
  }

  .ctrl-container {
    margin-top: 4px;
    margin-bottom: 8px;
  }

  .no-event-container {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
  }
</style>

{#if eventId}
  {#if tableData}
    <div class="ctrl-container table-scroll">
      <table border="solid 1px black" cellpadding="4">
        <thead>
          <tr>
            <th align="left" rowspan="2">Teilnehmer</th>
            {#each tableData.rowHeaders as header}
              <th>Datum / Punktzahl</th>
            {/each}
            <th align="left" rowspan="2">Summe</th>
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
                  {#if colIndex === 0 || colIndex === data.length - 1 || !onlyAdmin}
                    <span>{entry}</span>
                  {:else}
                    <input
                      type="number"
                      value={entry}
                      on:blur={e => handleOnBlur(e, rowIndex, colIndex)} />
                  {/if}
                </td>
              {/each}
            </tr>
          {/each}
        </tbody>
      </table>
    </div>
  {/if}
{:else}
  <div class="no-event-container">
    <h2>No event is selected.</h2>
  </div>
{/if}
