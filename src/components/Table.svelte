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

    if (eventId) {
      const participants = await reader.getParticipantsByEventId(eventId);
      const scoresPromHolder = participants.map(async participant => {
        return await reader.getScoresByEventAndParticipantId(
          eventId,
          participant.id
        );
      });
      const scores = await Promise.all(scoresPromHolder);

      tableData = participants.map(participant => {
        const participantScores = scores
          .flat()
          .filter(score => score.participantUid.id === participant.id)
          .map(score => {
            return {
              id: score.id,
              value: score.value,
              date: convertToDate(score.date)
            };
          });

        return {
          row: { id: participant.id, name: participant.name },
          columnsHeader: participantScores.map(ps => ps.date),
          columnsData: participantScores
        };
      });
    }
  }

  afterUpdate(loadData);
</script>

<style>

</style>

{#if eventId}
  {#if tableData}
    <span>{eventId}</span>

    {@debug tableData}

    <table
      border="solid 1px black"
      cellpadding="4"
      style="border-collapse: collapse;">
      <thead>
        <tr id="tableRowHeaderText">
          <th align="left" rowspan="2">Teilnehmer</th>
          <th>Datum / Punktzahl</th>
          <th>Datum / Punktzahl</th>
        </tr>

      </thead>
      <tbody>t</tbody>
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
