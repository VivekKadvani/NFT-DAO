import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { AppContext } from '../App';
//utils
import contractInstance from '../utils/contractInstance';
import fireToast from '../utils/fireToast';
import extractError from '../utils/extractError';
//MUI
import Dialog from '@mui/material/Dialog';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import BuyNFT from './BuyNFT';
import Loader from './Loader';
//wagmi
import { useAccount, useBalance, useConnect } from 'wagmi';
import Popup from './Popup';

const ProposalDetail = () => {
  const { isConnected, address } = useAccount();
  const { id } = useParams();
  const [proposalData, setProposalData] = useState();
  const [loading, setLoading] = useState(false);
  const [update, setUpdate] = useState(0);
  const [isHolder, setIsHolder] = useState(false);
  const { buyNFTDialog, setBuyNFTDialog } = useContext(AppContext);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    async function getProposalData() {
      try {
        setLoading(true);
        const { contract, networkId, signerAddress } = await contractInstance();
        const proposalData = await contract.proposals(id);
        let balanc = await contract.balanceOf(signerAddress);
        if (balanc > 0) setIsHolder(true);
        else setIsHolder(false);
        setProposalData(proposalData);
      } catch (e) {
        fireToast('error', 'Fetching Proposal Detail Failed.');
      } finally {
        setLoading(false);
      }
    }
    getProposalData();
  }, [update]);

  const handleAgrreVote = async () => {
    try {
      setLoading(true);
      const { contract, networkId, signerAddress } = await contractInstance();
      const votetx = await contract.castVote(id, true);
      await votetx.wait();
    } catch (e) {
      let error = await extractError(e);
      fireToast('error', error);
    } finally {
      setLoading(false);
      setUpdate(update + 1);
    }
  };
  const handleDisagreeVote = async () => {
    try {
      setLoading(true);
      const { contract, networkId, signerAddress } = await contractInstance();
      const votetx = await contract.castVote(id, false);
      await votetx.wait();
    } catch (e) {
      let error = await extractError(e);
      fireToast('error', error);
    } finally {
      setLoading(false);
      setUpdate(update + 1);
    }
  };

  return (
    <>
      {isConnected ? (
        <div className="h-fit pt-20 flex-grow">
          {loading ? (
            <Loader />
          ) : (
            <>
              {proposalData && (
                <div className="px-16 my-8">
                  <div className="bg-gray-200 h-fit rounded-2xl p-4">
                    <div className=" border-b  py-2 bg-gray-300 rounded-xl p-4 mb-4">
                      <p className="text-xl text-gray-500 py-2 ">
                        Proposal Title
                      </p>
                      <p className="text-xl py-2">{proposalData?.title}</p>
                    </div>
                    <div className=" py-2 bg-gray-300 rounded-xl p-4 mb-4">
                      <p className="text-xl text-gray-500 py-2">Proposal ID</p>
                      <p className="text-xl py-2">
                        {parseInt(proposalData?.id)}
                      </p>
                    </div>
                    <div className="py-4 bg-gray-300 rounded-xl p-4 mb-4">
                      <p className=" text-gray-500 py-2 text-xl">Description</p>
                      <p className="py-2 text-xl">{proposalData.description}</p>
                    </div>
                    <div className="bg-gray-300 rounded-xl p-4 mb-4">
                      <p className=" text-gray-500  py-2 text-xl">Status</p>
                      <div className="flex items-center gap-2 py-2 ">
                        {!proposalData.closed && !proposalData.passed ? (
                          <div className="h-4 w-4 rounded-full bg-gray-600"></div>
                        ) : proposalData.closed && !proposalData.passed ? (
                          <div className="h-4 w-4 rounded-full bg-red-600"></div>
                        ) : (
                          <div className="h-4 w-4 rounded-full bg-green-600 mt-2"></div>
                        )}

                        {!proposalData.closed && !proposalData.passed ? (
                          <p className="text-gray-600">Running</p>
                        ) : proposalData.closed && !proposalData.passed ? (
                          <p className="text-red-500 font-semibold">
                            Not Passed
                          </p>
                        ) : (
                          <p className="h-4 w-4 rounded-full text-xl font-semibold text-green-600">
                            Passed
                          </p>
                        )}
                      </div>
                    </div>
                    {!proposalData.passed && !proposalData.closed && (
                      <>
                        {isHolder && isHolder ? (
                          <div className="py-4 bg-gray-300 rounded-xl p-4 mb-4">
                            <p className=" text-gray-500 py-2 text-xl">
                              Your Opinion
                            </p>
                            <div className="grid grid-cols-2 gap-4 ">
                              <button
                                className="w-full rounded-xl bg-black p-4  text-green-600 text-xl font-semibold hover:-translate-y-1 transition-all duration-300 drop-shadow-md "
                                disabled={proposalData.closed}
                                onClick={() => {
                                  handleAgrreVote();
                                }}
                              >
                                Agree
                              </button>
                              <button
                                className="w-full rounded-xl bg-black p-4  text-red-600 text-xl font-semibold hover:-translate-y-1 transition-all duration-300 drop-shadow-md"
                                disabled={proposalData.closed}
                                onClick={() => {
                                  handleDisagreeVote();
                                }}
                              >
                                Disagree
                              </button>
                            </div>
                          </div>
                        ) : (
                          <div className="py-4 bg-gray-300 rounded-xl p-4 mb-4">
                            <p className=" text-gray-500 py-2 text-xl">
                              Buy NFT{' '}
                            </p>
                            <p className="text-gray-800 py-4 my-4 text-xl ">
                              If you wish to become a stakeholder for this DAO,
                              you have to buy NFT. For this you have to pay
                              stake price 0.001 ETH. After purchasing NFT you
                              have rights to Vote in this DAO.
                            </p>
                            <div className=" gap-4">
                              <div className="gap-4 flex flex-col  justify-between col-span-2">
                                <button
                                  className="w-1/2 rounded-xl bg-black p-4 self-center text-white text-xl font-semibold hover:text-yellow-400  hover:-translate-y-1 transition-all duration-300 drop-shadow-md "
                                  disabled={proposalData.closed}
                                  onClick={() => {
                                    setBuyNFTDialog(true);
                                  }}
                                >
                                  Buy NFT
                                </button>
                              </div>
                              <Dialog
                                fullScreen={fullScreen}
                                open={buyNFTDialog}
                                onClose={() => {
                                  setBuyNFTDialog(false);
                                  setUpdate(update + 1);
                                }}
                                aria-labelledby="responsive-dialog-title"
                              >
                                <BuyNFT />
                              </Dialog>
                            </div>
                          </div>
                        )}
                      </>
                    )}
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      ) : (
        <Popup />
      )}
    </>
  );
};

export default ProposalDetail;
