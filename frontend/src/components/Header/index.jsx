import { useContext } from "react"
import { UserContext } from "../../UserContext"

export default function Header() {
    const { user } = useContext(UserContext);

    return (
        <header>
            <h2>Header</h2>
            {
                user &&
                <h3>{ user.username }</h3>
            }
        </header>
    )
}