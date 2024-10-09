import React, { useContext, useEffect, useState } from "react";

import LoadingIndicator from "../components/LoadingIndicator";
import Pagination from "../components/Pagination";
import { SocketServicesContext } from "../context/SocketServicesContext";
import ProgressBar from "../components/ProgressBar";
import SymboticGraph from "../components/SymboticGraph";
import SymboticLpnTable from "../components/SymboticLpnTable";
import { UserSessionContext } from "../context/UserSessionContext";

export default function Symbotic() {
  const [currentItem, setCurrentItem] = useState(1);
  const { requestData, loading } = useContext(SocketServicesContext);
  const { selectedWarehouse } = useContext(UserSessionContext);

  const [lpnData, setLpnData] = useState([]);
  const [graphData, setGraphData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        if (selectedWarehouse && currentItem === 1) {
          await requestData(
            "symboticPriorities",
            setLpnData,
            selectedWarehouse
          );
        } else if (selectedWarehouse && currentItem === 2) {
          await requestData("symbotic", setGraphData, selectedWarehouse);
        }
      } catch (error) {
        console.log("error:", error);
      }
    }
    fetchData();
  }, [selectedWarehouse, currentItem]);

  const onPageChange = (item) => {
    console.log('item', item);
    if (item?.includes(2) && currentItem === 1) {
      setCurrentItem(2);
    }
  };

  return loading ? (
    <LoadingIndicator />
  ) : (
    <>
      {console.log(currentItem)}
      {currentItem === 1 && lpnData?.length > 0 && (
        <SymboticLpnTable data={lpnData} />
      )}
      {currentItem === 2 && graphData?.data?.length > 0 && (
        <SymboticGraph graphData={graphData} />
      )}

      <Pagination
        data={[1, 2]}
        onPageChange={onPageChange}
        customPageNumber
        totalCustomPages={2}
        isSymbotic={true}
        symboticDataType={currentItem}
      />
      <ProgressBar timerActive={!loading} />
    </>
  );
}
