import './App.css';
import { Component1 } from './components/handleAddFrontend';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Mainfront } from './components/mainfront';
import Login from './components/Login';
import { onAuthStateChanged } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { auth } from './utils/authLogin';

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <Router>
      <Routes>
        {user === null ? <Route path="*" element={<Login />} />
          : <>
            <Route path="/add" element={<Component1 />} />
            <Route path="/" element={<Mainfront />} />
            <Route path="/login" element={<Login />} />
          </>}
      </Routes>
    </Router>
  );
}

export default App;
