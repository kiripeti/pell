import React from 'react';

const SettingsTab = ({ tabs, selectedTab, selectTab }) => {
  const defaultStyle = { borderLeft: 0, background: 'white' };
  const selectedStyle = { borderLeft: "10px solid #DEB306", background: "rgba(222,179,6,0.2)" };

  const menuItems = Object.keys(tabs).map((key) =>
    <li key={key} className="li_tab" onClick={() => selectTab(key)} style={{width:'33%'}}>
      <div className="fold">
        <h3 className="h3" style={selectedTab === key ? selectedStyle : defaultStyle}>{tabs[key].label}</h3>
        <p>{tabs[key].description}</p>
      </div>
    </li>
  );

  return (
    <ul className="tabs" id="tab_container">
      {menuItems}
    </ul>
  );
}

export default SettingsTab;