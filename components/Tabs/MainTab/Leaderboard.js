import React from 'react';
import Card from '../../Card';

const Leaderboard = (props) => {

    return (
        <div className="row rounded bg-dark text-light mt-3">
            <hr />
            <h5>Leaderboard</h5>
            <hr />
            <div className="row mb-4">
                <div className='col d-flex flex-column'>
                    <div className='mb-2'>
                        <p>Lotus</p>
                    </div>
                    <div className='mb-2'>
                        <p>Mızrak</p>
                    </div>
                    <div className='mb-2'>
                        <p>Yelpaze</p>
                    </div>
                </div>
                <div className='col d-flex flex-column'>
                    <div className="progress" role="progressbar" aria-label="Default striped example" aria-valuenow={10} aria-valuemin={0} aria-valuemax={100}>
                        <div className="progress-bar progress-bar-striped" style={{ width: '10%' }}></div>
                    </div>
                    <div className="progress" role="progressbar" aria-label="Success striped example" aria-valuenow={25} aria-valuemin={0} aria-valuemax={100}>
                        <div className="progress-bar progress-bar-striped bg-success" style={{ width: '25%' }}></div>
                    </div>
                    <div className="progress" role="progressbar" aria-label="Info striped example" aria-valuenow={50} aria-valuemin={0} aria-valuemax={100}>
                        <div className="progress-bar progress-bar-striped bg-info" style={{ width: '50%' }}></div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Leaderboard;
