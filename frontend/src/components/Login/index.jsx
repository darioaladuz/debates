import { useContext } from "react";
import { UserContext } from "../../UserContext";
import usersService from "../../services/usersService";
import { Navigate } from "react-router-dom";

export default function Login(){
    const { user, setUser } = useContext(UserContext);

    const handleLogin = async (e) => {
        e.preventDefault();
    
        const user = {
          username: e.target.username.value,
          password: e.target.password.value
        }
    
        try {
          const loggedUser = await usersService.login(user);
          setUser(loggedUser);
          usersService.setToken(loggedUser.token);
          window.localStorage.setItem('user', JSON.stringify(loggedUser));
          console.log(loggedUser);
        } catch(error) {
          console.log(error);
        }
      }
    
    if(user){
        return <Navigate to="/" />
    }

    return (
        <div className="page login-page auth-page">
          <h2>Log In</h2>
          <form onSubmit={ handleLogin } action="" className="login">
            <input type="text" name="username" required placeholder="username0847" />
            <input type="password" name="password" required placeholder="********" />
            <input type="submit" value="Log In" name="submit" />
          </form>
        </div>
    )
}