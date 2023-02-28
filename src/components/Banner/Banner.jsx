import React from 'react'
import { makeStyles, Typography, Container } from '@material-ui/core';
import Carousel from './Carousel';
const useStyles = makeStyles(() => ({
    banner: {
        backgroundImage: "url(./shubham-dhage-NsPqV-WsZYY-unsplash.jpg)",
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        height: '60vh',
        width: '100%',
        borderRadius: 8,
        display: 'flex',
    },
    bannerContent: {
        fontFamily: "'Lato', sans-serif",
       justifyContent: "center",
        textAlign: "center", 
        position:"relative",
        bottom:"50px",
        fontSize: "500%",
        marginTop: "10%"
    }
}))
const Banner = () => {
    const classes = useStyles();
    return (
        <div className={classes.banner}>
            <Container>
                <Typography className={classes.bannerContent}>
                    Crypto Tracker
                    <p style={{ fontSize: "20%", color: "#E1D7C6", fontWeight: "lighter" }}>
                        Stay on top of the crypto market with our comprehensive tracker
                    </p>
                </Typography>
                <Carousel />
            </Container>
        </div>
    )
}

export default Banner