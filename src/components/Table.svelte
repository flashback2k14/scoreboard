<script>
  export let event;
</script>

<style>

</style>

{@debug event}

{#if event}
  <span>{event.name}</span>
{:else}
  <span>no event available</span>
{/if}

<!-- {#if $events}
  <table
    border="solid 1px black"
    cellpadding="4"
    style="border-collapse: collapse;">
    <thead>
      <tr>
        <th align="left">Event</th>
        <th align="left">$events[0].name</th>
        <th>
          <button>add new Datum</button>
        </th>
        <td>
          <button>add new Teilnehmer</button>
        </td>
      </tr>
    </thead>
    <tbody />
  </table>
{:else}
  <table
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
  </table>
{/if} -->
