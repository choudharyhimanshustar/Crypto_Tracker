/* eslint-disable no-labels */
/* eslint-disable no-unused-labels */
/* eslint-disable no-unused-expressions */
/* eslint-disable react-hooks/rules-of-hooks */
import React from 'react'
import { makeStyles } from '@material-ui/core';


/* Component for providing styling to the button in the coin page */

const selectButton = ({children,selected,onClick}) => {
    const useStyles=makeStyles({
        selectedButton:{
            display:"flex",
            border:"2px solid gold",
            borderRadius:5,
            backgroundColor:selected?"gold":"",
            color:selected?"black":"",
            width:"12%",
            height:"102%",
            cursor: "pointer",
            fontFamily:"Lato",
            "&:hover": {
              backgroundColor: "gold",
              color: "black",
            },
            paddingLeft:"5%",
            paddingRight:"5%"
        },
    })
    const classes=useStyles();

  return ( 
    <span onClick={onClick} className={classes.selectedButton}>{children}</span>
  )
}

export default selectButton
