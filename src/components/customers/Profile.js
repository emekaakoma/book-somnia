import userEvent from "@testing-library/user-event"
import { useEffect, useState } from "react"
import { getAllUserCustomers } from "../APIManager"

export const MyProfile = () => {
    const [customers, setCustomer] = useState([])
    const [filtered, setFiltered] = useState([])

    const localBookUser = localStorage.getItem("booksomnia_user")
    const bookUserObject = JSON.parse(localBookUser)


    useEffect(
        () => {
            getAllUserCustomers()
                .then((array) => {
                    setCustomer(array)
                })
        },
        []
    )

    useEffect(
        () => {
            if (bookUserObject) {
                const myProfile = customers.filter(customer => customer.id === bookUserObject.id)
                setFiltered(myProfile)
            }
        },
        [customers]
    )

    return <>
        <header>My Profile</header>
        <article className="employee"></article>
        {
            filtered.map(
                (user) => {
                    return <section className="employees">
                        <div>My Name: {user.name}</div>
                    <div>Email: {user.email}</div>
                    <div>Preference: {user?.customers[0].preference}</div>
                    </section>
                    
                }
            )
        }

    </>
}