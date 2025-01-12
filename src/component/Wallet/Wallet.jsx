import { useEffect } from "react";
import { useWeb3Context } from "../../context/useWeb3Context";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Particles from 'react-tsparticles';
import { loadFull } from 'tsparticles';
import { ethers } from "ethers";
import abi from "../../constant/abi.json";
import { toast } from "react-hot-toast";
import "./wallet.css";
import { tsParticles } from "@tsparticles/engine";

const Home = () => {
  const token = localStorage.getItem("token");
  const { handleWallet, web3state, setWeb3state } = useWeb3Context();
  const { selectedAccount, signer } = web3state;
  const navigateTo = useNavigate();
  const particlesInit = async (main) => {
    await loadFull(main);
  };

  useEffect(() => {
    const fetch = async () => {
      const config = {
        headers: {
          "x-access-token": token,
        },
      };
      try {
        const res = await axios.post(
          "http://localhost:3000/api/check",
          { accountAddress: selectedAccount },
          config
        );

        const responseData = res.data.data;
        const contractInstance = new ethers.Contract(
          responseData.contractAdd,
          abi,
          signer
        );
        setWeb3state((prev) => ({
          ...prev,
          contractInstance: contractInstance,
          userData: responseData,
        }));
        navigateTo("/Profile");
        toast.success("Login successful");
      } catch (e) {
        if (e.response?.status === 404) {
          navigateTo("/register");
          toast.error("You are not registered");
        }
      }
    };

    selectedAccount && fetch();
  }, [selectedAccount]);

  return (
    <div className="home-container">
    <Particles 
                params={{
                    polygon: {
                        enable: true,
                        type: 'inside',
                        move: {
                            radius: 10
                        },
                        url: 'path/to/svg.svg'
                    }
                }} />
      <h1 className="home-title">Decentralized Voting DApp</h1>
      <p className="home-subtitle">Secure. Transparent. Immutable.</p>
      <button className="connect-button" onClick={handleWallet}>
        Connect Wallet
      </button>

      <div className="features">
        <div className="feature-box">
          <h3 className="feature-title">Vote Securely</h3>
          <p className="feature-description">
            Cast your vote securely on the blockchain.
          </p>
        </div>
        <div className="feature-box">
          <h3 className="feature-title">Transparent Results</h3>
          <p className="feature-description">
            View real-time and verifiable election results.
          </p>
        </div>
        <div className="feature-box">
          <h3 className="feature-title">Decentralized System</h3>
          <p className="feature-description">
            No third-party control, ensuring full transparency.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;
