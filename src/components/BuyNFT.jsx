import React, { useContext, useState } from 'react';
import { AppContext } from '../App';
import contractInstance from '../utils/contractInstance';
import fireToast from '../utils/fireToast';
import { ethers } from 'ethers';
import Loader from './Loader';

const BuyNFT = () => {
  const { buyNFTDialog, setBuyNFTDialog } = useContext(AppContext);
  const [loading, setLoading] = useState(false);
  const [imgloading, imgsetLoading] = useState(true);

  const handleBuyNFT = async () => {
    try {
      setLoading(true);
      const { contract, networkId, signerAddress } = await contractInstance();
      let buyNFTtx = await contract.buyNFT({
        value: ethers.utils.parseEther('0.001'),
      });
      await buyNFTtx.wait();
    } catch (e) {
      fireToast('error', 'Buy NFT Failed.');
    } finally {
      setLoading(false);
    }
  };
  return (
    <div>
      <div className="p-8">
        <p className="text-2xl font-semibold mb-2 ">Buy NFT</p>
        <div>
          {imgloading && <Loader />}
          <img
            src="https://coffee-different-cat-534.mypinata.cloud/ipfs/QmPBpgrMu1WTqwxUXSzgA36BuxqDWWSJVZrdgXjPz6kBuJ"
            className="rounded-xl lg:h-64  md:h-64  sm:h-full"
            onLoad={() => imgsetLoading(false)}
          />
        </div>
        <div>
          <div className="flex justify-between mt-4 p-2">
            <p className="text-xl font-semibold">NFT-DAO</p>
            <p className="text-xl text-gray-500">0.001 ETH</p>
          </div>
        </div>
        {loading ? (
          <Loader />
        ) : (
          <div className="mt-4 flex justify-center">
            <button
              className="rounded-xl p-4 bg-black text-white px-8 m-2 hover:-translate-y-1 transition-all duration-200"
              onClick={() => {
                handleBuyNFT();
              }}
            >
              Confirm
            </button>
            <button
              className="rounded-xl p-4 bg-gray-300 px-8 m-2 hover:-translate-y-1 transition-all duration-200"
              onClick={() => {
                setBuyNFTDialog(false);
              }}
            >
              Cancel
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default BuyNFT;
