import React, {Component} from 'react';
import DatePicker from './FormElements/DatePicker';
import Input from './FormElements/Input';

class BenefitParams extends Component {
  renderParam = (param) => {
    if (param.NAME.indexOf('_FLG')>-1 && param.TYPE !== 'S') {
      param.TYPE = 'F';
    }

    let input = null;

    switch (param.TYPE) {
      case 'N':
        input = (
          <Input
            type="N"
            name={param.NAME}
            className="cell_input"
            value={this.props.params[param.NAME] != null ? this.props.params[param.NAME] : ''}
            onChange={(value) => this.props.setParam({[param.NAME]: value})} />
        );
        break;
      case 'F':
        input = (
          <Input
            type="F"
            name={param.NAME}
            className="cell_input"
            value={this.props.params[param.NAME] != null ? this.props.params[param.NAME] : ''}
            onChange={(value) => this.props.setParam({[param.NAME]: value})} />
        );
        break;
      case 'S':
        const pairs = param.OPTIONS.split(';');
        input = (
          <select
            name={param.NAME}
            className="combobox"
            size="1"
            value={this.props.params[param.NAME] ? this.props.params[param.NAME] : ''}
            onChange={(event) => this.props.setParam({[param.NAME]: event.target.value})} >
            <option></option>
            {pairs.map( (pair, index) => (
              <option key={index} value={pair.split(':')[0]}> {pair.split(':')[1]} </option>
            ))}
          </select>
        );
        if (pairs.length > 1) break;
      case 'C':
        input = (
          <Input
            type="C"
            name={param.NAME}
            className="cell_input"
            value={this.props.params[param.NAME] ? this.props.params[param.NAME] : ''}
            onChange={(value) => this.props.setParam({[param.NAME]: value})} />
        );
        break;
      case 'D':
        input = (
          <DatePicker
            name={param.NAME}
            className="cell_input"
            date={this.props.params[param.NAME] ? this.props.params[param.NAME] : ''}
            onChange={this.props.setParam} />
        );
        break;
      case 'F':
        input = (
          <select
            name={param.NAME}
            className="combobox"
            size="1"
            value={this.props.params[param.NAME] ? this.props.params[param.NAME] : ''}
            onChange={(event) => this.props.setParam({[param.NAME]: event.target.value})} >
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
      <tr key={param.NAME}>
        <td className="cell_property_fix">{param.LABEL}:</td>
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
