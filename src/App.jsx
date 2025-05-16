import { useState } from 'react'
import Navbar from './components/navbars/navbar.jsx';
import Footer from './components/footer/footer.jsx';
 import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Navbar/>
      <div className="card">
      </div>
      <Footer />
    </>
  )
}

export default App
