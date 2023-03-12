import React, { useEffect, useState } from "react";
import styles from "../styles/MapController.module.css";
import { useSelector } from "react-redux";

const MapController = (props) => {
  const gameContract = props.gameContract;

  const playerLocation = props.playerLocation;

  const lands = useSelector((state) => state.lands);

  const move = async () => {
    try {
      if (playerLocation - lands.land.id == 1) {
        const txn = await gameContract.changeLocation(1);
        await txn.wait();
        props.viewPlayer();
      } else if (playerLocation - lands.land.id == -1) {
        const txn = await gameContract.changeLocation(3);
        await txn.wait();
        props.viewPlayer();
      } else if (playerLocation - lands.land.id == 11) {
        const txn = await gameContract.changeLocation(2);
        await txn.wait();
        props.viewPlayer();
      } else if (playerLocation - lands.land.id == -11) {
        const txn = await gameContract.changeLocation(4);
        await txn.wait();
        props.viewPlayer();
      } else {
        console.log("invalid direction");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const teleport = async () => {
    console.log("teleport");
  };

  const collectTax = async () => {
    try {
      await gameContract.collectTax();
    } catch (error) {
      console.log(error);
    }
  };

  const deploy = async () => {
    try {
      const txn = await gameContract.deployInLand();
      await txn.wait();
      viewPlayer();
    } catch (error) {
      console.log(error);
    }
  };

  const healSamurai = async () => {
    try {
      const txn = await gameContract.healSamurai();
      await txn.wait();
      viewPlayer();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.currentCity}>
        Current City
        <hr />
        <button onClick={deploy}>Deploy</button> <br />
        <button onClick={healSamurai}>Heal Warrior</button>
        <br />
        {/* {String(lands.land.isBase) == "false" ?
                <button onClick={collectTax} >Collect Goods</button> :
                <button onClick={collectTax} >Sell Goods</button>}
            <br /> */}
        <hr />
      </div>
      <div className={styles.selectedCity}>
        Selected City
        <hr />
        {String(lands.land) != "null" && (
          <div>
            <div className={styles.landDetails}>
              <p>Land ID: {lands.land.id}</p>
              <p>Owner:{lands.land.owner}</p>
              {lands.land.attackerClan == 0 ? (
                <p> Attacker : None </p>
              ) : (
                <p> Attacker: {lands.land.attackerClan}</p>
              )}
            </div>
          </div>
        )}
        <button onClick={move}>Move</button> <br />
        <button onClick={teleport}>Teleport</button> <br />
      </div>
    </div>
  );
};

export default MapController;
