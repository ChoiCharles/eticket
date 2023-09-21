// import { useState } from "react"
import Web3 from 'web3'
import useAccount from './useAccount'
import axios from 'axios'

import EticketJSON from '../contracts/Eticket.json'

export const useMetaData = () => {
  const { account } = useAccount()
  // const [metadata, setMetaData] = useState<any>(undefined)

  const web3 = new Web3(window.ethereum)
  const eticketJSON: any[] = EticketJSON
  const contractAddress: string = '0xC80aC17c73AcC311ececb2A75eC3170D6C73fEa6'

  console.log('1', eticketJSON)

  const connectIPFS = async () => {
    try {
      const contract = new web3.eth.Contract(eticketJSON, contractAddress)
      contract.methods.tokenURI(4294967308).call({
        from:account,
      })
      .then((res:any) => {
        console.log('res', res)
        getMetaData(res)
      }) 
    }
    catch(e) {
      console.error(e);
    }
  }
  
  const getMetaData = async (_uri : string) => {
    try {
      const response = await axios.get(_uri);
      console.log(response.data)
      // setMetaData(response.data);
    }
    catch(e) {
      console.error(e);
    }
  }

  return {
    // metadata, connectIPFS
    connectIPFS
  }
}