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

export const convertToTableData = data => {
  return {
    rowHeaders: [...Object.values(data.days).map(value => convertToDate(value))],
    rowData: Object.entries(data.scores).map(([key, value]) => {
      const participant = key;
      const scores = Object.values(value);
      const sum = scores.reduce((acc, curr) => acc + curr, 0);
      return [participant, ...scores, sum];
    })
  };
};

export const updateScores = rowData => {
  let scores = {};
  rowData.forEach(row => {
    let newScores = {};
    row
      .slice(1, row.length - 1)
      .map(entry => Number(entry))
      .forEach((value, i) => {
        newScores[i + 1] = value;
      });
    scores[row[0]] = newScores;
  });
  return scores;
};

export const initTableData = () => {
  return {
    rowHeaders: [],
    rowData: []
  };
};
