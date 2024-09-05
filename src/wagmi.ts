import { http, createConfig } from "wagmi";
import { mainnet, sepolia,xdcTestnet } from "wagmi/chains";
import { coinbaseWallet, injected, walletConnect } from "wagmi/connectors";
import getConfig from "next/config";

const { publicRuntimeConfig } = getConfig();

const { WC_PROJECT_ID } = publicRuntimeConfig;

const connectors =
  typeof window !== "undefined"
    ? [
        injected(),
        coinbaseWallet({ appName: "Create Wagmi" }),
        walletConnect({ projectId: WC_PROJECT_ID }),
      ]
    : [];

export const config = createConfig({
  chains: [mainnet, sepolia,xdcTestnet],
  connectors,
  ssr: true,
  transports: {
    [mainnet.id]: http(),
    [sepolia.id]: http(),
    [xdcTestnet.id]: http("https://erpc.apothem.network"),
  },
});

declare module "wagmi" {
  interface Register {
    config: typeof config;
  }
}
