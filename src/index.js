import * as ReactDOM from 'react-dom/client';
import App from "./App";
import { ApiContextProvider } from './context/ApiContext';
import { UserSessionContextProvider } from './context/UserSessionContext';
import { SocketServicesContextProvider } from './context/SocketServicesContext';

const app = document.getElementById("app");
const root = ReactDOM.createRoot(app);
root.render(
    <UserSessionContextProvider>
        <SocketServicesContextProvider>
            <ApiContextProvider>
                <App />
            </ApiContextProvider>
        </SocketServicesContextProvider>
    </UserSessionContextProvider>
);