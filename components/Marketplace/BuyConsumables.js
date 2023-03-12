import React from "react";

const BuyConsumables = (props) => {
  const gameContract = props.gameContract;

  const buyConsumable = async (i) => {
    try {
      //gameContract.
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h1>BuyConsumables</h1>
      <button onClick={() => buyConsumable(1)}>Omamori</button>
      <button onClick={() => buyConsumable(2)}>Ofuda</button>
      <button onClick={() => buyConsumable(3)}>Kinjutsu</button>
      <button onClick={() => buyConsumable(4)}>Daruma</button>
      <button onClick={() => buyConsumable(5)}>Kitsune</button>
      <button onClick={() => buyConsumable(6)}>Maneki-Neko</button>
    </div>
  );
};

export default BuyConsumables;
