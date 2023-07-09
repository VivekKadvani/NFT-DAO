import React, { useContext, useState } from 'react';
import { AppContext } from '../App';
import { NavLink } from 'react-router-dom';
//MUI components
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
//images
import logo from '../images/logo.png';
//Wagmi
import { useAccount, useBalance, useConnect } from 'wagmi';
//componenets
import WalletConnect from './WalletConnect';
//toast
import fireToast from '../utils/fireToast';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
//utils function
import copyToClipboard from '../utils/copyAddress';

const Header = () => {
  //wagmi
  const { isConnected, address } = useAccount();
  //appcontext
  const { walletopen, setWalletOpen } = useContext(AppContext);
  //MUI
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
  const [menuToggle, setMenuToggle] = useState(false);
  const [profileDropdown, setDropdown] = useState(false);

  //metamask connectors

  const handleClickOpen = () => {
    setWalletOpen(true);
  };
  const handleCloseWallet = () => {
    setWalletOpen(false);
  };
  // window.ethereum.on('accountsChanged', (accounts) => {
  //   // setFlag(flag + 1);
  //   console.log('Accoount changed _________________________');
  // });
  // window.ethereum.on('chainChanged', (accounts) => {
  //   // setFlag(flag + 1);
  //   console.log('changed chain event ');
  //   if (accounts.length === 0) {
  //   }
  // });
  return (
    <div className="sm:px-8 md:px-10 lg:px-16 border-b border-gray-200 px-4 fixed top-0 w-full z-10 h-fit bg-white py-3.5">
      <div>
        <nav className=" flex justify-between">
          {/* logo and nav section  */}
          <div className="justify-self-start  flex items-center">
            <div className="flex">
              <NavLink to="/home" className="flex items-center">
                <div className="">
                  <img src={logo} alt="logo" className="h-14 " />
                </div>
                <div className="ml-2 text-white">
                  <p className="font-bold text-black text-3xl">NFT-DAO</p>
                </div>
              </NavLink>
            </div>
          </div>
          <div className="  flex items-center">
            <div className="flex">
              <NavLink to="/create" className="flex items-center">
                <div className="ml-2 text-white">
                  <p className=" text-black text-xl">Home</p>
                </div>
              </NavLink>
            </div>
          </div>
          {/* Wallet and cart section  */}
          <div className="flex justify-self-end">
            <div className=" bg-opacity-10 rounded-xl flex items-center bg-blue-500 h-14 bg-blur-xl border-2 border-gray-400">
              <div
                className="lg:flex md:flex  hidden text-gray-700 cursor-pointer"
                onClick={() => {
                  !isConnected
                    ? handleClickOpen()
                    : fireToast('success', 'Wallet already connected');

                  isConnected && copyToClipboard(address);
                }}
              >
                <p className="px-2">
                  {isConnected
                    ? address.slice(0, 6) + '...' + address.slice(-4)
                    : 'Connect Wallet'}
                </p>
              </div>
              {/* wallet popup dialog */}

              <Dialog
                fullScreen={fullScreen}
                open={walletopen}
                onClose={handleCloseWallet}
                aria-labelledby="responsive-dialog-title"
              >
                <WalletConnect />
              </Dialog>
              <div className="h-full profileGroup">
                <div className=" text-gray-600 border-solid border-gray-400 justify-end lg:border md:border lg:border-y-0 md:border-y-0 lg:border-r-0 md:border-r-0 h-full hidden md:flex lg:flex items-center border-opacity-100 mx-2 px-3 cursor-pointer">
                  <span className=" material-symbols-outlined">wallet</span>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </div>
    </div>
  );
};
export default Header;
