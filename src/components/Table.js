import React, {Component} from 'react';

class Table extends Component {
  generateHeader(header) {
    return header.map( (column) => <td key={column.name} className="table_header">{column.label}</td> );
  }

  generateRows(header, data) {
    return data.map( (row, index) => this.generateRow(header, row, index) );
  }

  generateRow(header, row, index) {
    return (
      <tr key={index} className={index%2 === 1 ? 'table_row_alt' : 'table_row'} >
        {header.map( (column) => (
          <td key={column.name+index} className={'table_cell_'+column.align} >
            {row[column.name] instanceof Date ? row[column.name].toLocaleDateString('hu-HU') : row[column.name]}
          </td> 
        ))}
      </tr>
    );
  }

  render() {
    return (
      <table id={this.props.id} style={{width:'100%', padding:10, overflow:'auto', marginTop:2}} >
        <tbody>
          <tr>
            {this.generateHeader(this.props.header)}
          </tr>
          {this.generateRows(this.props.header, this.props.data)}
        </tbody>
      </table>
    );
  }
}

export default Table;
