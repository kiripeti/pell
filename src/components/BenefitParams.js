import React, {Component} from 'react';
import DatePicker from './FormElements/DatePicker';

class BenefitParams extends Component {
  renderParam = (param) => {
    if (param.name.indexOf('_FLG')>-1) {
      param.type = 'F';
    }

    let input = null;

    switch (param.type) {
      case 'N':
        input = (
          <input
            type="text"
            name={param.name}
            className="cell_input"
            value={this.props.params[param.name] ? this.props.params[param.name] : ''}
            onChange={(event) => this.props.setParam({[param.name]: Number.parseFloat(event.target.value)})} />
        );
        break;
      case 'S':
        const pairs = param.options.split(';');
        input = (
          <select
            name={param.name}
            className="combobox"
            size="1"
            value={this.props.params[param.name] ? this.props.params[param.name] : ''}
            onChange={(event) => this.props.setParam({[param.name]: event.target.value})} >
            <option></option>
            {pairs.map( (pair, index) => <option key={index} value={pair.split(':')[0]}> {pair.split(':')[1]} </option> )}
          </select>
        );
        if (pairs.length > 1) break;
      case 'C':
        input = (
          <input
            type="text"
            name={param.name}
            className="cell_input"
            value={this.props.params[param.name] ? this.props.params[param.name] : ''}
            onChange={(event) => this.props.setParam({[param.name]: event.target.value})} />
        );
        break;
      case 'D':
        input = (
          <DatePicker
            name={param.name}
            className="cell_input"
            date={this.props.params[param.name] ? this.props.params[param.name] : ''}
            onChange={this.props.setParam} />
        );
        break;
      case 'F':
        input = (
          <select
            name={param.name}
            className="combobox"
            size="1"
            value={this.props.params[param.name] ? this.props.params[param.name] : ''}
            onChange={(event) => this.props.setParam({[param.name]: event.target.value})} >
            <option></option>
            <option value="1">Igen</option>
            <option value="0">Nem</option>
          </select>
        );
        break;
      default:
        input = null;
    }

    return (
      <tr key={param.name}>
        <td className="cell_property_fix">{param.label}:</td>
        <td className="cell_value">
          {input}
        </td>
      </tr>
    );
  }

  render(props) {
    return (
      <div id="rehab_container" style={{position:'relative', top:180, width:'80%', margin:'auto', background:'#e1e1e1', border:'1px solid #d1d1d1', padding:0, paddingTop:8, paddingBottom:0}} >
        <div style={{paddingLeft:20, paddingBottom:8, fontSize:13, textTransform:'uppercase'}} >
          {this.props.benefitDescription + ' paraméterei'}
        </div>
        <div style={{background:'#fff', padding:5, borderTop:'1px solid #d1d1d1', margin:'0px auto', horizontalAlign:'center'}} >
          <table width="100%" border="0" cellSpacing="0" cellPadding="0">
            <tbody>
              <tr>
                <td align="center">
                  <table border="0" cellPadding="8" >
                    <tbody>
                      {this.props.benefitParams.map(this.renderParam)}
                    </tbody>
                  </table>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default BenefitParams;
