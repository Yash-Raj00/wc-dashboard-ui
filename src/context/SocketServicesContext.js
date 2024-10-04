import React, { createContext, useRef, useEffect, useState } from "react";
import { io } from "socket.io-client";

const TIMEOUT_INTERVAL = 20000;

export const SocketServicesContext = createContext();

export const SocketServicesContextProvider = ({ children }) => {
  const socketUrl = window?.__ENV?.SERVER_URL || process.env.SERVER_URL;
  console.log(socketUrl);

  const [socket, setSocket] = useState(null);
  const [loading, setLoading] = useState(false);

  const timeoutRef = useRef(null);

  useEffect(() => {
    const newSocket = io(socketUrl, {
      reconnectionAttempts: 30,
      reconnectionDelay: 30000,
      pingInterval: 60000,
      pingTimeout: 60000,
      transports: ["websocket", "polling", "flashsocket"],
      origins: "*:*",
      path: "/wc-dashboard",
    });

    setSocket(newSocket);

    newSocket.on("connect", () => {
      // setLoading(true);
      console.log("Connected to server");
    });

    newSocket.on("connect_error", (error) => {
      console.error("Socket connection error:", error);
    });

    newSocket.on("disconnect", (reason) => {
      console.log(`Disconnected from server: ${reason}`);
    });

    newSocket.on("reconnect_attempt", () => {
      console.log("Attempting to reconnect...");
    });

    newSocket.on("reconnect", (attemptNumber) => {
      console.log(`Reconnected to server on attempt ${attemptNumber}`);
      setLoading(true);
      requestData();
    });

    return () => {
      newSocket.disconnect();
    };
  }, []);

  // Helper function to wrap socket 'once' event listener in a Promise
  const socketOncePromise = (eventName) => {
    return new Promise((resolve, reject) => {
      if (socket) {
        timeoutRef.current = setTimeout(() => {
          reject(new Error("Socket request timed out"));
        }, TIMEOUT_INTERVAL);

        socket.once(eventName, (data) => {
          clearTimeout(timeoutRef.current);
          resolve(data);
        });
      } else {
        reject(new Error("Socket is not available"));
      }
    });
  };
  const requestData = async (reportName, setData, warehouse) => {
    if (socket && warehouse && warehouse.warehouseId && warehouse.dcId) {
      if (loading) return; // Prevent multiple requests while loading

      setLoading(true);

      // Emit the request
      socket.emit("requestReport", {
        reportName,
        dcId: warehouse.dcId,
        warehouseId: warehouse.warehouseId,
      });

      try {
        // Await the socket event response
        const data = await socketOncePromise("data");
        console.log("Received data:", data);
        setData(data);
      } catch (error) {
        console.error("Error receiving data:", error);
      } finally {
        setLoading(false);
      }
    } else {
      console.log("Socket is not connected or warehouse info is missing");
    }
  };

  return (
    <SocketServicesContext.Provider
      value={{ requestData, loading, setLoading }}
    >
      {children}
    </SocketServicesContext.Provider>
  );
};
