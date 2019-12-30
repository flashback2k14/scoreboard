import { writable } from 'svelte/store';

export const user = writable(null);

export const events = writable([
  {
    userUid: 'cclrVfU3eGVVnmeT0slUcfUBppm1',
    uid: '1',
    name: 'Dart Liga',
    participants: [
      {
        uid: '1',
        name: 'SKL',
        scores: [
          {
            uid: '1',
            date: new Date(2020, 1, 6),
            value: '3'
          },
          {
            uid: '2',
            date: new Date(2020, 1, 7),
            value: '2'
          },
          {
            uid: '3',
            date: new Date(2020, 1, 8),
            value: '1'
          }
        ]
      },
      {
        uid: '2',
        name: 'MSCH',
        scores: [
          {
            uid: '4',
            date: new Date(2020, 1, 6),
            value: '1'
          },
          {
            uid: '5',
            date: new Date(2020, 1, 7),
            value: '2'
          },
          {
            uid: '6',
            date: new Date(2020, 1, 8),
            value: '3'
          }
        ]
      }
    ]
  }
]);
