import { useState, useEffect } from "react";
import { fetchData, myEmptyDinoArray } from "../../utils/service";
import "./DinoTable.scss";
import { buyDataModel, DinoTableModel } from "./model";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Rank from "../RankComponent/Rank";
import Loader from "../Loader/Loader";

const DinoTable = () => {
  const [data, setData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [expandedRows, setExpandedRows] = useState<any>([]);

  const handleRowClick = (rowId: number) => {
    const isRowExpanded = expandedRows.includes(rowId);
    const newExpandedRows = isRowExpanded
      ? expandedRows.filter((id: number) => id !== rowId)
      : [...expandedRows, rowId];
    setExpandedRows(newExpandedRows);
  };

  const handleCopy = (value: string) => {
    navigator.clipboard.writeText(value);
    toast.success(`Copied to clipboard: ${value}`);
  };

  useEffect(() => {
    async function getData() {
      const result = await fetchData();
      setData(result);
      console.log(data);
      setIsLoading(false);
    }
    getData();
  }, []);
  console.log(expandedRows);
  const dinoLeader = require("../../assetsDino/dinoLeader.png");
  const dinoTail = require("../../assetsDino/dinoTail.png");

  return (
    <>
      {!isLoading && (
        <div className="dinoTable_wrapper">
          <div className="dinoFull">
            <img className="dinoTail" alt="tail" src={dinoTail} />
            <img className="dinoLeader" alt="character" src={dinoLeader} />
          </div>
          <div className="dinoTable">
            <div className="row header" id="row_header">
              <div className="cell">RANK</div>
              <div className="cell">Wallet</div>
              <div className="cell">Total ETH</div>
            </div>
          </div>
          <div className="dinoTable_2_wrapper">
            <div className="dinoTable">
              {data.map((item: DinoTableModel, index: number) => {
                return (
                  <>
                    <div
                      className="row"
                      key={index}
                      onClick={(event: React.MouseEvent<HTMLDivElement>) =>
                        handleRowClick(index)
                      }
                    >
                      <div className="cell">
                        <Rank score={index + 1} />
                      </div>
                      <div
                        className="cell"
                        onClick={() => handleCopy(item.walletAddress)}
                      >
                        {item.walletAddress}
                      </div>
                      <div className="cell">
                        {Number(item.totalEther).toFixed(3)}
                      </div>
                    </div>
                    {expandedRows.includes(index) && (
                      <>
                        <div className="row">
                          <div className="cell"></div>
                          <div className="cell">Transaction hash</div>
                          <div className="cell">Transational Value</div>
                        </div>
                        {item.buyData.map(
                          (historyItem: buyDataModel, index) => {
                            return (
                              <div className="row" key={index}>
                                <div className="cell"></div>
                                <div className="cell">
                                  {historyItem.transactionhash}
                                </div>
                                <div className="cell">
                                  {Number(historyItem.ether).toFixed(5)}
                                </div>
                              </div>
                            );
                          }
                        )}
                      </>
                    )}
                  </>
                );
              })}
            </div>
          </div>
          <ToastContainer
            toastStyle={{ backgroundColor: "#38625a", color: "#fff" }}
            autoClose={1500}
          />
        </div>
      )}
      {isLoading && <Loader />}
    </>
  );
};

export default DinoTable;
