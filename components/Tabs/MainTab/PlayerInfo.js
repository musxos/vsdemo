import React from 'react'

const PlayerInfo = (props) => {

    const unixTime = props.player?.locationChangedTime; // Unix zaman değeri
    const dateObj = new Date(unixTime * 1000); // Unix zaman değerini milisaniyeye çevirerek tarihe dönüştürme
    const humanReadableDate = dateObj.toLocaleString(); // tarihi yerel saat diliminde insanlar tarafından okunabilir formata dönüştürme



    return (
        <div className="row rounded bg-dark text-light">
            <hr />
            <h5>Player's Info</h5>
            <hr />

            <div className="row mb-4">
                <div className="col">
                    <a className="d-block text-decoration-none text-light">Username :</a>
                    <a className="d-block text-decoration-none text-light">Kingdom :</a>
                    <a className="d-block text-decoration-none text-light">Location : </a>
                    <a className="d-block text-decoration-none text-light">Goods :</a>
                </div>
                <div className="col">
                    <a className="d-block text-decoration-none text-light">{props.player?.nickName}</a>
                    <a className="d-block text-decoration-none text-light">{props.player?.clan === 1 ? 'Mızrak' : props.player?.clan === 2 ? 'Yelpaze' : props.player?.clan === 3 ? 'Lotus' : ""}</a>
                    <a className="d-block text-decoration-none text-light">{props.player?.location}</a>
                    <a className="d-block text-decoration-none text-light">{props.player?.goods}</a>
                </div>
                <div className="col">
                    <a className="d-block text-decoration-none text-light">Deployed on:</a>
                    <a className="d-block text-decoration-none text-light">Moved on :</a>
                    <a className="d-block text-decoration-none text-light">Health :</a>
                    <a className="d-block text-decoration-none text-light">Season Point :</a>
                </div>
                <div className="col">
                    <a className="d-block text-decoration-none text-light">{props.player?.deployedTime}</a>
                    <a className="d-block text-decoration-none text-light">{humanReadableDate}</a>
                    <a className="d-block text-decoration-none text-light">{props.player?.isInjured ? "Injured" : "Healthy"}</a>
                    <a className="d-block text-decoration-none text-light">0</a>
                </div>
            </div>
        </div>
    )
}

export default PlayerInfo  