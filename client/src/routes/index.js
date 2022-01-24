import { Home, Cart, Auth, ProductDetail, ActivateAccount } from '../components';

export const componentRoutes = [
    {
        path: "/",
        component: <Home />
    },
    {
        path: "/cart",
        component: <Cart />
    },
    {
        path: "/auth/signin",
        component: <Auth />
    },
    {
        path: "/auth/signup",
        component: <Auth />
    },
    {
        path: "/auth/verify/:id",
        component: <ActivateAccount />
    },
    {
        path: "/product/:id",
        component: <ProductDetail />
    }
];

export const navRoutes = [
    {
        to: "/",
        name: "HOME"
    },
    {
        to: "/cart",
        name: "CART"
    },
    {
        to: "/auth/signin",
        name: "SIGN IN"
    },
    {
        to: "/auth/signup",
        name: "SIGN UP"
    }
];