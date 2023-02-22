import "./App.css";
import DinoTable from "./components/DinoTable/DinoTable";
import Footer from "./components/Footer/Footer";
import { StyledEngineProvider } from "@mui/material/styles";

import "@rainbow-me/rainbowkit/styles.css";
import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { configureChains, createClient, WagmiConfig } from "wagmi";
import { mainnet, polygon, optimism, arbitrum } from "wagmi/chains";
import { publicProvider } from "wagmi/providers/public";
import ConnectorButton from "./components/ConnectorButton/ConnectorButton";

const { chains, provider } = configureChains(
  [mainnet, polygon, optimism, arbitrum],
  [publicProvider()]
);

const { connectors } = getDefaultWallets({
  appName: "My RainbowKit App",
  chains,
});

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
});

function App() {
  return (
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider chains={chains}>
        <StyledEngineProvider injectFirst>
          <div className="dinoPage">
            <ConnectorButton />
            <DinoTable />
          </div>
          <Footer />
        </StyledEngineProvider>
      </RainbowKitProvider>
    </WagmiConfig>
  );
}

export default App;
