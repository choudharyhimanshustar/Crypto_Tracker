/* Component for carousel which displays trending coins */
import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core';
import axios from 'axios';
import { TrendingCoins } from '../Config/api';
import { CryptoState } from '../CreateContext';
import AliceCarousel from 'react-alice-carousel';
import { Link } from 'react-router-dom';
const useStyles = makeStyles(() => ({
    carousel: {
        display: "flex",
        alignItems: "center",

    },
    carouselItem: {
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        color: "white",
        textTransform: "uppercase",
        fontSize: "125%",

    }
}))
const Carousel = () => {
    const classes = useStyles();
    const [trending, setTrending] = useState([]);/* trending consists of top 10 trending coins */
    const { currency, symbol } = CryptoState();

    useEffect(() => {
        fetchTrendingCoins();
    }, [currency])/* whenever currency gets changed, new trending coins are fetched */
    const fetchTrendingCoins = async () => {
        const { data } = await axios.get(TrendingCoins(currency));/* axios is used to fetch info from API */
        setTrending(data);/* data feeded into trending */
    }
    const responsive = {
        0: {
            items: 2/* 2 items to be displayed on small screen */
        },
        512: {
            items: 4 /* 4 items to be displayed on medium to big screen */
        }
    }
    const item = trending.map((coins) => {/* item consists of all valuable info to be shown in the carousel */
        const profit = coins.price_change_percentage_24h >= 0;/* Stores profit or loss */

        return (
            <Link to={`/coins/${coins.id}`} className={classes.carouselItem} >
                <img src={coins.image} height={80} alt={coins?.name}
                />
                < span  >
                    {coins.symbol} 

                    <span style={{ color: profit > 0 ? "green" : "red" }}>
                        &nbsp;{/* &nbsp used for providing space in span */}
                        {profit && "+"}{coins.price_change_percentage_24h.toFixed(2)}%
                    </span>
                </span>
                <span>
                    &nbsp;
                    {symbol}{coins.current_price.toLocaleString("en")}{/* provides commas in currency */}
                </span>

            </Link >

        )
    });
/* AliceCarousel used below installed using npm to display carousel */
    return (
        <div className={classes.carousel}><AliceCarousel mouseTracking
            infinite 
            autoPlayInterval={1644}
            responsive={responsive}
            animationDuration={1500}
            disableDotsControls
            disableButtonsControls
            autoPlay
            items={item}
        />
        </div>
    )
}

export default Carousel