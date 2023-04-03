import {
    HOME_ROUTE,
    CONTACT_US_ROUTE,
    CALCULATOR_ROUTE,
    PRICES_ROUTE,
    AUTHORIZATION_ROUTE,
    ACCOUNT_ROUTE,
    ORDERS_ROUTE,
    ORDERS_CHECKOUT_ROUTE,
} from "./utils/consts";
import HomePage from './components/HomePage/HomePage';
import ContactsPage from './components/ContactsPage/ContactsPage';
import CalculatorPage from './components/CalculatorPage/CalculatorPage';
import AuthorizationPage from './components/AuthorizationPage/AuthorizationPage';
import PricesPage from './components/PricesPage/PricesPage';
import AccountPage from './components/AccountPage/AccountPage';
import OrderPage from './components/OrderPage/OrderPage';
import OrderCheckoutPage from './components/OrderCheckoutPage/OrderCheckoutPage';

export const publicRoutes = [
    {
        path: HOME_ROUTE,
        element: <HomePage />,
        linkName: 'Home',
    },
    {
        path: CONTACT_US_ROUTE,
        element: <ContactsPage />,
        linkName: 'Contact Us',
    },
    {
        path: CALCULATOR_ROUTE,
        element: <CalculatorPage />,
        linkName: 'Calculator',
    },
    {
        path: PRICES_ROUTE,
        element: <PricesPage />,
        linkName: 'Our Prices',
    },
    {
        path: AUTHORIZATION_ROUTE,
        element: <AuthorizationPage />,
        linkName: 'Sign In',
    },
    {
        path: '*',
        element: <HomePage />,
    },
];


export const clientRoutes = [
    {
        path: HOME_ROUTE,
        element: <HomePage />,
        linkName: 'Home',
    },
    {
        path: CONTACT_US_ROUTE,
        element: <ContactsPage />,
        linkName: 'Contact Us',
    },
    {
        path: CALCULATOR_ROUTE,
        element: <CalculatorPage />,
        linkName: 'Calculator',
    },
    {
        path: PRICES_ROUTE,
        element: <PricesPage />,
        linkName: 'Our Prices',
    },
    {
        path: ACCOUNT_ROUTE,
        element: <AccountPage />,
        linkName: 'Account',
    },
    {
        path: ORDERS_ROUTE + '/:id',
        element: <OrderPage />,
    },
    {
        path: ORDERS_CHECKOUT_ROUTE,
        element: <OrderCheckoutPage />,
    },
    {
        path: '*',
        element: <AccountPage />,
    },
];

export const cleanerRoutes = [
    {
        path: CONTACT_US_ROUTE,
        element: <ContactsPage />,
        linkName: 'Contact Us',
    },
    {
        path: ACCOUNT_ROUTE,
        element: <AccountPage />,
        linkName: 'Account',
    },
    {
        path: ORDERS_ROUTE + '/:id',
        element: <OrderPage />,
    },
    {
        path: '*',
        element: <AccountPage />,
    },
];
