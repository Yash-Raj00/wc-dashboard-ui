import React, { useState, useEffect, useContext } from "react";
import { UserSessionContext } from "../context/UserSessionContext";
import { SocketServicesContext } from "../context/SocketServicesContext";

export default function Pagination({
  data,
  onPageChange,
  customPageNumber = false,
  totalCustomPages = 1,
  isSymbotic = false,
  symboticDataType,
}) {
  const {
    setTotalPageNo,
    setCurrentPageNo,
    autoTabSwitch,
    numberOfRowPerPage,
    pageChangeIntervalInMs,
  } = useContext(UserSessionContext);
  const { loading } = useContext(SocketServicesContext);

  const [currentPage, setCurrentPage] = useState(1);
  const totalPages =
    data?.length != 0 && !customPageNumber
      ? Math.ceil(data.length / numberOfRowPerPage)
      : totalCustomPages;

  const indexOfLastItem = currentPage * numberOfRowPerPage;
  const indexOfFirstItem = indexOfLastItem - numberOfRowPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  useEffect(() => {
    if (currentPage > 1 && currentPage > totalPages) {
      setCurrentPage((prev) => prev - 1);
    }
    !isSymbotic && onPageChange(currentItems);
    setTotalPageNo(totalPages);
    setCurrentPageNo(currentPage);
    if(isSymbotic && symboticDataType === 2 && currentPage < 2) {
      setCurrentPage(prevPage => prevPage + 1);
    }
  }, [currentPage, data, numberOfRowPerPage]);

  useEffect(() => {
    if (!pageChangeIntervalInMs) {
      return;
    }

    if (currentPage < totalPages && autoTabSwitch && !loading) {
      const id = setInterval(() => {
        setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
        isSymbotic && onPageChange(currentItems);
      }, pageChangeIntervalInMs * 1000);

      return () => clearInterval(id);
    }
  }, [currentPage, totalPages, pageChangeIntervalInMs]);

  const handleNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        marginTop: "10px",
        // position: "sticky",
        bottom: "0",
        padding: "10px",
      }}
    >
      <button
        onClick={handlePreviousPage}
        disabled={currentPage === 1}
        style={{ backgroundColor: "transparent" }}
      >
        Previous
      </button>
      <span>
        Page {currentPage} of {totalPages}
      </span>
      <button
        onClick={handleNextPage}
        disabled={currentPage === totalPages}
        style={{ backgroundColor: "transparent" }}
      >
        Next
      </button>
    </div>
  );
}
