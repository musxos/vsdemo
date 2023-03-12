import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Head from "next/head";
import dynamic from "next/dynamic";
import axios from "axios";
import useConnection from "@/hooks/useConnection";
import useContract from "@/hooks/useContract";
import { samuraiaddress, gameaddress } from "@/config";
import samuraiContractABI from "@/assets/samurai.json";
import gameContractABI from "@/assets/game.json";

const RegisterScreen = dynamic(() => import("@/components/RegisterScreen"), {
  loading: () => <p>Loading...</p>,
});
const MapSection = dynamic(() => import("@/components/MapSection"), {
  loading: () => <p>Loading...</p>,
});

export default function Home() {
  const dispatch = useDispatch();

  const connection = useConnection();
  const samuraiContract = useContract(samuraiaddress, samuraiContractABI);
  const gameContract = useContract(gameaddress, gameContractABI);
  const [currentDeck, setCurrentDeck] = useState([]);

  const [player, setPlayer] = useState();

  const deployedHeroes = useSelector((state) => state.deployedheroes);

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

  const viewPlayer = async () => {
    try {
      const player = await gameContract.viewPlayer(connection.address);
      const uri = await player.uri;
      const data = await axios.get(uri);
      let item = {
        ID: player.ID.toNumber(),
        nickName: data.data.nickName,
        description: data.data.description,
        goods: player.taxedGoods.toNumber(),
        clan: player.clan.toNumber(),
        location: player.location.toNumber(),
        deployedTime: player.deployedTime.toNumber(),
        isInjured: player.isInjured,
        locationChangedTime: player.locationChangedTime.toNumber(),
        seasonPoint: player.seasonPoint.toNumber(),
      };
      setPlayer(item);
      dispatch(setPlayer(item));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    connection.connect();
    if (connection.address) {
      getCurrentDeck();
      viewPlayer();
    }
  }, [connection.address]);

  return (
    <div>
      <Head>
        <link
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css"
          rel="stylesheet"
          integrity="sha384-GLhlTQ8iRABdZLl6O3oVMWSktQOp6b7In1Zl3/Jr59b6EGGoI1aFkw7cmDA6j6gD"
          crossorigin="anonymous"
          async="async"
        />
      </Head>

      {player?.ID == 0 && <RegisterScreen />}

      {player?.ID != 0 && (
        <React.Suspense>
          <MapSection connection={connection} player={player} />
        </React.Suspense>
      )}
    </div>
  );
}
