import React from 'react'

const LandInfo = (props) => {

    const unixTime = props.player?.locationChangedTime; // Unix zaman değeri
    const dateObj = new Date(unixTime * 1000); // Unix zaman değerini milisaniyeye çevirerek tarihe dönüştürme
    const humanReadableDate = dateObj.toLocaleString(); // tarihi yerel saat diliminde insanlar tarafından okunabilir formata dönüştürme
    console.log(humanReadableDate); // örneğin "23.02.2023 22:32:36" şeklinde bir çıktı verebilir



    return (
        <div className="row rounded bg-dark text-light">
            <hr />
            <h5>Land Info</h5>
            <hr />

            <div className="row mb-4">
                <div className="col">
                    <a className="d-block text-decoration-none text-light">ID :</a>
                    <a className="d-block text-decoration-none text-light">Owner :</a>
                    <a className="d-block text-decoration-none text-light">Attacker : </a>
                    <a className="d-block text-decoration-none text-light">Value :</a>
                </div>
                <div className="col">
                    <a className="d-block text-decoration-none text-light">{props.landDetails?.id}</a>
                    <a className="d-block text-decoration-none text-light">{props.landDetails?.owner === 1 ? 'Mızrak' : props.landDetails?.owner === 2 ? 'Yelpaze' : props.landDetails?.owner ? 'Lotus' : "Tarafsız"}</a>
                    <a className="d-block text-decoration-none text-light">{props.landDetails?.attackerClan === 0 ? "Yok" : props.landDetails?.attackerClan}</a>
                    <a className="d-block text-decoration-none text-light">{props.landDetails?.value}</a>
                </div>
            </div>
        </div>
    )
}

export default LandInfo  