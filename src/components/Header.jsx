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
  const [profileDropdown, setDropdown] = useState(false);
  //mobile menu
  const [menuToggle, setMenuToggle] = useState(false);
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
    <>
      {menuToggle ? (
        <div className="py-4 px-4 text-black h-screen">
          <div className="flex flex-col justify-between h-full">
            <div>
              <nav className=" flex lg:grid lg:grid-cols-3 justify-between">
                {/* logo and nav section  */}
                <NavLink to="/home" className="flex items-center">
                  <div className="justify-between  flex items-center">
                    <div className="h-14 w-14">
                      <img src={logo} alt="logo" className="h-fit w-fit" />
                    </div>
                    <div className="ml-2 text-black">
                      <p className="font-bold text-black text-3xl">NFT-DAO</p>
                    </div>
                  </div>
                </NavLink>
                <div className="text-black p-2 pt-2 px-3 mx-2  rounded-lg h-fit bg-gray-200 md:hidden lg:hidden">
                  <button onClick={() => setMenuToggle(!menuToggle)}>
                    <span
                      className="material-symbols-outlined"
                      onClick={() => setMenuToggle(!menuToggle)}
                    >
                      close
                    </span>
                  </button>
                </div>
              </nav>
            </div>
            <div className="h-full py-6">
              <NavLink to="/create" className="">
                <div className=" flex justify-start h-12 my-4 mx-4 text-xl font-bold items-center hover:bg-gray-200 rounded-xl transition-all duration-200">
                  <p className="mx-4">Home</p>
                </div>
              </NavLink>
              <NavLink to="/create" className="">
                <div className=" flex justify-start h-12 my-4 mx-4 text-xl font-bold items-center hover:bg-gray-200 rounded-xl transition-all duration-200">
                  <p className="mx-4">About</p>
                </div>
              </NavLink>
            </div>
            <div className="items-end">
              <button
                className="bg-black text-white rounded-xl h-12 text-xl w-full my-4 outline-none"
                onClick={() => {
                  !isConnected
                    ? handleClickOpen()
                    : fireToast('success', 'Wallet already connected');
                }}
              >
                {isConnected
                  ? address.slice(0, 8) + '. . . ' + address.slice(-6)
                  : 'Connect Wallet'}
              </button>
            </div>
            <Dialog
              fullScreen={fullScreen}
              open={walletopen}
              onClose={handleCloseWallet}
              aria-labelledby="responsive-dialog-title"
            >
              <WalletConnect />
            </Dialog>
          </div>
        </div>
      ) : (
        <div className="sm:px-8 md:px-10 lg:px-16 border-b border-gray-200 px-4 fixed top-0 w-full z-10 h-fit bg-white py-3.5">
          <div>
            <nav className=" flex justify-between">
              {/* logo and nav section  */}
              <div className="flex items-center">
                <div className="flex">
                  <NavLink to="/" className="flex items-center">
                    <div className="">
                      <img src={logo} alt="logo" className="h-14 " />
                    </div>
                    <div className="ml-2 text-white">
                      <p className="font-bold text-black text-3xl">NFT-DAO</p>
                    </div>
                  </NavLink>
                </div>
                <div className="w-px ml-4 h-full bg-gray-400  hidden md:flex "></div>
                <div className="ml-8 items-center hidden md:flex  ">
                  <div className="flex">
                    <NavLink to="/home" className="flex">
                      <div className="ml-2 text-white">
                        <p className=" text-gray-700 text-xl font-semibold">
                          Home
                        </p>
                      </div>
                    </NavLink>
                  </div>
                </div>
                <div className="ml-8 items-center  hidden md:flex  ">
                  <div className="flex">
                    <NavLink to="/about" className="flex">
                      <div className="ml-2 text-white">
                        <p className=" text-gray-700 text-xl font-semibold">
                          About
                        </p>
                      </div>
                    </NavLink>
                  </div>
                </div>
              </div>
              {/* mobile menu */}
              <div className="text-black p-2 pt-2 px-3 mx-2  rounded-lg h-fit bg-gray-200 md:hidden lg:hidden">
                <button onClick={() => setMenuToggle(!menuToggle)}>
                  <span className="material-symbols-outlined">menu</span>
                </button>
              </div>

              {/* Wallet section  */}
              <div className="md:flex hidden ">
                <div className=" bg-opacity-10 rounded-xl md:flex items-center bg-gray-400 h-14 bg-blur-xl border-2 border-gray-400  ">
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
      )}
    </>
  );
};
export default Header;
