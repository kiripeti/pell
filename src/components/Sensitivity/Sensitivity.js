import React, { Component, Fragment } from 'react';

import Loading from '../Loading';
import Table from '../Table';
import utils, { SAS } from '../../js/utils';

class Sensitivity extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      loadingMessage: '',
      sensitivityStatus: [],
      showResult: false
    };

    this.sas = new SAS();
  }

  componentDidMount = () =>
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
            (sasDateTime) => utils.fromSasDateTime(sasDateTime).toLocaleString('hu-HU')
          ).map(row => ({
            ...row,
            'SHOW': row['STATUS'] === 'FINISHED' ? <input type="button" className="button" style={{ marginLeft: 0 }} value=" Mutat " onClick={this.showResult(row['RUNID'])} /> : ''
          }))
        }));
      },
      postprocess: () => {
        this.setState(() => ({
          isLoading: false
        }));
      }
    });

  showResult = (runID) =>
    () => this.sas.call({
      program: 'getSensitivityResult',
      isDebug: this.props.isDebug,
      preprocess: () => this.setState(() => ({
        isLoading: true,
        loadingMessage: 'Betöltés'
      })),
      success: (res) => {
        this.setState(() => ({
          result: res,
          showResult: true
        }));
      },
      postprocess: () => {
        this.setState(() => ({
          isLoading: false
        }));
      }
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
          <h2 style={{ color: '#CEC7BA', paddingBottom: 25 }}> Keresztmetszeti viszgálat </h2>
          <p style={{ fontSize: '11pt' }}>Jogszabályi paraméterek változásának hatása.</p>
        </div>
        <div className="request">
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
                      { name: 'SHOW',         align: 'C', label: '' },
                      { name: 'RUNID',        align: 'C', label: 'Futás azonosító' },
                      { name: 'USER',         align: 'C', label: 'Felhasználó' },
                      { name: 'START_DTTM',   align: 'C', label: 'Futás kezdete' },
                      { name: 'END_DTTM',     align: 'C', label: 'Futás vége' },
                      { name: 'STATUS',       align: 'C', label: 'Státusz' },
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
                        { name: 'ORIGINAL',  align: 'C', label: 'Eredeti paraméterekkel' },
                        { name: 'MODIFIED',  align: 'C', label: 'Módosított paraméterekkel' }
                      ]}
                      data={this.state.result.result} />
                  </div>
                </div>
              </div>
            </Fragment>
          }
        </div>
      </Fragment>
    );
  }
}

export default Sensitivity;
