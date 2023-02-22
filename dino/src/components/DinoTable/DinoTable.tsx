import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import "./DinoTable.scss";
import { Dayjs } from "dayjs";
import dayjs from "dayjs";
import { buyDataModel, DinoTableModel } from "./model";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Rank from "../RankComponent/Rank";
import Loader from "../Loader/Loader";
import Calendar from "../Calendar/Calendar";
import { fetchData } from "../../utils/service";

const DinoTable = () => {
  const [data, setData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [expandedRows, setExpandedRows] = useState<any>([]);
  const [dataF, setDataF] = useState<string>(
    dayjs().add(-1, "month").format("YYYY-MM-DD")
  );
  const [dataT, setDataT] = useState<string>(
    dayjs().add(1, "day").format("YYYY-MM-DD")
  );
  const [dataFrom, setDataFrom] = useState<Dayjs | null>(dayjs(dataF));
  const [dataTo, setDataTo] = useState<Dayjs | null>(dayjs(dataT));

  useEffect(() => {
    const fetchPath = `http://localhost:6060/transactions?dateFrom=${dataF}&dateTo=${dataT}`;
    async function getData() {
      const result = await fetchData(fetchPath);
      setData(result);
      setIsLoading(false);
    }

    getData();
  }, [dataT, dataF]);

  useEffect(() => {
    if (dataTo) {
      setDataT(dataTo.format("YYYY-MM-DD"));
    }
    if (dataFrom) {
      setDataF(dataFrom.format("YYYY-MM-DD"));
    }
    if (dataTo != null && dataFrom != null) {
      if (dataTo < dataFrom) {
        setDataT(dayjs().format("YYYY-MM-DD"));
        setDataF(dayjs().add(-1, "month").format("YYYY-MM-DD"));
        toast.error("Incorrect Date, please try a different one");
      }
    }
  }, [dataTo, dataFrom]);

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

  const handleCopy = (value: string, event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    event.stopPropagation();
    navigator.clipboard.writeText(value);
    toast.success(`Copied to clipboard: ${value}`);
  };

  const handleRedirect = (
    value: string,
    event: React.MouseEvent<HTMLElement>
  ) => {
    event.preventDefault();
    event.stopPropagation();
    window.open(`https://etherscan.io/address/${value}`);
  };

  const handleDate = (type: string) => {
    if (type === "allTime") {
      setDataTo(dayjs().add(1, "day"));
      setDataFrom(dayjs("01/01/2023"));
    }
    if (type === "daily") {
      setDataTo(dayjs().add(1, "day"));
      setDataFrom(dayjs());
    }

    if (type === "monthly") {
      setDataTo(dayjs().add(1, "day"));
      setDataFrom(dayjs().add(-1, "month"));
    }
  };

  const dinoLeader = require("../../assetsDino/dinoLeader.png");
  const dinoTail = require("../../assetsDino/dinoTail.png");
  const arrowUp = require("../../assetsDino/arrowUp.png");
  const copyIcon = require("../../assetsDino/copyIcon.png");
  const etherscanIcon = require("../../assetsDino/etherscanIcon.png");

  return (
    <>
      {!isLoading && (
        <div className="dinoTable_wrapper">
          <div className="dinoTable_wrapper_ranges">
            <div className="ranges_buttons">
              <button
                className="dinoTable_wrapper_ranges_button"
                onClick={() => handleDate("allTime")}
              >
                All time
              </button>
              <button
                className="dinoTable_wrapper_ranges_button"
                onClick={() => handleDate("daily")}
              >
                Daily
              </button>
              <button
                className="dinoTable_wrapper_ranges_button"
                onClick={() => handleDate("monthly")}
              >
                Monthly
              </button>
            </div>
            <div className="ranges_calendars">
              <Calendar
                setData={setDataFrom}
                displayData={dataFrom}
                message="From"
              />
              <Calendar setData={setDataTo} displayData={dataTo} message="To" />
            </div>
          </div>
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
                      key={uuidv4()}
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
                            onClick={(event: React.MouseEvent<HTMLElement>) =>
                              handleRedirect(item.walletAddress, event)
                            }
                            className="copy_button"
                          >
                            <img
                              className="copy_button_icon"
                              id="etherscan_icon"
                              src={etherscanIcon}
                              alt="etherscan"
                            />
                          </button>
                          <button
                            onClick={(event: React.MouseEvent<HTMLElement>) =>
                              handleCopy(item.walletAddress, event)
                            }
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
                              key={uuidv4()}
                            >
                              <div className="cell"></div>
                              <div className="cell">
                                <div className="cell_copy">
                                  <div className="wallet_address">
                                    {historyItem.transactionhash}
                                  </div>
                                  <button
                                    onClick={(
                                      event: React.MouseEvent<HTMLElement>
                                    ) =>
                                      handleCopy(
                                        historyItem.transactionhash,
                                        event
                                      )
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
