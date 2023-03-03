import React from 'react'
import { AppBar, Container, Typography, Toolbar, Select, MenuItem, createTheme, ThemeProvider } from '@mui/material'
import { makeStyles } from '@material-ui/core';
import { useNavigate } from 'react-router-dom';
import { CryptoState } from "./CreateContext";
const darkTheme = createTheme({/* Provides Dark theme */
  palette: {
    mode: 'dark',
  },
});

const useStyle = makeStyles(() => ({/* Style of Header */
  title: {
    flex: 1,
    color: 'gold',
    cursor: 'pointer',
   
  }
}))

function Header() {
  const navigate = useNavigate();/* Function used which leads to home page when clicked on logo */
  const { currency,setCurrency } = CryptoState();
  const headerClass = useStyle();
  return (
    <ThemeProvider theme={darkTheme}>
      <AppBar color='transparent' position="static">
        <Container>
          <Toolbar>
            <Typography onClick={() => navigate("/")} className={headerClass.title} style={{ fontFamily: "'Lato', sans-serif",fontSize:"250%" }} variant='h5' >
              Crypto Tracker
            </Typography>
            <Select
              variant='outlined'
              style={{
                width: "10%",
                height: "100%",
                marginRight: 15,
              }}
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}>
              
              <MenuItem value={'USD'} style={{fontSize:"120%"}} >
                USD
              </MenuItem>
              <MenuItem value={'INR'} style={{fontSize:"120%"}}>
                INR
              </MenuItem>
              <MenuItem value={'EUR'} style={{fontSize:"120%"}}>
                EUR
              </MenuItem>
            </Select>
          </Toolbar>
        </Container>
      </AppBar>
    </ThemeProvider>


  )
}

export default Header
