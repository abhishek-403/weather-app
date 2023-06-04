import React from 'react'
import EachDay from '../../components/EachDay/EachDay';
import './home.scss'
function Home(props) {
    let img2 = require('../../assets/50d.svg')

    if (props.todayData[0]?.weather[0]?.icon !== undefined) {
        img2 = require(`../../assets/${props.todayData[0]?.weather[0]?.icon}.svg`)

    }

   
    return (
        <div className='home'>

            <div className="home-cnt container ">
                <div className="today-weather flex">

                    <div className="top center">

                        <div className="image-div center">

                            <img src={img2} alt="" />
                        </div>
                        <div className="today-block flexcol">
                            <p id="today">
                                Today

                            </p>
                            <h2 id="city">
                                {props.cityInfo?.name}, {props.cityInfo?.country}

                            </h2>
                            <span id="temp">
                                Temperature : {props.todayData[0]?.main?.temp}° C

                            </span>
                            <span id="feels_like">
                                Feels like : {props.todayData[0]?.main?.feels_like}° C

                            </span>
                            <p id="desc">

                                {props.todayData[0]?.weather[0]?.main}
                            </p>

                        </div>
                    </div>
                </div>

                <div className="all-days center">


                    {
                        props.myData.splice(1)?.map((item, i) => {

                            return (
                                <EachDay key={i} props={item} />
                            )



                        })

                    }


                </div>

            </div>
        </div>
    )
}

export default Home
