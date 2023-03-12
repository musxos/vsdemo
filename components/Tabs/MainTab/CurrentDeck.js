import React, { useState, useEffect } from 'react'
import Card from '../../Card'

const CurrentDeck = (props) => {

    const gameContract = props.gameContract;
    const samuraiContract = props.samuraiContract;
    const playerAddress = props.playerAddress;

    const [currentDeck, setCurrentDeck] = useState([])


    const getCurrentDeck = async () => {
        try {
            setCurrentDeck([])
            const data = await gameContract.viewCurrentDeck(playerAddress);
            let currentDeckIds = []
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
                    }
                    currentDeck.push(item);
                }
                setCurrentDeck(currentDeck)
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        if (playerAddress) {
            getCurrentDeck();
        }
    }, [playerAddress])


    return (
        <div className="row rounded bg-dark text-light mt-3">
            <hr />
            <h5>Current Deck</h5>
            <hr />
            {currentDeck.length >= 3 && (
                < div className="row">
                    <div className="col card-group mb-4">
                        <Card
                            id={currentDeck[0]?.id}
                            imageURL={currentDeck[0]?.uri}
                            attack={currentDeck[0]?.attack}
                            defence={currentDeck[0]?.defence}
                            mana={currentDeck[0]?.manaCost}
                        />
                        <Card
                            id={currentDeck[1]?.id}
                            imageURL={currentDeck[1]?.uri}
                            attack={currentDeck[1]?.attack}
                            defence={currentDeck[1]?.defence}
                            mana={currentDeck[1]?.manaCost}
                        />
                        <Card
                            id={currentDeck[2]?.id}
                            imageURL={currentDeck[2]?.uri}
                            attack={currentDeck[2]?.attack}
                            defence={currentDeck[2]?.defence}
                            mana={currentDeck[2]?.manaCost}
                        />
                    </div>
                </div>
            )}

        </div >
    )
}

export default CurrentDeck