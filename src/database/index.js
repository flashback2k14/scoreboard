import {
  auth as firebaseAuth,
  eventsCollection,
  eventDataCollection,
  participantsCollection,
  scoresCollection
} from '../store/firebase';
import { convertDocument } from '../utils';

const auth = {
  login: async ({ email, password }) => {
    return await firebaseAuth.signInWithEmailAndPassword(email, password);
  },
  logout: async () => {
    return await firebaseAuth.signOut();
  }
};

const creator = {
  addEvent: async (userUid, name) => {
    return await eventsCollection.add({ userUid, name });
  }
};

const reader = {
  getEventByUserId: async userId => {
    const result = await eventsCollection
      .where('userUid', '==', userId)
      .orderBy('name')
      .get();
    return convertDocument(result.docs);
  },
  getEventDataByEventId: async eventId => {
    const eventRef = eventsCollection.doc(eventId);

    const result = await eventDataCollection
      .where('eventId', '==', eventRef)
      .orderBy('days')
      .get();

    return convertDocument(result.docs)[0];
  },
  getParticipantsByEventId: async eventId => {
    const eventRef = eventsCollection.doc(eventId);

    const result = await participantsCollection
      .where('eventUid', '==', eventRef)
      .orderBy('name')
      .get();

    return convertDocument(result.docs);
  },
  getScoresByEventAndParticipantId: async (eventId, participantId) => {
    const eventRef = eventsCollection.doc(eventId);
    const participantRef = participantsCollection.doc(participantId);

    const result = await scoresCollection
      .where('eventUid', '==', eventRef)
      .where('participantUid', '==', participantRef)
      .orderBy('date')
      .get();

    return convertDocument(result.docs);
  }
};

export { auth, creator, reader };
