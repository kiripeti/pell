import React from 'react';
import Table from './Table';

const Results = ({results}) => {
  const headers = [
    { name: 'ELLATAS_NM', align: 'C', label: 'ELLATAS_NM' },
    { name: 'ELLATAS_START_DT', align: 'C', label: 'ELLATAS_START_DT' },
    { name: 'ELLATAS_END_DT', align: 'C', label: 'ELLATAS_END_DT' },
    { name: 'ELLATAS_DAYS_NUM', align: 'C', label: 'ELLATAS_DAYS_NUM' },
    { name: 'ELLATAS_AMOUNT', align: 'C', label: 'ELLATAS_AMOUNT' },
    { name: 'ELLATAS_DESC', align: 'C', label: 'ELLATAS_DESC' }
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
