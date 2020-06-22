import React, {Component} from 'react';
import RadioButton from './FormElements/RadioButton';
import DatePicker from './FormElements/DatePicker';
import Table from './Table';

class CustomerFamily extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedRow: 0
    }

    this.headers = [
      {name: 'SELECTED',     align: 'C', label: ''},
      {name: 'FAMILY_JKOD',  align: 'C', label: 'Azonosító'},
      {name: 'SZUL_DT',      align: 'C', label: 'Születési dátum'},
      {name: 'TYPE',         align: 'C', label: 'Kapcsolat jellege'}
    ];

    this.addRow = this.addRow.bind(this);
    this.removeRow = this.removeRow.bind(this);
  }

  updateFamily(index, property, value) {
    const newFamily = this.props.family.slice();
    newFamily[index][property] = value;
    this.props.updateFamily(newFamily);
  }

  addRow() {
    let newRow = {};
    this.headers.forEach((column) => {
      if (column.name !== 'SELECTED') {
        newRow[column.name] = null;
      }
    });

    this.props.updateFamily([
      newRow,
      ...this.props.family
    ]);
  }

  removeRow() {
    const newFamily = this.props.family.slice();
    const index = this.state.selectedRow;

    newFamily.splice(index, 1);

    this.props.updateFamily(newFamily);
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
      case 'FAMILY_JKOD':
        input = (
          <input
            type="text"
            value={this.props.family[index][column.name] ? this.props.family[index][column.name] : ''}
            onChange={(event) => this.updateFamily(index, column.name, parseInt(event.target.value))} />
        );
        break;
      case 'SZUL_DT':
        input = (
          <DatePicker
            name={column.name}
            date={this.props.family[index][column.name] ? this.props.family[index][column.name] : ''}
            onChange={(dateObject) => this.updateFamily(index, column.name, dateObject[column.name])} />
        );
        break;
      case 'TYPE':
        input = (
          <select
            name={column.name}
            className="combobox"
            style={{width:168, background:'white', border:'1px black solid'}}
            size="1"
            value={this.props.family[index][column.name] ? this.props.family[index][column.name] : ''}
            onChange={(event) => this.updateFamily(index, column.name, parseInt(event.target.value))} >
            <option></option>
            <option value="1">Házastárs</option>
            <option value="2">Gyermek</option>
          </select>
        );
        break;
      default:
        input = null;
    }

    return input;
  }

  prepareData() {
    return this.props.family.map( (row, index) => {
      let newRow = {};
      this.headers.forEach((column) => {
        newRow[column.name] = this.columnToInput(column, index);
      });
      return newRow;
    });
  }

  render(props) {
    return (
      <div id="t2_content" style={{width:'100%', height:'100%', top:0, position:'absolute', textAlign:'left'}}>
        <div style={{padding:0, fontSize:'15pt', background:'#ece3c0', marginTop:2, width:"100%"}}>
          <table width="100%" border="0" cellSpacing="5" cellPadding="5">
            <tbody>
              <tr style={{height:45}}>
                <td style={{width:'100%'}} align='right'>
                  <div id="btns" style={{paddingRight:10, paddingBottom:5}}>
                    <input type="button" className="button" value=" Új családtag " id="newRowBtn" onClick={this.addRow} />
                    <input type="button" className="button_disabled" value=" Családtag törlése" id="delRowBtn" onClick={this.removeRow} />
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div id="data2_container" style={{margin:'0px auto', width:'100%', bottom:0, top:40, position:'absolute',  textAlign:'left', overflow:'auto'}} >
          <div style={{height:'100%', padding:0}} >
            <div id="data2" style={{margin:'0px auto', height:'100%', position:'relative', width:'100%', textAlign:'center', overflow:'auto', display:'block'}} >
              <Table header={this.headers} data={this.prepareData()} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default CustomerFamily;
