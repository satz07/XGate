//TESTNET
import { useState, useEffect } from "react";
import { useWriteContract, useWaitForTransactionReceipt, useAccount } from "wagmi";
import { Web3Auth } from "@web3auth/modal";
import { CHAIN_NAMESPACES, WEB3AUTH_NETWORK } from "@web3auth/base";
import { EthereumPrivateKeyProvider } from "@web3auth/ethereum-provider";
import { ethers } from "ethers";
import { EtherspotBundler, ModularSdk } from '@etherspot/modular-sdk';
import { printOp } from '../src/sdk/common/OperationUtils';
import { ERC20_ABI } from '../src/sdk/helpers/abi/ERC20_ABI';
import { ERC721_ABI } from '../src/sdk/helpers/abi/ERC721_ABI';
import * as dotenv from 'dotenv';
import { sleep } from '../src/sdk/common';

dotenv.config();

const clientId = "BJxW5OIB5ugNUBM491Dor4lrqh-YqWKKbeVvyzhY5k0hGFbZyTqb40SN9bcOrOKe-YRUNBg15wHdbBXR9SlCx6Q";
const recipient = '0x8a2A6De412960Ab0BbE02789eeD746aAd392baa5';
const erc20TokenAddress = '0xeDc8AD44C75FB093d1c515f6cB4Fa4a5e1448e63';
const erc721TokenAddress = '0x341CDC5Cd4C1F2F5d04871e1144c560993CA6155';
const apiKey = "arka_public_key";
const CHAIN_ID=51;

// const clientId = "WEB3AuthID";
// const recipient = "Recipient of Token";
// const erc20TokenAddress = "TOKEN_ADDRESS";
// const erc721TokenAddress = "TOKEN_ADDRESS";
// const apiKey = "arka_public_key";
// const CHAIN_ID=51;

const chainConfig = {
  chainId: "0x33",
  rpcTarget: "https://rpc.apothem.network",
  chainNamespace: CHAIN_NAMESPACES.EIP155,
  displayName: "XDC APOTHEM",
  blockExplorerUrl: "https://explorer.apothem.network/",
  ticker: "XDC",
  tickerName: "Xinfin",
  logo: "https://images.toruswallet.io/eth.svg",
};

const privateKeyProvider = new EthereumPrivateKeyProvider({
  config: { chainConfig: chainConfig }
});

const web3auth = new Web3Auth({
  clientId,
  web3AuthNetwork: WEB3AUTH_NETWORK.SAPPHIRE_DEVNET,
  privateKeyProvider: privateKeyProvider,
});

