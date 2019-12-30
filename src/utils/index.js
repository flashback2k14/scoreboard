import { Timestamp } from '../store/firebase';

export const convertDocument = docs => {
  return docs.map(item => {
    let doc = item.data();
    doc.id = item.id;
    return doc;
  });
};

export const convertToDate = firestoreTimestamp => {
  return new Date(firestoreTimestamp.seconds * 1000).toDateString();
};

export const toTimestamp = strDate => {
  const date = Date.parse(strDate);
  // return { seconds: date / 1000, nanoseconds: 0 };
  // return date / 1000;
  return new Timestamp(date / 1000, 0);
};

export const transform = data => {
  return {
    rowHeaders: [...Object.values(data.days).map(value => convertToDate(value))],
    rowData: Object.entries(data.scores).map(([key, value]) => {
      const participant = key;
      const scores = Object.values(value).map(score => (score === -9999 ? '#' : score));
      return [participant, ...scores];
    })
  };
};
