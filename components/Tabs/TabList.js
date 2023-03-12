import React, { useState } from "react";
import LandTab from "./LandTab/LandTab";
import MainTab from "./MainTab/MainTab";
import TroopsTab from "./TroopsTab/TroopsTab";

const TabList = (props) => {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
  };

  return (
    <div className="container">
      <ul className="nav nav-tabs">
        <li className="nav-item">
          <a
            className={`nav-link ${activeTab === 0 ? "active" : ""}`}
            onClick={() => handleTabClick(0)}
          >
            Main
          </a>
        </li>
        <li className="nav-item">
          <a
            className={`nav-link ${activeTab === 1 ? "active" : ""}`}
            onClick={() => handleTabClick(1)}
          >
            Land
          </a>
        </li>
        <li className="nav-item">
          <a
            className={`nav-link ${activeTab === 2 ? "active" : ""}`}
            onClick={() => handleTabClick(2)}
          >
            Troops
          </a>
        </li>
      </ul>

      <div>
        {activeTab == 0 ? (
          <MainTab
            gameContract={props.gameContract}
            samuraiContract={props.samuraiContract}
            playerAddress={props.playerAddress}
            player={props.player}
          />
        ) : activeTab == 1 ? (
          <LandTab
            gameContract={props.gameContract}
            playerAddress={props.playerAddress}
          />
        ) : activeTab == 2 ? (
          <TroopsTab
            gameContract={props.gameContract}
            samuraiContract={props.samuraiContract}
          />
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default TabList;
