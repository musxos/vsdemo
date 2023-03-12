import React, { useState, useEffect } from "react";
import styles from "../styles/GameBoard.module.css";
import { useDispatch } from "react-redux";
import { setDeployedAttackers } from "@/redux/reducers/attackers";
import { setDeployedDefenders } from "@/redux/reducers/defenders";
import { setLand } from "@/redux/reducers/landdetails";
import {
  setTotalAttackPower,
  setTotalDefencePower,
} from "@/redux/reducers/totalAttackersPower";

const GameBoard = (props) => {
  const dispatch = useDispatch();

  const connection = props.connection;

  const gameContract = props.gameContract;
  const playerLocation = props.playerLocation;

  const [landOwners, setLandOwners] = useState([]);

  useEffect(() => {
    connection.connect();
    if (connection.address) {
      viewLandOwners();
    }
  }, [connection.address]);

  const viewLandOwners = async () => {
    try {
      const data = await gameContract.landOwners();
      const landOwners = await Promise.all(data);
      const owners = landOwners.map((_id) => {
        return _id.toNumber();
      });
      setLandOwners(owners);
    } catch {
      (error) => console.log(error);
    }
  };

  const viewDeployedTroops = async (i) => {
    try {
      const data = await gameContract.viewLand(i);
      let landDetails = {
        id: data.ID.toNumber(),
        attackerClan: data.attackerClan.toNumber(),
        owner: data.owner.toNumber(),
        isBase: data.isBase.toString(),
        value: data.value.toNumber(),
      };
      dispatch(setLand(landDetails));

      const totalDefencePower = await gameContract.viewAllDefendersPower(i);
      const totalAttackPower = await gameContract.viewAllAttackersPower(i);

      dispatch(setTotalAttackPower(totalAttackPower.toNumber()));
      dispatch(setTotalDefencePower(totalDefencePower.toNumber()));

      const attackers = await gameContract.viewAttackers(i);
      const defenders = await gameContract.viewDefenders(i);
      dispatch(setDeployedAttackers(attackers));
      dispatch(setDeployedDefenders(defenders));
    } catch {
      (error) => console.log(error);
    }
  };

  const squares = Array(121)
    .fill()
    .map((_, index) => {
      let className = styles.green;
      if (index === playerLocation) {
        className = styles.active;
      } else if (landOwners[index] == 1) {
        className = styles.red;
      } else if (landOwners[index] == 2) {
        className = styles.yellow;
      } else if (landOwners[index] == 3) {
        className = styles.brown;
      } else if (landOwners[index] == 4) {
        className = styles.lightBlue;
      }
      return (
        <div
          className={className}
          key={index}
          onClick={() => viewDeployedTroops(index)}
        ></div>
      );
    });

  return (
    <div className={styles.gameBoard}>
      <div className={styles.squaresDiv}>{squares}</div>
    </div>
  );
};

export default GameBoard;
