import React from 'react'
import DeployedTroopsTable from './DeployedTroopsTable'

function TroopsTab(props) {
    return (
        <div>
            <hr />
            <DeployedTroopsTable
                gameContract={props.gameContract}
                samuraiContract={props.samuraiContract}


            />
        </div>
    )
}

export default TroopsTab