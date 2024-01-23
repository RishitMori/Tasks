import './App.css'
import { Component1 } from './components/handleAddFrontend'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Mainfront } from './components/mainfront';
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/add" Component={Component1} />
        <Route path="/" Component={Mainfront} />
      </Routes>
    </Router>

  )
}

export default App
