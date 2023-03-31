import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { getEmployeeDetails } from "../APIManager"
import "./EmployeeList.css"

export const EmployeeDetails = () => {
    const { employeeId } = useParams()
    const [employees, setEmployees] = useState([])

    const localBookUser = localStorage.getItem("booksomnia_user")
    const bookUserObject = JSON.parse(localBookUser)

    const navigate = useNavigate()

    useEffect(
        () => {
            getEmployeeDetails(employeeId)
                .then((employee) => {
                    setEmployees(employee)
                })
        }
    )
    return <>
    <article className="employeeDetail">
        {
            employees.map((employee) => {
                return <section className="employeesDetail">
                    <header value={employee.id}><img src={employee.image} alt={employee.name} width={"200"} height={"200"} /></header>
                    <div>Name: {employee?.user?.name}</div>
                    <div>Email: {employee?.user?.email}</div>
                    <div>Pay Rate: ${employee.payRate}/hour</div>
                    <div>Experience: {employee.experience} years</div>
                    <div>About Me: {employee.bio}</div>
                    {
                        bookUserObject.staff
                            ? ""
                            : <button onClick={() => navigate("/booking")}>Book Now</button>
                    }
                </section>
            })
        }
        </article>
    </>
}