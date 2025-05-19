import { BrowserRouter } from "react-router-dom";
import Navbar from './components/navbars/navbar.jsx';
import Footer from './components/footer/footer.jsx';
import AppRoutes from "./routes.jsx";
import './App.css'
import { ChakraProvider, extendTheme } from "@chakra-ui/react";


const theme = extendTheme({
  config: {
    initialColorMode: 'light',  // Puedes configurarlo a 'dark' si lo prefieres
    useSystemColorMode: false,
  },
});
const App = () => {

  return (
    <ChakraProvider theme={theme}>
      <BrowserRouter>
        <>
          <Navbar />
          <div className="card">
            <AppRoutes />
          </div>
          {/*<Footer />*/}
        </>
      </BrowserRouter>
      
    </ChakraProvider>

  );
};

export default App;
