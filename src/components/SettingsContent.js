import React, { Component } from 'react';
import { SAS } from '../js/utils';
import Loading from './Loading';
import Table from './Table';

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
        ['BENEFITS']: res.benefits.sort( (b1, b2) => b1['ELLATAS_KOD'] < b2['ELLATAS_KOD'] ? -1 :  1),
        ['PARAMS']: res.benefitParams.sort( (b1, b2) => b1['ELLATAS_KOD'] < b2['ELLATAS_KOD'] ? -1 :  b1.ORDER - b2.ORDER )
      }),
      postprocess: () => this.setState(() => ({
        isLoading: false
      }))
    })
  }

  render() {
    if (this.state.isLoading) {
      return <Loading message="Betöltés" />
    }

    const headers = {
      ['BENEFITS']: [
        {name: 'ELLATAS_KOD', align: 'c', label: 'Ellátás kód'},
        {name: 'GROUP',       align: 'c', label: 'Ellátás csoport'},
        {name: 'ELLATAS_NEV', align: 'c', label: 'Ellátás név'}
      ],

      ['PARAMS']:[
        {name: 'ELLATAS_CD',  align: 'C', label: 'Ellátás kód'},
        {name: 'ORDER',       align: 'C', label: 'Sorszám'},
        {name: 'NAME',        align: 'C', label: 'Input név'},
        {name: 'TYPE',        align: 'C', label: 'Input típus'},
        {name: 'LABEL',       align: 'C', label: 'Input felirat'},
        {name: 'OPTIONS',     align: 'C', label: 'Legördülő elemei'}
      ]
    }

    return (
      <div style={{width:'80%', margin:'0 auto'}}>
        <Table header={headers[this.props.code]} data={this.state[this.props.code]} />
      </div>
    );
  }
}

export default SettingsContent;