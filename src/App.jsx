import { BrowserRouter } from "react-router-dom";
import Navbar from './components/navbars/navbar.jsx';
import Footer from './components/footer/footer.jsx';
import './App.css'

function App() {

  return (
    <>
      <Navbar />
      <div className="card">
      </div>
      <Footer />
    </>
  )
}

export default App
