import React from "react";
import SymboticHeaderFirstRow from "./SymboticHeaderFirstRow";
import SymboticHeaderSecondRow from "./SymboticHeaderSecondRow";
import { SymboticDummyData } from "../constants";
import RegularCell from "./RegularCell";
import { minutesToHours } from "../utils";

function SymboticGraph({ graphData }) {
  const SymboticHeaderFirstRowProps = {
    cellWidth: "412px",
  };
  const SymboticHeaderSecondRowProps = {
    cellWidth: "200px",
  };
  const cellProps = {
    cellWidth: "200px",
  };

  // Destructure the values from SymboticGraphDummyData
  const {
    putawayAIBPallets,
    putawayMIBCases,
    minutesPalletsInPutawayQueue,
    replenishmentAIBPallets,
    replenishmentMIBCases,
    minutesPalletsInReplenQueue,
  } = graphData.data[0];

  const {
    statuses,
    maxQueue,
    receivingAllocationPercent,
    belowQueueVariance,
    maxCases,
    maxMinutesForPalletsInPutawayQueue,
    maxMinutesForPalletsInReplenQueue,
  } = graphData.meta[0];

  const receivingAllocatedValue = maxQueue * (receivingAllocationPercent / 100);
  const replenishmentAllocatedValue = maxQueue - receivingAllocatedValue;

  const getPalletCellColor = (
    currentCellMin,
    currentCellMax,
    pallets,
    maxPalletsValue
  ) => {
    if (currentCellMin >= pallets) {
      return null;
    } else {
      if (currentCellMax < maxPalletsValue) {
        if (maxPalletsValue - currentCellMax < 5) {
          return statuses[1].color;
        }
        return statuses[0].color;
      } else if (
        currentCellMax > maxPalletsValue &&
        currentCellMax - maxPalletsValue < 5
      ) {
        return statuses[1].color;
      } else {
        return statuses[2].color;
      }
    }
  };

  const getCaseCellColor = (leftValue, actualValue) => {
    if (leftValue <= actualValue && leftValue >= maxCases) {
      return statuses[2].color;
    } else if (leftValue <= actualValue) {
      return statuses[0].color;
    }

    return null;
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <div style={{ flex: 1, overflowX: "auto" }}>
        <table
          style={{
            borderCollapse: "collapse",
            width: "100%",
            height: "100%",
            marginTop: 10,
          }}
        >
          <thead>
            <tr>
              <SymboticHeaderFirstRow {...SymboticHeaderFirstRowProps} />
            </tr>
            <tr>
              <SymboticHeaderSecondRow {...SymboticHeaderSecondRowProps} />
            </tr>
          </thead>
          <tbody>
            {SymboticDummyData.map(({ label, min, max, value }, index) => (
              <tr key={index} className="block">
                <td>
                  <RegularCell text={label} {...cellProps} />
                </td>
                <td>
                  <RegularCell
                    {...cellProps}
                    backgroundColor={getPalletCellColor(
                      min,
                      max,
                      putawayAIBPallets,
                      receivingAllocatedValue
                    )}
                  />
                </td>
                <td>
                  <RegularCell
                    {...cellProps}
                    backgroundColor={getCaseCellColor(value, putawayMIBCases)}
                  />
                </td>
                <td>
                  <RegularCell {...cellProps} />
                </td>
                <td>
                  <RegularCell
                    {...cellProps}
                    backgroundColor={getPalletCellColor(
                      min,
                      max,
                      replenishmentAIBPallets,
                      replenishmentAllocatedValue
                    )}
                  />
                </td>
                <td>
                  <RegularCell
                    {...cellProps}
                    backgroundColor={getCaseCellColor(
                      value,
                      replenishmentMIBCases
                    )}
                  />
                </td>
                <td>
                  <RegularCell {...cellProps} />
                </td>
                <td>
                  <RegularCell {...cellProps} />
                </td>
                <td>
                  <RegularCell {...cellProps} />
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr style={{ display: "block" }}>
              <td>
                <RegularCell {...cellProps} />
              </td>
              <td>
                <RegularCell
                  {...cellProps}
                  {...SymboticHeaderFirstRowProps}
                  text={`${minutesToHours(
                    minutesPalletsInPutawayQueue
                  )} > ${minutesToHours(maxMinutesForPalletsInPutawayQueue)} `}
                  backgroundColor={
                    minutesPalletsInPutawayQueue >
                    maxMinutesForPalletsInPutawayQueue
                      ? statuses[2].color
                      : null
                  }
                  justifyContent="start"
                  style={{ paddingLeft: 20 }}
                />
              </td>
              <td>
                <RegularCell {...cellProps} />
              </td>
              <td>
                <RegularCell
                  {...cellProps}
                  {...SymboticHeaderFirstRowProps}
                  text={`${minutesToHours(
                    minutesPalletsInReplenQueue
                  )} > ${minutesToHours(maxMinutesForPalletsInReplenQueue)} `}
                  backgroundColor={
                    minutesPalletsInReplenQueue >
                    maxMinutesForPalletsInReplenQueue
                      ? statuses[2].color
                      : null
                  }
                  justifyContent="start"
                  style={{ paddingLeft: 20 }}
                />
              </td>
              <td>
                <RegularCell {...cellProps} />
              </td>
              <td>
                <RegularCell {...cellProps} {...SymboticHeaderFirstRowProps} />
              </td>
            </tr>
            <tr style={{ display: "block" }}>
              <td>
                <RegularCell {...cellProps} />
              </td>
              <td>
                <RegularCell {...cellProps} {...SymboticHeaderFirstRowProps} />
              </td>
              <td>
                <RegularCell {...cellProps} />
              </td>
              <td>
                <RegularCell {...cellProps} {...SymboticHeaderFirstRowProps} />
              </td>
              <td>
                <RegularCell {...cellProps} />
              </td>
              <td>
                <RegularCell {...cellProps} {...SymboticHeaderFirstRowProps} />
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
}

export default SymboticGraph;
