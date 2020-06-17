import React, {Component, Fragment} from 'react';

class CustomerTabs extends Component {
  render(props) {
    const menuItemsDesciptor = {
      CUSTOMER: {
        label: 'Ügyfél',
        description: 'Az ügyfél alap- és egészségügyi adatok'
      },
      INCOME: {
        label: 'Jogviszony',
        description: 'Az ügyfél jogviszonyának adatai részletesen és éves bontásban'
      },
      BENEFIT: {
        label: 'Ellátások',
        description: 'Az ügyfél által igánybe vett ellátások'
      },
      FAMILY: {
        label: 'Családtagok',
        description: 'Az ügyfél családtagjai'
      },
      RESULT: {
        label: 'Eredmény',
        description: 'A lekérdezett ellátások eredményei'
      }
    };

    const defaultStyle  = {borderLeft: 0, background: 'white'};
    const selectedStyle = {borderLeft: "10px solid #DEB306", background: "rgba(222,179,6,0.2)"};

    const menuItems = Object.keys(menuItemsDesciptor).map((key) =>
      <li key={key} className="li_tab" onClick={() => this.props.onClick(key)}>
        <div className="fold">
          <h3 className="h3" style={this.props.selected === key ? selectedStyle : defaultStyle}>{menuItemsDesciptor[key].label}</h3>
          <p>{menuItemsDesciptor[key].description}</p>
        </div>
      </li>
    );

    return (
      <Fragment>
        {menuItems}
      </Fragment>
    );
  }
}

export default CustomerTabs;
