import React, { useEffect, useState } from "react";
import Head from "next/head";
import useConnection from "@/hooks/useConnection";
import useContract from "@/hooks/useContract";
import { gameaddress, samuraiaddress } from "@/config";
import samuraiContractABI from "@/assets/samurai.json";
import gameContractABI from "@/assets/game.json";
import styles from "../styles/Deck.module.css";

const deck = () => {
  const [newDeck, setNewDeck] = useState([]);
  const [newDeckIds, setNewDeckIds] = useState([]);

  const [currentDeck, setCurrentDeck] = useState([]);
  const [playerHeroes, setPlayerHeroes] = useState([]);

  const connection = useConnection();
  const samuraiContract = useContract(samuraiaddress, samuraiContractABI);
  const gameContract = useContract(gameaddress, gameContractABI);

  const removeItem = (itemToRemove) => {
    setNewDeckIds(newDeckIds.filter((item) => item !== itemToRemove));
  };

  const setDeck = async () => {
    const txn = await gameContract.setDeck(newDeckIds);
    await txn.wait();
    await getCurrentDeck();
    setNewDeck([]);
  };

  const addToDeck = async (id) => {
    if (!newDeckIds.includes(id) && newDeckIds.length < 3) {
      setNewDeckIds((newDeckIds) => [...newDeckIds, id]);
      console.log(id);
    }
  };

  //kullanıcının mevcut seçili destesini state'e atar.
  const getCurrentDeck = async () => {
    try {
      setCurrentDeck([]);
      const data = await gameContract.viewCurrentDeck(connection.address);
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
          currentDeck.push(item);
        }
        setCurrentDeck(currentDeck);
      }
    } catch (error) {
      console.log(error);
    }
  };

  //kullanıcının setDeckFonksiyonuna parametre olarak göndereceği yeni destesini oluşturmasını sağlayan fonksiyon.
  const getNewDeckHeroes = async () => {
    const newDeckPromises = newDeckIds.map((id) =>
      samuraiContract.viewHero(id)
    );
    try {
      const heroStats = await Promise.all(newDeckPromises);
      const newDeck = heroStats.map((heroStat) => {
        return {
          id: heroStat.ID.toNumber(),
          attack: heroStat.attack,
          defence: heroStat.defence,
          manaCost: heroStat.manaCost,
        };
      });
      setNewDeck(newDeck);
    } catch (error) {
      console.log(error);
    }
  };

  //Kullanıcının tüm NFT'lerini döndürür
  const getPlayerHeroes = async () => {
    try {
      setPlayerHeroes([]);
      let heroes = await gameContract.viewHeroes(connection.address);
      for (let i = 0; i < heroes.length; i++) {
        const heroStat = await samuraiContract.viewHero(heroes[i].toNumber());
        let item = {
          id: heroStat.ID.toNumber(),
          attack: heroStat.attack,
          defence: heroStat.defence,
          manaCost: heroStat.manaCost,
        };
        setPlayerHeroes((playerHeroes) => [
          ...playerHeroes,
          {
            id: item.id,
            attack: item.attack,
            defence: item.defence,
            manaCost: item.manaCost,
          },
        ]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    connection.connect();
    if (connection.address) {
      getPlayerHeroes();
      getCurrentDeck();
      getNewDeckHeroes();
    }
  }, [connection.address, newDeckIds]);

  return (
    <div className={styles.container}>
      <Head>
        <link
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css"
          rel="stylesheet"
          integrity="sha384-GLhlTQ8iRABdZLl6O3oVMWSktQOp6b7In1Zl3/Jr59b6EGGoI1aFkw7cmDA6j6gD"
          crossorigin="anonymous"
        ></link>
      </Head>

      <div className={styles.currentDeck}>
        <h1>Current Deck</h1>
        <hr />
        <div className={styles.heroCards}>
          {currentDeck.map((hero) => (
            <div className={styles.heroCard} key={hero.id}>
              <img src={hero.uri} />
              <p className={styles.heroStat}>
                attack <br /> {hero.attack}
              </p>
              <p className={styles.heroStat}>
                defence <br /> {hero.defence}
              </p>
              <p className={styles.heroStat}>
                mana <br /> {hero.manaCost}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className={styles.setDeck}>
        <h1>Set Deck</h1>
        <hr />
        <div className={styles.heroCards}>
          {newDeck.map((hero) => (
            <div
              className={styles.heroCard}
              key={hero.id}
              onClick={() => removeItem(hero.id)}
            >
              <p className={styles.heroStat}>
                attack <br /> {hero.attack}
              </p>
              <p className={styles.heroStat}>
                defence <br /> {hero.defence}
              </p>
              <p className={styles.heroStat}>
                mana <br /> {hero.manaCost}
              </p>
            </div>
          ))}
        </div>
        <button onClick={setDeck}>Set Deck</button>
      </div>

      <div className={styles.heroes}>
        <h1>Heroes</h1>
        <hr />
        <div className={styles.heroCards}>
          {playerHeroes.map((hero) => (
            <div
              className={styles.heroCard}
              key={hero.id}
              onClick={() => addToDeck(hero.id)}
            >
              <p className={styles.heroStat}>
                attack <br /> {hero.attack}
              </p>
              <p className={styles.heroStat}>
                defence <br /> {hero.defence}
              </p>
              <p className={styles.heroStat}>
                mana <br /> {hero.manaCost}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default deck;
