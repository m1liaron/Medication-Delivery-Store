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
import {Provider} from "react-redux";
import {store} from "./redux/store";
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
        <Provider store={store}>
            <RouterProvider router={router}/>
        </Provider>
    );
}

export default App;
