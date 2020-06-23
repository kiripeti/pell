import React, { Component } from 'react';
import { SAS } from '../js/utils';
import Loading from './Loading';
import Table from './Table';
import Select from './FormElements/Select';
import Input from './FormElements/Input'

class SettingsContent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      loadingMessage: '',
      'BENEFITS': [],
      'PARAMS': []
    }

    this.sas = new SAS();
  }

  componentDidMount = () => this.reload()

  reload = () => {
    this.sas.call({
      program: 'getBenefits',
      preprocess: () => this.setState(() => ({
        isLoading: true,
        loadingMessage: 'Betöltés'
      })),
      success: (res) => this.setState({
        'BENEFITS': res.benefits.sort((b1, b2) => b1['ELLATAS_KOD'] < b2['ELLATAS_KOD'] ? -1 : 1),
        'PARAMS': res.benefitParams.sort((b1, b2) => b1['ORDER'] < b2['ORDER'] ? -1 : b1['ELLATAS_KOD'] < b2['ELLATAS_KOD'] ? -1 : 1)
      }),
      postprocess: () => this.setState(() => ({
        isLoading: false
      }))
    });
  }

  save = () => {
    this.sas.call({
      program: 'setBenefits',
      tables: {
        'BENEFITS': this.state['BENEFITS'],
        'PARAMS': this.state['PARAMS']
      },
      preprocess: () => this.setState(() => ({
        isLoading: true,
        loadingMessage: 'Mentés'
      })),
      success: () => this.reload,
      postprocess: () => this.setState(() => ({
        isLoading: false
      }))
    });
  }

  selectGroup = (group) => this.setState(() => ({
    selectedGroup: group
  }))

  selectBenefit = (benefit) => this.setState(() => ({
    selectedBenefit: benefit
  }))

  filterData = (data) => data.filter((row) => {
    let keep = true;

    if (this.props.code === 'BENEFITS') {
      keep = this.state.selectedGroup == null || this.state.selectedGroup === '' || this.state.selectedGroup === row['GROUP'];
    } else {
      keep = this.state.selectedGroup == null || this.state.selectedGroup === '' || this.state.selectedGroup === this.state['BENEFITS'].find((benefit) => benefit['ELLATAS_KOD'] === row['ELLATAS_CD'])['GROUP']
    }

    return keep && (
      this.state.selectedBenefit == null || this.state.selectedBenefit === '' || this.state.selectedBenefit === row['ELLATAS_CD'] || this.state.selectedBenefit === row['ELLATAS_KOD']
    );
  });

  getGroupsForSelect = () => {
    return this.state['BENEFITS']
      .sort((b1, b2) => b1['GROUP'] < b2['GROUP'] ? -1 : 1)
      .reduce((groupObject, benefit) => ({
        ...groupObject,
        ...{ [benefit['GROUP']]: benefit['GROUP'] }
      }), {})
  }

  getBenefitsForSelect = () => {
    return this.state['BENEFITS']
      .filter(benefit => this.state.selectedGroup == null || this.state.selectedGroup === '' || this.state.selectedGroup === benefit['GROUP'])
      .sort((b1, b2) => b1['ELLATAS_NEV'] < b2['ELLATAS_NEV'] ? -1 : 1)
      .reduce((benefitObject, benefit) => ({
        ...benefitObject,
        ...{ [benefit['ELLATAS_KOD']]: benefit['ELLATAS_NEV'] }
      }), {})
  }

  prepareCell = (row, column) => {
    switch (column) {
      case 'ELLATAS_KOD':
      case 'ELLATAS_CD':
      case 'NAME':
        return row[column];


      case 'GROUP':
      case 'ELLATAS_NEV':
      case 'LABEL':
      case 'OPTIONS':
        return (
          <Input
            type="C"
            value={row[column]} />
        );


      case 'ORDER':
        return (
          <Input
            type="N"
            value={row[column]} />
        );
      
      case 'TYPE':
        return (
          <Select
            name="TYPE"
            defaultOption={{ value: 'N', label: 'Numerikus' }}
            value={row[column]}
            options={{'C': 'Karakteres', 'D': 'Dátum', 'S': 'Legördülő'}} />
        );
    }
  }

  prepareRow = (row) => Object.keys(row).reduce((newRow, column) => ({
    ...newRow,
    ...{ [column]: this.prepareCell(row, column) }
  }), {})

  prepareData = () => {
    this.filterData(this.state[this.props.code]).map(this.prepareRow);
  }

  headers = {
    'BENEFITS': [
      { name: 'ELLATAS_KOD', align: 'c', label: 'Ellátás kód' },
      { name: 'GROUP', align: 'c', label: 'Ellátás csoport' },
      { name: 'ELLATAS_NEV', align: 'c', label: 'Ellátás név' }
    ],

    'PARAMS': [
      { name: 'ELLATAS_CD', align: 'C', label: 'Ellátás kód' },
      { name: 'ORDER', align: 'C', label: 'Sorszám' },
      { name: 'NAME', align: 'C', label: 'Input név' },
      { name: 'TYPE', align: 'C', label: 'Input típus' },
      { name: 'LABEL', align: 'C', label: 'Input felirat' },
      { name: 'OPTIONS', align: 'C', label: 'Legördülő elemei' }
    ]
  }

  render() {
    if (this.state.isLoading) {
      return <Loading message={this.state.loadingMessage} />
    }

    return (
      <div className="more" style={{ height: 500, verticalAlign: 'top', textTransform: 'none' }}>
        <div id="t2_content" style={{ width: '100%', height: '100%', top: 0, position: 'absolute', textAlign: 'left' }}>
          <div style={{ padding: 0, fontSize: '15pt', background: '#ece3c0', marginTop: 2, width: "100%" }}>
            <table width="100%" border="0" cellSpacing="5" cellPadding="5">
              <tbody>
                <tr style={{ height: 45 }}>
                  <td style={{ fontSize: '11pt', whiteSpace: 'nowrap' }}>
                    <Select
                      name="GROUP"
                      defaultOption={{ value: '', label: 'Minden csoport' }}
                      onChange={this.selectGroup}
                      value={this.state.selectedGroup}
                      options={this.getGroupsForSelect()} />
                  </td>
                  <td className="cell_spacer">
                  </td>
                  {

                  }
                  <td style={{ fontSize: '11pt', whiteSpace: 'nowrap' }}>
                    <Select
                      name="BENEFIT"
                      defaultOption={{ value: '', label: 'Minden ellátás' }}
                      onChange={this.selectBenefit}
                      value={this.state.selectedBenefit}
                      options={this.getBenefitsForSelect()} />
                  </td>
                  <td>{JSON.stringify({ selectedBenefit: this.state.selectedBenefit, selectedGroup: this.state.selectedGroup })}</td>
                  <td style={{ width: '100%' }} align='right'>
                    <div id="btns" style={{ paddingRight: 10, paddingBottom: 5 }}>
                      <input type="button" className="button" value=" Mentés " id="newRowBtn" onClick={this.save} />
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div id="data2_container" style={{ margin: '0px auto', width: '100%', bottom: 0, top: 40, position: 'absolute', textAlign: 'left', overflow: 'auto' }} >
            <div style={{ height: '100%', padding: 0 }} >
              <div id="data2" style={{ margin: '0px auto', height: '100%', position: 'relative', width: '100%', textAlign: 'center', overflow: 'auto', display: 'block' }} >
                <Table header={this.headers[this.props.code]} data={this.prepareData()} />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default SettingsContent;