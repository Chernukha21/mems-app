import {createBrowserRouter} from 'react-router-dom';
import ListPage from '../pages/List';
import TablePage from '../pages/Table';
import App from "../App.tsx";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <App />, // 🧠 Has the Navbar
        children: [
            { path: 'list', element: <ListPage /> },
            { path: 'table', element: <TablePage /> },
        ],
    },
]);