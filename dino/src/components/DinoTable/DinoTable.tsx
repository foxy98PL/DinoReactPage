import { useState, useEffect } from "react";
import { fetchData } from "../../utils/service";
import "./DinoTable.scss";
import { DinoTableModel } from "./model";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const DinoTable = () => {
  const [data, setData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  const handleCopy = (value: string) => {
    navigator.clipboard.writeText(value);
    toast.success(`Copied to clipboard: ${value}`);
  };

  useEffect(() => {
    async function getData() {
      const result = await fetchData();
      setData(result);
      setIsLoading(false);
    }
    getData();
  }, []);
  let dinoData = [];
  if (!isLoading) {
    dinoData = Object.assign(Array.from(data.message.rows));
    dinoData.sort((a: DinoTableModel, b: DinoTableModel) =>
      b.ethervalue.localeCompare(a.ethervalue)
    );
    console.log(dinoData);
  }
  return (
    <>
      {!isLoading && (
        <div className="dinoTable">
          <div className="row header">
            <div className="cell">Wallet</div>
            <div className="cell">Total ETH</div>
            <div className="cell">Buy Count</div>
            <div className="cell">RANK</div>
          </div>
          {dinoData.map((item: DinoTableModel, index: number) => {
            return (
              <div className="row">
                <div
                  className="cell"
                  onClick={() => handleCopy(item.walletaddress)}
                >
                  {item.walletaddress}
                </div>
                <div className="cell">{item.ethervalue}</div>
                <div className="cell">{item.value}</div>
                <div className="cell">{index + 1}</div>
              </div>
            );
          })}
        </div>
      )}
      <ToastContainer />
    </>
  );
};

export default DinoTable;
