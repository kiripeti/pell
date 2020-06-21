import h54s, { 
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

export class SAS {
  sas = new h54s({
    metadataRoot:'/PELL/Stored Processes/',
    debug: true,
    maxXhrRetries: 0
  });

  call = ({ program, tables, preprocess, success, postprocess }) => {
    if (preprocess) preprocess();

    let sasData = null;

    if (tables && Object.keys(tables).length > 0) {
      const tableNames = Object.keys(tables);

      let tableName = tableNames[0];
      let data = removeEmptyKeys(tables[tableName]);
      sasData = new h54s.SasData(data, tableName);

      for (let i = 1; i < tableNames.length; i++) {
        let tableName = tableNames[i];
        let data = removeEmptyKeys(tables[tableName]);
        sasData.addTable(data, tableName);
      }
    }

    this.sas.call(program, sasData, (err, res) => {
      if (err) {
        if (err.type === 'notLoggedinError') {
          window.location.href = '/pell';
        }
        console.log(err);
        alert('Hiba lépett fel a feldolgozás során!');
      } else {
        success(res);
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