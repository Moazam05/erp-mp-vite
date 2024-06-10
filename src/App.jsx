import { ThemeProvider } from "@mui/material";
// import { CacheProvider } from "@emotion/react";
// import cacheRtl from "./constants/cache";
import RootComponent from "./Router";
import theme from "./constants/theme";
import { CartProvider } from "./contexts/CartContext";
import { LanguageProvider } from "./contexts/LanguageContext";
import { ToastContainer } from "react-toastify";

const App = () => {
  return (
    <>
      {/* <CacheProvider value={cacheRtl}> */}
      <LanguageProvider>
        <CartProvider>
          <ThemeProvider theme={theme}>
            <ToastContainer hideProgressBar={true} autoClose={2000} />
            <RootComponent />
          </ThemeProvider>
        </CartProvider>
      </LanguageProvider>
      {/* </CacheProvider> */}
    </>
  );
};

export default App;
