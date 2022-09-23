import { useState, useEffect, useMemo } from 'react';
import Header from './components/Header';
import Login from './components/Login';
import Register from './components/Register';
import usersService from './services/usersService';
import { UserContext } from "./UserContext";

function App() {
  const [user, setUser] = useState(null);

  const value = useMemo(() => ({ user, setUser }), [user, setUser]);

  useEffect(() => {
    const getUsers = async () => {
      const allUsers = await usersService.getAll();
      console.log(allUsers);
    }

    getUsers();
  }, [])

  

  // const test = async () => {
  //   const res = await usersService.test();
  //   console.log(res);
  // }

  return (
    <div className="App">
      <UserContext.Provider value={ value }>
        <Header />
        <h1>Debates</h1>

        <Register />
        <Login />
      </UserContext.Provider>

      
      {/* <button onClick={ test }>test</button> */}
    </div>
  )
}

export default App
