/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { CryptoState } from '../components/CreateContext';
import { SingleCoin } from './Config/api';
import axios from 'axios';
import CoinInfo from './CoinInfo';
import { LinearProgress, makeStyles, Typography } from '@material-ui/core';
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';
function Coins() {

  const { id } = useParams();/* id is called from the route */
  const [coin, setCoin] = useState();
  const { currency, symbol } = CryptoState();
  const fetchCoinData = async () => {
    const { data } = await axios.get(SingleCoin(id));
    setCoin(data);
  }
  useEffect(() => {
    fetchCoinData();
  }, [currency])

  const useStyle = makeStyles((theme) => ({
    container: {
      display: "flex",
      marginLeft: "1%",
      [theme.breakpoints.down("md")]: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
      }
    },
    sideBar: {
      width: "30%",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
     
      borderRight: "2px solid grey",
      [theme.breakpoints.down("md")]: {
        width: "100%",
        marginRight: "0%"
      }
    },
    heading: {
      fontWeight: "bold",
      fontFamily: "Lato",
      marginBottom: "5%"
    },
    subtitle: {
      fontFamily: "Lato",
      width: "100%",
      justifyContent: "center",
      fontWeight: "normal"
    },
    marketData: {
      alignSelf: "start",

      width: "100%",
      [theme.breakpoints.down("md")]: {
        display: "flex",
        justifyContent: "space-around"
      },
      
    },

  }))

  function numberWithCommas(x) {/* Function which returns price in the required format */
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  const classes = useStyle();
  if (!coin) return <LinearProgress style={{ backgroundColor: "Gold" }}></LinearProgress>
/* ^ ^ if no data is feeded into coin then linear progress appears
   | | */
  return (
    <div className={classes.container}>
      <div className={classes.sideBar}>

        <img
          src={coin?.image.large}
          style={{
            height: 200,
            marginBottom: "16%",
            marginTop: "10%"
          }} />

        <Typography variant="h3" className={classes.heading}>
          {coin?.name}
        </Typography>

        <Typography variant="subtitle1" className={classes.subtitle}>
          {ReactHtmlParser(coin?.description.en.split(". ")[0])}{/* React HTML parser library which converts the HTML 
          code into standard text */}
        </Typography>

        <div className={classes.marketData}>
          <span>
            <Typography variant='h5' className={classes.heading}>
              Rank : {coin?.market_cap_rank}
            </Typography>
          </span>



          <span style={{ display: "flex" }}>
            <Typography variant="h5" className={classes.heading}>
              Market Cap:
            </Typography>

            <Typography
              variant="h5"
              style={{
                fontFamily: "Montserrat",
              }}
            >
              {symbol}{" "}
              {numberWithCommas(
                coin?.market_data.market_cap[currency.toLowerCase()]
                  .toString()
                  .slice(0, -6)
              )}
              M
            </Typography>
          </span>

        </div>

      </div>
      <div>
        <CoinInfo coin={coin}> </CoinInfo>
      </div>
    </div>
  )
}

export default Coins