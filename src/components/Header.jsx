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
            <Typography onClick={() => navigate("/")} className={headerClass.title} style={{ fontFamily: "'Lato', sans-serif" }} variant='h5' >
              Crypto Tracker
            </Typography>
            <Select
              variant='outlined'
              style={{
                width: 100,
                height: 40,
                marginRight: 15,
              }}
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}>
              
              <MenuItem value={'USD'} >
                USD
              </MenuItem>
              <MenuItem value={'INR'}>
                INR
              </MenuItem>
              <MenuItem value={'EUR'}>
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