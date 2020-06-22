import React, { useState } from 'react';
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
    <ul className="tabs" id="tab_container">
      <SettingsTab tabs={menuItems} selectedTab={selectedTab} selectTab={setSelectedTab} />
      <SettingsContent code={selectedTab} />
    </ul>
  );
}

export default Settings;