import React from "react";
import "./Rank.scss";
import { RankModel } from "./model";
const Rank: React.FC<RankModel> = ({ score }) => {
  enum Color {
    gold = "#fec833",
    bronze = "#B08D57",
    silver = "#d1eeff",
    regular = "#fff",
  }

  const checkNumberColor = (scoreNumber: number) => {
    switch (scoreNumber) {
      case 1:
        return Color.gold;
      case 2:
        return Color.silver;
      case 3:
        return Color.bronze;
      default:
        return Color.regular;
    }
  };

  return (
    <>
      {score < 1000 && (
        <div className="starWrapper">
          <div
            className="star"
            style={{
              backgroundColor: `${checkNumberColor(score)}`,
            }}
          >
            <div className="star_score" style={{}}>
              {score}
            </div>
          </div>
          <svg
            style={{ visibility: "hidden", position: "absolute" }}
            width="0"
            height="0"
            xmlns="http://www.w3.org/2000/svg"
            version="1.1"
          >
            <defs>
              <filter id="round">
                <feGaussianBlur
                  in="SourceGraphic"
                  stdDeviation="3"
                  result="blur"
                />
                <feColorMatrix
                  in="blur"
                  mode="matrix"
                  values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9"
                  result="goo"
                />
                <feComposite in="SourceGraphic" in2="goo" operator="atop" />
              </filter>
            </defs>
          </svg>
        </div>
      )}
      {score >= 100 && (
        <div
          className="styled_big_score"
          style={{ backgroundColor: `${checkNumberColor(score)}` }}
        >
          {score}
        </div>
      )}
    </>
  );
};

export default Rank;
