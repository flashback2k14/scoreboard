import { auth as firebaseAuth, usersCollection, eventsCollection, eventDataCollection } from '../config';
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
  addEvent: async (uid, name) => {
    return await eventsCollection.add({ uid, name });
  },
  addEventData: async eid => {
    const eventRef = eventsCollection.doc(eid);

    const data = {
      dayCount: 0,
      days: {},
      eid: eventRef,
      participants: {},
      scores: {}
    };

    return await eventDataCollection.add(data);
  },
  getEventRef: eid => {
    return eventsCollection.doc(eid);
  }
};

const reader = {
  getUserByUserId: async uid => {
    const result = await usersCollection
      .where('uid', '==', uid)
      .orderBy('name')
      .get();
    return convertDocument(result.docs)[0];
  },
  getUsersByRole: async role => {
    const result = await usersCollection
      .where('role', '==', role)
      .orderBy('name')
      .get();
    return convertDocument(result.docs);
  },
  getEventsByUserId: async uid => {
    const result = await eventsCollection
      .where('uid', '==', uid)
      .orderBy('name')
      .get();
    return convertDocument(result.docs);
  },
  getEventsByViewerRefs: async docRefs => {
    const promHolder = docRefs.map(async docRef => docRef.get());
    const docs = await Promise.all(promHolder);
    return convertDocument(docs);
  },
  getEventDataByEventId: async eid => {
    const eventRef = eventsCollection.doc(eid);

    const result = await eventDataCollection
      .where('eid', '==', eventRef)
      .orderBy('days')
      .get();

    return convertDocument(result.docs)[0];
  }
};

const updater = {
  updateEventData: async (edid, data) => {
    return await eventDataCollection.doc(edid).update(data);
  },
  updateUserData: async (id, data) => {
    return await usersCollection.doc(id).update(data);
  }
};

export { auth, creator, reader, updater };
