import React, { useState, useEffect } from "react";
import Head from "next/head";
import useConnection from "@/hooks/useConnection";
import useContract from "@/hooks/useContract";
import BuyConsumables from "@/components/Marketplace/BuyConsumables";
import SellConsumables from "@/components/Marketplace/SellConsumables";
import BuySamurai from "@/components/Marketplace/BuySamurai";
import SellSamurai from "@/components/Marketplace/SellSamurai";
import { gameaddress } from "@/config";
import gameContractABI from "@/assets/game.json";
import styles from "@/styles/Marketplace.module.css";

function Marketplace() {
  const connection = useConnection();
  const gameContract = useContract(gameaddress, gameContractABI);

  const [selectedTab, setSelectedTab] = useState("buyConsumables");

  useEffect(() => {
    connection.connect();
  }, [connection.address]);

  return (
    <div>
      <Head>
        <link
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css"
          rel="stylesheet"
          integrity="sha384-GLhlTQ8iRABdZLl6O3oVMWSktQOp6b7In1Zl3/Jr59b6EGGoI1aFkw7cmDA6j6gD"
          crossorigin="anonymous"
        ></link>
      </Head>
      <div className={styles.tabs}>
        <button
          className={
            selectedTab === "buyConsumables"
              ? styles.activeTab
              : styles.routerButton
          }
          onClick={() => setSelectedTab("buyConsumables")}
        >
          Buy Consumables
        </button>
        <button
          className={
            selectedTab === "sellConsumables"
              ? styles.activeTab
              : styles.routerButton
          }
          onClick={() => setSelectedTab("sellConsumables")}
        >
          Sell Consumables
        </button>
        <button
          className={
            selectedTab === "buySamurai"
              ? styles.activeTab
              : styles.routerButton
          }
          onClick={() => setSelectedTab("buySamurai")}
        >
          Buy Samurai
        </button>
        <button
          className={
            selectedTab === "sellSamurai"
              ? styles.activeTab
              : styles.routerButton
          }
          onClick={() => setSelectedTab("sellSamurai")}
        >
          Sell Samurai
        </button>
      </div>
      <div className="content">
        {selectedTab === "buyConsumables" && (
          <BuyConsumables gameContract={gameContract} />
        )}
        {selectedTab === "sellConsumables" && (
          <SellConsumables gameContract={gameContract} />
        )}
        {selectedTab === "buySamurai" && (
          <BuySamurai gameContract={gameContract} />
        )}
        {selectedTab === "sellSamurai" && (
          <SellSamurai gameContract={gameContract} />
        )}
      </div>
    </div>
  );
}

export default Marketplace;
