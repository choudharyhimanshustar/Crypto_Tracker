/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
import axios from 'axios';
import React, { useState, useEffect } from 'react'
import { CryptoState } from './CreateContext';
import { CoinList } from './Config/api';
import { Table, TableBody, Pagination, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import { Container, ThemeProvider } from '@mui/system';
import { createTheme } from '@mui/material/styles';
import { TextField, makeStyles } from '@material-ui/core';
import { useNavigate } from 'react-router-dom';
const darkTheme = createTheme({/* Provides Dark theme */
  palette: {
    primary: {
      main: "#fff",
    },
    type: 'dark',
  },
});

const coinsTable = () => {
  const [coins, setCoins] = useState([]);/* Stores all data about the coin */
  const { currency, symbol } = CryptoState();
  const [search, setSearch] = useState("");/* Stores the coin to be searched */
  const [page, setPage] = useState("1");/* Keeps hold of the page one is present on */

  useEffect(() => {
    getCoins();/* getCoins function called when currency changes which fetches all the data */
  }, [currency])
  const navigate = useNavigate();

  const getCoins = async () => {
    const { data } = await axios.get(CoinList(currency));

    setCoins(data);
  };

  const useStyle = makeStyles(() => ({
    row: {
      "&:hover": {
        backgroundColor: "#131111",
      },
      backgroundColor: "#16171a"

    },
    pages: {
      "& .MuiPaginationItem-root": {
        color: "gold",
      },
    }
  }))

  const classes = useStyle();

  const handleSearch = () => {
    return coins.filter((coin) =>/* return coin that is searched. If no coin is found, all the coins are returned */
      coin.name.toLowerCase().includes(search)
      || coin.symbol.toLowerCase().includes(search)
    );
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <Container style={{ textAlign: "center" }}>
        <Typography variant='h4' fontFamily={"Lato"} margin="2%">
          CryptoCurrency Prices by their market cap</Typography>

        <TextField label="Search for CryptoCurrency"
          variant="outlined" InputLabelProps={{ className: "searchBar" }}
          style={{ width: "100%", marginBottom: "1%" }}
          onChange={(e) => {
            setSearch(e.target.value)
          }} />

        <TableContainer>
          <Table>
            <TableHead style={{ backgroundColor: "#EEBC1D" }}>
              <TableRow>
                {["Coin", "Price", "24hr Change", "Market Cap"].map((head) => {
                  return (<TableCell style={{
                    color: "black",
                    fontSize: "107%",
                    fontFamily: "Lato"

                  }}
                    key={head}
                    align={head === "Coin" ? "" : "right"}
                  >
                    {head}
                  </TableCell>)
                })}
              </TableRow>
            </TableHead>

            <TableBody>
              {/* slice provides only that many number of coins as specified */}
              {handleSearch().slice((page - 1) * 11, (page - 1) * 11 + 11).map((row) => {
                const profit = row.price_change_percentage_24h > 0;
                return (
                  <TableRow
                    className={classes.row}
                    key={row.name}
                  >
                    {/* Table cell below conists of coin image,coin symbol and name */}
                    <TableCell component="th"
                      onClick={() => navigate(`/coins/${row.id}`)}

                      scope="row"
                      style={{ display: "flex", gap: 15, cursor: "pointer" }}>
                      <img
                        src={row?.image}
                        alt={row.name}
                        height="50"
                        style={{ marginBottom: 10 }}
                      />

                      <div
                        style={{ display: "flex", flexDirection: "column" }}
                      >

                        <span
                          style={{ textTransform: "uppercase", color: "white" }}>
                          {row.symbol}
                        </span>
                        <span
                          style={{ color: "darkgrey" }}>
                          {row.name}
                        </span>
                      </div>
                    </TableCell>



                    {/* Table cell below consists of coin price */}

                    <TableCell
                      align="right"
                      style={{ color: "white" }
                      }>
                      {symbol}{row.current_price.toLocaleString("en")}
                    </TableCell>
                    {/* Table cell below consists of coin profit/loss */}

                    <TableCell
                      align="right"

                      style={{ color: profit > 0 ? "green" : "red", fontWeight: 500 }}>
                      {profit && "+"}{row.price_change_percentage_24h?.toFixed(2)}%
                    </TableCell>
                    {/* Table cell below consists of coin market Cap */}

                    <TableCell
                      align="right"
                      style={{ color: "white" }}>
                      {symbol + " "}{row.market_cap.toLocaleString("en").toString().slice(0, -6)}M
                    </TableCell>

                  </TableRow>)

              })}
            </TableBody>
            {/* Component for page number  */}
          </Table>
          <Pagination className={classes.pages}
            count={(handleSearch().length / 11).toFixed(0)}
            style={{ justifyContent: "center", display: "flex" }}
            onChange={(_, value) => {
              setPage(value);
              window.scroll(0, 450);
            }}
          >

          </Pagination>
        </TableContainer>
      </Container>

    </ThemeProvider >




  );
};

export default coinsTable;