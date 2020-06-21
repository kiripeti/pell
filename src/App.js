import React, { Component, Fragment } from 'react';
import CalculateBenefits from './components/CalculateBenefits';
import Settings from './components/Settings';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      menu: ['BENEFIT'],
      menuDetailes: {
        'BENEFIT': {
          label: 'Egységes ügyfélkép'
        },
        'SETTINGS': {
          label: 'Beállítások'
        }
      },
      selectedMenu: 'BENEFIT'
    };
  }

  selectMenu = (code) => this.setState(() => ({
    selectedMenu: code
  }))

  content = (code) => {
    switch (code) {
      case 'BENEFIT':
        return <CalculateBenefits />;

      case 'SETTINGS':
        return <Settings />

      default:
        return null;
    }
  }

  renderMenuItem = (code) => {
    const className = code === this.state.selectedMenu
      ? 'nav-item item-210 deeper parent'
      : 'nav-item item-207';

    const style = code === this.state.selectedMenu
      ? { color: '#deb306' }
      : {};

    const linkClass = code === this.state.selectedMenu
      ? ''
      : 'nav-link';

    return (
      <li key={code} className={className}>
        <a style={style} className={linkClass} name={code} onClick={() => this.selectMenu(code)}>
          {this.state.menuDetailes[code].label}
        </a>
      </li>
    );
  }

  render() {
    return (
      <Fragment>
        <header className="navbar navbar-expand-lg navbar-light bg-faded">
          <div className="container">
            <div className="collapse navbar-collapse" id="navbarSupportedContent" >
              <ul className="menu navbar-nav mr-auto" id="mainmenu" style={{ paddingTop: 2, paddingBottom: 2 }}>
                {this.state.menu.map(this.renderMenuItem)}
              </ul>
            </div>
          </div>
        </header>

        <div className="body">
          <div className="content">
            {this.content(this.state.selectedMenu)}
          </div>
        </div>
      </Fragment>
    );
  }
}

export default App;
