import React from 'react'
import './eachday.scss'

function EachDay({ props }) {

    const today = new Date().toString();
    const weekDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
    const getDay = () => {
        const day = new Date(props.dt_txt);
        return (day.getDay());
    }
    
    

    const img = require(`../../assets/${props.weather[0].icon}.svg`)
    return (
        <div className='each-day'>
            <div className="each-day-content flexcol">
                <div className="day">
                    {props.dt_txt.slice(8,10)===today.slice(8,10)?"Today": weekDays[getDay()]}
                </div>
                <div className="image">
                    <img src={img} alt="" />

                </div>
                <div className="data">
                    <div className="temp">
                        Temperature : {props.main.temp}° C 

                    </div>
                    <div className="feels-like">
                        Feels like : {props.main.feels_like}° C

                    </div>
                    <div className="desc">
                        Description : {props.weather[0].description}

                    </div>

                </div>


            </div>

        </div>
    )
}

export default EachDay
