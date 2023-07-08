import { ethers } from 'ethers';
import { ABI } from '../ABI/';
async function contractInstance() {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const contractAddress = '0xDc8727A5E070464cEE9545E1865d65d92CA14Dc7';
  await provider.send('eth_requestAccounts', []);
  const signer = provider.getSigner();
  const signerAddress = await signer.getAddress();
  const network = await provider.getNetwork();
  const networkId = network.chainId;
  const contract = new ethers.Contract(contractAddress, ABI, signer);
  return { contract, networkId, signerAddress };
}

export default contractInstance;
