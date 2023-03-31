import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import {  getAllCustomersFromUsers } from "../APIManager"
import "./CustomerList.css"

export const CustomerList = () => {
    const [customers, setCustomers] = useState([])

    // const localBookUser = localStorage.getItem("booksomnia_user")
    //     const bookUserObject = JSON.parse(localBookUser)

    useEffect(
        () => {
            getAllCustomersFromUsers()
                .then((customerArray) => {
                    setCustomers(customerArray)
                })
        },
        []
    )

    return <>

        <h2>List of Cutsomers</h2>
        {/* {
        bookUserObject.staff
        ? <button>Add employees</button>
        : ""
    } */}
        <article className="employee">
            {
                customers.map(
                    (customer) => {
                        return <section className="employees">
                            <div className="employee__name">
                                <Link to={`/customers/${customer.id}`}>{customer?.user?.name}</Link>
                            </div>
                            <div className="employee__description">email: {customer?.user?.email}</div>
                        </section>
                    }
                )
            }
        </article>
    </>

}


