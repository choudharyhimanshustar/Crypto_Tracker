/* Used CreateContext to manage state globally */
import { React,useState, createContext,useEffect,useContext } from "react";

const Crypto = createContext()

const CreateContext = ({children}) => {
    /* Used state for currency and symbol */
    const [currency,setCurrency]=useState("INR");
    const [symbol,setSymbol]=useState("₹");

    useEffect(() => {
      
        if(currency==="INR")
        {
            setSymbol("₹");
        }
        else if(currency==="USD")
        {
            setSymbol('$');
        }
        else
        {
            setSymbol("€");
        }
      
    }, [currency])
    

  return (
   <Crypto.Provider value={{currency,symbol,setCurrency}}>
    {children}
   </Crypto.Provider>
  )
}

export default CreateContext;
export const CryptoState=()=>{
    return useContext(Crypto)
}