import { useContext } from "react";
import { UserContext } from "../../UserContext";
import usersService from "../../services/usersService";

export default function Login(){
    const { setUser } = useContext(UserContext);

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

    return (
        <form onSubmit={ handleLogin } action="" class="login">
            <input type="text" name="username" required placeholder="username0847" />
            <input type="password" name="password" required placeholder="********" />
            <input type="submit" value="Log In" name="submit" />
        </form>
    )
}