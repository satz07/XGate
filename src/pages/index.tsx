"use client";
import { useAccount } from "wagmi";

import { SmartAccountWithAA } from "../components/SmartAccountAA";

function Page() {
  //const { isConnected } = useAccount();
  return (
    <>
          <h1>XGate</h1>
          <h2>Empowering Your Journey </h2>
          <h2>from Web2 to Web3</h2>
          <SmartAccountWithAA />
          <br />
        </>
  );
}

Page.getInitialProps = async () => {
  return {};
};

export default Page;
