import { writable } from 'svelte/store';

function createEvent() {
  const { subscribe, set, update } = writable({});

  return {
    subscribe,
    getByUserUid: (userUid) => 
  };
}

export const event = createEvent();
