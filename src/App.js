import React, { Suspense, useContext, useEffect } from "react";
import {
  Route,
  Routes,
  BrowserRouter as Router,
  Navigate,
} from "react-router-dom";
import { UserSessionContext } from "./context/UserSessionContext";
import Dashboard from "./routes/Dashboard";
import Selection from "./routes/Selection";
import Loading from "./routes/Loading";
import Crossdock from "./routes/Crossdock";
import Symbotic from "./routes/Symbotic";
import Settings from "./routes/Settings";
import { ApiContext } from "./context/ApiContext";

const App = () => {
  const { getWarehouses } = useContext(ApiContext);

  useEffect(() => {
    const fetchWarehouses = async () => {
      console.log("Fetching warehouses...");
      await getWarehouses();
    };
    fetchWarehouses();
  }, []);

  return (
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/dashboard/settings" element={<Settings />} />
          <Route path="/dashboard/*" element={<Dashboard />}>
            <Route
              path="selection"
              element={<ProtectedRoute element={<Selection />} />}
            />
            <Route
              path="loading"
              element={<ProtectedRoute element={<Loading />} />}
            />
            <Route
              path="crossdock"
              element={<ProtectedRoute element={<Crossdock />} />}
            />
            <Route
              path="symbotic"
              element={<ProtectedRoute element={<Symbotic />} />}
            />
          </Route>
          <Route path="*" element={<Navigate to="/dashboard/settings" />} />
        </Routes>
      </Suspense>
    </Router>
  );
};

const ProtectedRoute = ({ element }) => {
  const { selectedWarehouse } = useContext(UserSessionContext);
  return selectedWarehouse ? (
    element
  ) : (
    <Navigate to="/dashboard/settings" replace />
  );
};

export default App;
