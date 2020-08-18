import React, { Component, Fragment } from 'react';
import utils, { SAS } from '../../js/utils';

import Loading from '../Loading';
import JkodInput from '../JkodInput';
import CustomerData from './CustomerData';
import Events from './Events';
import DatePicker from '../FormElements/DatePicker';
import CheckBox from '../FormElements/CheckBox';
import Table from '../Table';

class Scenario extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      loadingMessage: '',
      isCustomerLoaded: false,
      jkod: '',
      selectedTab: 'CUSTOMER',
      family: [],
      eventList: []
    };

    this.sas = new SAS();
  }

  jkodClick = () => {
    const jkod = this.state.jkod;
    if (jkod === '') return;

    this.sas.call({
      program: 'getCustomer',
      isDebug: this.props.isDebug,
      tables: {
        jkod: [{ jkod: jkod }]
      },
      preprocess: () => this.setState(() => ({
        isLoading: true,
        loadingMessage: 'Ügyfél betöltése'
      })),
      success: (res) => this.setState(prevState => ({
        isCustomerLoaded: true,
        customer: {
          ALAP_ADATOK: utils.dtFromSAS2JS(res.alap_adatok, ['SZUL_DT']),
          EU_ADATOK: res.eu_adatok,
          EV_ELEMZES: res.ev_elemzes,
          JOGVISZONY: utils.functionOnColumns(
            res.jogviszony,
            ['KEZDESDATUM', 'VEGEDATUM'],
            (sasDateTime) => utils.fromSasDateTime(sasDateTime).toLocaleDateString('hu-HU')
          )
        },
        params: { ...prevState.params, ...{ UFAZONOSITO: jkod, JKOD: jkod } }
      })),
      postprocess: () => this.setState(() => ({
        isLoading: false
      }))
    });
  }

  jkodChange = (jkod) => this.setState(() => ({ jkod: jkod }));
  updateSelectedTab = (value) => this.setState({ selectedTab: value });
  updateFamily = (family) => this.setState(() => ({ family: family }));
  setParam = (param) => this.setState(state => ({ params: { ...state.params, ...param } }));

  updateCustomer = (type, index, property, data) =>
    this.setState((state) => {
      let customer = Object.assign({}, state.customer);
      if (!customer[type][index]) {
        customer[type][index] = {};
      }
      customer[type][index][property] = data;
      return { customer: customer };
    });
  
  calculate = () => {
    const tables = {
      events: this.state.eventList.map((event, index) => ({
        order: index+1,
        event: event.event_cd
      })),
      family: this.state.family.map((member) => ({
        JKOD: this.state.jkod, ...member
      }))
    };

    this.state.eventList.forEach((element, index) => {
      tables['event_'+(index+1)+'_params'] = [{...element.event_params, ...element.benefit_params, ...this.state.params}];
    });

    this.sas.call({
      program: 'calculateScenario',
      isDebug: this.props.isDebug,
      tables: tables,
      preprocess: () => this.setState(() => ({
        isLoading: true,
        loadingMessage: 'Szcenárió futás'
      })),
      success: (res) => this.setState({result: res}),
      postprocess: () => this.setState(() => ({
        isLoading: false
      }))
    });
  }

  render() {
    if (this.state.isLoading) {
      return (
        <Loading message={this.state.loadingMessage} />
      );
    }

    return (
      <Fragment>
        <div className="header">
          <h2 style={{ color: '#CEC7BA', paddingBottom: 25 }}> Szcenárióelemzés </h2>
          <p style={{ fontSize: '11pt' }}>Életesemények hatása a jogszerzésre.</p>
        </div>
        <div className="request">
          <JkodInput jkod={this.state.jkod} onChange={this.jkodChange} onClick={this.jkodClick} />
          {
            this.state.isCustomerLoaded &&
            <Fragment>
              <CustomerData
                selectedTab={this.state.selectedTab}
                customer={this.state.customer}
                family={this.state.family}
                params={this.state.params}
                updateCustomer={this.updateCustomer}
                updateSelectedTab={this.updateSelectedTab}
                updateFamily={this.updateFamily}
                setParam={this.setParam} />
              <Events
                eventList={this.state.eventList}
                eventListUpdate={({ eventList }) => this.setState({ eventList: eventList })} />
            </Fragment>
          }
          {
            this.state.eventList.length > 0 &&
            <div id="bottom_container" style={{ position: 'relative', top: 180 + this.state.eventList.length * 30, width: '80%', margin: 'auto', background: '#e1e1e1', border: '1px solid #d1d1d1', padding: 0, paddingTop: 8, paddingBottom: 10, paddingLeft: 0 }} >
              <table border="0" cellPadding="8" style={{ marginLeft: 20 }} >
                <tbody>
                  <tr>
                    <td className="cell_text">Vizsgált időpont:</td>
                    <td className="cell_spacer"></td>
                    <td className="cell_text">
                      <DatePicker
                        name='LEKERDEZES_DT'
                        date={this.state.params.LEKERDEZES_DT}
                        onChange={this.setParam} />
                    </td>
                  </tr>
                  <tr>
                    <td className="cell_text">Teszt futtatás:</td>
                    <td className="cell_spacer"></td>
                    <td className="cell_text">
                      <CheckBox
                        checked={this.props.isDebug}
                        onChange={this.setDebug}
                        label="" />
                    </td>
                  </tr>
                  <tr>
                    <td colSpan="2"></td>
                    <td>
                      <input type="button" className="button" style={{ marginLeft: 0 }} value=" Számol " onClick={this.calculate} />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          }
          {
            this.state.result &&
            <div>
              BRM_OUTPUT
              <Table
                header={[
                  { name: 'ELLATAS_CD',       align: 'C', label: 'Ellátás kódja' },
                  { name: 'ELLATAS_NM',       align: 'C', label: 'Ellátás neve' },
                  { name: 'ELLATAS_START_DT', align: 'C', label: 'Ellátás Kezdete' },
                  { name: 'ELLATAS_END_DT',   align: 'C', label: 'Ellátás Vége' },
                  { name: 'ELLATAS_DAYS_NUM', align: 'C', label: 'Ellátás hossza' },
                  { name: 'ELLATAS_AMOUNT',   align: 'C', label: 'Ellátás összege' },
                  { name: 'ELLATAS_DESC',     align: 'C', label: 'Megjegyzés' }
                ]}
                data={this.state.result.brm_output}
              />
              JOGVISZONY
              <Table
                header={[
                    {name: 'TARGYEV',                   align: 'R', label: 'Tárgyév'},
                    {name: 'ALKMIN',                    align: 'L', label: 'ALKMIN kód'},
                    {name: 'KEZDESDATUM',               align: 'C', label: 'Jogviszony kezdete'},
                    {name: 'VEGEDATUM',                 align: 'C', label: 'Jogviszony vége'},
                    {name: 'OSZTONAP',                  align: 'R', label: 'Osztónap'},
                    {name: 'NYUGDIJBIZTOSITASIJARULEK', align: 'R', label: 'Összeg'},
                    {name: 'FORRAS_TABLA',              align: 'L', label: 'Pszeudó / Valódi'},
                    {name: 'SOURCE_METHOD',             align: 'L', label: 'Jogviszony forrása'}
                  ]}
                data={this.state.result.jogviszony}
              />
            </div>
          }
        </div>
      </Fragment>
    );
  }
}

export default Scenario;
