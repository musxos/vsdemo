import React, { useEffect, useState } from 'react'
import LandInfo from './LandInfo'
import LetsGo from './LetsGo'
import SponsorInfo from './SponsorInfo'
import { useSelector } from "react-redux";

function LandTab(props) {

    const lands = useSelector(state => state.lands);

    const gameContract = props.gameContract;
    const playerAddress = props.playerAddress;

    const [landDetails, setLandDetails] = useState({});

    const getLandInfo = async () => {
        const data = await gameContract.viewLand(lands.land);
        console.log(data)
        const land = {
            id: data.ID.toNumber(),
            attackerClan: data.attackerClan.toNumber(),
            uri: data.uri,
            // attackerWarriors: ,
            // defenderWarriors: ,
            isBase: data.isBase.toString(),
            owner: data.owner.toNumber(),
            value: data.value.toNumber(),
        }
        console.log(land)
        setLandDetails(land)
    }

    useEffect(() => {
        if (playerAddress) {
            getLandInfo();
        }
    }, [playerAddress, lands.land])



    return (
        <div>
            <hr />
            <LandInfo
                landDetails={landDetails}
            />
            <SponsorInfo
            />
            <LetsGo
                gameContract={gameContract}
            />
        </div>
    )
}

export default LandTab