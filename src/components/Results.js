import React from 'react';
import Table from './Table';

const Results = ({results}) => {
  const headers = [
    { name: 'ELLATAS_JKOD',     align: 'C', label: 'Ügyfél-azonosító' },
    { name: 'ELLATAS_NM',       align: 'C', label: 'Ellátás neve' },
    { name: 'ELLATAS_START_DT', align: 'C', label: 'Ellátás Kezdete' },
    { name: 'ELLATAS_END_DT',   align: 'C', label: 'Ellátás Vége' },
    { name: 'ELLATAS_DAYS_NUM', align: 'C', label: 'Ellátás hossza' },
    { name: 'ELLATAS_AMOUNT',   align: 'C', label: 'Ellátás összege' },
    { name: 'ELLATAS_DESC',     align: 'C', label: 'Megjegyzés' }
  ];

  return (
    <div style={{ width: '100%', height: '100%', top: 0, position: 'absolute', textAlign: 'center' }}>
      <div id="output" style={{ margin: '0px auto', width: '100%', height: '100%', textAlign: 'center', overflow: 'auto' }} >
        <Table header={headers} data={results} />
      </div>
    </div>
  );
}

export default Results;
