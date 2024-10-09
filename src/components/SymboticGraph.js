import React from "react";
import SymboticHeaderFirstRow from "./SymboticHeaderFirstRow";
import SymboticHeaderSecondRow from "./SymboticHeaderSecondRow";
import { SymboticGridSetupData } from "../constants";
import RegularCell from "./RegularCell";
import { minutesToHours } from "../utils";

function SymboticGraph({ graphData }) {
  const SymboticHeaderFirstRowProps = {
    cellWidth: "402.5px",
  };
  const SymboticHeaderSecondRowProps = {
    cellWidth: "200px",
  };
  const cellProps = {
    cellWidth: "200px",
  };

  const {
    replenAIBPallets,
    minutesPalletsInReplenQueue
  } = graphData.data[0];

  const {
    putawayAIBPallets,
    minutesPalletsInPutawayQueue
  } = graphData.data[1];

  const {
    palletMoveAIBPallets
  } = graphData.data[2];

  const {
    statuses,
    maxQueue,
    putawayAllocationPercent,
    replenAllocationPercent,
    forecastReplenAllocationPercent, 
    belowQueueVariance,
    maxMinutesForPalletsInPutawayQueue,
    maxMinutesForPalletsInReplenQueue,
  } = graphData.meta[0]; 
  
  const putawayAllocatedValue = maxQueue * putawayAllocationPercent;
  const replenAllocatedValue = maxQueue * replenAllocationPercent;
  const forecastReplenAllocatedValue = maxQueue * forecastReplenAllocationPercent;
  console.log(`putawayAllocatedValue: ${putawayAllocatedValue}, replenAllocatedValue: ${replenAllocatedValue}, forecastReplenAllocatedValue: ${forecastReplenAllocatedValue}`);

  const getPalletCellColor = (
    currentCellMin,
    currentCellMax,
    pallets,
    maxPalletsValue
  ) => {
    if (currentCellMin >= pallets || pallets === 0) {
      return null;
    } else {
      if (currentCellMax < maxPalletsValue) {
        if (maxPalletsValue - currentCellMax < belowQueueVariance) {
          return statuses[1].color; //warning
        }
        return statuses[0].color; //good
      } else if (currentCellMax > maxPalletsValue) {
        if (currentCellMax - maxPalletsValue < belowQueueVariance) {
          return statuses[1].color; //warning
        }
        return null;
      }  else {
        return statuses[2].color; // over
      }
    }
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
            {SymboticGridSetupData.map(({ label, min, max, value }, index) => (
              <tr key={index} className="block">
                <td>
                  <RegularCell text={label} {...cellProps} />
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
                      putawayAIBPallets,
                      putawayAllocatedValue
                    )}
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
                      replenAIBPallets,
                      replenAllocatedValue
                    )}
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
                      replenAIBPallets,
                      forecastReplenAllocatedValue
                    )}
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
                      palletMoveAIBPallets,
                      1
                    )}
                  />
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
                  text={`${putawayAIBPallets} pallets`}
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
                <RegularCell
                  {...cellProps}
                  {...SymboticHeaderFirstRowProps}
                  text={`${replenAIBPallets} pallets`}
                  backgroundColor={
                    minutesPalletsInReplenQueue >
                    1400
                      ? statuses[2].color
                      : null
                  }
                  justifyContent="start"
                  style={{ paddingLeft: 20 }}
                />
              </td>
              <td>
                <RegularCell {...cellProps} {...SymboticHeaderFirstRowProps} />
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
                <RegularCell
                  {...cellProps}
                  {...SymboticHeaderFirstRowProps}
                  text={`${minutesToHours(
                    minutesPalletsInPutawayQueue
                  )} 
                  ${minutesPalletsInPutawayQueue >
                      maxMinutesForPalletsInPutawayQueue
                      ? `>`
                      : `<`
                    }
                  ${minutesToHours(maxMinutesForPalletsInPutawayQueue)} `}
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
                <RegularCell
                  {...cellProps}
                  {...SymboticHeaderFirstRowProps}
                  text={` ${minutesToHours(
                    minutesPalletsInReplenQueue
                  )} 
                  ${minutesPalletsInReplenQueue >
                      maxMinutesForPalletsInReplenQueue
                      ? `>`
                      : `<`
                    }
                  ${minutesToHours(maxMinutesForPalletsInReplenQueue)} `}
                  backgroundColor={
                    minutesPalletsInReplenQueue >
                      1400
                      ? statuses[2].color
                      : null
                  }
                  justifyContent="start"
                  style={{ paddingLeft: 20 }}
                />
              </td>
              <td>
                <RegularCell {...cellProps} {...SymboticHeaderFirstRowProps} />
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
                <RegularCell {...cellProps} {...SymboticHeaderFirstRowProps} />
              </td>
              <td>
                <RegularCell {...cellProps} {...SymboticHeaderFirstRowProps} />
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
