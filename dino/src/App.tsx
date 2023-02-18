import "./App.css";
import DinoTable from "./components/DinoTable/DinoTable";
import Footer from "./components/Footer/Footer";

function App() {
  const dinoLeader = require("./assetsDino/dinoLeader.png");
  const dinoTail = require("./assetsDino/dinoTail.png");
  return (
    <>
      <div className="dinoPage">
        <div className="dinoPageTitle">Dino Leaderboard</div>
        <DinoTable />
      </div>
      <Footer />
    </>
  );
}

export default App;
