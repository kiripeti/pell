import React, { Component, Fragment } from 'react';
import CalculateBenefits from './components/CalculateBenefits';
import Scenario from './components/Scenario/Scenario';
import Settings from './components/Settings';
import pkg from '../package.json'
import Sensitivity from './components/Sensitivity/Sensitivity';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      menu: ['BENEFIT', 'SCENARIO', 'SENSITIVITY', 'SETTINGS'],
      menuDetailes: {
        'BENEFIT': {
          label: 'Egységes ügyfélkép'
        },
        'SCENARIO': {
          label: 'Szcenárióelemzés'
        },
        'SENSITIVITY': {
          label: 'Keresztmetszeti vizsgálat'
        },
        'SETTINGS': {
          label: 'Beállítások'
        }
      },
      selectedMenu: 'BENEFIT',
      isDebug: true
    };

    this.version = pkg.version;
  }

  selectMenu = (code) => this.setState(() => ({
    selectedMenu: code
  }))

  debugChange = (bool) => this.setState(() => ({
    isDebug: bool
  }))

  content = (code) => {
    switch (code) {
      case 'BENEFIT':
        return <CalculateBenefits isDebug={this.state.isDebug} debugChange={this.debugChange} />;

      case 'SCENARIO':
        return <Scenario isDebug={this.state.isDebug} debugChange={this.debugChange} />;

      case 'SENSITIVITY':
        return <Sensitivity isDebug={this.state.isDebug} debugChange={this.debugChange} />;

      case 'SETTINGS':
        return <Settings isDebug={this.state.isDebug} debugChange={this.debugChange} />;

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
      <li key={code} className={className} style={{ cursor: 'pointer' }}>
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
                <li className="nav-item item-207" >
                  <span style={{ color: 'white' }} >
                    {'v' + this.version}
                  </span>
                </li>
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
