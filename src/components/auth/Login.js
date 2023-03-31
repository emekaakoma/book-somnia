import React, { useState } from "react"
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom"
import "./Login.css"
import booky from "../../images/booky.svg"
import bookster from "../../images/bookster.svg"

export const Login = () => {
    const [email, set] = useState("ap@gmail.com")
    const navigate = useNavigate()

    const handleLogin = (e) => {
        e.preventDefault()

        return fetch(`http://localhost:8088/users?email=${email}`)
            .then(res => res.json())
            .then(foundUsers => {
                if (foundUsers.length === 1) {
                    const user = foundUsers[0]
                    localStorage.setItem("booksomnia_user", JSON.stringify({
                        id: user.id,
                        staff: user.isStaff
                    }))

                    navigate("/")
                }
                else {
                    window.alert("Invalid login")
                }
            })
    }

    return (
        <main className="container--login">
            {/* <img className="logo" src={blob}></img> */}
            <section>
                <form className="form--login" onSubmit={handleLogin}>
                    
                    <h1 className="bookHeader"><img className="booksomnia" src={bookster} height="150" width={"150"}/></h1>
                    {/* <h2>Please sign in</h2> */}
                    <fieldset className="logIn">
                        <label htmlFor="inputEmail" className="emailAdd"> Email address </label>
                        <input type="email"
                            value={email}
                            onChange={evt => set(evt.target.value)}
                            className="form-control"
                            placeholder="Email address"
                            required autoFocus />
                    </fieldset>
                    <fieldset>
                        <button type="submit">
                            Sign in
                        </button>
                    </fieldset>
                    <div>
                    <Link to="/register">Not a member yet?</Link>
                </div>
                </form>
            </section>
        </main>
    )
}

