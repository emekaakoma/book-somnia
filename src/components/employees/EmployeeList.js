import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { getAllBooks, getAllEmployees, getAllEmployeesFromUsers } from "../APIManager"
import "./EmployeeList.css"

export const EmployeeList = () => {
    const [employees, setEmployees] = useState([])

    const navigate = useNavigate()

    const localBookUser = localStorage.getItem("booksomnia_user")
    const bookUserObject = JSON.parse(localBookUser)

    // const localBookUser = localStorage.getItem("booksomnia_user")
    //     const bookUserObject = JSON.parse(localBookUser)

    useEffect(
        () => {
            getAllEmployeesFromUsers()
                .then((data) => {
                    setEmployees(data)
                })
        },
        []
    )

    return <>

        <h2 className="header">List of Employees</h2>
        {/* {
        bookUserObject.staff
        ? <button>Add employees</button>
        : ""
    } */}
        <article className="employee">
            {
                employees.map(
                    (employee) => {
                        return <section className="employees">
                            <header value={employee.id}><img src={employee.image} alt={employee.name} width={"200"} height={"200"} /></header>
                            <div className="employee__name">
                                <Link to={`/employees/${employee.id}`}>{employee?.user?.name}</Link>
                            </div>
                            <div className="employee__description">Rate: ${employee.payRate}/hour</div>
                            <div>Experience: {employee.experience} years</div>
                        </section>
                    }
                )
            }
        </article>
    </>

}


