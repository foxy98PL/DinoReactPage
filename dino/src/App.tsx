import "./App.css";
import DinoTable from "./components/DinoTable/DinoTable";
import Footer from "./components/Footer/Footer";
import { StyledEngineProvider } from '@mui/material/styles';

function App() {
  return (
    <StyledEngineProvider injectFirst>
      <div className="dinoPage">
        <DinoTable />
      </div>
      <Footer />
    </StyledEngineProvider>
  );
}

export default App;
