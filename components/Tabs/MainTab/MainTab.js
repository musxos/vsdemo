import React from 'react'
import CurrentDeck from './CurrentDeck'
import Leaderboard from './Leaderboard'
import PlayerInfo from './PlayerInfo'

function MainTab(props) {
    return (
        <div>
            <hr></hr>
            <PlayerInfo player={props.player} />
            <CurrentDeck
                gameContract={props.gameContract}
                samuraiContract={props.samuraiContract}
                playerAddress={props.playerAddress}
            />
            <Leaderboard />

        </div>
    )
}

export default MainTab