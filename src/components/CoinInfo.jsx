/* eslint-disable array-callback-return */
/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import { CryptoState } from './CreateContext';
import { createTheme } from '@mui/system';
import { ThemeProvider } from '@emotion/react';
import { CircularProgress, makeStyles } from '@material-ui/core';
import { Line } from 'react-chartjs-2';
import axios from 'axios';
import { HistoricalChart } from './Config/api';
import { Chart as ChartJS } from 'chart.js/auto'
import { Chart } from 'react-chartjs-2';
import { chartDays } from './Config/data';
import SelectButton from './SelectButton';

const CoinInfo = ({ coin }) => {
  const [historicData, setHistoricData] = useState([]);
  const [days, setDays] = useState(1);/* Used to store days which tells data of how many days */

  const { currency } = CryptoState();

  const fetchData = async () => {/* Calls function which fetched graph data */
    const { data } = await axios.get(HistoricalChart(coin.id, days, currency));
    setHistoricData(data.prices);
  };
  useEffect(() => {
    fetchData();
  }, [currency,days])

  const darkTheme = createTheme({/* Provides Dark theme */
    palette: {
      mode: 'dark',
    },
  });

  const useStyles = makeStyles((theme) => ({
    container: {
      height: 500,
      width: 800,
      display: "flex",
      flexDirection: "column",
      padding: 40,
      marginTop: 25,
      justifyContent: "center",
      alignItems: "center",
      [theme.breakpoints.down("md")]: {
        width: "100%",
        margin: "0",
        padding: 0
      }
    },
   

  }))

  const classes = useStyles();
/* If data is not loaded, then circular progress appears. When data gets loaded 
then graph is shown. */
  return (
    <ThemeProvider theme={darkTheme}>
      <div className={classes.container}>
        {historicData.length === 0 ? (
          <CircularProgress
            style={{ color: "gold" }}
            size={250}
            thickness={1}
          />
        ) : (
          <>

            <Line
              data={{
                labels: historicData.map((coins) => {

                  let date = new Date(coins[0]);
                  let time =
                    date.getHours() > 12
                      ? `${date?.getHours() - 12}:${date?.getMinutes()} PM`
                      : `${date?.getHours()}:${date?.getMinutes()} AM`;
                  return days === 1 ? time : date.toLocaleDateString();
                }),
                datasets: [
                  {
                    data: historicData.map((coin) => coin[1]),
                    label: `Price ( Past ${days} Days ) in ${currency}`,
                    borderColor: "#EEBC1D",
                  },
                ],
              }}
              options={{
                elements: {
                  point: {
                    radius: 1,
                  },
                },
              }}

            />


          </>
        )}
        <div
          style={{
            display: "flex",
            justifyContent: "space-around",
            marginTop: "5%",
            width:"100%"
          }}>
          {chartDays.map((day) => (
            <SelectButton
            className={classes.selectedButton}
            key={day.value}
            onClick={()=>setDays(day.value)}
            selected={day.value===days}>{day.label}</SelectButton>
          ))}
        </div>
      </div>

    </ThemeProvider>

  )
}

export default CoinInfo