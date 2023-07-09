import React, { useContext, useEffect } from 'react';
import { AppContext } from '../App';
//images
import MetaMask from '../images/MetaMask.png';
import TrustWallet from '../images/TrustWallet.png';
import CoinbaseWallet from '../images/coinbase.png';
//MUI component
import Button from '@mui/material/Button';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
//Wagmi

import { useAccount, useBalance, useConnect } from 'wagmi';
// import { ethers } from 'ethers';
//toast
import fireToast from '../utils/fireToast';

const WalletConnect = () => {
  const { walletopen, setWalletOpen } = useContext(AppContext);
  //Wagmi wallet connection
  const { connect, connectors } = useConnect();
  const { isConnected, address } = useAccount();
  const { data, isError, isLoading } = useBalance({ address });
  //MUI constant
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  const handleClickOpen = () => {
    setWalletOpen(true);
  };
  const handleClose = () => {
    setWalletOpen(false);
  };

  useEffect(() => {
    if (isConnected) {
      console.log('yes it is working ');
      handleWalletConnect();
    } else {
      console.log('isConnect is not true');
    }
    console.log('inside useeffect : ', isConnected);
  }, [isConnected]);

  function connectWallet() {
    const connectrespo = connect({
      connector: connectors[0],
    });
  }

  const handleWalletConnect = async () => {
    try {
      connectWallet();
    } catch (e) {
      fireToast('error', 'Wallet connection error');
      // console.log(e);
    } finally {
      handleClose();
    }
  };

  return (
    <div>
      <DialogTitle id="responsive-dialog-title">
        <p className="font-semibold text-2xl">Connect Wallet</p>
      </DialogTitle>
      <DialogContent>
        <div className="flex flex-col cursor-pointer ">
          <div
            className="h-16 border bg-gray-100 m-2 p-2 rounded-xl flex items-center hover:bg-gray-300 transition-all duration-300  "
            onClick={() => {
              connectWallet();
            }}
          >
            <img src={MetaMask} alt="wallet" className="h-full mx-6" />
            <p className="text-xl mx-8 font-medium text-gray-800">
              Metamask Wallet{' '}
            </p>
          </div>
          <div
            className="h-16 border bg-gray-100 m-2 p-2 rounded-xl flex items-center hover:bg-gray-300 transition-all duration-300"
            onClick={async () => {
              // connect({ connector: connectors[0] });
              connectWallet();
            }}
          >
            <img src={TrustWallet} alt="wallet" className="h-full mx-6" />
            <p className="text-xl mx-8 font-medium text-gray-800">
              Trust Wallet{' '}
            </p>
          </div>
          <div
            className="h-16 border bg-gray-100 hover:bg-gray-300 transition-all duration-300 m-2 p-2 rounded-xl flex items-center "
            onClick={() => {
              connectWallet();
            }}
          >
            <img src={CoinbaseWallet} alt="wallet" className="h-full mx-6" />
            <p className="text-xl mx-8 font-medium text-gray-800">
              Coinbase Wallet{' '}
            </p>
          </div>
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
      </DialogActions>
    </div>
  );
};

export default WalletConnect;
