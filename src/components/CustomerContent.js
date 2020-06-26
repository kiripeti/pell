import React, { Component } from 'react';
import CustomerBase from './CustomerBase';
import CustomerIncome from './CustomerIncome';
import CustomerBenefits from './CustomerBenefits';
import CustomerFamily from './CustomerFamily';
import Results from './Results';

class CustomerContent extends Component {
  render(props) {
    let content = null;

    switch (this.props.selected) {
      case 'CUSTOMER':
        const alap = this.props.data.ALAP_ADATOK[0] ? this.props.data.ALAP_ADATOK[0] : {};
        const eu = this.props.data.EU_ADATOK[0] ? this.props.data.EU_ADATOK[0] : {};
        content = (
          <CustomerBase
            base={alap}
            eu={eu}
            updateCustomer={this.props.updateCustomer}
            setParam={this.props.setParam}
            params={this.props.params} />
        );
        break;
      case 'INCOME':
        content = (
          <CustomerIncome
            yearly={this.props.data.EV_ELEMZES}
            detailed={this.props.data.JOGVISZONY}
            new={this.props.newIncome}
            updateIncome={this.props.updateIncome} />
        );
        break;
      case 'BENEFIT':
        content = (
          <CustomerBenefits
            benefits={this.props.data.ALLSTAT} />
        );
        break;
      case 'FAMILY':
        content = (
          <CustomerFamily
            family={this.props.family}
            updateFamily={this.props.updateFamily} />
        );
        break;
      case 'RESULT':
        content = (
          <Results
            results={this.props.results} />
        );
        break;
      default:
        content = null;
    }

    return (
      <div className="more" style={{ height: 400, verticalAlign: 'top', textTransform: 'none' }}>
        {content}
      </div>
    );
  }
}

export default CustomerContent;
