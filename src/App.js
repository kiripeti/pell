import React, { Component, Fragment } from 'react';
import h54s from 'h54s';

import JkodInput from './components/JkodInput';
import Login from './components/Login';
import Loading from './components/Loading';
import CustomerData from './components/CustomerData';
import Benefits from './components/Benefits';
import BenefitParams from './components/BenefitParams';
import DatePicker from './components/FormElements/DatePicker';
import utils from './js/utils';

import customer_data from './test_data/ugyfel_adat';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLogedIn: false,
      isLoading: false,
      loadingMessage: '',
      isCustomerLoaded: false,
      jkod: '',
      selectedJkod: '',
      customer: {
        ALAP_ADATOK: [],
        EU_ADATOK: [],
        EV_ELEMZES: [],
        JOGVISZONY: [],
        ALLSTAT: []
      },
      params: {
        LEKERDEZES_DT: new Date()
      },
      selectedBenefits: [],
      benefits: [
        { name: 'ESZJ', label: 'Egészségügyi szolgáltatásra való jogosultság', group: 'Egészségügyi ellátás' },
        { name: 'GYET', label: 'Gyermeknevelési támogatás', group: 'Egészségügyi ellátás' },
        { name: 'NFA', label: 'Nagycsaládosok földgáz árkedvezménye', group: 'Családtámogatás' },
      ].sort((e1, e2) => e1.group < e2.group ? -1 : (e1.label < e2.label ? -1 : 1)),
      benefitParams: [
        { order: 12, ellatas_cd: 'AD', name: 'TB_FLG', type: 'N', length: 8, format: '', label: 'Az állandó és tartós ápolásra, gondozásra szoruló ápolt tartósan beteg flag' },
        { order: 11, ellatas_cd: 'AD', name: 'EGYEB_APOLT_FLG', type: 'N', length: 8, format: '', label: 'Van-e egyéb ápoltja az igénylőnek flag' },
        { order: 10, ellatas_cd: 'AD', name: 'CSP_MAGASABB_FLG', type: 'N', length: 8, format: '', label: 'Magasabb összegű családi pótlékra jogosultat nevel flag' },
        { order: 9, ellatas_cd: 'AD', name: 'BETEG_SZUL_DT', type: 'N', length: 8, format: '', label: 'A beteg születési dátuma' },
        { order: 8, ellatas_cd: 'AD', name: 'SF_NEVEL', type: 'N', length: 8, format: '', label: 'Súlyosan fogyatékos gyermeket nevel flag' },
        { order: 7, ellatas_cd: 'AD', name: 'KAPCSOLAT_FLG', type: 'N', length: 8, format: '', label: 'Az ápolthoz olyan kapcsolat fűzi, amivel jogosult az igénylésre (testvér, egyenesági rokon, nevelőszülő, amennyiben az igénylés előtti 10 évben minimum 3 évig gondozza) flag' },
        { order: 6, ellatas_cd: 'AD', name: 'SF_FLG', type: 'N', length: 8, format: '', label: 'Az állandó és tartós ápoásra, gondozásra szoruló ápolt súlyosan fogyatékos flag' },
        { order: 5, ellatas_cd: 'AD', name: 'EGYEB_APOLO_FLG', type: 'N', length: 8, format: '', label: 'Van-e egyéb ápoló az adott beteghez flag' },
        { order: 4, ellatas_cd: 'AD', name: 'MMTV_CAT', type: 'C', length: 8, format: '', label: 'Az MMTV szerinti kategóriája "E", önellátásra képtelen' },
        { order: 3, ellatas_cd: 'AD', name: 'DONTES_KIIR', type: 'N', length: 8, format: '', label: 'A jogosultsági döntést kiírjuk e vagy sem' },
        { order: 2, ellatas_cd: 'AD', name: 'LEKERDEZES_DT', type: 'D', length: 8, format: 'YYMMDDP10.', label: 'A lekérdezés dátuma' },
        { order: 1, ellatas_cd: 'AD', name: 'UFAZONOSITO', type: 'C', length: 32, format: '', label: 'Ügyfélazonosító kód (JKOD)' },
        { order: 0, ellatas_cd: 'AD', name: 'TST1', type: 'S', length: 32, format: '', label: 'Ez a legördülő jó', options: '0:Apa;1:Anya' },
        { order: 0, ellatas_cd: 'AD', name: 'TST2', type: 'S', length: 32, format: '', label: 'Ez meg nem', options: '' },
      ].sort((p1, p2) => p1.order - p2.order),
      selectedTab: 'CUSTOMER',
      newIncome: [],
      family: [],
      results: [],
      brm_inputs: {}
    };

    this.sas = new h54s({ metadataRoot: '/PELL/Stored Processes/' });
  }

  login = (user, pw) => {
    if (!user || !pw) return;

    this.setState(() => ({ isLoading: true, loadingMessage: 'Bejelentkezés' }));

    this.sas.login(user, pw, (status) => {
      let newState = {
        isLoading: false
      };

      if (status === -1) {
        //Wrong username or password
        newState.loginMessage = 'Hibás felhasználónév vagy jelszó';
        this.setState(() => newState);
      } else if (status === -2) {
        //Login is not working
        newState.loginMessage = 'Bejelentkezés nem lehetséges';
        this.setState(() => newState);
      } else if (status === 200) {
        this.call({
          program: 'getBenefits',
          loadingMessage: 'Adatok letöltése'
        },
          (res) => this.setState(() => ({
            isLogedIn: true,
            loginMessage: '',
            benefits: res.benefits,
            benefitParams: res.benefitParams
          }))
        );
      } else {
        //ajax call failed
        //status is value of http request status code
        newState.loginMessage = 'A szerver nem elérhető';
        this.setState(() => newState);
      }
    });
  }

  call = ({ program, loadingMessage, tables }, callback) => {
    this.setState(() => ({
      isLoading: true,
      loadingMessage: loadingMessage ? loadingMessage : 'Kérem várjon'
    }));

    let sasData = null;

    if (tables && Object.keys(tables).length > 0) {
      const tableNames = Object.keys(tables);
      sasData = new h54s.SasData(tables[tableNames[0]], tableNames[0]);

      for (let i = 1; i < tableNames.length; i++) {
        const tableName = tableNames[i];
        sasData.addTable(tables[tableName], tableName);
      }
    }

    this.sas.call(program, sasData, (err, res) => {
      this.setState(() => ({
        isLoading: false,
        loadingMessage: ''
      }));
      if (err) {
        console.log(err);
        alert('Hiba lépett fel a feldolgozás során!');
      } else {
        callback(res);
      }
    });
  }

  /*
  call({program, tableName, table, cb}) {
    this.setState( () => ({isLoading: true}) );

    const sasData = new h54s.SasData(table, tableName);

    this.sas.call(program, sasData, (err, res) => {
      this.setState( () => ({isLoading: false}));
      if (err) {
        console.log(err);
        alert('Hiba lépett fel a feldolgozás során!');
      } else {
        cb(res);
      }
    });
  }
  */

  jkodClick = (jkod) => {
    this.setState(() => ({ jkod: jkod }));
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
            JOGVISZONY: utils.dttmFromSAS2JS(res.jogviszony, ['KEZDESDATUM', 'VEGEDATUM']),
            ALLSTAT: res.allstat
          },
          params: { ...prevState.params, ...{ UFAZONOSITO: prevState.jkod } }
        }));
      }
    );
  }

  /*
    jkodClick = () => {
      this.setState(() => ({ isLoading: true }));
      const jkod = this.state.jkod;
      customer_data.ALAP_ADATOK = utils.dtFromSAS2JS(customer_data.ALAP_ADATOK, ['SZUL_DT']);
  
      customer_data.JOGVISZONY = customer_data.JOGVISZONY.map(row => ({
        ...row,
        ...{
          KEZDESDATUM: 494380800,
          VEGEDATUM: 504835200
        }
      }));
  
      customer_data.JOGVISZONY = utils.dttmFromSAS2JS(customer_data.JOGVISZONY, ['KEZDESDATUM', 'VEGEDATUM'])
  
      this.setState(prevState => ({
        isLoading: false,
        isCustomerLoaded: true,
        selectedJkod: jkod,
        customer: customer_data,
        params: { ...prevState.params, ...{ UFAZONOSITO: jkod, jkod: jkod } }
      }));
    }
  */

  updateCustomer = (type, index, property, data) =>
    this.setState((state) => {
      let customer = Object.assign({}, state.customer);
      if (!customer[type][index]) {
        customer[type][index] = {};
      }
      customer[type][index][property] = data;
      return { customer: customer };
    });

  jkodChange = (jkod) => this.setState(() => ({ jkod: jkod }));
  updateSelectedTab = (value) => this.setState({ selectedTab: value });
  updateIncome = (newIncome) => this.setState(prevState => ({ newIncome: newIncome }));
  updateFamily = (family) => this.setState(prevState => ({ family: family }));
  setParam = (param) => this.setState(state => ({ params: { ...state.params, ...param } }));

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

  calculate = () => {
    this.call({
      program: 'calculateBenefits',
      loadingMessage: 'Ellátások számítása',
      tables: {
        params: [this.state.params],
        alap_adatok: this.state.customer.ALAP_ADATOK,
        eu_adatok: this.state.customer.EU_ADATOK,
        new_income: this.state.newIncome,
        family: this.state.family,
        benefits: this.state.selectedBenefits.map((benefit) => ({ benefit: benefit }))
      }
    },
      (res) => {
        let brm_inputs = {};
        this.state.selectedBenefits.forEach((benefit) => {
          if (res['brm_input_' + benefit]) {
            brm_inputs[benefit] = res['brm_input_' + benefit];
          }
        });

        window.scrollTo(0, 0);
        this.setState({
          selectedTab: 'RESULT',
          results: res.results,
          brm_inputs: brm_inputs
        });
      }
    );
  }

  render() {
    if (this.state.isLoading) {
      return (
        <Loading message={this.state.loadingMessage} />
      );
    }

    if (!this.state.isLogedIn) {
      return (
        <div className="body">
          <div className="content">
            <div className="header">
              <h2 style={{ color: '#CEC7BA', paddingBottom: 25 }}> Nincs bejelentkezve </h2>
              <p style={{ fontSize: '11pt' }}>Adja meg felhasználónevét és jelszavát, majd kattintson a 'Bejelentkezés' gombra.</p>
              {
                this.state.loginMessage &&
                <p>{this.state.loginMessage}</p>
              }
            </div>
            <div className="request">
              <div style={{ width: '80%', margin: 'auto', background: '#e1e1e1', border: '1px solid #d1d1d1', padding: 0, paddingTop: 5, paddingBottom: 5 }}>
                <Login login={this.login} />
              </div>
            </div>
          </div>
        </div>
      );
    }

    return (
      <Fragment>
        <header className="navbar navbar-expand-lg navbar-light bg-faded">
          <div className="container">
            <div className="collapse navbar-collapse" id="navbarSupportedContent" >
              <ul className="menu navbar-nav mr-auto" id="mainmenu" style={{ paddingTop: 2, paddingBottom: 2 }}>
                <li className="nav-item item-210 deeper parent">
                  <a style={{ color: '#deb306' }}>Egységes ügyfélkép</a>
                </li>
                <li className="nav-item item-207">
                  <a className="nav-link" href="/" >Szcenárió elemzés</a>
                </li>
                <li className="nav-item item-207">
                  <a className="nav-link" href="/" >Keresztmetszet vizsgálat</a>
                </li>
              </ul>
            </div>
          </div>
        </header>

        <div className="body">
          <div className="content">
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
                  {this.state.selectedBenefits.map((benefit) => (<BenefitParams
                    key={benefit}
                    benefit={benefit}
                    benefitParams={this.state.benefitParams}
                    benefitDescription={this.state.benefits[benefit]}
                    params={this.state.params}
                    setParam={this.setParam} />))}

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
          </div>
        </div>
      </Fragment>
    );
  }
}

export default App;
