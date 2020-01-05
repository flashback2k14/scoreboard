<script>
  import { afterUpdate } from "svelte";
  import { reader, updater } from "../database";
  import {
    convertToDate,
    toTimestamp,
    transform,
    transformScores
  } from "../utils";

  export let eventId;

  let remoteData;
  let tableData;

  let newParticipant;
  let selectedNewDate;

  async function loadData() {
    const data = await reader.getEventDataByEventId(eventId);
    remoteData = data;
    tableData = transform(data);
  }

  async function addNewDate() {
    remoteData.dayCount++;
    const newDayKey = `day${remoteData.dayCount}`;
    remoteData.days[newDayKey] = toTimestamp(selectedNewDate);

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

    selectedNewDate = "";
  }

  async function addNewParticipant() {
    remoteData.participants[newParticipant] = newParticipant;

    let newRow = {};
    for (var i = 1; i <= remoteData.dayCount; i++) {
      newRow[`day${i}`] = 0;
    }

    remoteData.scores[newParticipant] = newRow;

    const newData = {
      ...remoteData
    };

    await updater.updateEventData(remoteData.id, newData);
    await loadData();

    newParticipant = "";
  }

  async function handleOnBlur(e, rowIndex, colIndex) {
    tableData.rowData[rowIndex][colIndex] = e.target.value;
    const newScores = transformScores(tableData.rowData);

    const newData = {
      ...remoteData,
      scores: newScores
    };

    await updater.updateEventData(remoteData.id, newData);
    await loadData();
  }

  afterUpdate(async () => {
    if (tableData) {
      return;
    }

    if (!eventId) {
      return;
    }

    await loadData();
  });
</script>

<style>
  .table-scroll {
    width: inherit;
    overflow-x: scroll;
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
  }

  .ctrl-container {
    margin-top: 4px;
  }

  .ctrl {
    padding: 8px;
    margin-right: 4px;
    background: inherit;
    border: 1px solid steelblue;
    border-radius: 4px;
    font-size: medium;
    outline: none;
  }

  .ctrl:hover,
  .ctrl:focus {
    border: 2px solid steelblue;
  }

  .ctrl_input {
    width: 250px;
  }

  .ctrl_button {
    text-transform: uppercase;
    cursor: pointer;
  }
</style>

<div>
  {#if eventId}
    {#if tableData}
      <!-- {@debug tableData} -->

      <div class="ctrl-container">
        <input
          bind:value={newParticipant}
          class="ctrl ctrl_input"
          type="text"
          placeholder="enter new participant" />
        <button class="ctrl ctrl_button" on:click={addNewParticipant}>
          Add new Participant
        </button>
      </div>

      <div class="ctrl-container">
        <input
          bind:value={selectedNewDate}
          class="ctrl ctrl_input"
          type="date" />
        <button class="ctrl ctrl_button" on:click={addNewDate}>
          Add new Date
        </button>
      </div>

      <div class="table-scroll">
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
                    {#if colIndex === 0}
                      <span>{entry}</span>
                    {:else if colIndex === data.length - 1}
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
    {:else}
      <span>Todo: Show Empty Table</span>
    {/if}
  {:else}
    <span>No event selected.</span>
  {/if}
</div>
