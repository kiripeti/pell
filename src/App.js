import React, { Component, Fragment } from 'react';
import CalculateBenefits from './components/CalculateBenefits';
import Settings from './components/Settings';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      menu: ['BENEFIT', 'SETTINGS'],
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

  content = () => {
    switch (this.state.selectedMenu) {
      case 'BENEFIT':
        return <CalculateBenefits />;
      
      case 'SETTINGS':
        return <Settings />
    
      default:
        break;
    }
  }

  render() {
    return (
      <Fragment>
        <header className="navbar navbar-expand-lg navbar-light bg-faded">
          <div className="container">
            <div className="collapse navbar-collapse" id="navbarSupportedContent" >
              <ul className="menu navbar-nav mr-auto" id="mainmenu" style={{ paddingTop: 2, paddingBottom: 2 }}>
                {
                  this.state.menu.map( code => 
                    <li key={code} className="nav-item item-210 deeper parent">
                      <a style={{ color: '#deb306' }}>
                        {this.state.menuDetailes[code].label}
                      </a>
                    </li>
                  )
                }
              </ul>
            </div>
          </div>
        </header>

        <div className="body">
          <div className="content">
            {this.content()}
          </div>
        </div>
      </Fragment>
    );
  }
}

export default App;
