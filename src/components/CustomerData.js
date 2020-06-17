import React, {Component} from 'react';
import CustomerTabs from './CustomerTabs';
import CustomerContent from './CustomerContent';

class CustomerData extends Component {
  render(props) {
    return (
      <ul className="tabs" id="tab_container">
        <CustomerTabs
          selected={this.props.selectedTab}
          onClick={this.props.updateSelectedTab} />
        <CustomerContent
          selected={this.props.selectedTab}
          data={this.props.customer}
          newIncome={this.props.newIncome}
          updateIncome={this.props.updateIncome}
          family={this.props.family}
          updateFamily={this.props.updateFamily}
          results={this.props.results}
          updateCustomer={this.props.updateCustomer}
          setParam={this.props.setParam}
          params={this.props.params} />
      </ul>
    );
  }
}

export default CustomerData;
