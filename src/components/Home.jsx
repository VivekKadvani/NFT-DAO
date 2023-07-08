import React, { useContext, useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
//images
import { AppContext } from '../App';
//images
//wagmi
import { useAccount, useBalance, useConnect } from 'wagmi';

const Home = () => {
  //wagmi
  const { isConnected, address } = useAccount();
  //appcontext
  const { walletopen, setWalletOpen } = useContext(AppContext);
  useEffect(() => {}, []);

  return (
    <div className="h-full pt-20">
      <div className=" w-full h-fit mt-4 flex flex-col gap-5 ">
        <div className="sm:px-8 md:px-10 lg:px-16 px-4 ">
          <div className="text-left m-2  grid grid-cols-3  gap-4">
            <div className="rounded-xl bg-slate-200">
              <p className="text-xl text-black p-4">Title</p>
              <p className="text-lg text-gray-700 p-4">
                Content ContentConten tContentContentConten
                tContentContentContentC ontentContentContent
              </p>
            </div>
            <div className="rounded-xl bg-slate-200"></div>
            <div className="rounded-xl bg-slate-200"></div>
          </div>
          {/* loop all nft */}
        </div>
      </div>
    </div>
  );
};

export default Home;
