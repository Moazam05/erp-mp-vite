import { RouterProvider, createBrowserRouter } from "react-router-dom";

import Login from "./Pages/Entry/Login";
import Register from "./Pages/Entry/Register";
import ForgotPassword from "./Pages/Entry/ForgotPassword";
import ResetPassword from "./Pages/Entry/ResetPassword";

import LandingPage from "./Pages/LandingPage";
import Offers from "./Pages/Offers";
import ProductDetail from "./Pages/ProductDetail";
import Cart from "./Pages/Cart";
import Checkout from "./Pages/Checkout";
import ProductsListing from "./Pages/ProductsListing";

import Profile from "./Pages/components/Profile/Profile";
import ProfileDetails from "./Pages/components/Profile/components/ProfileDetails";
import OrderDetail from "./Pages/components/Profile/components/OrderDetail";
import Addresses from "./Pages/components/Profile/components/Addresses";
import Cards from "./Pages/components/Profile/components/Cards";
import Settings from "./Pages/components/Profile/components/Settings";
// import BillingDetail from "./Pages/BillingDetail";
import SearchResults from "./Pages/SearchResults";
import Payment from "./Pages/Payment";
import AuthGuard from "./Auth";
import OrderHistoryNew from "./Pages/components/Profile/components/OrderHistoryNew";
import ScrollToTop from "./ScrollToTop";
import PrivacyPolicy from "./Pages/PrivacyPolicy";
import ContactUs from "./Pages/ContactUs";
import ReturnPolicy from "./Pages/ReturnPolicy";

const Router = createBrowserRouter([
  {
    path: "/login",
    element: (
      <ScrollToTop>
        <Login />
      </ScrollToTop>
    ),
  },
  {
    path: "/register",
    element: (
      <ScrollToTop>
        <Register />
      </ScrollToTop>
    ),
  },
  {
    path: "/forgot-password",
    element: (
      <ScrollToTop>
        <ForgotPassword />
      </ScrollToTop>
    ),
  },
  {
    path: "/reset-password",
    element: (
      <ScrollToTop>
        <ResetPassword />
      </ScrollToTop>
    ),
  },
  {
    path: "/",
    element: (
      <ScrollToTop>
        <LandingPage />
      </ScrollToTop>
    ),
  },
  {
    path: "/offers",
    element: (
      <ScrollToTop>
        <Offers />
      </ScrollToTop>
    ),
  },
  {
    path: "/privacy-policy",
    element: (
      <ScrollToTop>
        <PrivacyPolicy />
      </ScrollToTop>
    ),
  },
  {
    path: "/contact-us",
    element: (
      <ScrollToTop>
        <ContactUs />
      </ScrollToTop>
    ),
  },
  {
    path: "/return-policy",
    element: (
      <ScrollToTop>
        <ReturnPolicy />
      </ScrollToTop>
    ),
  },
  {
    path: "/category/:catId",
    element: (
      <ScrollToTop>
        <ProductsListing />
      </ScrollToTop>
    ),
  },
  {
    path: "/productdetail/:id",
    element: (
      <ScrollToTop>
        <ProductDetail />
      </ScrollToTop>
    ),
  },
  {
    path: "/cart",
    element: (
      <ScrollToTop>
        <Cart />
      </ScrollToTop>
    ),
  },
  {
    path: "/checkout",
    element: (
      <ScrollToTop>
        <AuthGuard>
          <Checkout />
        </AuthGuard>
      </ScrollToTop>
    ),
  },
  {
    path: "/payment/:id",
    element: (
      <ScrollToTop>
        <AuthGuard>
          <Payment />
        </AuthGuard>
      </ScrollToTop>
    ),
  },
  {
    path: "/profile",
    element: (
      <ScrollToTop>
        <AuthGuard>
          <Profile />
        </AuthGuard>
      </ScrollToTop>
    ),
    children: [
      {
        path: "",
        element: (
          <ScrollToTop>
            <AuthGuard>
              <ProfileDetails />
            </AuthGuard>
          </ScrollToTop>
        ),
      },
      {
        path: "order-history",
        element: (
          <ScrollToTop>
            <AuthGuard>
              <OrderHistoryNew />
            </AuthGuard>
          </ScrollToTop>
        ),
      },
      {
        path: "orderdetail/:id",
        element: (
          <ScrollToTop>
            <AuthGuard>
              <OrderDetail />
            </AuthGuard>
          </ScrollToTop>
        ),
      },
      {
        path: "addresses",
        element: (
          <ScrollToTop>
            <AuthGuard>
              <Addresses />
            </AuthGuard>
          </ScrollToTop>
        ),
      },
      {
        path: "cards",
        element: (
          <ScrollToTop>
            <AuthGuard>
              <Cards />
            </AuthGuard>
          </ScrollToTop>
        ),
      },
      {
        path: "settings",
        element: (
          <ScrollToTop>
            <AuthGuard>
              <Settings />
            </AuthGuard>
          </ScrollToTop>
        ),
      },
    ],
  },
  {
    path: "search/:query",
    element: (
      <ScrollToTop>
        <SearchResults />
      </ScrollToTop>
    ),
  },
]);

const RootComponent = () => {
  return <RouterProvider router={Router} />;
};

export default RootComponent;
