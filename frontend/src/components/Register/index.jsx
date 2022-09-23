import usersService from "../../services/usersService";

    export default function Register(){

        const handleRegister = async e => {
            e.preventDefault();

            const user = {
                username: e.target.username.value,
                email: e.target.email.value,
                password: e.target.password.value,
                password2: e.target.password2.value,
            }

            try {
                const newUser = await usersService.register(user);
                console.log(newUser);
            } catch(error) {
                console.error(error);
                console.log(error.response.data.message);
            }
        }

        return (
            <form onSubmit={ handleRegister } className="register">
                <input type="text" name="username" required placeholder="username0847" />
                <input type="text" name="email" required placeholder="yourname@gmail.com" />
                <input type="password" name="password" required placeholder="********" />
                <input type="password" name="password2" required placeholder="********" />
                <input type="submit" name="submit" value="Register" />
            </form>
        )
    }