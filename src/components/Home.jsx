import React, { useContext, useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
//images
import { AppContext } from '../App';
//images
//MUI
import Dialog from '@mui/material/Dialog';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
//wagmi
import { useAccount, useBalance, useConnect } from 'wagmi';
//utils
import contractInstance from '../utils/contractInstance';
import CreateProposal from './CreateProposal';
import IncreaseTotalSupply from './IncreaseTotalSupply';
import fireToast from '../utils/fireToast';
import Loader from './Loader';
//wagmi
import Popup from './Popup';
const Home = () => {
  //owner
  const owner = '0xC9399199f40686cfacF7Ae7555Ef0DEfa0487Ebe';
  //wagmi
  const { isConnected, address } = useAccount();
  //appcontext
  const {
    walletopen,
    setWalletOpen,
    proposaldialogopen,
    setProposalDialogOpen,
    supplydialogopen,
    setsupplyDialogOpen,
  } = useContext(AppContext);
  //MUI
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
  //loader
  const [loading, setLoading] = useState(false);
  //contract data
  const status = false;
  const [proposalData, setProposalData] = useState();
  useEffect(() => {
    async function getProposalData() {
      try {
        setLoading(true);
        const { contract, networkId, signerAddress } = await contractInstance();
        const totalProposal = parseInt(await contract.proposalCounter());
        const proposalArray = [];
        for (let i = 1; i <= totalProposal; i++) {
          const proposalData = await contract.proposals(i);
          proposalArray.push(proposalData);
        }
        setProposalData(proposalArray);
      } catch (e) {
        fireToast('error', 'Failed Loading Proposal Data.');
      } finally {
        setLoading(false);
      }
    }
    getProposalData();
  }, [proposaldialogopen]);
  return (
    <div className="h-fit pt-20 flex-grow">
      {isConnected ? (
        <div className=" w-full h-fit mt-4 flex flex-col gap-5 ">
          <div className="sm:px-8 md:px-10 lg:px-16 px-4 ">
            {/* Owner section */}
            {address === owner ? (
              <div className="text-left m-2  grid lg:grid-cols-3 :grid-cols-1 gap-4">
                <NavLink to="/airdrop">
                  <div className="rounded-xl bg-gray-200 transform-gpu hover:-translate-y-1 transition-all duration-200 drop-shadow-sm ">
                    <p className="text-2xl text-black p-4 font-semibold ">
                      Air Drop
                    </p>
                    <p className="text-lg text-gray-700 p-4">
                      Use this function for Air Drop NFT to send NFT to all
                      given user list.
                    </p>
                  </div>
                </NavLink>

                <div
                  className="rounded-xl bg-gray-200 transform-gpu hover:-translate-y-1 transition-all duration-200 drop-shadow-sm "
                  onClick={() => {
                    setProposalDialogOpen(true);
                  }}
                >
                  <p className="text-2xl text-black p-4 font-semibold">
                    Create Proposal
                  </p>
                  <p className="text-lg text-gray-700 p-4">
                    You can create new proposal by giving title and description.
                  </p>
                </div>
                <Dialog
                  fullScreen={fullScreen}
                  open={proposaldialogopen}
                  onClose={() => setProposalData(false)}
                  aria-labelledby="responsive-dialog-title"
                >
                  <CreateProposal />
                </Dialog>
                <div
                  className="rounded-xl bg-gray-200 transform-gpu hover:-translate-y-1 transition-all duration-200  "
                  onClick={() => {
                    setsupplyDialogOpen(true);
                  }}
                >
                  <p className="text-2xl text-black p-4 font-semibold">
                    Increase NFT Holder
                  </p>
                  <p className="text-lg text-gray-700 p-4">
                    You can Increase size of stakeholder by Increase
                    totalsupply.
                  </p>
                </div>
                <Dialog
                  fullScreen={fullScreen}
                  open={supplydialogopen}
                  onClose={() => setsupplyDialogOpen(false)}
                  aria-labelledby="responsive-dialog-title"
                >
                  <IncreaseTotalSupply />
                </Dialog>
              </div>
            ) : (
              <></>
            )}

            {/* current proposal */}
            <div className="px-2 border-b border-gray-200 mt-8">
              <p className="text-3xl p-2 my-4">Current Proposal</p>
            </div>
            <div className=" m-2 ">
              {loading ? (
                <Loader />
              ) : (
                <>
                  {' '}
                  {proposalData &&
                    proposalData.map((proposal, key) => {
                      return (
                        <NavLink
                          index={key}
                          to={`/proposalDetail/${proposal.id}`}
                        >
                          <div className="bg-gray-200 hover:bg-gray-300 transition-all transform-gpu duration-200 w-full rounded-xl my-3">
                            <div className="flex justify-between">
                              <p className="text-lg font-medium p-4">
                                {proposal.title}
                              </p>
                              <div className="p-4 flex items-center gap-2">
                                {!proposal.closed && !proposal.passed ? (
                                  <p className="text-gray-600">Running</p>
                                ) : proposal.closed && !proposal.passed ? (
                                  <p className="text-red-500 font-semibold">
                                    Not Passed
                                  </p>
                                ) : (
                                  <p className="font-semibold text-green-600">
                                    Passed
                                  </p>
                                )}
                                {!proposal.closed && !proposal.passed ? (
                                  <div className="h-4 w-4 rounded-full bg-green-600"></div>
                                ) : proposal.closed && !proposal.passed ? (
                                  <div className="h-4 w-4 rounded-full bg-red-600"></div>
                                ) : (
                                  <div className="h-4 w-4 rounded-full bg-green-600 "></div>
                                )}
                              </div>
                            </div>
                            <div>
                              <p className="text-base text-gray-500 p-4">
                                {proposal.description}
                              </p>
                            </div>
                          </div>
                        </NavLink>
                      );
                    })}
                </>
              )}
            </div>
          </div>
        </div>
      ) : (
        <Popup />
      )}
    </div>
  );
};

export default Home;
