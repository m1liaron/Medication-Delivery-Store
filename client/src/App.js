import * as React from "react";
import {
    createBrowserRouter,
    RouterProvider,
    Route,
    Link,
} from "react-router-dom";
import {
    ShopPage,
    ShopCartPage,
    NotFoundPage
} from './pages/index'
import NavBar from "./components/NavBar";

const router = createBrowserRouter([
    {
        element: <NavBar/>,
        children: [
            {
                path: "/",
                element: <ShopPage/>,
            },
            {
                path: "/cart",
                element: <ShopCartPage/>
            }
        ]
    }
]);

function App() {
    return (
        <RouterProvider router={router}/>
    );
}

export default App;
