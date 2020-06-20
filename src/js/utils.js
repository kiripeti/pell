import { fromSasDateTime, toSasDateTime } from 'h54s';

const fromSASDate = (sasDate) => fromSasDateTime(sasDate * 24 * 60 * 60);
const toSASDate = (jsDate) => Math.floor(toSasDateTime(jsDate) / 24 / 60 / 60);
const dtFromSAS2JS = (table, columns) => functionOnColumns(table, columns, fromSASDate);
const dttmFromSAS2JS = (table, columns) => functionOnColumns(table, columns, fromSasDateTime);
const dtFromJS2SAS = (table, columns) => functionOnColumns(table, columns, toSASDate);
const dttmFromJS2SAS = (table, columns) => functionOnColumns(table, columns, toSasDateTime);

const functionOnColumns = (table, columns, func) => (
  table.map((row, index) => {
    let modCols = {};
    columns.forEach((column) => {
      if (row.hasOwnProperty(column)) {
        modCols[column] = func(row[column], index);
      }
    });
    return { ...row, ...modCols };
  })
);

export default {
  fromSASDate: fromSASDate,
  toSASDate: toSASDate,
  dtFromSAS2JS: dtFromSAS2JS,
  dttmFromSAS2JS: dttmFromSAS2JS,
  dtFromJS2SAS: dtFromJS2SAS,
  dttmFromJS2SAS: dttmFromJS2SAS,
  functionOnColumns: functionOnColumns
};