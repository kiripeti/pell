import React, { Component, Fragment } from 'react';
import { SAS } from '../js/utils';
import Loading from './Loading';
import Table from './Table';
import Select from './FormElements/Select';

class SettingsContent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      loadingMessage: '',
      ['BENEFITS']: [],
      ['PARAMS']: []
    }

    this.sas = new SAS();
  }

  componentDidMount = () => this.reload()

  reload = () => {
    this.sas.call({
      program: 'getBenefits',
      tables: {
        ['BENEFITS']: this.state['BENEFITS'],
        ['PARAMS']: this.state['PARAMS']
      },
      preprocess: () => this.setState(() => ({
        isLoading: true,
        loadingMessage: 'Betöltés'
      })),
      success: (res) => this.setState({
        ['BENEFITS']: res.benefits.sort((b1, b2) => b1['ELLATAS_KOD'] < b2['ELLATAS_KOD'] ? -1 : 1),
        ['PARAMS']: res.benefitParams.sort((b1, b2) => b1['ORDER'] < b2['ORDER'] ? -1 : b1['ELLATAS_KOD'] < b2['ELLATAS_KOD'] ? -1 : 1)
      }),
      postprocess: () => this.setState(() => ({
        isLoading: false
      }))
    });
  }

  save = () => {
    this.sas.call({
      program: 'setBenefits',
      preprocess: () => this.setState(() => ({
        isLoading: true,
        loadingMessage: 'Mentés'
      })),
      success: () => this.reload
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
      keep = this.state.selectedGroup == null || this.state.selectedGroup === row['GROUP'];
    } else {
      keep = this.state.selectedGroup == null || this.state.selectedGroup === this.state['BENEFITS'].find((benefit) => benefit['ELLATAS_KOD'] === row['ELLATAS_CD'])['GROUP']
    }

    return keep && (
      this.state.selectedBenefit == null || this.state.selectedBenefit === row['ELLATAS_CD'] || this.state.selectedBenefit === row['ELLATAS_KOD']
    );
  });

  getGroupsForSelect = () => {
    return this.state['BENEFITS']
      .sort((b1, b2) => b1['GROUP'] < b2['GROUP'] ? -1 : 1)
      .reduce( (groupObject, benefit) => ({
        ...groupObject,
        ...{[benefit['GROUP']]: benefit['GROUP']}
      }), {})
  }

  getBenefitsForSelect = () => {
    return this.state['BENEFITS']
      .sort((b1, b2) => b1['ELLATAS_NEV'] < b2['ELLATAS_NEV'] ? -1 : 1)
      .reduce( (benefitObject, benefit) => ({
        ...benefitObject,
        ...{[benefit['ELLATAS_KOD']]: benefit['ELLATAS_NEV']}
      }), {})
  }

  render() {
    if (this.state.isLoading) {
      return <Loading message={this.state.loadingMessage} />
    }

    const headers = {
      ['BENEFITS']: [
        { name: 'ELLATAS_KOD', align: 'c', label: 'Ellátás kód' },
        { name: 'GROUP',       align: 'c', label: 'Ellátás csoport' },
        { name: 'ELLATAS_NEV', align: 'c', label: 'Ellátás név' }
      ],

      ['PARAMS']: [
        { name: 'ELLATAS_CD',  align: 'C', label: 'Ellátás kód' },
        { name: 'ORDER',       align: 'C', label: 'Sorszám' },
        { name: 'NAME',        align: 'C', label: 'Input név' },
        { name: 'TYPE',        align: 'C', label: 'Input típus' },
        { name: 'LABEL',       align: 'C', label: 'Input felirat' },
        { name: 'OPTIONS',     align: 'C', label: 'Legördülő elemei' }
      ]
    }

    return (
      <div className="more" style={{height:250, verticalAlign:'top', textTransform:'none'}}>
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
                <td style={{ fontSize: '11pt', whiteSpace: 'nowrap' }}>
                  <Select
                    name="BENEFIT"
                    defaultOption={{ value: '', label: 'Minden ellátás' }}
                    onChange={this.selectBenefit}
                    value={this.state.selectedBenefit}
                    options={this.getBenefitsForSelect()} />
                </td>
                <td style={{ width: '100%' }} align='right'>
                  <div id="btns" style={{ paddingRight: 10, paddingBottom: 5 }}>
                    <input type="button" className="button" value=" Mentés " id="newRowBtn" onClick={this.save} />
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div style={{ width: '80%', margin: '0 auto' }}>
          <Table header={headers[this.props.code]} data={this.filterData(this.state[this.props.code])} />
        </div>
      </div>
    );
  }
}

export default SettingsContent;