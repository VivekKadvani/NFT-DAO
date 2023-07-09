import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
//utils
import contractInstance from '../utils/contractInstance';
import fireToast from '../utils/fireToast';
import extractError from '../utils/extractError';

const ProposalDetail = () => {
  const { id } = useParams();
  const [proposalData, setProposalData] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function getProposalData() {
      const { contract, networkId, signerAddress } = await contractInstance();
      const proposalData = await contract.proposals(id);
      setProposalData(proposalData);
    }
    getProposalData();
  }, []);

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
    }
  };
  return (
    <div className="h-fit pt-20">
      {proposalData && (
        <div className="px-16 my-8">
          <div className="bg-gray-200 h-fit rounded-2xl p-4">
            <div className=" border-b border-gray-300 py-2 bg-slate-300 rounded-xl p-4 mb-4">
              <p className="text-xl text-gray-500 ">Proposal Title</p>
              <p className="text-xl">{proposalData?.title}</p>
            </div>
            <div className=" py-2 bg-slate-300 rounded-xl p-4 mb-4">
              <p className="text-xl text-gray-500 ">Proposal ID</p>
              <p className="text-xl">{parseInt(proposalData?.id)}</p>
            </div>
            <div className="py-4 bg-slate-300 rounded-xl p-4 mb-4">
              <p className=" text-gray-500 py-2 text-xl">Description</p>
              <p className="py-2">{proposalData.description}</p>
            </div>
            <div className="bg-slate-300 rounded-xl p-4 mb-4">
              <p className=" text-gray-500  py-2 text-xl">Status</p>
              <div className="flex items-center gap-2 py-2">
                {!proposalData.closed && !proposalData.passed ? (
                  <div className="h-4 w-4 rounded-full bg-gray-600"></div>
                ) : proposalData.closed && !proposalData.passed ? (
                  <div className="h-4 w-4 rounded-full bg-red-600"></div>
                ) : (
                  <div className="h-4 w-4 rounded-full bg-green-600"></div>
                )}

                {!proposalData.closed && !proposalData.passed ? (
                  <p className="text-gray-600">Running</p>
                ) : proposalData.closed && !proposalData.passed ? (
                  <p className="text-gray-500">Not Passed</p>
                ) : (
                  <p className="h-4 w-4 rounded-full bg-green-600">Passed</p>
                )}
              </div>
            </div>

            <div className="py-4 bg-slate-300 rounded-xl p-4 mb-4">
              <p className=" text-gray-500 py-2 text-xl">Your Opinion</p>
              <div className="grid grid-cols-2 gap-4 ">
                <button
                  className="w-full rounded-xl bg-black p-4  text-green-600 text-xl font-semibold "
                  disabled={proposalData.closed}
                  onClick={() => {
                    handleAgrreVote();
                  }}
                >
                  Agree
                </button>
                <button
                  className="w-full rounded-xl bg-black p-4  text-red-600 text-xl font-semibold"
                  disabled={proposalData.closed}
                  onClick={() => {
                    handleDisagreeVote();
                  }}
                >
                  Disagree
                </button>
              </div>
            </div>
            <div className="py-4 bg-slate-300 rounded-xl p-4 mb-4">
              <p className=" text-gray-500 py-2 text-xl">Buy NFT </p>
              <p className="text-gray-600 py-2">
                If you wish to become a stakeholder for this DAO, you have to
                buy NFT. For this you have to pay stake price 0.001 ETH. After
                purchasing NFT you have rights to Vote in this DAO.
              </p>
              <div className="grid lg:grid-cols-3 sm:grid-cols-2  gap-4">
                <div>
                  {' '}
                  <img
                    src="https://coffee-different-cat-534.mypinata.cloud/ipfs/QmPBpgrMu1WTqwxUXSzgA36BuxqDWWSJVZrdgXjPz6kBuJ"
                    className="rounded-xl"
                  />
                </div>
                <div className="gap-4 flex flex-col  justify-between col-span-2">
                  <div>
                    <p>price</p>
                  </div>
                  <button
                    className="w-1/2 rounded-xl bg-black p-4 self-center text-white text-xl font-semibold "
                    disabled={proposalData.closed}
                    onClick={() => {
                      handleAgrreVote();
                    }}
                  >
                    Buy NFT
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProposalDetail;
