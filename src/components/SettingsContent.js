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
      ['BENEFITS']: [],
      ['PARAMS']: []
    }

    this.sas = new SAS();
  }

  componentDidMount = () => {
    this.sas.call({
      program: 'getBenefits',
      preprocess: () => this.setState(() => ({
        isLoading: true
      })),
      success: (res) => this.setState({
        ['BENEFITS']: res.benefits.sort((b1, b2) => b1['ELLATAS_KOD'] < b2['ELLATAS_KOD'] ? -1 : 1),
        ['PARAMS']: res.benefitParams.sort((b1, b2) => b1['ORDER'] < b2['ORDER'] ? -1 : b1['ELLATAS_KOD'] < b2['ELLATAS_KOD'] ? -1 : 1)
      }),
      postprocess: () => this.setState(() => ({
        isLoading: false
      }))
    })
  }

  selectGroup = (group) => this.setState(() => ({
    selectedGroup: group
  }))

  selectBenefit = (benefit) => this.setState(() => ({
    selectedBenefit: benefit
  }))

  render() {
    if (this.state.isLoading) {
      return <Loading message="Betöltés" />
    }

    const headers = {
      ['BENEFITS']: [
        { name: 'ELLATAS_KOD', align: 'c', label: 'Ellátás kód' },
        { name: 'GROUP', align: 'c', label: 'Ellátás csoport' },
        { name: 'ELLATAS_NEV', align: 'c', label: 'Ellátás név' }
      ],

      ['PARAMS']: [
        { name: 'ELLATAS_CD', align: 'C', label: 'Ellátás kód' },
        { name: 'ORDER', align: 'C', label: 'Sorszám' },
        { name: 'NAME', align: 'C', label: 'Input név' },
        { name: 'TYPE', align: 'C', label: 'Input típus' },
        { name: 'LABEL', align: 'C', label: 'Input felirat' },
        { name: 'OPTIONS', align: 'C', label: 'Legördülő elemei' }
      ]
    }

    return (
      <Fragment>
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
                    options={this.state['BENEFITS'].map(benefit => benefit['GROUP']).filter((group, index, groups) => groups.indexOf(group) === index)} />
                </td>
                <td className="cell_spacer">
                </td>
                <td style={{ fontSize: '11pt', whiteSpace: 'nowrap' }}>
                  <Select
                    name="BENEFIT"
                    defaultOption={{ value: '', label: 'Minden ellátás' }}
                    onChange={this.selectBenefit}
                    value={this.state.selectedBenefit}
                    options={this.state['BENEFITS'].map(benefit => benefit['ELLATAS_KOD']).filter((code, index, codes) => codes.indexOf(code) === index)} />
                </td>
                <td style={{ width: '100%' }} align='right'>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div style={{ width: '80%', margin: '0 auto' }}>
          <Table header={headers[this.props.code]} data={this.state[this.props.code]} />
        </div>
      </Fragment>
    );
  }
}

export default SettingsContent;