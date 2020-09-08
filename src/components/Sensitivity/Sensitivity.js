import React, { Component, Fragment } from 'react';

import Loading from '../Loading';
import Table from '../Table';
import utils, { SAS } from '../../js/utils';
import Select from '../FormElements/Select';
import Input from '../FormElements/Input';

class Sensitivity extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      loadingMessage: '',
      sensitivityStatus: [],
      showResult: false,
      selectedBenefit: ''
    };

    this.sas = new SAS();
  }

  getBenefits = () =>
    this.sas.call({
      program: 'getBenefits',
      isDebug: this.props.isDebug,
      preprocess: () => this.setState(() => ({
        isLoading: true,
        loadingMessage: 'Betöltés'
      })),
      success: (res) => {
        this.setState(() => ({
          benefits: res.benefits
        }));
      },
      postprocess: () => {
        this.setState(() => ({
          isLoading: false
        }));
      }
    });

  getSensitivityStatus = () =>
    this.sas.call({
      program: 'getSensitivityStatus',
      isDebug: this.props.isDebug,
      preprocess: () => this.setState(() => ({
        isLoading: true,
        loadingMessage: 'Betöltés'
      })),
      success: (res) => {
        this.setState(() => ({
          sensitivityStatus: utils.functionOnColumns(
            res.sensitivityStatus,
            ['START_DTTM', 'END_DTTM'],
            (sasDateTime) => sasDateTime ? utils.fromSasDateTime(sasDateTime).toLocaleString('hu-HU') : ''
          ).map(row => ({
            ...row,
            'SHOW': row['STATUS'] === 'FINISHED' ? <input type="button" className="button" style={{ marginLeft: 0 }} value=" Mutat " onClick={this.showResult(row['RUNID'])} /> : ''
          }))
        }));
        this.getBenefits();
      },
      postprocess: () => {
        this.setState(() => ({
          isLoading: false
        }));
      }
    });

  componentDidMount = () => this.getSensitivityStatus();

  showResult = (runID) =>
    () => this.sas.call({
      program: 'getSensitivityResult',
      isDebug: this.props.isDebug,
      tables: {
        sensitivity_id: [{ runid: runID }]
      },
      preprocess: () => this.setState(() => ({
        isLoading: true,
        loadingMessage: 'Betöltés'
      })),
      success: (res) => {
        this.setState(() => ({
          result: res,
          showResult: true,
          showNew: false
        }));

        setTimeout(
          () => window.scrollTo({
            top: 750,
            behavior: 'smooth'
          }),
          50
        );
      },
      postprocess: () => {
        this.setState(() => ({
          isLoading: false
        }));
      }
    });

  renderParams = (param) => {
    const origParam = this.state.result[param['PARAMETERTABLA'] + '_O'];
    const modParam = this.state.result[param['PARAMETERTABLA'] + '_M'];

    return (
      <Fragment key={param['PARAMETERTABLA']} >
        <div style={{ position: 'relative', top: 180, width: '80%', margin: 'auto', background: '#e1e1e1', border: '1px solid #d1d1d1', padding: 0, paddingTop: 8, paddingBottom: 0 }} >
          <div style={{ paddingLeft: 20, paddingBottom: 8, fontSize: 13, textTransform: 'uppercase' }} >
            {param['PARAMETERTABLA']} (eredeti)
          </div>
          <div style={{ background: '#fff', padding: 5, borderTop: '1px solid #d1d1d1', margin: '0px auto', horizontalAlign: 'center', overflow: 'auto' }} >
            <Table
              header={Object.keys(origParam[0]).reduce((header, key) => [...header, { name: key, align: 'C', label: key }], [])}
              data={origParam} />
          </div>
        </div>
        <div style={{ position: 'relative', top: 180, width: '80%', margin: 'auto', background: '#e1e1e1', border: '1px solid #d1d1d1', padding: 0, paddingTop: 8, paddingBottom: 0 }} >
          <div style={{ paddingLeft: 20, paddingBottom: 8, fontSize: 13, textTransform: 'uppercase' }} >
            {param['PARAMETERTABLA']} (módosított)
            </div>
          <div style={{ background: '#fff', padding: 5, borderTop: '1px solid #d1d1d1', margin: '0px auto', horizontalAlign: 'center', overflow: 'auto' }} >
            <Table
              header={Object.keys(modParam[0]).reduce((header, key) => [...header, { name: key, align: 'C', label: key }], [])}
              data={modParam} />
          </div>
        </div>
      </Fragment>
    );
  }

  renderParamsForCalculation = (param) => {
    const tableName = param['TABLA'];

    const paramTable = this.state.params[tableName].map((row, index) => 
      Object.keys(row).reduce((newRow, column) => ({
        ...newRow,
        [column]: <Input name={column}
                         value={this.state.params[tableName][index][column]}
                         className="cell_input"
                         onChange={value => this.setParam(tableName, index, column, value)} />
      }), {})
    );

    return (
      <Fragment key={tableName} >
        <div style={{ position: 'relative', top: 180, width: '80%', margin: 'auto', background: '#e1e1e1', border: '1px solid #d1d1d1', padding: 0, paddingTop: 8, paddingBottom: 0 }} >
          <div style={{ paddingLeft: 20, paddingBottom: 8, fontSize: 13, textTransform: 'uppercase' }} >
            {tableName}
          </div>
          <div style={{ background: '#fff', padding: 5, borderTop: '1px solid #d1d1d1', margin: '0px auto', horizontalAlign: 'center', overflow: 'auto' }} >
            <Table
              header={Object.keys(paramTable[0]).reduce((header, key) => [...header, { name: key, align: 'C', label: key }], [])}
              data={paramTable} />
          </div>
        </div>
      </Fragment>
    );
  }

  setParam = (tableName, index, property, data) =>
    this.setState((state) => {
      let params = Object.assign({}, state.params);
      params[tableName][index][property] = data;
      return { params: params };
    });
  
  newCalculation = () => {
    this.setState({
      showNew: true,
      showResult: false,
      selectedBenefit: ''
    });

    setTimeout(
      () => window.scrollTo({
        top: 300,
        behavior: 'smooth'
      }),
      50
    );
  }

  selectBenefit = (selectedBenefit) => {
    if (!selectedBenefit) return;

    this.sas.call({
      program: 'getParamTables',
      isDebug: this.props.isDebug,
      tables: {
        benefit: [{ benefit: selectedBenefit }]
      },
      preprocess: () => this.setState(() => ({
        isLoading: true,
        loadingMessage: 'Betöltés'
      })),
      success: (res) => {
        this.setState(() => ({
          selectedBenefit: selectedBenefit,
          params: res
        }));

        setTimeout(
          () => window.scrollTo({
            top: 750,
            behavior: 'smooth'
          }),
          50
        );
      },
      postprocess: () => {
        this.setState(() => ({
          isLoading: false
        }));
      }
    });
  }

  calculate = () => {
    const paramTables = this.state.params.param_tables.reduce((tables, paramTable) => ({
      ...tables,
      [paramTable['TABLA']]: this.state.params[paramTable['TABLA']]
    }), {});

    this.sas.call({
      program: 'calculateSensitivityAnalysis',
      isDebug: this.props.isDebug,
      tables: {
        benefit: [{ benefit: this.state.selectedBenefit }],
        ...paramTables
      },
      preprocess: () => this.setState(() => ({
        isLoading: true,
        loadingMessage: 'Betöltés'
      })),
      success: () => {},
      postprocess: () => {}
    });

    setTimeout(
      () => {
        this.setState({
          isLoading: false,
          showNew: false,
          showResult: false
        });
        this.getSensitivityStatus();
      },
      1000 + Math.random()*1000
    );
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
          <h2 style={{ color: '#CEC7BA', paddingBottom: 25 }}> Keresztmetszeti viszgálat </h2>
          <p style={{ fontSize: '11pt' }}>Jogszabályi paraméterek változásának hatása.</p>
        </div>
        <div className="request">
          <div style={{ width: '80%', margin: 'auto', background: '#e1e1e1', border: '1px solid #d1d1d1', padding: 0, paddingTop: 5, paddingBottom: 5 }}>
            <div style={{ paddingLeft: 20, fontSize: '10pt' }}>
              <input type="button" value=" Új számítás " onClick={this.newCalculation} className="button" />
            </div>
          </div>
          <ul className="tabs" id="tab_container">
            <li className="li_tab" style={{ width: '100%' }}>
              <div className="fold">
                <h3 className="h3" style={{ borderLeft: "10px solid #DEB306", background: "rgba(222,179,6,0.2)" }}>Futások</h3>
                <p>Rögzített vizsgálatok</p>
              </div>
            </li>
            <div className="more" style={{ height: 250, verticalAlign: 'top', textTransform: 'none' }}>
              <div style={{ width: '100%', height: '100%', top: 0, position: 'absolute', textAlign: 'center' }}>
                <div id="output" style={{ margin: '0px auto', width: '100%', height: '100%', textAlign: 'center', overflow: 'auto' }} >
                  <Table
                    header={[
                      { name: 'SHOW', align: 'C', label: '' },
                      { name: 'RUNID', align: 'C', label: 'Futás azonosító' },
                      { name: 'USER', align: 'C', label: 'Felhasználó' },
                      { name: 'START_DTTM', align: 'C', label: 'Futás kezdete' },
                      { name: 'END_DTTM', align: 'C', label: 'Futás vége' },
                      { name: 'STATUS', align: 'C', label: 'Státusz' },
                      { name: 'BENEFIT_NAME', align: 'C', label: 'Ellátás' }
                    ]}
                    data={this.state.sensitivityStatus} />
                </div>
              </div>
            </div>
          </ul>
          {
            this.state.showResult &&
            <Fragment>
              <div style={{ position: 'relative', top: 150, width: '80%', margin: 'auto', background: '#deb306', border: '1px solid #d1d1d1', padding: 0, paddingBottom: 0 }} >
                <div >
                  <div style={{ paddingLeft: 20, paddingBottom: 8, fontSize: 14, textTransform: 'uppercase', paddingTop: 10 }} >
                    Eredmények
                  </div>
                  <div style={{ background: '#fff', padding: 5, borderTop: '1px solid #d1d1d1', margin: '0px auto', horizontalAlign: 'center' }} >
                    <Table
                      header={[
                        { name: 'STATISTIC', align: 'C', label: 'Mutató' },
                        { name: 'ORIGINAL', align: 'C', label: 'Eredeti paraméterekkel' },
                        { name: 'MODIFIED', align: 'C', label: 'Módosított paraméterekkel' }
                      ]}
                      data={this.state.result.result} />
                  </div>
                </div>
              </div>
              <div style={{ position: 'relative', top: 180, width: '80%', margin: 'auto', background: '#deb306', border: '1px solid #d1d1d1', padding: 0, paddingBottom: 0 }} >
                <div >
                  <div style={{ paddingLeft: 20, paddingBottom: 8, fontSize: 14, textTransform: 'uppercase', paddingTop: 10 }} >
                    Paraméter táblák
                  </div>
                </div>
              </div>
              {
                this.state.result.params.map(this.renderParams)
              }
            </Fragment>
          }
          {
            this.state.showNew &&
            <Fragment>
              <div style={{ position: 'relative', top: 150, width: '80%', margin: 'auto', background: '#deb306', border: '1px solid #d1d1d1', padding: 0, paddingBottom: 0 }} >
                <div >
                  <div style={{ paddingLeft: 20, paddingBottom: 8, fontSize: 14, textTransform: 'uppercase', paddingTop: 10 }} >
                    Ellátás
                  </div>
                  <div style={{ background: '#fff', padding: 5, borderTop: '1px solid #d1d1d1', margin: '0px auto', horizontalAlign: 'center' }} >
                    <Select
                      name="benefit"
                      value={this.state.selectedBenefit}
                      onChange={this.selectBenefit}
                      options={
                        this.state.benefits.reduce((options, benefit) => ({
                          ...options,
                          [benefit['ELLATAS_KOD']]: benefit['ELLATAS_NEV']
                        }), {})
                      } />
                  </div>
                </div>
              </div>
              {
                this.state.selectedBenefit !== '' &&
                <Fragment>
                  <div style={{ position: 'relative', top: 180, width: '80%', margin: 'auto', background: '#deb306', border: '1px solid #d1d1d1', padding: 0, paddingBottom: 0 }} >
                    <div >
                      <div style={{ paddingLeft: 20, paddingBottom: 8, fontSize: 14, textTransform: 'uppercase', paddingTop: 10 }} >
                        Paraméter táblák
                      </div>
                    </div>
                  </div>
                  {
                    this.state.params.param_tables.map(this.renderParamsForCalculation)
                  }
                  <div id="bottom_container" style={{ position: 'relative', top: 180, width: '80%', margin: 'auto', background: '#e1e1e1', border: '1px solid #d1d1d1', padding: 0, paddingTop: 8, paddingBottom: 10, paddingLeft: 0 }} >
                    <input type="button" className="button" style={{ marginLeft: 0 }} value=" Számol " onClick={this.calculate} />
                  </div>
                </Fragment>
              }
            </Fragment>
          }
        </div>
      </Fragment>
    );
  }
}

export default Sensitivity;
