import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../App';
import contractInstance from '../utils/contractInstance';
import fireToast from '../utils/fireToast';
import Loader from './Loader';

const IncreaseTotalSupply = () => {
  const [supply, setSupply] = useState(0);
  const { supplydialogopen, setsupplyDialogOpen } = useContext(AppContext);
  const [supplyError, setSupplyError] = useState('');
  const [currentSupply, setCurrentSupply] = useState(0);
  const [maxSupply, setMaxSupply] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getContractData = async () => {
      try {
        setLoading(true);
        const { contract, networkId, signerAddress } = await contractInstance();
        let CurrentSupply = parseInt(await contract.totalSupply());
        setCurrentSupply(CurrentSupply);
        let maxSupply = parseInt(await contract.maxSupply());
        setMaxSupply(maxSupply);
      } catch (e) {
        fireToast('error', 'Fetch Data Failed');
      } finally {
        setLoading(false);
      }
    };
    getContractData();
  }, []);
  const handleIncreaseSupply = async () => {
    const regex = /^[0-9]+$/;
    try {
      setLoading(true);
      if (regex.test(supply) && supply > 0) {
        setSupplyError('');
        const { contract, networkId, signerAddress } = await contractInstance();
        const createPropTx = await contract.increaseTotalSupply(supply);
        await createPropTx.wait();
      } else {
        setSupplyError('Please enter valid Supply.');
      }
    } catch (e) {
      fireToast('error', 'Increase Supply Failed');
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="xs:w-full md:w-96">
      <div className="p-8 w-full">
        <div className="mb-8 w-full">
          <p className="text-3xl font-semibold">Increase Total Supply</p>
        </div>
        <div>
          <div className="rounded-xl bg-gray-200 p-4 my-2 flex justify-between">
            <p className="text-xl">Current Holders</p>
            <p className="text-xl font-semibold">{currentSupply}</p>
          </div>
          <div className="rounded-xl bg-gray-200 p-4 my-2 flex justify-between">
            <p className="text-xl">Maximum Holders</p>
            <p className="text-xl font-semibold">{maxSupply}</p>
          </div>
          <div className="rounded-xl bg-gray-200 p-4 my-2 flex justify-between">
            <p className="text-xl">Available NFT Holdings</p>
            <p className="text-xl font-semibold">{maxSupply - currentSupply}</p>
          </div>
        </div>
        <div className="mb-4 w-full">
          <p className="text-xl">Enter Supply</p>
          <input
            type="text"
            placeholder="Enter title here"
            className="outline-0 bg-gray-200 rounded-lg p-4 w-full "
            onChange={(event) => {
              setSupply(event.target.value);
            }}
          />
          <span className="text-red-600">{supplyError}</span>
        </div>
        {loading ? (
          <Loader />
        ) : (
          <div className="mt-4 flex justify-center">
            <button
              className="rounded-xl p-4 bg-black text-white px-8 m-2 hover:-translate-y-1 transition-all duration-200"
              onClick={() => {
                handleIncreaseSupply();
              }}
            >
              Create
            </button>
            <button
              className="rounded-xl p-4 bg-gray-300 px-8 m-2 hover:-translate-y-1 transition-all duration-200"
              onClick={() => {
                setsupplyDialogOpen(false);
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

export default IncreaseTotalSupply;
