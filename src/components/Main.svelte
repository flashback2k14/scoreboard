<script>
  import Table from "./Table.svelte";

  import { onDestroy } from "svelte";
  import { collectionData } from "rxfire/firestore";
  import { startWith } from "rxjs/operators";

  import { isNotEmpty } from "../utils";
  import { db } from "../store/firebase.js";
  import { user } from "../store/store.js";

  let localUser;
  let event;
  let eventsUnsubscriber;

  const userUnsubscriber = user.subscribe(remoteUser => {
    localUser = remoteUser;
    if (isNotEmpty(remoteUser)) {
      const eventsQuery = db
        .collection("events")
        .where("userUid", "==", remoteUser.uid)
        .orderBy("name");

      eventsUnsubscriber = collectionData(eventsQuery, "id")
        .pipe(startWith([]))
        .subscribe(events => {
          event = events[0];
        });
    }
  });

  // onDestroy(() => {
  //   userUnsubscriber();
  //   if (eventsUnsubscriber) {
  //     eventsUnsubscriber.unsubscribe();
  //   }
  // });
</script>

<style>
  main {
    height: calc(100vh - 68px - 48px);
    padding: 8px;
  }
</style>

<main>
  {#if localUser}
    <Table {event} />
  {:else}
    <span>User is not logged in.</span>
  {/if}
</main>
