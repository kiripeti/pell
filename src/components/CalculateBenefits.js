import React, { Component, Fragment } from 'react';
import h54s from 'h54s';

import JkodInput from './JkodInput';
import Loading from './Loading';
import CustomerData from './CustomerData';
import Benefits from './Benefits';
import BenefitParams from './BenefitParams';
import DatePicker from './FormElements/DatePicker';
import utils from '../js/utils';
import CheckBox from './FormElements/CheckBox';

class CalculateBenefits extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      loadingMessage: '',
      isCustomerLoaded: false,
      jkod: '',
      customer: {
        ALAP_ADATOK: [],
        EU_ADATOK: [],
        EV_ELEMZES: [],
        JOGVISZONY: [],
        ALLSTAT: []
      },
      params: {
        LEKERDEZES_DT: new Date(),
        DONTES_KIIR: 1
      },
      selectedBenefits: [],
      benefits: [],
      benefitParams: [],
      selectedTab: 'CUSTOMER',
      newIncome: [],
      family: [],
      results: [],
      brm_inputs: {}
    };

    this.sas = new h54s({
      metadataRoot: '/PELL/Stored Processes/',
      debug: this.props.isDebug,
      maxXhrRetries: 0
    });
  }

  call = ({ program, loadingMessage, tables }, callback) => {
    this.setState(() => ({
      isLoading: true,
      loadingMessage: loadingMessage ? loadingMessage : 'Kérem várjon'
    }));

    let sasData = new h54s.SasData([{ debug: this.props.isDebug ? 1 : 0 }], 'debug');;

    if (tables && Object.keys(tables).length > 0) {
      const tableNames = Object.keys(tables);

      for (let i = 0; i < tableNames.length; i++) {
        let tableName = tableNames[i];
        let data = utils.removeEmptyKeys(tables[tableName]);
        sasData.addTable(data, tableName);
      }
    }

    this.sas.call(program, sasData, (err, res) => {
      this.setState(() => ({
        isLoading: false,
        loadingMessage: ''
      }));
      if (err) {
        if (err.type === 'notLoggedinError') {
          window.href = '/pell';
        }
        console.log(err);
        alert('Hiba lépett fel a feldolgozás során!');
      } else {
        callback(res);
      }
    });
  }

  componentDidMount = () =>
    this.call({
      program: 'getBenefits',
      loadingMessage: 'Adatok letöltése'
    },
      (res) => this.setState(() => ({
        benefits: res.benefits.sort((b1, b2) => b1.GROUP < b2.GROUP ? -1 : (b1.ELLATAS_NEV < b2.ELLATAS_NEV ? -1 : 1)),
        benefitParams: res.benefitParams.sort((b1, b2) => b1.ORDER - b2.ORDER)
      }))
    );

  jkodClick = () => {
    const jkod = this.state.jkod;

    if (jkod === '') return;

    this.call({
      program: 'getCustomer',
      loadingMessage: 'Ügyfél betöltése',
      tables: { jkod: [{ jkod: jkod }] }
    },
      (res) => {
        //res is an object returned from the server
        this.setState(prevState => ({
          isCustomerLoaded: true,
          customer: {
            ALAP_ADATOK: utils.dtFromSAS2JS(res.alap_adatok, ['SZUL_DT']),
            EU_ADATOK: res.eu_adatok,
            EV_ELEMZES: res.ev_elemzes,
            JOGVISZONY: utils.functionOnColumns(
              res.jogviszony,
              ['KEZDESDATUM', 'VEGEDATUM'],
              (sasDateTime) => utils.fromSasDateTime(sasDateTime).toLocaleDateString('hu-HU')
            ),
            ALLSTAT: res.allstat
          },
          params: { ...prevState.params, ...{ UFAZONOSITO: jkod, JKOD: jkod } }
        }));
      }
    );
  }

  calculate = () => {
    const dateParams = this.state.benefitParams
      .filter((param) => param.TYPE === 'D')
      .map((param) => param.NAME)
      .filter((name, index, names) => names.indexOf(name) === index);

    const family = utils
      .dtFromJS2SAS(this.state.family, ['SZUL_DT'])
      .map((member) => ({
        ...member, ...{ ['JKOD']: this.state.jkod }
      }));

    this.call({
      program: 'calculateBenefits',
      loadingMessage: 'Számítás',
      tables: {
        params: utils.dtFromJS2SAS([this.state.params], ['LEKERDEZES_DT', ...dateParams]),
        alap_adatok: utils.dtFromJS2SAS(this.state.customer.ALAP_ADATOK, ['SZUL_DT']),
        eu_adatok: this.state.customer.EU_ADATOK,
        new_income: utils.dttmFromJS2SAS(this.state.newIncome, ['KEZDESDATUM', 'VEGEDATUM']),
        family: family,
        benefits: this.state.selectedBenefits.map((benefit) => ({ benefit: benefit }))
      }
    },
      (res) => {
        let brm_inputs = {};
        let results = utils.dtFromSAS2JS(res.results, ['ELLATAS_START_DT', 'ELLATAS_END_DT']);

        results = results.map((result) => {
          const code = result['ELLATAS_CD'];
          const name = this.state.benefits.filter((benefit) => benefit['ELLATAS_KOD'] === code)[0]['ELLATAS_NEV'];

          return { ...result, ...{ ['ELLATAS_NM']: name } };
        });

        this.state.selectedBenefits.forEach((benefit) => {
          if (res['brm_input_' + benefit]) {
            brm_inputs[benefit] = res['brm_input_' + benefit];
          }
        });

        window.scrollTo(0, 0);
        this.setState({
          selectedTab: 'RESULT',
          results: results,
          brm_inputs: brm_inputs
        });
      }
    );
  }

  jkodChange = (jkod) => this.setState(() => ({ jkod: jkod }));
  updateSelectedTab = (value) => this.setState({ selectedTab: value });
  updateIncome = (newIncome) => this.setState(prevState => ({ newIncome: newIncome }));
  updateFamily = (family) => this.setState(prevState => ({ family: family }));
  setParam = (param) => this.setState(state => ({ params: { ...state.params, ...param } }));

  setDebug = (bool) => {
    if (bool) {
      this.sas.setDebugMode();
    } else {
      this.sas.unsetDebugMode();
    }

    this.props.debugChange(bool);
  }

  updateCustomer = (type, index, property, data) =>
    this.setState((state) => {
      let customer = Object.assign({}, state.customer);
      if (!customer[type][index]) {
        customer[type][index] = {};
      }
      customer[type][index][property] = data;
      return { customer: customer };
    });

  handleBenefitChange = (benefit) => {
    this.setState(prevState => {
      let newState = {};

      if (prevState.selectedBenefits.indexOf(benefit) > -1) {
        newState = {
          selectedBenefits: prevState.selectedBenefits.filter((element) => element !== benefit)
        };
      } else {
        newState = {
          selectedBenefits: [...prevState.selectedBenefits, benefit].sort()
        };
      }

      return newState;
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
          <h2 style={{ color: '#CEC7BA', paddingBottom: 25 }}> Egységes ügyfélkép </h2>
          <p style={{ fontSize: '11pt' }}>A jogosultsági történet alapján milyen elletások vehetők igénybe.</p>
        </div>
        <div className="request">
          <JkodInput jkod={this.state.jkod} onChange={this.jkodChange} onClick={this.jkodClick} />
          {
            this.state.isCustomerLoaded &&
            <Fragment>
              <CustomerData
                selectedTab={this.state.selectedTab}
                customer={this.state.customer}
                newIncome={this.state.newIncome}
                family={this.state.family}
                results={this.state.results}
                params={this.state.params}
                updateCustomer={this.updateCustomer}
                updateSelectedTab={this.updateSelectedTab}
                updateIncome={this.updateIncome}
                updateFamily={this.updateFamily}
                setParam={this.setParam} />
              <Benefits
                onChange={this.handleBenefitChange}
                benefits={this.state.benefits}
                selectedBenefits={this.state.selectedBenefits} />
            </Fragment>
          }
          {
            this.state.selectedBenefits.length > 0 &&
            <Fragment>
              {this.state.selectedBenefits.map((benefit) => (
                <BenefitParams
                  key={benefit}
                  benefit={benefit}
                  benefitParams={this.state.benefitParams.filter((param) => param.ELLATAS_CD === benefit)}
                  benefitDescription={this.state.benefits.filter((elem) => elem.ELLATAS_KOD === benefit)[0].ELLATAS_NEV}
                  params={this.state.params}
                  setParam={this.setParam} />
              ))}

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

export default CalculateBenefits;
