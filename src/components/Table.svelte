<script>
  import { afterUpdate } from "svelte";
  import { reader } from "../database";
  import { convertToDate } from "../utils";

  export let eventId;
  let tableData;

  async function loadData() {
    if (tableData) {
      return;
    }

    if (!eventId) {
      return;
    }

    const data = await reader.getEventDataByEventId(eventId);
    tableData = {
      rowHeaders: [
        ...Object.values(data.days).map(value => convertToDate(value))
      ],
      rowData: Object.entries(data.scores).map(([key, value]) => {
        const participant = key;
        const scores = Object.values(value).map(score =>
          score === -9999 ? "#" : score
        );
        return [participant, ...scores];
      })
    };
  }

  afterUpdate(loadData);
</script>

<style>

</style>

{#if eventId}
  {#if tableData}
    {@debug tableData}

    <table
      border="solid 1px black"
      cellpadding="4"
      style="border-collapse: collapse;">
      <thead>
        <tr id="tableRowHeaderText">
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
        {#each tableData.rowData as data}
          <tr>
            {#each data as entry}
              <td>{entry}</td>
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

<!-- <table
  border="solid 1px black"
  cellpadding="4"
  style="border-collapse: collapse;">
  <thead>
    <tr>
      <th align="left">Event</th>
      <th align="left">Dart Liga</th>
      <th>
        <button>add new Datum</button>
      </th>
      <td>
        <button>add new Teilnehmer</button>
      </td>
    </tr>
    <tr id="tableRowHeaderText">
      <th align="left" rowspan="2">Teilnehmer</th>
      <th>Datum / Punktzahl</th>
      <th>Datum / Punktzahl</th>
    </tr>
    <tr id="tableRowHeaderDate">
      <th>06.01.20</th>
      <th>07.01.20</th>
    </tr>
  </thead>
  <tbody id="tableBody">
    <tr>
      <td>SKL</td>
      <td>
        <input type="number" placeholder="enter here" />
      </td>
      <td>
        <input type="number" placeholder="enter here" />
      </td>
    </tr>
    <tr>
      <td>MSCH</td>
      <td>
        <input type="number" placeholder="enter here" />
      </td>
      <td>
        <input type="number" placeholder="enter here" />
      </td>
    </tr>
  </tbody>
</table> -->
