import React, { Component, Fragment } from 'react';
import utils, { SAS } from '../../js/utils';

import Loading from '../Loading';
import JkodInput from '../JkodInput';
import CustomerData from './CustomerData';
import Events from './Events';
import BenefitParams from '../BenefitParams';
import DatePicker from '../FormElements/DatePicker';
import CheckBox from '../FormElements/CheckBox';
import { benefits } from '../../test_data/benefits';

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

  componentDidMount = () =>
    this.sas.call({
      program: 'getBenefits',
      isDebug: this.props.isDebug,
      preprocess: () => this.setState(() => ({
        isLoading: true,
        loadingMessage: 'Betöltés'
      })),
      success: (res) => {
        this.setState(() => ({
          benefits: res.benefits,
          benefitParams: res.benefitParams
        }));
      },
      postprocess: () => {
        this.setState(() => ({
          isLoading: false
        }));
      }
    });

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
                eventListUpdate={({eventList, benefitList}) => this.setState({eventList: eventList, selectedBenefits: benefitList})} />
            </Fragment>
          }
          {
            this.state.eventList.length > 0 &&
            <Fragment>
              {
                this.state.selectedBenefits.map((benefit) => (
                  <BenefitParams
                    key={benefit}
                    benefit={benefit}
                    benefitParams={this.state.benefitParams.filter((param) => param.ELLATAS_CD === benefit)}
                    benefitDescription={this.state.benefits.filter((elem) => elem.ELLATAS_KOD === benefit)[0].ELLATAS_NEV}
                    params={this.state.params}
                    setParam={this.setParam} />
                ))
              }

              <div id="bottom_container" style={{ position: 'relative', top: 180, width: '80%', margin: 'auto', background: '#e1e1e1', border: '1px solid #d1d1d1', padding: 0, paddingTop: 8, paddingBottom: 10, paddingLeft: 0 }} >
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
            </Fragment>
          }
        </div>
      </Fragment>
    );
  }
}

export default Scenario;
