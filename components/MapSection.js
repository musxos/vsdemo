import React from "react";
import dynamic from "next/dynamic";
import { gameaddress, samuraiaddress } from "@/config";
import samuraiContractABI from "@/assets/samurai.json";
import gameContractABI from "@/assets/game.json";
import useContract from "@/hooks/useContract";

const Map = dynamic(() => import("@/components/Map"), {
  suspense: true,
  ssr: false,
});
const TabList = dynamic(() => import("@/components/Tabs/TabList"), {
  suspense: true,
});

const Loading = () => {
  console.log("loading");
  return <h2>loading...</h2>;
};

export default function MapSection({ connection, player }) {
  const gameContract = useContract(gameaddress, gameContractABI);
  const samuraiContract = useContract(samuraiaddress, samuraiContractABI);

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-md-12 col-lg-7">
            <div className="row">
              <div className="col">
                <React.Suspense fallback={<Loading />}>
                  <Map gameContract={gameContract} connection={connection} />
                </React.Suspense>
              </div>
            </div>
          </div>

          <div className="col-md-12 col-lg-5">
            <React.Suspense fallback={<h2>loading...</h2>}>
              <TabList
                gameContract={gameContract}
                samuraiContract={samuraiContract}
                playerAddress={connection.address}
                player={player}
              />
            </React.Suspense>
          </div>
        </div>
      </div>
    </>
  );
}
