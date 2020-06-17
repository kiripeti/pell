import React, {Component} from 'react';
import DatePicker from './FormElements/DatePicker';

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
                            date={this.props.base.SZUL_DT ? this.props.base.SZUL_DT : ''}
                            onChange={(dateObject) => this.props.updateCustomer('ALAP_ADATOK', 0, 'SZUL_DT', dateObject.SZUL_DT)} />
                        </td>
                        <td className="cell_spacer"></td>
                        <td className="cell_property">Egészségügyi állapot:</td>
                        <td className="cell_value">
                          <input type="text" name="EG_ALLAPOT_PCT" className="cell_input" value={this.props.eu.EU_ALLAPOT ? this.props.eu.EU_ALLAPOT : ''} onChange={this.changeData('EU_ADATOK', 'EU_ALLAPOT')} />
                          &nbsp;%
                        </td>
                        <td className="cell_spacer"></td>
                        <td className="cell_property">Kereső tevékenységet végez:</td>
                        <td className="cell_value">
                          <select id="KER_TEV_FLG" name="KER_TEV_FLG" className="combobox" size="1" value={this.props.params.KER_TEV_FLG ? this.props.params.KER_TEV_FLG : ''} onChange={(event) => this.props.setParam({KER_TEV_FLG: event.target.value})} >
                            <option value=""></option>
                            <option value="1">Igen</option>
                            <option value="0">Nem</option>
                          </select>
                        </td>
                      </tr>
                      <tr>
                        <td className="cell_property">Nem:</td>
                        <td className="cell_value">
                          <input type="text" name="NEM" className="cell_input" value={this.props.base.NEM ? this.props.base.NEM : ''} onChange={this.changeData('ALAP_ADATOK', 'NEM')} />
                        </td>
                        <td className="cell_spacer"></td>
                        <td className="cell_property">Rehabilitálható flag:</td>
                        <td className="cell_value">
                          <input type="text" name="REHABILITALHATO_FLG" className="cell_input" value={this.props.eu.REHABILITALHATO_FL ? this.props.eu.REHABILITALHATO_FL : ''} onChange={this.changeData('EU_ADATOK', 'REHABILITALHATO_FL')} />
                        </td>
                        <td className="cell_spacer">
                        </td>
                        <td className="cell_property">Rendszeres pénzellátásban részesül:</td>
                        <td className="cell_value">
                          <select id="RENDSZ_PENZELL_FLG" name="RENDSZ_PENZELL_FLG" className="combobox" size="1"  value={this.props.params.RENDSZ_PENZELL_FLG ? this.props.params.RENDSZ_PENZELL_FLG : ''} onChange={(event) => this.props.setParam({RENDSZ_PENZELL_FLG: event.target.value})} >
                            <option></option>
                            <option value="1">Igen</option>
                            <option value="0">Nem</option>
                          </select>
                        </td>
                      </tr>
                      <tr>
                        <td colSpan="3"></td>
                        <td className="cell_property">Önellátásra képes flag:</td>
                        <td className="cell_value">
                          <input type="text" name="ONELLATAS_FL" className="cell_input" value={this.props.eu.ONELLATAS_FL ? this.props.eu.ONELLATAS_FL : ''} onChange={this.changeData('EU_ADATOK', 'ONELLATAS_FL')} />
                        </td>
                      </tr>
                      <tr>
                        <td colSpan="3"></td>
                        <td className="cell_property">Komplex minősítés:</td>
                        <td className="cell_value">
                          <input type="text" name="KMPX_MIN" className="cell_input" value={this.props.eu.KMPX_MIN ? this.props.eu.KMPX_MIN : ''} onChange={this.changeData('EU_ADATOK', 'KMPX_MIN')} />
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
