import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
//utils
import contractInstance from '../utils/contractInstance';

const ProposalDetail = () => {
  const { id } = useParams();
  console.log(id);
  const [proposalData, setProposalData] = useState();

  useEffect(() => {
    async function getProposalData() {
      const { contract, networkId, signerAddress } = await contractInstance();
      const proposalData = await contract.proposals(id);
      console.log(proposalData);
      setProposalData(proposalData);
      console.log('this is final data :', proposalData);
    }
    getProposalData();
  }, []);
  return (
    <div className="h-full pt-20">
      {proposalData && (
        <div className="px-16 my-8">
          <div className="bg-gray-400 h-fit rounded-2xl p-4">
            <div className=" border-b border-gray-200 py-2">
              <p className="text-xl">Proposal Title</p>
              <p className="text-xl">{proposalData?.title}</p>
            </div>
            <div className=" py-2">
              <p className="text-xl">Proposal ID</p>
              <p className="text-xl">{parseInt(proposalData?.id)}</p>
            </div>
            <div className="py-4">
              <p className="border-b border-gray-200 py-2 text-xl">
                Description
              </p>
              <p className="py-2">{proposalData.description}</p>
            </div>
            <div className="">
              <p className="border-b border-gray-200 py-2 text-xl">Status</p>
              <div className="flex items-center gap-2 py-2">
                {!proposalData.closed ? (
                  <div className="h-4 w-4 rounded-full bg-green-800"></div>
                ) : (
                  <div className="h-4 w-4 rounded-full bg-gray-500"></div>
                )}

                {!proposalData.closed ? (
                  <p className="text-green-800">Running</p>
                ) : (
                  <p className="text-gray-500">Completed</p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProposalDetail;
