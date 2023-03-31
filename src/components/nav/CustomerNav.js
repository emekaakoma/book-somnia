import { Link, useNavigate } from "react-router-dom"

export const CustomerNav = () => {
    const navigate = useNavigate()

    return (
        <ul className="navbar">
            <li className="navbar__item active">
                <Link className="navbar__link" to="/books">Books</Link>
            </li>
            <li className="navbar__item active">
                <Link className="navbar__link" to="/sessions">Sessions</Link>
            </li>
            <li className="navbar__item active">
                <Link className="navbar__link" to="/booking">Book A Session</Link>
            </li>
            <li className="navbar__item active">
                <Link className="navbar__link" to="/employees">Employee List</Link>
            </li>
            {
                localStorage.getItem("booksomnia_user")
                    ? <li className="navbar__item navbar__logout">
                        <Link className="navbar__link" to="" onClick={() => {
                            localStorage.removeItem("booksomnia_user")
                            navigate("/", {replace: true})
                        }}>Logout</Link>
                    </li>
                    : ""
            }
        </ul>
    )
}