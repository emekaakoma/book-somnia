import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { getAllSessions, getCustomerSessions, getExactSession, updateSession } from "../APIManager"
import "./CustomerList.css"

export const EditSession = () => {
    const [sessions, setSessions] = useState({
        description: ""
    })


    const localBookUser = localStorage.getItem("booksomnia_user")
    const bookUserObject = JSON.parse(localBookUser)

    const navigate = useNavigate()

    const { sessionId } = useParams()

    useEffect(
        () => {
            getExactSession(sessionId)
                .then((data) => {
                    const currentSession = data[0]
                    setSessions(currentSession)
                })
        },
        []
    )

    const handleUpdate = (event) => {
        event.preventDefault()

        updateSession(sessions)
            .then(() => {
                navigate("/books")
            })
    }

    return <>
        <form className="bookSession">
            <h2>Edit Session</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="name" className="hourLetter">Edit Description:</label>
                    <input
                        required autoFocus
                        type="text"
                        className="form-control"
                        value={sessions.description}
                        onChange={
                            (evt) => {
                                const copy = { ...sessions }
                                copy.description = evt.target.value
                                setSessions(copy)
                            }
                        }
                    />
                </div>
            </fieldset>
            <button className="updateSession" onClick={(clickEvent) => handleUpdate(clickEvent)}
            >Update</button>
        </form>

    </>
}