import React, { useContext, useState } from 'react';
import { AppContext } from '../App';
import contractInstance from '../utils/contractInstance';
import fireToast from '../utils/fireToast';
import Loader from './Loader';

const CreateProposal = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const { proposaldialogopen, setProposalDialogOpen } = useContext(AppContext);
  const [titleError, setTitleError] = useState('');
  const [descError, setDescriptionError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleCreateProposal = async () => {
    try {
      setLoading(true);
      if (title.length > 0 || description.length > 0) {
        if (title.length > 0) {
          setTitleError('');
          if (description.length > 0) {
            setDescriptionError('');
            const { contract, networkId, signerAddress } =
              await contractInstance();
            const createPropTx = await contract.createProposal(
              title,
              description,
            );
            await createPropTx.wait();
            setProposalDialogOpen(false);
          } else {
            setDescriptionError('Please enter valid description. ');
          }
        } else {
          setTitleError('Please enter valid Title.');
        }
      } else {
        setDescriptionError('Please enter valid description. ');
        setTitleError('Please enter valid Title.');
      }
    } catch (e) {
      fireToast('error', 'Create Proposal Failed');
    } finally {
      setLoading(false);
      
    }
  };
  return (
    <div className="xs:w-full md:w-96">
      <div className="p-8 w-full">
        <div className="mb-8 w-full">
          <p className="text-3xl font-semibold">Create Proposal</p>
        </div>
        <div className="mb-4 w-full">
          <p className="text-xl">Enter Title</p>
          <input
            type="text"
            placeholder="Enter title here"
            className="outline-0 bg-gray-200 rounded-lg p-4 w-full "
            onChange={(event) => {
              setTitle(event.target.value);
            }}
          />
          <span className="text-red-600">{titleError}</span>
        </div>
        <div>
          <p className="text-xl">Enter Decsription</p>
          <textarea
            placeholder="Enter title here"
            className="outline-0 bg-gray-200 rounded-lg p-4 w-full "
            onChange={(event) => {
              setDescription(event.target.value);
            }}
          />
          <span className="text-red-600">{descError}</span>
        </div>
        {loading ? (
          <Loader />
        ) : (
          <div className="mt-4 flex justify-center">
            <button
              className="rounded-xl p-4 bg-black text-white px-8 m-2 hover:-translate-y-1 transition-all duration-200"
              onClick={() => {
                handleCreateProposal();
              }}
            >
              Create
            </button>
            <button
              className="rounded-xl p-4 bg-gray-300 px-8 m-2 hover:-translate-y-1 transition-all duration-200"
              onClick={() => {
                setProposalDialogOpen(false);
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

export default CreateProposal;
