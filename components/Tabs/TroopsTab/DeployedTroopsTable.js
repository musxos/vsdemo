import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setDeployedHeroes } from '@/redux/reducers/deployedHeroes';
import CurrentDeck from "@/components/Tabs/MainTab/CurrentDeck"

function DeployedTroopsTable(props) {

    const dispatch = useDispatch();


    const attackers = useSelector(state => state.attackers);
    const defenders = useSelector(state => state.defenders);

    const { attackPower, defencePower } = useSelector((state) => state.totalpower);

    const attackerAddresses = attackers
    const defenderAddresses = defenders

    const gameContract = props.gameContract
    const samuraiContract = props.samuraiContract

    const [selectedPlayerAddress, setSelectedPlayerAddress] = useState("");

    const viewDeployedHeroes = async (attackerAddress) => {
        try {
            const data = await gameContract.viewCurrentDeck(attackerAddress);
            let currentDeckIds = []
            for (let i = 0; i < data.length; i++) {
                let item = data[i].toNumber();
                await currentDeckIds.push(item);
            }
            if (data.length >= 3) {
                const items = []
                for (let i = 0; i < 3; i++) {
                    const heroStat = await samuraiContract.viewHero(currentDeckIds[i]);
                    let item = {
                        id: heroStat.ID.toNumber(),
                        attack: heroStat.attack,
                        defence: heroStat.defence,
                        manaCost: heroStat.manaCost,
                    }
                    items.push(item);
                }
                dispatch(setDeployedHeroes(items))
            }
        } catch (error) {
            console.log(error)
        }
    }

    const handleAddressClick = async (address) => {
        if (address == selectedPlayerAddress) {
            setSelectedPlayerAddress("");
        } else {
            setSelectedPlayerAddress(address);
        }

    }


    return (
        <div className='container'  >
            <div className='row' >
                <table className="col table table-dark table-striped ">
                    <thead>
                        <tr >
                            <th>Attackers {`(${attackPower})`} </th>
                        </tr>
                    </thead>
                    <tbody>
                        {attackerAddresses?.map((address, index) => (
                            <tr key={index}>
                                <td onClick={() => handleAddressClick(address)} >
                                    {address.slice(0, 6)}...{address.slice(-4)}
                                </td>
                            </tr>
                        ))}

                    </tbody>
                </table>
                <table className="col table table-dark table-striped ">
                    <thead>
                        <tr >
                            <th>Defender {`(${defencePower})`} </th>
                        </tr>
                    </thead>
                    <tbody>
                        {defenderAddresses?.map((address, index) => (
                            <tr key={index}>
                                <td onClick={() => handleAddressClick(address)} >
                                    {address.slice(0, 6)}...{address.slice(-4)}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {selectedPlayerAddress && (
                <div className='row'>
                    <CurrentDeck
                        gameContract={gameContract}
                        samuraiContract={samuraiContract}
                        playerAddress={selectedPlayerAddress}
                    />
                </div>
            )}
        </div >
    )
}

export default DeployedTroopsTable