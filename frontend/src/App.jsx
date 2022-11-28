import "./App.scss";
import { useState, useEffect, useMemo } from 'react';
import Header from './components/Header';
import Login from './components/Login';
import Register from './components/Register';
import usersService from './services/usersService';
import { UserContext } from "./UserContext";
import { 
  BrowserRouter,
  Routes,
  Route
 } from 'react-router-dom';
import Home from './components/Home';

// comment

function App() {
  const [user, setUser] = useState(null);

  const value = useMemo(() => ({ user, setUser }), [user, setUser]);

  useEffect(() => {
      const loggedUser = window.localStorage.getItem('user');
      if(loggedUser) {
        setUser(JSON.parse(loggedUser));
        usersService.setToken(JSON.parse(loggedUser).token);
      }
  }, [])

  

  // const test = async () => {
  //   const res = await usersService.test();
  //   console.log(res);
  // }

  return (
    <div className="App">
      <UserContext.Provider value={ value }>
        <BrowserRouter>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </BrowserRouter>
      </UserContext.Provider>

      
      {/* <button onClick={ test }>test</button> */}
    </div>
  )
}

export default App
