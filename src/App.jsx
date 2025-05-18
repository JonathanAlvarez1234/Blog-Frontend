import { BrowserRouter } from "react-router-dom";
import Navbar from './components/navbars/navbar.jsx';
import Footer from './components/footer/footer.jsx';
import AppRoutes from "./routes.jsx";
import './App.css'

const App = () => {

  return (
    <BrowserRouter>
      <>
        <Navbar />
        <div className="card">
          <AppRoutes />
        </div>
        {/*<Footer />*/}
      </>
    </BrowserRouter>
  );
};

export default App;
