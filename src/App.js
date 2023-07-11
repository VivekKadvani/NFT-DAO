import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { createContext, useState } from 'react';
//child router components
import Home from './components/Home';
import Header from './components/Header';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import LandingPage from './components/LandingPage';
import ProposalDetail from './components/ProposalDetail';
// import ProfileSlider from './components/ProfileSlider';
//wagmi setup
import { WagmiConfig } from 'wagmi';
import { config } from './utils/wagmiConfig';
//toast
import { ToastContainer, toast } from 'react-toastify';
import Airdrop from './components/Airdrop';
import About from './components/About';
export const AppContext = createContext();

function App() {
  const [walletopen, setWalletOpen] = useState(false);
  const [proposaldialogopen, setProposalDialogOpen] = useState(false);
  const [supplydialogopen, setsupplyDialogOpen] = useState(false);
  const [buyNFTDialog, setBuyNFTDialog] = useState(false);
  return (
    <WagmiConfig config={config}>
      <AppContext.Provider
        value={{
          walletopen,
          setWalletOpen,
          proposaldialogopen,
          setProposalDialogOpen,
          supplydialogopen,
          setsupplyDialogOpen,
          buyNFTDialog,
          setBuyNFTDialog,
        }}
      >
        <ToastContainer />
        <Router>
          <div className=" flex flex-col h-screen">
            {/* <ScrollToTop /> */}
            <Header />
            <Routes>
              <Route path="/">
                <Route index element={<LandingPage />} />
                <Route path="/" element={<LandingPage />} />
              </Route>
              <Route path="/home" element={<Home />} />
              <Route path="/proposalDetail/:id" element={<ProposalDetail />} />
              <Route path="/airdrop" element={<Airdrop />} />
              <Route path="/about" element={<About />} />
            </Routes>
            <Footer />
          </div>
        </Router>
      </AppContext.Provider>
    </WagmiConfig>
  );
}

export default App;
