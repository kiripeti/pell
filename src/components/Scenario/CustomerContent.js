import React, { Component } from 'react';
import CustomerBase from './CustomerBase';
import CustomerIncome from './CustomerIncome';
import CustomerFamily from './CustomerFamily';

class CustomerContent extends Component {
  render() {
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
      case 'FAMILY':
        content = (
          <CustomerFamily
            family={this.props.family}
            updateFamily={this.props.updateFamily} />
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
