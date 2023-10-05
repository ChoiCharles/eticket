import { useState } from 'react';
import Web3 from 'web3';
import axios from 'axios';
import EticketJSON from '../contracts/Eticket.json';

const useMetaData = () => {
  const [metadata, setMetaData] = useState(undefined);
  const web3 = new Web3(window.ethereum);
  const eticketJSON: any = EticketJSON;

  // const getMetaData = async (_uri: string) => {
  //   try {
  //     const response = await axios.get(_uri);
  //     console.log(response.data);
  //     setMetaData(response.data);
  //   } catch (e) {
  //     console.error(e);
  //   }
  // };
  
  const connectIPFS = async (address:string) => {
    // 트랜젝션 해쉬값 입력 필요
    const _transactionHash: string = "0xd4f03d4a344ee5845e7a0d151f7fed26790c9de8db294e195820c800743e956c"

    const block = await window.ethereum.request({
      "method": "eth_getTransactionReceipt",
      "params": [
        _transactionHash
      ]
    })
    console.log(block)
    try {
      const contract = new web3.eth.Contract(eticketJSON.abi, block.contractAddress);
      contract.methods
        .tokenURI(51539607554)
        .call({
          from: address,
        })
        .then((res: any) => {
          console.log('res', res);
          setMetaData(res)
        });
    } catch (e) {
      console.error(e);
    }
  };

  return {
    metadata,
    connectIPFS,
  };
};

export default useMetaData;
