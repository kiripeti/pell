import h54s, {
  fromSasDateTime as h54sFromSASdttm,
  toSasDateTime as h54sToSASdttm
} from 'h54s';

import customer_data from '../test_data/ugyfel_adat';
import { benefits } from '../test_data/benefits';
import { events } from '../test_data/getEvents';

const dev = true;

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

const dtFromJS2SASAllColumn = (table) => functionOnColumns(table, '_ALL_', (value) => value instanceof Date ? toSASDate(value) : value)

const removeEmptyKeysFromOcjet = (obj) => {
  for (const key in obj) {
    if (obj[key] == null || obj[key] === '') {
      delete obj[key];
    }
  }
  return obj;
}

const removeEmptyKeys = (obj) => {
  if (obj instanceof Array) {
    return obj.map(removeEmptyKeysFromOcjet);
  } else {
    return removeEmptyKeysFromOcjet(obj)
  }
}

const action = {
  'getCustomer': customer_data,
  'getBenefits': benefits,
  'getEvents': events
};

export class SAS {
  sas = new h54s({
    metadataRoot: '/PELL/Stored Processes/',
    debug: true,
    maxXhrRetries: 0
  });

  call = ({ program, tables, preprocess, success, postprocess, isDebug }) => {
    tables = tables ? Object.getOwnPropertyNames(tables)
      .reduce((modTables, tableName) => ({
        ...modTables,
        [tableName]: dtFromJS2SASAllColumn(tables[tableName])
      }), {}) : null;

    if (isDebug) console.log('tables', tables);

    if (preprocess) preprocess();

    let sasData = new h54s.SasData([{ debug: isDebug ? 1 : 0 }], 'debug');

    if (tables && Object.keys(tables).length > 0) {
      const tableNames = Object.keys(tables);

      for (let i = 0; i < tableNames.length; i++) {
        let tableName = tableNames[i];
        let data = removeEmptyKeys(tables[tableName]);
        sasData.addTable(data, tableName);
      }
    }

    this.sas.call(program, sasData, (err, res) => {
      if (dev) {
        success(action[program])
      } else {
        if (err) {
          if (err.type === 'notLoggedinError') {
            alert('A munkamenet lejárt! Frissítse az oldalt a bejelentkezéshez.');
          } else {
            console.log(err);
            alert('Hiba lépett fel a feldolgozás során!');
          }
        } else {
          if (isDebug) console.log('response', res);
          success(res);
        }

      }

      if (postprocess) postprocess();
    });
  }
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