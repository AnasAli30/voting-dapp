import { useWeb3Context } from "../../context/useWeb3Context";
import { useEffect, useState } from "react";
import { ethers } from "ethers";

import BuyToken from "../../component/TokenMarketplace/BuyToken";
import SellToken from "../../component/TokenMarketplace/SellToken";
import TokenBalance from "../../component/TokenMarketplace/TokenBalance";
import TokenPrice from "../../component/TokenMarketplace/TokenPrice";
import "./TokenMarketplace.css";

import tokenMarketplaceAbi from "../../constant/tokenMarketplaceAbi.json";
import erc20abi from "../../constant/erc20Abi.json";

import { toast } from "react-hot-toast";

const TokenMarketplace = () => {
  const [tokenMarketplaceInstance, setTokenMarketplaceInstance] = useState(null);
  const [erc20ContractInstance, setErc20ContractInstance] = useState(null);
  const { web3state } = useWeb3Context();
  const { signer, provider } = web3state;

  useEffect(() => {
    const erc20TokenInit = () => {
      try {
        const contractAddress = "0x8c1C870DacC51ad946c5F39B8115C8fbE2165c22";
        const erc20ContractInstance = new ethers.Contract(contractAddress, erc20abi, provider);
        setErc20ContractInstance(erc20ContractInstance);
      } catch (error) {
        toast.error("Error starting the token");
      }
    };
    provider && erc20TokenInit();
  }, [provider]);

  useEffect(() => {
    const tokenMarketplaceInit = () => {
      try {
        const tokenMarketplaceContractAddress = "0xb973a045ab7b41a4620ecD09fEC3AA8A96847c9E";
        const tokenMarketplaceInstance = new ethers.Contract(tokenMarketplaceContractAddress, tokenMarketplaceAbi, signer);
        setTokenMarketplaceInstance(tokenMarketplaceInstance);
      } catch (error) {
        toast.error("Error: Token Marketplace");
        console.error(error);
      }
    };
    signer && tokenMarketplaceInit();
  }, [signer]);

  return (
    <div className="token-marketplace-container">
      <h2 className="token-marketplace-title">Token Marketplace</h2>
      
      <div className="token-balance-section">
        <div className="token-balance-card">
          <TokenBalance erc20ContractInstance={erc20ContractInstance} />
        </div>
        <div className="token-price-card">
          <TokenPrice contractInstance={tokenMarketplaceInstance} />
        </div>
      </div>

      <div className="token-actions">
        <div className="button-wrapper">
          <BuyToken contractInstance={tokenMarketplaceInstance} />
        </div>
        <div className="button-wrapper">
          <SellToken erc20ContractInstance={erc20ContractInstance} contractInstance={tokenMarketplaceInstance} />
        </div>
      </div>
    </div>
  );
};

export default TokenMarketplace;
