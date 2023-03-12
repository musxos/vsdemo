import React, { useEffect, useState } from "react";
import Head from "next/head";
import { withRouter } from "next/router";
import useConnection from "@/hooks/useConnection";
import useContract from "@/hooks/useContract";
import { gameaddress, samuraiaddress } from "@/config";
import CurrentDeck from "@/components/Tabs/MainTab/CurrentDeck";
import samuraiContractABI from "@/assets/samurai.json";
import gameContractABI from "@/assets/game.json";
import styles from "@/styles/Profile.module.css";

const profile = withRouter((props) => {
  const connection = useConnection();
  const samuraiContract = useContract(samuraiaddress, samuraiContractABI);
  const gameContract = useContract(gameaddress, gameContractABI);

  const [currentDeck, setCurrentDeck] = useState([]);
  const [allNfts, setAllNfts] = useState([]);

  const [consumable, setConsumable] = useState([]);

  const playerAddress = props.router.query.user;

  const getCurrentDeck = async () => {
    try {
      setCurrentDeck([]);
      const data = await gameContract.viewCurrentDeck(playerAddress);
      let currentDeckIds = [];
      for (let i = 0; i < data.length; i++) {
        let item = data[i].toNumber();
        await currentDeckIds.push(item);
      }
      if (data.length >= 3) {
        let currentDeck = [];
        for (let i = 0; i < 3; i++) {
          const heroStat = await samuraiContract.viewHero(currentDeckIds[i]);
          const uri = await samuraiContract.tokenURI(currentDeckIds[i]);
          let item = {
            id: heroStat.ID.toNumber(),
            uri: uri,
            attack: heroStat.attack,
            defence: heroStat.defence,
            manaCost: heroStat.manaCost,
          };
          console.log(uri);
          currentDeck.push(item);
        }
        setCurrentDeck(currentDeck);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getPlayerHeroes = async () => {
    try {
      setAllNfts([]);
      let heroes = await gameContract.viewHeroes(playerAddress);
      let playerHeroes = [];
      for (let i = 0; i < heroes.length; i++) {
        const heroStat = await samuraiContract.viewHero(heroes[i].toNumber());
        const uri = await samuraiContract.tokenURI(heroes[i]);
        let item = {
          id: heroStat.ID.toNumber(),
          uri: uri,
          attack: heroStat.attack,
          defence: heroStat.defence,
          manaCost: heroStat.manaCost,
        };
        playerHeroes.push(item);
        console.log(item);
      }
      setAllNfts(playerHeroes);
    } catch (error) {
      console.log(error);
    }
  };

  const viewUserInventory = async () => {
    try {
      let consumables = await gameContract.viewUserInventory(playerAddress);
      for (let i = 1; i < 4; i++) {
        const consumable = consumables[i].toNumber();
        console.log(consumable);
        setConsumable((consumables) => [...consumables, consumable]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    connection.connect();
    if (playerAddress) {
      getCurrentDeck();
      getPlayerHeroes();
      viewUserInventory();
    }
  }, [playerAddress]);

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

      <div class="container">
        <div class="row mt-2">
          <div class="col-4 col-lg-4 bg-dark rounded col-md-12 mb-md-2">
            <div class="row text-light text-center mt-2">
              <h5>Profile</h5>
            </div>
            <div class="row mt-2">
              <img class="" style={{ borderRadius: "60%" }} src="pro.png" />
            </div>
            <div class="row mt-2 mb-2">
              <a class="text-decoration-none text-light">Username :</a>
              <a class="text-decoration-none text-light">Balances :</a>
              <a class="text-decoration-none text-light">Username :</a>
              <a class="btn btn-outline-warning w-75 mx-auto mt-3" href="/deck">
                Change Deck
              </a>
            </div>
          </div>
          <div class="col-1 col-lg-1"></div>

          <div class="col-7 col-lg-7 col-md-12">
            <div class="row  mb-2">
              <CurrentDeck
                gameContract={gameContract}
                samuraiContract={samuraiContract}
                playerAddress={playerAddress}
              />
              {/* <div class="col card-group mb-2">
                                    <div class="card" >
                                        <img class="card-img-top" src="assets/images/product-image.png" height="150"
                                            alt="Card image cap" />
                                        <div class="card-body">
                                            <h5 class=" text-dark">Sam #5571</h5>
                                        </div>
                                    </div>
                                    <div class="card mx-3" >
                                        <img class="card-img-top" src="assets/images/product-image.png" height="150"
                                            alt="Card image cap" />
                                        <div class="card-body">
                                            <h5 class=" text-dark">Sam #5571</h5>
                                        </div>
                                    </div>
                                    <div class="card" >
                                        <img class="card-img-top" src="assets/images/product-image.png" height="150"
                                            alt="Card image cap" />
                                        <div class="card-body">
                                            <h5 class=" text-dark">Sam #5571</h5>
                                        </div>
                                    </div>
                                </div> */}
            </div>

            <div class="row mt-1  bg-dark rounded text-light">
              <div class="row mt-2">
                <h5 class="text-center">All Samurai</h5>
              </div>

              <div class="row mb-2">
                <div class="col card-group mb-2">
                  <div class="card">
                    <img
                      class="card-img-top"
                      src="assets/images/product-image.png"
                      height="150"
                      alt="Card image cap"
                    />
                    <div class="card-body">
                      <h5 class=" text-dark">Sam #5571</h5>
                    </div>
                  </div>
                  <div class="card mx-3">
                    <img
                      class="card-img-top"
                      src="assets/images/product-image.png"
                      height="150"
                      alt="Card image cap"
                    />
                    <div class="card-body">
                      <h5 class=" text-dark">Sam #5571</h5>
                    </div>
                  </div>
                  <div class="card">
                    <img
                      class="card-img-top"
                      src="assets/images/product-image.png"
                      height="150"
                      alt="Card image cap"
                    />
                    <div class="card-body">
                      <h5 class=" text-dark">Sam #5571</h5>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="row mt-1  bg-dark rounded text-light">
              <div class="row mt-2">
                <h5 class="text-center">Spells</h5>
              </div>

              <div class="row mb-2">
                <div class="col card-group mb-2"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* <div>clan ID</div>
            <div>Kullanıcı Adı</div>
            <div>Açıklama</div>
            <div className={styles.currentDeck} >
                <h1>Current Deck</h1>
                <CurrentDeck
                    gameContract={gameContract}
                    samuraiContract={samuraiContract}
                    playerAddress={playerAddress}
                />
            </div>
            <div className={styles.army} >
                <h1>Army</h1>
                <div className={styles.armyCards}>
                    {allNfts.map((samurai, i) => (
                        <Card
                            key={i}
                            id={samurai.id}
                            imageURL={samurai.uri}
                            attack={samurai.attack}
                            defence={samurai.defence}
                            mana={samurai.manaCost}
                        />
                    ))}
                </div>
            </div>
            <div className={styles.inventory} >
                <h1>Inventory</h1>
                <div className={styles.armyCards}>
                    <Card />
                    <Card />
                    <Card />
                </div>
            </div> */}
    </div>
  );
});

export default profile;