export function SmartAccountWithAA() {
  const { chain } = useAccount();
  const [userPrivateKey, setUserPrivateKey] = useState<string | null>(null);
  const [userAddress, setUserAddress] = useState<string | null>(null);
  const [scwAddress, setScwAddress] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [showPopup, setShowPopup] = useState(false);

  const { data: mintData, error: mintError, isPending: isMintPending, isError: isMintError, writeContract: writeMintContract } = useWriteContract();
  const { data: redeemData, error: redeemError, isPending: isRedeemPending, isError: isRedeemError, writeContract: writeRedeemContract } = useWriteContract();

    const initWeb3Auth = async () => {
      try {
        await web3auth.initModal();
        await web3auth.connect();
        if (web3auth.connected) {
          const privateKey = await web3auth.provider?.request({
            method: "eth_private_key",
          });
          if (privateKey) {
            const formattedPrivateKey = `0x${privateKey}`;
            setUserPrivateKey(formattedPrivateKey);
            const wallet = new ethers.Wallet(formattedPrivateKey);
            setUserAddress(wallet.address);

            const modularSdk = new ModularSdk(
              { privateKey: formattedPrivateKey },
              {
                chainId: Number(CHAIN_ID),
                bundlerProvider: new EtherspotBundler(Number(CHAIN_ID)),
              }
            );

            const scwAddr = await modularSdk.getCounterFactualAddress();
            setScwAddress(scwAddr);
            setMessage(`Connected as ${wallet.address} and Smart Account ${scwAddr}`);
            setShowPopup(true);
          }
        }
      } catch (error) {
        console.error("Web3Auth initialization error:", error);
        setMessage("Error initializing Web3Auth. Please try again.");
        setShowPopup(true);
      }
    };

  const handleMint = async () => {
    if (!userPrivateKey) {
      console.error("User not authenticated");
      setMessage("Error: User not authenticated");
      setShowPopup(true);
      return;
    }

    try {
      const modularSdk = new ModularSdk(
        { privateKey: userPrivateKey },
        {
          chainId: Number(CHAIN_ID),
          bundlerProvider: new EtherspotBundler(Number(CHAIN_ID)),
        }
      );
      
      const balance: string = await modularSdk.getNativeBalance();
      await console.log("EtherspotWallet Address:",scwAddress);

      const provider = new ethers.providers.JsonRpcProvider(process.env.BUNDLER_URL);
      const erc20Instance = new ethers.Contract(erc20TokenAddress, ERC20_ABI, provider);
      const transactionData = erc20Instance.interface.encodeFunctionData('mint', [recipient, ethers.utils.parseEther("10")]);

      await modularSdk.clearUserOpsFromBatch();
      const userOpsBatch = await modularSdk.addUserOpsToBatch({ to: erc20TokenAddress, data: transactionData });

      const op = await modularSdk.estimate();
      console.log(`Estimate UserOp: ${await printOp(op)}`);
      const uoHash = await modularSdk.send(op);
      console.log(`UserOpHash: ${uoHash}`);

      console.log('Waiting for transaction...');
      let userOpsReceipt = null;
      const timeout = Date.now() + 60000; // 1 minute timeout
      while ((userOpsReceipt == null) && (Date.now() < timeout)) {
        await sleep(2);
        userOpsReceipt = await modularSdk.getUserOpReceipt(uoHash);
      }
      console.log('Transaction Receipt: ', userOpsReceipt);

      setMessage(`Mint successful! Transaction Hash: ${uoHash}`);
      setShowPopup(true);

    } catch (error) {
      console.error("Error in minting transaction:", error);
      setMessage("Error in minting transaction. Please try again.");
      setShowPopup(true);
    }
  };

  const handleERC20MintWithPayMaster = async () => {
    if (!userPrivateKey) {
      console.error("User not authenticated");
      setMessage("Error: User not authenticated");
      setShowPopup(true);
      return;
    }

    try {
      const modularSdk = new ModularSdk(
        { privateKey: userPrivateKey },
        {
          chainId: Number(CHAIN_ID),
          bundlerProvider: new EtherspotBundler(Number(CHAIN_ID)),
        }
      );

      const balance: string = await modularSdk.getNativeBalance();

      const provider = new ethers.providers.JsonRpcProvider(process.env.BUNDLER_URL);
      const erc20Instance = new ethers.Contract(erc20TokenAddress, ERC20_ABI, provider);

      const transactionData = erc20Instance.interface.encodeFunctionData('mint', [recipient, ethers.utils.parseEther("10")]);
      const userOpsBatch = await modularSdk.addUserOpsToBatch({ to: erc20TokenAddress, data: transactionData });

      const op = await modularSdk.estimate({
        paymasterDetails: { url: `https://arka.etherspot.io?apiKey=${apiKey}&chainId=${Number(CHAIN_ID)}`, context: { mode: 'sponsor' } }
      });

      const uoHash = await modularSdk.send(op);
      console.log(`UserOpHash: ${uoHash}`);

      console.log('Waiting for transaction...');
      let userOpsReceipt = null;
      const timeout = Date.now() + 60000; // 1 minute timeout
      while ((userOpsReceipt == null) && (Date.now() < timeout)) {
        await sleep(2);
        userOpsReceipt = await modularSdk.getUserOpReceipt(uoHash);
      }
      console.log('Transaction Receipt: ', userOpsReceipt);

      const Pbalance: string = await modularSdk.getNativeBalance();
      console.log("EtherspotWallet After:", Pbalance);

      setMessage(`Mint with PayMaster successful! Transaction Hash: ${uoHash}`);
      setShowPopup(true);
    } catch (error) {
      console.error("Error in minting transaction:", error);
      setMessage("Error in minting transaction with PayMaster. Please try again.");
      setShowPopup(true);
    }
  };

  const handleERC721MintWithPayMaster = async () => {
    if (!userPrivateKey) {
      console.error("User not authenticated");
      setMessage("Error: User not authenticated");
      setShowPopup(true);
      return;
    }

    try {
      const modularSdk = new ModularSdk(
        { privateKey: userPrivateKey },
        {
          chainId: Number(CHAIN_ID),
          bundlerProvider: new EtherspotBundler(Number(CHAIN_ID)),
        }
      );

      const balance: string = await modularSdk.getNativeBalance();
      console.log("EtherspotWallet balance:", balance);
      console.log("SCW", await modularSdk.getCounterFactualAddress());

      const provider = new ethers.providers.JsonRpcProvider(process.env.BUNDLER_URL);
      const erc20Instance = new ethers.Contract(erc721TokenAddress, ERC721_ABI, provider);

      const transactionData = erc20Instance.interface.encodeFunctionData('safeMint', [recipient, "www.google.com"]);
      const userOpsBatch = await modularSdk.addUserOpsToBatch({ to: erc721TokenAddress, data: transactionData });

      const op = await modularSdk.estimate({
        paymasterDetails: { url: `https://arka.etherspot.io?apiKey=${apiKey}&chainId=${Number(CHAIN_ID)}`, context: { mode: 'sponsor' } }
      });

      const uoHash = await modularSdk.send(op);
      console.log(`UserOpHash: ${uoHash}`);

      console.log('Waiting for transaction...');
      let userOpsReceipt = null;
      const timeout = Date.now() + 60000; // 1 minute timeout
      while ((userOpsReceipt == null) && (Date.now() < timeout)) {
        await sleep(2);
        userOpsReceipt = await modularSdk.getUserOpReceipt(uoHash);
      }
      console.log('Transaction Receipt: ', userOpsReceipt);

      setMessage(`ERC721 Mint with PayMaster successful! Transaction Hash: ${uoHash}`);
      setShowPopup(true);
    } catch (error) {
      console.error("Error in minting transaction:", error);
      setMessage("Error in ERC721 minting transaction with PayMaster. Please try again.");
      setShowPopup(true);
    }
  };

  const handleConnect = async () => {
    try {
      await initWeb3Auth();
      setShowPopup(true);
    } catch (error) {
      console.error("Error in connecting to Web3Auth:", error);
      setMessage("Error in connecting to Web3Auth. Please try again.");
      setShowPopup(true);
    }
  };

  const handleDisconnect = async () => {
    try {
      await web3auth.logout();
      setUserPrivateKey(null);
      setUserAddress(null);
      setScwAddress(null);
      setMessage("Disconnected from Web3Auth successfully!");
      setShowPopup(true);
    } catch (error) {
      console.error("Error in disconnecting from Web3Auth:", error);
      setMessage("Error in disconnecting from Web3Auth. Please try again.");
      setShowPopup(true);
    }
  };

  const renderPopup = () => (
    <div style={popupStyles.container}>
      <div style={popupStyles.message}>{message}</div>
      <button style={popupStyles.button} onClick={() => setShowPopup(false)}>OK</button>
    </div>
  );

  const popupStyles = {
    container: {
      position: "fixed",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      backgroundColor: "white",
      padding: "20px",
      boxShadow: "0px 0px 10px rgba(0,0,0,0.5)",
      zIndex: 1000,
    },
    message: {
      marginBottom: "20px",
      fontSize: "16px",
      color: "black",
    },
    button: {
      padding: "10px 20px",
      fontSize: "16px",
      cursor: "pointer",
    },
  };

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px"}}>
        <div style={{width:"100%",display:"flex",flexDirection:"column",alignItems:"center"}}>
          <button onClick={handleConnect} style={{ width:"50%" }}>Connect</button>
          <button onClick={handleDisconnect} style={{ width:"50%" }}>Disconnect</button>
        </div>
      </div>

      <div style={{ marginBottom: "20px" }}>
        <h3>Section 1: Mint ERC20 - Smart Account </h3>
        <button onClick={handleMint} disabled={!userPrivateKey || isMintPending}>
          Mint
        </button>
      </div>

      <div style={{ marginBottom: "20px" }}>
        <h3>Section 2: Mint with Smart Acccount + PayMaster (gasless)</h3>
        <button onClick={handleERC20MintWithPayMaster} disabled={!userPrivateKey || isMintPending}>
          Mint ERC20 with PayMaster
        </button>
        <button onClick={handleERC721MintWithPayMaster} disabled={!userPrivateKey || isMintPending}>
          Mint ERC721 with PayMaster
        </button>
      </div>

      {showPopup && renderPopup()}
    </div>
  );
 }
