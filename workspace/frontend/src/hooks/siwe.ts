import axios, { AxiosRequestConfig } from 'axios';
import instance from 'apis/utils/instance';
import { SiweMessage } from 'siwe';
import { BrowserProvider, ethers } from 'ethers';
import useMetaMask from './metamask'


const siwe = () => {

  const metaMask = useMetaMask()

  const domain = "localhost";
  const origin = "https://localhost/login";

  const getSIWE = async () => {
    const challenge = await instance.post('/api/auth/challenge')
    console.log(challenge.data)
  
    // const address = '0xAbfDe2Db501B02007fE29c17F3b1b43AF1263f5b';
    const nonce = challenge.data.challengeWord;
    
    const browserProvider = new BrowserProvider(metaMask.provider as any)
    const signer = await browserProvider?.getSigner(metaMask.accounts[0])
    const address = await signer.getAddress();
    const siweMessage = new SiweMessage({
      domain,
      address,
      uri: origin,
      version: '1',
      chainId: 12345,
      nonce
    }).prepareMessage();
  
    const signature = await signer?.signMessage(siweMessage)
    console.log(signature)
    console.log(siweMessage);
    console.log('2', siweMessage)    
  
    const requestData = {
      'account': address.toLowerCase(),
      'challenge': challenge.data.challengeWordId,
      'siweMessage': ethers.hexlify(ethers.toUtf8Bytes(siweMessage)),
      'personalSign': signature
    };
  
    const config: AxiosRequestConfig = {
      method: 'post',
      url: '/api/auth/signin',
      headers: {
        'X-Authentication-Strategy': 'personal-sign'
      },
      data: requestData,
    };
    console.log(config)
  
    await axios(config)
    .then((response) => {
      console.log('res', response.data);
      localStorage.setItem('accesstoken', response.data.accessToken);
      localStorage.setItem('refreshtoken', response.data.refreshToken);
    })
    .catch((error) => {
      console.log('err', error);
    });
  }
  return { getSIWE };
}

export default siwe;