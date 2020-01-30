import { Timestamp } from '../config';

export const convertDocument = docs => {
  return docs.map(item => {
    let doc = item.data();
    doc.id = item.id;
    return doc;
  });
};

export const convertToDate = firestoreTimestamp => {
  return firestoreTimestamp.toDate().toDateString();
};

export const convertToTimestamp = strDate => {
  const date = Date.parse(strDate);
  return new Timestamp(date / 1000, 0);
};

export const isDateLocked = (now, remote) => {
  const nowDate = new Date(now.toISOString().slice(0, 10)).getTime();
  const remoteDate = new Date(remote.toISOString().slice(0, 10)).getTime();
  return remoteDate < nowDate;
};

export const convertToTableData = data => {
  const now = new Date(Date.now());
  return {
    rowHeaders: [...Object.values(data.days).map(value => convertToDate(value))],
    rowData: Object.entries(data.scores).map(([key, value]) => {
      const participant = key;
      const scores = Object.entries(value).map(([dayIndex, value]) => {
        const date = data.days[dayIndex].toDate();
        return {
          locked: isDateLocked(now, date),
          value
        };
      });
      const sum = scores.reduce((acc, curr) => acc + curr.value, 0);

      return [{ locked: true, value: participant }, ...scores, { locked: true, value: sum }];
    })
  };
};

export const updateScores = rowData => {
  let scores = {};
  rowData.forEach(row => {
    let newScores = {};
    row
      .slice(1, row.length - 1)
      .map(entry => entry.value)
      .forEach((value, i) => {
        newScores[i + 1] = value;
      });
    scores[row[0].value] = newScores;
  });
  return scores;
};

export const initTableData = () => {
  return {
    rowHeaders: [],
    rowData: []
  };
};

export const isEmpty = str => {
  return !str || 0 === str.length;
};
