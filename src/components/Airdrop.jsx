import React, { useEffect, useState } from 'react';
//utils
import contractInstance from '../utils/contractInstance';
import fireToast from '../utils/fireToast';
const Airdrop = () => {
  const [addressData, setAddressData] = useState([]);
  const [address, setCurrentAddress] = useState('');
  const [addressError, setError] = useState('');
  const [maxSupply, setTotalSupply] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function getProposalData() {
      const { contract, networkId, signerAddress } = await contractInstance();
      let maxSupply = parseInt(await contract.maxSupply());
      setTotalSupply(maxSupply);
    }
    getProposalData();
  }, []);

  const setAddress = (address) => {
    const regex = /^0x[a-fA-F0-9]{40}$/;
    if (address !== '' && regex.test(address)) {
      if (addressData.length < maxSupply) {
        setAddressData([...addressData, address]);
        setError('');
        console.log(maxSupply);
      } else {
        setError(
          'You can not enter more than Total Supply or Increase Total Supply',
        );
      }
    } else {
      setError('*Enter Valid Address.');
    }
  };
  const removeAddress = (index) => {
    const indexToRemove = index; // Index of the object to remove
    if (indexToRemove >= 0 && indexToRemove < addressData.length) {
      const newArray = [...addressData];
      newArray.splice(indexToRemove, 1);
      setAddressData(newArray);
    }
  };
  const handleAirDrop = async () => {
    try {
      setLoading(true);
      const { contract, networkId, signerAddress } = await contractInstance();
      const airdroptx = await contract.airDrop(addressData);
      await airdroptx.wait();
    } catch (e) {
      fireToast('error', 'Airdrop NFT failed.');
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="h-full pt-20">
      <div className="bg-gray-200  mx-16 p-4 mt-8 rounded-xl">
        <div className="p-4 flex justify-between">
          <p className="text-xl font-semibold ">AirDrop NFT</p>
          {addressData?.length > 0 ? (
            <button
              className="bg-black rounded-xl text-white p-4 font-semibold "
              onClick={() => {
                handleAirDrop();
              }}
            >
              Start Airdrop
            </button>
          ) : (
            <button
              className="bg-black opacity-50 rounded-xl text-white p-4 font-semibold "
              disabled
            >
              Start Airdrop
            </button>
          )}
        </div>
        <div className="p-4 w-full">
          <p className="text-xl">Enter Address</p>
          <div className="flex gap-6">
            <input
              type="text"
              placeholder="Address"
              className="w-full rounded-xl p-2 outline-0"
              onChange={(event) => {
                setCurrentAddress(event.target.value);
              }}
            />

            <button
              className="p-4 rounded-xl bg-black text-green-500"
              onClick={() => {
                setAddress(address);
              }}
            >
              Add
            </button>
          </div>
          <span className="m-4 text-red-600">{addressError}</span>
        </div>
        <div>
          {addressData.length > 0 ? (
            <div className="bg-transparent border p-4 gap-2 border-gray-400 rounded-xl my-2 ">
              {addressData.map((e, index) => {
                return (
                  <div
                    key={index}
                    className="bg-gray-400 p-2 m-4 rounded-md text-center flex items-center justify-between"
                  >
                    <div>
                      <p>{e}</p>
                    </div>
                    <div>
                      <span
                        className="material-symbols-outlined cursor-pointer"
                        onClick={() => {
                          removeAddress(index);
                        }}
                      >
                        close
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
};

export default Airdrop;