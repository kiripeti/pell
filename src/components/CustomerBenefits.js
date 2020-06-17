import React, {Component} from 'react';
import Table from './Table';

class CustomerBenefits extends Component {
  headers = [
    {name: 'TSZ',           align: 'C', label: 'TSZ'},
    {name: 'OSSZK',         align: 'C', label: 'OSSZK'},
    {name: 'ALFTF',         align: 'C', label: 'ALFTF'},
    {name: 'SZUL',          align: 'C', label: 'SZUL'},
    {name: 'SZUN',          align: 'C', label: 'SZUN'},
    {name: 'NEM',           align: 'C', label: 'NEM'},
    {name: 'BESZID',        align: 'C', label: 'BESZID'},
    {name: 'NYIND',         align: 'C', label: 'NYIND'},
    {name: 'FKOD',          align: 'C', label: 'FKOD'},
    {name: 'IRSZ',          align: 'C', label: 'IRSZ'},
    {name: 'HELYSEG',       align: 'C', label: 'HELYSEG'},
    {name: 'TELAZ',         align: 'C', label: 'TELAZ'},
    {name: 'JARASKOD',      align: 'C', label: 'JARASKOD'},
    {name: 'ARVA',          align: 'C', label: 'ARVA'},
    {name: 'ORSZJ',         align: 'C', label: 'ORSZJ'},
    {name: 'KSH_MEGYE',     align: 'C', label: 'KSH_MEGYE'},
    {name: 'KISTERSEG',     align: 'C', label: 'KISTERSEG'},
    {name: 'STAT_MEGYE',    align: 'C', label: 'STAT_MEGYE'},
    {name: 'VONHONAP',      align: 'C', label: 'VONHONAP'},
    {name: 'FORRAS_TABLA',  align: 'C', label: 'FORRAS_TABLA'},
    {name: 'KIEGFT',        align: 'C', label: 'KIEGFT'},
    {name: 'KIEGDB',        align: 'C', label: 'KIEGDB'},
    {name: 'SZULEV',        align: 'C', label: 'SZULEV'}
  ];

  render(props) {
    return (
      <div id="t3_content" style={{width:'100%', height:'100%', top:0, position:'absolute', textAlign:'center'}}>
        <div id="data3" style={{margin:'0px auto', width:'100%', height:'100%', textAlign:'center', overflow:'auto'}}>
          <Table header={this.headers} data={this.props.benefits} />
        </div>
      </div>
    );
  }
}

export default CustomerBenefits;
