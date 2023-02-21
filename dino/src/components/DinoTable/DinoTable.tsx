import { useState, useEffect } from "react";
import "./DinoTable.scss";
import { Dayjs } from "dayjs";
import dayjs from "dayjs";
import { buyDataModel, DinoTableModel } from "./model";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Rank from "../RankComponent/Rank";
import Loader from "../Loader/Loader";
import Calendar from "../Calendar/Calendar";

const DinoTable = () => {
  const [data, setData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [expandedRows, setExpandedRows] = useState<any>([]);
  const [dataF, setDataF] = useState<string>("2023-02-18");
  const [dataT, setDataT] = useState<string>("2023-02-19");
  const [dataFrom, setDataFrom] = useState<Dayjs | null>(dayjs(dataF));
  const [dataTo, setDataTo] = useState<Dayjs | null>(dayjs(dataT));

  const fetchPath = `http://localhost:6060/transactions?dateFrom=${dataF}&dateTo=${dataT}`;

  async function fetchData() {
    const response = await fetch(fetchPath);
    const data = await response.json();
    return data.sortedArr;
  }

  const handleRowExpand = (rowId: number) => {
    const isRowExpanded = expandedRows.includes(rowId);
    const newExpandedRows = isRowExpanded ? "" : [...expandedRows, rowId];
    setExpandedRows(newExpandedRows);
  };

  const handleRowHide = (rowId: number) => {
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

  console.log(dataT);

  useEffect(() => {
    if (dataTo) {
      setDataT(dataTo.format("YYYY-MM-DD"));
    }
    if (dataFrom) {
      setDataF(dataFrom.format("YYYY-MM-DD"));
    }
    if (dataTo != null && dataFrom != null) {
      if (dataTo <= dataFrom) {
        setDataT("2023-02-19");
      }
      if (dataFrom >= dataFrom) {
        setDataF("2023-02-18");
      }
    }
    async function getData() {
      const result = await fetchData();
      setData(result);
      setIsLoading(false);
    }
    getData();
  }, [fetchPath]);

  const dinoLeader = require("../../assetsDino/dinoLeader.png");
  const dinoTail = require("../../assetsDino/dinoTail.png");
  const arrowUp = require("../../assetsDino/arrowUp.png");
  const copyIcon = require("../../assetsDino/copyIcon.png");

  return (
    <>
      {!isLoading && (
        <div className="dinoTable_wrapper">
          <Calendar
            setData={setDataFrom}
            displayData={dataFrom}
            message="From"
          />
          <Calendar setData={setDataTo} displayData={dataTo} message="To" />
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
                      onClick={() => handleRowExpand(index)}
                    >
                      <div className="cell">
                        <Rank score={index + 1} />
                      </div>
                      <div className="cell">
                        <div className="cell_copy">
                          <div className="wallet_address">
                            {item.walletAddress}
                          </div>
                          <button
                            onClick={() => handleCopy(item.walletAddress)}
                            className="copy_button"
                          >
                            <img
                              className="copy_button_icon"
                              src={copyIcon}
                              alt="copyIcon"
                            />
                          </button>
                        </div>
                      </div>
                      <div className="cell">
                        {Number(item.totalEther).toFixed(3)}
                      </div>
                    </div>
                    {expandedRows.includes(index) && (
                      <>
                        <div
                          className="row"
                          id="row_history_header"
                          key={item.walletAddress}
                        >
                          <div className="cell">
                            <button
                              onClick={() => handleRowHide(index)}
                              className="arrow_up_button"
                            >
                              <img
                                className="arrow_up"
                                src={arrowUp}
                                alt="arrowUp"
                              />
                            </button>
                          </div>
                          <div className="cell">Transaction hash</div>
                          <div className="cell">Total Value</div>
                        </div>
                        {item.buyData.map((historyItem: buyDataModel) => {
                          return (
                            <div
                              className="row"
                              id="row_history"
                              key={historyItem.transactionhash}
                            >
                              <div className="cell"></div>
                              <div className="cell">
                                <div className="cell_copy">
                                  <div className="wallet_address">
                                    {historyItem.transactionhash}
                                  </div>
                                  <button
                                    onClick={() =>
                                      handleCopy(historyItem.transactionhash)
                                    }
                                    className="copy_button2"
                                  >
                                    <img
                                      className="copy_button2_icon2"
                                      src={copyIcon}
                                      alt="copyIcon"
                                    />
                                  </button>
                                </div>
                              </div>
                              <div className="cell">
                                {Number(historyItem.ether).toFixed(5)}
                              </div>
                            </div>
                          );
                        })}
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
