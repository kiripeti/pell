import React, { useState } from 'react';
import SettingsTab from './SettingsTab';
import SettingsContent from './SettingsContent';

const Settings = ({isDebug}) => {
  const [selectedTab, setSelectedTab] = useState('BENEFITS');

  const menuItems = {
    'BENEFITS': {
      label: 'Ellátások',
      description: 'Ellátások adatai'
    },
    'PARAMS': {
      label: 'Ügyfél inputok',
      description: 'Az ügyfél inputok testre szabása'
    }
  };

  return (
    <ul className="tabs" id="tab_container">
      <SettingsTab tabs={menuItems} selectedTab={selectedTab} selectTab={setSelectedTab} />
      <SettingsContent code={selectedTab} isDebug={isDebug} />
    </ul>
  );
}

export default Settings;