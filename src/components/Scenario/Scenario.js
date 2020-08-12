import React, { Component, Fragment } from 'react';
import utils, { SAS } from '../../js/utils';

import Loading from '../Loading';
import JkodInput from '../JkodInput';
import CustomerData from './CustomerData';

class Scenario extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      loadingMessage: '',
      isCustomerLoaded: false,
      jkod: '',
      selectedTab: 'CUSTOMER',
      family: []
    };

    this.sas = new SAS();
  }

  componentDidMount = () =>
    this.sas.call({
      program: 'getEvents',
      isDebug: this.props.isDebug,
      preprocess: () => this.setState(() => ({
        isLoading: true,
        loadingMessage: 'Betöltés'
      })),
      success: (res) => {},
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
  updateFamily = (family) => this.setState(prevState => ({ family: family }));
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
            </Fragment>
          }
        </div>
      </Fragment>
    );
  }
}

export default Scenario;
