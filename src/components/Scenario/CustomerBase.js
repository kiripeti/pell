import React, {Component} from 'react';
import DatePicker from '../FormElements/DatePicker';
import Input from '../FormElements/Input';

class CustomerBase extends Component {
  changeData = (type, property) => ( (event) => this.props.updateCustomer(type, 0, property, event.target.value) );

  render() {
    return (
      <div id="t1_content" style={{width:'100%', height:'100%', top:0, position:'absolute', textAlign:'center'}} >
        <div id="data1" style={{margin:'0px auto', width:'100%', height:'100%', textAlign:'center', background:'white', marginTop:2}}>
          <table style={{margin:'0 auto', width:'100%', height:'100%'}}>
            <tbody>
              <tr>
                <td valign="middle" align="middle">
                  <table>
                    <tbody>
                      <tr>
                        <td className="cell_property">Születési idő:</td>
                        <td className="cell_value">
                          <DatePicker
                            name="SZUL_DT"
                            className="cell_input"
                            date={this.props.base.SZUL_DT ? this.props.base.SZUL_DT : ''} />
                        </td>
                        <td className="cell_spacer"></td>
                        <td className="cell_property">Egészségi állapot:</td>
                        <td className="cell_value">
                          <Input
                            type="N"
                            name="EU_ALLAPOT"
                            className="cell_input"
                            value={this.props.eu.EU_ALLAPOT != null ? this.props.eu.EU_ALLAPOT : ''}
                            readOnly />
                          &nbsp;%
                        </td>
                        <td className="cell_spacer"></td>
                        <td className="cell_property">Kereső tevékenységet végez:</td>
                        <td className="cell_value">
                          <Input
                            type="N"
                            name="REHABILITALHATO_FL"
                            className="cell_input"
                            value={this.props.params.KER_TEV_FLG ? (this.props.params.KER_TEV_FLG === '1' ? 'Igen' : 'Nem') : ''}
                            readOnly />
                        </td>
                      </tr>
                      <tr>
                        <td className="cell_property">Nem:</td>
                        <td className="cell_value">
                          <input type="text" name="NEM" className="cell_input" value={this.props.base.NEM ? this.props.base.NEM : ''} readOnly />
                        </td>
                        <td className="cell_spacer"></td>
                        <td className="cell_property">Rehabilitálható flag:</td>
                        <td className="cell_value">
                          <Input
                            type="N"
                            name="REHABILITALHATO_FL"
                            className="cell_input"
                            value={this.props.eu['REHABILITALHATO_FL'] != null ? this.props.eu['REHABILITALHATO_FL'] : ''}
                            readOnly />
                        </td>
                        <td className="cell_spacer">
                        </td>
                        <td className="cell_property">Rendszeres pénzellátásban részesül:</td>
                        <td className="cell_value">
                          <Input
                            type="N"
                            name="REHABILITALHATO_FL"
                            className="cell_input"
                            value={this.props.params.RENDSZ_PENZELL_FLG ? (this.props.params.RENDSZ_PENZELL_FLG === '1' ? 'Igen' : 'Nem') : ''}
                            readOnly />
                        </td>
                      </tr>
                      <tr>
                        <td colSpan="3"></td>
                        <td className="cell_property">Önellátásra képes flag:</td>
                        <td className="cell_value">
                          <Input
                            type="N"
                            name="ONELLATAS_FL"
                            className="cell_input"
                            value={this.props.eu['ONELLATAS_FL'] != null ? this.props.eu['ONELLATAS_FL'] : ''}
                            readOnly />
                        </td>
                      </tr>
                      <tr>
                        <td colSpan="3"></td>
                        <td className="cell_property">Komplex minősítés:</td>
                        <td className="cell_value">
                          <input type="text" name="KMPX_MIN" className="cell_input" value={this.props.eu.KMPX_MIN ? this.props.eu.KMPX_MIN : ''} readOnly />
                        </td>
                      </tr>
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

export default CustomerBase;
