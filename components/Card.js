import React, { useState } from "react";
import styles from "../styles/Card.module.css";

const Card = (props) => {
  return (
    <div className="card">
      <img
        className="card-img-top"
        src={props.imageURL}
        height="160"
        alt="Card image cap"
      />
      <div className="card-body">
        <h5 className=" text-dark">Samurai #{props.id}</h5>
        <h6 className=" text-dark">Attack: {props.attack}</h6>
        <h6 className=" text-dark">Defence: {props.defence}</h6>
        <h6 className=" text-dark">Mana: {props.mana}</h6>
      </div>
    </div>
  );
};

export default Card;
