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

</style>

<div>
  {#if eventId}
    {#if tableData}
      <!-- {@debug tableData} -->

      <div>
        <input
          bind:value={newParticipant}
          type="text"
          placeholder="enter new participant" />
        <button on:click={addNewParticipant}>Add new Participant</button>
      </div>

      <div>
        <input bind:value={selectedNewDate} type="date" />
        <button on:click={addNewDate}>Add new Date</button>
      </div>

      <table
        border="solid 1px black"
        cellpadding="4"
        style="border-collapse: collapse;">
        <thead>
          <tr>
            <th align="left" rowspan="2">Teilnehmer</th>
            {#each tableData.rowHeaders as header}
              <th>Datum / Punktzahl</th>
            {/each}
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
    {:else}
      <span>Todo: Show Empty Table</span>
    {/if}
  {:else}
    <span>No event selected.</span>
  {/if}
</div>
