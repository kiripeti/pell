import React, { useState, Fragment } from 'react';
import SettingsTab from './SettingsTab';
import SettingsContent from './SettingsContent';

const Settings = (props) => {
  const [selectedTab, setSelectedTab] = useState('BENEFITS');

  const menuItems = {
    'BENEFITS': {
      label: 'Ellátások',
      description: 'Ellátások adatai'
    },
    'PARAMS': {
      label: 'Ügyfél inputok',
      description: 'Az ügyfél inputok testre szabása'
    },
    /*
    'OTHER': {
      label: 'Egyéb beállítások',
      description: ''
    }
    */
  };

  return (
    <Fragment>
      <div className="header">
        <h2 style={{ color: '#CEC7BA', paddingBottom: 25 }}> Beállítások </h2>
        <p style={{ fontSize: '11pt' }}>Az alkalmazás beállításai.</p>
      </div>
      <div className="request">
        <ul className="tabs" id="tab_container">
          <SettingsTab tabs={menuItems} selectedTab={selectedTab} selectTab={setSelectedTab} />
          <SettingsContent code={selectedTab} />
        </ul>
      </div>
    </Fragment>
  );
}

export default Settings;