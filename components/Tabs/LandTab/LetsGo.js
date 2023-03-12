import React from 'react'
import { useSelector } from "react-redux";

const LetsGo = (props) => {

    const lands = useSelector(state => state.lands);

    const gameContract = props.gameContract

    const move = async () => {
        try {
            await gameContract.changeLocation(lands.land);
            a//wait txn.wait();
            //props.viewPlayer();
        } catch {
            (error) =>
                console.error("error", error);
        }
    }

    const deploy = async () => {
        try {
            const txn = await gameContract.deployInLand();
            await txn.wait();
            //props.viewPlayer();
        } catch {
            (error) => console.log(error)
        }
    }

    const heal = async () => {
        try {
            const txn = await gameContract.healSamurai();
            await txn.wait();
            //props.viewPlayer();
        } catch {
            (error) => console.log(error)
        }
    }

    const collectTax = async () => {
        try {
            const txn = await gameContract.collectTax();
            await txn.wait();
            //props.viewPlayer();
        } catch {
            (error) => console.log(error)
        }
    }



    return (
        <div className="row rounded bg-dark text-light mt-3">
            <hr />
            <h5>Lets Go {lands.land}</h5>
            <hr />

            <div className="row mb-3">
                <div className="col">
                    <a className="btn btn-outline-light" onClick={move}>Move</a>
                    <a className="btn btn-outline-light" onClick={deploy}>Deploy</a>
                    <a className="btn btn-outline-light" onClick={heal}>Heal</a>
                    <a className="btn btn-outline-light" onClick={collectTax}>Collect Tax</a>
                </div>

            </div>
            <h5>Spels</h5>
            <hr />

            <div className="row mb-3">
                <div className="col">
                    <a className="btn btn-outline-light">Heal</a>
                    <a className="btn btn-outline-light">Teleport</a>
                </div>

            </div>
        </div>

    )
}

export default LetsGo