import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { getAllBooks, getAllEmployeesFromUsers, getAllSessions, submitSessionRequest } from "../APIManager"
import "./SessionList.css"

export const BookSession = () => {
    const [books, setBooks] = useState([])
    const [employees, setEmployees] = useState([])
    const [sessions, setSessions] = useState({
        customerId: 0,
        employeeId: 0,
        bookId: 0,
        description: "",
        hours: 0,
        dateCompleted: ""
    })
    const [employeeSess, setEmployeeSess] = useState({
        employeeId: 0,
        sessionId: 0
    })

    const localBookUser = localStorage.getItem("booksomnia_user")
    const bookUserObject = JSON.parse(localBookUser)
    const navigate = useNavigate()

    useEffect(
        () => {
            getAllBooks()
                .then((bookArray) => {
                    setBooks(bookArray)
                })
        },
        []
    )

    useEffect(
        () => {
            getAllEmployeesFromUsers()
                .then((employeeArray) => {
                    setEmployees(employeeArray)
                })
        },
        []
    )
       
    useEffect(
        () => {
            getAllSessions()
                .then((sessionsArray) => {
                    setSessions(sessionsArray)
                })
        },
        []
    )

    const handleSubmit = (event) => {
        event.preventDefault()

        const sessionsToSendToAPI = {
            customerId: bookUserObject.id,
            employeeId: parseInt(sessions.employeeId),
            bookId: parseInt(sessions.bookId),
            description: sessions.description,
            hours: parseInt(sessions.hours),
            dateCompleted: ""
        }

        const employeeSessionUpdate = {
            
        }

        submitSessionRequest(sessionsToSendToAPI)
        .then(() => {
            navigate("/sessions")
        })
    }

    return (
        <form className="bookSession">
            <h2 className="bookSession__title">Lets Book A Session!</h2>
            <fieldset>
                <div className="form-group-employees">
                    <label htmlFor="books" className="hourLetter">Employees</label>
                    <select className="selecter"
                        value={sessions.employeeId}
                        onChange={
                            (evt) => {
                                const copy = { ...sessions }
                                copy.employeeId = evt.target.value
                                setSessions(copy)
                            }
                        }
                    > <option value="">Choose A Reader</option>
                        {
                            employees.map((employee) => (
                                <option key={employee.id} value={employee.id}>
                                    {employee?.user?.name}
                                </option>
                            ))
                        }
                    </select>
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group-books">
                    <label htmlFor="books" className="hourLetter">Books</label>
                    <select className="select"
                        value={sessions.bookId}
                        onChange={
                            (evt) => {
                                const copy = { ...sessions }
                                copy.bookId = evt.target.value
                                setSessions(copy)
                            }
                        }
                    > <option value="">Select A Book</option>
                        {
                            books.map((book) => (
                                <option key={book.id} value={book.id}>
                                    {book.name}
                                </option>
                            ))
                        }
                    </select>
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group-describe">
                    <label htmlFor="description" className="hourLetter">Describe your situation:</label>
                    <input
                        required autoFocus
                        type="text"
                        className="form-control"
                        placeholder="Description"
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
            <fieldset>
                <div className="form-group-hours">
                    <label htmlFor="name" className="hourLetter">How many hours?</label>
                    <input type="number"
                        className="form-control"
                        value={sessions.hours}
                        onChange={
                            (evt) => {
                                const copy = { ...sessions }
                                copy.hours = parseFloat(evt.target.value)
                                setSessions(copy)
                            }
                        } />
                </div>
            </fieldset>
            <button
                onClick={(clickEvent) => handleSubmit(clickEvent)}
                className="submitSession">
                Submit Form
            </button>
        </form>
    )
}