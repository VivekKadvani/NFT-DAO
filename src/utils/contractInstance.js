import { ethers } from 'ethers';
import { ABI } from '../ABI/ABI.js';
async function contractInstance() {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const contractAddress = '0x1b52Da3B1880f879626BA1BEA70f655e6295E352';
  await provider.send('eth_requestAccounts', []);
  const signer = provider.getSigner();
  const signerAddress = await signer.getAddress();
  const network = await provider.getNetwork();
  const networkId = network.chainId;
  const contract = new ethers.Contract(contractAddress, ABI, signer);
  return { contract, networkId, signerAddress };
}

export default contractInstance;
