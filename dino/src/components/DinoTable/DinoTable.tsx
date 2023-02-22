import React, { useState, useEffect } from "react";
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
  const [activeFilter, setActiveFilter] = useState("");
  const allTimeDate = '11/11/2022';

  const handleFilterClick = (filter: string) => {
    setActiveFilter(filter);
  };
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
    setActiveFilter("none");
    if(dataTo?.format("YYYY-MM-DD") === dataFrom?.add(1, 'day').format("YYYY-MM-DD")) {
      setActiveFilter("filter2");
    }
    if((dataTo?.add(-1, "day").format("YYYY-MM-DD") === dataFrom?.add(1, "month").format("YYYY-MM-DD") )){
      setActiveFilter("filter3");
    }
    if((dataTo?.format("YYYY-MM-DD") === dayjs().add(1,'day').format("YYYY-MM-DD")) && (dataFrom?.format("YYYY-MM-DD") === dayjs(allTimeDate).format("YYYY-MM-DD"))){ 
      setActiveFilter("filter1");
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
      setDataFrom(dayjs(allTimeDate));
      handleFilterClick("filter1");
    }
    if (type === "daily") {
      setDataTo(dayjs().add(1, "day"));
      setDataFrom(dayjs());
      handleFilterClick("filter2");
    }

    if (type === "monthly") {
      setDataTo(dayjs().add(1, "day"));
      setDataFrom(dayjs().add(-1, "month"));
      handleFilterClick("filter3");
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
                className={
                  activeFilter === "filter1"
                    ? "dinoTable_wrapper_ranges_button_active"
                    : "dinoTable_wrapper_ranges_button"
                }
                onClick={() => handleDate("allTime")}
              >
                All time
              </button>
              <button
                className={
                  activeFilter === "filter2"
                    ? "dinoTable_wrapper_ranges_button_active"
                    : "dinoTable_wrapper_ranges_button"
                }
                onClick={() => handleDate("daily")}
              >
                Daily
              </button>
              <button
                className={
                  activeFilter === "filter3"
                    ? "dinoTable_wrapper_ranges_button_active"
                    : "dinoTable_wrapper_ranges_button"
                }
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
              <Calendar
                setData={setDataTo}
                displayData={dataTo}
                message="To"
              />
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
                  <React.Fragment key={uuidv4()}>
                    <div
                      className="row"
                      key={uuidv4()}
                      onClick={() => handleRowExpand(index)}
                    >
                      <div className="cell" key={uuidv4()}>
                        <Rank score={index + 1} key={uuidv4()} />
                      </div>
                      <div className="cell" key={uuidv4()}>
                        <div className="cell_copy" key={uuidv4()}>
                          <div className="wallet_address" key={uuidv4()}>
                            {item.walletAddress}
                          </div>
                          <button
                            onClick={(event: React.MouseEvent<HTMLElement>) =>
                              handleRedirect(item.walletAddress, event)
                            }
                            className="copy_button"
                            key={uuidv4()}
                          >
                            <img
                              className="copy_button_icon"
                              id="etherscan_icon"
                              src={etherscanIcon}
                              alt="etherscan"
                              key={uuidv4()}
                            />
                          </button>
                          <button
                            onClick={(event: React.MouseEvent<HTMLElement>) =>
                              handleCopy(item.walletAddress, event)
                            }
                            className="copy_button"
                            key={uuidv4()}
                          >
                            <img
                              className="copy_button_icon"
                              src={copyIcon}
                              alt="copyIcon"
                              key={uuidv4()}
                            />
                          </button>
                        </div>
                      </div>
                      <div className="cell" key={uuidv4()}>
                        {Number(item.totalEther).toFixed(3)}
                      </div>
                    </div>
                    {expandedRows.includes(index) && (
                      <>
                        <div
                          className="row"
                          id="row_history_header"
                          key={uuidv4()}
                        >
                          <div className="cell" key={uuidv4()}>
                            <button
                              onClick={() => handleRowHide(index)}
                              className="arrow_up_button"
                              key={uuidv4()}
                            >
                              <img
                                className="arrow_up"
                                src={arrowUp}
                                alt="arrowUp"
                                key={uuidv4()}
                              />
                            </button>
                          </div>
                          <div className="cell" key={uuidv4()}>
                            Transaction hash
                          </div>
                          <div className="cell" key={uuidv4()}>
                            Total Value
                          </div>
                        </div>
                        {item.buyData.map((historyItem: buyDataModel) => {
                          return (
                            <div
                              className="row"
                              id="row_history"
                              key={uuidv4()}
                            >
                              <div className="cell" key={uuidv4()}></div>
                              <div className="cell" key={uuidv4()}>
                                <div className="cell_copy" key={uuidv4()}>
                                  <div
                                    className="wallet_address"
                                    key={uuidv4()}
                                  >
                                    {historyItem.transactionhash}
                                  </div>
                                  <button
                                    key={uuidv4()}
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
                                      key={uuidv4()}
                                      className="copy_button2_icon2"
                                      src={copyIcon}
                                      alt="copyIcon"
                                    />
                                  </button>
                                </div>
                              </div>
                              <div className="cell" key={uuidv4()}>
                                {Number(historyItem.ether).toFixed(5)}
                              </div>
                            </div>
                          );
                        })}
                      </>
                    )}
                  </React.Fragment>
                );
              })}
            </div>
          </div>
          <ToastContainer
            toastStyle={{ backgroundColor: "#38625a", color: "#fff" }}
            autoClose={1500}
            key={uuidv4()}
          />
        </div>
      )}
      {isLoading && <Loader />}
    </>
  );
};

export default DinoTable;
