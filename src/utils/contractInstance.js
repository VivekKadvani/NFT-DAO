import { ethers } from 'ethers';
import { ABI } from '../ABI/ABI.js';
async function contractInstance() {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const contractAddress = '0xD47A9F6Ad1ec0e35Bbb8A7a401eB344A0568B71F';
  await provider.send('eth_requestAccounts', []);
  const signer = provider.getSigner();
  const signerAddress = await signer.getAddress();
  const network = await provider.getNetwork();
  const networkId = network.chainId;
  const contract = new ethers.Contract(contractAddress, ABI, signer);
  return { contract, networkId, signerAddress };
}

export default contractInstance;
