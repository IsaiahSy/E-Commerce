import React, { useEffect } from 'react';

// constants
import { FETCH_ALL_PRODUCTS } from './constants';

// components
import { Header } from './components';
import { componentRoutes } from './routes';

// api
import { fetchAllProducts } from './api';

// hooks
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';

const App = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        const storeProductList = async () => {
            const { data } = await fetchAllProducts();
            dispatch({ type: FETCH_ALL_PRODUCTS, payload: data });
        };

        storeProductList();
    }, []);

    return (
        <Router>
            <Header />
            <Routes>
                {componentRoutes.map((route, index) => <Route path={route.path} element={route.component} key={index} exact/>)}
            </Routes>
        </Router>
    );
};

export default App;