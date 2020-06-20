import { 
  fromSasDateTime as h54sFromSASdttm,
  toSasDateTime as h54sToSASdttm 
} from 'h54s';

const fromSasDateTime = (sasDate) => sasDate ? h54sFromSASdttm(sasDate) : null;
const fromSASDate = (sasDate) => sasDate ? fromSasDateTime(sasDate * 24 * 60 * 60) : null;
const toSasDateTime = (jsDate) => jsDate ? h54sToSASdttm(jsDate) : null;
const toSASDate = (jsDate) => jsDate ? Math.floor(toSasDateTime(jsDate) / 24 / 60 / 60) : null;

const dtFromSAS2JS = (table, columns) => functionOnColumns(table, columns, fromSASDate);
const dttmFromSAS2JS = (table, columns) => functionOnColumns(table, columns, fromSasDateTime);
const dtFromJS2SAS = (table, columns) => functionOnColumns(table, columns, toSASDate);
const dttmFromJS2SAS = (table, columns) => functionOnColumns(table, columns, toSasDateTime);

const functionOnColumns = (table, columns, func) => (
  table.map((row, index) => {
    let modCols = {};

    if (columns === '_ALL_') {
      for (const column in row) {
        if (row.hasOwnProperty(column)) {
          modCols[column] = func(row[column], index);
        }
      }
    } else {
      columns.forEach((column) => {
        if (row.hasOwnProperty(column)) {
          modCols[column] = func(row[column], index);
        }
      });
  }
    return { ...row, ...modCols };
  })
);

const removeEmptyKeys = (obj) => {
  for (const key in obj) {
    if (obj[key] == null || obj[key] === '') {
      delete obj[key];
    }
  }
  return obj;
}

export default {
  fromSASDate: fromSASDate,
  fromSasDateTime: fromSasDateTime,
  toSASDate: toSASDate,
  toSasDateTime: toSasDateTime,
  dtFromSAS2JS: dtFromSAS2JS,
  dttmFromSAS2JS: dttmFromSAS2JS,
  dtFromJS2SAS: dtFromJS2SAS,
  dttmFromJS2SAS: dttmFromJS2SAS,
  functionOnColumns: functionOnColumns,
  removeEmptyKeys: removeEmptyKeys
};