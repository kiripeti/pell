import React, {Component} from 'react';
import RadioButton from '../FormElements/RadioButton';
import DatePicker from '../FormElements/DatePicker';
import Select from '../FormElements/Select';
import Table from '../Table';

class CustomerIncome extends Component {
  constructor(props) {
    super(props);

    this.state = {
      aggregation_level: 'yearly'
    }

    this.headers ={
      yearly: [
        {name: 'EV',                        align: 'R', label: 'Év'},
        {name: 'ALKMINKOD',                 align: 'L', label: 'ALKMINKOD'},
        {name: 'IRANYITOSZAM',              align: 'C', label: 'IRANYITOSZAM'},
        {name: 'SZOLG_NOK40_NAP',           align: 'R', label: 'SZOLG_NOK40_NAP'},
        {name: 'SZOLG_15_RESZNY',           align: 'R', label: 'SZOLG_15_RESZNY'},
        {name: 'SZOLG_20_TELJ',             align: 'R', label: 'SZOLG_20_TELJ'},
        {name: 'JARULEKALAP',               align: 'R', label: 'JARULEKALAP'},
        {name: 'OSZTONAP',                  align: 'R', label: 'OSZTONAP'},
        {name: 'SZOLG_GOND_DIJ_NAP',        align: 'R', label: 'SZOLG_GOND_DIJ_NAP'},
        {name: 'SZOLG_GOND_SEGELY_NAP',     align: 'R', label: 'SZOLG_GOND_SEGELY_NAP'},
        {name: 'SZOLG_NEVEL_TAM_NAP',       align: 'R', label: 'SZOLG_NEVEL_TAM_NAP'},
        {name: 'SZOLG_APOLASI_DIJ_NAP',     align: 'R', label: 'SZOLG_APOLASI_DIJ_NAP'}
      ],

      detailed:[
        {name: 'TARGYEV',                   align: 'R', label: 'TARGYEV'},
        {name: 'FOGLALKOZTATO_AZON',        align: 'L', label: 'FOGLALKOZTATO_AZON'},
        {name: 'ALKMIN',                    align: 'L', label: 'ALKMIN'},
        {name: 'ALABONTASKOD',              align: 'L', label: 'ALABONTASKOD'},
        {name: 'ALABONTASERTEK',            align: 'R', label: 'ALABONTASERTEK'},
        {name: 'KEZDESDATUM',               align: 'C', label: 'KEZDESDATUM'},
        {name: 'VEGEDATUM',                 align: 'C', label: 'VEGEDATUM'},
        {name: 'OSZTONAP',                  align: 'R', label: 'OSZTONAP'},
        {name: 'NYUGDIJBIZTOSITASIJARULEK', align: 'R', label: 'NYUGDIJBIZTOSITASIJARULEK'},
        {name: 'FOJOGVISZONYNAP',           align: 'R', label: 'FOJOGVISZONYNAP'},
        {name: 'MINOSEG_JEL',               align: 'L', label: 'MINOSEG_JEL'},
        {name: 'MUNKAIDO',                  align: 'L', label: 'MUNKAIDO'},
        {name: 'FORRAS_TABLA',              align: 'L', label: 'FORRAS_TABLA'}
      ]
    };

    this.radioChange = this.radioChange.bind(this);
  }

  radioChange(value) {
    this.setState({aggregation_level: value});
  }

  columnToInput(column, index) {
    let input = null;

    switch (column.name) {
      case 'SELECTED':
        input = (
          <RadioButton
            name="selector"
            value={index}
            selectedValue={this.state.selectedRow}
            label=""
            onChange={(value) => this.setState({selectedRow: parseInt(value)})} />
        );
        break;
      case 'KEZDESDATUM':
      case 'VEGEDATUM':
        input = (
          <DatePicker
            name={column.name}
            date={this.props.new[index][column.name] ? this.props.new[index][column.name] : ''}
            onChange={(dateObject) => this.updateIncome(index, column.name, dateObject[column.name])} />
        );
        break;
      case 'FORRAS_TABLA':
        input = (
          <Select 
            name='FORRAS_TABLA'
            value={this.props.new[index][column.name]}
            onChange={(value) => this.updateIncome(index, column.name, value)}
            options={{
              'VALODI': 'Valódi',
              'PSZEUDO': 'Pszeudó'}}
          />
        );
        break;
      default:
        input = (
          <input
            type="text"
            value={this.props.new[index][column.name] ? this.props.new[index][column.name] : ''}
            onChange={(event) => this.updateIncome(index, column.name, parseInt(event.target.value))} />
        );
        break;
    }

    return input;
  }

  prepareData(aggregation_level) {
    return this.props[this.state.aggregation_level];
  }

  render() {
    return (
      <div id="t2_content" style={{width:'100%', height:'100%', top:0, position:'absolute', textAlign:'left'}}>
        <div style={{padding:0, fontSize:'15pt', background:'#ece3c0', marginTop:2, width:"100%"}}>
          <table width="100%" border="0" cellSpacing="5" cellPadding="5">
            <tbody>
              <tr style={{height:45}}>
                <td style={{fontSize:'11pt', whiteSpace: 'nowrap'}}>
                  <RadioButton
                    name="aggregation_level"
                    value="yearly"
                    selectedValue={this.state.aggregation_level}
                    label="Éves összesített adatok"
                    onChange={this.radioChange} />
                </td>
                <td className="cell_spacer">
                </td>
                <td style={{fontSize:'11pt', whiteSpace: 'nowrap'}}>
                  <RadioButton
                    name="aggregation_level"
                    value="detailed"
                    selectedValue={this.state.aggregation_level}
                    label="Részletes adatok"
                    onChange={this.radioChange} />
                </td>
                <td style={{width:'100%'}} align='right'>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div id="data2_container" style={{margin:'0px auto', width:'100%', bottom:0, top:40, position:'absolute',  textAlign:'left', overflow:'auto'}} >
          <div style={{height:'100%', padding:0}} >
            <div id="data2" style={{margin:'0px auto', height:'100%', position:'relative', width:'100%', textAlign:'center', overflow:'auto', display:'block'}} >
              <Table header={this.headers[this.state.aggregation_level]} data={this.prepareData(this.state.aggregation_level)} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default CustomerIncome;
