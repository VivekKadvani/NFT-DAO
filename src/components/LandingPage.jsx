import React, { useContext, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { AppContext } from '../App';
//images
//wagmi
import { useAccount, useBalance, useConnect } from 'wagmi';
const LandingPage = () => {
  //wagmi
  const { isConnected, address } = useAccount();
  //appcontext
  const { walletopen, setWalletOpen } = useContext(AppContext);

  return (
    <div className="h-full flex flex-col justify-center text-center px-16 pt-48">
      <p className="lg:text-9xl md:text-9xl text-6xl">
        NFT-DAO <br />
      </p>
      <p className="text-lg text-justify hidden lg:block md:block ">
        An NFT Governed DAO is a decentralized autonomous organization that
        leverages non-fungible tokens (NFTs) as a means of governance. NFT
        holders have voting rights within the DAO, with each NFT acting as a
        voting token. This unique approach incentivizes participation and aligns
        the interests of stakeholders. NFTs can also represent assets or
        collateral, such as fractional ownership of real-world assets or virtual
        assets within a metaverse, adding a financial dimension to the DAO
        ecosystem. By combining blockchain transparency and NFT uniqueness, NFT
        Governed DAOs empower individuals to actively contribute to
        decision-making and value creation, fostering a community-driven and
        inclusive governance model.
      </p>
      <p className="text-lg text-justify lg:hidden md:hidden ">
        An NFT Governed DAO is a decentralized autonomous organization that uses
        NFTs for governance. NFT holders have voting rights, with each NFT
        serving as a voting token. This incentivizes participation and aligns
        stakeholders' interests. NFTs can represent assets like real-world or
        virtual assets, adding financial value. NFT Governed DAOs empower
        individuals to contribute to decision-making and value creation,
        fostering community-driven governance.
      </p>
      {isConnected ? (
        <NavLink to="/home">
          <button className="m-8 bg-black text-white px-10 py-4 text-xl rounded-3xl hover:scale-110 transition-all duration-300 drop-shadow-md">
            Get Start
          </button>
        </NavLink>
      ) : (
        <NavLink to="">
          <button
            className="m-8 bg-black text-white px-10 py-4 text-xl rounded-3xl hover:scale-110 transition-all duration-300 drop-shadow-md"
            onClick={() => setWalletOpen(true)}
          >
            Get Start
          </button>
        </NavLink>
      )}
    </div>
  );
};
export default LandingPage;
