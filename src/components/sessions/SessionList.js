import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { deleteSession, getAllBooks, getAllCustomersFromUsers, getAllEmployees, getAllSessions, getSessionsAndBooks, updateSessionList } from "../APIManager"
import "./SessionList.css"

export const SessionList = () => {
    const [sessions, setSessions] = useState([])
    const [filteredSessions, setFilteredSessions] = useState([])
    const [employees, setEmployees] = useState([])
    const [feedback, setFeedback] = useState("")
    const [customers, setCustomers] = useState([])


    const localBookUser = localStorage.getItem("booksomnia_user")
    const bookUserObject = JSON.parse(localBookUser)

    const navigate = useNavigate()

    useEffect(
        () => {
            getSessionsAndBooks()
                .then((sessionsArray) => {
                    setSessions(sessionsArray)
                })
        },
        []
    )

    useEffect(
        () => {
            getAllEmployees()
                .then((employeeArray) => {
                    setEmployees(employeeArray)
                })
        },
        []
    )

    useEffect(
        () => {
            getAllCustomersFromUsers()
                .then((data) => {
                    setCustomers(data)
                })
        },
        []
    )


    useEffect(
        () => {

            if (bookUserObject.staff && employees.length) {
                //for employees
                const currentEmployee = employees.find(employee => employee.userId === bookUserObject.id)
                const employeeSessions = sessions.filter(session => session.employeeId === currentEmployee.id)

                setFilteredSessions(employeeSessions)
            }
            else {
                //for customers
                const mySessions = sessions.filter(session => session.customerId === bookUserObject.id)
                setFilteredSessions(mySessions)
            }
        },
        [sessions, employees]
    )

    // const handleDelete = (sessions) => {
    //     deleteSession(sessions)
    //     .then(() => {
    //         navigate("/books")
    //     })
    // }

    const deleteButton = (sessionsId) => {
        if (!bookUserObject.staff) {
            return <button onClick={() => {
                deleteSession(sessionsId)
                    .then(() => {
                        navigate("/books")
                    })
            }} className="sesison__delete">Delete</button>
        } else {
            return ""
        }
    }

    const canEdit = (session) => {
        if (!bookUserObject.staff) {
            return <button onClick={() => navigate(`/sessions/${session}/edit`)}>Edit</button>
        }
    }

    const canClose = (session) => {
        if (bookUserObject.staff) {
            return <button onClick={() => Close(session)}>Completed</button>
        }
    }

    const Close = (session) => {
        const copy = {
            customerId: session.customerId,
            employeeId: session.employeeId,
            bookId: session.bookId,
            description: session.description,
            hours: session.hours,
            dateCompleted: new Date()
        }
        updateSessionList(session, copy)
            .then(() => {
                setFeedback("Customer profile successfully saved")
                getSessionsAndBooks()
                    .then((sessionsArray) => {
                        setSessions(sessionsArray)
                    })
            })
    }

    return <>
        <h2>My Sessions</h2>

        <article className="session">
            <div className={`${feedback.includes("Error") ? "error" : "feedback"} ${feedback === "" ? "invisible" : "visible"}`}>
                {feedback}
            </div>
            {
                filteredSessions.map(
                    (session) => {
                        return <section className="sessions" key={session.id} value={session.id}>
                            {
                                bookUserObject.staff
                                    ? <></>
                                    : <div><img src={session.employee.image} width={"200"} height={"200"} /></div>
                            }
                            <header>Book: {session?.book?.name}</header>
                            <div>hours: {session.hours}</div>
                            <div> {
                                customers.map(
                                    (customer) => {
                                        if (customer.id === session.customerId) {
                                            return <div>customer:
                                                <Link to={`/customers/${customer.id}`}>{customer?.user?.name}</Link>
                                            </div>

                                        }
                                    }
                                )
                            }</div>
                            <footer>description: {session.description}</footer>
                            <footer>
                                {
                                    canEdit(session.id)
                                }
                                {
                                    deleteButton(session.id)
                                }
                                {
                                    session.dateCompleted === ""

                                        ? canClose(session)
                                        : <button>Good Readings!</button>

                                }
                            </footer>
                        </section>
                    }
                )
            }
        </article>
    </>
}