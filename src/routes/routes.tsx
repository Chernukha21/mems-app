import {createBrowserRouter} from 'react-router-dom';
import ListPage from '../pages/List';
import TablePage from '../pages/Table';
import App from "../App.tsx";
import HomePage from "../pages/Home.tsx";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            { index: true, element: <HomePage /> }, // This handles "/"
            { path: "list", element: <ListPage /> },
            { path: "table", element: <TablePage /> },
        ],
    },
]);